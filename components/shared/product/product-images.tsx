"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-[3fr_1fr] 
        lg:grid-cols-1
        gap-4
      "
    >
      <div className="bg-gray-50 aspect-square overflow-hidden">
        <Image
          src={images[current]}
          alt="product image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="object-cover object-center"
        />
      </div>
      <div className="flex w-1/2 gap-2 sm:flex-col sm:w-full lg:flex-row lg:w-1/2 ">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`border cursor-pointer hover:border-gray-900 transition-colors duration-200 ${
              current === index ? "border-gray-900" : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              // style={{ width: "100%", height: "auto" }}
              alt={`thumbnail ${index + 1}`}
              className=" object-cover w-50 md:w-full lg:w-50 "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
