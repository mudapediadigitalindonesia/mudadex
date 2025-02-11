import React from 'react';
import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const data = [
  { time: "0:00", price: 12.47 },
  { time: "4:00", price: 12.65 },
  { time: "8:00", price: 12.35 },
  { time: "12:00", price: 12.45 },
  { time: "16:00", price: 12.95 },
  { time: "20:00", price: 12.85 },
  { time: "24:00", price: 12.47 }
]

const timeRanges = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "1Y", value: "1y" }
]


const PriceChart = () => {
  const [timeRange, setTimeRange] = useState("1d")

  return (
    <div>
      <Card className="w-full bg-background border-0">
        <CardContent className="p-6">
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']}/>
                <Line type="monotoneX" dataKey="price" stroke="#06D001" strokeWidth={2} dot={false} filter="drop-shadow(0 0 6px rgba(255, 0, 255, 0.7))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mb-4">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
                className="text-zinc-400 hover:text-white"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceChart;