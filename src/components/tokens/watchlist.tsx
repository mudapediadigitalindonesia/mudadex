import React, { useEffect, useState } from 'react';

import WatchlistCard from '../ui/watchlistCard';
import { TokenSearchDataTypes } from '@/types/tokenSearchDataTypes';
import axios from 'axios';
import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { WatchlistDataType } from '@/types/watchlistDataTypes';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '../ui/button';

const Watchlist = () => {
  const [data, setData] = useState<WatchlistDataType[]>([])
  const { connected, publicKey } = useWallet()
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    if (connected && publicKey) {

      try {
        const resp = await axios('/api/users/watchlist/get/withData', {
          params: {
            addr: publicKey.toBase58()
          }
        })
        setData(resp.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (connected) {
      setLoading(true)
      getData()
      if (data.length === 0) {
        return
      } else {
        const interval = setInterval(() => {
          getData()
        }, 2000)
        return () => clearInterval(interval)
      }
    }
  }, [connected, data.length])

  return (
    <div className='w-full'>
      {!loading ? (
        data.length > 0 ? (
          <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
            {data.map((item, index) => (
              <WatchlistCard image={item.tokenLogoUrl} marketCap={item.marketCap} name={item.tokenName} oneHourChange={item.change1H} price={item.price} symbol={item.tokenSymbol} twentyFourHourChange={item.change} ca={item.tokenContractAddress} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[50vh] space-y-3">
            <div className="w-full flex items-center justify-center flex-col gap-0">
              <picture>
                <source srcSet="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/format,webp/resize,w_200,h_200,type_6/ignore-error,1" />
                <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/resize,w_200,h_200,type_6/ignore-error,1" />
              </picture>
              <p className="font-semibold">Watchlist empty</p>
              <p className="text-muted-foreground">Connect your wallet to manage Watchlist.</p>
              <div className="mt-5">
                <Button onClick={() => location.reload()}>Add Watchlist</Button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Card className='border-0' key={index}>
              <CardHeader className='h-[12vh] p-0'>
                <Skeleton className='w-full h-full' />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;