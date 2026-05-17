import { createAgents } from './server/agents.js';

async function testDebate() {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error("Please set GEMINI_API_KEY environment variable for testing.");
    return;
  }

  console.log("Initializing agents...");
  const { headAnalyst, devilsAdvocate, virtualCaptain } = createAgents(geminiKey);

  const context = `
    Innings: 2
    Over: 15.2
    Current Score: 142/4
    Wickets Lost: 4
    Batter on Strike: Virat K.
    Current Bowler: Rashid K.
    Pitch Condition: Turning
    Dew Factor: Light
    Venue: Wankhede, Mumbai
    Additional Tactical Context: 42 runs needed off 28 balls. Big hitter on strike. Left-arm spinner has 1 over left. Dew is actively setting in.
  `;

  try {
    console.log("\n--- Phase 1: Analyst Proposal ---");
    const analysis = await headAnalyst.analyze(context);
    console.log(analysis);

    console.log("\n--- Phase 2: Devil's Advocate Challenge ---");
    const challenge = await devilsAdvocate.analyze(context, `Analyst Proposal: ${analysis}`);
    console.log(challenge);

    console.log("\n--- Phase 3: Captain Synthesis ---");
    const decision = await virtualCaptain.analyze(context, `
      Analyst Proposal: ${analysis}
      Devil's Advocate Challenge: ${challenge}
    `);
    console.log(decision);
    
    console.log("\n--- DEBATE COMPLETED SUCCESSFULLY ---");
  } catch (error) {
    console.error("Debate failed:", error);
  }
}

testDebate();
