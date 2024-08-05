import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Utils from "@/lib/utils";
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/AppStore";
import * as Constant from "@/lib/constant";
import useStockTrending from "@/lib/hooks/useStockTrending";
import Loading from "../layout/Loading";


export default function StockTrending() {

	const {setMainPage} = useMainUi();
	const {stockTrending, isLoading} = useStockTrending();
	
	const handleItemOnClick = (item: JSONObject) => {
		AppStore.setSelectedSymbolData(item);
		setMainPage(Constant.UI_SYMBOL_DETAILS);
	}


	if (isLoading) return <Loading />

	return (
		<div className="m-3">
			<h2 className="text-2xl font-semibold text-navy-blue mb-4">Trending</h2>
			<div className="hidden lg:block">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50 font-medium whitespace-nowrap">
						<tr>
							<th className="py-2 px-4 border-b text-left">Symbol</th>
							<th className="py-2 px-4 border-b text-left text-navy-blue">Name</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Last Price</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Market Time</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Change</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">% Change</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Volume</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Market Cap</th>
							<th className="py-2 px-4 border-b text-right text-navy-blue">Intraday High/Low</th>
						</tr>
					</thead>

					<tbody className="bg-white divide-y divide-gray-200">
						{stockTrending.map((item: JSONObject, idx: number) => (
							<tr key={`trending_${idx}`} className="hover:bg-slate-200">
								<td className="text-left whitespace-nowrap py-2 px-4 border-b text-blue-700 cursor-pointer font-semibold" onClick={() => handleItemOnClick(item)}>{item.symbol}</td>
								<td className="text-left whitespace-nowrap py-2 px-4 border-b">{item.longName}</td>
								<td className="text-right whitespace-nowrap py-2 px-4 border-b font-semibold">{Utils.formatDisplayNumber(item.regularMarketPrice)}</td>
								<td className="text-right whitespace-nowrap py-2 px-4 border-b font-semibold">{Utils.formatDisplayTimeFromObj(item.regularMarketTime)} {item.exchangeTimezoneShortName}</td>
								<td className={`text-right whitespace-nowrap py-2 px-4 border-b font-semibold ${item.regularMarketChange > 0 ? "text-green-600" : "text-red-600"} `}>{Utils.formatDisplayNumber(item.regularMarketChange)}</td>
								<td className={`text-right whitespace-nowrap py-2 px-4 border-b font-semibold ${item.regularMarketChange > 0 ? "text-green-600" : "text-red-600"} `}>{Utils.formatDisplayNumber(item.regularMarketChangePercent)}%</td>
								<td className="text-right whitespace-nowrap py-2 px-4 border-b font-semibold">{Utils.formatNumberToK(item.regularMarketVolume)}</td>
								<td className="text-right whitespace-nowrap py-2 px-4 border-b font-semibold">{Utils.formatNumberToK(item.marketCap)}</td>
								<td className="text-right whitespace-nowrap py-2 px-4 border-b">{Utils.formatDisplayNumber(item.regularMarketDayHigh)} - {Utils.formatDisplayNumber(item.regularMarketDayLow)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-col lg:hidden text-sm">
			{stockTrending.map((item: JSONObject, idx: number) => (
				<div className="p-2 flex flex-col border-b odd:bg-gray-100 hover:bg-gray-300" key={`trending_${idx}`}>
					<div className="whitespace-nowrap font-semibold text-blue-700 cursor-pointer" onClick={() => handleItemOnClick(item)}>{item.symbol} - {item.longName}</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
						<div>Last Price: <span className="font-semibold">{Utils.formatDisplayNumber(item.regularMarketPrice)}</span></div>
						<div>Market Time: <span className="font-semibold"> {Utils.formatDisplayTimeFromObj(item.regularMarketTime)} {item.exchangeTimezoneShortName}</span></div>
						<div>Change: <span className={`font-semibold ${item.regularMarketChange > 0 ? "text-green-600" : "text-red-600"} `}>{Utils.formatDisplayNumber(item.regularMarketChange)} ({Utils.formatDisplayNumber(item.regularMarketChangePercent)}%)</span></div>
						<div>Volumn: <span className="font-semibold">{Utils.formatNumberToK(item.regularMarketVolume)}</span></div>
						<div>Market cap: <span className="font-semibold">{Utils.formatNumberToK(item.marketCap)}</span></div>
						<div>Intraday High/Low
						: <span className="font-semibold">{Utils.formatDisplayNumber(item.regularMarketDayHigh)} - {Utils.formatDisplayNumber(item.regularMarketDayLow)}</span></div>
					</div>
				</div>
			))}
			</div>
		</div>
	)

}