import express from "express";
const app = express();

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import uploadRoutes from "./routes/fileUpload.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

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

//below middleware for upload file in req.files
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

dotenv.config();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/file", uploadRoutes);

const PORT = 8080;
app.listen(8080, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
