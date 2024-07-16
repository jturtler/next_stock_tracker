'use client';

import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import CurrentPriceBox from "./data-item/CurrentPriceBox";
import fetchStockIndexes from "@/lib/utils/fetchStockIndexes";
import StockIndexDetails from "./data-item/StockIndexDetails";

export default function CurrentStockIndexList() {
	
	const [activeItem, setActiveItem] = useState<JSONObject>({});
    const [stockIndexes, setStockIndexes] = useState<JSONObject[]>([]);


	useEffect(() => {
		const fetchIndexes = async() => {
			const response = await fetchStockIndexes();
			if( response.status == "success" ) {
				console.log(response.data);
				setStockIndexes( response.data );

			}
		}

		fetchIndexes();
	}, []);

	
	return (
		<div>
			{activeItem.longName === undefined && <div className="flex flex-row space-x-2">
				{stockIndexes.map((item, i) => (
					<CurrentPriceBox key={i} stockData={item} active={activeItem.longName === item.longName} handleOnClick={(e) => setActiveItem(item)} />
				))}
			</div>}

			{activeItem.longName !== undefined && <>
				<StockIndexDetails curPriceData={activeItem} handleOnClose={() => setActiveItem({})}/>
			</> }
		</div>

    )

}