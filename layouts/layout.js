import Head from "next/head";
import Link from "next/link";
import MyNavbar from "@/components/MyNavbar";
// import MyFooter from "@/components/MyFooter";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: ["700", "700"],
  subsets: ["latin"],
});

const name = "Nailed By Ingelosi is a salon that offers menicure and pedicure.";
export const siteTitle = "Ingelosi";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content={name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className}`}>
        <main>{children}</main>
        {/* <MyFooter /> */}
      </div>
    </div>
  );
}
