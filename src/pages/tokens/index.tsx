import ExclusiveTokens from "@/components/exclusiveTokens";
import ModalConnectWallet from "@/components/modals/connectWallet";
import Watchlist from "@/components/tokens/watchlist";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import PaginationLoop from "@/components/ui/paginationLoop";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatNumber from "@/lib/formatNumber";
import formatRelativeTime from "@/lib/formatRelativeDate";
import { TokenListDataType } from "@/types/tokenListDataTypes";
import { TokenSearchDataTypes } from "@/types/tokenSearchDataTypes";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { ChartNoAxesCombined, ChevronDown, ChevronUp, CircleAlert, Edit2Icon, Filter, Flame, Search, ShieldAlert, ShieldBan, ShieldCheck, ShieldQuestion, Sprout, Trash } from "lucide-react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


interface TableSortProps {
  label: string,
  sortView?: boolean,
  rankBy?: number,
  rank?: number,
  desc?: boolean,
  setRankBy?: Dispatch<SetStateAction<number>>
  setDesc?: Dispatch<SetStateAction<boolean>>
  setTokensData?: Dispatch<SetStateAction<TokenListDataType[]>>
  tokensData?: TokenListDataType[],
  setPage?: Dispatch<SetStateAction<number>>
}

const TableSort = ({ label, sortView = true, rankBy, desc, setDesc, setRankBy, rank, setTokensData, tokensData, setPage }: TableSortProps) => {

  const handler = () => {
    setDesc && setDesc(!desc)
    setRankBy && setRankBy(Number(rank))
    setTokensData && setTokensData([])
    setPage && setPage(1)
  }

  return (
    <>
      <Button onClick={handler} disabled={tokensData && tokensData.length > 0 ? false : true} variant={"ghost"} className="hover:bg-transparent hover:text-muted-foreground/80 p-0 w-fit [&_svg]:size-[16px]">
        <div className="flex items-center gap-2">
          <div className="font-medium text-xs">
            {label}
          </div>
          {sortView && sortView === true && (
            <div className="-space-y-1.5">
              <ChevronUp strokeWidth={2} className={`${rank === rankBy && !desc && 'text-foreground'}`} />
              <ChevronDown strokeWidth={2} className={`${rank === rankBy && desc && 'text-foreground'}`} />
            </div>
          )}
        </div>
      </Button>
    </>
  )
}

interface SearchTokensProps {
  tabs?: string
}

const SearchTokens = ({ tabs }: SearchTokensProps) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [tokensDefault, setTokensDefault] = useState<TokenSearchDataTypes[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)


  const getHotSearch = async () => {
    try {
      const resp = await axios('/api/token/search/trending')
      setTokensDefault(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => () => {
    getHotSearch()
  }, [])

  useEffect(() => {
    if (!sheetOpen) {
      setSearchValue('')
    }
  }, [sheetOpen])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const resp = await axios(`/api/token/search?keyword=${searchValue}`)
      setTokensDefault(resp.data)
      setLoading(false)
    } catch (error) {
      console.log(false)
    }
  }

  useEffect(() => {
    if (searchValue !== '') {
      handleSearch()
    } else {
      getHotSearch()
    }
  }, [searchValue])

  return (
    <>
      {tabs && tabs === 'tokens' && (
        <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
          <Button variant={'outline'} className="sm:w-80 justify-start" onClick={() => setSheetOpen(true)}>
            <span className="">
              <Search className="w-5" />
            </span>
            <p className="lg:block md:block hidden">Search token name or address</p>
          </Button>
          <DialogContent className="max-w-screen-md">
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
            <div className="mb-2 text-sm text-muted-foreground">
              {searchValue !== '' ? (
                'Results'
              ) : 'Top Searches'}
            </div>
            <div className="max-h-[65vh] lg:h-[65vh] h-full overflow-auto">
              {tokensDefault.length > 0 ? (
                <Table className="overflow-auto no-scrollbar">
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      {/* <TableHead className="lg:table-cell hidden"></TableHead> */}
                      <TableHead className="font-medium text-xs">Name</TableHead>
                      <TableHead className=""><TableSort label="Price" sortView={false} /></TableHead>
                      <TableHead className=""><TableSort label="24h Change" sortView={false} /></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="h-full">
                    {tokensDefault.filter(item => item.tokenSymbol !== '' && item.chainId.includes('501')).map((item, index) => (
                      <TableRow key={index} className="cursor-pointer border-b-0" onClick={() => location.href = `/tokens/details/${item.tokenContractAddress}`}>
                        <TableCell className="rounded-s-md">
                          <div className="flex gap-5 items-center">
                            <div className="flex gap-3 items-center">
                              <div className="flex-shrink-0">
                                <img src={item.tokenLogoUrl} alt={item.tokenSymbol} className="h-8 w-8 rounded-full" loading="lazy" />
                              </div>
                              <div className=" space-y-0">
                                <div className="font-bold text-sm">{item.tokenSymbol}</div>
                                <div className="text-xs font-medium text-muted-foreground/80 flex gap-1 box-content items-center">
                                  {item.tokenContractAddress.slice(0, 5) + '...' + item.tokenContractAddress.slice(-5)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" text-sm font-medium">{formatNumber(Number(item.price))}</TableCell>
                        {item.change24H && (
                          <TableCell className=" text-sm font-medium">
                            {Number(item.change24H) > 1 ? (
                              <span className="text-[#25a750]">{formatNumber(Number(item.change24H))}%</span>
                            ) : (
                              <span className="text-[#ca3f64]">{item.change24H}%</span>
                            )}
                          </TableCell>
                        )}
                        {item.change && (
                          <TableCell className=" text-sm font-medium">
                            {Number(item.change) > 1 ? (
                              <span className="text-[#25a750]">{formatNumber(Number(item.change))}%</span>
                            ) : (
                              <span className="text-[#ca3f64]">{item.change}%</span>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="w-full flex justify-center items-center lg:h-[65vh] h-[30vh] flex-col">
                  <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/resize,w_100,h_100,type_6/ignore-error,1" alt="not data" />
                  <h1 className="">No records found!</h1>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

interface SortingProps {
  tabsValue: string,
  connected?: boolean,
  setRankBy: Dispatch<SetStateAction<number>>,
  periodType: number
  setPeriodType: Dispatch<SetStateAction<number>>,
  setTradeNumPeriod: Dispatch<SetStateAction<number>>,
  setChangePeriod: Dispatch<SetStateAction<number>>,
  setVolumePeriod: Dispatch<SetStateAction<number>>,
  setTxsPeriod: Dispatch<SetStateAction<number>>,
  setTokensData: Dispatch<SetStateAction<TokenListDataType[]>>,
  rankBy: number,
  setDesc: Dispatch<SetStateAction<boolean>>,
  setLiquidityMin: Dispatch<SetStateAction<number>>,
  liquidtyMin: number,
  volumeMin: number,
  setVolumeMin: Dispatch<SetStateAction<number>>,
  setChangeMin: Dispatch<SetStateAction<number>>,
  setChangeMax: Dispatch<SetStateAction<number>>,
  setTxsMin: Dispatch<SetStateAction<number>>,
  setTxsMax: Dispatch<SetStateAction<number>>,
  setUniqueTraderMin: Dispatch<SetStateAction<number>>,
  setUniqueTraderMax: Dispatch<SetStateAction<number>>,
  setUniqueTraderPeriod: Dispatch<SetStateAction<number>>,
  setVolumeMax: Dispatch<SetStateAction<number>>,
  setHoldersMin: Dispatch<SetStateAction<number>>,
  setHoldersMax: Dispatch<SetStateAction<number>>,
  setTradeNumMin: Dispatch<SetStateAction<number>>,
  setTradeNumMax: Dispatch<SetStateAction<number>>,
  setMarketCapMin: Dispatch<SetStateAction<number>>,
  setMarketCapMax: Dispatch<SetStateAction<number>>,
  setFdvMin: Dispatch<SetStateAction<number>>,
  setFdvMax: Dispatch<SetStateAction<number>>,
  setLiquidityMax: Dispatch<SetStateAction<number>>,
  setTokenAgeType: Dispatch<SetStateAction<number>>,
  setTokenAgeMin: Dispatch<SetStateAction<number>>,
  setTokenAgeMax: Dispatch<SetStateAction<number>>,
  setRiskFilter: Dispatch<SetStateAction<boolean>>,
  setStableTokenFilter: Dispatch<SetStateAction<boolean>>
  riskFilter: boolean,
  stableTokenFilter: boolean
  setPage: Dispatch<SetStateAction<number>>
}

const Sorting = ({ tabsValue, connected, setRankBy, periodType, setPeriodType, setChangePeriod, setTradeNumPeriod, setTxsPeriod, setVolumePeriod, setTokensData, rankBy, setDesc, setLiquidityMin, liquidtyMin, volumeMin, setVolumeMin, setChangeMax, setChangeMin, setTxsMax, setTxsMin, setUniqueTraderMax, setUniqueTraderMin, setUniqueTraderPeriod, setVolumeMax, setHoldersMax, setHoldersMin, setTradeNumMax, setTradeNumMin, setMarketCapMax, setMarketCapMin, setFdvMax, setFdvMin, setLiquidityMax, setTokenAgeType, setTokenAgeMax, setTokenAgeMin, setRiskFilter, setStableTokenFilter, riskFilter, stableTokenFilter, setPage }: SortingProps) => {
  const [drawOpen, setDrawOpen] = useState(false)
  const [drawerTrendsOpen, setDrawerTrendsOpen] = useState(false)
  const [liqOpen, setLiqOpen] = useState(false)
  const [turnOpen, setTurnOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  let [customFilterPeriod, setCustomFilterPeriod] = useState(periodType)
  let [customFilterChangeMin, setCustomFilterChangeMin] = useState(0)
  let [customFilterChangeMax, setCustomFilterChangeMax] = useState(0)
  let [customFilterTxsMin, setCustomFilterTxsMin] = useState(0)
  let [customFilterTxsMax, setCustomFilterTxsMax] = useState(0)
  let [customFilterUniqueTraderMin, setCustomFilterUniqueTraderMin] = useState(500)
  let [customFilterUniqueTraderMax, setCustomFilterUniqueTraderMax] = useState(0)
  let [customFilterVolumeMin, setCustomFilterVolumeMin] = useState(10000)
  let [customFilterVolumeMax, setCustomFilterVolumeMax] = useState(0)
  let [customFilterHoldersMin, setCustomFilterHoldersMin] = useState(0)
  let [customFilterHoldersMax, setCustomFilterHoldersMax] = useState(0)
  let [customFilterTradeNumMin, setCustomFilterTradeNumMin] = useState(0)
  let [customFilterTradeNumMax, setCustomFilterTradeNumMax] = useState(0)
  let [customFilterMarketcapMin, setCustomFilterMarketcapMin] = useState(0)
  let [customFilterMarketcapMax, setCustomFilterMarketcapMax] = useState(0)
  let [customFilterFdvMin, setCustomFilterFdvMin] = useState(0)
  let [customFilterFdvMax, setCustomFilterFdvMax] = useState(0)
  let [customFilterLiquidityMin, setCustomFilterLiquidityMin] = useState(5000)
  let [customFilterLiquidityMax, setCustomFilterLiquidityMax] = useState(0)
  let [customFilterTokenAgeMin, setCustomFilterTokenAgeMin] = useState(0)
  let [customFilterTokenAgeMax, setCustomFilterTokenAgeMax] = useState(0)
  let [customFilterTokenAgeType, setCustomFilterTokenAgeType] = useState(periodType)
  let [customFilterRiskFilter, setCustomFilterRiskFilter] = useState(riskFilter)
  let [customFilterStableTokenFilter, setCustomFilterStableTokenFilter] = useState(stableTokenFilter)

  const handler = (value: number) => {
    setDrawOpen(false)
    setTokensData([])
    setPeriodType(value)
    setChangePeriod(value)
    setTradeNumPeriod(value)
    setTxsPeriod(value)
    setVolumePeriod(value)
    setLiquidityMin(5000)
    setPage(1)
  }

  const handlerRankBy = (value: number) => {
    setDrawerTrendsOpen(false)
    setPage(1)
    if (rankBy !== value) {
      setTokensData([])
      setRankBy(value)
      setDesc(true)
      setLiquidityMin(5000)
    }
  }

  const handleFilter = () => {
    // setTokensData([])
    // setDesc(false)
    setPeriodType(customFilterPeriod)
    setTxsMax(customFilterTxsMax)
    setTxsMin(customFilterTxsMin)
    setTxsPeriod(customFilterPeriod)
    setChangeMin(customFilterChangeMin)
    setChangeMax(customFilterChangeMax)
    setChangePeriod(customFilterPeriod)
    setUniqueTraderMin(customFilterUniqueTraderMin)
    setUniqueTraderMax(customFilterUniqueTraderMax)
    setUniqueTraderPeriod(periodType)
    setVolumeMin(customFilterVolumeMin)
    setVolumeMax(customFilterVolumeMax)
    setVolumePeriod(periodType)
    setHoldersMax(customFilterHoldersMax)
    setHoldersMin(customFilterHoldersMin)
    setTradeNumPeriod(periodType)
    setTradeNumMin(customFilterTradeNumMin)
    setTradeNumMax(customFilterTradeNumMax)
    setMarketCapMax(customFilterMarketcapMax)
    setMarketCapMin(customFilterMarketcapMin)
    setFdvMax(customFilterFdvMax)
    setFdvMin(customFilterFdvMin)
    setSheetOpen(false)
    setLiquidityMin(customFilterLiquidityMin)
    setLiquidityMax(customFilterLiquidityMax)
    setTokenAgeType(customFilterTokenAgeType)
    setTokenAgeMin(customFilterTokenAgeMin)
    setTokenAgeMax(customFilterTokenAgeMax)
    setRiskFilter(customFilterRiskFilter)
    setStableTokenFilter(customFilterStableTokenFilter)
  }

  const handleReset = () => {
    // setSheetOpen(false)
    setCustomFilterPeriod(periodType)
    setCustomFilterChangeMin(0)
    setCustomFilterChangeMax(0)
    setCustomFilterTxsMin(0)
    setCustomFilterTxsMax(0)
    setCustomFilterUniqueTraderMin(500)
    setCustomFilterUniqueTraderMax(0)
    setCustomFilterVolumeMin(10000)
    setCustomFilterVolumeMax(0)
    setCustomFilterHoldersMin(0)
    setCustomFilterHoldersMax(0)
    setCustomFilterTradeNumMin(0)
    setCustomFilterTradeNumMax(0)
    setCustomFilterMarketcapMin(0)
    setCustomFilterMarketcapMax(0)
    setCustomFilterFdvMin(0)
    setCustomFilterFdvMax(0)
    setCustomFilterLiquidityMin(5000)
    setCustomFilterLiquidityMax(0)
    setCustomFilterTokenAgeMin(0)
    setCustomFilterTokenAgeMax(0)
    setCustomFilterTokenAgeType(periodType)
  }

  const handleResetFilter = () => {
    setSheetOpen(false)
    // setTokensData([])
    setDesc(true)
    setRankBy(5)
    setLiquidityMin(5000)
    setVolumeMin(10000)
    setVolumeMax(0)
    setChangeMin(0)
    setChangeMax(0)
    setTxsMin(0)
    setTxsMax(0)
    setUniqueTraderMin(500)
    setUniqueTraderMax(0)
    setUniqueTraderPeriod(periodType)
    setHoldersMin(0)
    setHoldersMax(0)
    setTradeNumMin(0)
    setTradeNumMax(0)
    setMarketCapMin(0)
    setMarketCapMax(0)
    setFdvMin(0)
    setFdvMax(0)
    setLiquidityMax(0)
    setTokenAgeType(periodType)
    setTokenAgeMin(0)
    setTokenAgeMax(0)
  }


  return (
    <>
      {tabsValue === 'tokens' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm gap-2">
            <div className="lg:flex hidden">
              <Button onClick={() => handler(1)} variant={periodType === 1 ? 'secondary' : 'ghost'} size={'sm'}>5m</Button>
              <Button onClick={() => handler(2)} variant={periodType === 2 ? 'secondary' : 'ghost'} size={'sm'}>1h</Button>
              <Button onClick={() => handler(3)} variant={periodType === 3 ? 'secondary' : 'ghost'} size={'sm'}>4h</Button>
              <Button onClick={() => handler(4)} variant={periodType === 4 ? 'secondary' : 'ghost'} size={'sm'}>24h</Button>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <Drawer open={drawOpen} onOpenChange={setDrawOpen}>
                <Button variant={'ghost'} size={'sm'} onClick={() => setDrawOpen(true)}>
                  {periodType === 1 && '5m'}
                  {periodType === 2 && '1h'}
                  {periodType === 3 && '4h'}
                  {periodType === 4 && '24h'}
                </Button>
                <DrawerContent>
                  <DrawerHeader>
                    <div className="space-y-2 z-50">
                      <Button variant={periodType === 1 ? 'secondary' : 'ghost'} onClick={() => {
                        handler(1)

                      }} className="w-full">5m</Button>
                      <Button variant={periodType === 2 ? 'secondary' : 'ghost'} onClick={() => {
                        handler(2)

                      }} className="w-full">1h</Button>
                      <Button variant={periodType === 3 ? 'secondary' : 'ghost'} onClick={() => {
                        handler(3)

                      }} className="w-full">4h</Button>
                      <Button variant={periodType === 4 ? 'secondary' : 'ghost'} onClick={() => {
                        handler(4)

                      }} className="w-full">24h</Button>
                    </div>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
              <span className="lg:hidden block">|</span>
              <Drawer open={drawerTrendsOpen} onOpenChange={setDrawerTrendsOpen}>
                {rankBy === 5 && <Button variant={'secondary'} size={'sm'} onClick={() => setDrawerTrendsOpen(true)}>
                  <Flame />
                  <div>Trending</div>
                </Button>}
                {rankBy === 9 && <Button variant={'secondary'} size={'sm'} onClick={() => setDrawerTrendsOpen(true)}>
                  <ChartNoAxesCombined />
                  <div>Top searches</div>
                </Button>}
                {rankBy === 8 && <Button variant={'secondary'} size={'sm'} onClick={() => setDrawerTrendsOpen(true)}>
                  <Sprout />
                  <div>Newest</div>
                </Button>}
                <DrawerContent>
                  <DrawerHeader className="space-y-2">
                    <Button variant={rankBy === 5 ? 'secondary' : 'ghost'} onClick={() => handlerRankBy(5)}>
                      <Flame />
                      <div>Trending</div>
                    </Button>
                    <Button variant={rankBy === 9 ? 'secondary' : 'ghost'} onClick={() => handlerRankBy(9)}>
                      <ChartNoAxesCombined />
                      <div>Top searches</div>
                    </Button>
                    <Button variant={rankBy === 8 ? 'secondary' : 'ghost'} onClick={() => {
                      handlerRankBy(8)
                      setDesc(false)
                    }}>
                      <Sprout />
                      <div>Newest</div>
                    </Button>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div>

            <span className="lg:block hidden">|</span>

            <Button onClick={() => handlerRankBy(5)} variant={rankBy === 5 ? 'secondary' : 'ghost'} size={'sm'} className="lg:flex hidden">
              <Flame />
              <div>Trending</div>
            </Button>
            <Button onClick={() => handlerRankBy(9)} variant={rankBy === 9 ? 'secondary' : 'ghost'} size={'sm'} className="lg:flex hidden">
              <ChartNoAxesCombined />
              <div>Top searches</div>
            </Button>
            <Button onClick={() => {
              handlerRankBy(8)
              setDesc(false)
            }} variant={rankBy === 8 ? 'secondary' : 'ghost'} size={'sm'} className="lg:flex hidden">
              <Sprout />
              <div>Newest</div>
            </Button>

            <span className="lg:block hidden">|</span>

            <div className="lg:block hidden">
              <Select open={liqOpen} onOpenChange={setLiqOpen}>
                <SelectTrigger className="w-auto border-none hover:opacity-80 transition-opacity gap-1 text-xs font-medium focus:ring-0">
                  <SelectValue placeholder={`Liquidity ≥ ${formatNumber(liquidtyMin)}`} />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex flex-col p-2">
                    <div className="text-xs text-muted-foreground font-semibold mb-2">
                      Liquidity
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-56 text-sm mb-3">
                      <Button onClick={() => {
                        setLiquidityMin(10000)
                        setTokensData([])
                        setLiqOpen(false)
                        setDesc(false)
                        setRankBy(7)
                      }} disabled={liquidtyMin === 10000} variant={"outline"} size={'sm'}>
                        ≥ $10k
                      </Button>
                      <Button onClick={() => {
                        setLiquidityMin(50000)
                        setTokensData([])
                        setLiqOpen(false)
                        setDesc(false)
                        setRankBy(7)
                      }} disabled={liquidtyMin === 50000} variant={"outline"} size={'sm'}>
                        ≥ $50k
                      </Button>
                      <Button onClick={() => {
                        setLiquidityMin(100000)
                        setTokensData([])
                        setLiqOpen(false)
                        setDesc(false)
                        setRankBy(7)
                      }} disabled={liquidtyMin === 100000} variant={"outline"} size={'sm'}>
                        ≥ $100k
                      </Button>
                      <Button onClick={() => {
                        setLiquidityMin(500000)
                        setTokensData([])
                        setLiqOpen(false)
                        setDesc(false)
                        setRankBy(7)
                      }} disabled={liquidtyMin === 500000} variant={"outline"} size={'sm'}>
                        ≥ $500k
                      </Button>
                      {/* <Input type="number" placeholder="Min" className="md:text-xs h-8" onChange={(e) => (setLiqMinValue(Number(e.target.value)))} />
                      <Input type="number" placeholder="Max" className="md:text-xs h-8" onChange={(e) => (setLiqMaxValue(Number(e.target.value)))} /> */}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Button variant={"destructive"} size={"icon"} className="rounded-full flex-shrink-0">
                        <Trash className="w-5 h-5" />
                      </Button>
                      <Button onClick={hanlderApplyLiq} className="w-full rounded-full" variant={"outline"} size={'sm'}>Apply</Button>
                    </div> */}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:block hidden">
              <Select open={turnOpen} onOpenChange={setTurnOpen}>
                <SelectTrigger className="w-auto border-none hover:opacity-50 transition-opacity gap-1 text-xs font-medium focus:ring-0">
                  <SelectValue placeholder={`Turnover ≥ ${formatNumber(volumeMin)}`} />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex flex-col p-2">
                    <div className="text-xs text-muted-foreground font-semibold mb-2">
                      Turnover
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-56 text-sm mb-3">
                      <Button onClick={() => {
                        setVolumeMin(10000)
                        setTokensData([])
                        setTurnOpen(false)
                        setDesc(false)
                        setRankBy(5)
                      }} disabled={volumeMin === 10000} variant={"outline"} size={'sm'}>
                        ≥ $10k
                      </Button>
                      <Button onClick={() => {
                        setVolumeMin(50000)
                        setTokensData([])
                        setTurnOpen(false)
                        setDesc(false)
                        setRankBy(5)
                      }} disabled={volumeMin === 50000} variant={"outline"} size={'sm'}>
                        ≥ $50k
                      </Button>
                      <Button onClick={() => {
                        setVolumeMin(100000)
                        setTokensData([])
                        setTurnOpen(false)
                        setDesc(false)
                        setRankBy(5)
                      }} disabled={volumeMin === 100000} variant={"outline"} size={'sm'}>
                        ≥ $100k
                      </Button>
                      <Button onClick={() => {
                        setVolumeMin(500000)
                        setTokensData([])
                        setTurnOpen(false)
                        setDesc(false)
                        setRankBy(5)
                      }} disabled={volumeMin === 500000} variant={"outline"} size={'sm'}>
                        ≥ $500k
                      </Button>

                    </div>

                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="lg:block hidden">
              <Select>
                <SelectTrigger className="w-auto border-none hover:opacity-50 transition-opacity gap-1 text-xs font-medium">
                  <SelectValue placeholder="Market Cap" />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex flex-col p-2">
                    <div className="text-xs text-muted-foreground font-semibold mb-2">
                      Market cap
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-56 text-sm mb-3">
                      <Button variant={"outline"} size={'sm'}>
                        ≥ $10k
                      </Button>
                      <Button variant={"outline"} size={'sm'}>
                        ≥ $50k
                      </Button>
                      <Button variant={"outline"} size={'sm'}>
                        ≥ $100k
                      </Button>
                      <Button variant={"outline"} size={'sm'}>
                        ≥ $500k
                      </Button>
                    </div>

                  </div>
                </SelectContent>
              </Select>
            </div> */}

          </div>
          <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant={'ghost'}>
                  <span className="box-content">
                    <Filter className="w-5 h-5" />
                  </span>
                  <div>Filter</div>
                </Button>
              </SheetTrigger>
              <SheetContent className="!w-[500px] !max-w-full overflow-auto flex flex-col justify-between" >
                <div className="">
                  <SheetHeader>
                    <SheetTitle className="mb-6 text-lg">
                      Custom filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-3 mb-3 text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        Period
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => setCustomFilterPeriod(1)} variant={customFilterPeriod === 1 ? 'secondary' : 'ghost'} size={'sm'}>5m</Button>
                        <Button onClick={() => setCustomFilterPeriod(2)} variant={customFilterPeriod === 2 ? 'secondary' : 'ghost'} size={'sm'}>1h</Button>
                        <Button onClick={() => setCustomFilterPeriod(3)} variant={customFilterPeriod === 3 ? 'secondary' : 'ghost'} size={'sm'}>4h</Button>
                        <Button onClick={() => setCustomFilterPeriod(4)} variant={customFilterPeriod === 4 ? 'secondary' : 'ghost'} size={'sm'}>24h</Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Charge (%)
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="number" placeholder="Min" value={customFilterChangeMin !== 0 ? customFilterChangeMin : ''} onChange={(e) => setCustomFilterChangeMin(Number(e.target.value))} />
                        <Input type="number" placeholder="Max" value={customFilterChangeMax !== 0 ? customFilterChangeMax : ''} onChange={(e) => setCustomFilterChangeMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Transactions
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="number" value={customFilterTxsMin !== 0 ? customFilterTxsMin : ''} placeholder="Min" onChange={(e) => setCustomFilterTxsMin(Number(e.target.value))} />
                        <Input type="number" value={customFilterTxsMax !== 0 ? customFilterTxsMax : ''} placeholder="Max" onChange={(e) => setCustomFilterTxsMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Unique traders
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterUniqueTraderMin !== 0 ? customFilterUniqueTraderMin : 500} onChange={(e) => setCustomFilterUniqueTraderMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterUniqueTraderMax !== 0 ? customFilterUniqueTraderMax : ''} onChange={(e) => setCustomFilterUniqueTraderMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Turnover ($)
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterVolumeMin !== 0 ? customFilterVolumeMin : 10000} onChange={(e) => setCustomFilterVolumeMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterVolumeMax !== 0 ? customFilterVolumeMax : ''} onChange={(e) => setCustomFilterVolumeMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Holders
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterHoldersMin !== 0 ? customFilterHoldersMin : ''} onChange={(e) => setCustomFilterHoldersMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterHoldersMax !== 0 ? customFilterHoldersMax : ''} onChange={(e) => setCustomFilterHoldersMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Trading Volume
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterTradeNumMin !== 0 ? customFilterTradeNumMin : ''} onChange={(e) => setCustomFilterTradeNumMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterTradeNumMax !== 0 ? customFilterTradeNumMax : ''} onChange={(e) => setCustomFilterTradeNumMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Market cap ($)
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterMarketcapMin !== 0 ? customFilterMarketcapMin : ''} onChange={(e) => setCustomFilterMarketcapMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterMarketcapMax !== 0 ? customFilterMarketcapMax : ''} onChange={(e) => setCustomFilterMarketcapMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        FDV ($)
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterFdvMin !== 0 ? customFilterFdvMin : ''} onChange={(e) => setCustomFilterFdvMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterFdvMax !== 0 ? customFilterFdvMax : ''} onChange={(e) => setCustomFilterFdvMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Liquidity ($)
                      </div>
                      <div className="flex gap-2 w-2/3">
                        <Input type="text" placeholder="Min" value={customFilterLiquidityMin !== 0 ? customFilterLiquidityMin : ''} onChange={(e) => setCustomFilterLiquidityMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterLiquidityMax !== 0 ? customFilterLiquidityMax : ''} onChange={(e) => setCustomFilterLiquidityMax(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        Token age
                      </div>
                      <div className="flex gap-2 w-2/3 ">
                        <Input type="text" placeholder="Min" value={customFilterTokenAgeMin !== 0 ? customFilterTokenAgeMin : ''} onChange={(e) => setCustomFilterTokenAgeMin(Number(e.target.value))} />
                        <Input type="text" placeholder="Max" value={customFilterTokenAgeMax !== 0 ? customFilterTokenAgeMax : ''} onChange={(e) => setCustomFilterTokenAgeMax(Number(e.target.value))} />
                        <Select onValueChange={(value) => setCustomFilterTokenAgeType(Number(value))}>
                          <SelectTrigger>
                            {customFilterTokenAgeType === 1 && <SelectValue placeholder='m' />}
                            {customFilterTokenAgeType === 2 && <SelectValue placeholder='h' />}
                            {customFilterTokenAgeType === 3 && <SelectValue placeholder='D' />}
                            {customFilterTokenAgeType === 4 && <SelectValue placeholder='M' />}
                            {customFilterTokenAgeType === 5 && <SelectValue placeholder='Y' />}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1" className="cursor-pointer">
                                Minutes
                              </SelectItem>
                              <SelectItem value="2" className="cursor-pointer">
                                Hours
                              </SelectItem>
                              <SelectItem value="3" className="cursor-pointer">
                                Day
                              </SelectItem>
                              <SelectItem value="4" className="cursor-pointer">
                                Month
                              </SelectItem>
                              <SelectItem value="5" className="cursor-pointer">
                                Year
                              </SelectItem>

                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <label htmlFor="riskTokens" className="flex gap-2 items-center">
                        Hide risky tokens
                        <span>
                          <CircleAlert className="w-4 h-4" />
                        </span>
                      </label>
                      <Switch id="riskTokens" checked={customFilterRiskFilter} onCheckedChange={setCustomFilterRiskFilter} />
                    </div>

                    <div className="flex justify-between">
                      <label htmlFor="riskTokens" className="flex gap-2 items-center">
                        Hide stablecoins
                        <span>
                          <CircleAlert className="w-4 h-4" />
                        </span>
                      </label>
                      <Switch id="riskTokens" checked={customFilterStableTokenFilter} onCheckedChange={setCustomFilterStableTokenFilter} />
                    </div>

                  </div>
                </div>

                <SheetFooter className="">
                  <div className="w-full flex items-center gap-2">
                    <Button onClick={handleReset} variant={'ghost'} size={'icon'} className="hover:bg-red-500 hover:text-foreground">
                      <Trash />
                    </Button>
                    <div className="flex-grow grid grid-cols-2 gap-2">
                      <Button onClick={handleResetFilter} variant={"outline"} size={'lg'} className="rounded-full">
                        Reset
                      </Button>
                      <Button onClick={handleFilter} variant={"default"} size={'lg'} className="rounded-full">
                        Filter
                      </Button>
                    </div>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}

      {tabsValue === 'watchlist' && (
        <div className="flex items-center justify-between">
          <div>
            <Button variant={'ghost'} size={'sm'}>1m</Button>
            <Button variant={'ghost'} size={'sm'}>1h</Button>
            <Button variant={'ghost'} size={'sm'}>4h</Button>
            <Button variant={'ghost'} size={'sm'}>24h</Button>
          </div>
          <Button disabled={connected ? false : true} variant={'secondary'} size={'sm'}>
            <Edit2Icon />
            Edit
          </Button>
        </div>
      )}

    </>

  )
}


const TokensPage = () => {
  const { connected } = useWallet()
  const [tabsValue, setTabsValue] = useState("tokens")
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  // data state
  const [tokensData, setTokensData] = useState<TokenListDataType[]>([])

  // query state for api
  const [changeMax, setChangeMax] = useState(0)
  const [changeMin, setChangeMin] = useState(0)
  const [changePeriod, setChangePeriod] = useState(4)
  const [desc, setDesc] = useState(true)
  const [fdvMax, setFdvMax] = useState(0)
  const [fdvMin, setFdvMin] = useState(0)
  const [holdersMax, setHoldersMax] = useState(0)
  const [holdersMin, setHoldersMin] = useState(0)
  const [liquidityMax, setLiquidityMax] = useState(0)
  const [liquidityMin, setLiquidityMin] = useState(5000)
  const [marketCapMin, setMarketCapMin] = useState(0)
  const [marketCapMax, setMarketCapMax] = useState(0)
  const [periodType, setPeriodType] = useState(4)
  const [rankBy, setRankBy] = useState(5)
  const [riskFilter, setRiskFilter] = useState(true)
  const [stableTokenFilter, setStableTokenFilter] = useState(true)
  const [tokenAgeMax, setTokenAgeMax] = useState(0)
  const [tokenAgeMin, setTokenAgeMin] = useState(0)
  const [tokenAgeType, setTokenAgeType] = useState(2)
  const [tradeNumMax, setTradeNumMax] = useState(0)
  const [tradeNumMin, setTradeNumMin] = useState(0)
  const [tradeNumPeriod, setTradeNumPeriod] = useState(4)
  const [txsMax, setTxsMax] = useState(0)
  const [txsMin, setTxsMin] = useState(0)
  const [txsPeriod, setTxsPeriod] = useState(0)
  const [uniqueTraderMax, setUniqueTraderMax] = useState(0)
  const [uniqueTraderMin, setUniqueTraderMin] = useState(500)
  const [uniqueTraderPeriod, setUniqueTraderPeriod] = useState(4)
  const [volumeMax, setVolumeMax] = useState(0)
  const [volumeMin, setVolumeMin] = useState(10000)
  const [volumePeriod, setVolumePeriod] = useState(4)
  const [page, setPage] = useState(1)
  const [scrollY, setScrollY] = useState(0)



  const getTokenData = async () => {
    try {
      const resp = await axios(`/api/token/list`, {
        params: {
          chainIds: '501',
          changePeriod,
          desc,
          liquidityMin,
          periodType,
          rankBy,
          riskFilter,
          stableTokenFilter,
          tags: '0',
          tokenAgeType,
          tradeNumPeriod,
          txsPeriod,
          volumeMin,
          volumePeriod,
          liquidityMax,
          changeMax,
          changeMin,
          txsMax,
          txsMin,
          uniqueTraderMax,
          uniqueTraderMin,
          uniqueTraderPeriod,
          volumeMax,
          holdersMax,
          holdersMin,
          tradeNumMax,
          tradeNumMin,
          marketCapMax,
          marketCapMin,
          fdvMax,
          fdvMin,
          tokenAgeMax,
          tokenAgeMin,
          page
        }
      })
      setTokensData(resp.data[0].data)
      setTotalPages(resp.data[0].totalPage)
      setLoading(false)
      setReload(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (tabsValue === 'tokens') {
      setLoading(true)
      getTokenData()
      const interval = setInterval(() => {
        getTokenData()
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [changeMax, changeMin, changePeriod, desc, fdvMax, fdvMin, holdersMax, holdersMin, liquidityMax, liquidityMin, marketCapMax, marketCapMin, periodType, rankBy, riskFilter, stableTokenFilter, tokenAgeMax, tokenAgeMin, tokenAgeType, tradeNumMax, tradeNumMin, tradeNumPeriod, txsMax, txsMin, uniqueTraderMax, uniqueTraderMin, uniqueTraderPeriod, volumeMax, volumeMin, volumePeriod, tabsValue, txsPeriod, page])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY)
    })
    return () => window.removeEventListener('scroll', () => {
      setScrollY(window.scrollY)
    })

  }, [scrollY])

  return (
    <>
      <Head>
        <title>Nusadex - Comprehensive Token Overview</title>
        <meta name='description' content='Explore a complete overview of tokens on Nusadex. Discover key details and insights to navigate the world of digital assets effortlessly.' key={'desc'} />
        <meta property='og:description' content='Explore a complete overview of tokens on Nusadex. Discover key details and insights to navigate the world of digital assets effortlessly.' />
        <meta property='og:description' content='Explore a complete overview of tokens on Nusadex. Discover key details and insights to navigate the world of digital assets effortlessly.' />
      </Head>
      <div className="py-8 relative">
        <Tabs defaultValue="tokens" className="lg:space-y-6 space-y-3 h-full" value={tabsValue} onValueChange={setTabsValue}>
          <TabsList className={`flex justify-between rounded-none items-center bg-background ${scrollY > 50 ? 'lg:fixed lg:top-[50px] lg:w-[96%] lg:py-8 lg:mx-auto z-30' : ''}`}>
            <div className={`flex items-center gap-6 bg-background w-full`}>
              <TabsTrigger value="tokens" className=" pb-1 data-[state=active]:border-b-2 data-[state=active]:border-foreground px-0 font-semibold rounded-none lg:text-lg text-sm">Tokens</TabsTrigger>
              <TabsTrigger value="exclusiveTokens" className=" pb-1 data-[state=active]:border-b-2 data-[state=active]:border-foreground px-0 font-semibold rounded-none lg:text-lg text-sm">Exclusive Tokens</TabsTrigger>
              <TabsTrigger value="watchlist" className=" pb-1 data-[state=active]:border-b-2 data-[state=active]:border-foreground px-0 font-semibold rounded-none lg:text-lg text-sm">Watchlist</TabsTrigger>
            </div>
            <SearchTokens tabs={tabsValue} />
          </TabsList>
          <TabsContent value="tokens">
            <div className="lg:space-y-5 space-y-8">
              <div className={`w-full ${scrollY > 50 ? 'lg:fixed lg:top-[100px] lg:py-3 lg:bg-background lg:w-[96%] lg:mx-auto z-50' : ''}`}>
                <Sorting tabsValue={tabsValue} connected={connected} setRankBy={setRankBy} periodType={periodType} setPeriodType={setPeriodType} setChangePeriod={setChangePeriod} setTradeNumPeriod={setTradeNumPeriod} setTxsPeriod={setTxsPeriod} setVolumePeriod={setVolumePeriod} setTokensData={setTokensData} rankBy={rankBy} setDesc={setDesc} liquidtyMin={liquidityMin} setLiquidityMin={setLiquidityMin} volumeMin={volumeMin} setVolumeMin={setVolumeMin} setChangeMax={setChangeMax} setChangeMin={setChangeMin} setTxsMax={setTxsMax} setTxsMin={setTxsMin} setUniqueTraderMax={setUniqueTraderMax} setUniqueTraderMin={setUniqueTraderMin} setUniqueTraderPeriod={setUniqueTraderPeriod} setVolumeMax={setVolumeMax} setHoldersMax={setHoldersMax} setHoldersMin={setHoldersMin} setTradeNumMax={setTradeNumMax} setTradeNumMin={setTradeNumMin} setMarketCapMax={setMarketCapMax} setMarketCapMin={setMarketCapMin} setFdvMax={setFdvMax} setFdvMin={setFdvMin} setLiquidityMax={setLiquidityMax} setTokenAgeType={setTokenAgeType} setTokenAgeMax={setTokenAgeMax} setTokenAgeMin={setTokenAgeMin} setRiskFilter={setRiskFilter} setStableTokenFilter={setStableTokenFilter} riskFilter={riskFilter} stableTokenFilter={stableTokenFilter} setPage={setPage} />
              </div>
              <div className={`lg:max-h-full max-h-[62vh] overflow-auto space-y-8 w-full`}>
                <Table className="w-full">
                  <TableHeader className={`${scrollY > 50 ? 'fixed w-[100%] top-[152px] z-50' : 'sticky top-0 z-50'} bg-background [&_tr]:border-b-0`}>
                    <TableRow className="hover:bg-transparent border-b-0">
                      <TableHead className={`font-medium text-xs ${scrollY > 50 ? 'lg:w-[320px]' : ''}`}>Name</TableHead>
                      <TableHead className={`text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[50px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={1} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Price" />
                      </TableHead>
                      <TableHead className={`text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[130px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={2} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Change (%)" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[175px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={3} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Txns" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[50px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={4} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Unique traders" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[50px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={10} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Holders" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end ${scrollY > 50 ? 'lg:w-[120px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={5} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Turnover" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[150px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={6} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Market cap" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[120px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={7} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Liquidity" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[50px]' : ''}`}>
                        <TableSort tokensData={tokensData} rankBy={rankBy} desc={desc} rank={8} setDesc={setDesc} setRankBy={setRankBy} setTokensData={setTokensData} setPage={setPage} label="Token Age" />
                      </TableHead>
                      <TableHead className={`lg:table-cell hidden text-end text-xs font-semibold ${scrollY > 50 ? 'lg:w-[50px]' : ''}`}>Auidit</TableHead>
                    </TableRow>
                  </TableHeader>
                  {!loading && tokensData.length > 0 ? (
                    tokensData.length > 0 ? (
                      <TableBody>
                        {tokensData.filter(item => item.tokenSymbol !== '' && item.chainId.includes('501')).map((item, index) => (
                          <TableRow key={index} className="cursor-pointer border-b-0" onClick={() => location.href = `/tokens/details/${item.tokenContractAddress}`}>
                            <TableCell className="rounded-s-md">
                              <div className="flex gap-5 items-center">
                                <div className="flex lg:gap-3 gap-2 items-center">
                                  <div className="flex-shrink-0">
                                    <img src={item.tokenLogoUrl} alt={item.tokenSymbol} className="lg:h-8 h-8 lg:w-8 w-8 object-cover rounded-full" />
                                  </div>
                                  <div className=" lg:space-y-0 -space-y-0.5">
                                    <div className="font-bold lg:text-sm text-[12px]">{item.tokenSymbol}</div>
                                    <div className="lg:text-xs text-[10px] font-medium text-muted-foreground/80 gap-1 box-content items-center">
                                      {item.tokenContractAddress.slice(0, 5) + '...' + item.tokenContractAddress.slice(-5)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-end text-sm font-semibold">${formatNumber(Number(item.price))}</TableCell>
                            <TableCell className="text-center text-sm font-semibold">
                              {item.change !== '' ? (
                                Number(item.change) > 1 ? (
                                  <span className="text-[#22c55e]">{formatNumber(Number(item.change))}%</span>
                                ) : (
                                  <span className="text-[#ef4444]">{item.change}%</span>
                                )
                              ) : '--'}
                            </TableCell>
                            <TableCell className="lg:table-cell hidden text-end">
                              <div className="space-y-0.5">
                                <p className="text-sm font-semibold">{formatNumber(Number(item.txs))}</p>
                                <p className="text-xs font-medium"><span className="text-xs text-[#22c55e]">{formatNumber(Number(item.txsBuy))}</span> / <span className="text-[#ef4444]">{formatNumber(Number(item.txsSell))}</span></p>
                              </div>
                            </TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold">{formatNumber(Number(item.uniqueTraders))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold">{formatNumber(Number(item.holders))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold">${formatNumber(Number(item.volume))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold">${formatNumber(Number(item.marketCap))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold">${formatNumber(Number(item.liquidity))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-center text-sm font-semibold capitalize">{formatRelativeTime(new Date(Number(item.firstPriceTime)))}</TableCell>
                            <TableCell className="lg:table-cell hidden text-end rounded-e-md">
                              <div className="w-full flex justify-end">
                                {item.riskLevel === '1' && (
                                  <ShieldAlert size={24} className=" text-yellow-500" />
                                )}
                                {item.riskLevel === '2' && (
                                  <ShieldCheck size={24} className=" text-green-500" />
                                )}
                                {item.riskLevel === '3' && (
                                  <ShieldAlert size={24} className=" text-yellow-500" />
                                )}
                                {item.riskLevel === '0' && (
                                  <ShieldQuestion size={24} className=" text-muted-foreground" />
                                )}
                                {item.riskLevel === '4' && (
                                  <ShieldBan size={24} className=" text-red-500" />
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : (
                      <tr>
                        <td colSpan={11}>
                          <div className="w-full flex justify-center items-center h-[50vh] flex-col gap-2">
                            <img src="https://www.okx.com/cdn/assets/imgs/2411/83A3C09108B03B0B.png?x-oss-process=image/format,webp/resize,w_200,h_200,type_6/ignore-error,1" alt="no data" />
                            <h1 className="font-semibold">No tokens found!</h1>
                          </div>
                        </td>
                      </tr>
                    )

                  ) : (
                    <TableSkeleton length={tokensData.length > 0 ? tokensData.length : 8} />
                  )}
                </Table>
              </div>
              <div className="w-full flex items-center justify-center">
                {tokensData.length > 0 && <PaginationLoop currentPage={page} onPageChange={setPage} totalPages={totalPages} />}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="exclusiveTokens">
            <ExclusiveTokens />
          </TabsContent>
          <TabsContent value="watchlist">
            {connected ? (
              <Watchlist />
            ) : (
              <div className="w-full h-[50vh] space-y-3">
                <div className="w-full flex items-center justify-center flex-col gap-0">
                  <picture>
                    <source srcSet="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/format,webp/resize,w_200,h_200,type_6/ignore-error,1" />
                    <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/resize,w_200,h_200,type_6/ignore-error,1" />
                  </picture>
                  <p className="font-semibold">Watchlist empty</p>
                  <p className="text-muted-foreground">Connect your wallet to manage Watchlist.</p>
                  <div className="mt-5">
                    <ModalConnectWallet />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
};


export default TokensPage;