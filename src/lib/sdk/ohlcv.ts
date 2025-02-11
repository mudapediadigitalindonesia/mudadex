import axios from "axios"

const ohlcv = {
  getMarketData: async (baseAddress: string, quoteAddress: string, type: '5m' | '15m' | '1H' | '6H' | '1D' | '1W') => {
    const currentTime = Math.floor(Date.now() / 1000)
    const time_from = currentTime - 3600 * 24 * 2
    try {
      const resp = await axios.get(`https://birdeye-proxy.raydium.io/defi/ohlcv/base_quote`, {
        params: {
          base_address: baseAddress,
          quote_address: quoteAddress,
          type,
          time_from,
          time_to: currentTime
        },
      })
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default ohlcv