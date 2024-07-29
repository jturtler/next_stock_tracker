import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";

export default function WatchList({handleItemClick}: {handleItemClick: (groupItem: JSONObject) => void }) {

	const { user } = useAuth();

	return (
		<div className="flex flex-col">
			{user!.watchList.map((item: JSONObject, idx: number) => (
				<div key={`watchList_${idx}`} onClick={() => handleItemClick(item)}>{item.groupName}</div>
			))}
		</div>
	)
}