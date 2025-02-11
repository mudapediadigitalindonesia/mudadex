import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { addr, ca } = req.query;

    if (!addr || typeof addr !== "string") {
      return res.status(400).json({ message: "Invalid or missing 'addr' parameter" });
    }
    if (!ca || typeof ca !== "string") {
      return res.status(400).json({ message: "Invalid or missing 'ca' parameter" });
    }

    const watchlist = await prisma.watchlist.findUnique({
      where: { address: addr },
    });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const updatedTokens = watchlist.tokenContractAddress.filter((token) => token !== ca);

    await prisma.watchlist.update({
      where: { address: addr },
      data: { tokenContractAddress: updatedTokens },
    });

    res.status(200).json({ message: "Token removed from watchlist" });
  } catch (error: any) {
    console.log("Error deleting from watchlist:", error.message);
    res.status(500).json({
      msg: "Internal server error!",
      error: error.message,
    });
  }
};

export default handler;
