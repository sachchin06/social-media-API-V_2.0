import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../db.js";

export const getAllComments = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!!");

    const q = `SELECT c.*, u.profilePic, u.name FROM comments AS c JOIN users AS u ON (c.userId = u.id) WHERE postId = ? ORDER BY createdAt DESC`;

    db.query(q, [req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!!");

    const q =
      "INSERT INTO comments (`description`, `userId`, `postId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.description,
      userInfo.id,
      req.params.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};
