"use client";

import { useState } from "react";
import SlideBar from "./Sidebar";
import Modal from "./Modal";
import { FcComboChart } from "react-icons/fc";
import { TbChartHistogram } from "react-icons/tb";
import { FaChartArea } from "react-icons/fa";


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
			<header className="w-full px-3 py-3 bg-slate-600 flex text-white">
					{/* { subPage == null && <IoMenuOutline className="text-2xl font-bold cursor-pointer" onClick={(e) => setIsVisible(true)} />}
					{ subPage != null && <IoMdArrowRoundBack  className="text-2xl font-bold cursor-pointer" onClick={(e) => setSubPage(null) } />} */}
					 <h2 className="text-xl mx-3 flex items-center space-x-3 font-semibold hidden md:flex">
					 	<TbChartHistogram size={30} className="text-green-500" /> <span>Stock Index Market</span> 
						{/* <span>-</span> { subTitle != "" && <span>{subTitle}</span>} */}
					</h2>
					<h2 className="text-lg mx-3 flex space-x-3 font-semibold md:hidden">
					<TbChartHistogram size={30} className="text-red-200" /> 
					{/* { subTitle != "" && <span>{subTitle}</span>} */}
					</h2>
				</header>

				<Modal isVisible={isVisible} onClose={() => setIsVisible(true)}>
					<SlideBar handleOnClose={() => setIsVisible(false)}/>
				</Modal>
		</>
    )
}