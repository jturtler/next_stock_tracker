'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import axios from 'axios';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils/utils";


export default function StockChart({ title, symbol }: { title: string, symbol: string }) {
	const [active, setActive] = useState("7D");
	const [chartData, setChartData] = useState<JSONObject[]>([]);

	const fetchStockData = async (dateRange: JSONObject, interval: string, isOneDay: boolean) => {
		try {
			const response = await axios.get(`/api/stock-chart-data`, {
				params: {
					"symbol": symbol,
					"startDate": dateRange.startDate,
					"endDate": dateRange.endDate,
					"interval": interval
				},
			});

			const data = getChartDataInLatestDate( response.data.quotes );
			setChartData(data);
		} catch (error) {
			console.error('Error fetching stock data:', error);
		}
	};

	useEffect(() => {
		fetchStockDataByDateRange("7D");
	}, [symbol]);

	const getChartDataInLatestDate = (stockData: JSONObject[]) => {
		let data = [];
		if( chartData !== undefined && chartData.length > 0 ) {
			var latestDate = chartData[0].date.split("T")[0];
			for( var i=0; i<chartData.length; i++ ) {
				if( latestDate == chartData[i].split("T")[0] ) {
					data.push(chartData[i]);
				}
				else {
					return data;
				}
			}
		}

		return data;
	}


	const fetchStockDataByDateRange = (rangeName: string) => {
		let dateRange: JSONObject = {};
		let interval: string = "";
		let isOneDay = false;

		switch( rangeName ) {
			case "1D":
				dateRange = Utils.getDateRangeFromCurrentDate(7); 
				isOneDay = true;
				interval = "1m";
				break;
			case "7D":
				dateRange = Utils.getDateRangeFromCurrentDate(7); 
				interval = "1d";
				break;
			case "1M":
				dateRange = Utils.getDateRange_Months(1);
				interval = "1d";
				break;
			case "3M":
				dateRange = Utils.getDateRange_Months(3);
				interval = "1d";
				break;
			case "6M":
				dateRange = Utils.getDateRange_Months(6); 
				interval = "1d";
				break;
			case "9M":
				dateRange = Utils.getDateRange_Months(9); 
				interval = "1d";
				break;
			case "1Y":
				dateRange = Utils.getDateRange_Years(1);
				interval = "1d";
				break;
			case "2Y":
				dateRange = Utils.getDateRange_Years(2);
				interval = "1d";
				break;
			case "5Y":
				dateRange = Utils.getDateRange_Years(5);
				interval = "1d";
				break;
			case "All":
				dateRange = Utils.getDateRange_Years(100);
				interval = "1d";
				break;
		}

		fetchStockData(dateRange, interval, isOneDay);
	}


	const getTicks = (): string[] => {
		let ticks = [];
		let tempTicks = [];
		if( chartData != undefined ) {
			for( let i=0; i<chartData.length; i++ ) {
				let close = chartData[i].close;
				if( close !== null ) {
					tempTicks.push( close );
				}
			}
			
			tempTicks = tempTicks.sort((a, b) => a - b);
			const minTick = Math.ceil(tempTicks[0]);
			const maxTick = Math.round( tempTicks[tempTicks.length - 1] );
			for( var i=minTick; i<=maxTick; i+=10 ) {
				ticks.push(i.toFixed(2));
			} 
		}

		return ticks;
	}

	const ticks = getTicks();
	
	return (
		<div className="m-3 py-10 bg-white px-3">
			<h2 className="font-bold text-3xl py-5">{title}</h2>
			<div className="text-4xl pb-3 font-bold">{chartData.length > 0 && chartData[chartData.length-1].close}$</div>
			<hr className="text-black border mb-3"/>

			<ResponsiveContainer width="100%" height={500}>
				<ComposedChart
					height={500}
					data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="45%" stopColor="#86efac" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#ccfbf1" stopOpacity={0.2}/>
						</linearGradient>
					</defs>

					<XAxis dataKey="date" />
					<YAxis
						domain={[ticks[0], ticks[ticks.length - 1]]}  // Customize the vertical axis range
						tickCount={ticks.length - 1}       // Set the number of ticks
						ticks = {ticks}
						// tick={false}  // Hide the Y-axis labels
						axisLine={false}  // Optionally hide the Y-axis line
        				tickLine={false}  // Optionally hide the tick lines
					/>
					 <Tooltip />
					 {/* <Bar dataKey="volume" fill="#413ea0" /> */}
					<Area type="monotone" dataKey="close" stroke="#037b66" strokeWidth={1} activeDot={{ r: 8 }}  dot={false} fill="url(#colorUv)"/>
				</ComposedChart>
			</ResponsiveContainer>

			<div className="flex flex-row space-x-6 px-3 font-semibold p-3">
				<div onClick={() => fetchStockDataByDateRange("1D")} className={`${active=="1D" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>1D</div>
				<div onClick={() => fetchStockDataByDateRange("7D")} className={`${active=="7D" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>7D</div>
				<div onClick={() => fetchStockDataByDateRange("1M")} className={`${active=="1M" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>1M</div>
				<div onClick={() => fetchStockDataByDateRange("3M")} className={`${active=="3M" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>3M</div>
				<div onClick={() => fetchStockDataByDateRange("6M")} className={`${active=="6M" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>6M</div>
				<div onClick={() => fetchStockDataByDateRange("9M")} className={`${active=="9M" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>9M</div>
				<div onClick={() => fetchStockDataByDateRange("1Y")} className={`${active=="1Y" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>1Y</div>
				<div onClick={() => fetchStockDataByDateRange("2Y")} className={`${active=="2Y" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>2Y</div>
				<div onClick={() => fetchStockDataByDateRange("5Y")} className={`${active=="5Y" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>5Y</div>
				<div onClick={() => fetchStockDataByDateRange("All")} className={`${active=="All" ? "text-blue-600 bg-slate-200" : ""} hover:bg-slate-200 rounded-xl p-2 hover:text-blue-600`}>All</div>
			</div>
			
			<hr className="text-black border mb-3"/>

		</div>
	);
};