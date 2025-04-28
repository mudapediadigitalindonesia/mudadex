"use client";
import Slider from "react-infinite-logo-slider";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/images/gambar2.jpg",
    name: "XRP",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar3.jpg",
    name: "ETH",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar4.jpg",
    name: "USD",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar5.jpg",
    name: "SOL",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar2.jpg",
    name: "XRP",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar3.jpg",
    name: "ETH",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar4.jpg",
    name: "USD",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
  {
    src: "/images/gambar5.jpg",
    name: "SOL",
    href: "https://www.mudapediadigitalindonesia.com/about",
  },
];

const Card = ({ src, name, idx, href = "#" }) => (
  <div className="pb-10">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[188px] h-[84px] flex items-center gap-4 rounded-xl p-4 bg-white shadow-xl/20  transition-shadow duration-300 text-left"
    >
      <Image
        src={src}
        alt={`gambar-${idx}`}
        width={70}
        height={70}
        className="object-cover rounded-md"
      />
      <h3 className="text-sm font-bold text-black text-[18px]">{name}</h3>
    </a>
  </div>
);

const InfinitySlider = () => {
  return (
    <div className="flex flex-col gap-[76px]">
      {/* Baris Pertama: kiri ke kanan (default) */}

      <Slider
        width="250px"
        duration={30}
        pauseOnHover={true}
        blurBorders={false}
        blurBorderColor="#fff"
      >
        {images.map((card, idx) => (
          <Slider.Slide key={`baris1-${idx}`}>
            <Card {...card} idx={idx} href={card.href} />
          </Slider.Slide>
        ))}
      </Slider>

      {/* Baris Kedua: kanan ke kiri */}
      <div className="flex gap-10 transform scale-x-[-1]">
        <Slider
          width="250px"
          duration={30}
          pauseOnHover={true}
          blurBorders={false}
          blurBorderColor="#fff"
        >
          {images.map((card, idx) => (
            <Slider.Slide key={`baris2-${idx}`}>
              <div className="px-2 transform scale-x-[-1]">
                <Card {...card} idx={idx} />
              </div>
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default InfinitySlider;
