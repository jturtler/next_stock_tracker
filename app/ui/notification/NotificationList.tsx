// components/Notification.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { FiPlus } from 'react-icons/fi';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import NotificationItem from './NotificationItem';


export default function NotificationList() {

	const { user } = useAuth();
	const [showAddForm, setShowAddForm] = useState(false);
	const [list, setList] = useState<JSONObject[]>([]);


	const fetchData = async () => {
		var response = await axios.get(`/api/notification?userId=${user!._id}`)
		console.log(response);
		let errMsg = "";
		if (response.statusText !== "OK") {
			errMsg = "Error while fetching stock data.";
		}
		else {
			if (response.data == null) {
				setList([]);
			}
			else {
				setList(Utils.cloneJSONObject(response.data.notifications));
			}
		}
	}


	useEffect(() => {
		fetchData();
	}, []);


	return (
		<div className="flex flex-col space-y-8">

			<div className="w-full overflow-x-auto hidden md:block"> {/* Container for handling horizontal scroll */}
				<table className="min-w-full bg-white"> {/* Ensure table takes up at least the full width */}
					<thead>
						<tr>
							<th className="py-2 px-4 border-b text-navy-blue text-start">Symbol</th>
							{/* <th className="py-2 px-4 border-b text-navy-blue text-start">Name</th> */}
							<th className="py-2 px-4 border-b text-navy-blue text-end">Threshold</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Direction</th>
						</tr>
					</thead>
					<tbody>
						{list.map((investment: any, index: number) => (
							<NotificationItem data={investment} style="large" key={`item_${index}`} />
						))}
					</tbody>
				</table>
			</div>

			{/* <!-- Divs for smaller screens --> */}
			<div className="md:hidden">
				{list.map((investment: any, index: number) => (
					<NotificationItem data={investment} style="small" key={`item_${index}`} />
				))}
			</div>

		</div>
	);
};