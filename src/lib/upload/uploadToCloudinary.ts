import axios from "axios";
import { toast } from "react-toastify";

export const uploadToCloudinary = async (file: File[]) => {
  const cloudName = "dwehtizb5"
  const uploadPreset = "nusadex"

  const formData = new FormData()
  formData.append("file", file[0])
  formData.append("upload_preset", uploadPreset)

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    if (response.status !== 200) {
      toast.error('Error uploading image!')
    }

    return response.data
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

export const deleteFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split("/").pop()?.split(".")[0]; // Ambil `public_id` dari URL
  const cloudName = "dwehtizb5"; // Ganti dengan nama Cloudinary Anda

  const response = await axios.post(`/api/token/delete-cloudinary`, { publicId:`nusadex/${publicId}`, cloudName });
  return response.data;
};


