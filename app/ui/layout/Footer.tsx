"use client";

import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constant";


export default function Footer() {

	const { setMainPage } = useMainUi();

	return (
		<footer className="h-30 w-screen py-4 flex bg-[#4a5568] text-[#e2e8f0] p-4 text-center text-xs items-center">
			<div className="flex-grow text-center">
				<p>© 2024 Stock Index Market. All rights reserved.</p>
			</div>

			<div className="flex space-x-4">
				<div className="cursor-pointer" onClick={() => setMainPage(Constant.UI_PAGE_LOGIN )} >Sign-In</div>
				<div>|</div>
				<div className="cursor-pointer" onClick={() => setMainPage(Constant.UI_PAGE_AUTH_REGISTRATION )}>Sign-Up</div>
			</div>
		</footer>
	)
}
