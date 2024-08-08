'use client';

import { useEffect, useRef, useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { CiMenuKebab } from "react-icons/ci";
import SettingsButton from "./SettingsButton";
import { JSONObject } from "@/lib/definations";
import { FaUser } from "react-icons/fa";


export default function Navigation() {

	const [selected, setSelected] = useState(Constant.UI_PAGE_HOME);
	const { setMainPage } = useMainUi();
	const { user, logout } = useAuth();

	const [showSlideMenu, setShowSlideMenu] = useState(false);

	const handleOnClick = (name: string) => {
		setSelected(name);
		setMainPage(name);
		setShowSlideMenu(false);
	}

	const handleSettingOptionClick = (pageName: string) => {
		if (pageName == "logout") {
			handleOnLogout();
		}
		else {
			handleOnClick(pageName);
		}
	}

	const handleOnLogout = () => {
		const ok = confirm("Are you sure you want to log-out ?");
		if (ok) {
			logout();
			setMainPage(Constant.UI_PAGE_HOME);
		}
	}

	const renderNavigationMenus = () => {
		return (
			<>
				<div className="flex-grow"></div>
				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_HOME ? "text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a></li>

				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_TRENDING ? "text-gold" : ""}  p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_TRENDING)}>Trending</a></li>

				<li><a href="#" className={`hover:text-gold ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "hover:text-gold" : ""} p-1 rounded`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare-Stocks</a></li>
			</>
		)
	}

	const renderUserRelatedMenus = () => {
		return(<>
			{user === null && 
				<div className="flex ">
					<button className="bg-gray-400 text-navy-blue p-1 rounded-full hover:bg-yellow-600" onClick={() => handleOnClick(Constant.UI_PAGE_LOGIN)}>
						<FaUser />
					</button>
				</div>}

			{user !== null && (
				<SettingsButton handleItemClick={(pageName) => handleSettingOptionClick(pageName)} />
			)}
		</>)
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
		<div className="flex items-center justify-center">
			{/* For the large size */}
			<nav className="flex-1 flex justify-center">
				<ul className="flex space-x-4 hidden lg:flex items-center">
					{renderNavigationMenus()}
				</ul>

			</nav>

			<div>{renderUserRelatedMenus()}</div>
			<div className="flex lg:hidden justify-end ml-4" onClick={() => setShowSlideMenu(true)}><CiMenuKebab size={18} /></div>


			{/* For the medium or small size */}
			{showSlideMenu && <div
				ref={menuRef}
				className={`font-normal fixed top-0 right-0 h-full z-50 bg-gray-800 text-white shadow-lg transform ${showSlideMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-52`}
			>
				<div className="p-4">
					<ul className="space-y-5 font-extralight justify-center">
						<li onClick={() => setShowSlideMenu(false)}><h2 className="text-2xl right-4 text-white font-extrabold text-right">&times;</h2></li>
						{renderNavigationMenus()}
					</ul>
				</div>
				
			</div>}


		</div>
	)
}