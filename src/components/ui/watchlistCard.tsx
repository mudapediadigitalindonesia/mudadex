import { ArrowDown, ArrowUp, ChevronDown, Maximize2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "./card"
import Image from "next/image"
import { Button } from "./button"
import Link from "next/link"
import { m } from "framer-motion"
import formatNumber from "@/lib/formatNumber"

interface props {
  name: string,
  symbol: string,
  price: string,
  marketCap: string,
  oneHourChange: string,
  twentyFourHourChange: string,
  image: string,
  ca: string
}

const WatchlistCard = ({ image, marketCap, name, oneHourChange, price, symbol, twentyFourHourChange, ca }: props) => {

  return (
    <Link href={'/tokens/details/' + ca} className="hover:bg-secondary rounded-lg transition-colors">
      <Card className="w-full text-foreground text-sm bg-transparent">
        <CardHeader className="p-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <img src={image} alt={name} className="rounded-full object-cover w-10 h-10" />
              </div>
              <div>
                <span className="font-semibold">{symbol.length > 10 ? symbol.slice(0, 10) + '...' : symbol}</span>
                <span className="text-muted-foreground ml-2">{name.length > 10 ? name.slice(0, 10) + '...' : name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className=" text-muted-foreground">MCAP: <span className="text-foreground">${formatNumber(Number(marketCap))}</span></div>
              <div className="font-semibold">${formatNumber(Number(price))}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {Number(oneHourChange) <= 0 ? (
              <div className="flex items-center gap-2">
                <span className=" text-muted-foreground">1H:</span>
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="w-3 h-3" />
                  {formatNumber(Number(oneHourChange))}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className=" text-muted-foreground">1H:</span>
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="w-3 h-3" />
                  {formatNumber(Number(oneHourChange))}%
                </span>
              </div>
            )}
            {Number(twentyFourHourChange) >= 0 ? (
              <div className="flex items-center gap-2">
                <span className=" text-muted-foreground">24H:</span>
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="w-3 h-3" />
                  {formatNumber(Number(twentyFourHourChange))}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className=" text-muted-foreground">24H:</span>
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="w-3 h-3" />
                  {formatNumber(Number(twentyFourHourChange))}%
                </span>
              </div>
            )}
          </div>
        </CardHeader>

      </Card>
    </Link>
  )
}


export default WatchlistCard

