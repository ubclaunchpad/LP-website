"use client";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type Faq = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  faqs: Faq[];
};

type QuestionAccordionProps = {
  faq: Faq;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
};

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const makeFAQColumn = useCallback(
    (faqs: Faq[], start: number, end: number) => {
      return faqs
        .slice(start, end)
        .map((faq, index) => (
          <QuestionAccordion
            key={index}
            faq={faq}
            index={index + start}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ));
    },
    [openIndex, setOpenIndex],
  );

  return (
    <div className="flex flex-col items-center py-10 pt-20">
      <h2
        className="text-3xl text-heading font-[600] text-[48px] text-white "
        id={"faq"}
      >
        Frequently Asked Questions
      </h2>
      <div className="max-w-7xl mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
          <div className="sm:col-span-1 gap-y-6 flex flex-col ">
            {makeFAQColumn(faqs, 0, Math.ceil(faqs.length / 2))}
          </div>
          <div className="sm:col-span-1 gap-y-6 flex flex-col">
            {makeFAQColumn(faqs, Math.ceil(faqs.length / 2), faqs.length)}
          </div>
        </dl>
      </div>
    </div>
  );
}

function QuestionAccordion({
  faq,
  index,
  openIndex,
  setOpenIndex,
}: QuestionAccordionProps) {
  return (
    <div className="bg-[#3A3543] py-[20px] px-[20px] h-fit rounded-lg ">
      <dt className="text-lg">
        <button
          className="text-left w-full px-2.5 flex justify-between items-start text-white"
          onClick={() => setOpenIndex(index === openIndex ? null : index)}
        >
          <span className="font-medium ">{faq.question}</span>
          <span className="ml-6 h-7 flex items-center">
            {index === openIndex ? (
              <ChevronUp className="h-6 w-6" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-6 w-6" aria-hidden="true" />
            )}
          </span>
        </button>
      </dt>
      <dd
        className={`transition-all duration-300 px-2.5 ease-in-out text-white ${index === openIndex ? "max-h-fit py-10 " : "max-h-0  overflow-hidden"}`}
      >
        <p className="text-[18px]">{faq.answer}</p>
      </dd>
    </div>
  );
}
