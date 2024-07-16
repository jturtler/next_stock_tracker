"use client";

import { FaChartLine } from "react-icons/fa";


export default function Header() {

	return (
		<>
			<header className="w-full px-3 py-3 flex text-slate-700 flex-row space-x-3" >
				<div className="flex-1 mx-3 flex items-center space-x-3 hidden md:flex">
					<div className="flex flex-row space-x-3">
						<FaChartLine size={30} className="text-slate-500" />
						<div className="font-semibold text-2xl">Stock</div>
						<div className="flex flex-1 flex-col text-slate-500 uppercase text-xs">
							<span>Index</span>
							<span>Market</span>
						</div>
					</div>
				</div>

				<div className="text-sm font-semibold">Sign-In</div>
				<div>|</div>
				<div className="text-sm font-semibold">Sign-Up</div>


				{/* <h2 className="text-lg mx-3 flex space-x-3 font-semibold md:hidden">
						<TbChartHistogram size={30} className="text-red-200" />
					</h2> */}

			</header>

		</>
	)
}