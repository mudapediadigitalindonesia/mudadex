import formatNumber from '@/lib/formatNumber';
import { PositionDataType } from '@/types/positionDataTypes';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { Check, Filter, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import formatRelativeTime from '@/lib/formatRelativeDate';

interface props {
  price: number;
}

// Fungsi untuk menghitung PnL
const calculatePnL = (transactions: any[], currentPrice: number) => {
  let totalBought = 0;
  let totalCost = 0;
  let totalSold = 0;
  let totalSellValue = 0;

  transactions.forEach((tx) => {
    if (tx.type === 1) { // Buy
      totalBought += Number(tx.amount);
      totalCost += Number(tx.amount) * Number(tx.price);
    } else if (tx.type === 2) { // Sell
      totalSold += Number(tx.amount);
      totalSellValue += Number(tx.amount) * Number(tx.price);
    } else if (tx.type === 3) { // Transfer In
      totalBought += Number(tx.amount);
    }
  });

  const holdings = totalBought - totalSold;
  const avgCost = totalBought > 0 ? totalCost / totalBought : 0;
  const unrealizedPnL = (currentPrice - avgCost) * holdings;
  const realizedPnL = totalSellValue - (avgCost * totalSold);
  const totalPnL = unrealizedPnL + realizedPnL;

  return {
    holdings,
    avgCost,
    unrealizedPnL,
    realizedPnL,
    totalPnL,
    totalBought,
    totalSellValue
  };
};

const calculateChangePercentage = (transactions: any[]) => {
  if (transactions.length < 2) return 0;

  const sortedTransactions = [...transactions].sort((a, b) => a.blockTime - b.blockTime);
  const firstPrice = Number(sortedTransactions[0].price);
  const lastPrice = Number(sortedTransactions[sortedTransactions.length - 1].price);

  if (firstPrice === 0) return 0;

  return ((lastPrice - firstPrice) / firstPrice) * 100;
};

const PositionTabs = ({ price }: props) => {
  const [positionData, setPositionData] = useState<PositionDataType[]>([]);
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const { id } = router.query;
  const [sort, setSort] = useState('desc');
  const [pageSize, setPageSize] = useState(100);
  const [types, setTypes] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const resp = await axios.get('/api/token/position', {
        params: {
          walletAddress: publicKey?.toBase58(),
          tokenContractAddress: id,
          sort,
          pageSize,
          types,
        },
      });
      setPositionData(resp.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      setLoading(true);
      const interval = setInterval(() => {
        getData();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [connected, publicKey]);

  const pnlData = positionData.length > 0 ? calculatePnL(positionData[0].transactions, price) : {
    holdings: 0,
    avgCost: 0,
    unrealizedPnL: 0,
    realizedPnL: 0,
    totalPnL: 0,
    totalBought: 0,
    totalSellValue: 0,
  };
  const changePercentage = positionData.length > 0 ? calculateChangePercentage(positionData[0].transactions) : 0;

  return (
    <div className="rounded-lg bg-background max-h-[32vh] h-[32vh] overflow-auto no-scrollbar space-y-5 py-2">
      {!loading ? (
        positionData.length > 0 && positionData[0].transactions.length > 0 ? (
          <div className="space-y-3">
            <div className="w-full flex justify-between px-3 border-b-2 pb-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground border-b border-dashed pb-0.5">My Balance</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 }).format(pnlData.holdings * price)}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {pnlData.holdings.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground border-b border-dashed pb-0.5">Total PnL</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 }).format(pnlData.totalPnL)}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {changePercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground border-b border-dashed pb-0.5">Unrealized PnL</p>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-xs font-medium ${pnlData.unrealizedPnL >= 0 ? 'text-green-500' : pnlData.unrealizedPnL === 0 ? 'text-foreground' : 'text-red-500'}`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 }).format(pnlData.unrealizedPnL)}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {pnlData.avgCost > 0 && pnlData.holdings > 0 
                      ? (pnlData.unrealizedPnL / (pnlData.avgCost * pnlData.holdings) * 100).toFixed(2) 
                      : "0.00"}%
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground border-b border-dashed pb-0.5">Realized PnL</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium">
                    {pnlData.realizedPnL.toFixed(4)}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {pnlData.totalSellValue > 0 
                      ? (pnlData.realizedPnL / pnlData.totalSellValue * 100).toFixed(2) 
                      : "0.00"}%
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground border-b border-dashed pb-0.5">Bought/Avg cost</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-medium">
                    ${pnlData.avgCost.toFixed(4)}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {pnlData.totalBought.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positionData[0].transactions.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">
                        {item.type === 1 && (
                          <Badge className="bg-green-900 text-green-100">Buy</Badge>
                        )}
                        {item.type === 2 && (
                          <Badge className="bg-red-900 text-red-100">Sell</Badge>
                        )}
                        {item.type === 3 && (
                          <Badge className="bg-blue-900 text-blue-100">Transfer in</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs">
                        {formatRelativeTime(new Date(item.blockTime))}
                      </TableCell>
                      <TableCell className="text-xs">
                        {item.type === 1 || item.type === 3 && `+${formatNumber(Number(item.amount))}`}
                        {item.type === 2 && `-${formatNumber(Number(item.amount))}`}
                      </TableCell>
                      <TableCell className="text-xs">
                        ${formatNumber(Number(item.price))}
                      </TableCell>
                      <TableCell className="text-xs">
                        ${formatNumber(Number(item.turnover))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="w-full flex h-full justify-center items-center">
            <p>No assets found!</p>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center items-center h-full">
          <LoaderCircle size={24} className="animate-spin" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default PositionTabs;
