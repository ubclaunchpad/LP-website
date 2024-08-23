

// TODO: Implement ExecSection component
import Image from "next/image";
const lpFooterEllipse = "/icons/custom/footerEllipse.svg";

export default function ExecSection() {
    return (
        <div className={"w-full min-h-96 relative  flex-shrink-0"}
        >
            <Image src={lpFooterEllipse} alt="Newsletter Image" fill={true} objectFit={"cover"}
                className={"absolute top-1/2 left-1/2 transform translate-y-1/2 "}
                />
        </div>
    )
}