import Head from "next/head";
import Link from "next/link";
import MyNavbar from "@/components/MyNavbar";
// import MyFooter from "@/components/MyFooter";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: ["700", "700"],
  subsets: ["latin"],
});

const name = "Mindful Solutions brings to you the next wave of nails and beauty services.";
export const siteTitle = "Mindful Sol.";

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
