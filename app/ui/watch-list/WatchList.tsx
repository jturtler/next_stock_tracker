import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";
import { fetchIndividualData } from "@/lib/utils/fetchStockIndexes";
import { useState } from "react";
import WatchListDetails from "./WatchListDetails";

export default function WatchList() {

	const { user } = useAuth();
	const [selected, setSeleted] = useState<JSONObject | null>(null);

	const handleSelectedItem = (item: JSONObject) => {
		setSeleted(item);
	}

	return (
		<div className="flex flex-row w-full mr-2">
			<div className="flex flex-col space-y-2 m-2 font-medium">
				{user!.watchlist.map((item: JSONObject, idx: number) => (
					<div 
						key={`watchlist_${idx}`}
						className={`p-3 rounded-md hover:bg-purple-400 ${selected !== null && selected.groupName == item.groupName ? "bg-purple-400" : "bg-purple-100"}`}  
						onClick={() => handleSelectedItem(item)}>
							{item.groupName}
					</div>
				))}
			</div>

			<div className="flex-1">
				{selected !== null && <WatchListDetails groupName={selected.groupName}/>}
			</div>
		</div>
	)
}