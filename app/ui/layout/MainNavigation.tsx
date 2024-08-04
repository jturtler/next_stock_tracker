'use client';

import { useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";


export default function MainNavigation() {

	const [selected, setSelected] = useState(Constant.UI_PAGE_HOME);
	const { setMainPage } = useMainUi();
	const { user, logout } = useAuth();

	const handleOnClick = (name: string) => {
		setSelected(name)
		setMainPage(name);
	}
	return (
		<nav className="text-xs md:mt-2 lg:mt-2 justify-between md:text-slate-300 lg:text-slate-300 sm:text-black">

			<ul className="flex space-x-2 font-medium">
				<li><a href="#" className={` ${selected == Constant.UI_PAGE_HOME ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a></li>

				<li><a href="#" className={` ${selected == Constant.UI_PAGE_TRENDING ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_TRENDING)}>Trending</a></li>

				<li><a href="#" className={` ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare-Stocks</a></li>
				
				{user === null && <>
					<div className="flex-grow"></div>
					<li className="pl-6 cursor-pointer flex-shrink-0 ml-auto pr-5" onClick={() => handleOnClick(Constant.UI_PAGE_LOGIN)}><FaRegUserCircle size={18} /></li>
				</>}

				{user !== null && (
					<>
						<li><a href="#" className={` ${selected == Constant.UI_PAGE_WATCH_LIST ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_WATCH_LIST)}>Watchlist</a></li>

						<li><a href="#" className={` ${selected == Constant.UI_PAGE_PORTFOLIO ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_PORTFOLIO)}>Portfolio</a></li>

						<div className="flex-grow"></div>
						<li className="cursor-pointer flex-shrink-0 pr-5" onClick={() => logout()}><FaRegUserCircle size={15} /></li>
					</>
				)}
			</ul>

		</nav>
	)
}