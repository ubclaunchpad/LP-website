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
    
    <div className="flex flex-col justify-between bg-secondary rounded-2xl py-1 text-white items-center text-center">
        <div className="mt-8 w-full h-full">
            <h2 className="text-xl font-normal mb-2">{title}</h2>
            <p className="font-extralight px-2">{description}</p>
        </div>
        <div className="w-10/12">
            <ImageArea {...imageProps}/>
        </div>
    </div>
    );
};

export default ImageCard