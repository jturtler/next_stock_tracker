import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useRef, useState, KeyboardEvent } from "react"
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";


export default function SearchStock({ handleOnItemSelect, handleOnClose }: { handleOnItemSelect: (stockData: JSONObject) => void, handleOnClose: () => void }) {

	const [searchcKey, setSearchKey] = useState("");
	const [list, setList] = useState<JSONObject[]>([]);
	const [showSearchResultList, setShowSearchResultList] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	const searchStock = async () => {
		if (searchcKey === "") {
			setSearchKey("");
		}
		else {
			const response = await axios.get(`/api/search-stock`, {
				params: {
					"symbol": searchcKey
				},
			});

			let dataList = response.data.quotes;
			if (dataList === undefined) {
				setList([]);
			}
			else {
				setList(dataList);
			}
		}
	}

	const handleOnSelect = (data: JSONObject) => {
		handleOnItemSelect(data);
	}

	// const handleClickOutside = (event: MouseEvent) => {
	// 	if (divRef.current && !divRef.current.contains(event.target as Node)) {
	// 		setShowSearchResultList(false);
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);


	// Handler for the Enter key release
	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevent default form submission if inside a form
			console.log('Enter key released:', searchcKey);
			searchStock();
		}
	};
	
	return (
		<div className="flex flex-col w-1/2 shadow-sm" ref={divRef} >

			<div className="relative m-1" onClick={() => setShowSearchResultList(true)}>
				<input
					className="pl-10 peer block w-full rounded-md border border-gray-400 py-[15px] text-sm outline-2 placeholder:text-gray-500 "
					id="search"
					value={searchcKey}
					placeholder="Search for stock"
					required
					onChange={(e) => setSearchKey(e.target.value)}
					onKeyUp={handleKeyUp} // Attach the event handler
				/>
				<FiSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			</div>

			{showSearchResultList && <div className="flex-1 px-1 mb-1 ">
				{list.map((item, i) => (<div key={`stockSearchResult_${i}`}>
					{item.shortname !== undefined && <div className="text-gray-500 font-medium grid grid-cols-2 px-3 pt-3 space-y-1 border border-gray-200 bg-slate-50 cursor-pointer" onClick={() => handleOnSelect(item)}>
						{/* <!-- First Row --> */}
						<div className=" text-blue-700 font-medium">{item.symbol}</div>
						<div className="text-right">{item.typeDisp}</div>
						{/* <!-- Second Row --> */}
						<div className="">{item.shortname}</div>
						<div className="text-right">{item.exchange}</div>
					</div>}
				</div>
				))}
			</div>}
		</div>
	)
}