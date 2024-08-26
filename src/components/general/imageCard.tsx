import Link from "next/link";
import Image from "next/image";

type ImageCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  url: string;
};

const ImageCard = ({
  title,
  description,
  imageSrc,
  alt,
  width,
  height,
  url,
}: ImageCardProps) => {
  const imageProps = {
    src: imageSrc,
    alt,
    width,
    height,
  };
  return (
    <Link
      className="flex flex-col flex-1 max-h-[400px] p-2 min-h-[400px] h-full justify-between bg-secondary hover:bg-lp-500 duration-200 hover:scale-105 rounded-2xl py-1 text-white items-center text-center "
      href={url}
    >
      <div className="py-8 w-full h-full">
        <h2 className="text-xl font-normal pb-10">{title}</h2>
        <p className="font-extralight  text-ellipsis overflow-hidden line-clamp-3 px-2">
          {description}
        </p>
      </div>
      <div className=" w-full overflow-hidden rounded-lg flex-1 relative">
        <Image
          src={imageSrc}
          alt={alt}
          fill={true}
          objectFit={"cover"}
          unoptimized
          className={`rounded overflow-hidden relative `}
        />
      </div>
    </Link>
  );
};

export default ImageCard;
