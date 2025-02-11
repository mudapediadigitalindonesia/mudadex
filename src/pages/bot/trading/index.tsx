import React from 'react';
import AppSidebar from "@/components/app-sidebar"
import { Bell, ChevronDown, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
const TradingPage = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen text-white w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex items-center justify-between border-b border-[#2D2D3A] p-4">
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[300px]  "

              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" className="gap-2">
                Olivia Rhye
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Trading BOT</h1>
            
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TradingPage;