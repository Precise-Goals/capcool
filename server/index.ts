import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createAgents } from './agents';

const app = new Hono();

app.use('*', cors());

app.post('/api/debate', async (c) => {
  const { context, geminiKey } = await c.req.json();
  
  if (!geminiKey) return c.json({ error: "API Key missing" }, 401);

  const { headAnalyst, devilsAdvocate, virtualCaptain } = createAgents(geminiKey);

  // Phase 1: Analyst Proposal
  const analysis = await headAnalyst.analyze(context);
  
  // Phase 2: Devil's Advocate Challenge
  const challenge = await devilsAdvocate.analyze(context, `Analyst Proposal: ${analysis}`);
  
  // Phase 3: Captain Synthesis
  const decision = await virtualCaptain.analyze(context, `
    Analyst Proposal: ${analysis}
    Devil's Advocate Challenge: ${challenge}
  `);

  return c.json({
    transcript: [
      { agent: headAnalyst.name, text: analysis },
      { agent: devilsAdvocate.name, text: challenge },
      { agent: virtualCaptain.name, text: decision }
    ]
  });
});

export default {
  port: 3001,
  fetch: app.fetch,
};
