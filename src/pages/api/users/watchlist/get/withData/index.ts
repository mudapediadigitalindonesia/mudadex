import prisma from "@/lib/prisma";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { addr } = req.query;

  try {
    // Fetch watchlist data for the given address
    const data = await prisma.watchlist.findUnique({ where: { address: addr as string } });

    if (!data) {
      return res.status(404).json({ msg: "Data not found!" });
    }

    // Fetch token details for each token in the watchlist
    const tokenDetails = await Promise.all(
      data.tokenContractAddress.map(async (token) => {
        try {
          const response = await axios.get("https://www.okx.com/priapi/v1/dx/market/v2/latest/info", {
            params: {
              chainId: "501",
              tokenContractAddress: token,
              t: Math.floor(Date.now() / 1000),
            },
          });
          return response.data.data; // Include token and its details
        } catch (error:any) {
          console.error(`Failed to fetch details for token ${token}:`, error.message);
          return {  details: null }; // Return null for failed requests
        }
      })
    );

    // Send the aggregated response
    res.status(200).json(tokenDetails);
  } catch (error: any) {
    console.error("Error fetching watchlist:", error.message);
    res.status(500).json({
      msg: "Internal server error!",
      error: error.message,
    });
  }
};

export default handler;
