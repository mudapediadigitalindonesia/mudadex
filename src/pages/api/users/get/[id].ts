import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const data = await prisma.users.findFirst({
      where: { id: String(id) },
      select: {
        createdAt: true,
        email: true,
        emailVerified: true,
        fullname: true,
        image: true,
        password: false,
        walletAddress: true,
      }
    })
    res.send(data)
  } catch (error) {
    res.status(500).json({
      msg: 'Intternal server error!',
      error
    })
    console.log(error)
  }
}

export default handler