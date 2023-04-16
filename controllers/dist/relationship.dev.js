"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRelationships = exports.addRelationships = exports.getRelationships = void 0;

var _connect = require("../connect.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getRelationships = function getRelationships(req, res) {
  var q = "SELECT followerUserId FROM relationship WHERE followedUserId=?";

  _connect.db.query(q, [req.query.followedUserId], function (err, data) {
    if (err) {
      return res.status(500).json(err);
    } // console.log(data);


    return res.status(200).json(data.map(function (relationship) {
      return relationship.followerUserId;
    }));
  });

  console.log("working");
};

exports.getRelationships = getRelationships;

var addRelationships = function addRelationships(req, res) {
  console.log(req.body.postId);
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    var q = "INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES(?)";
    var values = [userInfo.id, req.body.followedUserId, req.body.followerUserId];

    _connect.db.query(q, [values], function (err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        message: "Following",
        data: data
      });
    });
  });
};

exports.addRelationships = addRelationships;

var deleteRelationships = function deleteRelationships(req, res) {
  var token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  _jsonwebtoken["default"].verify(token, "secretkey", function (err, userInfo) {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    var q = "DELETE FROM relationship WHERE `followedUserId`=? AND `followerUserId`=?"; // const values = [userInfo.id, req.body.postId];

    _connect.db.query(q, [userInfo.id, req.query.followedUserId, req.body.followerUserId], function (err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("Unfollowed");
    });
  });
};

exports.deleteRelationships = deleteRelationships;