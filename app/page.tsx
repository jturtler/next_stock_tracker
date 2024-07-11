import HomePage from "./ui/HomePage";
import Footer from "./ui/layout/Footer";
import Header from "./ui/layout/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex min-h-screen flex-col">
				<HomePage />
			</main>
		</>
	)
}
