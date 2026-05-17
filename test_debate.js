import { createAgents } from './server/agents.js';

async function testDebate() {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error("CRITICAL: Set GEMINI_API_KEY environment variable for testing.");
    return;
  }

  console.log("--- SYSTEM INITIALIZATION: 4-AGENT ADK LOOP ---");
  const { headAnalyst, devilsAdvocate, virtualCaptain, matchCommentator } = createAgents(geminiKey);

  const context = `
    VENUE: Wankhede Stadium, Mumbai
    INNINGS: 2
    PHASE: Death Overs (17.4)
    SCORE: 168/5 (Target 202)
    BATTER: Andre Russell (34* off 12)
    BOWLER: Jasprit Bumrah (1 over left)
    TACTICAL: Heavy dew reported on field. Ball is soapy.
  `;

  try {
    console.log("\n[1] DATA SCIENCE PROP...");
    const analysis = await headAnalyst.analyze(context);
    console.log(analysis);

    console.log("\n[2] CONTRARIAN CHALLENGE...");
    const challenge = await devilsAdvocate.analyze(context, analysis);
    console.log(challenge);

    console.log("\n[3] CAPTAIN SYNTHESIS...");
    const decision = await virtualCaptain.analyze(context, `Prop: ${analysis} \n Risk: ${challenge}`);
    console.log(decision);

    console.log("\n[4] FAN-FRIENDLY COMMENTARY...");
    const commentary = await matchCommentator.analyze(context, decision);
    console.log(commentary);
    
    console.log("\n--- E2E VALIDATION SUCCESSFUL ---");
  } catch (error) {
    console.error("Engine Stall:", error);
  }
}

testDebate();
