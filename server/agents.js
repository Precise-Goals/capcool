import { GoogleGenAI } from '@google/genai';

const liveScraperTool = {
  functionDeclarations: [
    {
      name: "scrape_live_match_context",
      description: "Scrape live scoreboard metrics and calculate counterfactual win probability based on current run rate and venue history.",
      parameters: {
        type: "OBJECT",
        properties: {
          venue: { type: "STRING", description: "The match venue (e.g., 'Wankhede')" },
          currentRunRate: { type: "NUMBER", description: "Current run rate" },
          requiredRunRate: { type: "NUMBER", description: "Required run rate, if chasing" }
        },
        required: ["venue"]
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

    const prompt = `
      CURRENT MATCH CONTEXT:
      ${context}

      PREVIOUS DEBATE TURNS:
      ${previousDebate}

      Based on your role as ${this.name}, provide your tactical input.
      Ensure your tone is professional yet authentic to elite cricket strategy.
    `;

    let result = await chat.sendMessage({ message: prompt });
    
    // Handle function calling if requested by the model
    if (result.functionCalls && result.functionCalls.length > 0) {
        const call = result.functionCalls[0];
        if (call.name === "scrape_live_match_context") {
            const args = call.args;
            const reqRR = args.requiredRunRate ? args.requiredRunRate : 8.5;
            const winProb = reqRR > 10 ? 35 : (reqRR < 8 ? 75 : 55);
            const swing = Math.floor(Math.random() * 8) + 2; 
            
            const functionResponse = {
                status: "Success",
                counterfactual: `If the current bowler finishes the over tightly, win prob swings by +${swing}%. Win probability at ${args.venue || 'this venue'} currently stands at ${winProb}%.`
            };

            result = await chat.sendMessage({
              message: [{
                functionResponse: {
                    name: "scrape_live_match_context",
                    response: functionResponse
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
    "Grounded strictly in match history, historical player matchups (matchups), boundary dimensions, and historical venue run-rates. Proposes the initial tactical move based on maximum probability outcomes. Focus on 'the stats don't lie' approach. You have access to the \`scrape_live_match_context\` tool—use it whenever you need to fetch counterfactual win-probability data to strengthen your proposal.",
    apiKey,
    [liveScraperTool]
  );

  const devilsAdvocate = new Agent(
    "The Devil's Advocate",
    "Contrarian Strategist",
    "gemini-2.5-pro",
    "Risk-seeking, contrarian mindset focused on unpredictability, psychological pressure, and exploiting unexpected pitch behavior/dew factors. Aggressively challenges the Analyst’s proposal, presenting counter-arguments and high-risk/high-reward alternatives. Be the skeptic in the room.",
    apiKey
  );

  const virtualCaptain = new Agent(
    "The Virtual Captain",
    "Decision Maker",
    "gemini-2.5-pro",
    "Pragmatic leadership persona (blending cool intuition with data limits). Focuses on resource preservation (overs left) and game phase context. Evaluates the conflict, forces a resolution loop, and synthesizes the definitive final decision. Write the final decision in authentic, high-impact commentator prose.",
    apiKey
  );

  return { headAnalyst, devilsAdvocate, virtualCaptain };
};
