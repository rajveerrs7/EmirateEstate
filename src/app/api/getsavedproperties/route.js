import { GetSavedProperties } from "@/services/Saves";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await GetSavedProperties();
        console.log(res);
        
        if(res.success){
            return NextResponse.json({success: true, data: res.data})
        }
        else {
            return NextResponse.json({success: false, message: "unable to fetch data"})
        }
    } catch (error) {
        console.log("error fetching data", error);
        return NextResponse.json({success: false, message: "unable to fetch data1"}) 
    }
}