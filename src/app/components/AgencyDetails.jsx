"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  Building2,
} from "lucide-react"
import Map from "./Map"

function AgencyDetails({ data }) {
    console.log("Licenses:", data.licenses)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="flex flex-col md:flex-row gap-8 p-8">
          <img
            src={data.logo}
            alt={data.name}
            className="w-32 h-32 object-contain rounded-xl border"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              {data.is_featured && (
                <Badge className="bg-yellow-500 text-black flex gap-1">
                  <Star className="w-4 h-4" /> Featured
                </Badge>
              )}
              {data.product === "premium" && (
                <Badge variant="secondary">Premium</Badge>
              )}
            </div>

            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {data.base_location}
            </p>
            <div className="flex gap-3 pt-2">
              {data.phone_numbers?.mobile && (
                <Button className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call: {data.phone_numbers?.mobile}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<Building2 />}
          title="Total Properties"
          value={data.stats.properties_total_count}
        />
        <StatCard
          icon={<Users />}
          title="Agents"
          value={data.agents_count}
        />
        <StatCard
          icon={<Building2 />}
          title="For Sale"
          value={data.stats.properties_sale_count}
        />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>About the Agency</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          {data.description}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Property Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {data.stats.categories.map((cat, index) => (
            <Badge key={index} variant="outline">
              {cat}
            </Badge>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 max-h-40 overflow-auto">
          {data.stats.service_areas.map((area, index) => (
            <Badge key={index} variant="secondary">
              {area}
            </Badge>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Licenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {data.licenses?.map((lic, index) => (
                <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
                >
                <div>
                    <p className="text-sm text-muted-foreground">
                    Licensing Authority
                    </p>
                    <p className="font-semibold">
                    {lic.authority}
                    </p>
                </div>

                <Badge className="text-sm px-3 py-1">
                    #{lic.number}
                </Badge>
                </div>
            ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
            <CardTitle>Agency Location</CardTitle>
        </CardHeader>
        <CardContent>
            <Map
            lat={data.base_locations[0].coordinates.lat}
            lng={data.base_locations[0].coordinates.lng}
            name={data.name}
            location={data.base_locations[0].full}
            />
        </CardContent>
      </Card>
    </div>
  )
}

export default AgencyDetails

function StatCard({ icon, title, value }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-muted rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
