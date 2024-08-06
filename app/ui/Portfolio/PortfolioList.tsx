// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import usePortfolio from '@/lib/hooks/updatePortfolio';
import { FiPlus } from 'react-icons/fi';
import PortfolioAddForm from './UpdatePortfolioForm';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";


const PortfolioList = () => {

    const [showAddForm, setShowAddForm] = useState(false);
    const { user } = useAuth();

    const [list, setList] = useState<JSONObject[]>([]);

    const fetchData = async() => {
        var response = await axios.get(`/api/portfolio?userId=${user!._id}`)
        console.log(response);
        let errMsg = "";
        if( response.statusText !== "OK" ) {
            errMsg = "Error while fetching stock data.";
        }
        else {
            if(response.data == null ) {
                setList([]);
            }
            else {
                setList(Utils.cloneJSONObject(response.data.investments));
            }
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    // if (errMsg) return <div>Failed to load. {errMsg}</div>;
    // if (isLoading) return <div>Loading...</div>;


    const onUpdateList = (newPortfolio: JSONObject) => {
        setList(newPortfolio.investments);
    } 


    return (
        <div className="m-3">
            <h2 className="text-2xl font-semibold mb-3">
                Your Portfolio
                <button className="ml-3 text-lg p-2 bg-gold text-navy-blue hover:bg-yellow-600 rounded-full focus:outline-none focus:ring-2 shadow-lg shadow-slate-400" onClick={() => setShowAddForm(true)} >
					<FiPlus />
				</button>
            </h2>
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {list.map((investment: any, index: number) => (
                    <div className="p-2 border-b-2 flex space-x-3 items-center" key={index}>
                        <div className="px-3 py-1 bg-black text-white w-fit rounded-md">{investment.symbol}</div>
                        <div><span className="font-semibold">{investment.quantity}</span> shares at <span className="font-semibold">${investment.purchasePrice}</span></div>
                    </div>
                ))}
            </div>

            {showAddForm && <PortfolioAddForm onSuccess={(newPortfolio) => onUpdateList(newPortfolio) } />}
        </div>
    );
};

export default PortfolioList;
