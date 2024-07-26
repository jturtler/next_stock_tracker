import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useState } from "react"
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


export default function StockSearchForm({handleOnItemSelect, handleOnClose}: {handleOnItemSelect: (stockData: JSONObject) => void, handleOnClose: () => void}) {

    const [searchcKey, setSearchKey] = useState("");
    const [list, setList] = useState<JSONObject[]>([]);

    const searchStock = async() => {
        if( searchcKey === "" ) {
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
        // handleOnClose();
    }

    
    return (
        <div className="flex flex-col w-1/2 min-h-96 bg-white rounded-lg">
            <h2 className="font-medium shadow-sm text-xl p-3 bg-[#FFDB58] flex flex-row">
                <span className="flex-1">Add stock to compare</span>
                <span className="text-right" onClick={(() => handleOnClose())}><IoClose /></span>
            </h2>
            
            <div className="relative m-3">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                    id="username"
                    value={searchcKey}
                    placeholder="Search for stock"
                    required
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                <FaArrowRight className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" onClick={(e) => searchStock()}/>
            </div> 
 
            <div className="flex-1 px-3 mb-4 space-y-1"> 
                {list.map((item, i) => (<div key={`stockSearchResult_${i}`}>
                        {item.shortname !== undefined && <div className={`text-gray-500 font-medium grid grid-cols-2 bg-white px-3 pt-3 border ${i%2 === 0 ? "bg-white" : "bg-stone-100"} cursor-pointer`} onClick={() => handleOnSelect(item)}>
                            {/* <!-- First Row --> */}
                            <div className=" text-blue-700 font-medium">{item.symbol}</div>
                            <div className="text-right">{item.typeDisp}</div>
                            {/* <!-- Second Row --> */}
                            <div className="">{item.shortname}</div>
                            <div className="text-right">{item.exchange}</div>
                        </div>}
                    </div>
                 ))}
            </div>
        </div>
    )
}
