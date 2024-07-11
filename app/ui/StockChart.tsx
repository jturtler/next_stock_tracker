'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processStockData } from '@/lib/utils/processStockData';
import axios from 'axios';
import { JSONObject } from '@/lib/definations';

/**
 * 
 * 	Dow Jones Industrial Average (DJIA)--- Symbol: DJIA
	S&P 500--- Symbol: SPX
	NASDAQ Composite --- Symbol: IXIC
	Russell 2000--- Symbol: RUT
	S&P 100--- Symbol: OEX
	NYSE Composite--- Symbol: NYA
	FTSE 100 (UK)--- Symbol: FTSE
	DAX (Germany)--- Symbol: GDAXI
	CAC 40 (France)--- Symbol: FCHI
	Nikkei 225 (Japan)--- Symbol: N225
	Hang Seng Index (Hong Kong)--- Symbol: HSI
	Shanghai Composite Index (China)--- Symbol: SSEC
	S&P/TSX Composite (Canada)--- Symbol: GSPTSE
 *
 */
export default function StockChart({ title, symbol }: { title: string, symbol: string }) {
	const [chartData, setChartData] = useState<JSONObject[]>([]);

	const fetchStockData = async () => {
		try {
			const response = await axios.get(`/api/stock-chart-data`, {
				params: {
					"symbol": symbol,
					interval: '5min', // Change this as needed
				},
			});

			// const processedData = processStockData(response.data);
			setChartData(response.data);
		} catch (error) {
			console.error('Error fetching stock data:', error);
		} finally {
			//   setLoading(false);
		}
	};

	useEffect(() => {
		fetchStockData();
	}, []);


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