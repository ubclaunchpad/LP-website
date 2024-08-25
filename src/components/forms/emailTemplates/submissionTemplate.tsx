import { Tailwind, Button } from "@react-email/components";
import config from "../../../../tailwind.config";
const DOCS = 'https://launchpadubc.notion.site/65c5e68a3b1b4d84bcb972f29db80b06?v=a59aebaa79c8408488ccf492b0e1991d&pvs=4';

export  function SubmissionTemplate({formTitle}: {formTitle: string}) {
        return (
            <Tailwind
                config={config}
            >
                <div className={"flex flex-col border border-[#c1c6d0] bg-[#e2e4eb] rounded-xl min-h-[300px] py-10 p-20  shadow items-center w-full"}>
                    <p className={"text-center"}>
                        Your submission to <strong>{formTitle}</strong> has been received. Thank you!
                    </p>
                    <p className={"text-center"}>
                        If you have any questions, please contact us at <a href="mailto:strategy@ubclaunchpad.com">
                        strategy@ubclaunchpad.com</a></p>

                <div className="flex justify-center w-full flex-1 items-end">
                <Button
                    href={DOCS}
                    className="bg-[#3d4aee] rounded w-fit h-fit px-3 py-2 font-medium leading-4 text-white"
                >
                    Learn More About Launch Pad
                </Button>
                </div>
                </div>
            </Tailwind>
        );
    };
