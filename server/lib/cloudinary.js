

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.meta.CLOUDINARY_API_KEY,
    api_secret: process.meta.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
















