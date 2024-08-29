/** The login page for user authentication. Contains the LoginForm component. */

"use client";

import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/lib/constant';
import * as Utils from "@/lib/utils";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {

	const { setMainPage } = useMainUi();
	const { user, login, loading, error } = useAuth();

	const [email, setEmail] = useState("test1@gmail.com");
	const [password, setPassword] = useState("1234");


	useEffect(() => {
		if (user != null) {
			setMainPage( Constant.UI_PAGE_HOME );
		}
	}, [user])

	const handleLoginBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		login(email, password);
	};


	return (
		<div className="max-w-md mx-auto p-8">
			<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

			<div className="mb-4">
				<label
					className="block text-xs font-medium text-gray-900"
					htmlFor="email"
				>
					Email
				</label>
				<div className="relative">
					<input
						className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
						id="email"
						type="email"
						name="email"
						value={email}
						placeholder="Enter your email"
						required
						onChange={(e) => { setEmail(e.target.value) }}
					/>
					<CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
				</div>
			</div>
			<div className="mb-4">
				<label
					className="block text-xs font-medium text-gray-900"
					htmlFor="password"
				>
					Password
				</label>
				<div className="relative">
					<input
						className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
						id="password"
						type="password"
						name="password"
						placeholder="Enter password"
						value={password}
						required
						minLength={4}
						onChange={(e) => { setPassword(e.target.value) }}
					/>
					<IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				</div>
			</div>

			<div className="flex justify-between space-x-4">
				<button className="flex flex-row bg-gold px-4 py-2 rounded hover:bg-yellow-600" style={{ width: "45%" }} onClick={(e) => handleLoginBtn(e)} >
					<span className="flex-1">Log in</span>
					{loading && <FaSpinner className="ml-auto h-5 text-gray-50" size={20} />}
					{/* <FaSpinner className="ml-auto h-5 text-gray-50" size={20} />  */}
				</button>

				<button onClick={() => setMainPage(Constant.UI_PAGE_AUTH_REGISTRATION )} className="grid-cols-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" style={{ width: "45%" }}>
				Sign-Up
				</button>
			</div>
			<div className="flex h-8 items-end space-x-1">
				{error != null && <p>{error}</p>}
			</div>


		</div>
	);
}
