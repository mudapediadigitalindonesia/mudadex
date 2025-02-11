export interface PositionDataType {
  hasNext:            boolean;
  isHistorySupported: boolean;
  transactions:       Transaction[];
}

export interface Transaction {
  amount:               string;
  blockHeight:          number;
  blockTime:            number;
  chainId:              number;
  flag:                 boolean;
  globalIndex:          string;
  id:                   number;
  price:                string;
  singleRealizedProfit: string;
  turnover:             string;
  txHash:               string;
  txHashUrl:            string;
  type:                 number;
  walletAddress:        string;
}
