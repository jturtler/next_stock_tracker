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
		 <header className="bg-navy-blue text-white p-4 shadow-md" >
			<div className=" mx-auto flex justify-between items-center ml-10">
				<div className="flex flex-row">
					<div className="font-semibold text-2xl tracking-wider text-textPrimary mr-2">Stock</div>
					<div className="flex flex-col text-secondary uppercase text-xs tracking-widest font-semibold">
						<span>Index</span>
						<span>Market</span>
					</div>
				</div>
				<div className="flex-1"><MainNavigation /></div>
			</div>
		</header>
	)
}