import { JSONObject } from "@/lib/definations";
import SearchStock from "../stock-index-list/SearchStock";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import * as Utils from "@/lib/utils";


export default function AddWatchListForm() {

	const { user, setUser } = useAuth();
    const [groupName, setGroupName] = useState("");
    const [selectedSymbol, setSelectedSymbol] = useState<JSONObject | null>(null);
    const [error, setError] = useState("");

	const addStockToWatchlist = async() => {
        if( groupName !== "" && selectedSymbol !== null ) {
            // let availableWatchList = user!.watchlist;
            // if( availableWatchList === undefined ) availableWatchList = [];

            const newStock = { symbol: selectedSymbol.symbol, name: selectedSymbol.longName, addedAt: new Date() };

            // const foundGroup = Utils.findFromArray(availableWatchList, groupName, "groupName");
            // if( foundGroup ) {
            //     if( foundGroup.stocks == undefined ) {
            //         foundGroup.stocks = [];
            //     }
            //     foundGroup.stocks.push(newStock)
            // }
            // else {
            //     const group = { groupName, stocks: [] }
            //     availableWatchList.push(newStock)
            // }

            const payload = {action: "add", userId: user!._id, groupName: groupName, stock: selectedSymbol}

            const response = await fetch("api/auth", {
				method: "PUT",
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
			}
        }
		// const stock = availableStocks.find(s => s.symbol === selectedStock);
		// if (stock && !watchlist.find(s => s.symbol === stock.symbol)) {
		// 	const updatedWatchlist = [...watchlist, stock];
		// 	setWatchlist(updatedWatchlist);
		// 	localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
		// }
	};


    return (
        <div className="flex flex-col m-5 space-y-3 ">
            <div className="flex flex-row space-x-3 items-center">
                <div>Group Name</div>
                <input 
                    className="border border-gray-300 rounded-md p-3"
                    value={groupName}
                    placeholder="Enter a  group  name"
                    onChange={(e) => setGroupName(e.target.value)} 
                />
            </div>
            <div className="flex flex-row space-x-3">
                <div>Choose an existing group name</div>
                <select className="flex-1 border border-gray-300 rounded-md p-3" value={groupName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGroupName(e.target.value)}>
                    {user!.watchlist.map((item: JSONObject, idx: number) => (
                        <option key={`groupName_${item.groupName}`} value={item.groupName}>{item.groupName}</option>
                    ))}
                </select>
            </div>

            <SearchStock handleOnItemSelect={(item) => setSelectedSymbol(item)} handleOnClose={() => {} } />

            <button className="bg-yellow-400 p-3 rounded-lg m-3" onClick={() => addStockToWatchlist() }>Add</button>
        </div>
    )
}
