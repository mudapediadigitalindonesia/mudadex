import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { walletAddress, tokenContractAddress, sort = 'desc', pageSize = 100, types = 0 } = req.query
  try {
    const resp = await axios.get('https://www.okx.com/priapi/v1/dx/market/v2/my-position/recent-transactions', {
      params: {
        chainId: 501,
        walletAddress,
        tokenContractAddress,
        t: Math.floor(Date.now() / 1000),
        sort,
        pageSize,
        types
      }
    })
    res.send([resp.data.data])
  }
  catch (error) {
    res.status(500).json({
      msg: 'Internal server error!',
      error
    })
  }
}

export default handler
