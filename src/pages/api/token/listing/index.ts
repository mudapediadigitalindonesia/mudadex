import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, pitch, tokenImage, website, telegram, x, discord } = req.body

  if (req.method === 'POST') {
    try {
      await prisma.tokenListed.create({
        data: {
          id,
          discord,
          pitch,
          telegram,
          title,
          tokenImage,
          website,
          x,
        }
      })
      res.status(200).send('Listed!')
    } catch (error) {
      res.status(500).json({
        msg: "Internal server Error!",
        error
      })
      console.log(error)
    }
  } else {
    res.status(405).send('Method not allowed!')
  }
}

export default handler