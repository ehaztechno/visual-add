import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Route to serve local showreel video from the workspace root
app.get("/VA-Showreel-LQ.mp4", (req, res) => {
  const videoPath = path.join(process.cwd(), "VA-Showreel-LQ.mp4");
  res.sendFile(videoPath, (err) => {
    if (err) {
      // If local file is not found, redirect to a beautiful high-quality cinematic video
      res.redirect("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4");
    }
  });
});

// 1. Generate Custom AI Strategic Blueprint using Gemini
app.post("/api/proposal/generate", async (req, res) => {
  try {
    const { companyName, industry, bottlenecks, budget, teamSize } = req.body;

    if (!companyName || !industry || !bottlenecks) {
      return res.status(400).json({ error: "Missing required fields (companyName, industry, bottlenecks)" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API Key is not configured. Please add it via the Settings > Secrets menu." 
      });
    }

    const prompt = `Act as the Lead Creative Director at Visual Adda. Provide a comprehensive, professional, and bespoke visual design, media automation & interactive experiences proposal blueprint for our client:
Company Name: ${companyName}
Industry: ${industry}
Primary Bottlenecks: ${bottlenecks}
Company Size: ${teamSize || "Medium (50-200 employees)"}
Allocated Budget Range: ${budget || "Scale (₹8,00,000 - ₹25,00,000)"}

Analyze their requirements, calculate concrete estimated production savings in Indian Rupees (INR) (hours reclaimed/effort saved), and propose three specific visual media solutions (e.g. 2D animations, 3D CGI walkthroughs, motivational AVs, interactive activities), a phase-based project roadmap, and technology recommendation tools (e.g., Unreal Engine, Resolume Arena, Blender). Output must follow the required JSON structure precisely.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class executive producer and creative director at Visual Adda. You design extremely professional, structured, and realistic media, CGI, and spatial design proposal blueprints with high-fidelity, actionable steps and clear production metrics.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: {
              type: Type.STRING,
              description: "High-impact summary outlining the current operational state, core AI opportunity, and projected outcomes."
            },
            projectedROI: {
              type: Type.OBJECT,
              properties: {
                annualSavingsUSD: { type: Type.NUMBER, description: "Estimated Indian Rupees (INR) savings annually." },
                hoursReclaimedWeekly: { type: Type.NUMBER, description: "Hours reclaimed per team member/workflow weekly." },
                efficiencyGainPercent: { type: Type.NUMBER, description: "Projected percentage throughput increase." },
                paybackPeriodMonths: { type: Type.NUMBER, description: "Estimated months to break even on integration costs." }
              },
              required: ["annualSavingsUSD", "hoursReclaimedWeekly", "efficiencyGainPercent", "paybackPeriodMonths"]
            },
            architecturalWorkflows: {
              type: Type.ARRAY,
              description: "Exactly three highly detailed bespoke AI agentic workflows designed to resolve their specific bottlenecks.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  techStack: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Tech list e.g., ['Gemini 3.5 Flash', 'Pinecone Vector DB', 'LangGraph Swarm']"
                  },
                  stepByStepFlow: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Detailed operational steps representing the agent's logic."
                  },
                  impactLevel: { type: Type.STRING, description: "E.g. 'Critical / High / Moderate'" }
                },
                required: ["title", "description", "techStack", "stepByStepFlow", "impactLevel"]
              }
            },
            implementationPhases: {
              type: Type.ARRAY,
              description: "A professional deployment roadmap spanning phases.",
              items: {
                type: Type.OBJECT,
                properties: {
                  phaseNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  durationWeeks: { type: Type.INTEGER },
                  deliverables: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["phaseNumber", "title", "durationWeeks", "deliverables"]
              }
            },
            concludingAdvice: {
              type: Type.STRING,
              description: "Strategic advice or warnings about readiness, ethical standards, and how to successfully adopt agent workflows."
            }
          },
          required: ["executiveSummary", "projectedROI", "architecturalWorkflows", "implementationPhases", "concludingAdvice"]
        }
      }
    });

    const blueprintText = response.text;
    if (!blueprintText) {
      throw new Error("No response text returned from Gemini API");
    }

    const parsedBlueprint = JSON.parse(blueprintText);
    res.json({ success: true, blueprint: parsedBlueprint });

  } catch (error: any) {
    console.error("Error generating strategic blueprint:", error);
    res.status(500).json({ 
      error: "Failed to generate AI blueprint", 
      details: error?.message || String(error) 
    });
  }
});

// 2. Interactive AI Agent Simulator (The Thinking Sandbox)
app.post("/api/playground/generate", async (req, res) => {
  try {
    const { agentType, userPrompt } = req.body;

    if (!agentType || !userPrompt) {
      return res.status(400).json({ error: "Missing agentType or userPrompt parameters" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API Key is not configured." 
      });
    }

    const systemPrompt = `You are simulating an advanced Creative Media Engine of type: "${agentType}" built by Visual Adda.
The user is prompting you with: "${userPrompt}".

To show our premium studio capabilities, you must provide a "Thinking & Execution Chain" showing how you solve this.
You must return a JSON response containing:
1. "thoughtChain": An array of at least 3-4 internal sub-thought objects describing the artistic reasoning, camera rigs setup, physical asset baking, or rendering passes you perform.
2. "finalResponse": The final highly polished answer/result delivered to the client.
3. "executionMetadata": Execution metrics like processing speed, memory usage, tokens consumed, and confidence score.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thoughtChain: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stage: { type: Type.STRING, description: "E.g. 'Ingestion', 'Vector Search', 'Reasoning Loop', 'Tool Execution'" },
                  thought: { type: Type.STRING, description: "Detailed internal thoughts of the agent as it thinks" },
                  actionTaken: { type: Type.STRING, description: "E.g. 'Queried Pinecone for user_context', 'Validating syntax', 'Running python sandbox'" }
                },
                required: ["stage", "thought", "actionTaken"]
              }
            },
            finalResponse: {
              type: Type.STRING,
              description: "The actual final polished response generated by the simulated agent."
            },
            executionMetadata: {
              type: Type.OBJECT,
              properties: {
                timeElapsedMs: { type: Type.INTEGER },
                confidenceScorePercent: { type: Type.NUMBER },
                agentStatus: { type: Type.STRING, description: "E.g., 'SUCCESS', 'HALTED', 'COMPLETED'" }
              },
              required: ["timeElapsedMs", "confidenceScorePercent", "agentStatus"]
            }
          },
          required: ["thoughtChain", "finalResponse", "executionMetadata"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response returned from agent simulation");
    }

    res.json({ success: true, result: JSON.parse(resultText) });

  } catch (error: any) {
    console.error("Error in agent simulation:", error);
    res.status(500).json({ 
      error: "Agent simulation failed", 
      details: error?.message || String(error) 
    });
  }
});

// 3. Visual Adda AI Agent Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message parameter" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API key is not configured. Please add it via Settings > Secrets." 
      });
    }

    // Build conversation payload with history and current message
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const systemInstruction = `You are "AddaBot", the friendly, highly creative, and extremely polished AI representative for "Visual Adda" (https://ai.studio/build/visual-adda), an elite Indian visual production and 3D architectural CGI studio.

Your purpose is to welcome visitors, explain Visual Adda's creative capabilities, help them understand our pricing tiers, and guide them in booking/contacting the team. You must answer questions using only real information about the agency.

Key Agency Information to Reference:
1. Brand Identity & Purpose: Located in India. Tagline: "One Studio. Endless Possibilities." and "Creating Experiences. Delivering Impact." We operate at the intersection of cinematic storytelling, high-fidelity 3D CGI, and interactive graphics.
2. Services & Pipelines:
   - 3D CGI Walkthroughs (e.g., 4K path-traced Octane / Unreal engine renders for premium high-rise developers).
   - 2D Animation & Illustration (brand mascot pencil sketch concepts to polished neon-lit digital vector art).
   - Corporate Film & AV Production (synchronized widescreen LED backdrops, employee anthems, high-tempo promotional trailers).
   - Interactive WebGL (real-time virtual tour systems, layout builders).
3. The Team Roster:
   - Aryan Dev (Creative Director)
   - Tanya Sen (3D Specialist & CGI Lead)
   - Rishi Raj (Digital Video Producer)
   - Karan Mehta (Walkthrough Architect)
   - Sneha Kapur (Interactive Tech Lead)
4. Premium Indian Pricing Tiers (in INR):
   - Standard Reel & AV Plan: ₹99,000 (annual rate/project) or ₹1,25,000 (one-time). Ideal for social trailers, single teasers, short pitches.
   - Interactive Walkthrough Suite: ₹2,25,000 (annual rate/project) or ₹2,80,000 (one-time). For photorealistic architectural walk-throughs and WebGL exploration rigs.
   - Studio Retainer Partner: ₹5,10,000 (annual rate/month) or ₹6,40,000 (one-time/month). Unlimited VFX, architectural CGI, edits, with a dedicated team on retainer.
5. Interactive features on the website the user can try:
   - "Before & After Slider" under Case Studies: Compare grey viewport meshes with 4K renders, or pencil drafts with finished neon vectors.
   - "Creative Lab / AI Playground" on the main page: Interact with 4 specialized engines (Render Optimizer, Motion Choreographer, Storyboard Illustrator, Spatial Audio Synth).
   - "Proposal Wizard" in the navigation/services area: Let visitors input their business size, bottlenecks, and industry to instantly get a bespoke visual strategy plan, ROI projection, and phase roadmaps.
6. Conversation Tone:
   - Creative, professional, encouraging, and welcoming.
   - Since we are an Indian-based agency, represent all money amounts in INR (₹) using Indian styling (e.g., Lakhs/Crores, e.g. ₹2.25 Lakhs) and never quote USD ($).
   - Keep replies concise, structurally clean with scannable bullet points, and prompt them to fill out the Contact Form or use the Interactive Proposal Wizard if they are ready to brief us!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response at this moment. How else can I assist you with Visual Adda's production workflows?";
    res.json({ success: true, text: reply });

  } catch (error: any) {
    console.error("Error in chatbot endpoint:", error);
    res.status(500).json({ 
      error: "Failed to generate chat response", 
      details: error?.message || String(error) 
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Visual Adda server listening on http://localhost:${PORT}`);
  });
}

startServer();
