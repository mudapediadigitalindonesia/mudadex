import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res:NextApiResponse) =>{
  try {
    const resp = await axios('https://www.okx.com/priapi/v1/dx/market/v2/ranking/hot-search', {params: {
      chainId: '501',
      t: Math.floor(Date.now() /1000)
    }})
    res.status(200).send(resp.data.data)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server Error!',
      error
    })
  }
}

export default handler