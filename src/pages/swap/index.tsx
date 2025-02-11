import SwapComponents from '@/components/swap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeftRight, ChartArea, Settings2Icon } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';

const SwapPages = () => {
  const [sideChange, setSideChange] = useState(false)
  const [slippage, setSlippage] = useState(0.1)
  const [iframeTokenCA, setIframeTokenCA] = useState('GzY1KbkgbxaLCY52aQZ2JDk1ygE5V4wF7c9UdDVuvPma')


  return (
    <>
      <Head>
        <title>Nusadex - Effortless Token Swaps at Your Fingertips</title>
        <meta name='description' content='Swap tokens quickly and securely on Nusadex. Enjoy seamless transactions with competitive rates and fast execution in the world of digital assets.' key={'desc'} />
        <meta property='og:description' content='Swap tokens quickly and securely on Nusadex. Enjoy seamless transactions with competitive rates and fast execution in the world of digital assets.' />
        <meta property='og:description' content='Swap tokens quickly and securely on Nusadex. Enjoy seamless transactions with competitive rates and fast execution in the world of digital assets.' />
      </Head>
      <div className='w-full lg:h-[90vh] flex justify-center items-center flex-col gap-2 lg:py-0 py-6'>
        <div className='w-full flex items-end justify-end'>
          <div className='flex items-center gap-2'>

            {/* if has a payment gateway */}
            {/* <Button className='w-fit h-fit p-2 text-xs' variant={'outline'}>
            <DollarSign />
          </Button> */}

            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger className='flex items-center h-9 p-2 hover:opacity-60 transition-opacity border rounded-md text-sm gap-2'>
                  <Settings2Icon size={16} />
                  <p>{slippage}%</p>
                </TooltipTrigger>
                <TooltipContent className='w-fit'>
                  <Input className='lg:text-xs h-7 w-12' value={slippage} type='number' onChange={(e) => setSlippage(Number(e.target.value))} />
                </TooltipContent>

              </Tooltip>
            </TooltipProvider>
            <Button onClick={() => setSideChange(!sideChange)} className='w-fit h-fit p-2 text-xs' variant={'outline'}>
              <ArrowLeftRight />
            </Button>
            <Button className='w-fit h-fit p-2 text-xs' variant={'outline'}>
              <ChartArea />
            </Button>
          </div>
        </div>
        <div className={`w-full flex items-start justify-between gap-5 ${sideChange ? 'lg:flex-row-reverse flex-col' : 'lg:flex-row flex-col-reverse'} `}>

          <div className='flex items-center justify-center lg:w-3/4 w-full border p-1 rounded-md h-[70vh]'>
            <iframe src={`https://birdeye.so/tv-widget/${iframeTokenCA}?chain=solana&viewMode=pair&chartInterval=15&chartType=Candle&chartTimezone=Asia%2FJakarta&chartLeftToolbar=show&theme=dark&cssCustomProperties=--tv-color-platform-background%3A%2309090b&cssCustomProperties=--tv-color-pane-background%3A%2309090b&chartOverrides=paneProperties.backgroundType%3Asolid&chartOverrides=paneProperties.background%3Argba%289%2C+9%2C+11%2C+1%29`} className='w-full h-full' allowFullScreen loading='lazy' />
          </div>

          <div className='flex items-center lg:w-1/2 w-full border h-fit rounded-md p-5 flex-col gap-5'>
            <SwapComponents hasPriceDetails={true} setIframeTokenCA={setIframeTokenCA} />
          </div>

        </div>
      </div>
    </>
  );
};

export default SwapPages;