"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function AlumniCarousel() {
  useEffect(() => {
    const carouselContainer = document.getElementById("carouselContainer");

    if (carouselContainer) {
      carouselContainer.innerHTML += carouselContainer.innerHTML;
    }

    let lastTimestamp: number | null = null;
    let scrollLeft = 0;
    const scrollSpeed = 3;

    function animateCarousel(timestamp: number) {
      if (lastTimestamp !== null) {
        const deltaTime = timestamp - lastTimestamp;
        scrollLeft += (scrollSpeed * deltaTime) / 60; // Normalize speed
        if (
          carouselContainer &&
          scrollLeft >= carouselContainer.scrollWidth / 2
        ) {
          scrollLeft = 0;
        }
        if (carouselContainer) {
          carouselContainer.style.transform = `translateX(-${scrollLeft}px)`;
        }
      }
      lastTimestamp = timestamp;
      requestAnimationFrame(animateCarousel);
    }

    requestAnimationFrame(animateCarousel);
  }, []);

  return (
    <div className="bg-white  bg-opacity-20 p-4 max-h-24 w-full h-full overflow-hidden">
      <div id="carouselContainer" className="flex gap-16">
        <div className="flex-shrink-0">
          <a href="https://www.google.com/">
            <Image
              src="/images/company_logos/google.svg"
              alt="Google"
              width={100}
              height={100}
            />
          </a>
        </div>
        <div className="flex-shrink-0 pb-3 mb-5">
          <a href="https://www.microsoft.com/">
            <Image
              src="images/company_logos/microsoft.svg"
              alt="Microsoft"
              width={120}
              height={100}
              className="mt-4"
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.asana.com/">
            <Image
              src="images/company_logos/asana.svg"
              alt="Asana"
              width={80}
              height={100}
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.amazon.ca/">
            <Image
              src="images/company_logos/amazon.svg"
              alt="Amazon"
              width={100}
              height={100}
              className="mt-5"
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.tesla.com/">
            <Image
              src="images/company_logos/tesla.svg"
              alt="Tesla"
              width={120}
              height={100}
              className="mt-6"
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.splunk.com/">
            <Image
              src="images/company_logos/splunk.svg"
              alt="Splunk"
              width={100}
              height={100}
              className="mt-5"
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.shopify.com/">
            <Image
              src="images/company_logos/shopify.svg"
              alt="Shopify"
              width={120}
              height={100}
              className="mt-3"
            />
          </a>
        </div>
        <div className="flex-shrink-0">
          <a href="https://www.rbc.com/">
            <Image
              src="images/company_logos/rbc.svg"
              alt="RBC"
              width={40}
              height={40}
              className="mt-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
