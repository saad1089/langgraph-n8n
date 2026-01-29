import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LangGraph server running");
});

app.post("/detect-language", async (req, res) => {
  res.json({
    language: "unknown",
    confidence: "low"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


