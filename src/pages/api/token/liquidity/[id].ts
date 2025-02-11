import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, type } = req.query
  try {
    const resp = await axios.post(`https://www.okx.com/priapi/v1/dx/market/v2/pool-liquidity/change-history/filter-list?t=${Math.floor(Date.now() / 1000)}`, {
      desc: true,
      orderBy: "timestamp",
      limit: 50,
      poolHistoryFilter: {
        type,
        userAddressList: [],
        volumeMin: "",
        volumeMax: "",
        chainId: 501,
        tokenContractAddress: id,
      }
    })

    res.status(200).json(resp.data.data.changeVOList)
  }
  catch (error) {
    res.status(500).json({
      msg: 'Internal server error!',
      error
    })
  }
}

export default handler
