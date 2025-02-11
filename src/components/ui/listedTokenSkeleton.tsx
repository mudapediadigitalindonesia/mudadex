'use client'

import { Card, CardContent } from "@/components/ui/card"

export default function ListedTokenCardSkeleton() {
  return (
    <Card className="relative w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
      <CardContent className="relative p-6 w-full">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
            <div>
              <div className="w-24 h-5 bg-zinc-800 rounded-md animate-pulse mb-1" />
              <div className="w-16 h-4 bg-zinc-800 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-5 bg-zinc-800 rounded-md animate-pulse" />
            <div className="w-4 h-4 bg-zinc-800 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <div className="w-28 h-8 bg-zinc-800 rounded-md animate-pulse" />
            <div className="w-16 h-5 bg-zinc-800 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-zinc-800 animate-pulse">
            <div className="w-full h-4 bg-zinc-700 rounded mb-2" />
            <div className="w-3/4 h-5 bg-zinc-700 rounded" />
          </div>
          <div className="p-3 rounded-lg bg-zinc-800 animate-pulse">
            <div className="w-full h-4 bg-zinc-700 rounded mb-2" />
            <div className="w-3/4 h-5 bg-zinc-700 rounded" />
          </div>
        </div>

        <div className="w-full h-10 bg-zinc-800 rounded-md animate-pulse" />
      </CardContent>
    </Card>
  )
}

