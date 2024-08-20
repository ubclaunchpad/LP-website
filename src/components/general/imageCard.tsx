import ImageArea from "./imageArea";

type ImageCardProps = {
    title: string, 
    description: string, 
    imageSrc: string,
    alt: string, 
    width: number, 
    height: number
}


const ImageCard = ({ title, description, imageSrc, alt, width, height}: ImageCardProps) => {

    const imageProps = {
        src: imageSrc,
        alt,
        width, 
        height
    }
    return (
    //TODO: Add custom colours to tailwind config
    <div className="bg-[#3A3543] rounded-2xl py-1 text-white text-center">
        <div className="mt-8">
        <h2 className="text-xl font-normal mb-2">{title}</h2>
        <p className="font-extralight">{description}</p>
        </div>
        <div className="rounded-lg w-full">
            <ImageArea {...imageProps}/>
        </div>
    </div>
    );
};

export default ImageCard