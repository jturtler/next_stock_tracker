import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import React, { useState, useEffect } from 'react';
import WatchList from './WatchList';
import AddWatchListForm from './AddWatchListForm';
import { fetchIndividualData } from '@/lib/utils/fetchStockIndexes';
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/AppStore";
import { useMainUi } from '@/contexts/MainUiContext';
import * as Constant from "@/lib/constant";
import WatchListDetails from './WatchListDetails';
import { FiPlus } from "react-icons/fi";


const WatchListPage: React.FC = () => {

	const [showAddWatchListForm, setShowAddWatchListForm] = useState(false);

	return (
		<div className="m-3">
			<h2 className="font-semibold text-2xl mb-3">
				<span className="text-navy-blue">Your Watchlist</span>
				<button className="ml-3 text-lg p-2 shadow-lg bg-pink-500 text-navy-blue hover:bg-red-500 rounded-full" onClick={() => setShowAddWatchListForm(true)}>
					<FiPlus />
				</button>
			</h2>

			<div className='w-full flex flex-row'>
				<WatchList />
			</div>
			
			{showAddWatchListForm && <AddWatchListForm />}
		</div>
	);
};

export default WatchListPage;