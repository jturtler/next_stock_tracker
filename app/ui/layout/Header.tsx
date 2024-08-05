"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import * as Constant from "@/lib/constant";
import MainNavigation from "./MainNavigation";


export default function Header() {

	// Accent: #F9A8D4 (Light Pink)


	return (
		 <header className="w-full flex flex-row p-3 border bg-header" >
			<div className="flex flex-row">
				<FaChartLine size={30} className="mr-3 text-textPrimary " />
				<div className="font-semibold text-2xl tracking-wide text-textPrimary mr-2">Stock</div>
				<div className="flex flex-col text-textSecondary uppercase text-xs tracking-widest font-semibold">
					<span>Index</span>
					<span>Market</span>
				</div>
			</div>

			<div className="flex-1 justify-end flex">
				<MainNavigation />
			</div>
		</header>
	)
}