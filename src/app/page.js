"use client";

import Image from "next/image";
import { motion } from "motion/react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { stats } from "../../static/Home";

export default function Home() {
  
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full"
      >
        <Image
          src="/home.png"
          alt="Home"
          width={1920}
          height={1080}
          className="w-full h-[500px] object-cover rounded-b-2xl shadow-lg"
          priority
        />
      </motion.div>
      
      <div className="max-w-6xl w-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-gray-600">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700">{item.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
