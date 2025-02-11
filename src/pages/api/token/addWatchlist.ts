import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenContractAddress, address } = req.body

  if (req.method === 'POST') {
    try {
      await prisma.watchlist.create({
        data: {
          tokenContractAddress,
          address
        }
      })
      res.status(200).json({
        msg: 'Token added to watchlist'
      })
    }
    catch (error) {
      res.status(500).json({
        msg: 'Internal server error!',
        error
      })
    }
  } else {
    res.status(405).json({
      msg: 'Method not allowed'
    })
  }
}

export default handler
