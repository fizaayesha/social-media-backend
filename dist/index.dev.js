"use strict";

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _posts = _interopRequireDefault(require("./routes/posts.js"));

var _likes = _interopRequireDefault(require("./routes/likes.js"));

var _relationships = _interopRequireDefault(require("./routes/relationships.js"));

var _comments = _interopRequireDefault(require("./routes/comments.js"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _cors = _interopRequireDefault(require("cors"));

var _multer = _interopRequireDefault(require("multer"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(_express["default"].json());
var corsOption = {
  origin: ["http://localhost:3000"]
};
app.use((0, _cors["default"])(corsOption));
app.use((0, _cookieParser["default"])());

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.npw() + file.originalName);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
app.post("/api/upload", upload.single("file"), function (req, res) {
  var file = req.file;
  res.status(200).json(file.filename);
});
app.use("/api/users", _users["default"]);
app.use("/api/posts", _posts["default"]);
app.use("/api/relationships", _relationships["default"]);
app.use("/api/likes", _likes["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/comments", _comments["default"]);
app.listen(8800, function () {
  console.log("Api is working");
});