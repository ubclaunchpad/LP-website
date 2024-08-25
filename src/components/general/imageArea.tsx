"use client";
import Image from "next/image";
import { useState } from "react";

interface ImageAreaProps {
    src: string;
    alt: string; 
    width: number; 
    height: number;
    className?: string;
  }
export default function ImageArea({src, alt, width, height, className}: ImageAreaProps) {
    const [path, setPath] = useState(src)
    return (
        <div className='flex flex-col px-10 py-5 items-center'>
                <Image
                    src={path}
                    alt={alt}
                    width={width}
                    height={height}
                    unoptimized
                    className={className ?? `rounded-2xl`}
                />
                
        </div>
    )
}
