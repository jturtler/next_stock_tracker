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
			<h2 className="font-semibold text-2xl">Trending</h2>
			<div>
			{/* <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hex</th>
      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RGB</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    <tr className="border-b border-gray-200">
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-red-500"></div>
          <span className="ml-2 text-sm font-medium text-gray-900">Red</span>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap text-sm">#EF4444</td>
      <td className="py-4 whitespace-nowrap text-sm">rgb(239, 68, 68)</td>
    </tr>
    <tr className="border-b border-gray-200">
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-blue-500"></div>
          <span className="ml-2 text-sm font-medium text-gray-900">Blue</span>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap text-sm">#3B82F6</td>
      <td className="py-4 whitespace-nowrap text-sm">rgb(59, 130, 246)</td>
    </tr>
  </tbody>
</table> */}


				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Symbol</th>
							<th className="py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Name</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Last Price</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Market Time</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Change</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">% Change</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Volume</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Market Cap</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Intraday High/Low</th>
							<th className="py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Day Chart</th>
						</tr>
					</thead>
				</table>

				<tbody className="bg-white divide-y divide-gray-200">
					{list.map((item: JSONObject, idx: number) => (
						<tr className="border-b border-gray-200">
							<td className="py-4 text-left whitespace-nowrap text-sm">{item.symbol}</td>
							<td className="py-4 text-left whitespace-nowrap text-sm">{item.shortName}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketPrice)}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{item.regularMarketTime}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketChange)}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketChangePercent)}%</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketVolume)}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.marketCap)}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">{Utils.formatDisplayNumber(item.regularMarketDayHigh)} - {Utils.formatDisplayNumber(item.regularMarketDayLow)}</td>
							<td className="py-4 text-right whitespace-nowrap text-sm">Day Chart</td>
						</tr>
					))}
				</tbody>
			</div>
		</div>
	)

}