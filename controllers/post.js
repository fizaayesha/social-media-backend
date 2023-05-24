import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is invliad!");
    }
    const q = userId
      ? `SELECT p.*, u.id as userId, name, profilePic FROM 
    posts AS p Join users AS u ON (u.id=p.userId) WHERE p.userId=?`
      : `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p
       Join users AS u ON (u.id=p.userId)
    LEFT JOIN relationship AS r ON (p.userId=r.followedUserId) 
  WHERE r.followerUserId=? OR p.userId=? ORDER BY p.createdAt DESC
  `;
    const values = userId ? [userId] : [userInfo.id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is invliad!");
    }
    const q =
      "INSERT INTO posts (`descrip`, `img`, `createdAt`, `userId`) VALUES(?)";
    const values = [
      req.body.descrip,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has beed added");
    });
  });
};

export const deletePosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is invliad!");
    }
    const q = "DELETE INTO posts WHERE `id`=? AND `userId`=?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRow > 0) {
        return res.status(200).json("Post has beed deleted");
      }
      return res.status(403).json("You can delete only your post");
    });
  });
};
