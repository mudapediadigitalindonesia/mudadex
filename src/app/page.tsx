import FloatingPhoneComp from "@/components/FloatingPhone";
import ScrollLinked from "@/components/ScrollLinked";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import { h2 } from "framer-motion/client";

export default function Home() {
  return (
    <>
      {/* hero */}
      <div className="flex justify-end right-10">
        <div className="flex h-[1003px] w-[586px] bg-blue-800">
          <FloatingPhoneComp />
        </div>
      </div>
      {/* CryptoCard */}
      <div className="p-2 text-center mt-[74px] ml-[40px]">
        <h1 className="text-[35px] font-bold"> Top 5 Crypto Assets</h1>
        <ScrollLinked />
      </div>
      {/* Exclusive Tokens */}
      <div className="p-2 text-center mt-[118px]">
        <h2 className="text-[40px] font-semibold text-sky-950">
          MudaDex Exclusive Tokens
        </h2>
        <div className="min-h-screen flex items-start justify-start ml-[106px] mt-[131px]">
          <FadeIn />
        </div>
      </div>
    </>
  );
}
