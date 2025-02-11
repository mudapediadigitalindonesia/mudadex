import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

// mainnet
// const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/cuZrbUds5kC5rvZhSgpQ8Dk8bWPRPrtY', 'confirmed')
// devnet
const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/cuZrbUds5kC5rvZhSgpQ8Dk8bWPRPrtY",
  "confirmed"
);
// const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

const wallet = {
  getBalance: async (publicKey: string) => {
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error(error);
    }
  },
  getTokenAccountBalance: async (publicKey: string) => {
    const rayOwner = Raydium.load({
      connection,
      cluster: "mainnet",
      owner: new PublicKey(publicKey),
    });
    try {
      const data = (
        await (
          await rayOwner
        ).account.fetchWalletTokenAccounts({
          commitment: "confirmed",
          forceUpdate: true,
        })
      ).tokenAccountRawInfos;

      const parsedData = await Promise.all(
        data.map(async (item) => {
          const mintAddress = item.accountInfo.mint.toString();
          const balanceRaw = Number(item.accountInfo.amount);

          // Ambil metadata token mint
          const mintInfo = await getMint(
            connection,
            new PublicKey(mintAddress)
          );
          const decimals = mintInfo.decimals;

          // Hitung saldo sebenarnya
          const balance = balanceRaw / Math.pow(10, decimals);

          return {
            address: mintAddress,
            balance: balance,
          };
        })
      );

      return parsedData;
    } catch (error) {
      console.log(error);
    }
  },
};

export default wallet;
