import { JSONObject } from "@/lib/definations";
import { useState } from "react"
import StockSelectItem from "./StockSelectItem";
import * as Utils from "@/lib/utils";


export default function StockSelectList() {
    const [stocks, setStocks] = useState<JSONObject[]>([]);

    const addStockData = (stockData: JSONObject) => {
        let temp = Utils.cloneJSONObject(stocks);
        temp.push(stockData);

        setStocks(temp);
    }

    
    const removeStockData = (stockData: JSONObject) => {
        let temp = Utils.cloneJSONObject(stocks);
        temp = Utils.removeFromArray(temp, stockData.longName, "longName");

        setStocks(temp);
    }

    return (
        <div className="flex flex-row rounded-xl m-2 space-x-3 items-center text-sm">
            <div className="w-1/3">Compare up to four stocks by adding the symbol or company name.
            </div>
            <StockSelectItem 
                handleOnAddItem={(stockData) => addStockData(stockData) }
                handleOnRemoveItem={(stockData) => removeStockData(stockData) }
            />

            <StockSelectItem 
                handleOnAddItem={(stockData) => addStockData(stockData) }
                handleOnRemoveItem={(stockData) => removeStockData(stockData) }
            />

            <StockSelectItem 
                handleOnAddItem={(stockData) => addStockData(stockData) }
                handleOnRemoveItem={(stockData) => removeStockData(stockData) }
            />

            <StockSelectItem 
                handleOnAddItem={(stockData) => addStockData(stockData) }
                handleOnRemoveItem={(stockData) => removeStockData(stockData) }
            />
        </div>
    )
}
