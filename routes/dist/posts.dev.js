"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _post = require("../controllers/post.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _post.getPosts);
router.post("/", _post.addPosts);
router["delete"]("/:id", _post.deletePosts);
var _default = router;
exports["default"] = _default;