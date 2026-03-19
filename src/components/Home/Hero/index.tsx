"use client"
import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
const Hero = () => {
  // Use default carousel data for hero section
  const defaultCarouselItems = [
    {
      discount_number: 20,
      product_name: "Modern Headphones",
      description: "Experience crystal clear sound"
    },
    {
      discount_number: 30,
      product_name: "Premium Headset",
      description: "Professional grade audio quality"
    }
  ];

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden h-full">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
                style={{ width: "auto", height: "auto" }}
                loading="eager"
              />

              {/* <HeroCarousel /> */}
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="hero-carousel h-full"
              >
                {defaultCarouselItems.map((item: any, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="flex items-center justify-around pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                        <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                          <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                            <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                              {item.discount_number}%
                            </span>
                            <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                              Sale
                              <br />
                              Off
                            </span>
                          </div>

                          <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                            <a href="#">{item.title}</a>
                          </h1>

                          <p>
                            {item.description}
                          </p>

                          <a
                            href="#"
                            className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
                          >
                            Shop Now
                          </a>
                        </div>

                        <div>
                          <Image
                            src={item.image}
                            alt="headphone"
                            width={351}
                            height={358}
                            className="min-h-[358px] w-full h-full object-cover"
                            style={{ width: "auto", height: "auto" }}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}

              </Swiper>
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              {data.products.map((item:any,i)=>(
                <div key={i} className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <a href="#"> {item.title} </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          {item.sale_price}
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          ${item.regular_price}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={item.image}
                      alt="mobile image"
                      width={123}
                      height={161}
                      className="min-h-[161px] object-cover"
                    />
                  </div>
                </div>
              </div>
              ))}
              


            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
