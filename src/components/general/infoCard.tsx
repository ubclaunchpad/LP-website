interface InfoCardProps {
    icon: React.ReactNode; 
    title: string;
    description: string;
}

export default function InfoCard({icon, title, description}: InfoCardProps) {
    return (
        <div className="flex items-center p-2 bg-zinc-700 text-white mb-4">
          <div className="flex-shrink-0 p-2 rounded-lg">
            {icon}
          </div>
          <div className="flex flex-row ml-4 w-full">
            <h2 className="p-4 mr-4 text-2xl w-3/12 font-medium">{title}</h2>
            <p className="w-9/12 ml-3 py-2">{description}</p>
          </div>
        </div>
      );
}