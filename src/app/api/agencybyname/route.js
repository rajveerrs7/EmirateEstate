import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const name = String(searchParams.get('query'))

    try {
        const options = {
            method: 'GET',
            url: 'https://uae-real-estate2.p.rapidapi.com/agencies_by_name',
            params: {
                query: name,
                page: '0',
                langs: 'en'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'uae-real-estate2.p.rapidapi.com'
            }
        };
        const res = await axios.request(options);
        return NextResponse.json({success: true, data: res.data}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({success: false}, {status: 500})
    }
}