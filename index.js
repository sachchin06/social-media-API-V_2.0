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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
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
