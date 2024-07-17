'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import axios from 'axios';
import { JSONObject, Option } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import ChartDateRange from '../stock-index-data/ChartDateRange';
import { format, parseISO } from 'date-fns';
import { TooltipProps } from 'recharts';
import { IoSearchOutline } from "react-icons/io5";
import StockSelectList from './StockSelectList';


const CustomTooltip = ({ active, payload, label }: any) => {
	if (label && active && payload && payload.length) {
		const formattedDate = format(parseISO(label), "dd MMM yyyy HH:mm");
		const data = payload[0].payload;
		return (
			<div className="flex flex-col custom-tooltip bg-white p-2 border border-gray-200 rounded shadow text-xs space-y-2">
				<div className="text-gray-500 flex justify-between space-x-3">
					<span>Date:</span>
					<span className="text-right font-semibold">{formattedDate}</span>
				</div>
				{data.close && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Close:</span>
						<span className="font-semibold text-right">{Utils.formatDisplayNumber(data.close)}</span>
					</div>
				)}
				{data.open && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Open:</span>
						<span className="font-semibold text-right">{Utils.formatDisplayNumber(data.open)}</span>
					</div>
				)}
				{data.high && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>High:</span>
						<span className="font-semibold text-right">{Utils.formatDisplayNumber(data.high)}</span>
					</div>
				)}
				{data.low && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Low:</span>
						<span className="font-semibold text-right">{Utils.formatDisplayNumber(data.low)}</span>
					</div>
				)}
			</div>
		);
	}

	return null;
};


export default function CompareStocksChart() {
	const [active, setActive] = useState("1D");
	const [symbols, setSymbols] = useState("");
	

	// const fetchStockData = async (dateRange: JSONObject, interval: string | undefined, isOneDay: boolean) => {
	// 	try {
	// 		const response = await axios.get(`/api/stock-chart-data`, {
	// 			params: {
	// 				"symbol": curPriceData.symbol,
	// 				"startDate": dateRange.startDate,
	// 				"endDate": dateRange.endDate,
	// 				"interval": interval
	// 			},
	// 		});

	// 		const dataList = response.data.quotes;
	// 		if (dataList === undefined) {
	// 			setChartData([]);
	// 		}
	// 		else if (isOneDay) {
	// 			setChartData(getChartDataInLatestDate(response.data.quotes));
	// 		}
	// 		else {
	// 			setChartData(dataList);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching stock data:', error);
	// 	}
	// };


	return (
		<div className="flex flex-col">
			<div>
				<StockSelectList />
			</div>

			<div className="m-3 py-10 px-3">
				{/* <ResponsiveContainer width="100%" height={500}>
					<ComposedChart
						height={400}
						data={chartData}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />

						<defs>
							<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
								<stop offset="45%" stopColor="#85C1E9" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#60a5fa " stopOpacity={0.2} />
							</linearGradient>
						</defs>

						<XAxis dataKey="date"
							axisLine={false}
							tick={false}
						/>

						<YAxis
							yAxisId="yPrice"
							orientation="right"
							domain={[yTicks[0], yTicks[yTicks.length - 1]]}  // Customize the vertical axis range
							tickCount={yTicks.length - 1}       // Set the number of ticks
							ticks={yTicks}
							tick={{ fontSize: 11 }}
							// tick={false}  // Hide the Y-axis labels
							axisLine={false}  // Optionally hide the Y-axis line
							tickLine={false}  // Optionally hide the tick lines
							tickFormatter={formatYPriceAxis}
						/>
						<YAxis
							yAxisId="yVolume"
							orientation="left"
							tick={{ fontSize: 11 }}
							tickFormatter={formatYVolumeAxis}
						/>

						<Tooltip content={<CustomTooltip />} />

						<Bar yAxisId="yVolume" dataKey="volume" barSize={20} fill="#ABB2B9" />
						<Area yAxisId="yPrice" type="monotone" dataKey="close" strokeWidth={1} activeDot={{ r: 8 }} dot={false} fill="url(#colorUv)" />
					</ComposedChart>
				</ResponsiveContainer> */}

				{/* <div className="flex flex-row space-x-6 px-3 font-semibold p-3">
					{Utils.dateRangeList.map((item, i) => (
						<ChartDateRange key={i} name={item} selected={active == item} handleOnClick={(name: string) => { setActive(name); }} />
					))}
				</div> */}

				<hr className="text-black border mb-3" />

			</div>
		</div>
	);
};