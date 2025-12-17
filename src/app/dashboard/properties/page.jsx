"use client";

import Properties from "@/app/components/Properties";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Propertiesdata } from "../../../../static/Properties";

export default function PropertiesPage() {
  const [Response, setResponse] = useState({ data: Propertiesdata });

  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [completed, setCompleted] = useState(false);
  const [price_min, setPriceMin] = useState("");
  const [price_max, setPriceMax] = useState("");
  const [area_min, setAreaMin] = useState("");
  const [area_max, setAreaMax] = useState("");

  async function getData() {
    try {
      const url = `/api/getproperties?purpose=${purpose}&category=${category}&index=${sort}&is_completed=${completed}&price_min=${price_min}&price_max=${price_max}&area_min=${area_min}&area_max=${area_max}`;
      const res = await fetch(url);
      const response = await res.json();
      setResponse(response);
    } catch (error) {
      console.log("error fetching data", error);
    }
  }

  const Filters = () => (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Purpose</Label>
        <Select value={purpose} onValueChange={setPurpose}>
          <SelectTrigger>
            <SelectValue placeholder="Select Purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="for-sale">For Sale</SelectItem>
            <SelectItem value="for-rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="apartments">Apartments</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
            <SelectItem value="commercial-plots">Commercial Plots</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sort</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="lowest_price">Lowest Price</SelectItem>
            <SelectItem value="highest_price">Highest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="completed"
          checked={completed}
          onCheckedChange={(v) => setCompleted(v)}
        />
        <Label htmlFor="completed">Completed Construction</Label>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Price (AED)</Label>
        <Input type="number" placeholder="Min" onChange={(e) => setPriceMin(e.target.value)} />
        <Input type="number" placeholder="Max" onChange={(e) => setPriceMax(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Area (sqft)</Label>
        <Input type="number" placeholder="Min" onChange={(e) => setAreaMin(e.target.value)} />
        <Input type="number" placeholder="Max" onChange={(e) => setAreaMax(e.target.value)} />
      </div>

      <Button onClick={getData} className="w-full">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Filters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block md:col-span-3 p-4 border rounded-xl shadow-sm bg-white h-fit sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <Filters />
      </div>
      <div className="col-span-12 md:col-span-9">
        <Properties res={Response.data} />
      </div>
    </div>
  );
}
