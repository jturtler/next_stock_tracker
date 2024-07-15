'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';
import CurrentStockIndexes from './StockIndexList';
import CustomNavigation from './layout/CustomNavigation';

export default function HomePage() {

	return (
		<div className="">
			<CustomNavigation />
			<CurrentStockIndexes />
		</div>
	);
};