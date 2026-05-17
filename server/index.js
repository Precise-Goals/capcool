import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createAgents } from './agents.js';

const app = new Hono();

// Global Middleware
app.use('*', cors());

// Health Check
app.get('/health', (c) => c.json({ status: "Engine Operational", timestamp: new Date().toISOString() }));

app.post('/api/debate', async (c) => {
  try {
    const { context, geminiKey } = await c.req.json();
    
    if (!geminiKey) {
      return c.json({ error: "Provisioning Error: GEMINI_API_KEY is missing from the request handshake." }, 401);
    }

    // Initialize 4 distinct agents for maximum technical depth
    const { headAnalyst, devilsAdvocate, virtualCaptain, matchCommentator } = createAgents(geminiKey);

    // --- ADK Multi-Turn Sequential Loop ---
    
    // Phase 1: Propose (Analyst)
    const analysis = await headAnalyst.analyze(context);
    
    // Phase 2: Challenge (Devil's Advocate)
    const challenge = await devilsAdvocate.analyze(context, `Analyst Proposal: ${analysis}`);
    
    // Phase 3: Synthesize (Captain)
    const decision = await virtualCaptain.analyze(context, `
      Analyst Proposal: ${analysis}
      Devil's Advocate Challenge: ${challenge}
    `);

    // Phase 4: Translate (Commentator) - Stretch Goal for Fan Explainability
    const commentary = await matchCommentator.analyze(context, `
      Analytical Proposal: ${analysis}
      Contrarian Risk: ${challenge}
      Final Captain Decision: ${decision}
    `);

    // --- Sequential Trace Payload ---
    return c.json({
      transcript: [
        { agent: headAnalyst.name, text: analysis, role: "Science" },
        { agent: devilsAdvocate.name, text: challenge, role: "Contrarian" },
        { agent: virtualCaptain.name, text: decision, role: "Decision" },
        { agent: matchCommentator.name, text: commentary, role: "Commentary" }
      ]
    });

  } catch (error) {
    console.error("[CRITICAL] Engine Failure:", error);
    return c.json({ 
      error: "Engine Stall Detected", 
      message: error.message,
      trace: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, 500);
  }
});

// Port configuration for Bun
export default {
  port: 3001,
  fetch: app.fetch,
};
