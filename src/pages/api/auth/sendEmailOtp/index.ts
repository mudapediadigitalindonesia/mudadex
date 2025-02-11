import generateOtp from "@/lib/generateOtp";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to } = req.body

  if (req.method === 'POST') {
    const code = generateOtp()
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NEXT_PRIVATE_GMAIL_USER || '',
          pass: process.env.NEXT_PRIVATE_GMAIL_PASS || ''
        }
      })

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject: 'Email verification!',
        html: `
        <div>
      <div style={
        {
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }>
        <h1>nusadex.com</h1>
        <h1>Welcome, ${to}!</h1>
        <p>Thank you for registering,</p>
        <p>If you did not request this, please ignore this email.</p>
        <br />
        <p>your verification code is:</p>
        <h1 style={{fontSize:70, fontWeight:'bold'}}>${code}</h1>
      </div>
    </div>
        `
      }

      await transporter.sendMail(mailOptions)
      await prisma.otp.create({
        data: {
          code
        }
      })
      res.status(200).send('Email OTP sended!')
    } catch (error) {
      res.status(500).json({
        msg: 'Internal Server Error!',
        error
      })
      console.log(error)
    }
  } else {
    res.status(405).send('Method not allowed!')
  }
}

export default handler