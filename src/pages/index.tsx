import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, BitcoinIcon, BookUserIcon, ChartBar, CircleDollarSignIcon, LibraryIcon, ShieldCheckIcon, UserPenIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TokenListDataType } from "@/types/tokenListDataTypes";
import axios from "axios";
import formatNumber from "@/lib/formatNumber";
import { TokenSearchDataTypes } from "@/types/tokenSearchDataTypes";
import NusadexExTokenCard from "@/components/ui/nusadexExTokensCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [tokenList, setTokenList] = useState<TokenSearchDataTypes[]>([])
  const [mudaTokenData, setMudaTokenData] = useState<TokenListDataType[]>([])
  const [pavoTokenData, setPavoTokenData] = useState<TokenListDataType[]>([])
  const [kerisTokenData, setKerisTokenData] = useState<TokenListDataType[]>([])
  const [gasvinTokenData, setGasvinTokenData] = useState<TokenListDataType[]>([])
  const [uistellarTokenData, setUistellarTokenData] = useState<TokenListDataType[]>([])
  const [nagaTokenData, setNagaTokenData] = useState<TokenListDataType[]>([])

  const getTokenList = async () => {
    try {
      const data = await axios.get('/api/token/search/trending');
      setTokenList(data.data.slice(0, 20));
    } catch (error) {
      console.log(error);
    }
  }

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
  const getNagaTokenData = async () => {
    try {
      const resp = await axios('/api/token/search?keyword=9XRLyd91PvJYE4qwFawExYXA9MLFVLLmZgmhgcuBEytZ')
      setNagaTokenData(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTokenList()
    getMudaTokenData()
    getPavoTokenData()
    getKerisTokenData()
    getUistellarTokenData()
    getGasvinTokenData()
    getNagaTokenData()
  }, [])

  return (
    <div className="w-full space-y-32 max-w-screen-xl xl:px-0 mx-auto">
      {/* Section CTA */}
      <div className={`lg:w-3/4 w-full mx-auto flex items-center lg:flex-row flex-col lg:gap-0 gap-16 justify-between lg:h-[85vh] py-8`}>
        <div className="space-y-8 text-left lg:w-1/2 w-full">
          <h1 className="md:text-5xl sm:text-5xl lg:text-5xl xs:text-4xl font-bold leading-tight">
            Start and Grow Your Crypto Journey Right Here!
          </h1>
          <p className="text-muted-foreground font-medium">
            Only at NusaDex, where you can craft the perfect
            portfolio and master the best crypto strategies
          </p>
          <Link href={'/tokens'}>
            <Button className="mt-5 font-bold" size={"lg"}>
              Get Started
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
          <img src="https://res.cloudinary.com/dwehtizb5/image/upload/v1736311674/nusadex/zheaqgxinc97nvgjemta.svg" alt="" className="w-[60%]" />
        </div>
      </div>

      {/* Section TRENDING */}
      <div className="w-full items-center flex flex-col gap-[69px]">
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-bold md:text-5xl sm:text-5xl lg:text-5xl xs:text-4xl text-center leading-snug">Token Trending on SOLANA</h1>
          <p className="text-muted-foreground text-center">
            Trending tokens on Solana are top-performing assets with high trading volume and growth potential. <br /> Explore these popular picks now on NusaDex for fast and cost-efficient transactions!
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {tokenList.filter((item) => item.chainId === '501').map((value) => (
            <div className="w-full border rounded-md p-3 bg-foreground/5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={value.tokenLogoUrl}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full p-1 bg-foreground/10"
                  />
                  <p className="font-medium text-xs">{value.tokenSymbol && value.tokenSymbol.length > 10 ? value.tokenSymbol.slice(0, 10) + '...' : value.tokenSymbol}</p>
                  <Badge className="text-xs max-w-24">{value.tokenSymbol}</Badge>
                </div>
                <Link href={`/tokens/details/${value.tokenContractAddress}`} className="bg-foreground/10 p-2 rounded-md hover:bg-foreground/20 transition-colors">
                  <ArrowUpRightIcon size={24} />
                </Link>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full gap-2">
                  <p className="font-semibold">${formatNumber(Number(value.price))}</p>
                  <p className={`${Number(value.change24H) > 0 ? 'text-green-500' : 'text-red-500'}`}>{Number(value.change24H) > 0 && '+'}{formatNumber(Number(value.change24H))}%</p>
                </div>
                {/* <img src="/chart-state 1.svg" alt="" /> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Feature */}
      <div className="w-full flex flex-col justify-center items-center gap-[69px]">
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-bold md:text-5xl sm:text-5xl lg:text-5xl xs:text-4xl text-center leading-snug">NusaDex Amazing Faetures</h1>
          <p className="text-muted-foreground text-center">
            Explore sensational features to prepare your best investment in
            cryptocurrency
          </p>
        </div>
        <div className="grid lg:grid-cols-4 w-full gap-6 md:grid-cols-3 sm:grid-cols-2">
          <div className="w-full border rounded-md bg-foreground/5 flex flex-col gap-10 p-3">
            <div className="flex flex-col items-start gap-7">
              <div className="flex border rounded-full bg-foreground/20 p-4 justify-center items-center">
                <LibraryIcon
                  className="text-background bg-foreground/80 border rounded-full p-2"
                  size={55}
                />
              </div>
              <h2 className="font-medium">Manage Portfolio</h2>
              <p className="opacity-80">
                Buy and sell popular digital
                <br />
                currencies, keep track of them in the one place.
              </p>
            </div>
            {/* <Link href={""}>
              <div className="flex items-center gap-6 hover:text-foreground/50 transition-colors">
                <p>See Explained</p>
                <ArrowRightIcon />
              </div>
            </Link> */}
          </div>
          <div className="w-full border rounded-md bg-foreground/5 flex flex-col gap-10 p-3">
            <div className="flex flex-col items-start gap-7">
              <div className="flex border rounded-full bg-foreground/20 p-4 justify-center items-center">
                <ShieldCheckIcon
                  className="text-background bg-foreground/80 border rounded-full p-2"
                  size={55}
                />
              </div>
              <h2 className="font-medium">Protected Securely</h2>
              <p className="opacity-80">
                All cash balances are covered by <br />
                FDIC insurance, up to a maximum of $250,000.
              </p>
            </div>
            {/* <Link href={""}>
              <div className="flex items-center gap-6 hover:text-foreground/50 transition-colors">
                <p>See Explained</p>
                <ArrowRightIcon />
              </div>
            </Link> */}
          </div>
          <div className="w-full border rounded-md bg-foreground/5 flex flex-col gap-10 p-3">
            <div className="flex flex-col items-start gap-7">
              <div className="flex border rounded-full bg-foreground/20 p-4 justify-center items-center">
                <BitcoinIcon
                  className="text-background bg-foreground/80 border rounded-full p-2"
                  size={55}
                />
              </div>
              <h2 className="font-medium">Cryptocurrency Variety</h2>
              <p className="opacity-80">
                Supports a variety of the most
                <br />
                popular digital currencies and always uptodate.
              </p>
            </div>
            {/* <Link href={""}>
              <div className="flex items-center gap-6 hover:text-foreground/50 transition-colors">
                <p>See Explained</p>
                <ArrowRightIcon />
              </div>
            </Link> */}
          </div>
          <div className="w-full border rounded-md bg-foreground/5 flex flex-col gap-10 p-3">
            <div className="flex flex-col items-start gap-7">
              <div className="flex border rounded-full bg-foreground/20 p-4 justify-center items-center">
                <BookUserIcon
                  className="text-background bg-foreground/80 border rounded-full p-2"
                  size={55}
                />
              </div>
              <h2 className="font-medium">Learn Best Practice</h2>
              <p className="opacity-80">
                Easy to know how to
                <br />
                cryptocurrency works and friendly to newbie.
              </p>
            </div>
            {/* <Link href={""}>
              <div className="flex items-center gap-6 hover:text-foreground/50 transition-colors">
                <p>See Explained</p>
                <ArrowRightIcon />
              </div>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Section Register New Koin */}
      <div className="w-full flex py-5 items-center">
        <div className="w-full flex flex-col gap-3">
          <h2 className="font-semibold text-xl">Register your coins now!</h2>
          <p className="text-muted-foreground">
            List your coins and enjoy skyrocketing profits, a strong community
            <br />
            and proven security. Don't miss this opportunity!
          </p>
        </div>
        <Link href={'/exchange'}><Button>Register Now</Button></Link>
      </div>

      {/* Market Update */}
      <div className="w-full flex flex-col gap-8">
        <div className="w-full items-start">
          <h1 className="font-semibold text-2xl">NusaDex Exclusive Tokens</h1>
        </div>

        {mudaTokenData.length > 0 && pavoTokenData.length > 0 && uistellarTokenData.length > 0 && gasvinTokenData.length > 0 && kerisTokenData.length > 0 && nagaTokenData.length > 0 ? (
          <div className='w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6'>
            <NusadexExTokenCard tokenData={mudaTokenData} tokenDesc='We, at Mudapedia, understand...' tokenName='MUDAPEDIA' />
            <NusadexExTokenCard tokenData={pavoTokenData} tokenDesc='PavoCoin is an innovative ...' tokenName='Pavo Coin' />
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

      {/* Get Started Tutorial */}
      <div className="w-full flex justify-between lg:flex-row flex-col gap-5">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">How To Get Started</h1>
            <p className="text-muted-foreground">
              Simple and easy way to start your investment
              <br />
              in cryptocurrency
            </p>
          </div>
          <div className="items-start">
            <Link href={'/tokens'}>
              <Button className="font-bold" size={'lg'}>Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">

          <div className="flex items-center gap-5 rounded-lg bg-foreground/5 p-4">
            <div className="bg-secondary p-5 border rounded-full">
              <WalletIcon
                size={45}
                className="bg-foreground/100 text-accent border rounded-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg">Create Your Wallet</h2>
              <p className="text-muted-foreground leading-tight">
                Connect Your wallet eg: phantom, sollet, etc. <br />
                to start trading.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-lg bg-foreground/5 p-4">
            <div className="bg-secondary p-5 border rounded-full">
              <ChartBar
                size={45}
                className="bg-foreground/100 text-accent border rounded-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg">Select token an start trading</h2>
              <p className="text-muted-foreground leading-tight">
                Buy and sell popular Solana tokens and keep track <br />
                of them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
