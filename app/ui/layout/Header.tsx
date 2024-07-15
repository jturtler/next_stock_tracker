"use client";

import { useState } from "react";
import SlideBar from "./Sidebar";
import Modal from "./Modal";
import { FcComboChart } from "react-icons/fc";
import { TbChartHistogram } from "react-icons/tb";
import { FaChartArea } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";


export default function Header() {

	const [isVisible, setIsVisible] = useState<boolean>(false);

	// const subTitle = Utils.getAppHeaderSubTitle( mainPage );

	// const getIcon = () => {
	// 	let icon: any;

	// switch( mainPage ) {
	// 	case Constant.UI_DASHBOARD_PAGE:
	// 		icon = <MdOutlineDashboard className="ml-3" size={24} />;
	// 		break;
	// 	case Constant.UI_BUDGET_PAGE:
	// 		icon = <FaSackDollar className="ml-3" size={24} />;
	// 		break;
	// 	case Constant.UI_INCOME_PAGE:
	// 		icon = <GiReceiveMoney className="ml-3" size={24} />;
	// 		break;
	// 	case Constant.UI_EXPENSE_PAGE:
	// 		icon = <GiMoneyStack className="ml-3" size={24} />;
	// 		break;
	// 	case Constant.UI_REPORT_PAGE:
	// 		icon = <FaChartBar className="ml-3" size={24} />;
	// 		break; 
	// 	default:
	// 		break;
	// }
	// 	return icon;
	// }


	return (
		<>
			<header className="w-full px-3 py-3 flex text-white flex-row space-x-3" >
				<div className="flex-1 mx-3 flex items-center space-x-3 hidden md:flex">
					<div className="flex flex-row space-x-3">
						<FaChartLine size={30} className="text-white" />
						<div className="font-semibold text-2xl">Stock</div>
						<div className="flex flex-1 flex-col">
							<span className="uppercase text-xs text-gray-400">Index</span>
							<span className="uppercase text-xs text-gray-400">Market</span>
						</div>
					</div>
				</div>

				<div className="text-sm">Sign-In</div>
				<div>|</div>
				<div className="text-sm">Sign-Up</div>


				{/* <h2 className="text-lg mx-3 flex space-x-3 font-semibold md:hidden">
						<TbChartHistogram size={30} className="text-red-200" />
					</h2> */}

			</header>

			<Modal isVisible={isVisible} onClose={() => setIsVisible(true)}>
				<SlideBar handleOnClose={() => setIsVisible(false)} />
			</Modal>
		</>
	)
}