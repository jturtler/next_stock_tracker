'use client';

import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import CurrentPriceBox from "./stock-index-data/CurrentPriceBox";
import fetchStockIndexes from "@/lib/utils/fetchStockIndexes";
import StockIndexDetails from "./stock-index-data/StockIndexDetails";
import useStockData from "@/lib/hooks/useStockData";

export default function CurrentStockIndexList() {
	
	const [activeItem, setActiveItem] = useState<JSONObject>({});

	const symbols = [Constant.SYMBOL_DOW_JONES, Constant.SYMBOL_S_AND_P_500, Constant.SYMBOL_NASDAQ ];
	const { stockDataList, isLoading, isError } = useStockData(symbols);

	useEffect(() => {
		// console.log("======= CurrentStockIndexList");
		// console.log(stockDataList);
	}, [stockDataList])
	
	if (isLoading || stockDataList === undefined ) return <div>Loading...</div>;
	if (isError) return <div>Error loading data</div>;
	return (
		<div>
			{activeItem.longName === undefined && <div className="flex flex-row space-x-2">
				{stockDataList!.data.map((item: JSONObject, i: number) => (
					<CurrentPriceBox key={`stockList_${i}`} stockData={item} active={activeItem.longName === item.longName} handleOnClick={(e) => setActiveItem(item)} />
				))}
			</div>}

			{activeItem.longName !== undefined && <>
				<StockIndexDetails curPriceData={activeItem} handleOnClose={() => setActiveItem({})}/>
			</> }
		</div>

    )

}