  import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM relationship WHERE followedUserId=?";
  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    // console.log(data);
    return res.status(200).json(data.map((relationship) => relationship.followerUserId));
  });
  console.log("working");
};

export const addRelationships = (req, res) => {
  console.log(req.body.postId);
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const q = "INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES(?)";
    const values = [userInfo.id, req.body.followedUserId, req.body.followerUserId];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        message: "Following",
        data: data,
      });
    });
  });
};

export const deleteRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const q = "DELETE FROM relationship WHERE `followedUserId`=? AND `followerUserId`=?";
    // const values = [userInfo.id, req.body.postId];
    db.query(q, [userInfo.id, req.query.followedUserId, req.body.followerUserId], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Unfollowed");
    });
  });
};
