import { JSONObject } from "@/lib/definations";
import { useState } from "react"
import { FiPlus } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import * as Utils from "@/lib/utils";
import StockSearchForm from "./StockSearchForm";
import Modal from "../layout/Modal";
import { fetchIndividualData } from "@/lib/utils/fetchStockIndexes";
// import fetchStockChartData from "@/lib/utils/fetchStockChartData";


export default function StockSelectItem({handleOnAddItem, handleOnRemoveItem}: {handleOnAddItem: (data: JSONObject) => void, handleOnRemoveItem: (data: JSONObject) => void}) {
    const [showDialog, setShowDialog] = useState(false);
    const [stock, setStock] = useState<JSONObject | null>(null);

    // const fetchStockData = async(data: JSONObject) => {
	// 	try{
	// 		const response = await fetchStockChartData(data!.symbol, "1D");
	// 		if( response.status == "success" ) {
	// 			return response.data;
	// 		}
	// 		else {
	// 			// console.error(response.message);
    //             return null;
	// 		}
	// 	} catch (error) {
	// 		// console.error('Error fetching stock data:', error);
    //         return null;
	// 	}
	// };


    const handleOnAddStock = () => {
        setShowDialog(true);
    }

    const handleOnRemoveStock = () => {
        const tempStock = Utils.cloneJSONObject(stock!);
        setStock(null);
        handleOnRemoveItem(tempStock);
    }

    const addItem = async(data: JSONObject) => {
        const response = await fetchIndividualData(data.symbol);
        if( response.status == "success" ) {
            setStock(response.data[0]);
            handleOnAddItem(response.data[0]);
        }
    }

    
    return (
        <>
            <div className="flex flex-col items-center w-[200px] h-[100px]">
                {stock === null && <div className="flex items-center flex-row bg-slate-200 rounded-xl border border-slate-300 p-5 space-x-3 w-full h-full justify-center" onClick={(e) => handleOnAddStock()}>
                    <FiPlus /> <span>Add Stock</span>
                </div>}

                {stock && <div className="flex flex-col text-left justify-between bg-white rounded-xl border border-slate-300 p-5 space-y-1 font-bold w-full h-full">
                    <div className="flex">
                        <span className="flex-1 text-blue-600">{stock.symbol}</span>
                        <IoCloseCircleOutline onClick={() => handleOnRemoveStock()} />
                    </div>

                    <div className="text-gray-400 text-xs">{Utils.truncatedText(stock.longName)}</div>

                    <div className="flex space-x-3">
                        <div>{Utils.formatDisplayNumber(stock.regularMarketPrice)}</div>
                        <div className={`${stock.regularMarketChangePercent > 0  ? "text-green-600" : "text-red-600"}`}>
                            {stock.regularMarketChangePercent > 0 && "+"}{Utils.formatDisplayNumber(stock.regularMarketChangePercent)}%</div>
                    </div>
                </div>}
            </div>

            <Modal isVisible={showDialog} onClose={() => {}}><StockSearchForm handleOnItemSelect={(data) => addItem(data)} handleOnClose={() => setShowDialog(false)} /> </Modal>
        </>
    )
}
