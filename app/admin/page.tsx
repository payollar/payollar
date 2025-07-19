"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Users, TrendingUp, Music, Radio } from "lucide-react"

interface DashboardStats {
  users: {
    talents: number
    mediaOwners: number
    total: number
  }
  bookings: {
    pending: number
    confirmed: number
    completed: number
    cancelled: number
    total: number
  }
  revenue: {
    total: number
    totalBookings: number
    average: number
  }
  recentActivity: Array<{
    id: number
    title: string
    status: string
    created_at: string
    talent_name: string
    company_name: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to fetch dashboard stats")
      }

      setStats(data)
    } catch (err: any) {
      console.error("Error fetching dashboard stats:", err)
      setError(err.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Dashboard error: {error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Failed to load dashboard data</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PAYOLA Admin Dashboard</h1>
              <p className="text-gray-600">Manage talents, media owners, and bookings</p>
            </div>
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">PAYOLA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.users.talents} talents, {stats.users.mediaOwners} media owners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bookings.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.bookings.pending} pending, {stats.bookings.confirmed} confirmed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Avg: ${stats.revenue.average.toFixed(0)} per booking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.bookings.total > 0 ? Math.round((stats.bookings.completed / stats.bookings.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">{stats.bookings.completed} completed bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.title}</h4>
                          <p className="text-sm text-gray-600">
                            {booking.talent_name} • {booking.company_name}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                  <CardDescription>Current booking distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{
                              width: `${stats.bookings.total > 0 ? (stats.bookings.pending / stats.bookings.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.bookings.pending}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confirmed</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${stats.bookings.total > 0 ? (stats.bookings.confirmed / stats.bookings.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.bookings.confirmed}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completed</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${stats.bookings.total > 0 ? (stats.bookings.completed / stats.bookings.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.bookings.completed}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cancelled</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${stats.bookings.total > 0 ? (stats.bookings.cancelled / stats.bookings.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.bookings.cancelled}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage talents and media owners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    View All Users
                  </Button>
                  <Button variant="outline">
                    <Music className="mr-2 h-4 w-4" />
                    View Talents
                  </Button>
                  <Button variant="outline">
                    <Radio className="mr-2 h-4 w-4" />
                    View Media Owners
                  </Button>
                </div>
                <p className="text-gray-600">
                  User management interface would be implemented here with tables, filters, and actions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Manage all bookings and requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Button>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View All Bookings
                  </Button>
                  <Button variant="outline">Pending Approval</Button>
                  <Button variant="outline">Active Bookings</Button>
                  <Button variant="outline">Completed</Button>
                </div>
                <p className="text-gray-600">
                  Booking management interface would be implemented here with detailed views and status updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Platform performance and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Revenue Trends</h3>
                    <p className="text-gray-600">Monthly revenue analysis and growth metrics</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">User Activity</h3>
                    <p className="text-gray-600">User engagement and platform usage statistics</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Popular Genres</h3>
                    <p className="text-gray-600">Most requested talent types and genres</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Geographic Distribution</h3>
                    <p className="text-gray-600">User and booking distribution by location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
