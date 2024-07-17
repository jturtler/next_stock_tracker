import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";


export default function CurrentPriceDetails({priceData}: {priceData: JSONObject}) {
	return (
		<ul className="whitespace-nowrap w-fit list-none p-3 text-s">
			<li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
				<span>Previous Close</span>
				<span className="font-semibold">{Utils.formatDisplayNumber(priceData.regularMarketPreviousClose)}</span>
			</li>
			<li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
				<span>Open</span>
				<span className="font-semibold">{Utils.formatDisplayNumber(priceData.regularMarketOpen)}</span>
			</li>
			<li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
				<span className="pr-3">Date Range</span>
				<span className="font-semibold">{Utils.formatDisplayNumber(priceData.regularMarketDayLow)} - {Utils.formatDisplayNumber(priceData.regularMarketDayHigh)}</span>
			</li>
			<li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
				<span>Volume</span>
				<span className="font-semibold">{Utils.formatDisplayNumber(priceData.regularMarketVolume)}</span>
			</li>
		</ul>
	)
}