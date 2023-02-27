// cloudinary.js

import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (file) => {
  const image = await cloudinary.uploader.upload(file, (result) => result, {
    folder: "social media v 2.0",
    use_filename: true,
  });
  return image;
};
