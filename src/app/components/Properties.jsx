"use client";

import React from "react";
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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export default function Properties({res}) {
  const router = useRouter();
  const response = res.results;
  const count = res.count;
  return (count !== 0)? (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
        Featured Properties
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {response.map((property) => (
          <Card
            key={property.id}
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
                  {property.media.photos.map((photo) => (
                    <CarouselItem key={photo}>
                      <img
                        src={photo}
                        alt={property.title}
                        className="h-56 w-full object-cover rounded-none"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-6" />
                <CarouselNext className="mr-6" />
              </Carousel>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 pt-4 pb-6">
              <h4 className="text-lg font-bold text-green-600">
                AED {property.price.toLocaleString()}
              </h4>

              <h5 className="text-sm text-gray-600">
                📍 {property.location.city.name}
              </h5>

              <p className="text-sm font-medium text-gray-800">
                Agency: 🏢 {property.agency.name}
              </p>

              <button className="mt-3 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition" onClick={() => router.push(`/dashboard/properties/${property.id}`)}>
                View Details
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  ): (
    <h1 className="text-3xl font-bold text-gray-800 text-center py-8">No Properties Found!</h1>
  );
}
