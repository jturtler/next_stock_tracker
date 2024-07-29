'use client';

import { useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";


export default function MainNavigation() {

    const [selected, setSelected] = useState( Constant.UI_PAGE_HOME );

    const {setMainPage, setSubPage} = useMainUi();
    const { user } = useAuth();
console.log(user);
    const handleOnClick = (name: string) => {
        setSelected(name)
        setMainPage(name);
    }
    
    return (
        <nav className="bg-[#edf2f7] text-[#2d3748] p-4">
          <ul className="flex space-x-4">
            <li><a href="#" className={` ${selected == Constant.UI_PAGE_HOME ? "bg-[#e2e8f0]" : ""} hover:bg-[#e2e8f0] p-2 rounded font-medium text-sm`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a></li>
            <li> <a href="#" className={` ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "bg-[#e2e8f0]" : ""} hover:bg-[#e2e8f0] p-2 rounded font-medium text-sm`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare Stocks</a></li>
            {user !== null && <li> <a href="#" className={` ${selected == Constant.UI_PAGE_WATCH_LIST ? "bg-[#e2e8f0]" : ""} hover:bg-[#e2e8f0] p-2 rounded font-medium text-sm`} onClick={() => handleOnClick(Constant.UI_PAGE_WATCH_LIST)}>Watchlist</a></li>}
            <li> <a href="#" className="hover:bg-[#e2e8f0] font-medium text-sm p-2">Contact</a></li>

          </ul>
        </nav>
    )
}