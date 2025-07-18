"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, LogOut, Settings, CreditCard, HelpCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions, miners, rigs..."
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-white">12.5 ETH</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Earned</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-white">2.3K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Active Miners</div>
            </div>
          </div>

          <ThemeToggle />

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Payout received</p>
                  <p className="text-xs text-gray-500">0.5 ETH credited to your wallet</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New miner joined</p>
                  <p className="text-xs text-gray-500">A new miner joined your pool</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Hash rate alert</p>
                  <p className="text-xs text-gray-500">Your hash rate dropped by 10%</p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">JD</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">john@example.com</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
