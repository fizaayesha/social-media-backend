import express from "express";
const app = express();
import UserRouter from "./routes/users.js";
import PostRouter from "./routes/posts.js";
import LikeRouter from "./routes/likes.js";
import CommentRouter from "./routes/comments.js";
import AuthRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
const corsOption = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/comments", CommentRouter);
app.listen(8800, () => {
  console.log("Api is working");
});
