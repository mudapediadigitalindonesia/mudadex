export interface TokenDetailsDataType {
  info: Info;
  overview: Overview;
  check: Check;
  ranking: Ranking;
  change: ChangeDataType;
  pool: Pool[];
}

export interface Check {
  buyTaxes: string;
  contractAnalysis: Analysis;
  extraAnalysis: Analysis;
  highRiskNum: string;
  lowRiskNum: string;
  middleRiskNum: string;
  riskLevel: string;
  sellTaxes: string;
  swapAnalysis: Analysis;
}

export interface Analysis {
  highRiskList: any[];
  lowRiskList: LowRiskList[];
  middleRiskList: any[];
}

export interface LowRiskList {
  newRiskDesc: string;
  newRiskLabel: NewRiskLabel;
  newRiskName: string;
  riskDesc: string;
  riskName: string;
}

export enum NewRiskLabel {
  No = "No",
}

export interface Info {
  chainBWLogoUrl: string;
  chainLogoUrl: string;
  chainName: string;
  change: string;
  change1H: string;
  change4H: string;
  change5M: string;
  circulatingSupply: string;
  dappList: any[];
  isCollected: string;
  isNotSupportTxNativeToken: string;
  isSubscribe: string;
  isSupportBlinksShareUrl: string;
  isSupportHolder: string;
  isSupportMarketCapKline: string;
  isTxPrice: string;
  marketCap: string;
  maxPrice: string;
  minPrice: string;
  moduleType: string;
  price: string;
  riskLevel: string;
  supportLimitOrder: string;
  supportMemeMode: string;
  supportSingleChainSwap: string;
  supportSwap: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  tradeNum: string;
  transactionNum: string;
  volume: string;
  wrapperTokenContractAddress: string;
}

export interface Overview {
  basicInfo: BasicInfo;
  learnMore: LearnMore;
  marketInfo: MarketInfo;
  memeInfo: null;
  socialMedia: SocialMedia;
  tokenThirdPartInfo: TokenThirdPartInfo;
}

export interface BasicInfo {
  chainLogoUrl: string;
  chainName: string;
  isMeme: string;
  isNativeToken: string;
  isNotSupportTxNativeToken: string;
  tokenContractAddress: string;
}

export interface LearnMore {
  explorer: string;
  officialWebSite: string;
  whitePaper: string;
}

export interface MarketInfo {
  circulatingSupply: string;
  holders: string;
  marketCap: string;
  maxSupply: string;
  priceChange1H: string;
  priceChange24H: string;
  priceChange4H: string;
  priceChange5M: string;
  riskLevel: string;
  snipersClear: string;
  snipersTotal: string;
  suspiciousRatio: string;
  totalLiquidity: string;
}

export interface SocialMedia {
  description: string;
  discord: string;
  facebook: string;
  github: string;
  medium: string;
  officialWebsite: string;
  reddit: string;
  telegram: string;
  twitter: string;
}


export interface TokenThirdPartInfo {
  bubbleMapsUrl: string;
}

export interface Ranking {
  sniperTagHolderAmount: string;
  suspiciousTagHolderAmount: string;
  top10HoldAmountPercentage: string;
  totalHolderAmount: string;
}

export interface ChangeDataType {
  buyAmountUsd: string;
  buyNo: string;
  buyTraders: string;
  hasPushed: boolean;
  sellAmountUsd: string;
  sellNo: string;
  sellTraders: string;
  totalAmountUsd: string;
  totalNo: string;
  totalTraders: string;
}

export interface Pool {
  createTimestamp: number;
  creatorAddress: string;
  dexName: string;
  explorerUrl: string;
  liquidity: string;
  onlyProjectName: string;
  pairAddress: string;
  poolLogoUrl: string;
  poolTokenInfoList: PoolTokenInfoList[];
  projectId: string;
  swapUrl: string;
  versionId: string;
}

export interface PoolTokenInfoList {
  amount: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenSymbol: string;
}
