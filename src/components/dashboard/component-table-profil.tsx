import React from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const tabel = [
  {
    icon: "/coin/Bitcoin.png",
    asset: "Bitcoin",
    price: "$97,120.91",
    persen: "-2.3%",
    Balance: "10.000",
    pricecoin: "$971.240.100,00",
    progressAssest: 20,
    presentasi: "20%",
  },
  {
    icon: "/coin/Ethereum ETH.png",
    asset: "Ethereum",
    price: "$3,669.06",
    persen: "-6.3%",
    Balance: "10.000",
    pricecoin: "$36.424.800,00",
    progressAssest: 10,
    presentasi: "10%",
  },
  {
    icon: "/coin/Solana SOL.png",
    asset: "Solana",
    price: "$213.28",
    persen: "-7.7%",
    Balance: "10.000",
    pricecoin: "$2.172.000,00",
    progressAssest: 30,
    presentasi: "30%",
  },
  {
    icon: "/coin/XRP.png",
    asset: "XRP",
    price: "$2.11",
    persen: "-13.6%",
    Balance: "10.000",
    pricecoin: "$22.900,00",
    progressAssest: 80,
    presentasi: "80%",
  },
  {
    icon: "/coin/BNB.png",
    asset: "BNB",
    price: "$686,58",
    persen: "-5.6%",
    Balance: "10.000",
    pricecoin: "$6.787.100,00",
    progressAssest: 33,
    presentasi: "33%",
  },
  {
    icon: "/coin/Shiba Inu SHIB.png",
    asset: "SHIB",
    price: "$0.00002618",
    persen: "-16.6%",
    Balance: "10.000",
    pricecoin: "$0.2701",
    progressAssest: 22,
    presentasi: "22%",
  },
  {
    icon: "/coin/USD Coin.png",
    asset: "USD",
    price: "$100",
    persen: "-0.0%",
    Balance: "10.000",
    pricecoin: "$10.000",
    progressAssest: 21,
    presentasi: "21%",
  },
]
const ComponentTableProfil = () => {
  return (
    <div className='p-3'>
      <Table>
        <TableHeader className='[&_tr]:border-0'>
          <TableRow>
            <TableHead className='rounded-s-md'>Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead className='rounded-e-md'>Proportion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&_tr]:border-0'>
          {tabel.map((asset) => (
            <TableRow key={asset.asset}>
              <TableCell className="font-medium flex items-center gap-5 ">
                <img src={asset.icon} alt="" className='w-8' />
                <div className='text-lg'>{asset.asset}</div>
              </TableCell>
              <TableCell>
                <div>{asset.price}</div>
                <div className='text-xs font-bold text-red-700'>{asset.persen}</div>
              </TableCell>
              <TableCell>
                <div className='text-base'>{asset.Balance}</div>
                <div className='text-xs text-gray-500'>{asset.pricecoin}</div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Progress value={asset.progressAssest} />
                  <div>{asset.presentasi}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComponentTableProfil;