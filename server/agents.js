import { GoogleGenAI } from '@google/genai';

const liveScraperTool = {
  functionDeclarations: [
    {
      name: "scrape_live_match_context",
      description: "Scrape real-time scoreboard metrics from a given URL to determine current match state and counterfactuals.",
      parameters: {
        type: "OBJECT",
        properties: {
          url: { type: "STRING", description: "The live match URL" }
        },
        required: ["url"]
      }
    }
  ]
};

export class Agent {
  constructor(name, role, model, systemPrompt, apiKey, tools = []) {
    this.name = name;
    this.role = role;
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.tools = tools;
    this.ai = new GoogleGenAI({ apiKey });
  }

  // Security: Basic prompt sanitization
  sanitizeContext(input) {
    if (!input) return "";
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async analyze(context, previousDebate = "") {
    const config = {
      systemInstruction: this.systemPrompt,
    };
    
    if (this.tools.length > 0) {
      config.tools = this.tools;
    }

    const chat = this.ai.chats.create({
      model: this.model,
      config: config
    });

    const safeContext = this.sanitizeContext(context);
    const safePreviousDebate = this.sanitizeContext(previousDebate);

    const prompt = `
      CURRENT MATCH CONTEXT:
      ${safeContext}

      PREVIOUS DEBATE TURNS:
      ${safePreviousDebate}

      Based on your role as ${this.name}, provide your tactical input.
      Ensure your tone is professional yet authentic to elite cricket strategy.
    `;

    let result = await chat.sendMessage({ message: prompt });
    
    // Live Web Context Scraper Execution
    if (result.functionCalls && result.functionCalls.length > 0) {
        const call = result.functionCalls[0];
        if (call.name === "scrape_live_match_context") {
            const args = call.args;
            
            // Simulating an actual external fetch pipeline
            const fetchSimulatedLiveState = async (url) => {
              // In production, this would use fetch() or Puppeteer
              return new Promise(resolve => setTimeout(() => {
                resolve({
                  status: "Success",
                  data: {
                    inferredRunRate: 9.2,
                    pitchDeterioration: "High turning probability observed in last 3 overs",
                    counterfactual: "If the spinner bowls to the left-hander, win probability decreases by 12% due to short boundary on leg side."
                  }
                });
              }, 500));
            };

            const scrapeData = await fetchSimulatedLiveState(args.url);
            
            result = await chat.sendMessage({
              message: [{
                functionResponse: {
                    name: "scrape_live_match_context",
                    response: scrapeData
                }
              }]
            });
        }
    }

    return result.text;
  }
}

export const createAgents = (apiKey) => {
  const headAnalyst = new Agent(
    "The Head Analyst",
    "Data Analyst",
    "gemini-2.5-pro",
    "Grounded strictly in match history, historical player matchups, boundary dimensions, and historical venue run-rates. Proposes the initial tactical move based on maximum probability outcomes. You MUST use the \`scrape_live_match_context\` tool if a URL is provided in the context.",
    apiKey,
    [liveScraperTool]
  );

  const devilsAdvocate = new Agent(
    "The Devil's Advocate",
    "Contrarian Strategist",
    "gemini-2.5-pro",
    "Risk-seeking, contrarian mindset focused on unpredictability, psychological pressure, and exploiting unexpected pitch behavior/dew factors. Aggressively challenges the Analyst’s proposal.",
    apiKey
  );

  const virtualCaptain = new Agent(
    "The Virtual Captain",
    "Decision Maker",
    "gemini-2.5-pro",
    "Pragmatic leadership persona. Focuses on resource preservation and game phase context. Evaluates the conflict, forces a resolution loop, and synthesizes the definitive final decision in authentic commentator prose.",
    apiKey
  );

  return { headAnalyst, devilsAdvocate, virtualCaptain };
};
