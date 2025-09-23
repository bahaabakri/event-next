"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { SelectedImage } from "@/types/images.type";
interface ImageSliderProps {
  images: SelectedImage[];
  alt: string;
}

const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <div key={idx} className="keen-slider__slide flex justify-center">
              <Image
                src={img.url}
                alt={img.name || alt}
                width={800}
                height={400}
                className="object-cover rounded-xl"
              />
            </div>
          ))
        ) : (
          <div className="keen-slider__slide flex justify-center">
            <Image
              src="/next.svg"
              alt="default"
              width={800}
              height={400}
              className="object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      {/* Arrows */}
      {images.length > 1 && loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
          />
          <Arrow
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
          />
        </>
      )}

      {/* Dots */}
      {images.length > 1 && loaded && instanceRef.current && (
        <div className="flex justify-center mt-3 gap-2">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === idx ? "bg-primary-300" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function Arrow({
  left,
  onClick,
}: {
  left?: boolean;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}) {
  return (
    <svg
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer fill-white drop-shadow-md ${
        left ? "left-2" : "right-2"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default ImageSlider;
