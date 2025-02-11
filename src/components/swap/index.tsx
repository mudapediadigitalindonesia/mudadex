import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SwapInput from './input';
import { Button } from '../ui/button';
import { AlertCircle, ArrowUpDown, LoaderCircle, WavesIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useWallet } from '@solana/wallet-adapter-react';
import ModalConnectWallet from '../modals/connectWallet';
import { WalletDataType } from '@/types/walletDataTypes';
import axios from 'axios';
import { TokenDetailsDataType } from '@/types/tokenDetailsDataTypes';

interface props {
  hasPriceDetails?: boolean,
  setIframeTokenCA: Dispatch<SetStateAction<string>>,
}

const SwapComponents = ({ hasPriceDetails = true, setIframeTokenCA }: props) => {

  const { connected, publicKey } = useWallet()
  const [tokenSymbol, setTokenSymbol] = useState('PVO')
  const [tokenChange, setTokenChange] = useState(false)
  const [mintA, setMintA] = useState("11111111111111111111111111111111")
  const [mintB, setMintB] = useState("GzY1KbkgbxaLCY52aQZ2JDk1ygE5V4wF7c9UdDVuvPma")
  const [walletData, setWalletData] = useState<WalletDataType[]>([])
  const [balanceA, setBalanceA] = useState(0)
  const [balanceB, setBalanceB] = useState(0)
  const [amountA, setAmountA] = useState(0)  
  const [amountB, setAmountB] = useState(0)
  const [tokenDataA, setTokenDataA] = useState<TokenDetailsDataType[]>([])
  const [tokenDataB, setTokenDataB] = useState<TokenDetailsDataType[]>([])

  const getAssets = async () => {
    try {
      const resp = await axios.get(`/api/wallet/dashboard/${publicKey?.toBase58()}`);
      setWalletData(resp.data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const filteredBalance = () => {
    if (connected && publicKey) {
      if (walletData.length > 0) {
        const tokenAssets = walletData[0]?.tokenAssets || []
        const balanceAData = tokenAssets.find((item) =>
          item.tokenAddress === mintA || (item.tokenAddress === "" && mintA === "11111111111111111111111111111111")
        )

        if (balanceAData) {
          setBalanceA(Number(balanceAData.balance))
        } else {
          setBalanceA(0)
        }

        const balanceBData = tokenAssets.find((item) =>
          item.tokenAddress === mintB || (item.tokenAddress === "" && mintB === "11111111111111111111111111111111")
        )

        if (balanceBData) {
          setBalanceB(Number(balanceBData.balance));
        } else {
          setBalanceB(0)
        }
      }
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      getAssets()
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (walletData.length > 0) {
      filteredBalance()
      console.log(walletData)
    }
  }, [walletData, mintA, mintB])

  useEffect(() => {
    if (tokenChange) {
      setMintA((prev) => {
        const temp = mintB;
        setMintB(prev);
        return temp;
      })
      setTokenChange(false);
    }
  }, [tokenChange])

  useEffect(() =>{
    console.log({amountA, amountB})
  }, [amountA, amountB])



  return (
    <div className='w-full flex flex-col gap-5 items-center'>

      <SwapInput mintA={mintA} disabled={tokenChange ? false : true} mint={tokenChange ? mintB : mintA} setMint={tokenChange ? setMintB : setMintA} title='From' balance={balanceA} setTokenSymbol={setTokenSymbol} setIframeTokenCA={setIframeTokenCA} tokenChange={tokenChange} setAmount={setAmountA} setTokenData={setTokenDataA} tokenData={tokenDataA} amount={amountA}/>

      <Button size={'icon'} onClick={() => setTokenChange(!tokenChange)}><ArrowUpDown /></Button>

      <SwapInput mintA={mintA} disabled={tokenChange ? true : false} mint={tokenChange ? mintA : mintB} setMint={tokenChange ? setMintA : setMintB} title='To' balance={balanceB} setTokenSymbol={setTokenSymbol} setIframeTokenCA={setIframeTokenCA} tokenChange={tokenChange} setAmount={setAmountB} setTokenData={setTokenDataB} tokenData={tokenDataB} amount={amountB}/>

      <div className={`w-full ${hasPriceDetails ? 'bg-muted/30 p-3' : ''}  rounded-md flex flex-col gap-5`}>
        {hasPriceDetails && (
          <>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 font-semibold'>
                  <h1>1 {tokenSymbol}</h1>
                  <WavesIcon className='w-4 h-4' />
                  <h1> SOL</h1>
                </div>
              </div>
              <Button size={'icon'} variant={'outline'} title='refresh' className='bg-transparent p-0 border-0 hover:bg-transparent hover:opacity-50 transition-opacity w-fit h-fit'><LoaderCircle /></Button>
            </div>
            <div className='flex w-full justify-between'>
              <div className='text-sm flex items-center gap-1'>
                <p className='font-light'>Minimum recieved</p>
                <TooltipProvider delayDuration={50} >
                  <Tooltip >
                    <TooltipTrigger><AlertCircle className='w-4 h-4' /></TooltipTrigger>
                    <TooltipContent className='bg-secondary text-foreground'>
                      <div className='text-sm'>
                        This is determined by your slippage tolerance.
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className='text-sm font-semibold'>0.00002 SOL</p>
            </div>
          </>
        )}
        {connected ? (
          <Button className='mt-3 font-semibold' size={'lg'}>SWAP</Button>
        ) : (
          <ModalConnectWallet btnSize={'lg'} />
        )}
      </div>

    </div>
  );
};

export default SwapComponents;