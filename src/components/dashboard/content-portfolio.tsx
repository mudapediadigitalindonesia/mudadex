import React from 'react';
import { Card, } from "@/components/ui/card"
import { CirclePlus, CopyIcon } from "lucide-react"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ListCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import ComponentPortfolioCustomCrypto from './component-portfolio-custom-crypto';

const ContentPortfolio = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Card className='border-0'>
        <div className='flex justify-between'>
          <div className='font-bold text-2xl lg:pl-[16px]'>Wallet · $11.11</div>
          {/* Button  Manage Crypto */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
              <Button variant="ghost" aria-expanded={open}>
                <ListCheck />
                Manage Crypto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Manage Crypto</DialogTitle>
              <div className='border-b-2'></div>
              <Command>
                <div className='border-2 rounded-lg mb-5'>
                  <CommandInput placeholder="Search" className='border-none' />
                </div>
                <div className='mb-5'>
                  <ComponentPortfolioCustomCrypto />
                </div>
                <div className='border-b-2 mb-5'></div>
                <CommandList>
                  <div className='mb-5 font-normal text-xs text-gray-400'>Added crypto</div>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Bitcoin.png" alt="" className="w-6 " />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            BTC
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Bitcoin</span>
                          </div>
                          <div className="font-normal text-gray-500">Bitcoin</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700" />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Ethereum ETH.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            ETH
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Etherium</span>
                          </div>
                          <div className="font-normal text-gray-500">Etherium</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Solana SOL.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            SOL
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Solana</span>
                          </div>
                          <div className="font-normal text-gray-500">Solana</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Tether.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            USD
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Tether</span>
                          </div>
                          <div className="font-normal text-gray-500">Tether</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/XRP.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            XRP
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">XRP</span>
                          </div>
                          <div className="font-normal text-gray-500">XRP</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/BNB.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            BNB
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">BNB</span>
                          </div>
                          <div className="font-normal text-gray-500">BNB</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Dogecoin.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            DOGE
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Etherium</span>
                          </div>
                          <div className="font-normal text-gray-500">Doge Coin</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup>
                    <CommandItem className="flex justify-between items-center p-2 [&_svg]:size-5">
                      <div className="flex items-center gap-3">
                        <img src="/coin/Shiba Inu SHIB.png" alt="" className="w-6" />
                        <div className="flex flex-col items-start">
                          <div className="text-white font-medium text-base flex items-center gap-3">
                            SHIB
                            <span className="bg-gray-700 text-xs p-[5px] rounded-md">Etherium</span>
                          </div>
                          <div className="font-normal text-gray-500">SHIB</div>
                        </div>
                      </div>
                      <CirclePlus className="text-blue-700 " />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
        </div>
      </Card >
    </div >
  );
};

export default ContentPortfolio;