'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';
import CurrentStockIndexes from './StockIndexList';

export default function HomePage() {

	return (
		<div className="p-4">
			<CurrentStockIndexes />
		</div>
	);
};