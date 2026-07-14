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

// 3. Studio AI Director - Lightweight Cinematic Script & Storyboard Generator
app.post("/api/director/draft", async (req, res) => {
  try {
    const { format, mood, brief } = req.body;

    if (!format || !mood || !brief) {
      return res.status(400).json({ error: "Missing required fields (format, mood, brief)" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API Key is not configured. Please add it via Settings > Secrets." 
      });
    }

    const prompt = `Draft a high-tempo cinematic 4-shot storyboard sequence for a visual production:
Format/Pipeline: ${format}
Aesthetic Mood: ${mood}
Creative Brief/Concept: ${brief}

Design exactly 4 sequential camera shots that outline an immersive storytelling visual. Keep descriptions punchy, specific to professional visual CGI/animation pipelines, and highly scannable. Returns JSON output matching the required schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Lead Creative Director and CGI Director at Visual Adda. Your job is to draft concise, highly cinematic, and actionable storyboards, soundscapes, and render engine prompts. Represent all instructions in clear visual studio terminology. Keep output strictly professional, aesthetic, and completely free of conversational fluff.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pitch: { type: Type.STRING, description: "A highly cinematic, catchy tagline or hook for the trailer." },
            recommendedEngine: { type: Type.STRING, description: "E.g. 'Unreal Engine 5.4 Path-Tracing', 'Three.js / React Three Fiber', 'Octane + Cinema4D'" },
            sfxProfile: { type: Type.STRING, description: "Describe the spatial background score and sound design, e.g. 'Low low-frequency sub-base, cinematic riser, ambient rain patters.'" },
            storyboard: {
              type: Type.ARRAY,
              description: "Exactly four sequential storyboard shots.",
              items: {
                type: Type.OBJECT,
                properties: {
                  shotNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Name of the shot, e.g. 'The Majestic Monolith'" },
                  duration: { type: Type.INTEGER, description: "Shot duration in seconds (e.g., 5 or 8)" },
                  cameraMovement: { type: Type.STRING, description: "Exact camera move, e.g., 'Slow drone truck-in, tilting up 15 degrees'" },
                  lighting: { type: Type.STRING, description: "Exact light temperature and direction, e.g., 'Golden hour backlighting, high-contrast shadow lines'" },
                  cgiPrompt: { type: Type.STRING, description: "A state-of-the-art text prompt that can be used in stable diffusion or render pipelines." },
                  voiceover: { type: Type.STRING, description: "A 1-sentence majestic voiceover script line to accompany the visual." }
                },
                required: ["shotNumber", "title", "duration", "cameraMovement", "lighting", "cgiPrompt", "voiceover"]
              }
            }
          },
          required: ["pitch", "recommendedEngine", "sfxProfile", "storyboard"]
        }
      }
    });

    const draftText = response.text;
    if (!draftText) {
      throw new Error("No storyboard draft returned from Gemini API");
    }

    res.json({ success: true, draft: JSON.parse(draftText) });

  } catch (error: any) {
    console.error("Error generating storyboard draft:", error);
    res.status(500).json({ 
      error: "Failed to generate storyboard draft", 
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
