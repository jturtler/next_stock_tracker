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


const WatchListPage: React.FC = () => {

	const [showAddWatchListForm, setShowAddWatchListForm] = useState(false);

	return (
		<div>
			<div className='flex flex-row w-full'>
				<WatchList />
			</div>
		
			<button className="bg-yellow-300 p-3 m-3" onClick={() => setShowAddWatchListForm(true)}>Add Watchlist</button>
			{showAddWatchListForm && <AddWatchListForm />}
		</div>
	);
};

export default WatchListPage;