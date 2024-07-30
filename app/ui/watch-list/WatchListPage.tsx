import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import React, { useState, useEffect } from 'react';
import WatchList from './WatchList';
import SearchStock from '../stock-index-list/SearchStock';
import AddWatchListForm from './AddWatchListForm';


const WatchListPage: React.FC = () => {
	
	const { user } = useAuth();

	const getWatchListGroupNames = (): string[] => {
		if( user != null ) {
			return Object.keys( user.watchlist );
		}

		return [];
	}
	
	const getInitWatchListGroupName = () => {
		const nameList = getWatchListGroupNames();
		return nameList.length == 0 ? "" : nameList[0];
	}

	const [watchlist, setWatchlist] = useState<JSONObject[]>([]);
	const [availableStocks, setAvailableStocks] = useState<JSONObject[]>([]);
	const [selectedStock, setSelectedStock] = useState<string>('');
	const [showAddWatchListForm, setShowAddWatchListForm] = useState(false);


	// const { watchlistByGroup, isLoading } = useWatchList( getInitWatchListGroupName() );

	useEffect(() => {
		// const savedWatchlist = localStorage.getItem('watchlist');
		// if (savedWatchlist) {
		// 	setWatchlist(JSON.parse(savedWatchlist));
		// }

		setAvailableStocks([
			{ symbol: 'AAPL', name: 'Apple Inc.', price: 150 },
			{ symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800 },
		]);
	}, []);


	// useEffect(() => {
	// 	// Fetch real-time prices
	// 	const updatePrices = async () => {
	// 		const updatedWatchlist = await Promise.all(userWatchList.map(async (stock) => {
	// 			const price = await fetchIndividualData(stock.symbol);
	// 			return { ...stock, price };
	// 		}));
	// 		setWatchlist(updatedWatchlist);
	// 	};

	// 	updatePrices();
	// }, [userWatchList]);


	const removeStockFromWatchlist = (symbol: string) => {
		const updatedWatchlist = watchlist.filter(s => s.symbol !== symbol);
		setWatchlist(updatedWatchlist);
		localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
	};

	return (
		<div>
			<h2>Watch List</h2>

			<WatchList handleItemClick={(groupItem) => {} }/>

			<button className="bg-orange-400 p-3 rounded-lg m-3" onClick={() => setShowAddWatchListForm(true)}>Add Watchlist</button>
			{showAddWatchListForm && <AddWatchListForm />}
		</div>
	);
};

export default WatchListPage;
