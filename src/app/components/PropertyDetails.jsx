"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Bed, Bath, Ruler, Building2, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import Map from "./Map";

export default function PropertyDetails({ data }) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="overflow-hidden">
        <img
          src={data?.media?.cover_photo}
          alt={data?.title}
          className="w-full h-[420px] object-cover"
        />
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{data?.purpose?.replace("-", " ")}</Badge>
            <Badge variant="secondary">{data?.type?.sub}</Badge>
            {data?.verification?.is_verified && (
              <Badge className="bg-green-600">Verified</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold">{data?.title}</h1>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} />
            {data?.location?.community?.name}, {data?.location?.city?.name}
          </div>

          <div className="text-3xl font-semibold text-primary">
            AED {data?.price?.toLocaleString()}
          </div>

          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-1"><Bed size={16} /> {data?.details?.bedrooms} Beds</span>
            <span className="flex items-center gap-1"><Bath size={16} /> {data?.details?.bathrooms} Baths</span>
            <span className="flex items-center gap-1"><Ruler size={16} /> {data?.area?.built_up} sqft</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="payment">Payment Plan</TabsTrigger>
          <TabsTrigger value="agent">Agent</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              <Separator />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Info label="Developer" value={data?.project?.developer?.name} />
                <Info label="Project" value={data?.project?.title} />
                <Info label="Completion" value={data?.project?.completion_status} />
                <Info label="Permit" value={data?.legal?.permit_number} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card>
            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              {data?.amenities?.map((group, i) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">{group?.type}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group?.items?.map((item, j) => (
                      <Badge key={j} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Construction Progress</h3>
              <Progress value={data?.project?.completion_details?.completion_percentage} />

              <Separator />

              {data?.payment_plans?.[0]?.pre_handover?.map((step, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{step?.description}</span>
                  <span className="font-medium">{step?.percent}%</span>
                </div>
              ))}

              <div className="flex justify-between font-semibold">
                <span>Handover</span>
                <span>{data?.payment_plans?.[0]?.handover?.percent}%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agent">
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
              <img
                src={data?.agency?.logo_url}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">{data?.agent?.name}</h3>
                <p className="text-sm text-muted-foreground">{data?.agency?.name}</p>
              </div>
              <ShieldCheck className="text-green-600" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="rounded-2xl">
        <CardHeader>
            <CardTitle>Agency Location</CardTitle>
        </CardHeader>
        <CardContent>
            <Map
            lat={data?.location?.coordinates?.lat}
            lng={data?.location?.coordinates?.lng}
            name={data?.location?.community?.name}
            location={data?.location?.city?.name}
            />
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
