import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Utils from "@/lib/utils";


export default function StockTrending() {

	const [list, setList] = useState<JSONObject>([]);

	const getStockTrending = async () => {

		const response = await axios.get(`/api/stock-trending`);

		let dataList = response.data;
		if (dataList === undefined) {
			setList([]);
		}
		else {
			setList(dataList);
		}
	}

	useEffect(() => {
		getStockTrending();
	}, []);

	return (
		<div className="m-3">
			<h2 className="font-semibold text-2xl mb-3">Trending</h2>
			<div>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap">Symbol</th>
							<th className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500">Name</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Last Price</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Market Time</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Change</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">% Change</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Volume</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Market Cap</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Intraday High/Low</th>
							<th className="px-6 py-3 text-right text-xs font-medium whitespace-nowrap text-gray-500">Day Chart</th>
						</tr>
					</thead>

					<tbody className="bg-white divide-y divide-gray-200">
						{list.map((item: JSONObject, idx: number) => (
							<tr className="border-b border-gray-200 even:bg-gray-100" key={`trending_${idx}`}>
								<td className="px-6 py-4 text-left whitespace-nowrap text-sm font-semibold">{item.symbol}</td>
								<td className="px-6 py-4 text-left whitespace-nowrap text-sm font-semibold">{item.shortName}</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm font-semibold">{Utils.formatDisplayNumber(item.regularMarketPrice)}</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm font-semibold">{Utils.formatDisplayTimeFromObj(item.regularMarketTime)} {item.exchangeTimezoneShortName}</td>
								<td className={`px-6 py-4 text-right whitespace-nowrap text-sm font-semibold ${item.regularMarketChange > 0 ? "text-green-600" : "text-red-600"} `}>{Utils.formatDisplayNumber(item.regularMarketChange)}</td>
								<td className={`px-6 py-4 text-right whitespace-nowrap text-sm font-semibold ${item.regularMarketChange > 0 ? "text-green-600" : "text-red-600"} `}>{Utils.formatDisplayNumber(item.regularMarketChangePercent)}%</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm font-semibold">{Utils.formatNumberToK(item.regularMarketVolume)}</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm font-semibold">{Utils.formatNumberToK(item.marketCap)}</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketDayHigh)} - {Utils.formatDisplayNumber(item.regularMarketDayLow)}</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm">-</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

}