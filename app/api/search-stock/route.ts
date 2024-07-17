
import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';


export async function GET(request: NextRequest) {

	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol");

	const options = {
		// lang: "en-US",
		// region: "US",
		quotesCount: 10,
		// // quotesQueryId: "tss_match_phrase_query",
		// // multiQuoteQueryId: "multi_quote_single_token_query",
		// // enableCb: false,
		// // enableNavLinks: false,
		// enableCulturalAssets: true,
		// // enableNews: false,
		// // enableResearchReports: false
		// researchReportsCount: 2,
		// includeTypes: "equity",
		// enableFuzzyQuery: false,
		// // enableEnhancedTrivialQuery: true,
		// enableLogoUrl: true
	}

	try {
		const result = await yahooFinance.search(symbol!, options);

		return NextResponse.json(result, { status: 200 });
	} catch (error: any) {

		if (error instanceof yahooFinance.errors.FailedYahooValidationError) {
			// See the validation docs for examples of how to handle this
			// error.result will be a partially validated / coerced result.
		} else if (error instanceof yahooFinance.errors.HTTPError) {
			// Probably you just want to log and skip these
			return NextResponse.json({ error: (`Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}`) }, { status: 500 });
		} else {
			return NextResponse.json({ error: `Skipping yf.quote("${symbol}"): [${error.name}] ${error.message}` }, { status: 500 });
		}
	}

}