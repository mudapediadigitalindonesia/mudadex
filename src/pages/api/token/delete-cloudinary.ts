// pages/api/delete-cloudinary.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { publicId, cloudName } = req.body;

    try {
      const apiSecret = process.env.NEXT_PRIVATE_CLOUDINARY_API_SECRET // Ganti dengan API Secret dari Cloudinary
      const apiKey = process.env.NEXT_PRIVATE_CLOUDINARY_API_KEY; // Ganti dengan API Key dari Cloudinary

      const timestamp = Math.floor(Date.now() / 1000);
      const signature = require("crypto")
        .createHash("sha1")
        .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
        .digest("hex");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          public_id: publicId,
          api_key: apiKey,
          timestamp,
          signature,
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
