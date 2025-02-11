'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Star, TrendingUp, DollarSign, BarChart3, TrendingDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import formatNumber from '@/lib/formatNumber'

interface TokenCardProps {
  name: string
  symbol?: string
  price?: number
  change24h?: number
  volume24h?: number
  marketCap?: number
  image: string,
  ca: string,
  btnDisabled?: boolean
}

const colorPalettes = [
  ['#10B981', '#059669'], // Green
  ['#3B82F6', '#2563EB'], // Blue
  ['#8B5CF6', '#7C3AED'], // Purple
  ['#EC4899', '#DB2777'], // Pink
  ['#F59E0B', '#D97706'], // Yellow
  ['#EF4444', '#DC2626'], // Red
]

const buttonStyles = [
  'rounded-lg',
]

export default function ListedTokenCard({ name, symbol, price, change24h, volume24h, marketCap, image, ca, btnDisabled = false }: TokenCardProps) {
  const [colors, setColors] = useState(colorPalettes[0])
  const [buttonStyle, setButtonStyle] = useState(buttonStyles[0])

  useEffect(() => {
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
    const randomStyle = buttonStyles[Math.floor(Math.random() * buttonStyles.length)]
    setColors(randomPalette)
    setButtonStyle(randomStyle)
  }, [])

  return (
    <Card className="relative w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-opacity-30 transition-all duration-300" style={{ '--hover-color': colors[0] } as React.CSSProperties}>
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ '--start-color': `${colors[0]}10`, '--end-color': `${colors[1]}10` } as React.CSSProperties} />

      <CardContent className="relative p-6 w-full">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full blur opacity-30" style={{ background: `linear-gradient(to right, ${colors[0]}80, ${colors[1]}80)` }} />
              <img src={image} alt={name} className="relative w-10 h-10 rounded-full border border-zinc-700"/>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-0.5">{name}</h3>
              <p className="text-xs text-zinc-400 font-semibold">{symbol}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="text-xs px-2 py-0.5" style={{ backgroundColor: `${colors[0]}20`, color: colors[0] }}>
              Exclusive
            </Badge>
            <Star className="w-4 h-4 text-zinc-500 hover:text-yellow-500 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-bold text-white">
              ${price ? formatNumber(price) : 'N/A'}
            </h4>
            <div className={`flex items-center gap-1 text-sm font-medium ${change24h && change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h && change24h >= 0 ? '+' : ''}{change24h}%
              {change24h && change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1 text-zinc-400">
              <BarChart3 className="w-3 h-3" />
              <span className="text-xs">24h Volume</span>
            </div>
            <p className="text-sm font-semibold text-white">
              ${volume24h ? formatNumber(volume24h) : 'N/A'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1 text-zinc-400">
              <DollarSign className="w-3 h-3" />
              <span className="text-xs">Market Cap</span>
            </div>
            <p className="text-sm font-semibold text-white">
              ${marketCap ? formatNumber(marketCap) : 'N/A'}
            </p>
          </div>
        </div>

        {btnDisabled ? (
          <button disabled={btnDisabled} className={`w-full h-9 flex items-center justify-center gap-1.5 text-white text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${buttonStyle}`} style={{ background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` }}>
            Trade on NusaDex
            <ArrowUpRight className="w-4 h-4" />
          </button>
        ) : (
          <button disabled={btnDisabled} className={`w-full h-9  text-white text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${buttonStyle}`} style={{ background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` }}>
            <Link href={`/tokens/details/${ca}`} className='w-full h-full flex items-center justify-center gap-1.5'>
              Trade on NusaDex
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </button>
        )}
      </CardContent>
    </Card>
  )
}

