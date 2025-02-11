export interface TokenSearchDataTypes {
  chainId: string;
  chainLogoUrl: string;
  chainName: ChainName;
  change: string;
  collectionToken: string;
  decimal: string;
  explorerUrl: string;
  holderAmount: string;
  isCustomToken: string;
  isNativeToken: string;
  isSubscribe: string;
  liquidity: string;
  marketCap: string;
  matchType: string;
  price: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSupportTradeModeVO: TokenSupportTradeModeVO;
  tokenSymbol: string;
  volume: string;
  change1H: string;
  change24H: string;
  change4H: string;
}

export enum ChainName {
  Solana = "Solana",
}

export interface TokenSupportTradeModeVO {
  supportMemeMode: string;
}