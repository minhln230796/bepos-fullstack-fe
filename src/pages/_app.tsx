import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`bg-white min-h-screen py-3 ${inter.className}`}>
      <header className="w-3/4 text-center text-slate-700 flex justify-between mx-auto">
        <Link href={"/"}>
          <h3>Demo Page</h3>
        </Link>
        <Link href="/search">Search</Link>
      </header>
      <div className="w-3/4 py-3 mx-auto">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
