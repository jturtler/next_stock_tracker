import { JSONObject } from "@/lib/definations";
import { useState } from "react"
import StockSelectItem from "./StockSelectItem";
import * as Utils from "@/lib/utils";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, parseISO } from 'date-fns';
import fetchChartData from "@/lib/utils/fetchStockChartData";
import StockAddItem from "./StockAddItem";
import CompareStockDetails from "./CompareStockDetails";




export default function StockSelectList() {
	const [stocks, setStocks] = useState<JSONObject[]>([]);
	const [details, setDetails] = useState<JSONObject | null>(null);

	const addStockData = (stockData: JSONObject) => {
		fetchChartData(stockData.symbol, "1M").then(json => {
			stockData.chartData = json.data;

			let temp = Utils.cloneJSONObject(stocks);
			temp.push(stockData);
			setStocks(temp);
		})

	}

	// const CustomTooltip = ({ payload, label }: any) => {

	// 	if (payload && payload.length) {

	// 		const formattedDate = format(parseISO(label), "dd MMM yyyy HH:mm");
	// 		const data = payload[0].payload;

	// 		// setDetails(data);
	// 		return (
	// 		    <div className="flex flex-col custom-tooltip bg-white p-2 border border-gray-200 rounded shadow text-xs space-y-2">
	// 		        <div className="text-gray-500 flex justify-between space-x-3">
	// 		            <span>Date:</span>
	// 		            <span className="text-right font-semibold">{formattedDate}</span>
	// 		        </div>
	// 		        {Object.keys(data).map((item, idx) => (
	// 		            <div key={`${item}_${idx}`} className="text-gray-500 flex justify-between space-x-3">
	// 		                <span>{Utils.capitalizeFirstLetterOfEachWord(item.replace("_", " "))}</span>
	// 		                <span className="font-semibold text-right">{Utils.formatDisplayNumber(data[item])}</span>
	// 		            </div>
	// 		        ))}
	// 		    </div>
	// 		);
	// 	}

	// 	return null;
	// };


	const removeStockData = (stockData: JSONObject) => {
		let temp = Utils.cloneJSONObject(stocks);
		temp = Utils.removeFromArray(temp, stockData.symbol, "symbol");

		setStocks(temp);
	}

	const transformChartData = () => {
		let symbols: string[] = [];
		let transformedData: JSONObject[] = [];

		for (var i = 0; i < stocks.length; i++) {
			const symbol = stocks[i].symbol;
			symbols.push(symbol);

			const chartData = stocks[i].chartData.quotes;
			for (var j = 0; j < chartData.length; j++) {
				const data = chartData[j];
				data.longname = stocks[i].longname;

				var found = Utils.findFromArray(transformedData, data.date, "date");
				if (!found) {
					let tempData: JSONObject = {};
					tempData.date = data.date;
					// tempData[`${symbol}_symbol`] = symbol;
					tempData[`${symbol}_close`] = data.close;
					tempData[`${symbol}_high`] = data.high;
					tempData[`${symbol}_low`] = data.low;
					tempData[`${symbol}_open`] = data.open;
					tempData[`${symbol}_volume`] = data.volume;

					tempData.details = [];
					tempData.details.push(data);

					transformedData.push(tempData);
					
				}
				else {
					found[`${symbol}_close`] = data.close;
					found[`${symbol}_high`] = data.high;
					found[`${symbol}_low`] = data.low;
					found[`${symbol}_open`] = data.open;
					found[`${symbol}_volume`] = data.volume;

					found.details.push(data);
				}
			}
		}

		return {
			symbols,
			data: transformedData
		};
	}


	const transformedData = transformChartData();

	const formatYPriceAxis = (tickItem: string) => {
		return Utils.formatDisplayNumber(tickItem);
	};


	return (
		<div>
			{/* Search div */}
			<div className="flex flex-row rounded-xl m-2 space-x-3 items-center text-sm">
				<div className="w-1/3">Compare up to four stocks by adding the symbol or company name.
				</div>
				{/* For the selected stocks */}
				{stocks.map((item, idx) => (
					<StockSelectItem
						key={`compare_${idx}`}
						stockData={item}
						handleOnRemoveItem={(stockData) => removeStockData(stockData)}
					/>
				))}

				{/* For add new stock */}
				<StockAddItem
					key={`compare_${stocks.length}`}
					handleOnAddItem={(stockData) => addStockData(stockData)}
				/>
			</div>

			{/* <div className="flex-1"> */}
				{/* <div className="flex flex-row" > */}
					{/* Charts */}
					<ResponsiveContainer width="100%" height={500}>
						<ComposedChart
							height={400}
							data={transformedData.data}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}

							onMouseMove={(state: JSONObject) => {

								console.log(state);
								if (Object.keys(state).length > 0) {
									setDetails(state.activePayload[0].payload
									);
								} else {
									// setDetails(null);
								}
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />

							<XAxis dataKey="date"
								axisLine={false}
								tick={false}
							/>

							<YAxis
								orientation="right"
								tickFormatter={formatYPriceAxis}
							/>

							{/* <Tooltip content={<CustomTooltip />} /> */}

							{transformedData.symbols.map((symbol, idx) => (
								// <Line type="monotone" key={`${symbol}_${idx}`} dataKey={`${symbol}_close`} stroke={Utils.getRandomHexColor()} dot={false} />
								<Area type="monotone" key={`${symbol}_${idx}`} dataKey={`${symbol}_close`} strokeWidth={1} activeDot={{ r: 8 }} dot={false} fill={Utils.COLORS_LIST[idx % Utils.COLORS_LIST.length]} />
							))}

						</ComposedChart>
					</ResponsiveContainer>

					{/* Details */}
					{/* <ul className="whitespace-nowrap w-fit list-none p-3 text-s">
						{details != null && <>
							<li className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
								<span>Date:</span>
								<span className="font-semibold">{format(parseISO(details.date), "dd MMM yyyy HH:mm")}</span>
							</li>

							{details.details.map((item: JSONObject, idx: number) => (
								<>
									<li key={`${item}_${idx}_label`} className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400 font-semibold">
										{item.longname}
									</li>
									<li key={`${item}_${idx}_data`} className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
										<span>Close: </span>
										<span className="font-semibold">{Utils.formatDisplayNumber(item.close)}</span>
									</li>
									<li key={`${item}_${idx}_data`} className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
										<span>Open: </span>
										<span className="font-semibold">{Utils.formatDisplayNumber(item.open)}</span>
									</li>
									<li key={`${item}_${idx}_data`} className="flex flex-row justify-between py-2 border-b border-dotted border-gray-400">
										<span>DateRange: </span>
										<span className="font-semibold">{Utils.formatDisplayNumber(item.low)} - {Utils.formatDisplayNumber(item.high)}</span>
									</li>
								</>
							))}
						</>}
					</ul> */}

					{<CompareStockDetails dataList={transformedData.data} />}
				</div>
		// 	</div>
		// </div>
	)
}
