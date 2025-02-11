import generateUserId from "@/lib/database/generateUserId"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import hash from "@/lib/database/hash"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, fullname, emailVerified = false } = req.body
  const key = String(process.env.NEXT_PRIVATE_HASH_KEY)

  if (req.method === 'POST') {
    const hashedPassword = await hash.encrypt(key, password)
    
    try {
      const findedData = await prisma.users.findUnique({ where: { email } })
      if (findedData) {
        res.status(303).json({
          msg: 'Email Found!'
        })
      } else {
        await prisma.users.create({
          data: {
            fullname,
            id: generateUserId(),
            email,
            password: hashedPassword,
            emailVerified,
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