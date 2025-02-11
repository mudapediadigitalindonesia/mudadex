import React from 'react';
import { SelectGroup, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { WalletCards} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"


const AddWatchOnlyWallet = () => {
    const [open, setOpen] = useState(true)
    const [note, setNote] = useState("")
    return (
        <div>
            <SelectGroup className="m-5">
                <div className="flex items-center gap-1 mt-2">
                    <WalletCards />
                    {/* Dialog */}
                    <Dialog onOpenChange={setOpen}>
                        <DialogTrigger asChild className="hover:bg-transparent">
                            <Button variant="ghost">Add watch-only wallet</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="flex flex-row items-center justify-between">
                                <DialogTitle>Watch-only</DialogTitle>
                            </DialogHeader>
                            <div className="border-b-2"></div>
                            <div className="space-y-4 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Simply enter your wallet address or domain name to monitor your assets and transaction history
                                </p>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="Enter address or ENS domain name"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="note">Note</Label>
                                        <span className="text-gray-400">( optional )</span>
                                    </div>
                                    <Input
                                        id="note"
                                        placeholder="Enter a note to easily identify the address"
                                        maxLength={25}
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        {note.length}/25
                                    </span>
                                </div>
                            </div>
                            <div className="border-b-2"></div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SelectGroup>
        </div>
    );
};

export default AddWatchOnlyWallet;