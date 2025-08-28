import FloatingPhoneComp from "@/components/FloatingPhone";
import ScrollLinked from "@/components/ScrollLinked";
import SwipeWithFade from "@/components/SwipeWithFade";
import InfinitySlider from "@/components/InfinitySlider";
import Features from "@/components/Features";
import Wallets from "@/components/Wallets";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Background from "@/components/backgorund";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <Background />
        {/* Header */}
        {/* Hero 1 */}
        <div className="flex items-start ml-[106px]">
          <Hero />
          {/* Hero2 */}
          <div className="flex justify-end right-10">
            <div className="flex w-[300px]">
              <FloatingPhoneComp />
            </div>
          </div>
        </div>
        {/* CryptoCard */}
        <div className="p-2 text-center mt-[74px] ml-[40px]">
          <h1 className="text-[35px] font-bold text-blue-50 dark:text-zinc-950">
            {" "}
            Top 5 Crypto Assets
          </h1>
          <ScrollLinked />
        </div>
        {/* Exclusive Tokens */}
        <div className="p-2 text-center mt-[118x]">
          <h2 className="text-[40px] font-semibold text-blue-50 dark:text-zinc-950">
            MudaDex Exclusive Tokens
          </h2>
          {/* FadeIn SwipeCard*/}

          <div className="flex items-start ml-[106px] mt-[131px]">
            <SwipeWithFade />
          </div>
        </div>
        {/* InfinitySlider */}
        <div className="p-2 text-center">
          <h3 className="text-[40px] font-bold text-blue-50 dark:text-zinc-950">
            Token Trending on SOLANA
          </h3>
          <div className="mt-[93px]">
            <InfinitySlider />
          </div>
        </div>
        {/* Features */}
        <div className="p-2 text-center mt-[131px]">
          <h4 className="text-[36px] font-bold text-blue-50 dark:text-zinc-950">
            MUDADEX AMAZING FEATURES
          </h4>
          <div className="mt-[79px]">
            <Features />
          </div>
        </div>
        {/* Wallets */}
        <div>
          <Wallets />
        </div>
        {/* FAQ */}
        <div>
          <FAQ />
        </div>
        {/* Footer */}
        <div className="mt-[79px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
