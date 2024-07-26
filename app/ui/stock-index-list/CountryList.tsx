import { useState } from "react"

export default function CountryList({selectedItem, onSelectedItem}: {selectedItem: string, onSelectedItem: (countryCode: string) => void }) {

    const [selected, setSelected] = useState(selectedItem);

    const handleSelectedItem = (code: string) => {
        setSelected(code);
        onSelectedItem(code);
    }

    return (
        <div>
            <div className="flex flex-row font-semibold space-x-3">
                <div className="text-gray-400 p-2 rounded-xl">Country</div>
                <div
                    onClick={()=> handleSelectedItem("US")} 
                    className={`${selected == "US" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"} p-2 rounded-xl cursor-pointer`}>US</div>
                <div 
                    onClick={()=> handleSelectedItem("EU")} 
                    className={`${selected == "EU" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"} p-2 rounded-xl cursor-pointer`}>Europe</div>
                <div 
                    onClick={()=> handleSelectedItem("AS")} 
                    className={`${selected == "AS" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"} p-2 rounded-xl cursor-pointer`}>Asia</div>
            </div>

        </div>
    )
}