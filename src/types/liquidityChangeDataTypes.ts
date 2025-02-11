export interface LiquidityChangeDataType {
  chainId: string;
  changedTokenInfo: ChangedTokenInfo[];
  id: string;
  poolLogoUrl: string;
  poolName: string;
  timestamp: string;
  tokenContractAddress: string;
  txHashUrl: string;
  type: string;
  userAddressTagVO: UserAddressTagVO;
  userWalletAddress: string;
  value: string;
}

export interface ChangedTokenInfo {
  amount: string;
  tokenSymbol: string;
}



export interface UserAddressTagVO {
  liquidityPool?: string;
  suspicious?: string;
}
