import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    const q = `SELECT * FROM relationship WHERE followerUserId = ?`;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res
        .status(200)
        .json(data.map((relationship) => relationship.followedUserId));
    });
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    const q =
      "INSERT INTO relationship (`followerUserId`, `followedUserId`) VALUES (?)";

    // const values = [userInfo.id, req.body.postId];
    const values = [userInfo.id, req.body.followedUserId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been Followed");
    });
  });
};

export const removeRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not Logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    console.log(req.query.followedUserId);

    const q =
      "DELETE FROM relationship WHERE `followedUserId` = ? AND `followerUserId` = ?";

    db.query(q, [req.query.followedUserId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been unfollowed");
    });
  });
};
