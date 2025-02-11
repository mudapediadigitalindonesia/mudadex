"use client";

import { useState, useMemo, useEffect, Dispatch, SetStateAction } from "react";
import {
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Filter,
  Check,
  Copy,
  LoaderCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { LiquidityChangeDataType } from "@/types/liquidityChangeDataTypes";
import axios from "axios";
import { useRouter } from "next/router";
import formatRelativeTime from "@/lib/formatRelativeDate";
import formatNumber from "@/lib/formatNumber";
import Link from "next/link";

interface props {
  tokenSymbol: string;
}

const LiquidityChangeTabs = ({ tokenSymbol }: props) => {
  const { id } = useRouter().query
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const [type, setType] = useState(0)

  const [liqData, setLiqData] = useState<LiquidityChangeDataType[]>([])

  const getData = async () => {
    try {
      const resp = await axios(`/api/token/liquidity/${id}`, {
        params: {
          type
        }
      })
      setLiqData(resp.data)
      setLoad(false)
    } catch (error) {
      setLoad(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady && id) {
      setLoad(true)
      getData()
      const interval = setInterval(() => {
        getData()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [router.isReady, id, type])

  return (
    <div className="rounded-lg bg-background max-h-[30vh] h-[30vh] overflow-auto no-scrollbar">
      {!load ? (
        liqData.length > 0 ? (
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow className="hover:bg-background">
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center cursor-pointer text-xs">
                        Type <Filter className="w-3 h-3 ml-1" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem className="text-xs" onClick={() => setType(0)}>
                        All{" "}
                        {type === 0 && <Check className="w-3 h-3 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs" onClick={() => setType(1)}>
                        Add{" "}
                        {type === 1 && <Check className="w-3 h-3 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs" onClick={() => setType(2)}>
                        Remove{" "}
                        {type === 2 && <Check className="w-3 h-3 ml-2" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="flex  items-center cursor-pointer select-none text-xs" >
                  Time
                  {/* <div className="flex flex-col ml-1 -space-y-1">
                    <ChevronUp className={`h-3 w-3`} strokeWidth={2} />
                    <ChevronDown className={`h-3 w-3`} strokeWidth={2} />
                  </div> */}
                </TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="flex items-center cursor-pointer select-none text-xs">
                  Value
                  {/* <div className="flex flex-col ml-1 -space-y-1">
                    <ChevronUp className={`h-3 w-3`} strokeWidth={2} />
                    <ChevronDown className={`h-3 w-3`} strokeWidth={2} />
                  </div> */}
                </TableHead>
                <TableHead className="text-xs lg:table-cell hidden">Address</TableHead>
                <TableHead className=" text-xs lg:table-cell hidden">Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liqData && liqData.map((item, index) => (
                <TableRow className="border-b-0" key={index}>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-2">
                      <img src={item.poolLogoUrl} alt={item.poolName} className="w-5 h-5 object-cover rounded-full" />
                      <p>{item.type === '1' ? 'Add' : 'Remove'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{formatRelativeTime(new Date(Number(item.timestamp)))}</TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-end gap-1 flex-col w-fit">
                      {item.changedTokenInfo.map((token, index) => {
                        const isNativeToken = token.tokenSymbol === tokenSymbol
                        const symbol = isNativeToken ? item.type === '1' ? '+' : '-' : item.type === '1' ? '-' : '+'
                        const textColor = symbol === '-' ? 'text-[#ca3f64]' : 'text-[#25a750]'
                        return (
                          <div className="flex items-center gap-1" key={index}>
                            <p className={`${textColor} font-medium`}>
                              {symbol}
                              {formatNumber(Number(token.amount))}
                            </p>
                            <p className="text-muted-foreground">{token.tokenSymbol}</p>
                          </div>
                        )
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">${formatNumber(Number(item.value))}</TableCell>
                  <TableCell className="text-xs lg:table-cell hidden">
                    <div className="flex items-center gap-2">
                      {item.userWalletAddress.slice(0, 5)}...{item.userWalletAddress.slice(-5)}
                      <button><Copy className="w-4 h-4" /></button>
                    </div>
                  </TableCell>
                  <TableCell className="items-end lg:table-cell hidden">
                    <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={item.txHashUrl} target="_blank">
                            <Button variant="ghost" size="sm" className="w-fit">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full flex justify-center items-center h-[30vh] flex-col">
            <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/resize,w_100,h_100,type_6/ignore-error,1" alt="not data" />
            <h1 className="">No records found!</h1>
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

export default LiquidityChangeTabs;