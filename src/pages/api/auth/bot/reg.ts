import generateUserId from "@/lib/database/generateUserId"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import hash from "@/lib/database/hash"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body
  const key = String(process.env.NEXT_PRIVATE_HASH_KEY)

  if (req.method === 'POST') {
    const hashedPassword = await hash.encrypt(key, password) as string

    try {
      const findedData = await prisma.botAccess.findUnique({ where: { username: String(username) } })
      if (findedData) {
        res.status(303).json({
          msg: 'Email Found!'
        })
      } else {
        await prisma.botAccess.create({
          data: {
            username,
            password: hashedPassword,
          }
        })
        res.status(200).json({
          msg: 'Reg success!'
        })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'Internal server error!',
        error
      })
      console.log(error)
    }
  } else {
    res.status(405).send('Method not allowed!')
  }
}

export default handler