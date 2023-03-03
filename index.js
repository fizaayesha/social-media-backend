import Express from "express";
const app = Express();
import UserRouter from "./routes/users.js";
import PostRouter from "./routes/posts.js";
import LikeRouter from "./routes/likes.js";
import CommentRouter from "./routes/comments.js";
import AuthRouter from "./routes/auth.js";
app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/comments", CommentRouter);
app.listen(8800, () => {
  console.log("Api is working");
});
