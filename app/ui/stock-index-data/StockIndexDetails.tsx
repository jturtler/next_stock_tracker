"use client";

import { JSONObject } from "@/lib/definations";
import StockChart from "./StockChart";
import * as Utils from "@/lib/utils";
import CurrentPriceDetails from "./CurrentPriceDetails";
import DetailsMenu from "./DetailsMenu";
import * as Constant from "@/lib/constant";
import HistoricalDataList from "./HistoricalDataList";
import useStockChartData from "@/lib/hooks/useStockChartData";
import { useMainUi } from "@/contexts/MainUiContext";


export default function StockIndexDetails({curPriceData, handleOnClose}: {curPriceData: JSONObject, handleOnClose: () => void}) {

    
    console.log("==== StockIndexDetails");
console.log(curPriceData);

    // if( curPriceData === null ) return ( <div>Loading ...</div> );
    
    const {subPage, setSubPage} = useMainUi();
	const { chartData, dateTimeStamp } = useStockChartData(curPriceData.symbol, "1D");


    const handleMenuItemClicked = (name: string) => {
        if( name === "" ) {
            handleOnClose();
        }
        else {
            setSubPage(name);
        }
    }

    // if( curPriceData === null ) return ( <div>Loading ...</div> );
    
    if( chartData == null ) return ( <div>Loading ...</div>);

        
    return (
        <div className="flex flex-row">
            <div className="">
                <DetailsMenu handleOnClick={(name: string) => handleMenuItemClicked(name)} />
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-3xl py-5">{curPriceData.longName}</h2>
                
                <div className="text-xs mb-1">Currency: <span className="font-semibold">{curPriceData.currency}</span></div>
                <div className="text-xs mb-1 flex space-x-1">
                    <div>Close: <span className="font-semibold">{Utils.formatDisplayNumber(curPriceData.regularMarketPrice)}</span></div>
                    <span className="font-semibold">({curPriceData.regularMarketChange > 0 && "+"}{curPriceData.regularMarketChange * 100}%)</span>
                </div>
                <div className="text-xs">As of {Utils.formatDistplayDateTime(curPriceData.regularMarketTime)} {curPriceData.exchangeTimezoneShortName}. Market Open.</div>
                
                <div className="flex flex-row">
                    {subPage == Constant.UI_CHART && <div className="flex-1">
                        <StockChart chartData={chartData.quotes} />
                    </div>}

                    {subPage == Constant.UI_HISTORICAL_DATA && <div className="flex-1">
                        <HistoricalDataList curPriceData={curPriceData} />
                    </div>}

                    <div className="m-3">
                        <CurrentPriceDetails priceData={chartData.meta} />
                    </div>
                </div>
            </div>
        </div>
    )
}