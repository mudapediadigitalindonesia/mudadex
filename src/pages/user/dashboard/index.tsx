'use client'

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import { Copy, TrendingUp, TrendingDown, Wallet, RefreshCcw } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import PriceChart from "@/components/dashboard/price-chart"
import { WalletDataType } from "@/types/walletDataTypes"
import formatNumber from "@/lib/formatNumber"
import handleCopy from "@/lib/handleCopy"

const ModernDashboard = () => {
  const { publicKey, connected } = useWallet()
  const [walletData, setWalletData] = useState<WalletDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getWalletData = async () => {
    if (publicKey) {
      try {
        setIsLoading(true)
        const resp = await axios(`/api/wallet/dashboard/${publicKey.toBase58()}`)
        setWalletData(resp.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getWalletData()
  }, [publicKey])

  const totalValue = walletData.length > 0 ? Number(walletData[0].totalValue) : 0
  const dailyChange = 2.5 // Example value, replace with actual data

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={getWalletData} variant="outline" size="sm">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              {dailyChange >= 0 ? (
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +{dailyChange}% from yesterday
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  {dailyChange}% from yesterday
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => publicKey && handleCopy(publicKey.toBase58())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">
                {publicKey
                  ? `${publicKey.toBase58().slice(0, 5)}...${publicKey.toBase58().slice(-5)}`
                  : "Not connected"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Proportion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : (
                walletData.length > 0 &&
                walletData[0].tokenAssets.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <img
                          src={
                            item.symbol === "SOL"
                              ? "https://www.okx.com/cdn/wallet/logo/SOL-20220525.png"
                              : `https://www.okx.com/cdn/web3/currency/token/501-${item.tokenAddress}-98.png/type=default_350_0?v=1732072025184`
                          }
                          alt={item.symbol}
                          className="w-6 h-6"
                        />
                        <span>{item.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell>${formatNumber(Number(item.tokenPrice))}</TableCell>
                    <TableCell>
                      <div>{formatNumber(Number(item.balance))}</div>
                      <div className="text-xs text-muted-foreground">
                        ${formatNumber(Number(item.balance) * Number(item.tokenPrice))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(Number(item.balance) * Number(item.tokenPrice)) / totalValue * 100}
                          className="w-full"
                        />
                        <span className="text-muted-foreground font-medium w-12 text-right">
                          {((Number(item.balance) * Number(item.tokenPrice)) / totalValue * 100).toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModernDashboard

