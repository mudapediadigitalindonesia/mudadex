import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, } from "@/components/ui/avatar"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import PriceChart from "@/components/dashboard/price-chart"
import WalletManagement from "@/components/dashboard/wallet-management"
import AddWatchOnlyWallet from "@/components/dashboard/add-watch-only-wallet"
import SearchContractAddres from "@/components/dashboard/search-contract-addres"
import ComponentTabsDashboard from './component-tabs-dashboard';

const MenuTabsDashboardWallet = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div>
      <Tabs defaultValue="Dashboard" className="w-full mt-10 items-center" onValueChange={handleTabChange}>
        <TabsList className="grid lg:w-72 grid-cols-2 mb-10 lg:mb-20">
          <TabsTrigger value="Dashboard" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">Dashboard</TabsTrigger>
          <TabsTrigger value="Analysis" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">Analysis</TabsTrigger>
        </TabsList>

        {activeTab === "Dashboard" && (
          <TabsContent value="Dashboard">
            <div className="lg:flex lg:justify-between">
              <div>
                <div className="flex">
                  <div className="flex items-center gap-5">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <p className="text-xs lg:text-xl">Wallet 01 - Account 01</p>
                    {/* walletAssetContent */}
                    <Select>
                      <SelectTrigger className="w-[40px] border-0">
                      </SelectTrigger>
                      <SelectContent>
                        {/* Wallet Currently viewing */}
                        <SelectGroup className="m-5">
                          <SelectLabel className="text-gray-400">Currently viewing</SelectLabel>
                          <div className="flex gap-1 mt-2">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                            <div>
                              <Button className="text-base flex flex-col items-start hover:bg-transparent" variant="ghost">Wallet 01 - Account 01
                                <p className="text-xs text-green-500">Connected</p>
                              </Button>
                            </div>
                          </div>
                        </SelectGroup>
                        <div className="border-b-2 mt-5"></div>
                        {/* Wallet Recently connected */}
                        <SelectGroup className="m-5">
                          <SelectLabel className="text-gray-400">Recently connected</SelectLabel>
                          <div className="flex gap-1 mt-2">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                            <div>
                              <Button className="text-base flex flex-col items-start hover:bg-transparent" variant="ghost">Wallet 01 - Account 01
                                <p className="text-xs text-green-500">Connected</p>
                              </Button>
                            </div>
                          </div>
                        </SelectGroup>
                        <div className="border-b-2 mt-5"></div>
                        {/* Wallet management */}
                        <WalletManagement />
                        {/* Add watch-only wallet */}
                        <AddWatchOnlyWallet />
                      </SelectContent>
                    </Select>
                    {/* Menu Addres */}
                    <SearchContractAddres />
                  </div>
                </div>
                {/* Saldo */}
                <div className="flex gap-3 lg:gap-5 items-center mt-10">
                  <div className="text-4xl font-semibold lg:text-7xl lg:font-bold">$10.78</div>
                  <div className="lg:flex lg:flex-col lg:text-xl text-xs">1D<p className="text-red-600">-$0.4905(-4.36%)</p></div>
                </div>
              </div>
              <div className="lg:w-[500px] pt-8 lg:pt-0">
                <PriceChart />
              </div>
            </div>
            <ComponentTabsDashboard/>
          </TabsContent>
        )}

        {activeTab === "Analysis" && (
          <TabsContent value="Analysis">
            <h4 className="font-semibold text-4xl leading-[70px]">PnL analysis is coming soon</h4>
            <p>Gain deeper insights into your assets and spot trends with our advanced tools.</p>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MenuTabsDashboardWallet;