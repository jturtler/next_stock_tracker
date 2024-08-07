'use client';

import { useEffect, useRef, useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { CiMenuKebab } from "react-icons/ci";
import DropdownButton from "./DropdownButton";
import { JSONObject } from "@/lib/definations";


export default function MainNavigation() {

	const [selected, setSelected] = useState(Constant.UI_PAGE_HOME);
	const { setMainPage } = useMainUi();
	const { user, logout } = useAuth();
	
	const [showSlideMenu, setShowSlideMenu] = useState(false);

	const handleOnClick = (name: string) => {
		setSelected(name)
		setMainPage(name);
	}

	const handleSettingOptionClick = (option: JSONObject) => {
		if( option.code == "logout") {
			handleOnLogout();
		}
		else {
			handleOnClick(option.code);
		}
	}

	const handleOnLogout = () => {
		const ok = confirm("Are you sure you want to log-out ?");
		if(ok) {
			logout();
		}
	}

	const options = [
		{ code: Constant.UI_PAGE_WATCH_LIST, name: "Watchlist" },
		{ code: Constant.UI_PAGE_PORTFOLIO, name: "Portfolio" },
		{ code: Constant.UI_PAGE_NOTIFICATION_PAGE, name: "Notification" },
		
		{ code: "logout", name: "Log-out" }
	];

	const renderMenus = () => {
		return (
			<>
				<div className="flex-grow"></div>
				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_HOME ? "text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a></li>

				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_TRENDING ? "text-gold" : ""}  p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_TRENDING)}>Trending</a></li>

				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "hover:text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare-Stocks</a></li>
				
				{user === null && <>
					<div className="flex-grow"></div>
					<li>
						<button className="bg-gold text-navy-blue px-4 py-2 rounded hover:bg-yellow-600" onClick={() => handleOnClick(Constant.UI_PAGE_LOGIN)}>Log-In</button>
					</li>
				</>}

				{user !== null && (
					<>
						 {/*<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_WATCH_LIST ? "text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_WATCH_LIST)}>Watchlist</a></li>

						<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_PORTFOLIO ? "text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_PORTFOLIO)}>Portfolio</a></li>
						
						<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_NOTIFICATION_PAGE ? "text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_NOTIFICATION_PAGE)}>Notifications</a></li>

						<div className="flex-grow"></div> */}
						<li>
							{/* <button className="bg-gold text-navy-blue px-4 py-2 rounded hover:bg-yellow-600" onClick={() => handleOnLogout()}>Log-Out</button> */}

							
							<DropdownButton name="Settings" options={options} handleItemClick={(option) => handleSettingOptionClick(option)}/>
						</li>
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
		<nav>
		<div className="flex lg:hidden justify-end" onClick={() => setShowSlideMenu(true) }><CiMenuKebab size={18} /></div>
			
			<ul className="flex space-x-4 hidden lg:flex items-center">
				{renderMenus()}
			</ul>
		</nav>

		{showSlideMenu && <div
				ref={menuRef}
				className={` font-normal fixed top-0 right-0 h-full bg-gray-800 text-white shadow-lg transform ${showSlideMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-52`}
				
			>
			

				<div className="p-4">
					<ul className="space-y-5 font-extralight justify-center">
						<li onClick={() => setShowSlideMenu(false)}><h2 className="text-2xl right-4 text-white font-extrabold text-right">&times;</h2></li>
						{renderMenus()}
					</ul>
				</div>
			</div>}
			
		</>
	)
}