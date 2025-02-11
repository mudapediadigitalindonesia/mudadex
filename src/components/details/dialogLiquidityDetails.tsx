import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpRightSquareIcon, ChevronRight, Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import formatNumber from '@/lib/formatNumber';
import { Pool } from '@/types/tokenDetailsDataTypes';
import handleCopy from '@/lib/handleCopy';
import Link from 'next/link';
import formatRelativeTime from '@/lib/formatRelativeDate';

interface props {
  image?: string,
  name?: string,
  liq?: string,
  data: Pool[],
  
}

const DialogLiquidityDetails = ({ image, name, liq, data}: props) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button className=" flex items-center gap-1 group" onClick={() => setOpen(true)}>
        <p className="text-xs">${formatNumber(Number(liq))}</p>
        <ChevronRight size={14} className='opacity-50 group-hover:opacity-100' />
      </button>
      <DialogContent className='max-w-screen-md'>
        <DialogHeader className='space-y-8'>
          <DialogTitle>Liquidity pool</DialogTitle>
          <DialogDescription>
            <div className='space-y-5'>
              <div className="flex items-center gap-2  border-t pt-2">
                <img src={image} alt="" className="w-14 h-14 object-cover rounded-full p-1" />
                <div className="space-y-0 leading-snug">
                  <p className="text-foreground font-semibold">{name}</p>
                  <p className="text-muted-foreground text-sm">This token is available in the following liquidity pools.</p>
                </div>
              </div>
              <div className='w-full pt-2 border-t max-h-[50vh] overflow-auto'>
                <Table>
                  <TableHeader className='sticky -top-2 bg-background'>
                    <TableRow>
                      <TableHead className='text-xs'>Pool</TableHead>
                      <TableHead className='text-xs'>Liquidity</TableHead>
                      <TableHead className='text-xs lg:table-cell hidden'>Amount/Token</TableHead>
                      <TableHead className="text-xs lg:table-cell hidden">Pool address</TableHead>
                      <TableHead className="text-xs lg:table-cell hidden">Creator/Time</TableHead>
                      <TableHead className="text-xs">Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.length > 0 && (
                      data.map((item, index) => (
                        <TableRow className='border-b-0 text-foreground' key={index}>
                          <TableCell className="font-medium">
                            <div className='flex items-center gap-3'>
                              <img src={item.poolLogoUrl} className='w-8 h-8 object-cover rounded-full' />
                              <div>
                                <p className='text-xs'>PYUSD/wSOL</p>
                                <p className='text-muted-foreground text-xs'>{item.dexName}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-xs'>${formatNumber(Number(item.liquidity))}</TableCell>
                          <TableCell className='lg:table-cell hidden'>
                            <div className='space-y-0'>
                              {item.poolTokenInfoList.map((item, index) => (
                                <p key={index} className='text-xs'>{formatNumber(Number(item.amount))} <span className='text-muted-foreground'>{item.tokenSymbol}</span></p>
                              ))}

                            </div>
                          </TableCell>
                          <TableCell className='lg:table-cell hidden'>
                            <div className='flex items-center gap-2 text-xs'>
                              {item.pairAddress.slice(0, 5) + '...' + item.pairAddress.slice(-5)} <button onClick={() => handleCopy(item.pairAddress)}><Copy size={14} /></button>
                            </div>
                          </TableCell>
                          <TableCell className="lg:table-cell hidden">
                            <div>
                              <div className='flex items-center gap-2 text-xs'>
                                {item.creatorAddress ? (
                                  <>
                                    {item.creatorAddress.slice(0, 5) + '...' + item.creatorAddress.slice(-5)}
                                    <button onClick={() => handleCopy(item.creatorAddress)}><Copy size={14} /></button>
                                  </>
                                ) : '--'}
                              </div>
                              <p className='text-muted-foreground text-xs'>
                                {item.createTimestamp ? new Date(item.createTimestamp).toLocaleString('us-US', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                }) : '--'}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link href={item.explorerUrl} target='_blank'>
                              <ArrowUpRightSquareIcon size={16} strokeWidth={1.5} />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLiquidityDetails;