export interface TokenListInitialDataType {
  data: TokenListDataType[];
  total: number;
}



export interface TokenListDataType {
  chainId:              string;
  change:               string;
  collectionToken:      string;
  firstPriceTime:       string;
  holders:              string;
  liquidity:            string;
  marketCap:            string;
  price:                string;
  riskLevel:            string;
  searchNum:            string;
  tokenContractAddress: string;
  tokenLogoUrl:         string;
  tokenSymbol:          string;
  txs:                  string;
  txsBuy:               string;
  txsSell:              string;
  uniqueTraders:        string;
  volume:               string;
}
