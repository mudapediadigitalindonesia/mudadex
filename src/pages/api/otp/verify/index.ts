import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body

  if(req.method === 'POST') {
    try {
      const otp = await prisma.otp.findFirst({ where: { code: String(code) } })
      if (otp) {
        res.status(200).send('otp verified!')
        await prisma.otp.delete({ where: { id: otp.id } })
      } else {
        res.status(401).send('Otp is not match!')
      }
    } catch (error) {
      res.status(500)
      console.log(error)
    }
  } else {
    res.status(405).send('Method not allowed!')
  }
}

export default handler