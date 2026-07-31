import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import type { ContactFormData, ContactFormResult } from "./api/contact";
import "../app/globals.css";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
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
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ContactFormResult = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setErrorMessage(result.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "There was an error sending your message. Please try again later or contact strategy@ubclaunchpad.com directly.",
      );
    } finally {
      setIsSubmitting(false);
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
              layout={"fill"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={"w-[267px] h-[200px] absolute left-40 bottom-10"}>
            <Image
              src={"../images/assets/planet2.svg"}
              alt={"planet"}
              layout={"fill"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Image
            src={"../images/assets/starsBg.svg"}
            alt={"planet"}
            layout={"fill"}
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
                disabled={isSubmitting}
              />
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
                disabled={isSubmitting}
              />
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
                disabled={isSubmitting}
              />
            </div>
            <div className="md:items-center mb-6">
              <Button
                className="p-3 w-full"
                size={"xl"}
                type="submit"
                disabled={isSubmitting}
              >
                <span className="text-lg text-center px-8">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
              </Button>
            </div>
          </form>
          <div className="text-purple-400">
            {isSubmitted ? (
              <p>Your message has been sent successfully!</p>
            ) : errorMessage ? (
              <p className="text-red-400">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
