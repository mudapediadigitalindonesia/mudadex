import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, id } = req.query
  try {
    const resp = await axios('https://www.okx.com/priapi/v1/dx/market/v2/trading-history/info', {
      params: {
        type,
        chainId: '501',
        tokenContractAddress: String(id),
        t: Math.floor(Date.now() / 1000)
      }
    })
    res.send(resp.data.data)
  }
  catch (error) {
    res.status(500).json({
      msg: 'Internal server error!',
      error
    })
  }
}

export default handler
