import Dropzone from '@/components/dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox";
import TokenAdCard from '@/components/ui/tokenAdCard';
import ListedTokenCard from '@/components/ui/listedTokenCard';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'react-toastify';
import DialogAddSocials from '@/components/ui/dialogAddSocials';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import EnhancedNotifications from '@/components/ui/enhanced-notifications';
import Head from 'next/head';

const TokenListingPage = () => {
  const [tokenAddress, setTokenAddress] = useState('')
  const [title, setTitle] = useState('')
  const [pitch, setPitch] = useState('')
  const [tokenImage, setTokenImage] = useState('')
  const [website, setWebsite] = useState('')
  const [x, setX] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [tokenValidateStatus, setTokenValidateStatus] = useState(0)
  const [understandCheck, setUnderstandCheck] = useState(false)
  const [confirmCheck, setConfirmCheck] = useState(false)
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [signature, setSignature] = useState('')
  const [loadTxs, setLoadTxs] = useState(false)
  const [loadListing, setLoadListing] = useState(false)
  const [showTransactionSuccess, setShowTransactionSuccess] = useState(false)

  const handleCAValidate = async () => {
    try {
      const resp = await axios(`/api/token/list/validate/${tokenAddress}`)
      if (resp.status === 200) {
        setTokenValidateStatus(200)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setTokenValidateStatus(404)
      } else {
        console.log(error)
      }
      console.log(error)
    }

  }

  useEffect(() => {
    if (tokenAddress.length >= 40) {
      handleCAValidate()
    } else {
      if (tokenAddress === '') {
        setTokenValidateStatus(0)
        return
      } else {
        setTokenValidateStatus(500)
      }
    }
  }, [tokenAddress])

  const sendTxs = async () => {
    if (publicKey) {
      try {
        const transferInstruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('GgD8ZudVgUksoGkSzjTSoYjdr7dRuvUzratxWDJwgamr'),
          lamports: 1 * LAMPORTS_PER_SOL
        })
        const memoInstruction = new TransactionInstruction({
          keys: [],
          programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          data: Buffer.from('Payment for token listing on nusadex.com')
        })
        const transaction = new Transaction().add(transferInstruction, memoInstruction)
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        const sign = await sendTransaction(transaction, connection)
        return sign
      } catch (error) {
        setLoadTxs(false)
        toast.error('user rejected the request!')
        console.log(error)
      }
    } else {
      setLoadTxs(false)
      toast.error('Please connect your wallet!')
    }
  }



  const handleSendToDatabase = async () => {
    setLoadListing(true)
    try {
      await axios.post('/api/token/listing', {
        id: tokenAddress,
        title,
        pitch,
        tokenImage,
        website,
        x,
        telegram,
        discord
      })
      setLoadListing(false)
      setShowTransactionSuccess(true)
    } catch (error) {
      setLoadListing(false)
      toast.error('Error from server!')
      console.log(error)
    }
  }

  const handler = async () => {
    if (!tokenAddress || !title || !pitch || !tokenImage || !website) return toast.error('Please fill the required field!!')
    if (!understandCheck || !confirmCheck) return toast.error('Please check the terms & condiiton')
    // if (tokenAddress.length! >= 44) return toast.error('Token address not found!')
    if (tokenValidateStatus === 404) return toast.error('Sorry your token has been listed!')

    setLoadTxs(true)
    try {
      const signature = await sendTxs()
      if (signature) {
        setSignature(signature)
        setLoadTxs(false)
        await handleSendToDatabase()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Nusadex - Simplify Your Token Listing Process</title>
        <meta name='description' content='List your token effortlessly on Nusadex. Complete the token listing form today and join the leading platform for digital assets.' key={'desc'} />
        <meta property='og:description' content='List your token effortlessly on Nusadex. Complete the token listing form today and join the leading platform for digital assets.' />
        <meta property='og:description' content='List your token effortlessly on Nusadex. Complete the token listing form today and join the leading platform for digital assets.' />
      </Head>
      <div className='max-w-screen-md lg:px-0 px-5 py-10 flex justify-center flex-col gap-8 items-center w-full mx-auto'>
        <h1 className='lg:text-7xl text-5xl text-center font-bold'>Token Listing</h1>
        <Separator className='w-full' />
        <div className='w-full space-y-8'>
          <div className='space-y-2.5'>
            <label className='font-semibold'>Token address *</label>
            <Input onChange={(e) => setTokenAddress(e.target.value)} placeholder='Place your token address here' />
            {tokenValidateStatus === 200 && <p className='text-sm text-green-500 font-medium'>Your token is eligable to list!</p>}
            {tokenValidateStatus === 404 && <p className='text-sm text-red-500 font-medium'>Sorry, your token has been listed!</p>}
            {tokenValidateStatus === 500 && <p className='text-sm text-red-500 font-medium'>Your token address is not valid!</p>}
          </div>

          <div className='space-y-2.5'>
            <label className='font-semibold'>Title *</label>
            <Input placeholder='Your token name' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='space-y-2.5'>
            <div className='space-y-1'>
              <label className='font-semibold'>Pitch *</label>
              <p className='text-muted-foreground text-sm'>A short description of your project to get people interested</p>
            </div>
            <div className='relative'>
              <Textarea maxLength={120} placeholder='Place descriptions at least 80 character, max 120 character' className='h-24 pt-4' onChange={(e) => setPitch(e.target.value)} />
              <p className='absolute top-1 right-2 text-xs text-muted-foreground'>{pitch.length}/120</p>
            </div>
          </div>
          <div className='space-y-5'>
            <div className='space-y-1'>
              <label className='font-semibold'>Token image *</label>
              <ul className='list-disc text-sm ml-4 text-muted-foreground'>
                <li>1:1 aspect ratio (square, for example 500x500px)</li>
                <li>min. image width: 100px</li>
                <li>support formats: png, jpg and webp</li>
                <li>max. file size: 4.5MB</li>
              </ul>
            </div>
            <Dropzone tokenImage={tokenImage} setTokenImage={setTokenImage} />
          </div>
          <div className='space-y-5'>
            <label className='font-semibold'>Links</label>
            <div className='grid w-full  grid-cols-2 gap-5'>
              <DialogAddSocials desc={`Link to the project's website. It should contain project address and links to socials.`} realValue={website} setRealValue={setWebsite} title='website' />
              <DialogAddSocials desc={`Link to the project's X profile (Twitter)`} realValue={x} setRealValue={setX} title='x' />
              <DialogAddSocials desc={`Link to the project's Telegram profile`} realValue={telegram} setRealValue={setTelegram} title='telegram' />
              <DialogAddSocials desc={`Link to the project's Discord server / invitation`} realValue={discord} setRealValue={setDiscord} title='Discord' />
            </div>
          </div>
          <div className='space-y-5'>
            <label className='font-semibold'>Preview</label>
            {title && tokenAddress && pitch && tokenImage && website ? (
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <p className='text-xs font-semibold'>On listed page</p>
                  <ListedTokenCard name={title} image={tokenImage} ca={tokenAddress} symbol={title} btnDisabled={true} />
                </div>
                <div className='space-y-2'>
                  <p className='text-xs font-semibold'>Ad</p>
                  <TokenAdCard discord={discord} pitch={pitch} telegram={telegram} title={title} tokenAddress={tokenAddress} tokenImage={tokenImage} website={website} x={x} btnDisabled={true} />
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className='p-3'>Please complete the field to see preview!</CardContent>
              </Card>
            )}
          </div>

          <div className='space-y-3'>
            <div className='flex items-start gap-4'>
              <Checkbox checked={understandCheck} onCheckedChange={(checked) => { setUnderstandCheck(Boolean(checked)) }} />
              <p className='text-sm font-medium'>I understand that all supplied data must be verifiable through official channels such as website and socials.</p>
            </div>
            <div className='flex items-start gap-4'>
              <Checkbox checked={confirmCheck} onCheckedChange={(checked) => { setConfirmCheck(Boolean(checked)) }} />
              <p className='text-sm font-medium'>I understand and accept that Nusadex reserves the right to reject or modify the provided information</p>
            </div>
          </div>

          <Separator />
          <p className='text-sm'>By completing this purchase, I confirm that I've read and agree to the <Link href={'#'} className='hover:underline'>Refund Policy.</Link></p>
          <Button variant={'default'} disabled={loadTxs || loadListing} size={'lg'} type='submit' className='w-full' onClick={handler}>
            {loadTxs && 'Confirming transaction....'}
            {!loadTxs && !loadListing && 'Pay for 1 SOL now!'}
            {loadListing && 'Please wait, we are listing your token...'}
          </Button>
        </div>
      </div>

      <EnhancedNotifications setShowTransactionSuccess={setShowTransactionSuccess} showTransactionSuccess={showTransactionSuccess} signature={signature} />

    </>
  );
};

export default TokenListingPage;