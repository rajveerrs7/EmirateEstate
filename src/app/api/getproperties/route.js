import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Helpers
  const num = (v, fallback) => v !== null ? Number(v) : fallback;
  const bool = (v) => v === "true";

  try {
    const options = {
      method: 'POST',
      url: 'https://uae-real-estate2.p.rapidapi.com/properties_search',
      params: {
        page: '0',
        langs: 'en'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'uae-real-estate2.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        purpose: searchParams.get('purpose') || 'for-sale',
        category: searchParams.get('category') || 'apartments',
        locations_ids: [1, 2, 3, 4, 5, 6],
        index: searchParams.get('sort') || 'popular',
        is_completed: bool(searchParams.get('completed')),
        rooms: [0,1,2,3,4,5,6,7,8,9,10],
        baths: [0,1,2,3,4,5,6,7,8,9,10],

        price_min: num(searchParams.get('price_min'), 1300000),
        price_max: num(searchParams.get('price_max'), 26000000),

        area_min: num(searchParams.get('area_min'), 300),
        area_max: num(searchParams.get('area_max'), 20000),

        sale_type: 'any'
      }
    };

    const response = await axios.request(options);

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.log('RapidAPI Error:', error.response?.data || error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
