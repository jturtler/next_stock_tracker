'use client';

import { useEffect, useRef, useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import SlideMenu from "./SlideMenu";


export default function MainNavigation() {

	const [selected, setSelected] = useState(Constant.UI_PAGE_HOME);
	const { setMainPage } = useMainUi();
	const { user, logout } = useAuth();
	
	const [showSlideMenu, setShowSlideMenu] = useState(false);

	const handleOnClick = (name: string) => {
		setSelected(name)
		setMainPage(name);
	}

	const renderMenus = () => {
		return (
			<>
				<li><a href="#" className={`tracking-widest ${selected == Constant.UI_PAGE_HOME ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a></li>

				<li><a href="#" className={`tracking-widest ${selected == Constant.UI_PAGE_TRENDING ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_TRENDING)}>Trending</a></li>

				<li><a href="#" className={`tracking-widest ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare-Stocks</a></li>
				
				{user === null && <>
					<div className="flex-grow"></div>
					<li className="flex flex-row tracking-widest cursor-pointer flex-shrink-0 ml-auto space-x-2" onClick={() => handleOnClick(Constant.UI_PAGE_LOGIN)}><FaRegUserCircle size={18} /><span>Login</span></li>
				</>}

				{user !== null && (
					<>
						<li><a href="#" className={`tracking-widest ${selected == Constant.UI_PAGE_WATCH_LIST ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_WATCH_LIST)}>Watchlist</a></li>

						<li><a href="#" className={`tracking-widest ${selected == Constant.UI_PAGE_PORTFOLIO ? "bg-[#e2e8f0] text-black" : ""} hover:bg-[#e2e8f0] hover:text-black p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_PORTFOLIO)}>Portfolio</a></li>

						<div className="flex-grow"></div>
						<li className="tracking-widest cursor-pointer flex-shrink-0 pr-5 flex flex-row space-x-2" onClick={() => logout()}><FaRegUserCircle size={15} /><span>Log-out</span></li>
					</>
				)}
			</>
		)
	}
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowSlideMenu(false);
			}
		};

		if (showSlideMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showSlideMenu]);


	return (
		<>
		<nav className="text-xs mt-2 justify-between">
			<div className="flex lg:hidden mr-3" onClick={() => setShowSlideMenu(true) }><CiMenuKebab size={18} /></div>
			
			<ul className="flex space-x-2 font-medium hidden lg:flex">
				{renderMenus()}
			</ul>
		</nav>

		{showSlideMenu && <div
				ref={menuRef}
				className={` font-normal fixed top-0 right-0 h-full bg-gray-800 text-white shadow-lg transform ${showSlideMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-52`}
				
			>
			

				<div className="p-4">
					<ul className="space-y-5 font-extralight">
						<li onClick={() => setShowSlideMenu(false)}><h2 className="text-2xl right-4 text-white font-extrabold text-right">&times;</h2></li>
						{renderMenus()}
					</ul>
				</div>
			</div>}
			
		</>
	)
}