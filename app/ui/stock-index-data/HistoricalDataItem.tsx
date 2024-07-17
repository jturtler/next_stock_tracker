/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";



export default function HistoricalDataItem({ data, style = "large", index }: { data: JSONObject, style: string, index: number }) {

	return (
		<>
			
			{style == "large" && <tr className="hover:bg-gray-200 border border-gray-300 odd:bg-gray-100 even:bg-white">
				<td className="px-4 py-2 whitespace-nowrap">{Utils.formatDistplayDate(data.date)}</td>
				<td className="px-4 py-2 text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.open)}</td>
				<td className="px-4 py-2 text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.high)}</td>
				<td className="px-4 py-2 text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.low)}</td>
				<td className="px-4 py-2 text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.close)}</td>
				<td className="px-4 py-2 text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.volume)}</td>
			</tr>}

			{style == "small" && <div className={`m-2 flex px-4 py-2 items-center  border border-gray-200 rounded ${index % 2 === 0 ? "bg-white" : "bg-gray-50" }`}>
				<div className="flex-1">
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">Date:</span> <span>{Utils.formatDistplayDate(data.date)}</span></div>
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">Open:</span> <span>{Utils.formatDisplayNumber(data.open)}</span></div>
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">High:</span> <span>{Utils.formatDisplayNumber(data.high)}</span></div>
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">Low:</span> <span>{Utils.formatDisplayNumber(data.low)}</span></div>
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">Close:</span> <span>{Utils.formatDisplayNumber(data.close)}</span></div>
					<div className="mb-2 whitespace-nowrap"><span className="text-gray-500">Volume:</span> <span>{Utils.formatDisplayNumber(data.volume)}</span></div>
				</div>
			</div>}
		</>
	)
}