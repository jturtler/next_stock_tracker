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


export default function StockIndexDetails({curPriceData}: {curPriceData: JSONObject}) {

    const {subPage, setSubPage} = useMainUi();
	const { chartData, dateTimeStamp } = useStockChartData(curPriceData.symbol, "1D");


    if( chartData == null ) return ( <Loading />);

    return (
        <div className="flex flex-row p-5">
            <div className="flex-1">
                <h2 className="font-bold text-3xl py-2 flex space-x-3 items-center">
                    <div>{curPriceData.longName}</div>
                    {subPage == Constant.UI_HISTORICAL_DATA && <PiChartLineDuotone className="text-orange-500 cursor-pointer font-bold shadow-lg" onClick={()=> setSubPage(Constant.UI_CHART)} />}
                    {subPage == Constant.UI_CHART && <MdHistory className="text-orange-500 font-semibold cursor-pointer shadow-lg" onClick={()=> setSubPage(Constant.UI_HISTORICAL_DATA)} />}
                </h2>
                
                
                <div className="text-xs">As of {Utils.formatDistplayDateTime(curPriceData.regularMarketTime)} {curPriceData.exchangeTimezoneShortName}. Market Open.</div>
                
                <div className="flex flex-row">
                    {subPage == Constant.UI_CHART && <div className="flex-1">
                        <StockChart chartData={chartData.quotes} />
                    </div>}

                    {subPage == Constant.UI_HISTORICAL_DATA && <div className="flex-1">
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