"use client";

import { JSONObject } from "@/lib/definations";
import StockChart from "./StockChart";
import * as Utils from "@/lib/utils";
import CurrentPriceDetails from "./CurrentPriceDetails";
import DetailsMenu from "./DetailsMenu";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import HistoricalDataList from "./HistoricalDataList";
import useStockChartData from "@/lib/hooks/useStockChart";
import useStockData from "@/lib/hooks/useStockData";

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

export default function StockIndexDetails({curPriceData, handleOnClose}: {curPriceData: JSONObject, handleOnClose: () => void}) {
    const [page, setPage] = useState(Constant.UI_CHART);
	// const { chartData, isLoading, isError } = useStockChartData(curPriceData.symbol, periodRange);
    
	useEffect(() => {
		console.log("======= StockIndexDetails");
		console.log(curPriceData);
	}, [curPriceData])


    const handleMenuItemClicked = (name: string) => {
        if( name === "" ) {
            handleOnClose();
        }
        else {
            setPage(name);
        }
    }
//     console.log("====== stockDataList");
// console.log(stockDataList);
//     const data = (isLoading || isError || stockDataList == undefined || stockDataList.status === "error" ) ? null : stockDataList!.data[0];

    // console.log(data);
    // if( data == null ) return ( <div>Loading ...</div>)
    return (
        <div className="flex flex-row">
            <div className="">
                <DetailsMenu handleOnClick={(name: string) => handleMenuItemClicked(name)} />
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-3xl py-5">{curPriceData.longName}</h2>
                
                <div className="text-xs mb-1">Currency: <span className="font-semibold">{curPriceData.currency}</span></div>
                <div className="text-xs">As of {Utils.formatDistplayDateTime(curPriceData.regularMarketTime)} {curPriceData.exchangeTimezoneShortName}. Market Open.</div>
                
                <div className="flex flex-row">
                    {page == Constant.UI_CHART && <div className="flex-1">
                        <StockChart curPriceData={curPriceData} />
                    </div>}

                    {page == Constant.UI_HISTORICAL_DATA && <div className="flex-1">
                        <HistoricalDataList curPriceData={curPriceData} />
                    </div>}

                    <div className="m-3">
                        <CurrentPriceDetails priceData={curPriceData} />
                    </div>
                </div>
            </div>
        </div>
    )
}