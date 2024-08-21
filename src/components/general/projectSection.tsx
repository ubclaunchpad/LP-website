'use client'
import { nunitoSans } from './../../app/fonts';
import InfoButton from '@/components/buttons/infoButton';
import { Button }  from '@/components/buttons/button';
import ImageCard from './imageCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Navigation } from 'swiper/modules';

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
}


const text = {
    projectsTitle: 'Projects Highlights'
}

const ProjectSection = ({projects}: ProjectSectionProps) => {
    return(
    <div className='flex flex-col text-center items-center justify-between py-10 w-full'>
    <span className='flex text-center items-center justify-between lg:px-10 py-10 w-full'>
        <span className='flex flex-col-reverse lg:flex-row'>
            <h1 className={`text-4xl font-bold ${nunitoSans.variable} font-sans py-2 lg:py-0 lg:pr-4`}>{text.projectsTitle}</h1> 
            <InfoButton text={'2024/2025'} />
        </span>
        <span className='flex flex-col-reverse lg:flex-row lg:space-x-2'>
            <Button variant={"secondary"} icon reverse><label className='swiper-button-prev'>{'Prev'}</label></Button>
            <Button variant={"dark"} icon><label className='swiper-button-next'>{'Next'}</label></Button>
        </span>
    </span>
    <Swiper
        spaceBetween={30}
        slidesPerView={window.innerWidth< 678 ? 1 :3}
        loop={true}
        centeredSlides={true}
        modules={[Navigation]}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center w-auto">
            <ImageCard {...project} />
          </SwiperSlide>
        ))}
    </Swiper>
    </div>)
}

export default ProjectSection