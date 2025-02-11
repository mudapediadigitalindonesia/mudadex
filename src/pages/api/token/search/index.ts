import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword } = req.query
  try {
    const resp = await axios('https://www.okx.com/priapi/v1/dx/market/v2/search', {
      params: {
        keyword,
        chainId: '501'
      }
    })
    res.status(200).send(resp.data.data)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server Error'
    })
  }
}

export default handler