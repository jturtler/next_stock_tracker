import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import * as Utils from "@/lib/utils";
import StockSearchForm from "./StockSearchForm";
import Modal from "../layout/Modal";
import { fetchIndividualData } from "@/lib/utils/fetchStockIndexes";
import fetchChartData from "@/lib/utils/fetchStockChartData";
// import { fetchIndividualData } from "@/lib/utils/fetchStockIndexes";
// import fetchStockChartData from "@/lib/utils/fetchStockChartData";


export default function StockSelectItem({stockData, handleOnRemoveItem}: {stockData: JSONObject, handleOnRemoveItem: (data: JSONObject) => void}) {

    const handleOnRemoveStock = () => {
        handleOnRemoveItem(stockData);
    }

    return (
        <>
            <div className="flex flex-col items-center w-[200px] h-[100px]">
             
               <div className="flex flex-col text-left justify-between bg-white rounded-xl border border-slate-300 p-5 space-y-1 font-bold w-full h-full">
                    <div className="flex">
                        <span className="flex-1 text-blue-600">{stockData.symbol}</span>
                        <IoCloseCircleOutline size={22} onClick={() => handleOnRemoveStock()} />
                    </div>

                    <div className="text-gray-400 text-xs">{Utils.truncatedText(stockData.longname)}</div>
                    <div className="text-gray-400 text-xs">{Utils.truncatedText(stockData.symbol)}</div>

                    <div className="flex space-x-3">
                        <div>{Utils.formatDisplayNumber(stockData.regularMarketPrice)}</div>
                        <div className={`${stockData.regularMarketChangePercent > 0  ? "text-green-600" : "text-red-600"}`}>
                            {stockData.regularMarketChangePercent > 0 && "+"}{Utils.formatDisplayNumber(stockData.regularMarketChangePercent)}%</div>
                    </div>
                </div>
            </div>
        </>
    )
}
