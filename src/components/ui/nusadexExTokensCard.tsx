'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TokenListDataType } from '@/types/tokenListDataTypes'
import formatNumber from '@/lib/formatNumber'


interface TokenCardProps {
  tokenData: TokenListDataType[],
  tokenName: string,
  tokenDesc: string,
}

 const NusadexExTokenCard =({ tokenData, tokenName, tokenDesc }: TokenCardProps) => {
  
  return (
    <Link href={`/tokens/details/${tokenData[0].tokenContractAddress}`} className="block w-full z-auto">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 lg:group hover:z-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              Featured Token
            </Badge>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="flex items-center gap-4 mb-6 z-auto">
            <img 
              src={tokenData[0].tokenLogoUrl} 
              alt="Gasvin Coin" 
              className="w-16 h-16 rounded-full border-2 border-muted p-1 transition-transform group-hover:scale-110 hover:z-auto" 
            />
            <div>
              <h2 className="text-2xl font-bold">{tokenName}</h2>
              <p className="text-muted-foreground">({tokenData[0].tokenSymbol})</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">{tokenDesc}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <TokenStat label="Price" value={`$${formatNumber(Number(tokenData[0].price))}`} />
            <TokenStat label="Market Cap" value={`$${formatNumber(Number(tokenData[0].marketCap))}`} />
            <TokenStat label="Volume" value={`$${formatNumber(Number(tokenData[0].volume))}`} />
            <TokenStat label="Address" value={`${tokenData[0].tokenContractAddress.slice(0, 5)}...${tokenData[0].tokenContractAddress.slice(-5)}`}fullValue={tokenData[0].tokenContractAddress}/>
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/50 p-4">
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 font-semibold">
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardFooter>
      </Card>
    </Link>
  )
}

function TokenStat({ label, value, fullValue }: { label: string, value: string, fullValue?: string }) {
  if (fullValue) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-semibold text-xs">{value}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-xs'>{fullValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-xs">{value}</p>
    </div>
  )
}

export default NusadexExTokenCard

