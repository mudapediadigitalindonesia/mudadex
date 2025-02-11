import prisma from "@/lib/prisma"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.tokenListed.findMany();
    if (data.length > 0) {
      const nusadexTokens = await Promise.all(
        data.map(async (item) => {
          const getTokenDetails = await axios(`https://www.okx.com/priapi/v1/dx/market/v2/search`, {
            params: {
              keyword: item.id,
              chainId: "501",
            },
          });

          return {
            ca: item.id,
            title: item.title,
            pitch: item.pitch,
            tokenImage: item.tokenImage,
            website: item.website,
            x: item.x,
            telegram: item.discord,
            discord: item.discord,
            price: getTokenDetails.data.data[0].price,
            marketCap: getTokenDetails.data.data[0].marketCap,
            change: getTokenDetails.data.data[0].change,
            volume: getTokenDetails.data.data[0].volume,
            tokenSymbol: getTokenDetails.data.data[0].tokenSymbol
          }
        })
      )
      res.send(nusadexTokens)
    } else {
      res.send([])
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal server error!",
      error,
    });
  }
};

export default handler;
