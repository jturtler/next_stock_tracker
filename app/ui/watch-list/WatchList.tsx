import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";

export default function WatchList({handleItemClick}: {handleItemClick: (groupItem: JSONObject) => void }) {

	const { user } = useAuth();

	return (
		<div className="flex flex-col space-y-3 m-2 font-medium">
			{user!.watchlist.map((item: JSONObject, idx: number) => (
				<div 
					key={`watchlist_${idx}`}
					className="bg-slate-200 p-3 hover:bg-slate-300"  
					onClick={() => handleItemClick(item)}>
						{item.groupName}
				</div>
			))}
		</div>
	)
}