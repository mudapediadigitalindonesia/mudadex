import React from 'react';
import { SelectGroup, } from "@/components/ui/select"
import { Dialog, DialogContent,  DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { CopyIcon, Wallet, Trash } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import SearchContractAddres from './search-contract-addres';

const WalletManagement = () => {
    return (
        <div>
            {/* Wallet management */}
            <SelectGroup className="m-5">
                <div className="flex gap-1 mt-2 items-center">
                    <Wallet />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="hover:bg-transparent">Wallet management</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <Tabs defaultValue="Wallet management" className="w-full lg:w-[500px] pt-10">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="Wallet management" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">Wallet management</TabsTrigger>
                                    <TabsTrigger value="Profile settings" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">Profile settings</TabsTrigger>
                                </TabsList>
                                <p className="text-gray-400 pt-10">Recently connected</p>
                                {/* Wallet management */}
                                <TabsContent value="Wallet management">
                                    <Card className="flex lg:flex justify-between p-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-6 h-6 lg:w-10 lg:h-10">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <p className="text-xs lg:text-base lg:flex lg:flex-col items-start hover:bg-transparent text-ellipsis">Wallet 01 - Account 01</p>
                                            </div>
                                            <div className="text-xs text-green-500 bg-green-500 bg-opacity-15 p-2 rounded-lg">
                                                Connected
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {/* <Button variant={"ghost"} className='hover:bg-transparent'> */}
                                                <SearchContractAddres/>
                                            {/* </Button> */}
                                            <Button variant={"ghost"}>
                                                <Trash />
                                            </Button>
                                        </div>
                                    </Card>
                                </TabsContent>
                                {/* Profile settings */}
                                <TabsContent value="Profile settings" className="flex flex-col gap-5">
                                    {/* Count NFTs in total balance */}
                                    <Card className="p-5">
                                        <div className="flex items-center justify-between gap-1">
                                            <div>Count NFTs in total balance</div>
                                            <Switch />
                                        </div>
                                    </Card>
                                    {/* Hide small assets */}
                                    <Card className="p-5">
                                        <div className="flex items-center justify-between gap-1">
                                            <div>
                                                <div>Hide small assets</div>
                                                <div className="text-gray-600">Hide all assets under 1 USD</div>
                                            </div>
                                            <Switch />
                                        </div>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>
            </SelectGroup>
        </div >
    );
};

export default WalletManagement;