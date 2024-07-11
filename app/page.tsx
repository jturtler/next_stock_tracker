import HomePage from "./ui/HomePage";
import Footer from "./ui/layout/Footer";
import Header from "./ui/layout/Header";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //  <HomePage />
    // </main>

<main >
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-green-50">
          {/* <div className="overflow-y-auto"> */}
            <HomePage />
          {/* </div> */}
        </main>
        <Footer />
      </div>
</main>
  );
}
