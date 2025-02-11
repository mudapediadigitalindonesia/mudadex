import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, type, userAddressList } = req.body
  const { id } = req.query

  if (req.method === 'POST') {
    try {
      const resp = await axios.post(`https://www.okx.com/priapi/v1/dx/market/v2/trading-history/filter-list?t=${Math.floor(Date.now() / 1000)}`, {
        desc: true,
        orderBy: 'timestamp',
        limit,
        type: 2,
        tradingHistoryFilter: {
          type,
          userAddressList,
          volumeMin: '',
          volumeMax: '',
          chainId: 501,
          tokenContractAddress: String(id)
        }
      })

      res.status(200).send([resp.data.data])
    }
    catch (error) {
      res.status(500).json({
        msg: 'Internal server error!',
        error
      })
    }
  } else {
    res.status(405).send('Method not allowed')
  }
}

export default handler
