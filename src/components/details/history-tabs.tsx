"use client"

import { ExternalLink, Filter, Check, Copy, LoaderCircle, PlusCircle, MinusCircle, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TradingHistoryDataType } from "@/types/tradingHistoryDataTypes";
import axios from "axios";
import { useRouter } from "next/router";
import formatRelativeTime from "@/lib/formatRelativeDate";
import formatNumber from "@/lib/formatNumber";
import handleCopy from "@/lib/handleCopy";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";

const HistoryTabs = () => {
  const [historyData, setHistoryData] = useState<TradingHistoryDataType[]>([])
  const [type, setType] = useState(0)
  const [limit, setLimit] = useState(50)
  const { id } = useRouter().query
  const router = useRouter()
  const [userAddressList, setUserAddressList] = useState<string[]>([])
  const [dataReload, setDataReload] = useState(false)
  const [dummyUserList, setDummyUserList] = useState<string[]>([])
  const [inputValueAddress, setInputValueAddress] = useState("")
  const [userAddressPopOpen, setUserAddressPopOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const addDummyList = () => {
    if (inputValueAddress.trim() && !dummyUserList.includes(inputValueAddress)) {
      setDummyUserList((prev) => [...prev, inputValueAddress])
      setInputValueAddress("")
    }
  }

  const deleteDummyList = (index: number) => {
    setDummyUserList((prevList) => {
      const updatedList = [...prevList]
      updatedList.splice(index, 1)
      return updatedList
    })
  }

  const applyDummyListToFilter = () => {
    setUserAddressList(dummyUserList)
    setUserAddressPopOpen(false)
  }

  const resetFilters = () => {
    setDummyUserList([])
    setUserAddressList([])
    setUserAddressPopOpen(false)
  }

  const getData = async () => {
    try {
      const resp = await axios.post(`/api/token/trading/history/${id}`, {
        type,
        limit,
        userAddressList,
      })
      setHistoryData(resp.data)
      setDataReload(false)
      setLoading(false)
    } catch (error) {
      setDataReload(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady && id) {
      setLoading(true)
      getData()
      const interval = setInterval(() => {
        getData()
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [type, limit, userAddressList])

  return (
    <div className={`rounded-lg bg-background max-h-[30vh] h-[30vh] overflow-auto ${dataReload && "opacity-50"} no-scrollbar`}>
      {!loading ? (
        historyData.length > 0 && (
          historyData[0].list.length > 0 ? (
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="sticky top-0 bg-background hover:bg-background z-auto">
                  <TableHead className="lg:flex hidden gap-1 items-center cursor-pointer select-none text-xs">
                    Time
                  </TableHead>
                  <TableHead className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-1 cursor-pointer text-xs hover:text-foreground">
                          Type <Filter className="w-3 h-3 " />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem className="text-xs" onClick={() => setType(0)}>
                          All{" "}
                          {type === 0 && <Check className="w-3 h-3 ml-2" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs" onClick={() => setType(1)}>
                          Buy {" "}
                          {type === 1 && <Check className="w-3 h-3 ml-2" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs" onClick={() => setType(2)}>
                          Sell{" "}
                          {type === 2 && <Check className="w-3 h-3 ml-2" />}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead className="text-xs text-center">Amount</TableHead>
                  <TableHead className="text-xs">Price</TableHead>
                  <TableHead className="lg:flex hidden items-center cursor-pointer select-none text-xs">
                    Value
                  </TableHead>
                  <TableHead className="clear-start text-xs">
                    <Popover open={userAddressPopOpen} onOpenChange={setUserAddressPopOpen}>
                      <PopoverTrigger>
                        <div className="flex items-center gap-1 cursor-pointer text-xs hover:text-foreground">
                          Address <Filter className="w-3 h-3 " />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="text-xs space-y-3 lg:w-[27vw] w-[60vw] p-3">

                        {dummyUserList.length > 0 &&
                          dummyUserList.map((item, index) => (
                            <div className="flex items-center gap-2" key={index}>
                              <Input
                                placeholder="Enter the wallet address here"
                                value={item}
                                readOnly
                                className="md:text-xs text-xs h-8 focus:ring-0 focus-visible:ring-0"
                              />
                              <button
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => deleteDummyList(index)}
                              >
                                <MinusCircle size={18} />
                              </button>
                            </div>
                          ))}

                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Enter the wallet address here"
                            value={inputValueAddress}
                            onChange={(e) => setInputValueAddress(e.target.value)}
                            className="md:text-xs text-xs h-8 focus:ring-0 focus-visible:ring-0"
                          />
                          <button
                            className="text-muted-foreground hover:text-foreground"
                            onClick={addDummyList}
                          >
                            <PlusCircle size={18} />
                          </button>
                        </div>

                        <div className="flex w-full items-end gap-3 justify-end">
                          <Button size={"sm"} variant={"ghost"} onClick={resetFilters}>
                            Reset
                          </Button>
                          <Button size={"sm"} variant={"default"} onClick={applyDummyListToFilter}>
                            Apply
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableHead>
                  <TableHead className="text-right text-xs">Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData[0].list.map((item, index) => (
                  <TableRow key={index} className="border-b-0">
                    <TableCell className="font-medium lg:table-cell hidden text-xs">{formatRelativeTime(new Date(item.timestamp))}</TableCell>
                    <TableCell className="">
                      <div className="flex items-center gap-2">
                        <img src={item.poolLogoUrl} alt={item.dexName} className="w-5 h-5 object-cover rounded-full" />
                        <p className={`text-xs font-medium ${item.isBuy === "1" ? "text-green-500" : "text-red-500"}`}>{item.isBuy === "1" ? "Buy" : "Sell"}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-center w-28">
                      <div className="flex items-end gap-1 justify-end flex-col w-full">
                        {item.changedTokenInfo.map((token, index) => {
                          const isNativeToken = token.tokenAddress === id
                          const symbol = isNativeToken ? (item.isBuy === "1" ? "+" : "-") : item.isBuy === "1" ? "-" : "+"
                          const textColor = symbol === "-" ? "text-red-500" : "text-green-500"
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
                    <TableCell className="text-xs">${formatNumber(Number(item.price))}</TableCell>
                    <TableCell className="lg:table-cell hidden text-xs">${formatNumber(Number(item.volume))}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2">
                        <span className=" text-xs">
                          {item.userAddress.slice(0, 5) + "..." + item.userAddress.slice(-5)}
                        </span>
                        {userAddressList.length === 0 && (
                          <Button
                            disabled={dataReload}
                            onClick={() => {
                              setUserAddressList((prev) => [...prev, item.userAddress])
                              setDataReload(true)
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-3 w-3 text-muted-foreground hover:text-foreground"
                          >
                            <Filter className="h-3 w-3" />
                          </Button>
                        )}
                        {userAddressList.length > 0 && (
                          <Button
                            disabled={dataReload}
                            onClick={() => {
                              setDataReload(true)
                              setUserAddressList([])
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-3 w-3 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          onClick={() => handleCopy(item.userAddress)}
                          variant="ghost"
                          size="icon"
                          className="h-3 w-3 text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-end">
                      <Link href={item.txHashUrl} target="_blank">
                        <ExternalLink className="h-4 w-4 inline-block" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full flex h-full justify-center items-center">
              <div className="flex flex-col gap-1 items-center">
                <img src="https://www.okx.com/cdn/assets/imgs/2411/83A3C09108B03B0B.png?x-oss-process=image/resize,w_100,h_100,type_6/ignore-error,1" alt="" />
                <p className="text-foreground text-sm font-semibold">No results found!</p>
                <Button variant={'outline'} size={'sm'} className="mt-1" onClick={resetFilters}>Clear Filters</Button>
              </div>
            </div>
          )
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
  )
}

export default HistoryTabs;
