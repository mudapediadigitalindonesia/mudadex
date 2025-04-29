"use client";

import { Wallet, CheckCircle } from "lucide-react";

export default function Wallets() {
  const steps = [
    {
      icon: <Wallet size={20} />,
      title: "Connect Your Wallet",
      description:
        "Connect Your wallet eg: phantom, sollet, etc. to start trading",
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Select Token and Start Trading",
      description: "Buy and sell popular Solana tokens and keep track of them.",
    },
  ];

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-34">
        {/* LEFT SIDE */}
        <div className="space-y-6 text-center lg:text-left max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Register <span>your coins now!</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base text-justify">
            List your coins and enjoy skyrocketing profit, a strong community
            and proven security. Don’t miss this opportunity!
          </p>
          <div>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition">
              Register Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          {steps.map((step, index) => (
            <div
              key={index}
              className=" rounded-xl shadow-xl p-4 flex items-center gap-4 w-full"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full">
                {step.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
