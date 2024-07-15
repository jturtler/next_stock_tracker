import { JSONObject } from "@/lib/definations";
import StockChart from "./StockChart";
import * as Utils from "@/lib/utils";

// {
//     "language": "en-US",
//     "region": "US",
//     "quoteType": "INDEX",
//     "typeDisp": "Index",
//     "quoteSourceName": "Free Realtime Quote",
//     "triggerable": true,
//     "customPriceAlertConfidence": "HIGH",
//     "regularMarketChangePercent": 0.5317763,
//     "regularMarketPrice": 40213.61,
//     "marketState": "REGULAR",
//     "currency": "USD",
//     "exchange": "DJI",
//     "shortName": "Dow Jones Industrial Average",
//     "longName": "Dow Jones Industrial Average",
//     "messageBoardId": "finmb_INDEXDJI",
//     "exchangeTimezoneName": "America/New_York",
//     "exchangeTimezoneShortName": "EDT",
//     "gmtOffSetMilliseconds": -14400000,
//     "market": "us_market",
//     "esgPopulated": false,
//     "hasPrePostMarketData": false,
//     "firstTradeDateMilliseconds": "1992-01-02T14:30:00.000Z",
//     "priceHint": 2,
//     "regularMarketChange": 212.71094,
//     "regularMarketTime": "2024-07-15T14:16:09.000Z",
//     "regularMarketDayHigh": 40285.6,
//     "regularMarketDayRange": {
//       "low": 40136.1,
//       "high": 40285.6
//     },
//     "regularMarketDayLow": 40136.1,
//     "regularMarketVolume": 62289746,
//     "regularMarketPreviousClose": 40000.9,
//     "bid": 40192.27,
//     "ask": 40215.59,
//     "bidSize": 0,
//     "askSize": 0,
//     "fullExchangeName": "DJI",
//     "regularMarketOpen": 40138.4,
//     "averageDailyVolume3Month": 354752295,
//     "averageDailyVolume10Day": 361174000,
//     "fiftyTwoWeekLowChange": 7886.41,
//     "fiftyTwoWeekLowChangePercent": 0.24395588,
//     "fiftyTwoWeekRange": {
//       "low": 32327.2,
//       "high": 40285.6
//     },
//     "fiftyTwoWeekHighChange": -71.99219,
//     "fiftyTwoWeekHighChangePercent": -0.0017870452,
//     "fiftyTwoWeekLow": 32327.2,
//     "fiftyTwoWeekHigh": 40285.6,
//     "fiftyTwoWeekChangePercent": 15.65851,
//     "fiftyDayAverage": 39106.31,
//     "fiftyDayAverageChange": 1107.3008,
//     "fiftyDayAverageChangePercent": 0.028315144,
//     "twoHundredDayAverage": 37424.156,
//     "twoHundredDayAverageChange": 2789.4531,
//     "twoHundredDayAverageChangePercent": 0.07453617,
//     "sourceInterval": 120,
//     "exchangeDataDelayedBy": 0,
//     "tradeable": false,
//     "cryptoTradeable": false,
//     "symbol": "^DJI"
//   }

export default function StockIndexDetails({curIndexData}: {curIndexData: JSONObject}) {
    return (
        <>
            <h2 className="font-bold text-3xl py-5">{curIndexData.displayName}</h2>
            <div className="text-xs">As of {Utils.formatDistplayDateTime(curIndexData.regularMarketTime)} {curIndexData.exchangeTimezoneShortName}. Market Open.</div>
            <div className="flex flex-row">
                {/* <div className="text-4xl pb-3 font-bold">{chartData.length > 0 && chartData[chartData.length-1].close.toFixed(2)}$</div> */}
                {/* <hr className="text-black border mb-3"/> */}


                <div className="flex-1">
                    <StockChart curIndexData={curIndexData} />
                </div>

                <div className="m-3">
                    <ul className="whitespace-nowrap w-fit list-none p-3 text-s">
                        <li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
                            <span>Previous Close</span>
                            <span className="font-semibold">{curIndexData.regularMarketPreviousClose.toFixed(2)}</span>
                        </li>
                        <li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
                            <span>Open</span>
                            <span className="font-semibold">{curIndexData.regularMarketOpen.toFixed(2)}</span>
                        </li>
                        <li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
                            <span className="pr-3">Date Range</span>
                            <span className="font-semibold">{curIndexData.regularMarketDayLow.toFixed(2)} - {curIndexData.regularMarketDayHigh.toFixed(2)}</span>
                        </li>
                        <li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
                            <span>Volume</span>
                            <span className="font-semibold">{curIndexData.regularMarketVolume}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}