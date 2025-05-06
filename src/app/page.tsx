import FloatingPhoneComp from "@/components/FloatingPhone";
import ScrollLinked from "@/components/ScrollLinked";
import FadeIn from "@/components/FadeIn";
import SwipeCards from "@/components/SwipeCard";
import InfinitySlider from "@/components/InfinitySlider";
import Features from "@/components/Features";
import Wallets from "@/components/Wallets";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Background from "@/components/backgorund";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div>
        <Background />
        {/* Hero 1 */}
        <div className="fles items-start"></div>
        <Header />
        {/* Hero2 */}
        <div className="flex justify-end right-10">
          <div className="flex h-[1003px] w-[586px] bg-blue-800">
            <FloatingPhoneComp />
          </div>
        </div>
        {/* CryptoCard */}
        <div className="p-2 text-center mt-[74px] ml-[40px]">
          <h1 className="text-[35px] font-bold text-sky-950">
            {" "}
            Top 5 Crypto Assets
          </h1>
          <ScrollLinked />
        </div>
        {/* Exclusive Tokens */}
        <div className="p-2 text-center mt-[118px]">
          <h2 className="text-[40px] font-semibold text-sky-950">
            MudaDex Exclusive Tokens
          </h2>
          {/* FadeIn */}
          <div className="flex items-start ml-[106px] mt-[131px]">
            <FadeIn />
            {/* SwipeCard */}
            <div className="flex items-center justify-center p-4 w-[700px] h-[200px] ml-auto">
              <SwipeCards />
            </div>
          </div>
        </div>
        {/* InfinitySlider */}
        <div className="p-2 text-center">
          <h3 className="text-[40px] font-bold text-sky-950">
            Token Trending on SOLANA
          </h3>
          <div className="mt-[93px]">
            <InfinitySlider />
          </div>
        </div>
        {/* Features */}
        <div className="p-2 text-center mt-[131px]">
          <h4 className="text-[36px] font-bold text-sky-950">
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
