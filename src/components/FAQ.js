"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What cryptocurrencies are supported on Mudadex?",
    answer:
      "Mudadex supports a wide range of cryptocurrencies, including popular assets like Bitcoin (BTC), Ethereum (ETH), XRP, and US Dollar Tether (USDT) as well as emerging altcoins and stablecoins. You can explore over 80 different assets on our platform.",
  },
  {
    question: "What cryptocurrencies are supported on Mudadex?",
    answer:
      "This is a placeholder for the second answer. You can replace this with real content.",
  },
  {
    question: "What are the transaction fees on Mudadex?",
    answer:
      "This is a placeholder for the fee information. You can customize this with actual fee details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-[40px] font-bold text-center text-sky-950 mb-6">
        Questions? We’ve got answer
      </h2>

      {faqs.map((faq, index) => (
        <div key={index} className="border-t border-gray-200">
          <button
            className="w-full text-left py-4 flex justify-between items-center font-semibold text-gray-800"
            onClick={() => toggle(index)}
          >
            {faq.question}
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
