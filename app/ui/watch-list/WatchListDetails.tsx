import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";

export default function WatchListDetails({stocks, handleItemClick}: {stocks: JSONObject[], handleItemClick: (groupItem: JSONObject) => void }) {
console.log(stocks);
	return (
		<div className="m-2 font-medium w-full">
			{stocks.map((stock: JSONObject, idx: number) => (
			<div className="flex flex-row bg-slate-100 p-3">
				<div className="flex flex-col space-y-3 flex-shrink-0">
					<div 
						key={`watchlist_${idx}`}
						className="space-y-3"
						onClick={() => handleItemClick(stock)}
					>
						<div className="font-bold text-white bg-black rounded-lg px-2 py-1 text-sm w-fit">{stock.symbol}</div>
						<div>{stock.longName}</div>
					</div>
				</div>
			
				<div className="ml-auto flex flex-row items-end text-right space-x-4">
					<div className="text-lg font-semibold">{stock.regularMarketPrice}</div>
					<div>{stock.regularMarketChange}</div>
				</div>
			</div>
			))}
		</div>
	)
}