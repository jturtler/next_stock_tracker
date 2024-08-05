// components/SlideMenu.tsx
import React, { useEffect, useRef } from 'react';

interface SlideMenuProps {
	visible: boolean;
	onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ visible, onClose }) => {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (visible) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [visible, onClose]);

	return (
		<div
			ref={menuRef}
			className={`fixed top-0 right-0 h-full bg-gray-800 text-white shadow-lg transform ${visible ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-300 ease-in-out`}
			style={{ width: '250px' }}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 text-white"
			>
				&times;
			</button>
			<div className="p-4">
				<ul>
					<li><h2 className="text-lg font-semibold">Slide Menu</h2></li>
					<li className="py-2 hover:bg-gray-700 cursor-pointer">Menu Item 1</li>
					<li className="py-2 hover:bg-gray-700 cursor-pointer">Menu Item 2</li>
					<li className="py-2 hover:bg-gray-700 cursor-pointer">Menu Item 3</li>
				</ul>
			</div>
		</div>
	);
};

export default SlideMenu;
