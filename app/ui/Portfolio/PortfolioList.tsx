// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import usePortfolio from '@/lib/hooks/updatePortfolio';
import { FiPlus } from 'react-icons/fi';
import PortfolioAddForm from './UpdatePortfolioForm';
import { JSONObject } from '@/lib/definations';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const PortfolioList = () => {

    const [showAddForm, setShowAddForm] = useState(false);
    const { user } = useAuth();

    const { portfolioList, isLoading, errMsg } = usePortfolio(user!._id);
    const [list, setList] = useState<JSONObject[]>([]);

    useEffect(() => {
        setList(portfolioList);
    },[portfolioList]);

    if (errMsg) return <div>Failed to load. {errMsg}</div>;
    if (isLoading) return <div>Loading...</div>;


    const onUpdateList = (newPortfolio: JSONObject) => {
        setList(newPortfolio.investments);
    }

    return (
        <div className="m-3">
            <h2 className="text-2xl font-semibold">Your Portfolio</h2>
            <ul>
                {list.map((investment: any, index: number) => (
                    <li key={index}>
                        {investment.symbol} - {investment.quantity} shares at ${investment.purchasePrice}
                    </li>
                ))}
            </ul>

            <button className="fixed bottom-20 right-4 bg-cyan-400 text-lg rounded-full p-5 shadow-lg shadow-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" onClick={() => setShowAddForm(true)}>
				<FiPlus />
			</button>

            {showAddForm && <PortfolioAddForm onSuccess={(newPortfolio) => onUpdateList(newPortfolio) } />}
        </div>
    );
};

export default PortfolioList;
