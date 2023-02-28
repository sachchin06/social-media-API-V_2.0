import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAllPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!!");

    // console.log(userInfo);
    const q = `SELECT p.*, u.id AS userId, profilePic, name FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (r.followedUserId = p.userId) WHERE p.userId = ? OR r.followerUserId = ? ORDER BY createdAt DESC;
`;

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(500).json(err);

    const q =
      "INSERT INTO posts (`description`, `image`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.description,
      req.body.image,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post Has been Created.");
    });
  });
};
