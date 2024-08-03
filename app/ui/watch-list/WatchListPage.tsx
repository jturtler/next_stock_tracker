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
		<div>
			<div className='flex flex-row w-full'>
				<WatchList />
			</div>
		
			<button className="fixed bottom-20 right-4 bg-cyan-400 text-lg rounded-full p-5 shadow-lg shadow-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400">
				<FiPlus />
			</button>

			{showAddWatchListForm && <AddWatchListForm />}
		</div>
	);
};

export default WatchListPage;