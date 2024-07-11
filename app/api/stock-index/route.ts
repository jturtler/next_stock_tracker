
// utils/fetchStockIndexData.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import * as Utils from "@/lib/utils/utils";
import yahooFinance from 'yahoo-finance2';


export async function GET(request: NextRequest) {

	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol");

	try {
		const result = await yahooFinance.quote(symbol!);

		return NextResponse.json(result, { status: 200 });
	} catch (error: any) {

		if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
			// See the validation docs for examples of how to handle this
			// error.result will be a partially validated / coerced result.
		} else if (error instanceof yahooFinance.errors.HTTPError) {
			// Probably you just want to log and skip these
			return NextResponse.json({ error: (`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`) }, { status: 500 });
			// return;
		} else {
			// Same here
			return NextResponse.json({ error: `Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}` }, { status: 500 });
			// return;
		}
	}

}