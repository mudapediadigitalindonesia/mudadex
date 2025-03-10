export interface WatchlistDataType {
  chainBWLogoUrl:              string;
  chainLogoUrl:                string;
  chainName:                   string;
  change:                      string;
  change1H:                    string;
  change4H:                    string;
  change5M:                    string;
  circulatingSupply:           string;
  dappList:                    any[];
  isCollected:                 string;
  isNotSupportTxNativeToken:   string;
  isSubscribe:                 string;
  isSupportBlinksShareUrl:     string;
  isSupportHolder:             string;
  isSupportMarketCapKline:     string;
  isTxPrice:                   string;
  marketCap:                   string;
  maxPrice:                    string;
  minPrice:                    string;
  moduleType:                  string;
  price:                       string;
  riskLevel:                   string;
  supportLimitOrder:           string;
  supportMemeMode:             string;
  supportSingleChainSwap:      string;
  supportSwap:                 string;
  tagList:                     Array<string[]>;
  tokenContractAddress:        string;
  tokenLogoUrl:                string;
  tokenName:                   string;
  tokenSymbol:                 string;
  tradeNum:                    string;
  transactionNum:              string;
  volume:                      string;
  wrapperTokenContractAddress: string;
}
