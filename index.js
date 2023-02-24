import express from "express";
const app = express();

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes);

const PORT = 8080;
app.listen(8080, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
