import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { address, tokenContractAddress }: { address: string; tokenContractAddress: string } = req.body;

  try {
    const existingWatchlist = await prisma.watchlist.findUnique({
      where: { address },
    });

    if (existingWatchlist) {
      // Check if the token is already in the array
      if (existingWatchlist.tokenContractAddress.includes(tokenContractAddress)) {
        return res.status(400).json({ message: "Token already in watchlist" });
      }

      // Add the new token to the existing list
      await prisma.watchlist.update({
        where: { address },
        data: {
          tokenContractAddress: [...existingWatchlist.tokenContractAddress, tokenContractAddress],
        },
      });
    } else {
      // Create a new entry with a list containing the token
      await prisma.watchlist.create({
        data: {
          address,
          tokenContractAddress: [tokenContractAddress],
        },
      });
    }

    res.status(200).json({ message: "Token added to watchlist" });
  } catch (error: any) {
    console.error("Error adding to watchlist:", error.message);
    res.status(500).json({
      msg: "Internal server error!",
      error: error.message,
    });
  }
};

export default handler;
