import * as React from "react"
import { useState } from "react"
import { CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"


const SearchContractAddres = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[20px] justify-between hover:bg-transparent"
                    >
                        <CopyIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] lg:w-[400px]">
                    <Command>
                        <CommandInput placeholder="Search" />
                        <CommandList>
                            <CommandGroup >
                                <CommandItem>
                                    <img src="/coin/Bitcoin.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">Bitcoin</div>
                                        <p className="text-zinc-400 text-sm break-all">bc1pf0d7hnz5dq0smlwv2gm9rqj9k96kctmg4f44r8nnc3uew4340ehsnev5e0</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/Ethereum ETH.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">Ethereum</div>
                                        <p className="text-zinc-400 text-sm break-all">0x6cf0fe125b4535baf10bb587c28613ff2798c44a</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/Solana SOL.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">Solana</div>
                                        <p className="text-zinc-400 text-sm break-all">5Au3xnvoqw5xjUc2HiFd2jPsPSuM5CW4HZ8fiX55gJat</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/Tether.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">Tether</div>
                                        <p className="text-zinc-400 text-sm break-all">0xdac17f958d2ee523a2206206994597c13d831ec7</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/XRP.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">XRP</div>
                                        <p className="text-zinc-400 text-sm break-all">0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/BNB.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">BNB</div>
                                        <p className="text-zinc-400 text-sm break-all">0xb8c77482e45f1f44de1745f52c74426c631bdd52</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/Dogecoin.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">Doge</div>
                                        <p className="text-zinc-400 text-sm break-all">0xba2ae424d960c26247dd6c32edc70b295c744c43</p>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup>
                                <CommandItem>
                                    <img src="/coin/Shiba Inu SHIB.png" alt="" className="w-8" />
                                    <div>
                                        <div className="text-white font-medium">SHIB</div>
                                        <div className="text-zinc-400 text-sm break-all">0e95ad61b0a150d79219dcf64e1e6cc01f0b64c4c</div>
                                    </div>
                                    <CopyIcon />
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchContractAddres;