import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LayoutDashboard, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

interface props {
  btnSize?: "lg" | "default" | "sm" | "icon" | null | undefined,
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary" | "nusadex" | null | undefined
}

const ModalConnectWallet = ({ btnSize = 'sm', variant='default'}: props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { connection } = useConnection()
  const { connect, connecting, select, wallets, connected, publicKey, disconnect } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({} as Wallet)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [balance, setBalance] = useState(0)


  useEffect(() => {
    if (connected && publicKey) {
      setModalOpen(false)
      setDropdownOpen(false)
    }
  }, [connected, publicKey])

  const handleWalletSelect = async (walletName: WalletName, item: Wallet) => {
    try {
      setSelectedWallet(item)
      select(walletName)
      await connect()
      setDropdownOpen(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const getBalance = async () => {
    if (publicKey) {
      try {
        const balance = await connection.getBalance(new PublicKey(publicKey))
        setBalance((balance / LAMPORTS_PER_SOL))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const postToDatabase = async () => {
    if (publicKey) {
      try {
        await axios.post('/api/wallet/create', {
          addresses: publicKey.toBase58()
        })
      } catch (error) {
        toast.error('Cannot post to database!')
        console.log(error)
      }
    }
  }


  useEffect(() => {
    if (publicKey) {
      getBalance()
      // postToDatabase()
    }
  }, [publicKey])

  return (
    <>
      {connected ? (
        <TooltipProvider delayDuration={50}>
          <Tooltip open={dropdownOpen} onOpenChange={setDropdownOpen} defaultOpen={false}>
            <TooltipTrigger className='w-fit p-2 bg-foreground rounded-md text-xs text-background font-bold flex items-center gap-2'>
              {/* <img src={selectedWallet.adapter.icon} alt="sol-logo" className='w5 h-5 object-cover' /> */}
              {publicKey?.toBase58().slice(0, 5) + '...' + publicKey?.toBase58().slice(-5)}
            </TooltipTrigger>
            <TooltipContent className='w-40 space-y-3'>
              <h1 className='font-semibold border-b text-center pb-1'>{balance.toFixed(5)} SOL</h1>
              <div className='flex items-center flex-col gap-2 px-1'>
                <Link href={'/user/dashboard'} onClick={() => setDropdownOpen(false)} className='px-2 hover:bg-muted-foreground/15 py-2 rounded-md transition-colors w-full font-semibold flex items-center gap-2'>
                  <LayoutDashboard strokeWidth={2} size={20}/>
                  <p className='text-xs font-bold'>Dashboard</p>
                </Link>
                <button onClick={disconnect} className='px-2 hover:bg-red-500 hover:text-foreground py-2 rounded-md transition-colors w-full font-semibold flex items-center gap-2'>
                  <LogOutIcon strokeWidth={2} size={20}/>
                  <p className='text-xs font-bold'>Disconnect</p>
                </button>
                
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Dialog open={modalOpen} onOpenChange={(isOpen) => {
          setModalOpen(isOpen)
        }}>
          <Button size={btnSize} variant={variant && variant} onClick={() => setModalOpen(true)}>Connect Wallet</Button>
          <DialogContent className='overflow-auto'>
            <DialogHeader>
              <DialogTitle>
                <div className="space-y-1 pb-5 border-b">
                  <h1 className="font-semibold text-4xl">Nusadex</h1>
                  <p className="text-sm italic font-normal text-muted-foreground">
                    Securely start your Web3 journey
                  </p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="w-full grid grid-cols-4 gap-3 pt-5">
                  {wallets.map((item, index) => (
                    <Button key={index} onClick={() => handleWalletSelect(item.adapter.name, item)} variant="outline" disabled={connecting} className='h-fit w-full p-3'>
                      <div className="flex items-center justify-center flex-col gap-1">
                        <img src={item.adapter.icon} alt={item.adapter.name} className="w-10 h-10 object-cover p-1 rounded-full border-2" />
                        <p className="text-xs font-normal text-wrap"> {item.adapter.name}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ModalConnectWallet;
