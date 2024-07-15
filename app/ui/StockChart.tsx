'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import axios from 'axios';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils/utils";
import ChartDateRange from './ChartDateRange';
import { format, parseISO } from 'date-fns';


export default function StockChart({ curIndexData }: { curIndexData: JSONObject }) {
	const [active, setActive] = useState("1D");
	const [chartData, setChartData] = useState<JSONObject[]>([]);

	const dateRangeList = ["1D", "7D", "1M", "3M", "6M", "9M", "1Y", "2Y", "5Y","All"];

	const fetchStockData = async (dateRange: JSONObject, interval: string | undefined, isOneDay: boolean) => {
		try {
			const response = await axios.get(`/api/stock-chart-data`, {
				params: {
					"symbol": curIndexData.symbol,
					"startDate": dateRange.startDate,
					"endDate": dateRange.endDate,
					"interval": interval
				},
			});
			
			const dataList = response.data.quotes;
			if( dataList === undefined ) {
				setChartData([]);
			}
			else if( isOneDay ) {
				setChartData( getChartDataInLatestDate( response.data.quotes ) ); 
			}
			else {
				setChartData(dataList);
			}
		} catch (error) {
			console.error('Error fetching stock data:', error);
		}
	};


	useEffect(() => {
		fetchStockDataByDateRange(active);
	}, [curIndexData.symbol]);


	const getChartDataInLatestDate = (stockData: JSONObject[]) => {
		let data = [];
		if( stockData !== undefined && stockData.length > 0 ) {
			var latestDate = stockData[0].date.split("T")[0];
			for( var i=0; i<stockData.length; i++ ) {
				if( latestDate == stockData[i].date.split("T")[0] ) {
					data.push(stockData[i]);
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
		let interval: string | undefined;
		let isOneDay = false;

		switch( rangeName ) {
			case "1D":
				dateRange = Utils.getDateRangeFromCurrentDate(5); 
				isOneDay = true;
				interval = "1m";
				break;
			case "7D":
				dateRange = Utils.getDateRangeFromCurrentDate(7); 
				interval = "1m";
				break;
			case "1M":
				dateRange = Utils.getDateRange_Months(1);
				interval = "5m";
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

	const tickFormatter = (tick: string): string => {
		// return tick.split("T")[0];

		const date = parseISO(tick);
		let label = "";
		let interval = 0;
		if( active == "1D" ) {
			return format(date, 'HH:mm');
		}
		else if( active == "7D" || active == "1M" ) {
			return format(date, 'MMM dd yyyy');
		}
		else if( active == "3M" || active == "6M" || active == "9M" ) {
			return format(date, 'MMM yyyy');
		}	
		
		return format(date, 'yyyy');
	};
	
	
	const xInterval = (): number => {

		if( active == "1D" ) {
			return 60 * 2;
		}
		else if( active == "7D" || active == "1M" ) {
			return 60 * 24;
		}
		else if( active == "3M" || active == "6M" || active == "9M" ) {
			return 30;
		}	
		
		return 360;
	};

	const getYTicks = (): string[] => {
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

			const step = Math.round(( maxTick - minTick ) / 10 );
			for( var i=minTick; i<=maxTick; i+=step ) {
				ticks.push(i.toFixed(2));
			} 

			// Remove the last item, add the "maxTick" as last item
			ticks.pop();
			ticks.push( maxTick.toFixed(2) );
		}

		return ticks;
	}

	const yTicks = getYTicks();
	

	return (
		<div className="m-3 py-10  px-3">
			<ResponsiveContainer width="100%" height={500}>
				<ComposedChart
					height={400}
					data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="45%" stopColor="#60a5fa" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#60a5fa " stopOpacity={0.2}/>
						</linearGradient>
					</defs>

					<XAxis dataKey="date" 
					axisLine={false}
					tick={false}
						// tickFormatter={tickFormatter}
						// interval={xInterval()} // Ensures every tick is displayed
						// ticks={chartData.map(item => item.date.split("T")[0])} // Ensures unique ticks for each date entry
					/>
					<YAxis
						orientation="right"
						domain={[yTicks[0], yTicks[yTicks.length - 1]]}  // Customize the vertical axis range
						tickCount={yTicks.length - 1}       // Set the number of ticks
						ticks = {yTicks}
						// tick={false}  // Hide the Y-axis labels
						axisLine={false}  // Optionally hide the Y-axis line
        				tickLine={false}  // Optionally hide the tick lines
					/>
					 <Tooltip />
					 {/* <Area type="monotone"  dataKey="low"  />
					 <Area type="monotone"  dataKey="high" />
					 <Area type="monotone"  dataKey="open" /> */}
					<Area type="monotone"  
					dataKey="close" strokeWidth={1} activeDot={{ r: 8 }}  dot={false} fill="url(#colorUv)"/>
				</ComposedChart>
			</ResponsiveContainer>

			<div className="flex flex-row space-x-6 px-3 font-semibold p-3">
				{dateRangeList.map((item, i) => (
					<ChartDateRange key={i} name={item} selected={active==item} handleOnClick={(name: string) => { fetchStockDataByDateRange(name); setActive(name);}} />
				))}
			</div>
			
			<hr className="text-black border mb-3"/>

		</div>
	);
};