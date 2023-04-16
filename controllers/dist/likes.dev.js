"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLikes = exports.addLikes = exports.getLikes = void 0;

var _connect = require("../connect.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLikes = function getLikes(req, res) {
  var q = "SELECT userId FROM likes WHERE postId=?";

  _connect.db.query(q, [req.query.postId], function (err, data) {
    if (err) {
      return res.status(500).json(err);
    }

    console.log(data);
    return res.status(200).json(data.map(function (like) {
      return like.userId;
    }));
  });

  console.log("working");
};

exports.getLikes = getLikes;

var addLikes = function addLikes(req, res) {
  console.log(req.body.postId);
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    var q = "INSERT INTO likes (`userId`, `postId`) VALUES(?)";
    var values = [userInfo.id, req.body.postId];

    _connect.db.query(q, [values], function (err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        message: "Post has been liked!",
        data: data
      });
    });
  });
};

exports.addLikes = addLikes;

var deleteLikes = function deleteLikes(req, res) {
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    var q = "DELETE FROM likes WHERE `userId`=? AND `postId`=?"; // const values = [userInfo.id, req.body.postId];

    _connect.db.query(q, [userInfo.id, req.query.postId], function (err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("Post has beed disliked!");
    });
  });
};

exports.deleteLikes = deleteLikes;