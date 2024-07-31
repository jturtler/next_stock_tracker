"use client";

import { JSONObject } from "@/lib/definations";
import StockChart from "./StockChart";
import * as Utils from "@/lib/utils";
import CurrentPriceDetails from "./CurrentPriceDetails";
import * as Constant from "@/lib/constant";
import HistoricalDataList from "./HistoricalDataList";
import useStockChartData from "@/lib/hooks/useStockChartData";
import { useMainUi } from "@/contexts/MainUiContext";
import { MdHistory } from "react-icons/md";
import { PiChartLineDuotone } from "react-icons/pi";
import Loading from "../layout/Loading";
import { useState } from "react";


export default function StockIndexDetails({curPriceData}: {curPriceData: JSONObject}) {

	const { chartData, dateTimeStamp } = useStockChartData(curPriceData.symbol, "1D");
    const [showHistoryData, setShowHistoryData] = useState(false);


    if( chartData == null ) return ( <Loading />);

    return (
        <div className="flex flex-row p-5">
            <div className="flex-1">
                <h2 className="font-bold text-3xl py-2 flex space-x-3 items-center">
                    <div>{curPriceData.longName}</div>
                    {showHistoryData && <PiChartLineDuotone className="text-orange-500 cursor-pointer font-bold shadow-lg" onClick={()=> setShowHistoryData(false)} />}
                    {!showHistoryData && <MdHistory className="text-orange-500 font-semibold cursor-pointer shadow-lg" onClick={()=> setShowHistoryData(true)} />}
                </h2>
                
                
                <div className="text-xs">As of {Utils.formatDistplayDateTime(curPriceData.regularMarketTime)} {curPriceData.exchangeTimezoneShortName}. Market Open.</div>
                
                <div className="flex flex-row">
                    {!showHistoryData && <div className="flex-1">
                        <StockChart chartData={chartData.quotes} />
                    </div>}

                    {showHistoryData && <div className="flex-1">
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