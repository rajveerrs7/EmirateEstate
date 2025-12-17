"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold tracking-wide">EmirateEstate</h2>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Find luxurious properties across Dubai, curated with international
            standards and world-class experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/dashboard/properties" className="hover:text-white transition">Properties</Link></li>
            <li><Link href="/dashboard/agencies" className="hover:text-white transition">Agencies</Link></li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/20" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
        <p>© 2025 EmirateEstate. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Designed with ❤️ in Dubai.
        </p>
      </div>
    </footer>
  );
}
