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
        console.log("============= newPortfolio");
        console.log(newPortfolio);

        setList(newPortfolio.investments);
    } 


    return (
        <div className="m-3">
            <h2 className="text-2xl font-semibold">Your Portfolio</h2>
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {list.map((investment: any, index: number) => (
                    <div className="p-2 border-b-2 flex space-x-3 items-center" key={index}>
                        <div className="px-3 py-1 bg-black text-white w-fit rounded-md">{investment.symbol}</div>
                        <div><span className="font-semibold">{investment.quantity}</span> shares at <span className="font-semibold">${investment.purchasePrice}</span></div>
                    </div>
                ))}
            </div>

            <button className="fixed bottom-20 right-4 bg-cyan-400 text-lg rounded-full p-5 shadow-lg shadow-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" onClick={() => setShowAddForm(true)}>
				<FiPlus />
			</button>

            {showAddForm && <PortfolioAddForm onSuccess={(newPortfolio) => onUpdateList(newPortfolio) } />}
        </div>
    );
};

export default PortfolioList;
