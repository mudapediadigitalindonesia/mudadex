import React from 'react';

import { useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, Check } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

interface Transaction {
  type: "Receive" | "Send"
  address: string
  amount: string
  icon: string
  time: string
}

const ComponentDetailTransaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const transactions: Transaction[] = [
    {
      type: "Receive",
      address: "From B5PX15...98y9",
      amount: "+559,344.9129 BTC",
      icon: "/coin/Bitcoin.png",
      time: "10/05, 08:48",
    },
    {
      type: "Send",
      address: "To 5Au3xn...glat",
      amount: "+287,191.9815 BTC",
      icon: "/coin/Bitcoin.png",
      time: "10/02, 22:34",
    },
    {
      type: "Send",
      address: "To ADaUMi...aS49",
      amount: "-49,000 BTC",
      icon: "/coin/Bitcoin.png",
      time: "09/09, 10:56",
    },
  ]

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Transaction history</h2>
      <Table className='[&_tr]:border-b-0'>
        <TableHeader>
          <TableRow className="border-gray-800">
            <TableHead className="text-gray-400">Transaction</TableHead>
            <TableHead className="text-gray-400">Amount</TableHead>
            <TableHead className="text-right text-gray-400">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index}
              className="border-gray-800 cursor-pointer hover:bg-gray-900"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    {transaction.type === "Receive" ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-sm text-gray-400">{transaction.address}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className={transaction.amount.startsWith("+") ? "text-green-500" : ""}>
                {transaction.amount}
              </TableCell>
              <TableCell className="text-right">{transaction.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>{selectedTransaction?.type}</DialogTitle>
            <div className='border-b-2 pt-2'></div>
          </DialogHeader>
          {selectedTransaction && (
            <div className="mt-4">
              <DialogDescription>
                <div className="overflow-auto h-[400px]">
                  <div className='flex flex-col mx-auto items-center gap-5 justify-center w-20'>
                    <Check className='w-10 h-10 bg-[#95f121] rounded-full text-white p-2' />
                    <span className='text-xl font-semibold text-white'>Completed</span>
                  </div>
                  <div className='bg-gray-800 mt-10 rounded-sm flex items-center gap-3 p-4'>
                    <img src={selectedTransaction.icon} alt="" className='w-10' />
                    <div className={selectedTransaction.amount.startsWith("+") ? "text-green-500" : ""}>
                      {selectedTransaction.amount}
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <div className="text-gray-400">Type:</div>
                      <div className="text-gray-400">Address:</div>
                      <div className="text-gray-400">Amount:</div>
                      <div className="text-gray-400">Time:</div>
                    </div>
                    <div>
                      <div>{selectedTransaction.type}</div>
                      <div>{selectedTransaction.address}</div>
                      <div className={selectedTransaction.amount.startsWith("+") ? "text-green-500" : ""}>
                        {selectedTransaction.amount}
                      </div>
                      <div>{selectedTransaction.time}</div>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </div>
          )}
          <DialogFooter>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, sapiente?</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ComponentDetailTransaction;