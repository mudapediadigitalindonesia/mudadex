import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    const data = await prisma.tokenListed.findMany({ where: { id: String(id) } })
    if (data.length > 0) {
      res.status(404).send('Token has been listed!')
    } else {
      res.status(200).send('Token validated!')
    }
  }
  catch (error) {
    res.status(500).json({
      msg: 'Internal server error!',
      error
    })
  }
}

export default handler
