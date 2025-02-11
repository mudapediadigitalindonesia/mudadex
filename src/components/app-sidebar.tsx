"use client"

import * as React from "react"
import { Bot, ChartArea, LayoutDashboard, LogOut } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/bot/dashboard" },
  { icon: ChartArea, label: "Trading", href: "/bot/trading" },
]

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { pathname } = useRouter()
  const router = useRouter()


  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Bot size={35} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Solana Trading Bot</span>
            <span className="text-xs text-gray-400">Manage your crypto assets</span>
          </div>

        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === item.href ? 'text-foreground bg-secondary': 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} aria-disabled={pathname === item.href}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button onClick={async () => {
          await signOut()
          router.push("/bot/login")
        }} variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}


export default AppSidebar
