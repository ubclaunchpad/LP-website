'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ImageAreaProps {
    src: string;
    alt: string; 
    width: number; 
    height: number;
  }
export default function ImageArea({src, alt, width, height}: ImageAreaProps) {
    const [path, setPath] = useState(src)
    return (
        <div className='flex flex-col px-10 py-5'>
            <div className='rounded-2xl overflow-hidden'>
                <Image
                    src={path}
                    alt={alt}
                    width={width}
                    height={height}
                    objectFit='cover'
                />
            </div>
        </div>
    )
}
