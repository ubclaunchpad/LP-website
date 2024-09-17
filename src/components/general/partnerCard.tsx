interface PartnerCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function PartnerCard({
  icon,
  title,
  description,
}: PartnerCardProps) {
  return (
    <div className="flex flex-col mr-2 mt-2 text-white sm:items-start items-center mb-4 p-2 rounded-lg w-full">
      <div className="flex-shrink-0 font-size-20 p-2 w-fit rounded-lg">
        {icon}
      </div>
      <div className="flex flex-col items-left py-3">
        <h2 className="text-indigo-400 break-all md:px-1 md:py-2 min-w-24 md:min-w-44 lg:min-w-64 md:mt-2 md:text-2xl sm:text-left text-center">
          {title}
        </h2>
        <p className="text-white mt-2 lg:text-base sm:text-left text-center">
          {description}
        </p>
      </div>
    </div>
  );
}
