import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.API_KEY,
      {
        contents: [{ parts: [{ text: userMessage }] }]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(5000, () => console.log("Server running"));