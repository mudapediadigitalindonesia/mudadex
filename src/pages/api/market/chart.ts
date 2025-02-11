import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

type ParsedDataRow = [
  number, // Timestamp
  number, // Open price
  number, // High price
  number, // Low price
  number, // Close price
  number, // Volume
  number, // Quote volume
  number  // Unclear value
];

type ParsedDataArray = ParsedDataRow[]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query
  try {
    const data = await axios('https://www.okx.com/priapi/v5/dex/token/market/dex-token-hlc-candles', {
      params: {
        chainId: 501,
        address,
        after: Math.floor(Date.now() * 1000),
        bar: '1H',
        limit: 63,
        t: Math.floor(Date.now() / 1000)
      }
    })
    const parsedData: ParsedDataArray = data.data.data.map((row: { map: (arg0: (value: any) => number) => ParsedDataRow; }) => row.map((value: string) => parseFloat(value)) as ParsedDataRow)
    res.send(parsedData)
  }
  catch (error: any) {
    res.status(500).json({
      msg: 'Internal server error!',
      error: error.response?.data
    })
  }
}

export default handler

