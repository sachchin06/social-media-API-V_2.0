import express from "express";
import { upload } from "../cloudinary.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  if (!req.files) return res.send("Please upload an image");

  const { image } = req.files;

  //   "image": {
  //         "name": "university-of-kelaniya-logo.png",
  //         "data": {
  //             "type": "Buffer",
  //             "data": []
  //         },
  //         "size": 597865,
  //         "encoding": "7bit",
  //         "tempFilePath": "C:\\Users\\User\\Videos\\Tutorials\\sociaal media app  V 2.0\\api\\tmp\\tmp-1-1677474346535",
  //         "truncated": false,
  //         "mimetype": "image/png",
  //         "md5": "7d0e97eb83fbcf84001cc96c65eccc46"
  //     }

  //check image type
  const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
  // const imageSize = 1024;
  if (!fileTypes.includes(image.mimetype))
    return res.send("Image formats supported: JPG, PNG, JPEG");

  // check image size
  // if (image.size / 1024 > imageSize)
  //   return res.send(`Image size should be less than ${imageSize}kb`);

  const cloudFile = await upload(image.tempFilePath);
  // console.log(image.tempFilePath);
  // console.log(cloudFile);

  res.status(201).json({
    message: "Image uploaded successfully",
    imageUrl: cloudFile.url,
    image: image,
  });
});

export default router;
