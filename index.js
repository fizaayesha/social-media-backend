import express from "express";
const app = express();
import UserRouter from "./routes/users.js";
import PostRouter from "./routes/posts.js";
import LikeRouter from "./routes/likes.js";
import RelationshipRouter from "./routes/relationships.js";
import CommentRouter from "./routes/comments.js";
import AuthRouter from "./routes/auth.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.npw() + file.originalName);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/relationships", RelationshipRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/comments", CommentRouter);
app.listen(8800, () => {
  console.log("Api is working");
});
