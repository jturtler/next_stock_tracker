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
import PortfolioList from './PortfolioList';


export default function PortfolioPage() {

	const [showAddForm, setShowAddForm] = useState(false);
	// const { user } = useAuth();

	// const [list, setList] = useState<JSONObject[]>([]);
	// const [currentPrices, setCurrentPrices] = useState<JSONObject[]>([]);


	const onUpdateList = (newPortfolio: JSONObject) => {
		// setList(newPortfolio.investments);
	}

	return (
		<div className="m-3">
				<h2 className="text-2xl font-semibold mb-3">
				<span className="text-navy-blue">Your Portfolio</span>
				<button className="ml-3 text-lg p-2 shadow-lg bg-pink-500 hover:bg-red-500 rounded-full" onClick={() => setShowAddForm(true)} >
					<FiPlus />
				</button>
			</h2>
			<div className="p-2">
				<PortfolioList />
			</div>

			{showAddForm && <UpdatePortfolioForm onSuccess={(newPortfolio) => onUpdateList(newPortfolio) } />}
		</div>
	);
};