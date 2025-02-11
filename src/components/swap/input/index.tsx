import { Wallet } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import ModalSelectToken from '../../modals/selectToken';
import { Input } from '../../ui/input';
import { toast } from 'react-toastify';
import { TokenDetailsDataType } from '@/types/tokenDetailsDataTypes';
import axios from 'axios';

interface props {
  mint: string,
  setMint: Dispatch<SetStateAction<string>>
  title: string,
  balance: number,
  disabled?: boolean,
  mintA: string,
  setTokenSymbol: Dispatch<SetStateAction<string>>,
  setIframeTokenCA: Dispatch<SetStateAction<string>>,
  tokenChange: boolean,
  setAmount: Dispatch<SetStateAction<number>>,
  tokenData: TokenDetailsDataType[],
  setTokenData: Dispatch<SetStateAction<TokenDetailsDataType[]>>,
  amount: number
}


const SwapInput = ({ mint, setMint, title, balance, disabled = false, mintA, setTokenSymbol, setIframeTokenCA, tokenChange, setAmount, setTokenData, tokenData, amount }: props) => {
  // const [tokenData, setTokenData] = useState<TokenDetailsDataType[]>([])
  const [inputValue, setInputValue] = useState(0)
  let [tokenBCalculate, setTokenBCalculate] = useState(0)
  const getTokenInfo = async () => {
    try {
      const data = await axios.get(`/api/token/details/${mint}`)
      if (data) {
        setTokenData(data.data)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to get token info, please check your network!')
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value))
    setAmount(inputValue)
    if (tokenData.length > 0) {
      const calculatedValue = inputValue * Number(tokenData[0].info.price);
      console.log('Calculated Value:', calculatedValue); // Debug log.
      setTokenBCalculate(calculatedValue); // Update state.
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getTokenInfo()
    }, 2000)

    return () => clearInterval(interval)
  }, [mint])

  return (
    <div className={`w-full h-full flex flex-col justify-between gap-3 ${title === 'From' && 'bg-muted/25'} rounded-md p-2`}>
      <div className='pb-3 border-b flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>{title}</h1>
        {title === 'From' && !tokenChange && (
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <Wallet className='w-5 h-5' strokeWidth={1.5} />
              <p className='underline font-normal decoration-muted-foreground'>{balance}</p>
            </div>
            <Button className='h-6 text-xs w-fit bg-transparent' variant={'outline'} onClick={() => {
              setInputValue(balance)
              setAmount(inputValue)
            }}>MAX</Button>
            <Button className='h-6 text-xs w-fit bg-transparent' variant={'outline'} onClick={() => {
              setInputValue(balance / 2)
              setAmount(inputValue)
            }}>50%</Button>
          </div>
        )}
      </div>
      <div className='flex items-center justify-between w-full bg-muted/40 p-2 rounded-md'>
        <ModalSelectToken mintA={mintA} disabled={disabled} setMint={setMint} tokenData={tokenData} mint={mint} setTokenSymbol={setTokenSymbol} setIframeTokenCA={setIframeTokenCA} />
        {title === 'To' && <h1 className='font-semibold lg:text-2xl pe-2'>{tokenBCalculate}</h1>}
        {title === 'From' && <Input className='text-right border-0 focus-visible:ring-0 disabled:opacity-100 font-semibold lg:text-2xl w-fit h-fit appearance-none' value={inputValue} type='number' onChange={handleInput} />}
      </div>
    </div>
  );
};

export default SwapInput;