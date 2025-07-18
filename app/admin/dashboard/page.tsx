"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAdminSession, adminLogout } from "@/actions/admin-auth"
import {
  getUsersWithProfilesAndBalances,
  getUserActivityLogs,
  updateUserRole,
  adjustUserBalance,
  generateRemoteLoginLink,
} from "@/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { User, Activity, LogIn, Loader2 } from "lucide-react"

interface UserData {
  id: string
  email: string
  created_at: string
  balance: number
  currency: string
  first_name?: string
  last_name?: string
  company?: string
  role_name?: string
}

interface ActivityLog {
  id: string
  user_id: string
  event_type: string
  description: string
  timestamp: string
  user_email?: string
}

interface Role {
  id: string
  name: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [newRole, setNewRole] = useState<string>("")
  const [balanceAmount, setBalanceAmount] = useState<string>("")
  const [balanceType, setBalanceType] = useState<"add" | "deduct">("add")
  const [isAdjustingBalance, setIsAdjustingBalance] = useState(false)
  const [isUpdatingRole, setIsUpdatingRole] = useState(false)
  const [isGeneratingLoginLink, setIsGeneratingLoginLink] = useState(false)

  useEffect(() => {
    const authenticateAdmin = async () => {
      const isAdmin = await checkAdminSession()
      if (!isAdmin) {
        router.push("/admin/login")
      } else {
        fetchData()
      }
    }
    authenticateAdmin()
  }, [router])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersData, logsData, rolesData] = await Promise.all([
        getUsersWithProfilesAndBalances(),
        getUserActivityLogs(),
        getRoles(),
      ])
      setUsers(usersData)
      setActivityLogs(logsData)
      setRoles(rolesData)
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message || "Failed to load admin data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getRoles = async (): Promise<Role[]> => {
    const { data, error } = await fetch("/api/admin/roles").then((res) => res.json())
    if (error) {
      console.error("Error fetching roles:", error)
      return []
    }
    return data
  }

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return

    setIsUpdatingRole(true)
    try {
      const result = await updateUserRole(selectedUser.id, newRole)
      if (result.success) {
        toast({
          title: "Role Updated",
          description: `Role for ${selectedUser.email} updated to ${newRole}.`,
        })
        fetchData() // Refresh data
        setSelectedUser(null)
      } else {
        toast({
          title: "Error updating role",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message || "Failed to update user role.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingRole(false)
    }
  }

  const handleAdjustBalance = async () => {
    if (!selectedUser || !balanceAmount || isNaN(Number.parseFloat(balanceAmount))) return

    setIsAdjustingBalance(true)
    try {
      const amount = Number.parseFloat(balanceAmount)
      const result = await adjustUserBalance(selectedUser.id, amount, balanceType)
      if (result.success) {
        toast({
          title: "Balance Adjusted",
          description: `${balanceType === "add" ? "Added" : "Deducted"} ${amount} ETH ${balanceType === "add" ? "to" : "from"} ${selectedUser.email}'s balance.`,
        })
        fetchData() // Refresh data
        setSelectedUser(null)
        setBalanceAmount("")
      } else {
        toast({
          title: "Error adjusting balance",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error adjusting balance",
        description: error.message || "Failed to adjust user balance.",
        variant: "destructive",
      })
    } finally {
      setIsAdjustingBalance(false)
    }
  }

  const handleRemoteLogin = async () => {
    if (!selectedUser) return

    setIsGeneratingLoginLink(true)
    try {
      const result = await generateRemoteLoginLink(selectedUser.id)
      if (result.success && result.loginLink) {
        window.open(result.loginLink, "_blank") // Open in new tab
        toast({
          title: "Remote Login Link Generated",
          description: `Opened login link for ${selectedUser.email} in a new tab.`,
        })
      } else {
        toast({
          title: "Error generating login link",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error generating login link",
        description: error.message || "Failed to generate remote login link.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingLoginLink(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading Admin Dashboard...</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Sidebar (can be a separate component) */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <Link href="/admin/dashboard" className="flex items-center text-gray-300 hover:text-white">
                <User className="mr-3 h-5 w-5" /> Users
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/dashboard?tab=activity" className="flex items-center text-gray-300 hover:text-white">
                <Activity className="mr-3 h-5 w-5" /> Activity Logs
              </Link>
            </li>
            {/* Add more admin navigation links here */}
          </ul>
        </nav>
        <Button
          onClick={async () => await adminLogout()}
          variant="outline"
          className="w-full text-white border-gray-600 hover:bg-gray-700"
        >
          Logout
        </Button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header (can be a separate component) */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          {/* Add admin specific header elements */}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="activity">Activity Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <Card className="mt-4 bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all registered users, their roles, and balances.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Balance (ETH)</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.email}</TableCell>
                            <TableCell>
                              {user.first_name} {user.last_name}
                            </TableCell>
                            <TableCell>{user.company || "N/A"}</TableCell>
                            <TableCell>{user.role_name || "user"}</TableCell>
                            <TableCell>{user.balance?.toFixed(8)}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setNewRole(user.role_name || "")
                                      setBalanceAmount("")
                                    }}
                                  >
                                    Manage
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
                                  <DialogHeader>
                                    <DialogTitle>Manage User: {selectedUser?.email}</DialogTitle>
                                    <DialogDescription>Perform actions on this user's account.</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    {/* Adjust Balance */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="balance-amount" className="text-right">
                                        Balance
                                      </Label>
                                      <Input
                                        id="balance-amount"
                                        type="number"
                                        step="any"
                                        value={balanceAmount}
                                        onChange={(e) => setBalanceAmount(e.target.value)}
                                        className="col-span-2"
                                      />
                                      <Select
                                        onValueChange={(value: "add" | "deduct") => setBalanceType(value)}
                                        defaultValue="add"
                                      >
                                        <SelectTrigger className="col-span-1">
                                          <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="add">Add</SelectItem>
                                          <SelectItem value="deduct">Deduct</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={handleAdjustBalance} disabled={isAdjustingBalance}>
                                        {isAdjustingBalance && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Adjust Balance
                                      </Button>
                                    </DialogFooter>

                                    {/* Update Role */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="role-select" className="text-right">
                                        Role
                                      </Label>
                                      <Select onValueChange={setNewRole} value={newRole} className="col-span-3">
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id}>
                                              {role.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={handleUpdateRole} disabled={isUpdatingRole}>
                                        {isUpdatingRole && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Update Role
                                      </Button>
                                    </DialogFooter>

                                    {/* Remote Login */}
                                    <DialogFooter>
                                      <Button
                                        onClick={handleRemoteLogin}
                                        disabled={isGeneratingLoginLink}
                                        variant="secondary"
                                      >
                                        {isGeneratingLoginLink && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        <LogIn className="mr-2 h-4 w-4" /> Login as User
                                      </Button>
                                    </DialogFooter>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card className="mt-4 bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Activity Logs</CardTitle>
                    <CardDescription>Monitor recent user and system activities.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Event Type</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}</TableCell>
                            <TableCell>{log.user_email || "System"}</TableCell>
                            <TableCell>{log.event_type}</TableCell>
                            <TableCell>{log.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
