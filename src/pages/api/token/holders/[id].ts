import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, tag = -1 } = req.query
  try {
    const resp = await axios('https://www.okx.com/priapi/v1/dx/market/v2/holders/tag/filter', {
      params: {
        chainId: 501,
        tokenAddress: String(id),
        tag,
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
