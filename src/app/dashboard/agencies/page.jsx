"use client"

import React, { useState } from "react"
import Agencies from "@/app/components/Agencies"
import { AgenciesData } from "../../../../static/Agencies"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

function AgenciesPage() {
  const [name, setName] = useState("")
  const [response, setResponse] = useState(AgenciesData)
  const [loading, setLoading] = useState(false)

  async function getData() {
    if (!name.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/agencybyname?query=${name}`)
      const result = await res.json()

      if (result?.success && result?.data) {
        setResponse(result.data)
      } else {
        setResponse({ results: [], count: 0 })
      }
    } catch (error) {
      console.error("Error fetching agencies:", error)
      setResponse({ results: [], count: 0 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      
      <div className="max-w-3xl mx-auto flex gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search agencies by name (e.g. Emaar)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <Button
          onClick={getData}
          disabled={loading}
          className="h-11 px-6 rounded-xl"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      ) : (
        <Agencies response={response} />
      )}
    </div>
  )
}

export default AgenciesPage
