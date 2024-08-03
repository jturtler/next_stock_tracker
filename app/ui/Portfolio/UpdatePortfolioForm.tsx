// components/PortfolioAddForm.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';

interface Investment {
	stockSymbol: string;
	quantity: number;
	purchasePrice: number;
}

interface UpdatePortfolioFormProps {
	existingInvestment?: Investment;
	onSuccess?: (portfolio: JSONObject) => void; // Callback to refresh the portfolio or show a success message
}

const PortfolioAddForm: React.FC<UpdatePortfolioFormProps> = ({ existingInvestment, onSuccess }) => {
	const { user } = useAuth();
	const [stockSymbol, setStockSymbol] = useState(existingInvestment?.stockSymbol || '');
	const [quantity, setQuantity] = useState(existingInvestment?.quantity || 0);
	const [purchasePrice, setPurchasePrice] = useState(existingInvestment?.purchasePrice || 0);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stockSymbol || quantity <= 0 || purchasePrice <= 0) {
			setError('Please provide valid inputs.');
			return;
		}
		try {
			const response = await axios.post('/api/portfolio', {
				userId: user!._id,
				investment: { symbol: stockSymbol, quantity, purchasePrice },
			});

			if (onSuccess) onSuccess(response.data);

			// Clear form after submission
			setStockSymbol('');
			setQuantity(0);
			setPurchasePrice(0);
			setError(null);

		} catch (error) {
			setError('Failed to update the portfolio.');
		}
	};

	useEffect(() => {
		if (existingInvestment) {
			setStockSymbol(existingInvestment.stockSymbol);
			setQuantity(existingInvestment.quantity);
			setPurchasePrice(existingInvestment.purchasePrice);
		}
	}, [existingInvestment]);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">Stock Symbol</label>
				<input
					type="text"
					value={stockSymbol}
					onChange={(e) => setStockSymbol(e.target.value)}
					placeholder="AAPL"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Quantity</label>
				<input
					type="number"
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					placeholder="10"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Purchase Price</label>
				<input
					type="number"
					step="0.01"
					value={purchasePrice}
					onChange={(e) => setPurchasePrice(Number(e.target.value))}
					placeholder="150.00"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				/>
			</div>
			{error && <p className="text-red-600">{error}</p>}
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded-md"
			>
				{existingInvestment ? 'Update Investment' : 'Add Investment'}
			</button>
		</form>
	);
};

export default PortfolioAddForm;
