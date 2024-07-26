import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";


export default function StockIndex({ stockData, handleOnClick }: { stockData: JSONObject, handleOnClick: (name: string) => void }) {

    const percent = stockData.regularMarketChangePercent;
    const closePrice = stockData.regularMarketPrice;
    const previousClosePrice = stockData.regularMarketPreviousClose;

    const handleOnClickItem = (name: string) => {
        handleOnClick(name);
    }

    // const calculateChangedValue = (): string => {
    //     return (previousClosePrice * percent).toFixed(2);
    // }

    return (
        <div className="p-2 border-b-2"
            onClick={() => handleOnClickItem(stockData.longName)}>
            <h3 className="font-bold">{stockData.longName}</h3>
            <p className={`${percent > 0 ? 'text-green-500' : 'text-red-500'}`}>{Utils.formatDisplayNumber(closePrice)} <span className="text-sm">({percent > 0 ? '+' : ''}{percent.toFixed(2)}%)</span></p>
        </div>
    )
}