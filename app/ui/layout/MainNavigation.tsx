'use client';

import { useState } from "react";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";


export default function MainNavigation() {

    const [selected, setSelected] = useState( Constant.UI_PAGE_HOME );

    const {setMainPage, setSubPage} = useMainUi();

    const handleOnClick = (name: string) => {
        setSelected(name)
        setMainPage(name);

        // if( name == Constant.UI_SYMBOL_DETAILS ) {
        //   setSubPage(Constant.UI_CHART);
        // }
    }
    
    return (
        <>
        <nav className="bg-gray-500 shadow-md text-white">
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-8">
        {/* <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-green-600">BrandName</a>
        </div> */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className={` ${selected == Constant.UI_PAGE_HOME ? "bg-green-600" : ""} hover:bg-green-600 font-medium text-sm p-1`} onClick={() => handleOnClick(Constant.UI_PAGE_HOME)}>Home</a>
          <a href="#" className={` ${selected == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS ? "bg-green-600" : ""} hover:bg-green-600 font-medium text-sm p-1`} onClick={() => handleOnClick(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS)}>Compare Stocks</a>
          <a href="#" className="hover:bg-green-600 font-medium text-sm p-1">Contact</a>
        </div>
      </div>
    </div>
  </nav>
  </>
    )
}