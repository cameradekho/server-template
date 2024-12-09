import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/database";
import User from "./models/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Test route to create a user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
