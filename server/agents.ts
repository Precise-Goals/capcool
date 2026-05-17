import { GoogleGenerativeAI } from "@google/generative-ai";

export class Agent {
  name: string;
  role: string;
  model: string;
  systemPrompt: string;
  genAI: GoogleGenerativeAI;

  constructor(name: string, role: string, model: string, systemPrompt: string, apiKey: string) {
    this.name = name;
    this.role = role;
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyze(context: string, previousDebate: string = "") {
    const model = this.genAI.getGenerativeModel({ 
      model: this.model,
      systemInstruction: this.systemPrompt 
    });

    const prompt = `
      CURRENT MATCH CONTEXT:
      ${context}

      PREVIOUS DEBATE TURNS:
      ${previousDebate}

      Based on your role as ${this.name}, provide your tactical input.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

export const createAgents = (apiKey: string) => {
  const headAnalyst = new Agent(
    "The Head Analyst",
    "Data Analyst",
    "gemini-2.0-pro-exp-02-05", // Using latest available pro model
    "Grounded strictly in match history, historical player matchups (matchups), boundary dimensions, and historical venue run-rates. Proposes the initial tactical move based on maximum probability outcomes.",
    apiKey
  );

  const devilsAdvocate = new Agent(
    "The Devil's Advocate",
    "Contrarian Strategist",
    "gemini-2.0-pro-exp-02-05",
    "Risk-seeking, contrarian mindset focused on unpredictability, psychological pressure, and exploiting unexpected pitch behavior/dew factors. Aggressively challenges the Analyst’s proposal, presenting counter-arguments and high-risk/high-reward alternatives.",
    apiKey
  );

  const virtualCaptain = new Agent(
    "The Virtual Captain",
    "Decision Maker",
    "gemini-2.0-pro-exp-02-05",
    "Pragmatic leadership persona (blending cool intuition with data limits). Focuses on resource preservation (overs left) and game phase context. Evaluates the conflict, forces a resolution loop, and synthesizes the definitive final decision.",
    apiKey
  );

  return { headAnalyst, devilsAdvocate, virtualCaptain };
};
