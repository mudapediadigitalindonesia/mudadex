import React from "react";
import Link from "next/link";
import {
  DribbbleIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import FooterMobile from "./footerMobile";
import { useRouter } from "next/router";

const Footer = () => {
  const { pathname } = useRouter()

  return (
    <div className={`${pathname === '/' || pathname === '/exchange' ? 'max-w-screen-xl mx-auto w-full' : 'w-full px-8'} py-4`}>
      <footer className="bg-background pt-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start gap-4">
              <img src="/logo-nusadex-text.svg" alt="NusaDex Logo" className="w-[150px]" />
              <p className="text-sm text-foreground mt-2">©2024 - {new Date().getFullYear()} NUSADEX.COM</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="/connect-wallet" className="text-sm text-foreground hover:text-muted-foreground">
                Connect Wallet On NusaDex
              </Link>
              <Link href="/" className="text-sm text-foreground hover:text-muted-foreground">
                About Us
              </Link>
              <Link href="/" className="text-sm text-foreground hover:text-muted-foreground">
                Contact Us
              </Link>
              <Link href="/terms" className="text-sm text-foreground hover:text-muted-foreground">
                Terms
              </Link>
              <Link href="/tokens" className="text-sm text-foreground hover:text-muted-foreground">
                Tokens
              </Link>
              <Link href="/exchange" className="text-sm text-foreground hover:text-muted-foreground">
                Exchange
              </Link>
              <Link href="/tokens" className="text-sm text-foreground hover:text-muted-foreground">
                Trading
              </Link>
              <Link href="/" className="text-sm text-foreground hover:text-muted-foreground">
                News
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://twitter.com/nusadex" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground">
              <TwitterIcon size={24} />
            </a>
            <a href="https://facebook.com/nusadex" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground">
              <FacebookIcon size={24} />
            </a>
            <a href="https://instagram.com/nusadex" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground">
              <InstagramIcon size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
