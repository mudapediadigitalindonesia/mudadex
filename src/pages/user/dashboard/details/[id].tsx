'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, QrCode, CircleAlert, ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Line, LineChart, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis } from "recharts"

// Mock data for the price chart
const chartData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  price: 97000 + Math.random() * 1000
}))

const transactions = [
  {
    type: 'receive',
    amount: '+0.5 BTC',
    value: '+$48,560.50',
    from: '3FZbgi29...',
    time: '2024-01-10 12:30'
  },
  {
    type: 'send',
    amount: '-0.1 BTC',
    value: '-$9,712.09',
    to: '1A1zP1ep...',
    time: '2024-01-09 15:45'
  }
]

const ModernDetailsDashboard = () => {
  const [timeframe, setTimeframe] = useState('24H')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 p-2">
              <img src="/coin/Bitcoin.png" alt="Bitcoin" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                BTC
                <span className="text-sm font-normal px-2 py-1 bg-secondary rounded">Bitcoin</span>
              </h1>
            </div>
          </div>

          {/* Balance Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground">Balance</div>
                  <div className="text-4xl font-bold">10.000 BTC</div>
                  <div className="text-lg text-muted-foreground">≈ $971,240,100.00</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Bitcoin Address</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-secondary p-2 rounded flex-1 break-all">
                      bc1pf0d7hnz5dq0smlwv2gm9rqj9k96kctmg4f44r8nnc3uew4340ehsnev5e0
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy('bc1pf0d7hnz5dq0smlwv2gm9rqj9k96kctmg4f44r8nnc3uew4340ehsnev5e0')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <QrCode className="h-4 w-4" />
                          Receive
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <img src="/coin/Bitcoin.png" alt="QR Code" className="w-32 h-32" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>From/To</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === 'receive' ? (
                            <ArrowDown className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowUp className="h-4 w-4 text-red-500" />
                          )}
                          <span className="capitalize">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={tx.type === 'receive' ? 'text-green-500' : 'text-red-500'}>
                          {tx.amount}
                          <div className="text-sm text-muted-foreground">{tx.value}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{tx.from || tx.to}</TableCell>
                      <TableCell>{tx.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Price Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold">$97,120.91</div>
                  <div className="text-sm text-red-500">-2.01%</div>
                </div>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <ChartTooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex gap-2">
                  {['24H', '7D', '30D', '1Y'].map((period) => (
                    <Button
                      key={period}
                      variant={timeframe === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Market cap', value: '$3,286.97B', tooltip: 'The total market value of a cryptocurrencys circulating supply' },
                { label: 'Max supply', value: '999.92M', tooltip: 'Maximum number of coins that will ever exist' },
                { label: 'Circulating supply', value: '999.92M', tooltip: 'Amount of coins currently in circulation' }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {stat.label}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <CircleAlert className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="font-medium">{stat.value}</div>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Contract address</h3>
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                  <img src="/coin/Solana SOL.png" alt="Solana" className="w-6 h-6" />
                  <span className="font-mono">Solana: ECxVCg...Z85t</span>
                  <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ModernDetailsDashboard

