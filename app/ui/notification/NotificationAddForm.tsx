// components/PortfolioAddForm.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';

interface Notification {
	symbol: string;
	threshold: number;
	direction: string;
  }
  
  interface NotificationAddFormProps {
	existingNotification?: Notification;
	onSuccess?: (notification: Notification) => void;
  }

const NotificationAddForm: React.FC<NotificationAddFormProps> = ({ existingNotification, onSuccess }) => {

	const { user } = useAuth();
	const [stockSymbol, setStockSymbol] = useState(existingNotification?.symbol || '');
	// const [longName, setLongName] = useState(existingNotification?.longName || '');
	const [threshold, setThreshold] = useState(existingNotification?.threshold || 0);
	const [direction, setDirection] = useState(existingNotification?.direction || 'above');

	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stockSymbol) {
			setError('Please provide valid inputs.');
			return;
		}
		try {
			const response = await axios.post('/api/notification', {
				userId: user!._id,
				// notification: { symbol: stockSymbol, longName, threshold, direction },
				notification: { symbol: stockSymbol, threshold, direction },
			});

			if (onSuccess) onSuccess(response.data);

			// Clear form after submission
			setStockSymbol("");
			// setLongName("");
			setThreshold(0);
			setDirection("above");
			setError(null);

		} catch (error) {
			setError('Failed to update the notification.');
		}
	};

	useEffect(() => {
		if (existingNotification) {
			setStockSymbol(existingNotification.symbol);
			// setLongName(existingNotification.longName);
			setThreshold(existingNotification.threshold);
			setDirection(existingNotification.direction || 'above');
		}
	}, [existingNotification]);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">Stock Symbol</label>
				<input
					type="text"
					value={stockSymbol}
					onChange={(e) => setStockSymbol(e.target.value)}
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Threshold</label>
				<input
					type="number"
					value={threshold}
					onChange={(e) => setThreshold(Number(e.target.value))}
					placeholder="10"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Direction</label>
				<select
					value={direction}
					onChange={(e) => setDirection(e.target.value)}
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
				>
					<option value="above">Above</option>
					<option value="below">Below</option>
				</select>
			</div>
			{error && <p className="text-red-600">{error}</p>}
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded-md"
			>
				{existingNotification ? 'Update Notification' : 'Add Notification'}
			</button>
		</form>
	);
};

export default NotificationAddForm;