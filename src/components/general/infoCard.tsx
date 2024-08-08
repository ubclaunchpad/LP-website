interface InfoCardProps {
    icon: React.ReactNode; 
    title: string;
    description: string;
}

export default function InfoCard({icon, title, description}: InfoCardProps) {
    return (
        <div className="flex items-center bg-zinc-700 text-white mb-4 p-2 rounded-lg">
          <div className="flex-shrink-0 font-size-20 p-2 rounded-lg">
            {icon}
          </div>
          <span className="flex flex-row space-between items-center py-3">
            <h2 className="px-3 py-3 md:px-1 md:py-1 md:mr-3 min-w-40 md:min-w-50 md:ml-4 md:mt-2 md:text-2xl xl:text-3xl font-light md:font-medium">{title}</h2>
            <div className="max-w-80 md:max-w-160">
            <p className="text-xs md:text-base">{description}</p>
            </div>
          </span>
        </div>
      );
}