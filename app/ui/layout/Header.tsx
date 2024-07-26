"use client";

import { FaChartLine } from "react-icons/fa";


export default function Header() {

	return (
		<>
			<header className="w-full px-3 py-3 flex  flex-row space-x-3 bg-[#2d3748] text-[#ffffff]">
				<div className="flex-1 mx-3 flex items-center space-x-3">
					<div className="flex flex-row space-x-3">
						<FaChartLine size={30} className="text-white" />
						<div className="font-semibold text-2xl">Stock</div>
						<div className="flex flex-1 flex-col text-slate-300 uppercase text-xs">
							<span>Index</span>
							<span>Market</span>
						</div>
					</div>
				</div>

				{/* <h2 className="text-lg mx-3 flex space-x-3 font-semibold md:hidden">
						<TbChartHistogram size={30} className="text-red-200" />
					</h2> */}

			</header>

		</>
	)
}