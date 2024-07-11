
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
  
    // const dateRange = Utils.get7DaysFromCurrentDate();
    // // https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?from=2023-08-10&to=2023-09-10&apikey=zlTkmDXKROwdOZrIXrZTCOgeFG46zzoL

    const response = await axios.get(`${BASE_URL}/historical-chart/5min/${searchParams.get("symbol")}`, {
      params: {
          apikey: API_KEY,
          // from: dateRange.startDate,
          // to: dateRange.endDate
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


