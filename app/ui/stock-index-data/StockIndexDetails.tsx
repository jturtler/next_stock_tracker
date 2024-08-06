"use client";

import { JSONObject } from "@/lib/definations";
import StockChart from "./StockChart";
import * as Utils from "@/lib/utils";
import CurrentPriceDetails from "./CurrentPriceDetails";
import HistoricalDataList from "./HistoricalDataList";
import { MdHistory } from "react-icons/md";
import { useState } from "react";
import { IoBarChartSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";


export default function StockIndexDetails({curPriceData}: {curPriceData: JSONObject}) {

    const [showHistoryData, setShowHistoryData] = useState(false);
    console.log("========== curPriceData");
    console.log(curPriceData);
    return (
        <div className="flex flex-row p-3">
            <div className="flex-1">
                <h2 className="font-bold text-3xl flex items-center space-x-2">
                    <div className="mb-3 mr-3">{curPriceData.longName}</div>
                   
                    {showHistoryData &&  <button className="ml-3 text-lg p-5 shadow-lg bg-gold text-navy-blue px-4 py-2 rounded hover:bg-yellow-600" onClick={()=> setShowHistoryData(false)}>
                        <IoBarChartSharp />
                    </button>}

                    {!showHistoryData &&  <button className="ml-3 text-lg p-5 shadow-lg bg-gold text-navy-blue px-4 py-2 rounded hover:bg-yellow-600" onClick={()=> setShowHistoryData(true)}>
                        <FaHistory />
                    </button>}
                </h2>
                
                
                <div className="text-xs">As of {Utils.formatDisplayDateTime(curPriceData.regularMarketTime)} {curPriceData.exchangeTimezoneShortName}. Market Open.</div>
                
                <div className="flex flex-row">
                    {!showHistoryData && <div className="flex-1">
                        <StockChart symbol={curPriceData.symbol} />
                    </div>}

                    {showHistoryData && <div className="flex-1">
                        <HistoricalDataList curPriceData={curPriceData} />
                    </div>}

                    <div className="m-3 hidden md:block">
                        <CurrentPriceDetails priceData={curPriceData} />
                    </div>
                </div>

                <div className="m-3 md:hidden">
                    <CurrentPriceDetails priceData={curPriceData} />
                </div>
            </div>
        </div>
    )
}