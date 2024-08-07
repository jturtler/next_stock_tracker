import { JSONObject } from '@/lib/definations';
import React, { useEffect, useRef, useState } from 'react';
import { RiUserSettingsFill } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
import * as Constant from "@/lib/constant";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdNotificationAdd } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";


export default function SettingsButton({ handleItemClick }: { handleItemClick: (pageName: string) => void }) {
	// State to manage dropdown visibility
	const [isOpen, setIsOpen] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	// Toggle the dropdown visibility
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (divRef.current && !divRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	
	return (
		<div className="relative inline-block text-left">
			<button
				onClick={toggleDropdown}
				className="p-2 bg-gold text-black rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
			>
				<RiUserSettingsFill size={16} />
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div ref={divRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
					<ul className="py-1">
						<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex space-x-2 items-center" onClick={() => handleItemClick(Constant.UI_PAGE_WATCH_LIST)} >
							<BiSolidPurchaseTag size={22} />
							<span>Watchlist</span>
						</li>
						<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex space-x-2 items-center" onClick={() => handleItemClick(Constant.UI_PAGE_PORTFOLIO)} >
							<RiStockFill size={22} />
							<span>Portfolio</span>
						</li>
						<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex space-x-2 items-center border-b border-gray-200" onClick={() => handleItemClick(Constant.UI_PAGE_NOTIFICATION_PAGE)} >
							<MdNotificationAdd size={22} />
							<span>Notification</span>
						</li>
						<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex space-x-2 items-center" onClick={() => handleItemClick("logout")} >
							<IoLogOutSharp size={22} />
							<span>Log-out</span>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};