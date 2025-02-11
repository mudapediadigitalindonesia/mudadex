import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { addr, ca } = req.query;

    if (!addr || typeof addr !== "string") {
      return res.status(400).json({ message: "Invalid or missing 'addr' parameter" });
    }

    const watchlist = await prisma.watchlist.findUnique({
      where: { address: addr },
    });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // If a specific token is requested
    if (ca && typeof ca === "string") {
      const isTokenInWatchlist = watchlist.tokenContractAddress.includes(ca);
      return res.status(200).json({ found: isTokenInWatchlist });
    }

    res.status(200).json(watchlist.tokenContractAddress);
  } catch (error: any) {
    console.error("Error fetching watchlist:", error.message);
    res.status(500).json({
      msg: "Internal server error!",
      error: error.message,
    });
  }
};

export default handler;
