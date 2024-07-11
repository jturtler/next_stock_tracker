'use client';

import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import StockIndexItem from "./StockIndexItem";
import fetchStockIndexes from "@/lib/utils/fetchStockIndexes";
import StockChart from "./StockChart";

export default function CurrentStockIndexList() {
	
	const [activeItem, setActiveItem] = useState<JSONObject>({});
    const [stockIndexes, setStockIndexes] = useState<JSONObject[]>([]);

	// const fetchStockIndexes = async () => {
	// 	try {
	// 		const response = await axios.get(`/api/current-stock-data`, {
	// 			params: {
	// 				"exchange": exchange
	// 			},
	// 		});

	// 		setStockIndexes(response.data);
	// 	} catch (error) {
	// 		console.error('Error fetching stock data:', error);
	// 	} finally {
	// 		//   setLoading(false);
	// 	}
	// };

	useEffect(() => {
		const fetchIndexes = async() => {
			const response = await fetchStockIndexes();
			if( response.status == "success" ) {
				setStockIndexes( response.data );
			}
		}

		fetchIndexes();
	}, []);

	
	return (
		<>
			{/* <div className="grid grid-flow-row py-1 grid-cols-6 w-[calc(100vh-200px)] font-semibold items-center">
				<div className="uppercase">Markets</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_US && "bg-teal-100"}`} onClick={() => setActive(Constant.COUNTRY_US)}>{Constant.COUNTRY_US}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_EUROPE && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_EUROPE)}>{Constant.COUNTRY_EUROPE}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_ASIA && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_ASIA)}>{Constant.COUNTRY_ASIA}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_CURRENCIES && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_CURRENCIES)}>{Constant.COUNTRY_CURRENCIES}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_FUTURES && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_FUTURES)}>{Constant.COUNTRY_FUTURES}</div>
			</div> */}

			<div className="flex flex-row space-x-2">
				{stockIndexes.map((item, i) => (
					<StockIndexItem key={i} stockData={item} active={activeItem.displayName === item.displayName} handleOnClick={(e) => setActiveItem(item)} />
				))}
			</div> 

			{activeItem.displayName !== undefined && <StockChart title={activeItem.displayName} symbol={activeItem.symbol} />}
		</>

    )

}