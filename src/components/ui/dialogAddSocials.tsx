import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { PenBox, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

interface props {
  realValue: string,
  setRealValue: Dispatch<SetStateAction<string>>,
  title: string,
  desc: string
}

const DialogAddSocials = ({ desc, realValue, setRealValue, title }: props) => {
  const [currentValue, setCurrentValue] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const handleError = () => {
    if (!currentValue.includes('https://')) {
      setError('Please include the https://')
    } else {
      setError('')
    }
  }

  useEffect(() => {
    if (currentValue.length > 0) {
      handleError()
    }
  }, [currentValue])

  return (
    <>
      {realValue ? (
        <div className='w-full text-sm py-3 gap-1 hover:border-secondary/60 border rounded-md flex flex-col items-center relative'>
          <p className='text-foreground text-sm font-semibold capitalize'>{title}</p>
          <p className='text-muted-foreground text-sm'>{realValue}</p>
          <div className='flex items-center gap-2 absolute top-1 right-1'>
            <Button variant={'destructive'} size={'icon'} className='[&_svg]:size-3 w-fit p-2 h-fit' onClick={() => {
              setCurrentValue("")
              setRealValue("")
              setOpen(false)
            }}>
              <Trash size={16} />
            </Button>
            <Button variant={'outline'} size={'icon'} className='[&_svg]:size-3 w-fit p-2 h-fit' onClick={() => {
              setRealValue('')
              setOpen(true)
            }}>
              <PenBox size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className='w-full text-sm py-6 hover:bg-secondary/80 hover:border-secondary/60 border rounded-md capitalize'>Add {title === 'website' ? title + ' *' : title}</DialogTrigger>
          <DialogContent>
            <DialogHeader className='space-y-5'>
              <DialogTitle>
                <div className='space-y-3'>
                  <p className='font-semibold capitalize'>{title} URL</p>
                  <p className='text-sm text-muted-foreground font-normal'>{desc}</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className='space-y-3 text-foreground'>
                  <label className='font-semibold'>URL</label>
                  <Input defaultValue={'https://'} value={currentValue} type='text' placeholder='https://' onChange={(e) => setCurrentValue(e.target.value)} />
                  <p className='text-sm text-red-500 font-medium'>{error}</p>
                </div>
              </DialogDescription>
              <DialogFooter>
                <Button size={'sm'} variant={'destructive'} onClick={() => setCurrentValue('')}>Clear value</Button>
                <Button size={'sm'} onClick={() => {
                  if (!currentValue.includes('https://')) {
                    toast.error('Plase include https://')
                  } else {
                    setRealValue(currentValue)
                  }
                }}>Confirm</Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DialogAddSocials;