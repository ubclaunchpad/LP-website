import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Mailgun from "mailgun.js";
import formData from "form-data";
import { Button } from "@/components/primitives/button";
import "../app/globals.css";

const DOMAIN = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN || "mg.ubclaunchpad.com";
const API_KEY = process.env.NEXT_PUBLIC_MAILGUN_API_KEY || "";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: API_KEY,
});

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const res = await mg.messages.create(DOMAIN, {
        from: `${formData.name} <${formData.email}>`,
        to: "strategy@ubclaunchpad.com",
        subject: "Contact Us Form Submission",
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      });
      setIsSubmitted(true);
      setHasError(false);
      return res.status === 200;
    } catch (error) {
      setIsSubmitted(false);
      setHasError(true);
      return false;
    }
  };

  return (
    <div className="w-screen min-h-screen bg-background-950 justify-center items-center relative flex flex-col ">
      <Link
        href={"/"}
        className={
          "rounded-full absolute top-0 left-4 transform border-4 border-primary z-40"
        }
      >
        <Image
          src="/images/logo_circle.png"
          width={80}
          height={80}
          alt="UBC Launch Pad logo"
        />
      </Link>
      <div className="w-screen h-screen bg-primary flex justify-center items-center">
        <div className={"fixed space-flow top-0 left-0 w-screen h-screen"}>
          <div className={"w-[300px] h-[300px] absolute right-10 top-0"}>
            <Image
              src={"../images/assets/planet1.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={"w-[267px] h-[200px] absolute left-40 bottom-10"}>
            <Image
              src={"../images/assets/planet2.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Image
            src={"../images/assets/starsBg.svg"}
            alt={"planet"}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="z-40 font-mono pt-5 rounded-xl flex-col w-full max-w-3xl flex gap-5 justify-center items-center">
          <div className="text-3xl">Get in touch</div>
          <p className="text-xl">Let us know how we can help</p>
          <form
            className="w-full max-w-md mt-4 sm:px-0 px-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Name
              </label>
              <input
                className="bg-gray-200 text-sm appearance-none border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="md:items-center mb-6">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Email
              </label>
              <input
                className="bg-gray-100 appearance-none text-sm border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="email"
                type="email"
                placeholder="me@student.com"
                value={formData.email}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="md:items-center mb-6">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Message
              </label>
              <textarea
                className="bg-gray-100 appearance-none text-sm border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="message"
                rows={9}
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="md:items-center mb-6">
              <Button className="p-3 w-full" size={"xl"} type="submit">
                <span className="text-lg text-center px-8">Send Message</span>
              </Button>
            </div>
          </form>
          <div className="text-purple-400">
            {isSubmitted ? (
              <p> Your message has been sent</p>
            ) : hasError ? (
              <p>
                There was an error sending your message. Please try again later
                or contact strategy@ubclaunchpad.com.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
