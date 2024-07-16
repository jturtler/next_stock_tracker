'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './data-item/StockChart';
import CurrentStockIndexes from './StockIndexList';
import CustomNavigation from './layout/CustomNavigation';

export default function HomePage() {

	return (
		<div>
			<CustomNavigation />
			<CurrentStockIndexes />
		</div>
	);
};