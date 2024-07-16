import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";


export default function CurrentPriceBox({stockData, active, handleOnClick}: {stockData: JSONObject, active: boolean, handleOnClick: (name: string) => void}) {

    const percent = stockData.regularMarketChangePercent;
    const closePrice = stockData.regularMarketPrice;
    const previousClosePrice = stockData.regularMarketPreviousClose;
    
    // const [activeItem, setActiveItem] = useState(active);
    
    useEffect(() => {
        
    }, [active])


    const handleOnClickItem = (name: string) => {
        handleOnClick(name);
    }

    const calculateChangedValue = (): string => {
		return (previousClosePrice * percent).toFixed(2);
	}

    return (
        <div 
            className={`flex flex-row border space-x-3 ${active ? "border-4 border-orange-400" : "border-slate-200"} bg-white w-fit px-3 py-3 rounded-lg text-center`} 
            onClick={() => handleOnClickItem(stockData.longName)}>

            {percent >= 0 && <>
                <div className="px-3 py-3 rounded-lg bg-green-100 text-green-700"><FaArrowUp className="text-green-700"/></div>
                <div className={`flex flex-col`}>
                    <div className="whitespace-nowrap font-semibold">{stockData.longName}</div>
                    <div className="whitespace-nowrap">+{closePrice}</div>
                </div>
                <div className={`flex flex-col rounded-lg text-green-700 items-end`}>
                    <div>+{percent.toFixed(2)}%</div>
                    <div>+{calculateChangedValue()}</div>
                </div>
            </>}

            {percent < 0 && <>
                <div className="px-3 py-3 rounded-lg bg-red-100 text-red-700"><FaArrowDown /></div>
                <div className={`flex flex-col`}>
                    <div className="whitespace-nowrap font-semibold">{stockData.longName}</div>
                    <div className="whitespace-nowrap">-{closePrice}</div>
                </div>
                <div className={`flex flex-col rounded-lg text-red-700 items-end`}>
                    <div className="whitespace-nowrap">{percent.toFixed(2)}%</div>
                    <div className="whitespace-nowrap">{calculateChangedValue()}</div>
                </div>
            </>}
        </div>

    )
}