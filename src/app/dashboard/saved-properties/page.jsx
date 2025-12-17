"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export default function SavedPropertiesPage() {
  const [SavedProperties, setSavedProperties] = useState([])
  const router = useRouter();

  useEffect(() => {
    (async () => {
        try {
            const res = await fetch('/api/getsavedproperties');
            const data = await res.json()
            console.log((data));
            
            if(data.success){
                setSavedProperties(data.data);
            } else {
                console.error("Unable to fetch data");
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    })();
    }, []);


  return SavedProperties.length!==0? (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
        Featured Properties
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {SavedProperties.map((property) => (
          <Card
            key={property.propertyId}
            className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all rounded-2xl"
          >
            
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">
                {property.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <Carousel className="w-full">
                <CarouselContent>
                <CarouselItem>
                    <img
                    src={property.coverPhoto}
                    alt={property.title}
                    className="h-56 w-full object-cover rounded-none"
                    />
                </CarouselItem>
                </CarouselContent>
              </Carousel>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 pt-4 pb-6">
              <h4 className="text-lg font-bold text-green-600">
                AED {property.price.toLocaleString()}
              </h4>

              <h5 className="text-sm text-gray-600">
                📍 {property.city}
              </h5>

              <p className="text-sm font-medium text-gray-800">
                Agency: 🏢 {property.agency}
              </p>

              <button className="mt-3 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition" onClick={() => router.push(`/dashboard/properties/${property.propertyId}`)}>
                View Details
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  ): (
    <div className="py-24 text-center">
        <h1 className="text-3xl font-bold text-muted-foreground">
          No Saved Properties
        </h1>
      </div>
  );
}
