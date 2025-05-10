import Image from "next/image";
import { FaTelegram, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="my-6">
      <div className="px-6 max-w-screen-xl mx-auto text-slate-600 dark:text-neutral-400 flex flex-col md:flex-row justify-between md:gap-8 gap-5">
        <section className="flex flex-col justify-start md:items-start md:w-2/6">
          <p className="md:pt-10">
            Banyuwangi Perum Gedong Blok. D No. 5 Kertosari, Kec. Banyuwangi,
            Kabupaten Banyuwangi, Jawa Timur 68418.
          </p>
        </section>
        <section className="flex gap-2 justify-between items-start flex-wrap md:w-3/6">
          <div>
            <h6 className="text-slate-700 dark:text-neutral-400 text-2xl text-nowrap font-bold">
              About MudaDex
            </h6>
            <ul className="flex flex-col gap-2 mt-2">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Agent Contact</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-slate-700 dark:text-neutral-400 text-2xl font-bold">
              Entrance
            </h6>
            <ul className="flex flex-col gap-2 mt-2">
              <li>
                <a href="#">Buy/Sell</a>
              </li>
              <li>
                <a href="#">Deposit</a>
              </li>
              <li>
                <a href="#">Spot</a>
              </li>
              <li>
                <a href="#">USDT Futures</a>
              </li>
              <li>
                <a href="#">Copy Trading</a>
              </li>
              <li>
                <a href="#">Loans</a>
              </li>
              <li>
                <a href="#">USDC Futures</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-slate-700 dark:text-neutral-400 text-2xl font-bold">
              Support
            </h6>
            <ul className="flex flex-col gap-2 mt-2">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">API Guide</a>
              </li>
              <li>
                <a href="#">Fees</a>
              </li>
              <li>
                <a href="#">Trading Rules</a>
              </li>
              <li>
                <a href="#">Converter</a>
              </li>
              <li>
                <a href="#">BTC/USD Converter</a>
              </li>
              <li>
                <a href="#">ETH/EUR Converter</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="md:w-1/6">
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 rounded-full bg-sky-950 text-white hover:bg-sky-900"
            >
              <FaTelegram className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-950 text-white hover:bg-sky-900"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-950 text-white hover:bg-sky-900"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-950 text-white hover:bg-sky-900"
            >
              <FaYoutube className="text-xl" />
            </a>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Tearms & Conditions</a>
            </li>
          </ul>
        </section>
      </div>
      <div className="px-6 max-w-screen-xl mx-auto flex items-center gap-2 text-slate-600 mt-4">
        <img
          src="/images/logo_footer.png"
          alt="Logo"
          className="logo w-[80px] h-[80px]"
        />
        <p className="text-white dark:text-neutral-400">
          Copyright &copy; MudaDex 2025
        </p>
      </div>
    </footer>
  );
}
