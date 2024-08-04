import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";


export default function StockIndex({ stockData, handleOnClick }: { stockData: JSONObject, handleOnClick: (name: string) => void }) {

	const percent = stockData.regularMarketChangePercent;
	const closePrice = stockData.regularMarketPrice;
	const previousClosePrice = stockData.regularMarketPreviousClose;

	const handleOnClickItem = (name: string) => {
		handleOnClick(name);
	}

	return (
		<div className="p-2 border-b-2" onClick={() => handleOnClickItem(stockData.longName)}>
			<h3 className="font-bold">
			<div className="font-bold text-white bg-black rounded-md px-2 py-1 text-sm w-fit">
				{stockData.symbol}
			</div>
								{stockData.longName}</h3>
			<p className={`${percent > 0 ? 'text-green-500' : 'text-red-500'}`}>
				{Utils.formatDisplayNumber(closePrice)} {percent !== undefined && <span className="text-sm">({percent > 0 ? '+' : ''}{percent.toFixed(2)}%)</span>}</p>
		</div>
	)
}