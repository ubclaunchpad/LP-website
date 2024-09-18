import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import "../app/globals.css";

export default function ContactUsForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [result, setResult] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const submissionData = new FormData(e.target);
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("message", formData.message);
    submissionData.append("access_key", "f344fafb-12c6-4537-9315-baefba20a83c");

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    // TODO: Replace the form submission with mailGun API
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResult(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("An error occurred. Please try again.");
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
        <div className="text-4xl flex-col flex gap-6 justify-center items-center">
          <div
            className={
              "z-40 border-background-600 p-10 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center"
            }
          >
            {children}
          </div>
        </div>

        <div className="z-40 font-mono pt-5 rounded-xl flex-col w-full max-w-3xl flex gap-5 justify-center items-center">
          <div className="text-3xl">Get in touch</div>
          <p className="text-xl">Let us know how we can help</p>
          <form className="w-full max-w-sm mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Name
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="message"
                rows={8}
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
            {result && (
              <div
                className={`text-center ${result.includes("Successfully") ? "text-green-500" : "text-purple-400"}`}
              >
                {result}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
