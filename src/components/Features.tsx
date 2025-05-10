"use client";

import { LineChart, ShieldCheck, Bitcoin, BookText } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <LineChart size={20} />,
      title: "Manage Portfolio",
      description:
        "Buy and sell popular digital currencies, keep track of them in the one place.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Protected Securely",
      description:
        "All cash balances are covered by FDIC insurance, up to a maximum of $250,000.",
    },
    {
      icon: <Bitcoin size={20} />,
      title: "Cryptocurrency Variety",
      description:
        "Supports a variety of the most popular digital currencies and always up-to-date.",
    },
    {
      icon: <BookText size={20} />,
      title: "Learn Best Practice",
      description:
        "Easy to know how cryptocurrency works and friendly to newbie.",
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[101px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-start space-y-4"
          >
            <div className="w-12 h-12 ms-0 flex items-center justify-center bg-indigo-600 text-neutral-400 rounded-full text-xl">
              {feature.icon}
            </div>

            <h3 className="font-semibold text-sm">{feature.title}</h3>
            <p className="text-xs dark:text-neutral-400 text-gray-900 text-justify">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
