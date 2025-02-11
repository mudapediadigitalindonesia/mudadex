import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckCircle2, ChevronRight, ShieldAlert, ShieldAlertIcon, ShieldBan, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { Tooltip, TooltipProvider } from '../ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { TokenDetailsDataType, Check } from '@/types/tokenDetailsDataTypes';
interface props {
  data: Check
}

const SheetAudit = ({ data }: props) => {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {data.riskLevel === '1' && (
        <button className="flex items-center gap-1 group" onClick={() => setOpen(true)}>
          <ShieldAlertIcon size={14} className='text-red-500' />
          <p className="text-xs">{data.highRiskNum} Issue</p>
          <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      )}
      {data.riskLevel === '2' && Number(data.middleRiskNum) > 1 && (
        <button className="flex items-center gap-1 group" onClick={() => setOpen(true)}>
          <ShieldAlertIcon size={14} className='text-yellow-500' />
          <p className="text-xs">{data.middleRiskNum} Issue</p>
          <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      )}
      {data.riskLevel === '2' && Number(data.middleRiskNum) < 1 && (
        <button className="flex items-center gap-1 group" onClick={() => setOpen(true)}>
          <ShieldCheck size={14} className='text-green-500' />
          <p className="text-xs">{data.middleRiskNum} Issue</p>
          <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      )}
      {data.riskLevel === '3' && (
        <button className="flex items-center gap-1 group" onClick={() => setOpen(true)}>
          <ShieldCheck size={14} className='text-green-500' />
          <p className="text-xs">0 Issue</p>
          <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      )}
      {data.riskLevel === '0' && (
        <button className="flex items-center gap-1 group" onClick={() => setOpen(true)}>
          <ShieldQuestion size={14} className='text-muted-foreground' />
          <p className="text-xs">? Issue</p>
          <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />
        </button>
      )}
      <SheetContent className='!w-[500px] !max-w-full'>
        <SheetHeader className='space-y-8'>
          <SheetTitle className='pb-2 border-b'>Token Audit</SheetTitle>
          <SheetDescription>
            <div className='space-y-8 max-h-[85vh] overflow-auto pe-3'>
              <p className='text-sm'>This security review is solely for evaluating token safety. Its accuracy isn’t 100% guaranteed. It doesn’t constitute an endorsement or recommendation.</p>
              {data.riskLevel === '1' && (
                <div className='flex items-center gap-3'>
                  <div className='bg-secondary p-2 rounded-md'>
                    <ShieldAlert size={28} className={`text-red-500`} />
                  </div>
                  <p className='text-center font-semibold text-foreground'>{data.highRiskNum} <br /> Cautions</p>
                </div>
              )}
              {data.riskLevel === '2' && Number(data.middleRiskNum) > 1 &&  (
                <div className='flex items-center gap-3'>
                  <div className='bg-secondary p-2 rounded-md'>
                    <ShieldAlert size={28} className={`text-yellow-500`} />
                  </div>
                  <p className='text-center font-semibold text-foreground'>{data.middleRiskNum} <br /> Cautions</p>
                </div>
              )}
              {data.riskLevel === '2' && Number(data.middleRiskNum) < 1 &&  (
                <div className='flex items-center gap-3'>
                  <div className='bg-secondary p-2 rounded-md'>
                    <ShieldCheck size={28} className={`text-green-500`} />
                  </div>
                  <p className='text-center font-semibold text-foreground'>{data.middleRiskNum} <br /> Cautions</p>
                </div>
              )}
              {data.riskLevel === '3' && (
                <div className='flex items-center gap-3'>
                  <div className='bg-secondary p-2 rounded-md'>
                    <ShieldCheck size={28} className={`text-green-500`} />
                  </div>
                  <p className='text-center font-semibold text-foreground'>0 <br /> Cautions</p>
                </div>
              )}
              {data.riskLevel === '0' && (
                <>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-secondary p-2 rounded-md'>
                        <ShieldBan size={28} className={`text-red-500`} />
                      </div>
                      <p className='text-center font-semibold text-muted-foreground'>Audit</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='bg-secondary p-2 rounded-md'>
                        <ShieldAlert size={28} className={`text-yellow-500`} />
                      </div>
                      <p className='text-center font-semibold text-muted-foreground'>Cautions</p>
                    </div>
                  </div>
                  <hr />
                </>
              )}
              <div className='w-full space-y-8'>
                {data.riskLevel === '1' && (
                  <>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Swap analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.swapAnalysis.highRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.riskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-52 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <CheckCircle2 className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Contract analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.contractAnalysis.highRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.newRiskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-40 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <CheckCircle2 className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </>
                )}
                {data.riskLevel === '2' && (
                  <>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Swap analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.swapAnalysis.lowRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.riskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-52 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <ShieldCheck className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}
                        {data.swapAnalysis.middleRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.riskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-52 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <ShieldAlert className='text-yellow-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Contract analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.contractAnalysis.middleRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.newRiskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-40 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <ShieldAlert className='text-yellow-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}
                        {data.contractAnalysis.lowRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.newRiskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-40 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <ShieldCheck className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </>
                )}
                {data.riskLevel === '3' && (
                  <>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Swap analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.swapAnalysis.lowRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.riskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-52 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <CheckCircle2 className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                    <div className='space-y-3'>
                      <p className='font-medium text-xs'>Contract analysis</p>
                      <div className='space-y-5 text-foreground'>
                        {data.contractAnalysis.lowRiskList.map((item, index) => (
                          <div className='flex items-center justify-between' key={index}>
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger><p className='font-medium text-foreground border-b'>{item.newRiskName}</p></TooltipTrigger>
                                <TooltipContent className='max-w-40 rounded-md text-xs p-2 bg-secondary text-foreground'>
                                  {item.newRiskDesc}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center gap-2'>
                              <CheckCircle2 className='text-green-500 w-5 h-5' />
                              <p className='text-sm'>{item.newRiskLabel}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </>
                )}
                {data.riskLevel === '0' && (
                  <div className='w-full flex items-center justify-center h-[40vh]'>
                    <p className='text-muted-foreground text-lg'>No data available</p>
                  </div>
                )}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  );
};

export default SheetAudit;