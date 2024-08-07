import { JSONObject } from '@/lib/definations';
import React, { useState } from 'react';

export default function DropdownButton({ name, options, handleItemClick }: { name: string, options: JSONObject[], handleItemClick: (option: JSONObject) => void }) {
	// State to manage dropdown visibility
	const [isOpen, setIsOpen] = useState(false);

	// Toggle the dropdown visibility
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={toggleDropdown}
				className="px-4 py-2 bg-gold text-black rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
			>
				{name}
			</button>
			{/* Dropdown menu */}
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
					<ul className="py-1">
						{options.map((item, idx) => (
							<li key={`opt_${idx}`}>
								<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => handleItemClick(item)} >
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};