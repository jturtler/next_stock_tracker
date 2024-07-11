'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';
import CurrentStockIndexes from './CurrentStockIndexes';

export default function HomePage() {

	return (
		<div className="p-4">
			<CurrentStockIndexes />
			<div className="mx-auto p-4">
			
				<div className="grid gap-4 mb-5">
					<div className="rounded-lg p-4 shadow-md">
						<StockChart title="International Business Machines Corporation" symbol="IBM"/>
					</div>

					{/* <div className="bg-white shadow-md rounded-lg p-4 mb-6">
						<StockChart title="IBM Stock Index" symbol="IBM"/>
					</div> */}
				</div>
			</div>
		</div>
	);
};