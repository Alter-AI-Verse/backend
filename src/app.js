import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js"
import chatbotRoutes from "./routes/chatbot.routes.js"
import scrapedRoutes from "./routes/scrapedData.routes.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.use(urlencoded(
{ extended: true, 
    limit: "20kb",
}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Persona-Digital version of You !!');
})
app.get('/test', (req, res) => {
  res.send('Check');
})
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/upload", uploadRoutes)
app.use("/api/v1/chatbot", chatbotRoutes)
app.use("/api/v1/scrap", scrapedRoutes)


export { app };
