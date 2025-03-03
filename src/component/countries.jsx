"use client";
import React, { useState } from "react";
import USAFlag from "../assests/image/flag/image108.png";
import canadaFlag from "../assests/image/flag/image109.png";
import UKFlag from "../assests/image/flag/image114.png";
import BangladeshFlag from "../assests/image/flag/image111.png";
import IndiaFlag from "../assests/image/flag/image109(1).png";
import australiaFlag from "../assests/image/flag/image112.png";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const Countries = () => {
  const countries = [
    {
      img: USAFlag,
      number: "+1 888 708-1786",
      name: "USA",
      url: "tel:+18887081786",
    },
    {
      img: canadaFlag,
      number: "+1 888 708-1786",
      name: "Canada",
      url: "tel:+18887081786",
    },
    {
      img: UKFlag,
      number: "+44 8007074800",
      name: "United Kingdom",
      url: "tel:+448007074800",
    },
    {
      img: IndiaFlag,
      number: "+91 8009006321",
      name: "India",
      url: "tel:+918009006321",
    },
    {
      img: BangladeshFlag,
      number: "+88 01995390933",
      name: "Bangladesh",
      url: "tel:+8801995390933",
    },
    {
      img: australiaFlag,
      number: "+61 1800003812",
      name: "Australia",
      url: "tel:+611800003812",
    },
  ];

  const [openCountry, setOpenCountry] = useState(null);

  const toggleCountry = (index) => {
    setOpenCountry(openCountry === index ? null : index);
  };

  return (
    <div className="container-fluid ">
      <div className="hidden md:flex justify-between">
        {countries.map((details, index) => (
          <div key={index}>
            <div
              onClick={() => toggleCountry(index)}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              <img
                src={details.img}
                alt={details.name}
                className="h-[25px] w-auto"
              />
              <span className="font-semibold">{details.name}</span>
              <span className="lg:ml-2">
                {openCountry === index ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </span>
            </div>
            {details.numbers ? (
              details.numbers.map((num, numIndex) => (
                <a href={num.url} key={numIndex} className="block text-center p-0 no-underline">
                  <p
                    style={{
                      visibility: openCountry === index ? "visible" : "hidden",
                    }}
                    className="text-center my-1 "
                  >
                    {num.number}
                  </p>
                </a>
              ))
            ) : (
              <a href={details.url} className="block text-black text-center no-underline">
                <p
                  style={{
                    visibility: openCountry === index ? "visible" : "hidden",
                  }}
                  className="text-center my-1"
                >
                  {details.number}
                </p>
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={1}
          slidesPerView={2}
          pagination={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {countries.map((details, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img
                  src={details.img}
                  alt={details.name}
                  className="max-w-full w-16 md:h-16"
                />
                <p className="text-[12px] md:text-4xl font-semibold text-center mt-2">
                  {details.name}
                </p>

                {details.numbers ? (
                  details.numbers.map((num, numIndex) => (
                    <a
                      href={num.url}
                      key={numIndex}
                      className="block text-center"
                    >
                      <p className="text-center my-1 text-xs font-semibold">
                        {num.number}
                      </p>
                    </a>
                  ))
                ) : (
                  <a href={details.url} className="block text-center">
                    <p className="text-center my-1 text-xs font-semibold">
                      {details.number}
                    </p>
                  </a>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Countries;
