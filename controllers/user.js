import { db } from "../db.js";

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

    //UPDATE `social_app_v2.0`.`users` SET `email` = 'sachchin06@gmail.com', `username` = 'sachchin', `name` = 'sachchin ram', `coverPic` = 'https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=600', `profilePic` = 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE (`id` = '7');

    const q =
      "UPDATE users SET `email` = ?, `name` = ?, `coverPic` = ?, `profilePic` = ? WHERE (`id` = ?);";

    const values = [
      req.body.email,
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
      userInfo.id,
    ];

    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Profile Has been Updated.");
    });
  });
};
