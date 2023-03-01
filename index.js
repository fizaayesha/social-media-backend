import Express from "express";
const app = Express();
import UserRouter from "./routes/users.js";
app.use("/api/users", UserRouter);
app.listen(8800, () => {
  console.log("Api is working");
});
