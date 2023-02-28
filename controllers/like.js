import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllLikes = (req, res) => {
  const q = `SELECT * FROM likes WHERE postId = ?`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

    const values = [userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been liked");
    });
  });
};

export const removeLike = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    // const values = [userInfo.id, req.query.postId];

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been deleted");
    });
  });
};
