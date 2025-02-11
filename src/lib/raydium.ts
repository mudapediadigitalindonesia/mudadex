import { Raydium } from "@raydium-io/raydium-sdk-v2"
import { clusterApiUrl, Connection } from "@solana/web3.js"
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

const raydium = Raydium.load({
  connection,
  cluster: 'mainnet',
})


export default raydium