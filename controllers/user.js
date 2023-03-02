import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged In !!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(500).json(err);

    const q =
      "UPDATE users SET `email` = ?, `name` = ?, `coverPic` = ?, `profilePic` = ? WHERE (`id` = ?);";

    // const q = "UPDATE users SET `email` = ?, `name` = ? WHERE `id` = ?;";

    const values = [
      req.body.email,
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
      userInfo.id,
    ];

    // const values = [req.body.email, req.body.name, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Profile Has been Updated.");
    });
  });
};
