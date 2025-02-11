"use client";
import { ExternalLink, Copy, LoaderCircle, ChartArea, ChartLine, Rat, Crosshair, Wallet2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import { HoldersDataType } from "@/types/holdersDataType";
import { useRouter } from "next/router";
import axios from "axios";
import formatNumber from "@/lib/formatNumber";
import Link from "next/link";
import handleCopy from "@/lib/handleCopy";
import { Ranking } from "@/types/tokenDetailsDataTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface props {
  ranking: Ranking;
}


const HolderTabs = ({ ranking }: props) => {
  const [holdersData, setHoldersData] = useState<HoldersDataType[]>([])
  const { id } = useRouter().query
  const router = useRouter()
  const [tag, setTag] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)

  const getData = async () => {
    try {
      const resp = await axios(`/api/token/holders/${id}`, {
        params: {
          tokenAddress: String(id),
          tag
        }
      })
      setHoldersData(resp.data)
      setLoading(false)
      setReload(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady && id) {
      console.log()
      setLoading(true)
      getData()
      const interval = setInterval(() => {
        getData()

      }, 3000)
      return () => clearInterval(interval)
    }

  }, [router.isReady, id, tag])

  const handlerChangeTag = (tag: number) => {
    setTag(tag)
    setReload(false)
  }


  return (
    <div className="rounded-lg bg-background max-h-[32vh] h-[32vh] overflow-auto no-scrollbar">
      <div className="w-full flex justify-between items-center px-1.5">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">Total Holders : {formatNumber(Number(ranking.totalHolderAmount))}</p>
          <Dialog>
            <DialogTrigger className="flex font-semibold h-fit w-fit p-1 px-2 text-xs gap-1  items-center bg-secondary rounded-md">
              <ChartLine className="w-4 h-4" /> Chart
            </DialogTrigger>
            <DialogContent className="max-w-screen-sm">
              <DialogHeader>
                <DialogTitle className="border-b pb-3">Holders</DialogTitle>
                <DialogDescription className="text-foreground">
                  <div className="w-full space-y-5 mt-2 text-left">
                    <div className="space-y-3">
                      <p>Summary</p>
                      <p className="text-xs text-muted-foreground font-light">This is a quick breakdown of the total holder count. We’ve identified snipers and suspicious wallets with Nusadex's proprietary onchain analytical tools. You may use these markers to time your market entry.</p>
                    </div>
                    <div className="space-y-2 text-foreground">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Top 10 Holders</p>
                        <p className="font-medium text-muted-foreground text-xs">{Number(ranking.top10HoldAmountPercentage).toFixed(2)}%</p>
                      </div>
                      <Progress value={Number(ranking.top10HoldAmountPercentage)} bg="bg-blue-500" />
                    </div>
                    <div className="space-y-2 text-foreground">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold border-b-2 border-dashed border-muted">Suspicious</p>
                        <p className="font-medium text-muted-foreground text-xs">{((Number(ranking.suspiciousTagHolderAmount) / Number(ranking.totalHolderAmount)) * 100).toFixed(2)}% ({ranking.suspiciousTagHolderAmount})</p>
                      </div>
                      <Progress value={((Number(ranking.suspiciousTagHolderAmount) / Number(ranking.totalHolderAmount)) * 100)} bg="bg-yellow-500" />
                    </div>
                    <div className="space-y-2 text-foreground">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold border-b-2 border-dashed border-muted">Snipers</p>
                        <p className="font-medium text-muted-foreground text-xs">{((Number(ranking.sniperTagHolderAmount) / Number(ranking.top10HoldAmountPercentage)) * 100).toFixed(2)}% ({ranking.sniperTagHolderAmount})</p>
                      </div>
                      <Progress value={((Number(ranking.sniperTagHolderAmount) / Number(ranking.top10HoldAmountPercentage)) * 100)} bg="bg-red-500" />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => handlerChangeTag(-1)} className={`font-medium h-fit w-fit p-1 px-2 text-xs ${tag === -1 ? 'text-foreground' : 'text-muted-foreground'} gap-1`} variant={tag === -1 ? 'secondary' : 'outline'}>All</Button>
          <Button onClick={() => handlerChangeTag(1)} className={`font-medium h-fit w-fit p-1 px-2 text-xs ${tag === 1 ? 'text-foreground' : 'text-muted-foreground'} gap-1`} variant={tag === 1 ? 'secondary' : 'outline'}>Suspicious</Button>
          <Button onClick={() => handlerChangeTag(2)} className={`font-medium h-fit w-fit p-1 px-2 text-xs ${tag === 2 ? 'text-foreground' : 'text-muted-foreground'} gap-1`} variant={tag === 2 ? 'secondary' : 'outline'}>Snipers</Button>
          <Button onClick={() => handlerChangeTag(6)} className={`font-medium h-fit w-fit p-1 px-2 text-xs ${tag === 6 ? 'text-foreground' : 'text-muted-foreground'} gap-1`} variant={tag === 6 ? 'secondary' : 'outline'}>Smart Money</Button>
        </div>
      </div>
      {!loading ? (
        holdersData.length > 0 ? (
          <div className="space-y-1 relative">
            <Table>
              <TableHeader>
                <TableRow className="sticky top-0 bg-background z-50 hover:bg-background">
                  <TableHead className="text-xs">Rank</TableHead>
                  <TableHead className="text-xs">Address</TableHead>
                  <TableHead className="text-xs">Holding%</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">24h change</TableHead>
                  <TableHead className="text-xs">Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdersData.map((item, index) => (
                  <TableRow className="border-b-0" key={index}>
                    <TableCell className="text-xs">{index + 1}</TableCell>
                    <TableCell>
                      {index === 100 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Other holders</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{item.holderWalletAddress.slice(0, 5) + '...' + item.holderWalletAddress.slice(-5)}</span>
                            <Button onClick={() => handleCopy(item.holderWalletAddress)} variant="ghost" size="icon" className="h-3 w-3 text-xs hover:text-muted-foreground">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          {item.holderTagVO && (
                            <>
                              {item.holderTagVO.suspicious === '1' && (
                                <TooltipProvider delayDuration={50}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs text-yellow-500"><Rat className="w-4 h-4" /></span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-secondary text-foreground">Suspicious</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {item.holderTagVO.snipers === '1' && (
                                <TooltipProvider delayDuration={50}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs text-yellow-500"><Crosshair className="w-4 h-4" /></span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-secondary text-foreground">Snipers</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {item.holderTagVO.smartMoney === '1' && (
                                <TooltipProvider delayDuration={50}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs text-blue-500"><Wallet2 className="w-4 h-4" /></span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-secondary text-foreground">Smart Money</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start flex-col gap-2">
                        <span className="text-xs">
                          {formatNumber(Number(Number(item.holdAmountPercentage).toFixed(2)))}%
                        </span>
                        <Progress
                          value={Number(item.holdAmountPercentage)}
                          className="h-1 w-24 bg-neutral-800"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">{formatNumber(Number(item.holdAmount))}</div>
                      <div className="text-xs text-muted-foreground">
                        ${formatNumber(Number(item.holdVolume))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.holdAmount24HChange ? (
                        Number(item.holdAmount24HChange) > 0 ? (
                          <div className="text-green-500 text-xs font-medium">{formatNumber(Number(item.holdAmount24HChange))}%</div>
                        ) : (
                          <div className="text-red-500 text-xs font-medium">{formatNumber(Number(item.holdAmount24HChange))}%</div>
                        )
                      ) : '--'}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider delayDuration={50}>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={item.explorerUrl} target="_blank">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-xs hover:bg-transparent"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-secondary text-foreground">View Details</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-full">
            <div className="flex items-center gap-0 flex-col">
              <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image" alt="" className="object-cover w-20 h-20" />
              <p>No records found!</p>
            </div>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center items-center h-full">
          <div className="flex items-center gap-3">
            <LoaderCircle size={24} className="animate-spin" />
            <p className="">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HolderTabs
