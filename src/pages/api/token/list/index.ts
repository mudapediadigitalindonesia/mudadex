import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { chainIds, changePeriod, desc, liquidityMin, periodType, rankBy, riskFilter, stableTokenFilter, tokenAgeType, tradeNumPeriod, txsPeriod, volumeMin, volumePeriod, changeMin, changeMax, txsMax, txsMin, uniqueTraderPeriod, uniqueTraderMin, uniqueTraderMax, volumeMax, holdersMin, holdersMax, tradeNumMin, tradeNumMax, marketCapMin, marketCapMax, fdvMin, fdvMax , liquidityMax, tokenAgeMin, tokenAgeMax, page} = req.query

  try {
    const params: Record<string, any> = {
      chainIds,
      changePeriod,
      desc,
      liquidityMin,
      periodType,
      rankBy,
      riskFilter,
      stableTokenFilter,
      tags: "0",
      tokenAgeType,
      tradeNumPeriod,
      txsPeriod,
      volumeMin,
      volumePeriod,
      accountId: "62ACC814-261A-455F-B4F7-F493873C44FD",
      t: Math.floor(Date.now() / 1000),
      changeMin,
      changeMax,
      txsMax,
      txsMin,
      uniqueTraderPeriod,
      uniqueTraderMin,
      uniqueTraderMax,
      volumeMax,
      holdersMax,
      holdersMin,
      tradeNumMin,
      tradeNumMax,
      marketCapMax,
      marketCapMin,
      fdvMin,
      fdvMax,
      liquidityMax,
      tokenAgeMin,
      tokenAgeMax,
      page
    }

    if (changeMax === '0') delete params.changeMax
    if (changeMin === '0') delete params.changeMin
    if (txsMax === '0') delete params.txsMax
    if (txsMin === '0') delete params.txsMin
    if (uniqueTraderPeriod === '0') delete params.uniqueTraderPeriod
    if (uniqueTraderMax === '0') delete params.uniqueTraderMax
    if (uniqueTraderMin === '0') delete params.uniqueTraderMin
    if (volumeMax === '0') delete params.volumeMax
    if (holdersMax === '0') delete params.holdersMax
    if (holdersMin === '0') delete params.holdersMin
    if (tradeNumMin === '0') delete params.tradeNumMin
    if (tradeNumMax === '0') delete params.tradeNumMax
    if (marketCapMax === '0') delete params.marketCapMax
    if (marketCapMin === '0') delete params.marketCapMin
    if (fdvMax === '0') delete params.fdvMax
    if (fdvMin === '0') delete params.fdvMin
    if (liquidityMax === '0') delete params.liquidityMax
    if (tokenAgeMin === '0') delete params.tokenAgeMin
    if (tokenAgeMax === '0') delete params.tokenAgeMax

    const data = await axios('https://www.okx.com/priapi/v1/dx/market/v2/advanced/ranking/content', { params })
    // console.log(params)
    res.status(200).json([
      {
        data: data.data.data.marketListsTokenInfos,
        totalPage: data.data.data.totalPage
      }
    ])
  } catch (error) {
    res.status(500).send('Internal server Error!')
    console.log(error)
  }
}

export default handler