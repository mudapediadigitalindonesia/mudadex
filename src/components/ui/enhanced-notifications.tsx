'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ListChecks, TrendingUp, DollarSign, Clock, ArrowRight, Copy } from 'lucide-react'
import Link from 'next/link'
import handleCopy from '@/lib/handleCopy'


interface props {
  showTransactionSuccess: boolean,
  setShowTransactionSuccess: Dispatch<SetStateAction<boolean>>,
  signature: string
}

const EnhancedNotifications = ({ setShowTransactionSuccess, showTransactionSuccess, signature }: props) => {

  return (
    <>
      <AnimatePresence>
        {showTransactionSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 flex items-center justify-center bg-background/30 p-4">
            <AlertDialog open={showTransactionSuccess} onOpenChange={setShowTransactionSuccess}>
              <AlertDialogContent className="max-w-lg w-full bg-background  rounded-3xl shadow-2xl border focus:ring-0">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="p-6">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3 text-3xl font-bold text-green-500 mb-4">
                      <CheckCircle className="w-10 h-10" />
                      Transaction Successful
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground  space-y-4">
                      <div>Your transaction has been processed successfully. and your token has been listed! here the details :</div>
                      <div className="bg-muted-foreground/10 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Amount:</span>
                          <span className="text-foreground font-medium">1 SOL</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Signature:</span>
                          <span className="text-foreground font-medium flex items-center gap-2">
                            {signature.slice(0, 5) + '...' + signature.slice(-5)}
                            <button onClick={() => handleCopy(signature, 1000)} className='hover:opacity-50'><Copy size={16} /></button>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Status:</span>
                          <span className="text-foreground font-medium">Confirmed</span>
                        </div>
                      </div>

                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                    <AlertDialogAction onClick={() => window.open(`https:solscan.io/tx/${signature}`)} className="font-semibold py-2 px-6 rounded-full flex-1">
                      View on Solscan
                    </AlertDialogAction>
                    <Button onClick={() => location.href = '/tokens'} variant="outline" className="py-2 px-6 rounded-full flex-1">
                      Close
                    </Button>
                  </AlertDialogFooter>
                </motion.div>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EnhancedNotifications