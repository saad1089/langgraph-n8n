import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "langchain";

dotenv.config();

const app = express();
app.use(express.json());

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini", // or "gpt-4" if you have access
  temperature: 0
});

app.post("/detect-language", async (req, res) => {
  const { languages, location, education, websiteText } = req.body;

  const prompt = `
You are a language detection system.
LinkedIn languages: ${JSON.stringify(languages)}
Location: ${location}
Education: ${JSON.stringify(education)}
Website text: ${websiteText}

Rules:
- Prefer LinkedIn languages
- Else infer from location/education
- Else infer from website language
- Output JSON only

Return format:
{
  "primary_language": string,
  "confidence": "high" | "medium" | "low",
  "source": "linkedin" | "inferred" | "website"
}
`;

  try {
    const output = await llm.call(prompt);
    res.json(JSON.parse(output));
  } catch (err) {
    res.status(500).json({ error: err.message, raw: err.stack });
  }
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`✅ LangGraph running at http://localhost:${port}`);
});

