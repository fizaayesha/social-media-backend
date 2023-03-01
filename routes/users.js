import express from "express";
const router = express.Router();
router.get("/test", (req, res) => {
  console.log("User Router Testing\n");
  res.send("User Router Testing\n");
});
export default router;
