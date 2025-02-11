import React from 'react';
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { RefreshCw } from 'lucide-react';
import ContentPortfolio from './content-portfolio';
import ContentNft from './content-nft';
import ComponentTableProfil from './component-table-profil';



const ComponentTabsDashboard = () => {
  return (
    <div>
      <Tabs defaultValue="Portfolio" className="w-full">
        <div className='flex lg:flex-row flex-col gap-3 lg:items-center justify-between items-start'>
          <TabsList className='bg-transparent w-full lg:flex-row lg:w-auto'>
            <TabsTrigger value="Portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="NFT">NFT</TabsTrigger>
            <TabsTrigger value="Approvals">Approvals</TabsTrigger>
            <TabsTrigger value="History">History</TabsTrigger>
            <TabsTrigger value="Toolkit">Toolkit</TabsTrigger>
          </TabsList>
          <div className='border-2 lg:flex items-center text-gray-400 gap-2 flex text-xs'>Updated <span className='text-white'>17 minutes</span> ago
            <Button variant={'ghost'} className='hover:bg-transparent'><RefreshCw /></Button>
          </div>
        </div>
        <div className='border-b-2 pt-3'></div>
        <TabsContent value="Portfolio">
          <ContentPortfolio />
          <ComponentTableProfil/>
        </TabsContent>
        <TabsContent value="NFT">
          <ContentNft />
        </TabsContent>
        <TabsContent value="Approvals">
          <ContentNft />
        </TabsContent>
        <TabsContent value="History">
          <ContentNft />
        </TabsContent>
        <TabsContent value="Toolkit">
          <ContentNft />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentTabsDashboard;