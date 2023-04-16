"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPosts = exports.getPosts = void 0;

var _connect = require("../connect.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPosts = function getPosts(req, res) {
  var userId = req.query.userId;
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is invliad!");
    }

    var q = userId ? "SELECT p.*, u.id as userId, name, profilePic FROM \n    posts AS p Join users AS u ON (u.id=p.userId) WHERE p.userId=?" : "SELECT p.*, u.id as userId, name, profilePic FROM posts AS p Join users AS u ON (u.id=p.userId)\n    LEFT JOIN relationship AS r ON (p.userId=r.followedUserId) \n  WHERE r.followerUserId=? OR p.userId=? ORDER BY p.createdAt DESC\n  ";
    var values = userId ? [userId] : [userInfo.id, userInfo.id];

    _connect.db.query(q, values, function (err, data) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

exports.getPosts = getPosts;

var addPosts = function addPosts(req, res) {
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is invliad!");
    }

    var q = "INSERT INTO posts (`descrip`, `img`, `createdAt`, `userId`) VALUES(?)";
    var values = [req.body.descrip, req.body.img, (0, _moment["default"])(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id];

    _connect.db.query(q, [values], function (err, data) {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has beed added");
    });
  });
};

exports.addPosts = addPosts;