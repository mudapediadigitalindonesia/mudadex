import React, { ReactElement } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Head from "next/head";
import { useRouter } from "next/router";

const AppShell = ({ children }: { children: ReactElement }) => {
  const { pathname } = useRouter();

  // Rute tanpa Navbar atau Footer
  const excludedPaths = ["/404"];
  const footerExcludedPaths = ["/tokens/details/[id]", "/tokens"];
  const isBotPath = pathname.startsWith("/bot");

  const showNavbarAndFooter = !excludedPaths.includes(pathname) && !isBotPath;
  const showFooter = !footerExcludedPaths.includes(pathname) && !isBotPath;

  return (
    <>
      <Head>
        <title>Nusadex - Fast & Smart Exchange</title>
        <link rel="icon" href="/logo-nusadex-text.png" />
        <meta name='description' content='Only at NusaDex, where you can craft the perfect
            portfolio and master the best crypto strategies' key={'desc'} />
        <meta property='og:description' content='Only at NusaDex, where you can craft the perfect
            portfolio and master the best crypto strategies' />
        <meta property='og:description' content='Only at NusaDex, where you can craft the perfect
            portfolio and master the best crypto strategies' />
      </Head>

      {showNavbarAndFooter ? (
        <div className="relative">
          <div className={`w-full py-3 sticky top-0 bg-background z-10`}>
            <Navbar />
          </div>
          <div className="w-full lg:px-8 px-5">{children}</div>
          {showFooter && (
            <div className="py-3">
              <Footer />
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AppShell;
