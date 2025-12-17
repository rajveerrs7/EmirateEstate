"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Users } from "lucide-react"

function Agencies({ response }) {
  const data = response?.results || []
  const router = useRouter()

  if (!data.length) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold text-muted-foreground">
          No Agencies Found
        </h1>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Trusted Real Estate Agencies
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore verified agencies operating across UAE
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((agency) => (
          <Card
            key={agency.id}
            className="group overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl transition-all"
          >
            <CardContent className="p-0">
              <div className="relative h-56 bg-muted flex items-center justify-center">
                <img
                  src={agency.logo}
                  alt={agency.name}
                  className="h-32 object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </CardContent>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {agency.name}
              </CardTitle>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">
                  Since {new Date(agency.created_at).getFullYear()}
                </Badge>
                <Badge variant="outline">
                  {agency.agents_count} Agents
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {agency.base_location || "UAE"}
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-primary" />
                Active Agents: {agency.agents_count}
              </div>

              <Button
                className="w-full rounded-xl mt-2"
                onClick={() =>
                  router.push(`/dashboard/agencies/${agency.id}`)
                }
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Agencies
