'use client';

import { JSONObject } from "@/lib/definations";
import { RiStockLine } from "react-icons/ri";
import { IoBarChart } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import { useState } from "react";
import * as Constant from "@/lib/constant";


export default function DetailsMenu({handleOnClick }: {handleOnClick: (name: string) => void }) {
	const [active, setActive] = useState(Constant.UI_CHART);

	const handleItemOnClick = (name: string) => {
		setActive(name);
		handleOnClick(name);
	}

	return (
		<div className=" h-full w-64 flex flex-col justify-between mr-5 border-1 shadow-green-500 shadow-lg transform ">
			<div className="p-4">
				<div className="flex items-center mb-8 space-x-2">
					<RiStockLine />
					<hr className="border-2" />
				</div>
				<ul className="space-y-2">
					<li className={`${active == Constant.UI_CHART && "bg-purple-400"} flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-400 transition duration-300`} onClick={(e) => handleItemOnClick(Constant.UI_CHART)}>
						<IoBarChart /> <span className="font-medium">Chart</span>
					</li>
					<li className={`${active == Constant.UI_HISTORICAL_DATA && "bg-purple-400"} flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-400 transition duration-300`} onClick={(e) => handleItemOnClick(Constant.UI_HISTORICAL_DATA)}>
						<MdHistory /> <span className="font-medium">Historical Data</span>
					</li>
					<li className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-400 transition duration-300`} onClick={(e) => handleItemOnClick("")}>
						<SiFuturelearn /> <span className="font-medium">Close</span>
					</li>
				</ul>
			</div>
		</div>
	)
}