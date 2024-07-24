export default function Footer() {
	return (
		<footer className="h-30 w-screen py-4 flex bg-gray-900 text-white text-center text-xs items-center">
			<div className="flex-grow text-center">
				<p>© 2024 Stock Index Market. All rights reserved.</p>
			</div>

			<div className="flex space-x-4">
				<div>Sign-In</div>
				<div>|</div>
				<div>Sign-Up</div>
			</div>
		</footer>
	)
}