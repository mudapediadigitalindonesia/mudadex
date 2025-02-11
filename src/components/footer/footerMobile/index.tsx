import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FooterMobile = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>More about NusaDex</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              About Us
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Careers
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Contact Us
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Terms Of Service
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Privacy Notice
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Disclosures
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Whistleblower Notice
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Law Enforcement
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              NusaDex App
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Products</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy Crypto
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              P2P Trading
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Convert
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Trade
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Earn
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              OKTC
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              OKX Wallet
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Web3 Marketplace
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Crypto Calculator
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Trading Bots
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              All Cryptocurrencies
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Learn
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              TradingView
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Services</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Affilliate
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              V5 API
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Historical market data
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Fee schedule
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Listing application
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              P2P Merchant application
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Support</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Support center
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Channel verification
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Annoncements
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Connect with NusaDex
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Buy Crypto</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy USDC
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy Bitcoin
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy Ethereum
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy ADA
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy Solana
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy MATIC
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy Litecoin
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Buy XRP
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Crypto calculator</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              BTC to USD
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              ETH to USD
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              USDT to USD
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              SOL to USD
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              XRP to USD
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Trade</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              BTC USDC
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              ETH USDC
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              BTC USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              ETH USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              MATIC USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              LTC USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              SOL USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              XRP USDT
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Bitcoin price
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Ethereum price
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Cardano price
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              Solana price
            </Link>
            <Link
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              href={""}
            >
              XRP price
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FooterMobile;
