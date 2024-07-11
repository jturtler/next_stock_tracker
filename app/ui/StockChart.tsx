'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils/utils";


export default function StockChart({ title, symbol }: { title: string, symbol: string }) {
	const [chartData, setChartData] = useState<JSONObject[]>([]);

	console.log("fasdfdas");
	const fetchStockData = async () => {
		try {
			const response = await axios.get(`/api/stock-chart-data`, {
				params: {
					"symbol": symbol,
					"startDate": Utils.get7DaysFromCurrentDate().startDate
				},
			});
console.log(response);
			setChartData(response.data.quotes);
		} catch (error) {
			console.error('Error fetching stock data:', error);
		}
	};

	useEffect(() => {
		fetchStockData();
	}, [symbol]);


	return (
		<div>
			<h2>{title}</h2>
			<ResponsiveContainer width="100%" height={500}>
				<LineChart
					// width={1000}
					height={500}
					data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					 <Tooltip />
					{/* <Legend /> */}
					<Line type="monotone" dataKey="close" stroke="green" strokeWidth={1} activeDot={{ r: 8 }}  dot={false} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};