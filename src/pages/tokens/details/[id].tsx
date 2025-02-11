import DialogLiquidityDetails from "@/components/details/dialogLiquidityDetails"
import HistoryTabs from "@/components/details/history-tabs"
import HolderTabs from "@/components/details/holder-tabs"
import LiquidityChangeTabs from "@/components/details/liq-change-tabs"
import PositionTabs from "@/components/details/position-tabs"
import SheetAudit from "@/components/details/sheetAudit"
import TradeTabs from "@/components/details/tradeTabs"
import { Votes } from "@/components/details/votes"
import ModalConnectWallet from "@/components/modals/connectWallet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TokenAdCard from "@/components/ui/tokenAdCard"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import calculateProgress from "@/lib/calcualteProgress"
import formatNumber from "@/lib/formatNumber"
import handleCopy from "@/lib/handleCopy"
import { RandomTokenDataType } from "@/types/randomTokenDataTypes"
import { TokenDetailsDataType } from "@/types/tokenDetailsDataTypes"
import { TokenSearchDataTypes } from "@/types/tokenSearchDataTypes"
import { WatchlistDataType } from "@/types/watchlistDataTypes"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import {
  Copy,
  Earth,
  LoaderCircle,
  Mouse,
  PlusCircle, Search, Star, User
} from "lucide-react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
// import { useEffect, useState } from "react"


const TokenDetailsPage = () => {
  const { id } = useRouter().query
  const [tokenInfo, setTokenInfo] = useState<TokenDetailsDataType[]>([])
  const [trendingToken, setTrendingToken] = useState<TokenSearchDataTypes[]>([])
  const router = useRouter()
  const [type, setType] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [randomTokenData, setRandomTokenData] = useState<RandomTokenDataType[]>([])
  const { connected, publicKey } = useWallet()
  const [isWatchlistFound, setIsWatchlistFound] = useState(false)
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false)
  const [watchlistData, setWatchlistData] = useState<WatchlistDataType[]>([])


  const getInfo = async () => {
    try {
      const resp = await axios(`/api/token/details/${String(id)}`, {
        params: {
          type
        }
      })
      setTokenInfo(resp.data)
    } catch (error) {
      toast.error('Failed to get token info, please reload the page!')
      console.log(error)
    }
  }


  const getTrendingToken = async () => {
    try {
      const resp = await axios('/api/token/search/trending')
      setTrendingToken(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getSearchToken = async () => {
    try {
      const resp = await axios('/api/token/search', {
        params: {
          keyword: searchValue
        }
      })
      setTrendingToken(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady && id) {
      getInfo()
      const interval = setInterval(() => {
        getInfo()
      }, 3000)
      getTrendingToken()
      return () => clearInterval(interval)
    }
  }, [router.isReady, id, type])

  useEffect(() => {
    if (searchValue.length > 0) {
      getSearchToken()
    } else {
      getTrendingToken()
    }
  }, [searchValue])

  const getRandomToken = async () => {
    try {
      const data = await axios('/api/token/list/nusadex/getRandomToken')
      setRandomTokenData(data.data)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getRandomToken()
    // const interval = setInterval(() => {
    //   getRandomToken()
    // }, 60000)
    // return () => clearInterval(interval)
  }, [])

  const getWatchlist = async () => {
    if (connected && publicKey) {
      setIsWatchlistLoading(true)
      try {
        const { data } = await axios.get("/api/users/watchlist/get", {
          params: {
            addr: publicKey?.toBase58(),
            ca: String(id),
          },
        })

        setIsWatchlistFound(data.found)
      } catch (error: any) {
        console.error("Error fetching watchlist:", error.message)
        setIsWatchlistFound(false)
      } finally {
        setIsWatchlistLoading(false)
      }
    }
  }

  useEffect(() => {
    if (router.isReady && id) {
      getWatchlist()
    }
  }, [connected, publicKey, router.isReady])

  const handleAddWatchlist = async () => {
    if (connected && publicKey) {
      setIsWatchlistLoading(true)
      try {
        await axios.post("/api/users/watchlist/add", {
          address: publicKey.toBase58(),
          tokenContractAddress: String(id),
        })

        setIsWatchlistFound(true)
        toast.success("Token added to watchlist!", { position: "top-center" })
      } catch (error: any) {
        console.error("Error adding to watchlist:", error.message)
        toast.error("Failed to add token to watchlist!")
      } finally {
        setIsWatchlistLoading(false)
      }
    } else {
      toast.error("Please connect your wallet first!", { position: "top-center" })
    }
  }

  const hanldeDeleteWatchlist = async () => {
    if (connected && publicKey) {
      setIsWatchlistLoading(true)
      try {
        await axios.delete("/api/users/watchlist/delete", {
          params: {
            addr: publicKey.toBase58(),
            ca: String(id),
          },
        })

        setIsWatchlistFound(false)
        toast.success("Token removed from watchlist!", { position: "top-center" })
      } catch (error: any) {
        console.error("Error deleting from watchlist:", error.message)
        toast.error("Failed to remove token from watchlist!")
      } finally {
        setIsWatchlistLoading(false)
      }
    } else {
      toast.error("Please connect your wallet first!", { position: "top-center" })
    }
  }




  return (
    <>
      {id !== undefined && tokenInfo && tokenInfo.length > 0 ? (
        <>
          <Head>
            <title>{tokenInfo[0].info.tokenSymbol} - ${formatNumber(Number(tokenInfo[0].info.price))} | Trade Now on Nusadex</title>
            <meta name='description' content={`Discover real-time prices and trade ${tokenInfo[0].info.tokenSymbol} on Nusadex. Stay ahead with accurate market data and seamless trading experiences.`} key={'desc'} />
            <meta property='og:description' content={`Discover real-time prices and trade ${tokenInfo[0].info.tokenSymbol} on Nusadex. Stay ahead with accurate market data and seamless trading experiences.`} />
            <meta property='og:description' content={`Discover real-time prices and trade ${tokenInfo[0].info.tokenSymbol} on Nusadex. Stay ahead with accurate market data and seamless trading experiences.`} />
          </Head>
          <div className="w-full h-full lg:py-3 py-6 lg:pb-3 pb-16 space-y-3">

            <div className="flex justify-between lg:items-center items-start">
              <div className="flex lg:items-end items-start lg:flex-row flex-col gap-3">
                <div className=" flex items-center gap-3">
                  {isWatchlistFound ? (
                    <Button variant={'secondary'} size={'icon'} onClick={hanldeDeleteWatchlist} disabled={isWatchlistLoading}>
                      {isWatchlistLoading ? <LoaderCircle size={16} className="animate-spin" /> : <Star className="text-yellow-500" />}
                    </Button>
                  ) : (
                    <Button onClick={handleAddWatchlist} variant={'outline'} size={'icon'} disabled={isWatchlistLoading}>
                      {isWatchlistLoading ? <LoaderCircle size={16} className="animate-spin" /> : <Star />}
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    <img src={tokenInfo[0].info.tokenLogoUrl} alt="" className=" w-12 h-12 object-cover rounded-full p-1" />
                    <div className="space-y-0 leading-snug">
                      <p className="font-bold lg:text-sm text-xs">{tokenInfo[0].info.tokenName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-muted-foreground text-xs font-medium">{String(id).slice(0, 5) + '...' + String(id).slice(-5)}</p>
                        <TooltipProvider delayDuration={50}>
                          <Tooltip>
                            <TooltipTrigger onClick={() => handleCopy(String(id && id))}><Copy strokeWidth={1} size={14} /></TooltipTrigger>
                            <TooltipContent>
                              <p>Copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Separator orientation="vertical" className="h-5 lg:block hidden" />
                  <div className="flex items-center gap-2">
                    <div className="px-2 flex items-center gap-1 py-1 bg-[#2e2e2e] rounded-md">
                      <Mouse strokeWidth={1.5} size={14} />
                      <p className="text-xs lg:block hidden">Suspicious : </p>
                      <p className="text-[#95F121] text-xs">{formatNumber(Number(tokenInfo[0].overview.marketInfo.suspiciousRatio) * 100)}%</p>
                    </div>
                    <div className="px-2 flex items-center gap-1 py-1 bg-[#2e2e2e] rounded-md">
                      <PlusCircle strokeWidth={1.5} size={14} />
                      <p className="text-xs lg:block hidden">Sniper : </p>
                      <p className="text-xs">{tokenInfo[0].ranking.sniperTagHolderAmount}</p>
                    </div>
                    <div className="px-2 flex items-center gap-1 py-1 bg-[#2e2e2e] rounded-md">
                      <User strokeWidth={1.5} size={14} />
                      <p className="text-xs lg:block hidden">Top holder :</p>
                      <p className="text-[#95F121] text-xs">{Number(tokenInfo[0].ranking.top10HoldAmountPercentage).toPrecision(3)}%</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#2e2e2e] px-2 py-1 rounded-md">
                      <button onClick={() => window.open(tokenInfo[0].overview.socialMedia.officialWebsite)}>
                        <Earth size={14} />
                      </button>
                      <Separator orientation="vertical" className="h-4 " />
                      <button className="" onClick={() => window.open(tokenInfo[0].overview.socialMedia.telegram)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram text-sm h-[16px]">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                      </button>
                      <Separator orientation="vertical" className="h-4 " />

                      <button className="" onClick={() => window.open(tokenInfo[0].overview.socialMedia.twitter)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x text-sm h-[16px]">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center lg:gap-5 gap-3 lg:mt-0 mt-2">
                <div className="space-y-0 text-xs">
                  <p className="font-light">Price</p>
                  <p className="font-semibold">${formatNumber(Number(tokenInfo[0].info.price))}</p>
                </div>
                <div className="space-y-0 text-xs lg:block md:block sm:block xs:hidden">
                  <p className="font-light">Market Cap</p>
                  <p className="font-semibold">${formatNumber(Number(tokenInfo[0].info.marketCap))}</p>
                </div>
                <div className="space-y-0 text-xs lg:block hidden">
                  <p>Liquidity</p>
                  <p className="font-semibold">${formatNumber(Number(tokenInfo[0].overview.marketInfo.totalLiquidity))}</p>
                </div>
                <div className="space-y-0 text-xs lg:block hidden">
                  <p>Holders</p>
                  <p className="font-semibold">{tokenInfo[0].overview.marketInfo.holders !== '0' ? formatNumber(Number(tokenInfo[0].overview.marketInfo.holders)) : '--'}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:flex-row flex-col lg:gap-0 gap-5 flex items-start justify-between">
              {/* left */}
              <div className="w-[23%] h-[82vh] border-t border-r p-2 lg:block hidden">
                <Tabs defaultValue="trending" className="w-full space-y-3">
                  <TabsList className=" w-full justify-start">
                    <TabsTrigger value="trending" className="w-full data-[state=active]:bg-foreground data-[state=active]:text-background">
                      Trending
                    </TabsTrigger>
                    <TabsTrigger value="watchlist" className=" w-full data-[state=active]:bg-foreground data-[state=active]:text-background">
                      Watchlist
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="trending">
                    <div className="w-full space-y-3">
                      <div className="flex w-full mb-5 py-1 border-b-[0.5px] border-opacity-10 border-white items-center">
                        <span className="ml-[8px] mr-3">
                          <Search className="w-4" />
                        </span>
                        <input
                          className="bg-transparent text-sm w-full focus:outline-none "
                          type="search"
                          name=""
                          id=""
                          placeholder="Search token name or address"
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </div>
                      <div className="w-full max-h-[50vh] h-[50vh] overflow-auto no-scrollbar">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                              <TableHead className="text-xs">Token/Mcap</TableHead>
                              <TableHead className="text-end text-xs">Price/Change</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {trendingToken && trendingToken.length > 0 ? (
                              trendingToken.filter(item => item.chainId.includes('501')).map((item, index) => (
                                <TableRow key={index} className="border-b-0 cursor-pointer" onClick={() => location.href = `/tokens/details/${item.tokenContractAddress}`}>
                                  <TableCell className="text-xs">
                                    <div className="flex items-center gap-2">
                                      <img src={item.tokenLogoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                                      <div>
                                        <p className="font-semibold">{item.tokenSymbol}</p>
                                        <p className="font-normal text-muted-foreground">{formatNumber(Number(item.marketCap))}</p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-end">
                                    <div>
                                      <p className="font-semibold">${formatNumber(Number(item.price))}</p>
                                      <p className="">
                                        {item.change24H && (
                                          Number(item.change24H) > 0 ? <span className="text-[#25a750]">{formatNumber(Number(item.change24H))}%</span>
                                            : <span className="text-[#ca3f64]">{item.change24H}%</span>
                                        )}
                                        {item.change && (
                                          Number(item.change) > 0 ? <span className="text-[#25a750]">{formatNumber(Number(item.change))}%</span>
                                            : <span className="text-[#ca3f64]">{item.change}%</span>
                                        )}
                                      </p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : <TableRow className="border-b-0"><TableCell colSpan={2} rowSpan={4} className="text-center">No data</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="w-full space-y-3">
                        <div className="flex w-full items-center justify-between">
                          <p>Votes</p>
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <p>0</p>
                          </div>
                        </div>
                        <Votes />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="watchlist" className="h-full justify-between flex flex-col">
                    <div className="w-full max-h-[58vh] h-[58vh] overflow-auto no-scrollbar">
                      {connected ? (
                        <Table>
                          <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                              <TableHead className="text-xs">Token/Mcap</TableHead>
                              <TableHead className="text-end text-xs">Price/Change</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {watchlistData && watchlistData.length > 0 ? (
                              watchlistData.map((item, index) => (
                                <TableRow key={index} className="border-b-0 cursor-pointer" onClick={() => location.href = `/tokens/details/${item.tokenContractAddress}`}>
                                  <TableCell className="text-xs">
                                    <div className="flex items-center gap-2">
                                      <img src={item.tokenLogoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                                      <div>
                                        <p className="font-semibold">{item.tokenSymbol}</p>
                                        <p className="font-normal text-muted-foreground">{formatNumber(Number(item.marketCap))}</p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-end">
                                    <div>
                                      <p className="font-semibold">${formatNumber(Number(item.price))}</p>
                                      <p className="">
                                        {item.change && (
                                          Number(item.change) > 0 ? <span className="text-[#25a750]">{formatNumber(Number(item.change))}%</span>
                                            : <span className="text-[#ca3f64]">{item.change}%</span>
                                        )}

                                      </p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : <TableRow className="border-b-0"><TableCell colSpan={2} rowSpan={4} className="text-center">No data</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="py-5">
                          <div className="flex items-center justify-center flex-col">
                            <div className="text-center">
                              <img src="/wallet-crypto.png" alt="wallet-cryptos" className="h-[72px] mx-auto" />
                              <div className="text-lg mt-2">Watchlist empty</div>
                              <div className="text-xs mt-2">
                                Connect your wallet to manage Watchlist.
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center mt-5">
                            <ModalConnectWallet btnSize={'lg'} variant={'outline'} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full space-y-3">
                      <div className="flex w-full items-center justify-between">
                        <p>Votes</p>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <p>0</p>
                        </div>
                      </div>
                      <Votes />
                    </div>
                  </TabsContent>
                </Tabs>

              </div>

              {/* middle */}
              <div className="lg:w-[54%] w-full lg:h-[82vh] h-full lg:border-t lg:border-r">
                <div className="w-full h-[43vh] p-1">
                  <iframe src={`https://birdeye.so/tv-widget/${id && id === '11111111111111111111111111111111' ? 'So11111111111111111111111111111111111111112' : id}?chain=solana&viewMode=pair&chartInterval=1&chartType=Candle&chartLeftToolbar=show&theme=dark&cssCustomProperties=--tv-color-platform-background%3A%2309090b&cssCustomProperties=--tv-color-pane-background%3A%2309090b&chartOverrides=paneProperties.backgroundType%3Asolid&chartOverrides=paneProperties.background%3Argba%289%2C+9%2C+11%2C+1%29`} className='w-full h-full' allowFullScreen loading='lazy' />
                </div>
                <div className="w-full p-2 h-fit">
                  <Tabs defaultValue="history" className="w-full">
                    <TabsList className="bg-transparent border-b-2 w-full justify-start rounded-none pb-2 ">
                      <TabsTrigger value="history" className="data-[state=active]:bg-foreground data-[state=active]:text-background text-xs">
                        History
                      </TabsTrigger>
                      <TabsTrigger value="liquidity-change" className="data-[state=active]:bg-foreground data-[state=active]:text-background text-xs">
                        Liquidity Change
                      </TabsTrigger>
                      <TabsTrigger value="holders" className="data-[state=active]:bg-foreground data-[state=active]:text-background text-xs">
                        Holders
                      </TabsTrigger>
                      <TabsTrigger value="my-position" className="data-[state=active]:bg-foreground data-[state=active]:text-background text-xs">
                        My Position
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="history">
                      <HistoryTabs />
                    </TabsContent>
                    <TabsContent value="liquidity-change">
                      <LiquidityChangeTabs tokenSymbol={tokenInfo[0].info.tokenSymbol} />
                    </TabsContent>
                    <TabsContent value="holders">
                      <HolderTabs ranking={tokenInfo[0].ranking} />
                    </TabsContent>
                    <TabsContent value="my-position">


                      {connected ? (
                        <PositionTabs price={Number(tokenInfo[0].info.price)} />
                      ) : (
                        <div className="flex justify-center items-center flex-col gap-3 mt-5">
                          <div className="flex items-center justify-center flex-col">
                            <div className="text-center">
                              <img
                                src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image"
                                alt="wallet-cryptos"
                                className="w-28 h-28 mx-auto"
                              />
                              <div className="text-lg mt-2">No data availible</div>
                              <div className="text-xs mt-2">
                                Connect your wallet to check assets.
                              </div>
                            </div>
                          </div>
                          <ModalConnectWallet variant={'outline'} />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* right */}
              <div className="lg:w-[23%] w-full lg:max-h-[82vh] overflow-auto border-t px-2 pt-2 space-y-3 no-scrollbar">
                {/* <h1 className="text-lg font-semibold">Trade</h1> */}

                <div className="space-y-3 w-full border-t pt-3">
                  <h1 className="text-lg font-semibold">Transaction Info</h1>
                  <div className="w-full flex justify-between gap-3">
                    <Button onClick={() => setType(4)} variant={type === 4 ? 'secondary' : 'outline'} size={'sm'} className="w-full h-fit p-1 flex flex-col gap-0">
                      <p>5m</p>
                      <p className={`${Number(tokenInfo[0].overview.marketInfo.priceChange5M) >= 0 ? 'text-[#25a750]' : 'text-[#ca3f64]'}`}>{formatNumber(Number(tokenInfo[0].overview.marketInfo.priceChange5M))}%</p>
                    </Button>
                    <Button onClick={() => setType(1)} variant={type === 1 ? 'secondary' : 'outline'} size={'sm'} className="w-full h-fit p-1 flex flex-col gap-0">
                      <p>1h</p>
                      <p className={`${Number(tokenInfo[0].overview.marketInfo.priceChange1H) >= 0 ? 'text-[#25a750]' : 'text-[#ca3f64]'}`}>{formatNumber(Number(tokenInfo[0].overview.marketInfo.priceChange1H))}%</p>
                    </Button>
                    <Button onClick={() => setType(2)} variant={type === 2 ? 'secondary' : 'outline'} size={'sm'} className="w-full h-fit p-1 flex flex-col gap-0">
                      <p>4h</p>
                      <p className={`${Number(tokenInfo[0].overview.marketInfo.priceChange4H) >= 0 ? 'text-[#25a750]' : 'text-[#ca3f64]'}`}>{formatNumber(Number(tokenInfo[0].overview.marketInfo.priceChange4H))}%</p>
                    </Button>
                    <Button onClick={() => setType(3)} variant={type === 3 ? 'secondary' : 'outline'} size={'sm'} className="w-full h-fit p-1 flex flex-col gap-0">
                      <p>24h</p>
                      <p className={`${Number(tokenInfo[0].overview.marketInfo.priceChange24H) >= 0 ? 'text-[#25a750]' : 'text-[#ca3f64]'}`}>{formatNumber(Number(tokenInfo[0].overview.marketInfo.priceChange24H))}%</p>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <h1 className="text-sm font-medium">Transactions: {formatNumber(Number(tokenInfo[0].change.totalNo))}</h1>
                      <Progress value={calculateProgress(Number(tokenInfo[0].change.buyNo), Number(tokenInfo[0].change.sellNo))} />
                      <div className="w-full flex justify-between items-center">
                        <p className="text-[12px] font-semibold text-[#25a750]">Buys ({formatNumber(Number(tokenInfo[0].change.buyNo))})</p>
                        <p className="text-[12px] font-semibold text-[#ca3f64]">Sells ({formatNumber(Number(tokenInfo[0].change.sellNo))})</p>
                      </div>
                    </div>
                    {/* <div className="space-y-1.5">
                      <h1>Turnover: {formatNumber(Number(tokenInfo[0].info.volume))}</h1>
                      <Progress value={88} />
                      <p className="text-[12px] font-light">Buy value (33k)</p>
                    </div>
                    <div className="space-y-1.5">
                      <h1>Trader: 33</h1>
                      <Progress value={33} />
                      <p className="text-[12px] font-light">Buyers (33)</p>
                    </div> */}
                  </div>
                </div>
                {randomTokenData.length > 0 && (
                  <div className="w-full">
                    <TokenAdCard discord={randomTokenData[0].discord} pitch={randomTokenData[0].pitch} telegram={randomTokenData[0].telegram} title={randomTokenData[0].title} tokenAddress={randomTokenData[0].id} tokenImage={randomTokenData[0].tokenImage} website={randomTokenData[0].website} x={randomTokenData[0].tokenImage} tokenSymbol={randomTokenData[0].tokenSymbol} />
                  </div>
                )}
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <img src={tokenInfo[0].info.tokenLogoUrl} alt="" className="w-14 h-14 object-cover rounded-full p-1" />
                    <div className="space-y-0 leading-snug">
                      <p className="font-semibold">{tokenInfo[0].info.tokenSymbol}</p>
                      <p className="text-muted-foreground text-sm">{tokenInfo[0].info.tokenName}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs max text-wrap">{tokenInfo[0].overview.socialMedia.description.length > 100 ? tokenInfo[0].overview.socialMedia.description.slice(0, 100) + '...' : tokenInfo[0].overview.socialMedia.description}</p>

                  <div className="grid grid-cols-2 gap-2">

                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Audit</p>
                      <SheetAudit data={tokenInfo[0].check} />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Market Cap</p>
                      <p className="text-xs">${formatNumber(Number(tokenInfo[0].info.marketCap))}</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Holders</p>
                      <p className="text-xs">{formatNumber(Number(tokenInfo[0].ranking.totalHolderAmount))}</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Liquidity</p>
                      <DialogLiquidityDetails image={tokenInfo[0].info.tokenLogoUrl} name={tokenInfo[0].info.tokenName} liq={tokenInfo[0].overview.marketInfo.totalLiquidity} data={tokenInfo[0].pool} />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Circulating Supply</p>
                      <p className="text-xs">{formatNumber(Number(tokenInfo[0].info.circulatingSupply))}</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-0.5 p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Maximum Supply</p>
                      <p className="text-xs">{formatNumber(Number(tokenInfo[0].overview.marketInfo.maxSupply))}</p>
                    </div>

                  </div>
                </div>
                <TradeTabs tokenInfo={tokenInfo} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div className="flex items-center gap-3">
            <LoaderCircle size={32} className="animate-spin" />
            <p className="">Loading...</p>
          </div>
        </div>
      )}
    </>
  )
}
export default TokenDetailsPage
