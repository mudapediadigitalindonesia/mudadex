export interface TradingHistoryDataType {
  hasMore: string;
  list:    List[];
}

export interface List {
  chainId:          string;
  changedTokenInfo: ChangedTokenInfo[];
  dexName:          string;
  id:               string;
  isBuy:            string;
  poolLogoUrl:      string;
  price:            string;
  timestamp:        number;
  txHashUrl:        string;
  userAddress:      string;
  userAddressTagVO: UserAddressTagVO;
  volume:           string;
}

export interface ChangedTokenInfo {
  amount:       string;
  tokenAddress: string;
  tokenSymbol:  string;
}

export interface UserAddressTagVO {
}
