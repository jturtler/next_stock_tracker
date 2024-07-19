'use client';

import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import CurrentPriceBox from "./stock-index-data/CurrentPriceBox";
// import fetchStockIndexes from "@/lib/utils/fetchStockIndexes";
import StockIndexDetails from "./stock-index-data/StockIndexDetails";
import useStockData from "@/lib/hooks/useStockData";
import * as Utils from "@/lib/utils";
import { useMainUi } from "@/contexts/MainUiContext";


export default function CurrentStockIndexList({handleOnItemClick}: {handleOnItemClick: (item: JSONObject) => void}) {
	
	const {setMainPage} = useMainUi();
	const [activeItem, setActiveItem] = useState<JSONObject>({});

	const symbols = [Constant.SYMBOL_DOW_JONES, Constant.SYMBOL_S_AND_P_500, Constant.SYMBOL_NASDAQ ];
	
	const { stockPriceList } = useStockData(symbols);

	useEffect(() => {
		if( activeItem.longName !== undefined ) {
			const found = Utils.findFromArray( stockPriceList, activeItem.longName, "longName" );

			if( found ) {
				setActiveItem(Utils.cloneJSONObject(found));
			}
		}
	}, [stockPriceList]);


	const itemOnClick = (item: JSONObject) => {
		setActiveItem(item);
		setMainPage(Constant.UI_SYMBOL_DETAILS);
		handleOnItemClick(item);
	}
	
	// if (isLoading || stockPriceList === undefined ) return <div>Loading...</div>;
	// if (isError) return <div>Error loading data</div>;
	return (
		<div>
			<div className="flex flex-row space-x-2">
				{stockPriceList.map((item: JSONObject, i: number) => (
					<CurrentPriceBox key={`stockList_${i}`} stockData={item} active={activeItem.longName === item.longName} handleOnClick={(e) => itemOnClick(item) } />
				))}
			</div>

			{/* {activeItem.longName !== undefined && <>
				<StockIndexDetails curPriceData={activeItem} handleOnClose={() => setActiveItem({})}/>
			</> } */}
		</div>

    )

}