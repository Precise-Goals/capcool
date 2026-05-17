### Statement Explanation

**"Captain Cool"** is an advanced, multi-agent AI framework powered by the Google Gemini stack that acts as a virtual IPL captain, orchestrating an internal, multi-turn debate between distinct analytical agents to deliver real-time, context-aware tactical cricket decisions explained in authentic commentator prose.

---

# Product Requirement Document (PRD): Captain Cool

## 1. Executive Summary & Value Proposition

In T20 cricket, tactical decisions happen in seconds but impact the entire tournament. **Captain Cool** is a high-fidelity, agentic platform built exclusively on the Google Gemini ecosystem to simulate elite captaincy (e.g., Dhoni's intuition, Rohit's data-driven setups). By ingest-processing real-time match states, orchestrating an adversarial debate among specialized Gemini agents, and evaluating live data streams, it outputs explainable, high-impact tactical shifts designed to win key match moments.

---

## 2. System Architecture & Tech Stack

To maximize the hackathon evaluation rubric (1000-point scale), the architecture strictly adheres to Google's native AI ecosystem.

### Core Tech Stack Matrix

* **LLM Orchestration:** Gemini API (`gemini-2.5-pro` for deep reasoning debates, `gemini-2.5-flash` for rapid scraping and text-to-speech processing) via the official `@google/genai` SDK.
* **Agent Framework:** Google Agent Development Kit (ADK) to build, manage, and isolate the multi-turn agent conversation loop.
* **Agentic IDE:** Google Antigravity (used during the vibe-coding session to trace agent state mutations and execution workflows).
* **Authentication & State:** Dual-Layer Authentication — Web3 MetaMask Wallet Auth paired with Firebase Auth for secure session management and configuration state persistence.
* **Frontend UI:** Next.js (React) configured with a premium, high-fidelity monochromatic theme utilizing Glassmorphism and Claymorphism interfaces.

---

## 3. Detailed Component Requirements

### 3.1 Authentication & AI Configuration Platform

* **Dual Login Gateway:**
* **Web3 Access:** MetaMask `window.ethereum` handshake to extract wallet addresses for secure, decentralized user sessions.
* **Web2 Access:** Web/Mobile authentication managed through the pre-configured `src/firebase.js` infrastructure.


* **Gemini Environment Provisioning:**
* A dedicated, glassmorphic settings dashboard enabling users to input and validate their custom `GEMINI_API` key safely.
* Secure storage handling that bridges the validated runtime token directly to the backend ADK initialization routine without exposing strings to the client console.



### 3.2 Multi-Agent Engine (The Brain Room)

The core architecture mandates three distinct, named Gemini instances communicating via an ADK multi-turn loop:

| Agent Name | Engine Base | System Prompt Focus | Role in Debate |
| --- | --- | --- | --- |
| **The Head Analyst** | `gemini-2.5-pro` | Grounded strictly in match history, historical player matchups (matchups), boundary dimensions, and historical venue run-rates. | Proposes the initial tactical move based on maximum probability outcomes. |
| **The Devil's Advocate** | `gemini-2.5-pro` | Risk-seeking, contrarian mindset focused on unpredictability, psychological pressure, and exploiting unexpected pitch behavior/dew factors. | Aggressively challenges the Analyst’s proposal, presenting counter-arguments and high-risk/high-reward alternatives. |
| **The Virtual Captain** | `gemini-2.5-pro` | Pragmatic leadership persona (blending cool intuition with data limits). Focuses on resource preservation (overs left) and game phase context. | Evaluates the conflict, forces a resolution loop, and synthesizes the definitive final decision. |

### 3.3 Live Tool Integration & Function Calling

To fulfill the live tool evaluation criterion, the **Head Analyst** agent utilizes native Gemini Function Calling connected to a live context worker:

* **Live Web Context Scraper:** A tool parsing real-time scoreboard metrics directly from live URL strings (e.g., ESPNCricinfo/Cricbuzz) using Gemini's structural context parsing.
* **Dynamic Win-Probability Engine:** A mathematical engine tool that processes current run rates against venue historical metrics to output counterfactual analytics ("If bowler X completes the over, win prob swings by $\pm 6\%$").

---

## 4. UI/UX & High-Fidelity Design Language

The visual identity is designed to score maximum points for presentation, innovation, and professional aesthetic finish.

### Design Tokens & Philosophy

* **Color Palette:** Strict Monochromatic theme (`#000000` pitch blacks, `#FFFFFF` crisp whites, and meticulously layered `#1A1A1A` / `#2D2D2D` dark gray depth shifts).
* **Alternate Section Shifts:** Alternating sections switch backgrounds sharply between pure matte black and deep charcoal gray to divide the analytical dashboard cleanly without relying on colored borders.
* **Glassmorphism Panels:** Main agent debate viewboxes feature frosted-glass backdrops (`backdrop-filter: blur(12px)`) with subtle white borders (`rgba(255,255,255,0.08)`) to showcase complex text layers without looking cluttered.
* **Claymorphism Action Items:** High-priority execution items—such as the **"Simulate Next Ball"** button—use claymorphic rendering (inner shadows combined with smooth external drop shadows) giving a physical, tactually satisfying button pop against the flat monochromatic background.

---

## 5. Repository Integrity & Antigravity Compliance

To prove the solution was naturally vibe-coded using Google's ecosystem tools, the workspace tracking must be explicitly committed.

### `.gitignore` Architecture

The project root must actively tracks agent traces while protecting critical API parameters. Ensure the `.gitignore` explicitly includes the following lines:

```bash
# Core Credentials
.env
.env.local

# Google Antigravity Configuration & Local Execution Traces
# DO NOT ignore the entire folder if you need to showcase evaluation logs,
# but guarantee environment configs are parsed out safely.
.Antigravityfolder/secrets/
.Antigravityfolder/local_cache/

# Node dependencies
node_modules/
.next/

```

### Repository Artifact Checklist

1. **`.Antigravityfolder/`**: Contains execution histories, prompt trace states, and workspace logs generated during development.
2. **`src/firebase.js`**: Integrates the hardcoded initialization parameters cleanly into the unified MetaMask/Firebase multi-login dashboard wrapper.

---

## 6. Hackathon Winning Features & Scenarios

### Complete Match Scenario Execution Trace

To secure the maximum score under the **Documentation & Blog** rubric, the platform UI includes a dedicated "Debate Log Visualizer". When a user inputs a scenario like:

> **Innings 2, Over 15.2, 42 runs needed off 28 balls. Big hitter on strike. Left-arm spinner has 1 over left. Dew is actively setting in.**

The output card displays the raw agentic transcript directly to the user:

1. **Analyst:** *“Brings on the left-arm orthodox spinner. Matchup data shows the batsman struggles with away spin.”*
2. **Devil's Advocate:** *“Object. The ball is soaking wet due to heavy dew. The spinner will slip, lose control of length, and release pressure. Bring on the express pacer for cross-seam deliveries instead.”*
3. **Virtual Captain:** *“Debate closed. We save the spinner for the long-boundary side later. The pacer bowls over the wicket, targeting hard lengths into the pitch.”*
4. **Fan-Friendly Output:** Written in authentic, natural commentator style for the public UI window, avoiding technical jargon entirely.