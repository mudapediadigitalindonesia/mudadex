export interface HoldersDataType {
  chainId:              string;
  explorerUrl:          string;
  extraOne:             string;
  holdAmount:           string;
  holdAmount1HChange:   string;
  holdAmount24HChange:  string;
  holdAmount4HChange:   string;
  holdAmountPercentage: string;
  holdVolume:           string;
  holderTagVO:          HolderTagVO | null;
  holderWalletAddress:  string;
  tokenContractAddress: string;
}

export interface HolderTagVO {
  creator:       string;
  dev:           string;
  liquidityPool: string;
  smartMoney:    string;
  snipers:       string;
  suspicious:    string;
}

