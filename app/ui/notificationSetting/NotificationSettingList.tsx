import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import NotificationSettingItem from './NotificationSettingItem';

interface NotificationSettingListHandles {
	handleOnUpdate: (newNotification: JSONObject[]) => void;
  }

const NotificationSettingList = forwardRef<NotificationSettingListHandles>((props, ref) => {

	const { user } = useAuth();
	const [list, setList] = useState<JSONObject[]>([]);

	// Define the handleOnUpdate function
	const handleOnUpdate = (newList: JSONObject[]) => {
		setList(newList);
	};

	// Expose the handleOnUpdate function to the parent component
	useImperativeHandle(ref, () => ({
		handleOnUpdate
	}));

	const fetchData = async () => {
		const response = await axios.get(`/api/notification-settings`, {
			params: {
				userId: user!._id
			}
		});

		if (response.status !== 200) {
			throw new Error("Error while fetching stock data.");
		}
		
		if (!response.data) {
			setList([]);
		}
		else {
			setList(Utils.cloneJSONObject(response.data.notifications));
		}
	}

	useEffect(() => {
		fetchData();
	}, []);


	return (
		<div className="flex flex-col">

			<div className="w-full overflow-x-auto"> {/* Container for handling horizontal scroll */}
				<table className="w-full bg-white"> {/* Ensure table takes up at least the full width */}
					<thead>
						<tr>
							<th className="py-2 px-4 border-b text-navy-blue text-start">Symbol</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Threshold</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">Direction</th>
							<th className="py-2 px-4 border-b text-navy-blue text-end">#</th>
						</tr>
					</thead>
					<tbody>
						{list.map((investment: any, index: number) => (
							<NotificationSettingItem data={investment} key={`item_${index}`} onDeleteSuccess={(newNotification) => handleOnUpdate(newNotification.notifications)} />
						))}
					</tbody>
				</table>
			</div>

		</div>
	);
});

// Add a display name for better debugging
NotificationSettingList.displayName = 'NotificationSettingList';

export default NotificationSettingList;