import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// --- Shared Utility for Google AI ---
let genAIInstance = null;
const getGenAI = (apiKey) => {
  if (!genAIInstance) genAIInstance = new GoogleGenAI({ apiKey });
  return genAIInstance;
};

// --- External Data Tools ---

const fetchWeather = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    // Fallback to high-fidelity mock if key is missing
    const humidity = 55 + (city.length * 7) % 35;
    return {
      status: "Success (Mock)",
      data: {
        city,
        temp: 28,
        humidity: `${humidity}%`,
        dew_point: 22,
        description: "Clear skies with rising humidity",
        tactical_implication: humidity > 75 ? "Extreme dew risk. Ball will be wet." : "Minimal dew impact."
      }
    };
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return {
      status: "Success",
      data: {
        city: data.name,
        temp: data.main.temp,
        humidity: `${data.main.humidity}%`,
        description: data.weather[0].description,
        tactical_implication: data.main.humidity > 70 ? "High humidity detected. Dew likely to set in." : "Dry conditions."
      }
    };
  } catch (e) {
    return { error: "Weather fetch failed" };
  }
};

const getStadiumData = (venue) => {
  try {
    const dbPath = path.resolve(process.cwd(), 'server', 'stadiums.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const search = venue.toLowerCase();
    return dbData.stadiums.find(s => s.name.toLowerCase().includes(search) || s.city.toLowerCase().includes(search));
  } catch (e) {
    return null;
  }
};

// --- Agent Definition ---

export class Agent {
  constructor(name, role, model, systemPrompt, apiKey, tools = []) {
    this.name = name;
    this.role = role;
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.tools = tools;
    this.ai = getGenAI(apiKey);
  }

  sanitize(input) {
    if (!input) return "";
    return input.replace(/[<>]/g, ""); // Brutal sanitization
  }

  async analyze(context, previousDebate = "") {
    const chat = this.ai.chats.create({
      model: this.model,
      config: {
        systemInstruction: this.systemPrompt,
        tools: this.tools.length > 0 ? this.tools : undefined
      }
    });

    const prompt = `
      CONTEXT: ${this.sanitize(context)}
      DEBATE HISTORY: ${this.sanitize(previousDebate)}
      
      TASK: As ${this.name} (${this.role}), provide your unique perspective.
      If a venue or city is mentioned, invoke the relevant tools first.
    `;

    let result = await chat.sendMessage({ message: prompt });

    // Function Calling Loop
    if (result.functionCalls?.length > 0) {
      const toolResponses = [];
      for (const call of result.functionCalls) {
        if (call.name === "fetch_live_weather") {
          const data = await fetchWeather(call.args.city);
          toolResponses.push({ functionResponse: { name: call.name, response: data } });
        } else if (call.name === "fetch_stadium_data") {
          const data = getStadiumData(call.args.venue);
          toolResponses.push({ 
            functionResponse: { 
              name: call.name, 
              response: data ? { status: "Success", data } : { status: "Not Found" } 
            } 
          });
        }
      }
      if (toolResponses.length > 0) {
        result = await chat.sendMessage({ message: toolResponses });
      }
    }

    return result.text;
  }
}

// --- Agent Factory ---

export const createAgents = (apiKey) => {
  const commonModel = "gemini-2.5-pro";

  const headAnalyst = new Agent(
    "The Head Analyst",
    "Data Scientist",
    commonModel,
    "You are a hyper-analytical IPL data scientist. Propose tactical moves based strictly on matchups, boundary lengths, and average scores. You MUST call 'fetch_stadium_data' if a venue is known.",
    apiKey,
    [{
      functionDeclarations: [{
        name: "fetch_stadium_data",
        description: "Get stadium soil, boundaries, and historical scores.",
        parameters: { type: "OBJECT", properties: { venue: { type: "STRING" } }, required: ["venue"] }
      }]
    }]
  );

  const devilsAdvocate = new Agent(
    "The Devil's Advocate",
    "Contrarian Strategist",
    commonModel,
    "You aggressively challenge the Analyst. Focus on unpredictability, pressure, and the 'Dew Factor'. You MUST call 'fetch_live_weather' for the city to prove the Analyst wrong.",
    apiKey,
    [{
      functionDeclarations: [{
        name: "fetch_live_weather",
        description: "Get live humidity and temperature.",
        parameters: { type: "OBJECT", properties: { city: { type: "STRING" } }, required: ["city"] }
      }]
    }]
  );

  const virtualCaptain = new Agent(
    "The Virtual Captain",
    "Pragmatic Leader",
    commonModel,
    "You are the final decision maker (like Dhoni). Weigh the data vs the risks. Synthesize the debate into a single definitive move.",
    apiKey
  );

  const matchCommentator = new Agent(
    "The Voice of IPL",
    "Lead Commentator",
    "gemini-2.5-flash", // Use flash for rapid commentary
    "Translate the final technical decision into electric, authentic IPL commentator prose. Use metaphors, excitement, and cricket slang. Mention the stadium name and crowd energy.",
    apiKey
  );

  return { headAnalyst, devilsAdvocate, virtualCaptain, matchCommentator };
};
