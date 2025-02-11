import { useEffect, useState } from 'react';
import { TokenListDataType } from '@/types/tokenListDataTypes';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
import NusadexExTokenCard from '../ui/nusadexExTokensCard';
import { Card, CardContent, CardFooter } from '../ui/card';
import ListedTokenCard from '../ui/listedTokenCard';
import { NusadexTokenListDataType } from '@/types/nusadexTokenListDataTypes';
import ListedTokenCardSkeleton from '../ui/listedTokenSkeleton';

const ExclusiveTokens = () => {
  const [mudaTokenData, setMudaTokenData] = useState<TokenListDataType[]>([])
  const [pavoTokenData, setPavoTokenData] = useState<TokenListDataType[]>([])
  const [kerisTokenData, setKerisTokenData] = useState<TokenListDataType[]>([])
  const [gasvinTokenData, setGasvinTokenData] = useState<TokenListDataType[]>([])
  const [uistellarTokenData, setUistellarTokenData] = useState<TokenListDataType[]>([])
  const [nusadexTokenList, setNusadexTokenList] = useState<NusadexTokenListDataType[]>([])
  const [nagaTokenData, setNagaTokenData] = useState<TokenListDataType[]>([])
  const [loading, setLoading] = useState(false)
  

  const getMudaTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=BQzggkomEhe4fUZmHEUMG7JpM9eioFcQinFshWYPnxp9')
      setMudaTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getPavoTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=GzY1KbkgbxaLCY52aQZ2JDk1ygE5V4wF7c9UdDVuvPma')
      setPavoTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getKerisTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=ABb9yPAKEYAxzCdqBj2t8HYgJD45Mq1krsF81ArU8CQ')
      setKerisTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getUistellarTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=5uuVHm3GDZXqxEeFa7JKyve4HVifhjaSpAWHfz2Bb8aY')
      setUistellarTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getGasvinTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=5QzVU4pd7apoXVhoAn97xYvgxdSARncgchLaH53E7U3e')
      setGasvinTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getNusadexTokenList = async () => {
    try {
      const resp = await axios('/api/token/list/nusadex/get')
      if (resp.data.length > 0) {
        setNusadexTokenList(resp.data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getNagaTokenData = async () => {
      try {
        const resp = await axios('/api/token/search?keyword=9XRLyd91PvJYE4qwFawExYXA9MLFVLLmZgmhgcuBEytZ')
        setNagaTokenData(resp.data)
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    getMudaTokenData()
    getPavoTokenData()
    getKerisTokenData()
    getUistellarTokenData()
    getGasvinTokenData()
    getNagaTokenData()
  }, [])

  useEffect(() => {
    setLoading(true)
    getNusadexTokenList()
    const interval = setInterval(() => {
      getNusadexTokenList()
    }, 10000)
    return () => clearInterval(interval)
  }, [])



  return (
    <>
      <div className="w-full space-y-16 py-6">
        <div className="w-full space-y-5">
          <div className='space-y-2'>
            <h1 className='font-semibold text-xl'>Nusadex Exclusive Tokens</h1>
            <p className='max-w-screen-md text-sm text-muted-foreground'>Explore an exclusive collection of tokens designed for you. Each token represents incredible innovation, huge potential, and endless opportunities in the blockchain world. Enhance your portfolio and achieve a bright financial future with Nusadex!</p>
          </div>
          {mudaTokenData.length > 0 && pavoTokenData.length > 0 && uistellarTokenData.length > 0 && gasvinTokenData.length > 0 && kerisTokenData.length > 0 && nagaTokenData.length > 0 ? (
            <div className='w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6'>
              <NusadexExTokenCard tokenData={mudaTokenData} tokenDesc='We, at Mudapedia, understand that ...' tokenName='MUDAPEDIA' />
              <NusadexExTokenCard tokenData={pavoTokenData} tokenDesc='PavoCoin is an innovative digital coin ...' tokenName='Pavo Coin' />
              <NusadexExTokenCard tokenData={kerisTokenData} tokenDesc=' am a person who in everyd ...' tokenName='INDRAWSP' />
              <NusadexExTokenCard tokenData={gasvinTokenData} tokenDesc='Gasvin Coin (GASVIN) is a crypto ...' tokenName='Gasvin Coin' />
              <NusadexExTokenCard tokenData={uistellarTokenData} tokenDesc='Uistellar is a platform offering a ...' tokenName='Uistellar' />
              <NusadexExTokenCard tokenData={nagaTokenData} tokenDesc='Nagapara is a company operating...' tokenName='NAGAPARA' />
            </div>
          ) : (
            <div className='w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Card className="w-full overflow-hidden" key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>

                    <Skeleton className="w-full h-4 mb-6" />

                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-muted/30 rounded-lg p-3">
                          <Skeleton className="h-3 w-16 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/50 p-4">
                    <Skeleton className="w-full h-9 rounded-md" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className='space-y-10'>
          <div className='space-y-5  text-center'>
            <h1 className='font-semibold lg:text-8xl text-5xl text-center'>Listed on Nusadex</h1>
            <p className='max-w-screen-md text-sm text-muted-foreground mx-auto'>Nusadex takes your token to the next level with global exposure and unlimited opportunities.
            Get ready to reach further and achieve success with Nusadex!</p>
          </div>

          {!loading ? (
            nusadexTokenList.length > 0 ? (
              <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
                {nusadexTokenList.map((token, i) => (
                  <ListedTokenCard key={i} name={token.title} symbol={token.tokenSymbol} price={Number(token.price)} change24h={Number(token.change)} volume24h={Number(token.volume)} marketCap={Number(token.marketCap)} image={token.tokenImage} ca={token.ca} />
                ))}

              </div>
            ) : (
              <div className='w-full flex justify-center items-center lg:h-[40vh] h-full lg:py-0 py-6'>
                <div className="w-full flex justify-center items-center h-[30vh] flex-col">
                  <img src="https://www.okx.com/cdn/assets/imgs/2411/E092133D49AEF647.png?x-oss-process=image/resize,w_300,h_300,type_6/ignore-error,1" alt="not data" />
                  <h1 className="">No records found!</h1>
                </div>
              </div>
            )
          ) : (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
              {Array.from({ length: 4 }, (_v, i) => (
                <ListedTokenCardSkeleton />
              ))}
            </div>

          )}


        </div>
      </div>
    </>
  );
};

export default ExclusiveTokens