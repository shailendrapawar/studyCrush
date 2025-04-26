import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// intialize cloudinary with the credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload the file on cloudinary 
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //   if file uploaded successfully then remove the local file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath); 
  }
};

// delete the file from cloudinary
const deleteOnCloudinary = async (publicId) => {
  try {
    // check if public id is available or not
    if (!publicId) {
      throw new Error("No public id found");
    };

    // delete the file on cloudinary
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return response;
  } catch (error) {
    console.log("Error while deleting the image on cloudinary", error.message);
    return null;
  }
}





export { uploadOnCloudinary, deleteOnCloudinary };
