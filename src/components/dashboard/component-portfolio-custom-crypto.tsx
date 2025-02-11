import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, ChevronDown, Check, } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useState } from 'react';

const frameworks = [
  {
    iconimage: "/coin/Bitcoin.png",
    label: "Bitcoin",
  },
  {
    iconimage: "/coin/Ethereum ETH.png",
    label: "Ethereum",
  },
  {
    iconimage: "/coin/Solana SOL.png",
    label: "Solana",
  },
  {
    iconimage: "/coin/Tether.png",
    label: "Tether",
  },
  {
    iconimage: "/coin/XRP.png",
    label: "XRP",
  },
  {
    iconimage: "/coin/BNB.png",
    label: "BNB",
  },
  {
    iconimage: "/coin/Binance.png",
    label: "Binance",
  },
  {
    iconimage: "/coin/Dash.png",
    label: "Dash",
  },
  {
    iconimage: "/coin/Polkadot.png",
    label: "Polkadot",
  },
  {
    iconimage: "/coin/USD Coin.png",
    label: "USD",
  },
]

const ComponentPortfolioCustomCrypto = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [index, setIndex] = useState(0)

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className='flex items-center justify-between cursor-pointer'>
            <Button variant="ghost" className='hover:bg-transparent p-0'>Manage Crypto</Button>
            <ArrowRight />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Custom crypto</DialogTitle>
            <div className='border-b-2 pt-2'></div>
          </DialogHeader>
          {/* Start Custome Crypto */}
          <div className='font-normal text-sm'>Network</div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {value
                  ? (
                    <div className='flex items-center gap-3'>
                      <img src={frameworks.find((framework) => framework.iconimage === value)?.iconimage} className='w-5' alt="" />
                      {frameworks.find((framework) => framework.iconimage === value)?.label}
                    </div>
                  )
                  : "Select framework..."}

                <ChevronDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px] rounded-md">
                      {frameworks.map((framework, index) => (
                        <CommandItem
                          key={framework.iconimage}
                          value={framework.iconimage}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                          onClick={() => { setIndex(index) }}
                        >
                          <div className='flex items-center gap-3 snap-x'>
                            <img src={framework.iconimage} alt="" className='w-5' />
                            {framework.label}
                          </div>
                          <Check
                            className={cn(
                              "ml-auto",
                              value === framework.iconimage ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className='font-normal text-sm'>Contract address</div>
          <Input placeholder='Enter Contract Address' />
          {/* End Custome Crypto */}
          <DialogFooter>
            <Button type="submit">ADD</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComponentPortfolioCustomCrypto;