import FloatingPhoneComp from "@/components/FloatingPhone";
import ScrollLinked from "@/components/ScrollLinked";
import Image from "next/image";

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

      <ScrollLinked />
    </>
  );
}
