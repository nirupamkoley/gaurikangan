import { useRouter } from "next/router";
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";
import SmallFooter from "@/pages/components/SmallFooter";



import '@/styles/slick.css';
import '@/styles/slick-theme.css';
import '@/styles/style.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route matches /shop or /shop/category/*
  const isShopPage = router.pathname === "/shop" || router.pathname.startsWith("/shop/category") || router.pathname === "/search";

  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      {isShopPage ? <SmallFooter /> : <Footer />}
    </>
  );
}
