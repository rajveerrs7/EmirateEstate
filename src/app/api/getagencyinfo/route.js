import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get('id'))
    try {
        const options = {
            method: 'GET',
            url: `https://uae-real-estate2.p.rapidapi.com/agency/${id}`,
            params: {langs: 'en'},
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'uae-real-estate2.p.rapidapi.com'
            }
        };
        const res = await axios.request(options)
        return NextResponse.json({success: true, data: res.data}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({success: false}, {status: 500})
    }
}