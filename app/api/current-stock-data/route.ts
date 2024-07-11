
// utils/fetchStockIndexData.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import * as Utils from "@/lib/utils/utils";


const API_KEY = process.env.FINANCIAL_MODELING_PREP;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

// export const fetchStockIndexData = async (symbol: string) => {
   
// };


export async function GET( request: NextRequest) {

const { searchParams } = new URL(request.url);

  try {
    // https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=zlTkmDXKROwdOZrIXrZTCOgeFG46zzoL
    // For each symbol :  const response = await axios.get(`${BASE_URL}/quote/${searchParams.get("exchange")}`, {
//       params: {
//         apikey: API_KEY,
//     },
// });

console.log(`${BASE_URL}/symbol/${searchParams.get("exchange")}`);
    const response = await axios.get(`${BASE_URL}/symbol/${searchParams.get("exchange")}`, {
      params: {
          apikey: API_KEY,
      },
  });
  
    return NextResponse.json(response.data, {status: 200});

  } catch (error: unknown) {

    // return NextResponse.json({ error: 'Error fetching data ' + error.message }, {status: 500});
    if (error instanceof Error) {
        return NextResponse.json({ error: 'Error fetching data: ' + error.message }, { status: 500 });
    } else {
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
    
  }
  
}


// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


// export async function GET( request: NextRequest) {
// // export async function GET(req: NextRequest, {params}: any) {

// const { searchParams } = new URL(request.url);

//   try {
//     const response = await axios.get(`https://www.alphavantage.co/query`, {
//       params: {
//         function: 'TIME_SERIES_INTRADAY',
//         symbol: searchParams.get("symbol"),
//         outputsize: 'full',
//         interval: searchParams.get("interval") || '5min',
//         apikey: API_KEY,
//       },
//     });

//     return NextResponse.json(response.data, {status: 200});

//   } catch (error: unknown) {

//     // return NextResponse.json({ error: 'Error fetching data ' + error.message }, {status: 500});
//     if (error instanceof Error) {
//         return NextResponse.json({ error: 'Error fetching data: ' + error.message }, { status: 500 });
//     } else {
//         return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
//     }
    
//   }
  
// }


