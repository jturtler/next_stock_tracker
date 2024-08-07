// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import usePortfolio from '@/lib/hooks/updatePortfolio';
import { FiPlus } from 'react-icons/fi';
import UpdatePortfolioForm from './UpdatePortfolioForm';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import { useQuery } from 'react-query';
import PortfolioItem from './PortfolioItem';


export default function PortfolioList() {

	const { user } = useAuth();
	const [showAddForm, setShowAddForm] = useState(false);
	const [list, setList] = useState<JSONObject[]>([]);


	const fetchData = async () => {
		var response = await axios.get(`/api/portfolio?userId=${user!._id}`)
		console.log(response);
		let errMsg = "";
		if (response.statusText !== "OK") {
			errMsg = "Error while fetching stock data.";
		}
		else {
			if (response.data == null) {
				setList([]);
			}
			else {
				const investments = response.data.investments;
				const symbols = investments.map((item: JSONObject) => item.symbol);
				const currentPricesResponse = await axios.get(`/api/stock-index`, {
					params: {
						symbols: symbols.join(",")
					},
				});

				for (var i = 0; i < investments.length; i++) {
					const item = investments[i];
					const foundCurrentPrice = Utils.findFromArray(currentPricesResponse.data, item.symbol, "symbol")!;

					item.longName = foundCurrentPrice.longName;
					item.investmentValue = item.quantity * item.purchasePrice;
					item.currentValue = item.quantity * foundCurrentPrice.regularMarketPrice;
				}

				setList(Utils.cloneJSONObject(investments));
			}
		}
	}


	const calculatePerformance = (portfolio: JSONObject[]): JSONObject => {
		let totalInvestment = 0;
		let currentValue = 0;

		portfolio.forEach((item) => {
			totalInvestment += item.investmentValue;
			currentValue += item.currentValue;
		});

		return {
			totalInvestment,
			currentValue,
			profitLoss: currentValue - totalInvestment,
		};
	};

	useEffect(() => {
		fetchData();
	}, []);


	const data = calculatePerformance(list);

	return (
		<div className="flex flex-col space-y-3">

			<div className="w-64">
				<div className="flex justify-between">
					<span className="text-gray-700">Total Investment:</span>
					<span className="font-semibold text-navy-blue">{Utils.formatDisplayNumber(data?.totalInvestment)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-700">Current Value:</span>
					<span className="font-semibold text-navy-blue">{Utils.formatDisplayNumber(data?.currentValue)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-700">Profit/Loss:</span>
					<span className={`font-semibold text-navy-blue ${data?.profitLoss > 0 ? "text-green-600" : "text-red-600"}`}>{Utils.formatDisplayNumber(data?.profitLoss)}</span>
				</div>
			</div>

			<div className="w-full overflow-x-auto hidden md:block"> {/* Container for handling horizontal scroll */}
				<table className="min-w-full bg-white"> {/* Ensure table takes up at least the full width */}
					<thead>
						<tr>
							<th className="py-2 px-4 border-b text-navy-blue text-start">Symbol</th>
							<th className="py-2 px-4 border-b text-navy-blue text-start">Name</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Investment Value</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Current Value</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Profit/Loss</th>
						</tr>
					</thead>
					<tbody>
						{list.map((investment: any, index: number) => (
							<PortfolioItem data={investment} style="large" key={`item_${index}`} />
						))}
					</tbody>
				</table>
			</div>

			{/* <!-- Divs for smaller screens --> */}
			<div className="md:hidden">
				{list.map((investment: any, index: number) => (
					<PortfolioItem data={investment} style="small" key={`item_${index}`} />
				))}
			</div>

		</div>
	);
};