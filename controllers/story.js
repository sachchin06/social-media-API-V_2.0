import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../db.js";

export const getStories = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged In !!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(500).json(err);

    const q = `SELECT s.*, u.id AS userId, profilePic, name FROM stories AS s JOIN users AS u ON (u.id = s.userId) LEFT JOIN relationship AS r ON (s.userId = r.followedUserId) WHERE s.userId = ? OR r.followerUserId = ? ORDER BY createdAt DESC;`;

    const values = [userInfo.id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged In !!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(500).json(err);

    const q = "INSERT INTO stories (`image`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.image,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story Has been Created.");
    });
  });
};
