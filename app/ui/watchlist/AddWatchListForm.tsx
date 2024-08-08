import { JSONObject } from "@/lib/definations";
import SearchStock from "../stock-index-list/SearchStock";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import * as Utils from "@/lib/utils";
import DropdownInput from "../basics/DropdownInput";


export default function AddWatchListForm({handleOnClose}: {handleOnClose: () => void}) {

	const { user, setUser } = useAuth();
    const [groupName, setGroupName] = useState("");
    const [selectedSymbol, setSelectedSymbol] = useState<JSONObject | null>(null);
    const [error, setError] = useState("");

	const addStockToWatchlist = async() => {
console.log("========= addStockToWatchlist");
console.log(groupName);
console.log(selectedSymbol);

        if( groupName !== "" && selectedSymbol !== null ) {
            const newStock = { symbol: selectedSymbol.symbol, name: selectedSymbol.shortname, addedAt: new Date() };
            const payload = {action: "add", userId: user!._id, groupName: groupName, stock: newStock}

            const response = await fetch("api/watchlist", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if( !response.ok ){
				setError("Network response was not ok");
			}
			else {
				const newUser = await response.json();
				setUser(newUser);
                alert("Add successfully !");
			}
        }
	};
    
    const groupNameList = user!.watchlist.map((item: JSONObject) => item.groupName);

    return (
        <div className="flex flex-col space-y-3 bg-white rounded-lg pb-5 w-2/3 h-fit">
            <h2 className="px-5 py-3 text-2xl border-b rounded-t-lg border-b-gray-400 bg-navy-blue text-gray-200">Add New Watchlist</h2>
           
            <div className="grid grid-cols-[auto,1fr] gap-2 p-3">
                <div>Group Name</div>
                <div className="flex flex-row space-x-3 items-center">
                    <DropdownInput 
                        suggestions={groupNameList} 
                        onChange={(name) => setGroupName(name)}
                        onSelect={(name) => setGroupName(name)} />
                </div>

                <div>Search a Stock</div>
                <div><SearchStock handleOnItemSelect={(item) => setSelectedSymbol(item)} /></div>

                <div>
                    <button className="bg-pastel-blue p-3 rounded-lg m-3" onClick={() => addStockToWatchlist() }>Add</button>
                    <button className="bg-silver p-3 rounded-lg m-3" onClick={() => handleOnClose() }>Cancel</button>
                </div>
            </div>
           
        </div>
    )
}
