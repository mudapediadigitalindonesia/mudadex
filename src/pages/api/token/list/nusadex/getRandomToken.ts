import prisma from "@/lib/prisma";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const totalTokens = await prisma.tokenListed.count();

    if (totalTokens === 0) {
      return res.status(404).json({
        msg: "No tokens available",
      })
    }
    const randomIndex = Math.floor(Math.random() * totalTokens);

    // Ambil token acak
    const randomToken = await prisma.tokenListed.findFirst({
      skip: randomIndex,
      take: 1,
    });

    if (randomToken) {
      const getTokenDetails = await axios(`https://www.okx.com/priapi/v1/dx/market/v2/search`, {
        params: {
          keyword: randomToken.id,
          chainId: "501",
        },
      })
      res.status(200).json([{
        id: randomToken.id,
        title: randomToken.title,
        pitch: randomToken.pitch,
        tokenImage: randomToken.tokenImage,
        website: randomToken.website,
        x: randomToken.x,
        telegram: randomToken.discord,
        discord: randomToken.discord,
        tokenSymbol: getTokenDetails.data.data[0].tokenSymbol
      }])
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error!",
      error,
    });
  }
};

export default handler;
