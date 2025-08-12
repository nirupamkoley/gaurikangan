import { useRouter } from "next/router";
import Header from "@/pages/components/Header";

import { useEffect } from 'react';

import Footer from "@/pages/components/Footer";
import SmallFooter from "@/pages/components/SmallFooter";
import '@/styles/slick.css';
import '@/styles/slick-theme.css';
// import '@/styles/style.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route matches /shop or /shop/category/*
  const isShopPage = router.pathname === "/shop" || router.pathname.startsWith("/shop/category") || router.pathname === "/search";





   
  useEffect(() => {
      const loadScript = (src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      };
  
      // loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
      // loadScript('/engine1/script.js');
      loadScript('/assets/js2/jquery.min.js');
      loadScript('/assets/js2/owl.carousel.min.js');
      loadScript('/assets/js2/customize.js');
      loadScript('/assets/js2/customize-footer-js.js');


    }, []);
  return (
    <>
    <link rel="stylesheet" href="/assets/css2/owl.carousel.min.css" />
    <link rel="stylesheet" type="text/css" href="/assets/css2/style.css" /> 
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      {isShopPage ? <SmallFooter /> : <Footer />}
    </>
  );
}
