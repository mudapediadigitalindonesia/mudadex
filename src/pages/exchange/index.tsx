'use client'

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/router";
import Head from "next/head";

const ExhangePags = () => {
  const [activeTab, setActiveTab] = useState("exchange");
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>Nusadex - List Your Token with Ease Today!</title>
        <meta name='description' content='Showcase your token to a wider audience with Nusadex. Start listing now and expand your reach in the growing crypto market.' key={'desc'} />
        <meta property='og:description' content='Showcase your token to a wider audience with Nusadex. Start listing now and expand your reach in the growing crypto market.' />
        <meta property='og:description' content='Showcase your token to a wider audience with Nusadex. Start listing now and expand your reach in the growing crypto market.' />
      </Head>
      <div className={`${pathname === '/exchange' && 'max-w-screen-xl mx-auto'} lg:pt-5 pt-8 space-y-16`}>
        <div className="flex justify-between lg:flex-row flex-col lg:gap-0 gap-5 items-center w-full lg:max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-10 lg:w-1/2 w-full lg:items-start items-center">
            <div className="lg:space-y-1 space-y-3">
              <h1 className="font-bold lg:text-5xl lg:leading-tight lg:text-start md:text-4xl md:leading-snug md:text-start text-5xl leading-[1.3] text-center ">
                List your Solana Tokens on NusaDex and seize New opportunities.
              </h1>
              <p className="text-muted-foreground lg:text-lg text-xl lg:text-start text-center">
                Safe and trusted platform for smooth crypto trading
              </p>
            </div>
            <div className="items-start">
              <Link href="/exchange/token-listing">
                <Button variant={"default"} size={'lg'}>
                  List Now!
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <img src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190788/Project/llkl6llrplkyvqkmfpb8.png" alt="Pavo Logo" className="w-24 h-24 object-cover" />
              <img src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190782/Project/ti0ywmjnxvjtdjgcjau0.png" alt="DBI Logo" className="w-24 h-24 object-contain" />
              <img src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190787/Project/gyqt0uki2q9riusoe0gf.png" alt="Mudapedia Logo" className="w-24 h-24 object-fill" />
            </div>
          </div>
          <div className="w-1/2 hidden justify-end lg:flex">
            <img className="w-[300px] h-auto" src="https://res.cloudinary.com/dwehtizb5/image/upload/v1736311675/nusadex/odnkqqn1dcgo9akupfig.svg" alt="Mockup" />
          </div>
        </div>
        <div className="items-center flex flex-col lg:py-20">
          <div className="text-center flex flex-col lg:gap-8 md:gap-8 gap-4">
            <h2 className="font-bold lg:text-5xl md:text-3xl text-2xl text-center capitalize">
              Trade like a pro level up your crypto
            </h2>
            <p className="opacity-70 text-base lg:text-lg md:text-lg">
              Enjoy the lowest fees, instant transactions, robust APIs, and much more
            </p>
          </div>
          <div className="lg:py-14 md:py-14 py-7">
            <img
              src="https://res.cloudinary.com/dwehtizb5/image/upload/v1736311673/nusadex/jrkqdfv0yf8bu0is2kne.svg"
              alt="laptop"
              className="w-[750px] h-auto"
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col-reverse items-center py-20">
          <div>
            <Image
              src={activeTab === "exchange" ? "/swap.png" : "/web3.png"}
              alt={
                activeTab === "exchange"
                  ? "Crypto exchange swap"
                  : "Web3 interface"
              }
              width={300}
              height={614}
              className="w-[300px] h-[614px] object-cover lg:ml-[204px]"
            />
          </div>
          <div className="lg:ml-[102px] lg:text-start text-center">
            <h2 className="font-bold lg:text-5xl md:text-3xl text-2xl leading-snug">
              One Web. Unlimited <br />
              possibilities.
            </h2>
            <div className="lg:py-12 md:py-6 py-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="lg:w-[400px] md:w-[400px] w-[310px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="exchange"
                    className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]"
                  >
                    Exchange
                  </TabsTrigger>
                  <TabsTrigger
                    value="web3"
                    className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]"
                  >
                    Web3
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="exchange">
                  <p className="mt-4">
                    New to crypto? No problem. Buy crypto for as little as $5 in a
                    tap, and grow your skills as you go.
                  </p>
                </TabsContent>
                <TabsContent value="web3">
                  <p className="mt-4">
                    Explore the world of Web3. Connect your wallet and interact
                    with decentralized applications seamlessly.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="items-center flex flex-col lg:py-20 md:py-20 py-10">
          <div className="text-center flex flex-col lg:gap-8 md:gap-8 gap-4">
            <h2 className="font-bold lg:text-5xl text-3xl lg:block hidden">
              We're here to support you every step
            </h2>
            <h2 className="font-bold lg:hidden block md:text-3xl text-2xl">
              Style for everyone.
            </h2>
            <p className="lg:text-lg lg:block md:text-lg hidden">
              From your initial crypto trade to your first NFT buy, we'll be here
              to assist you every step of the way. No question is too simple,
              <br /> and no more restless nights. Trust in your crypto journey
              with confidence.
            </p>
            <p className="lg:text-lg block lg:hidden">
              Switch seamlessly between trading, DeFi, and NFTs in one platform.
            </p>
          </div>
          <div className="py-14 lg:flex justify-around items-center">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190794/Project/wftgqezh3asmsjnjp8sb.png"
                alt="step"
                className="w-[200px] h-auto"
              />
              <p>Take a step</p>
            </div>
            <div className="text-center lg:rotate-180 rotate-90 ">
              <img
                src="https://res.cloudinary.com/doqmudewb/image/upload/v1733192723/Project/xwnqc5mbts4tlhojrhqo.png"
                alt="line"
                className="w-[200px] h-auto"
              />
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190786/Project/ryh5ncfdcimsyd4dpoy0.png"
                alt="earn"
                className="w-[200px] h-auto"
              />
              <p>Earn</p>
            </div>
            <div className="text-center lg:rotate-180 rotate-90">
              <img
                src="https://res.cloudinary.com/doqmudewb/image/upload/v1733192723/Project/xwnqc5mbts4tlhojrhqo.png"
                alt="line"
                className="w-[200px] h-auto"
              />
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/doqmudewb/image/upload/v1733190797/Project/t5mvuukwy3iambp9johm.png"
                alt="complete"
                className="w-[200px] h-auto"
              />
              <p>Complete</p>
            </div>
          </div>
        </div>
        <div className="py-20 w-full">
          <div className="lg:flex">
            <div className="flex flex-col lg:gap-8 md:gap-8 gap-4 lg:text-start md:text-center text-center">
              <h2 className="font-bold lg:text-5xl md:text-3xl text-2xl">
                What is NusaDex?
              </h2>
              <p className="lg:text-lg md:text-lg text-base">
                Discover why we’re your ultimate crypto app, backed by our
                world-class partners to provide the best experience.
              </p>
              <div>
                <Link href="/">
                  <Button
                    className="border rounded-full bg-foreground/100 text-black p-7 text-lg font-medium"
                    variant={"nusadex"}
                  >
                    Find out
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:pt-36 md:pt-36 pt-20">
              <img src="/logo-nusadex-text.svg" alt="Logo" />
            </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 py-14">
            <div>
              <video
                src="https://res.cloudinary.com/doqmudewb/video/upload/v1733211253/Project/kyyz3fnskdlerfq4si8n.mp4"
                controls={true}
                loop={true}
              ></video>
              <div className="text-start p-2">
                <p className="font-medium text-xl">Reading Candlestick Charts</p>
                <p>Understand bullish, bearish and reversal patterns</p>
              </div>
            </div>
            <div className="">
              <video
                src="https://res.cloudinary.com/doqmudewb/video/upload/v1733190867/Project/n6r5vsue5je7coei23ns.mp4"
                controls={true}
                loop={true}
              ></video>
              <div className="text-start p-2">
                <p className="font-medium text-xl">Rewrite the system</p>
                <p>Welcome to Web3</p>
              </div>
            </div>
            <div className="">
              <video
                src="https://res.cloudinary.com/doqmudewb/video/upload/v1733191289/Project/dxx617jvxodpm4zfx7ov.mp4"
                controls={true}
                loop={true}
              ></video>
              <div className="text-start p-2 ">
                <p className="font-medium text-xl">Towards Consistent Profit</p>
                <p>Look for every candlestick pattern and chart</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:py-20 md:py-20 py-10">
          <div>
            <h2 className="lg:text-5xl md:text-3xl text-2xl font-bold text-center">
              Questions? We’ve got answers.
            </h2>
          </div>
          <div className="lg:py-16 md:py-16 py-10">
            <Accordion
              type="single"
              collapsible
              className="w-full lg:px-20 md:px-20"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-normal lg:text-2xl md:text-2xl text-xl py-10">
                  What is NusaDex?
                </AccordionTrigger>
                <AccordionContent className="opacity-70 font-normal lg:text-xl md:text-xl text-base">
                  NusaDex is a cryptocurrency platform that operates exclusively
                  on the Solana network. The platform offers various services,
                  including cryptocurrency trading, staking, NFTs, and other
                  financial solutions. Established in 2024, NusaDex focuses on
                  efficiency and fast transactions through the Solana network..
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" font-normal lg:text-2xl md:text-2xl text-xl py-10">
                  What Is Cryptocurrency?
                </AccordionTrigger>
                <AccordionContent className="opacity-70 font-normal lg:text-xl md:text-xl text-base">
                  Cryptocurrency, or digital currency, is a type of digital asset
                  that uses cryptographic technology to ensure security, manage
                  the creation of new units, and verify the transfer of assets.
                  This currency operates on blockchain technology, a decentralized
                  digital ledger that records all transactions transparently and
                  immutably.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-normal lg:text-2xl md:text-2xl text-xl py-10">
                  What Is NFT or Non-Fungible Tokens?
                </AccordionTrigger>
                <AccordionContent className="opacity-70 font-normal lg:text-xl md:text-xl text-base">
                  NFT, or Non-Fungible Token, is a type of unique digital asset
                  that uses blockchain technology to verify ownership and
                  authenticity of an item. Unlike cryptocurrencies like Bitcoin or
                  Ethereum, which are fungible (interchangeable with the same
                  value), NFTs are non-fungible, meaning each token has a unique
                  value and cannot be directly replaced by another token. NFTs are
                  commonly used to represent digital assets such as artwork,
                  music, videos, digital collectibles, and even in-game items.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExhangePags
