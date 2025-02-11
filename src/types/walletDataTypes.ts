export interface WalletDataType {
  tokenAssets: TokenAsset[];
  totalValue:  string;
}

export interface TokenAsset {
  chainIndex:      string;
  tokenAddress:    string;
  symbol:          string;
  balance:         string;
  tokenPrice:      string;
  tokenType:       string;
  isRiskToken:     boolean;
  transferAmount:  string;
  availableAmount: string;
  address:         string;
}
