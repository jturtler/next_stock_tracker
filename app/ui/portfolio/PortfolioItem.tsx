/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";


export default function PortfolioItem({ data, style = "large" }: { data: JSONObject, style: string }) {

	const profitLoss = data.currentValue - data.investmentValue;
console.log("profitLoss : " + profitLoss);
	return (
		<>
			{style == "large" && <tr className="hover:bg-slate-200">
				<td className="py-2 px-4 border-b text-start whitespace-nowrap"><span className="px-3 py-1 bg-black text-white rounded-md mr-2 font-bold">{data.symbol}</span></td>
				<td className="py-2 px-4 border-b text-start whitespace-nowrap">{data.longName}</td>
				<td className="py-2 px-4 border-b text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.investmentValue)}</td>
				<td className="py-2 px-4 border-b text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.currentValue)}</td>
				{profitLoss >= 0 && (
				<td className="py-2 px-4 border-b text-end whitespace-nowrap font-semibold flex flex-row space-x-2 bg-green-200 rounded-md items-center justify-end">
					<td className="py-2 px-4 border-b text-end font-semibold flex justify-end">
					<div className="flex py-1 px-2 rounded-md items-center bg-green-100 text-green-600 whitespace-nowrap space-x-2">
						<FaArrowDown />
						<span>{Utils.formatDisplayNumber(profitLoss)}</span>
					</div>
				</td>
				</td>
				)}
				{profitLoss < 0 && (
				<td className="py-2 px-4 border-b text-end font-semibold flex justify-end">
					<div className="flex py-1 px-2 rounded-md items-center bg-red-100 text-red-600 whitespace-nowrap space-x-2">
						<FaArrowDown />
						<span>{Utils.formatDisplayNumber(profitLoss)}</span>
					</div>
				</td>
				)}
			</tr>}

			{style == "small" && <section className="bg-white p-5 rounded-lg shadow-md mb-2">
				<h2 className="text-lg font-semibold text-navy-blue mb-4"><span className="px-3 py-1 bg-black text-white rounded-md mr-2">{data.symbol}</span> {data.longName}</h2>

				<div className="grid grid-cols-1 gap-2">
					<div className="flex justify-between">
						<span className="text-gray-700">Investment:</span>
						<span className="font-semibold text-navy-blue">{Utils.formatDisplayNumber(data.investmentValue)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-700">Current Value:</span>
						<span className="font-semibold text-navy-blue">{Utils.formatDisplayNumber(data.currentValue)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-700">Profit/Loss:</span>
						{profitLoss >= 0 && <div className="font-semibold text-green-600 flex flex-row space-x-2 bg-green-100 py-1 px-2 rounded-md items-center">
							<FaArrowUp />
							<span>{Utils.formatDisplayNumber(profitLoss)}</span>
						</div>}
						{profitLoss < 0 && <div className="font-semibold text-red-600 flex flex-row space-x-2 bg-red-100 py-1 px-2 rounded-md items-center">
							<FaArrowDown />
							<span>{Utils.formatDisplayNumber(profitLoss)}</span>
						</div>}


					</div>
				</div>
			</section>}
		</>
	)
}