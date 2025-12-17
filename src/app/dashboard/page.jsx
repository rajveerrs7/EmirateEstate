"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Home, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and explore UAE real estate data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <Card
            onClick={() => router.push("/dashboard/properties")}
            className="group cursor-pointer rounded-2xl border shadow-sm hover:shadow-xl transition-all"
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Home className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Properties
                  </h2>
                </div>

                <p className="text-muted-foreground max-w-sm">
                  Browse, filter, and explore residential & commercial properties across UAE.
                </p>

                <Button className="mt-2 gap-2">
                  View Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => router.push("/dashboard/agencies")}
            className="group cursor-pointer rounded-2xl border shadow-sm hover:shadow-xl transition-all"
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Agencies
                  </h2>
                </div>

                <p className="text-muted-foreground max-w-sm">
                  Discover trusted real estate agencies, agents, and service areas.
                </p>

                <Button variant="outline" className="mt-2 gap-2">
                  View Agencies
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card
            className="group rounded-2xl border shadow-sm hover:shadow-xl transition-all"
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Your Saved Agencies and Properties
                  </h2>
                </div>
                <div className="flex justify-evenly">
                <Button variant="outline" className="mt-2 gap-2" onClick={() => router.push('/dashboard/saved-agencies')} >
                  View Saved Agencies
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="mt-2 gap-2" onClick={() => router.push('/dashboard/saved-properties')} >
                  View Saved Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">

          <MiniStat title="Active Listings" value="18,200+" />
          <MiniStat title="Registered Agencies" value="120+" />
          <MiniStat title="Cities Covered" value="7 Emirates" />

        </div>
      </div>
    </div>
  )
}

function MiniStat({ title, value }) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  )
}
