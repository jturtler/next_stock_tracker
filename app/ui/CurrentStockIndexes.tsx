'use client';

import { JSONObject } from "@/lib/definations";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "@/lib/constant";
import StockIndex from "./StockIndex";

export default function CurrentStockIndexes({ exchange = "NASDAQ" }) {
	
	const [active, setActive] = useState(Constant.COUNTRY_US);
    const [stockIndexes, setStockIndexes] = useState<JSONObject[]>([]);

	const fetchStockIndexes = async () => {
		try {
			const response = await axios.get(`/api/current-stock-data`, {
				params: {
					"exchange": exchange
				},
			});

			setStockIndexes(response.data);
		} catch (error) {
			console.error('Error fetching stock data:', error);
		} finally {
			//   setLoading(false);
		}
	};

	useEffect(() => {
		fetchStockIndexes();
	}, []);

	// {
	// 	"symbol": "AAACX",
	// 	"name": "Alpha Alternative Assets Fund",
	// 	"price": 6.2,
	// 	"changesPercentage": 0.1616,
	// 	"change": 0.01,
	// 	"dayLow": 6.2,
	// 	"dayHigh": 6.2,
	// 	"yearHigh": 6.35,
	// 	"yearLow": 6.14,
	// 	"marketCap": 0,
	// 	"priceAvg50": 6.2172,
	// 	"priceAvg200": 6.2171,
	// 	"exchange": "NASDAQ",
	// 	"volume": 0,
	// 	"avgVolume": 0,
	// 	"open": 6.2,
	// 	"previousClose": 6.1899996,
	// 	"eps": null,
	// 	"pe": null,
	// 	"earningsAnnouncement": null,
	// 	"sharesOutstanding": 0,
	// 	"timestamp": 1720526702
	//   }

	const filterStockIndexesByCountry = (): JSONObject[] => {
		const filterIndexes = stockIndexes.filter((item) => item.name !== undefined && item.name !== null && item.name.indexOf(active) >= 0 )

		console.log(filterIndexes.slice(0, 6));
		return filterIndexes.slice(0, 6); 
	}
console.log(filterStockIndexesByCountry());

    return (
		<>
			<div className="grid grid-flow-row py-1 grid-cols-6 w-[calc(100vh-200px)] font-semibold items-center">
				<div className="uppercase">Markets</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_US && "bg-teal-100"}`} onClick={() => setActive(Constant.COUNTRY_US)}>{Constant.COUNTRY_US}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_EUROPE && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_EUROPE)}>{Constant.COUNTRY_EUROPE}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_ASIA && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_ASIA)}>{Constant.COUNTRY_ASIA}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_CURRENCIES && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_CURRENCIES)}>{Constant.COUNTRY_CURRENCIES}</div>
				<div className={`hover:bg-teal-100 cursor-pointer rounded-xl text-center py-2 ${active === Constant.COUNTRY_FUTURES && "bg-teal-100"}`}  onClick={() => setActive(Constant.COUNTRY_FUTURES)}>{Constant.COUNTRY_FUTURES}</div>
			</div>

			<div className="flex flex-row space-x-2">
				{filterStockIndexesByCountry().map((item, i) => (
					<StockIndex key={i} stockData={item} />
				))}
        </div> 
		</>

    )

}