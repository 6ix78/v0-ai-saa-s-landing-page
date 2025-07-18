"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Database,
  MessageSquare,
  Settings,
  CreditCard,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
  Wallet,
  HardHat,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Wallets", href: "/dashboard/wallets", icon: Wallet },
  { name: "Mining Rigs", href: "/dashboard/rigs", icon: HardHat },
  { name: "Mining Pools", href: "/dashboard/pools", icon: Database },
  { name: "Transactions", href: "/dashboard/transactions", icon: MessageSquare },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">PulseCloud</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Mining Dashboard</span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon className={cn("flex-shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Professional Miner</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
