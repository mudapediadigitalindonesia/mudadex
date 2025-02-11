import { apiConfig, createPreHash, createSignature } from "@/lib/apiUtils";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ msg: "Address parameter is required" });
  }

  const timestamp = new Date().toISOString().slice(0, -5) + "Z";

  try {
    const method = "GET";

    // Endpoint paths
    const pathTokenBalances = `/api/v5/wallet/asset/all-token-balances-by-address?address=${id}&chains=501&filter=1`;
    const pathTotalValue = `/api/v5/wallet/asset/total-value-by-address?address=${id}&chains=501&assetType=0`;

    // Pre-sign for both requests
    const signatureTokenBalances = createSignature(createPreHash(timestamp, method, pathTokenBalances), apiConfig.secretKey);
    const signatureTotalValue = createSignature(createPreHash(timestamp, method, pathTotalValue), apiConfig.secretKey);

    // Headers
    const headers = {
      "OK-ACCESS-KEY": apiConfig.apiKey,
      "OK-ACCESS-SIGN": "",
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": apiConfig.passphrase,
      "OK-ACCESS-PROJECT": apiConfig.projectId,
    };

    // Make requests in parallel
    const [getTokenAssets, getTotalValue] = await Promise.all([
      axios.get(`https://www.okx.com${pathTokenBalances}`, {
        headers: {
          ...headers,
          "OK-ACCESS-SIGN": signatureTokenBalances,
        },
      }),
      axios.get(`https://www.okx.com${pathTotalValue}`, {
        headers: {
          ...headers,
          "OK-ACCESS-SIGN": signatureTotalValue,
        },
      }),
    ]);

    // Parse data
    const tokenAssets = getTokenAssets.data.data[0]?.tokenAssets || [];
    const totalValue = getTotalValue.data.data[0]?.totalValue || [];

    // Combine results
    res.status(200).json([{
      tokenAssets,
      totalValue,
    }]);
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      msg: "Internal server error!",
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
