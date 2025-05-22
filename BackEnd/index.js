import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./Db/ConnectDb.js"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import personalityRoutes from "./routes/personalityRoute.js";
import userPer from "./routes/userPersonalityRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import outcomeRoutes from "./routes/outcomeRoutes.js";
import actionRouttes from "./routes/actionRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/personality", personalityRoutes);
app.use("/api/userPersonality", userPer);
app.use('/api/vision', visionRoutes);
app.use('/api/milestone', milestoneRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/outcome', outcomeRoutes);
app.use('/api/action', actionRouttes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "uploads")));

	app.get("http://localhost:5173", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});