import { Input } from "@/components/primitives/input";
import { Button } from "@/components/primitives/button";
import Image from "next/image";

const NEWSLETTER_URI = process.env.NEWSLETTER_URI;
const lpNewsletterImage = "/icons/custom/newsletterImage.svg";
const text = {
  heading: "Join our newsletter mailing list! 📩",
  description:
    "Sign up to hear about our upcoming events, announcements, recruitment and tech opportunities!",
  inputPlaceholder: "Enter your email",
  buttonText: "Subscribe",
};

export default function MailingList() {
  if (!NEWSLETTER_URI) {
    return null;
  }
  return (
    <section className="flex flex-col items-center md:py-10 py-20 relative gap-10 text-center bg-[#809CFF] px-20 w-full">
      <Image
        src={lpNewsletterImage}
        alt="Newsletter Image"
        fill={true}
        className={"absolute top-0 w-fit max-w-[592px]"}
      />
      <div className={"flex flex-col items-center gap-4 max-w-3xl z-40"}>
        <h2 className="text-3xl text-heading font-bold">{text.heading}</h2>
        <p className="md:text-lg text-md mb-4">{text.description}</p>
      </div>
      <form
        className="flex flex-col md:flex-row h-[49px] justify-center w-full gap-4 items-center z-40 "
        method={"post"}
        action={NEWSLETTER_URI}
      >
        <Input
          name={"email"}
          type="email"
          id="bd-email"
          placeholder={text.inputPlaceholder}
          className="p-3 h-full bg-white border-none md:w-96 w-full text-[#313131] rounded-xl"
        />
        <Button className="p-3 w-full md:w-[129px] h-full font-semibold text-lg rounded-xl bg-primary text-white">
          {text.buttonText}
        </Button>
      </form>
    </section>
  );
}
