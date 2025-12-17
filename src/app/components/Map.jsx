"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function Map({ lat, lng, name, location }) {
  if (!lat || !lng) return null

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  return (
    <div className="space-y-4">
      
      <div className="w-full h-[350px] rounded-2xl overflow-hidden border">
        <MapContainer
          center={[lat, lng]}
          zoom={11}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lng]}>
            <Popup>
              <strong>{name}</strong>
              <br />
              {location}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <Button
        variant="outline"
        className="w-full flex items-center gap-2"
        onClick={() => window.open(googleMapsUrl, "_blank")}
      >
        <ExternalLink className="w-4 h-4" />
        Open in Google Maps
      </Button>
    </div>
  )
}
