// components/Notification.tsx
import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { FiPlus } from 'react-icons/fi';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import { useQuery } from 'react-query';
import NotificationList from './NotificationList';
import NotificationAddForm from './NotificationAddForm';


export default function NotificationPage() {

	const notificationListRef = useRef<any>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	
	const onUpdateList = (newNotification: JSONObject) => {
		if (notificationListRef.current) {
			// const newNotification: JSONObject = { id: '1', message: 'New notification from parent' };
			notificationListRef.current.handleOnUpdate(newNotification.notifications);
		}
	}

	return (
		<div className="m-3">
				<h2 className="text-2xl font-semibold mb-3">
				<span className="text-navy-blue">Your Notifications</span>
				<button className="ml-3 text-lg p-2 shadow-lg bg-pink-500 hover:bg-red-500 rounded-full" onClick={() => setShowAddForm(true)} >
					<FiPlus />
				</button>
			</h2>
			<div className="p-2">
				<NotificationList ref={notificationListRef} />
			</div>

			{showAddForm && <NotificationAddForm onSuccess={(newNotification) => onUpdateList(newNotification) } />}
		</div>
	);
};