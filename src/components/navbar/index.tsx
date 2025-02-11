import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { ArrowLeftRight, ChevronDown, MenuIcon, NewspaperIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import ModalConnectWallet from "../modals/connectWallet";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UserDataType } from "@/types/userDataTypes";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  const { pathname } = useRouter()
  const { data: session, status }: any = useSession()
  const [userData, setuserData] = useState<UserDataType>({} as UserDataType)

  const getUserData = async () => {
    if (status === 'authenticated') {
      try {
        const resp = await axios(`/api/users/get/${session?.user.id}`)
        setuserData(resp.data)
      } catch (error) {
        toast.error('Error while fetching user data!')
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      getUserData()
    }
  }, [status])

  return (
    <div className="w-full lg:px-8 px-3">
      <div className="flex items-center justify-between">
        <Link href={'/'}>
          <img src="/logo-nusadex-text.svg" alt="" className="w-[150px]" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="lg:flex hidden  items-center gap-3">
            <Link href={"/tokens"} className="font-medium hover:opacity-80 transition-opacity text-sm pb-0" >
              Tokens
            </Link>
            <Link href={"/exchange"} className="font-medium hover:opacity-80 transition-opacity text-sm pb-0" >
              Exchange
            </Link>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 hover:opacity-80">
                    <p className="font-medium text-sm">Trade</p>
                    <ChevronDown size={20} strokeWidth={2} className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="mt-3">
                  <div className="space-y-5">
                    <Link href={'/swap'} className="flex items-center gap-3 hover:bg-muted-foreground/30 transition-colors p-2 rounded-md">
                      <ArrowLeftRight strokeWidth={2} size={20} />
                      <div className="">
                        <p className="font-medium">Swap</p>
                        <p className="text-muted-foreground">Swap your token with low fee</p>
                      </div>
                    </Link>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 hover:opacity-80">
                    <p className="font-medium text-sm">News</p>
                    <ChevronDown size={20} strokeWidth={2} className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="mt-3">
                  <div className="space-y-5">
                    <Link href={'/news'} className="flex items-center gap-3 hover:bg-muted-foreground/30 transition-colors p-2 rounded-md">
                      <NewspaperIcon strokeWidth={2} size={20} />
                      <div className="">
                        <p className="font-medium">Trending</p>
                        <p className="text-muted-foreground">News trending of token</p>
                      </div>
                    </Link>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>

          <div className="flex gap-3 items-center">
            <ModalConnectWallet />
            {/* {pathname !== '/exchange' ? (
              <ModalConnectWallet balance={balance} />
            ) : (
              status === 'authenticated' && userData ? (
                <TooltipProvider>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger>
                      <div className="p-2 bg-foreground rounded-md flex items-center gap-1">
                        <img src={userData.image} alt={userData.fullname} className="w-5 h-5 rounded-full" />
                        <p className="text-background text-xs font-semibold">{userData.fullname}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="mt-3 p-3">
                      <div className="space-y-1">
                        <p className="pb-1 border-b font-semibold text-center">{userData.email}</p>
                        <Link href={'#'} className="w-full hover:bg-muted-foreground/30 p-2 flex items-center gap-1 rounded-md transition-colors">
                          <LayoutDashboardIcon size={16} strokeWidth={2} />
                          <p className="font-medium">Dashboard</p>
                        </Link>
                        <Link href={'#'} className="w-full hover:bg-muted-foreground/30 p-2 flex items-center gap-1 rounded-md transition-colors">
                          <Wallet2Icon size={16} strokeWidth={2} />
                          <p className="font-medium">Wallet Management</p>
                        </Link>
                        <button onClick={async () => await signOut()} className="w-full text-red-500 hover:bg-muted-foreground/30 p-2 flex items-center gap-1 rounded-md transition-colors">
                          <LogOut size={16} strokeWidth={2} />
                          Logout
                        </button>

                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <ModalLoginReg />
              )
            )} */}

            <div className="lg:hidden block">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger>
                  <MenuIcon size={28} />
                </SheetTrigger>
                <SheetContent side={"right"}>
                  <SheetHeader>
                    <SheetTitle>
                      <div className="w-full flex flex-col items-start">
                        <h1 className="font-semibold">Menu</h1>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <h1 className="font-semibold opacity-50 hover:opacity-100 transition-opacity">
                                Tokens
                              </h1>
                            </AccordionTrigger>
                            <AccordionContent>
                              <Link href={"/tokens"} onClick={() => setSheetOpen(false)}>
                                <h4 className="">View All Tokens</h4>
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>
                              <h1 className="font-semibold opacity-50 hover:opacity-100 transition-opacity">
                                Trade
                              </h1>
                            </AccordionTrigger>
                            <AccordionContent>
                              <Link href={"/swap"} onClick={() => setSheetOpen(false)}>
                                <h4 className="">Swap</h4>
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger>
                              <h1 className="font-semibold opacity-50 hover:opacity-100 transition-opacity">
                                News
                              </h1>
                            </AccordionTrigger>
                            <AccordionContent>
                              <Link href={"/news"} onClick={() => setSheetOpen(false)}>
                                <h4 className="">All Trending News</h4>
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-4">
                            <AccordionTrigger>
                              <h1 className="font-semibold opacity-50 hover:opacity-100 transition-opacity">
                                Exchange
                              </h1>
                            </AccordionTrigger>
                            <AccordionContent>
                              <Link href={"/exchange"} onClick={() => setSheetOpen(false)}>
                                <h4 className="">Fast & Smart Exchange</h4>
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
