'use client'
import InfoButton from '@/components/primitives/infoButton';
import { Button }  from '@/components/primitives/button';
import ImageCard from './imageCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Navigation } from 'swiper/modules';
import useIsMobile from '@/app/lib/hooks/useIsMobile';
import { useMemo } from 'react';

type ProjectSectionProps = {
    projects: Project[],
}

type Project = {
    title: string,
    description: string,
    imageSrc: string,
    alt: string,
    width: number, 
    height: number
    url: string,
}


const text = {
    projectsTitle: 'Projects Highlights'
}

const ProjectSection = ({projects}: ProjectSectionProps) => {
    const MOBILESIZE = 768,TABLETSIZE = 900, LARGESIZE = 1600
    const isMobile = useIsMobile(MOBILESIZE);
    const isLargeScreen = !useIsMobile(LARGESIZE);
    const isTablet = useIsMobile(TABLETSIZE);
    const carouselSize = useMemo(() => {
        if(isLargeScreen){
            return 5;
        } else if(isMobile) {
            return 1;
        } else if(isTablet) {
            return 2;
        } else {
            return 3;
        }

    }, [isMobile, isLargeScreen])
    return(
    <div className='flex flex-col text-center items-center justify-center md: justify-between py-10 w-full'>
    <span className='flex flex-col md:flex-row text-center items-center justify-between md:px-10 py-10 w-full'>
        <span className='flex flex-col-reverse md:flex-row items-center'>
            <h1 className={`text-4xl font-bold font-sans py-2 md:py-0 md:pr-4`}>{text.projectsTitle}</h1> 
            <span className='p-2'>
                <InfoButton text={'2024/2025'} />
            </span>
        </span>
        <span className='hidden md:flex md:flex-row md:space-x-2'>
            <Button variant={"secondary"} icon reverse className='swiper-button-prev'><label>{'Prev'}</label></Button>
            <Button variant={"dark"} icon className='swiper-button-next'><label>{'Next'}</label></Button>
        </span>
    </span>
    <span className='flex text-center items-center justify-between lg:px-10 py-10 w-full'>
    <Swiper
        spaceBetween={30}
        slidesPerView={carouselSize} // use only 1 slide carousel for mobile 
        loop={true}
        modules={[Navigation]}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center w-auto">
            <ImageCard {...project}/>
          </SwiperSlide>
        ))}
    </Swiper>
    </span>
    </div>)
}

export default ProjectSection