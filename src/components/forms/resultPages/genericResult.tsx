import { Form } from "@/lib/types/application";
import Link from "next/link";
import Markdown from "react-markdown";

import remarkGfm from "remark-gfm";

export default function GenericResult({
  application,
  message,
  asMarkdown,
  children,
}: {
  application: Form;
  message: string;
  asMarkdown?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  flex-1 items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col  w-full  max-w-4xl gap-4  flex-1 border-neutral-900   rounded-md p-10">
        <h1 className="text-5xl text-left w-full pb-10 font-heading text-white">
          {application.title}
        </h1>

        {asMarkdown ? (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, inline, className, children, ...props }) => (
                <CustomLink
                  href={props.href as string}
                  text={children as string}
                />
              ),

              // link: (props: any) => ( <CustomLink ...props as href={props.href as string} />)
            }}
            className="rounded-xl dark

             prose prose-lg prose-invert max-w-4xl w-full dark:prose-invert *:text-white"
          >
            {message}
          </Markdown>
        ) : (
          <>
            <p className="text-lg pb-4 text-white">{message}</p>
            <p className="text-lg pb-4 text-white">
              If you have any questions, please contact us at{" "}
              <Link
                href={"mailto:strategy@ubclaunchpad.com"}
                className={"text-lp-600"}
              >
                strategy@ubclaunchpad.com
              </Link>
              .
            </p>
          </>
        )}
        {children}
      </div>
    </div>
  );
}

const CustomLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <a
      href={href}
      className="text-white bg-lp-500 px-4 no-underline rounded-full p-1 hover:bg-lp-400  transition-all duration-200"
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );
};
