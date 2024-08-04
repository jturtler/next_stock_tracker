import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";
import { fetchIndividualData } from "@/lib/utils/fetchStockIndexes";
import { useState } from "react";
import WatchListDetails from "./WatchListDetails";
import * as Utils from "@/lib/utils";


export default function WatchList() {

	const { user } = useAuth();
	const initWatchlistGroup = (user!.watchlist !== undefined && user!.watchlist.length > 0) ? user!.watchlist[0] : null;
	const [selected, setSeleted] = useState<JSONObject | null>(initWatchlistGroup);

	const handleSelectedItem = (item: JSONObject) => {
		setSeleted(item);
	}

	return (
		<div className="flex flex-col w-full mr-2">
			<div className="flex flex-row space-x-2 m-2 font-medium">
				{user!.watchlist.map((item: JSONObject, idx: number) => (
					<div 
						key={`watchlist_${idx}`}
						className={`px-3 py-1 rounded-md hover:bg-pink-800 hover:text-white ${selected !== null && selected.groupName == item.groupName ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-500"}`}
						// style={{backgroundColor: Utils.COLORS_LIST[idx % Utils.COLORS_LIST.length]}}  
						onClick={() => handleSelectedItem(item)}>
							{item.groupName}
					</div>
				))}
			</div>

			<hr className="ml-2 border-t-2 border-gray-300 shadow-xl" />

			<div className="flex-1">
				{selected !== null && <WatchListDetails groupName={selected.groupName}/>}
			</div>
		</div>
	)
}