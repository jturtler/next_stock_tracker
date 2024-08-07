/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";


export default function NotificationItem({ data, style = "large" }: { data: JSONObject, style: string }) {

	return (
		<>
			{style == "large" && <tr className="hover:bg-slate-200">
				<td className="py-2 px-4 border-b text-start whitespace-nowrap"><span className="px-3 py-1 bg-black text-white rounded-md mr-2 font-bold">{data.symbol}</span></td>
				{/* <td className="py-2 px-4 border-b text-start whitespace-nowrap">{data.longName}</td> */}
				<td className="py-2 px-4 border-b text-end whitespace-nowrap">{Utils.formatDisplayNumber(data.threshold)}</td>
				<td className="py-2 px-4 border-b text-end whitespace-nowrap">{data.direction}</td>
			</tr>}

			{style == "small" && <section className="bg-white p-5 rounded-lg shadow-md mb-2">
				<h2 className="text-lg font-semibold text-navy-blue mb-4">
					<span className="px-3 py-1 bg-black text-white rounded-md mr-2">{data.symbol}</span> 
					{/* {data.longName} */}
				</h2>

				<div className="grid grid-cols-1 gap-2">
					<div className="flex justify-between">
						<span className="text-gray-700">Threshold:</span>
						<span className="font-semibold text-navy-blue whitespace-nowrap uppercase">{data.direction} {Utils.formatDisplayNumber(data.threshold)}</span>
					</div>
				</div>
			</section>}
		</>
	)
}