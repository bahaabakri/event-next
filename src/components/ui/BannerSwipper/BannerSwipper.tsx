"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Box, useTheme } from "@mui/material";

interface BannerSwiperProps {
  imagesPath?: string[];
}

export default function BannerSwiper({ imagesPath = [] }: BannerSwiperProps) {
  const theme = useTheme();
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      loop
      pagination={{ clickable: true }}
      style={
        {
          width: "100%",
          "--swiper-pagination-color": theme.palette.primary.main,
          "--swiper-pagination-bullet-inactive-color":
            theme.palette.primary.main,
          "--swiper-pagination-bullet-inactive-opacity": "0.4",
        } as React.CSSProperties
      }
    >
      {imagesPath.map((image, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 220, sm: 320, md: 420 }, // control banner height here
            }}
          >
            <Image
              className="rounded-xl"
              src={image}
              alt={`Banner ${index}`}
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
