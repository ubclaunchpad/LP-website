import ImageArea from "./imageArea";

type ImageCardProps = {
    title: string, 
    description: string, 
    imageSrc: string,
    alt: string, 
    width: number, 
    height: number,
    url: string,
}


const ImageCard = ({ title, description, imageSrc, alt, width, height, url}: ImageCardProps) => {

    const imageProps = {
        src: imageSrc,
        alt,
        width, 
        height,
    }
    return (
    
    <div className="flex flex-col justify-between bg-secondary rounded-2xl py-1 text-white items-center text-center min-h-5/12">
        <div className="mt-8 w-full h-full">
            <a className="text-xl font-normal mb-3" href={url} >{title}</a>
            <p className="font-extralight px-2">{description}</p>
        </div>
        <div className="w-10/12 py-5">
            <ImageArea {...imageProps} className="rounded-2xl"/>
        </div>
    </div>
    );
};

export default ImageCard