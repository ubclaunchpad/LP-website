import { Faq } from "@/components/general/faqSection";
import { NavBarItem } from "@/components/layouts/navbar";
import { Stat } from "@/components/general/statistics";

export const faqs: Faq[] = [
  {
    question: "How can I join the club?",
    answer:
      "Recruitment applications are open twice during the school year: the first during late August to mid-September, the second during mid-December until mid-January.",
  },
  {
    question: "What kind of roles does Launch Pad recruit for?",
    answer:
      "For project teams, we recruit developers and designers. For club operations, we recruit sponsorship coordinators, marketing coordinators, and engagement coordinators.",
  },
  {
    question: "What is the time commitment per week?",
    answer:
      "The time commitment varies a bit between different roles, but overall, expect to spend around 6 hours each week working on projects at Launch Pad!",
  },
  {
    question: "Can students from other majors (non-CS/engineering) join?",
    answer: "Most definitely! Launch Pad is open to all current UBC students.",
  },
  {
    question: "What roles are there in a team? How big will each team be?",
    answer:
      "Each project team has developers, designers, and one/two tech lead(s). Team sizes vary but are normally around 5-12 people. Designers conduct user research and implement best UX practices, while designing intuitive UI interfaces. Developers engage in system design and play a part in everything code-related, including front-end, back-end, databases, etc. Tech leads oversee and lead the project, handling project management while also providing mentorship to the rest of the team.",
  },
  {
    question: "Can I apply if I’ve already graduated?",
    answer:
      "Unfortunately, no. Launch Pad project teams are restricted to current UBC students (currently enrolled in a program). If you’re interested in being involved with Launch Pad after graduation, consider joining the mentorship or contacting the current admin team to see what can be done!",
  },
  {
    question:
      "I want to be a Tech Lead/Design Lead/Operations Lead but I’ve never been a part of Launch Pad. How can I apply?",
    answer:
      "We require our leads to have been with us for at least one semester. We believe this is crucial to guaranteeing that the individual knows the ins and outs of our club and for us to better select our future leads.",
  },
  {
    question: "What can I get out of being a Launch Pad member?",
    answer:
      "Work transferrable skills, projects to talk about in your resume and interviews, lasting friendships, and a fantastic alumni network - just to name a few!",
  },
  {
    question: "Do I have to reapply every year?",
    answer:
      "You will always be a member once you have joined, but to join a project you will have to apply again. Starting in 2024, being a previous member does not guarantee your placement on a team - however, you will be given priority in the recruitment process. This is to guarantee the overall quality of the teams.",
  },
];

export const navItems: NavBarItem[] = [
  {
    name: "About",
    url: "#about",
  },
  {
    name: "Projects",
    url: "#projects",
  },
  // {
  //     name: "Be a Partner",
  //     url: "#partner",
  // },
  // {
  //     name: "Our Team",
  //     url: "#team",
  // },
  {
    name: "FAQ",
    url: "#faq",
  },
  {
    name: "Contact",
    url: "#contact",
  },
];

export const footerLinks = [
  {
    section: "Quick Links",
    links: [
      {
        name: "Discord",
        url: "https://discord.gg/M74UgEZS8M",
      },
      {
        name: "Medium",
        url: "https://medium.com/ubc-launch-pad-software-engineering-blog",
      },
      {
        name: "Docs",
        url: "https://launchpadubc.notion.site/65c5e68a3b1b4d84bcb972f29db80b06?v=a59aebaa79c8408488ccf492b0e1991d&pvs=4",
      },
    ],
  },
  {
    section: "Contact Us",
    links: [
      {
        name: "General Inquiries",
        url: "mailto:strategy@ubclaunchpad.com",
      },
      {
        name: "Sponsorship Inquiries",
        url: "mailto:team@ubclaunchpad.com",
      },
    ],
  },
];

export const bottomFooterLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/ubclaunchpad",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/ubclaunchpad",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/10054664",
  },
];

export const statsData: Stat[] = [
  { value: "500+", label: "Members" },
  { value: "50+", label: "Projects" },
  { value: "7+", label: "Majors" },
];

export const projects = [
  {
    title: "Microvan",
    description:
      "Microvan seeks to streamline their internal processes and keep up with competitors by switching to online auctions. As a result, we designed an online auction website and admin management system for the company.",
    imageSrc: "/images/projects/microvan.png",
    alt: "Microvan",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/Microvan-5ae6a5d55e7141ad952e99f2e62d396a",
  },
  {
    title: "Cosmic Gateway",
    description:
      "Cosmic Gateway is Launch Pad's internal club tools, including the website, project management and deployment platforms ",
    imageSrc: "/images/projects/cosmic.png",
    alt: "Cosmic Gateway",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/Cosmic-Gateway-6be0d37b607542afa355f405b8d1fd36",
  },
  {
    title: "Nom Appetit",
    description:
      "Nom Appetit is a social restaurant tracking and recommendation app, designed to finally answer the question of “So… where do you want to eat?”",
    imageSrc: "/images/projects/nom.png",
    alt: "Nom Appetit",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/Nom-Appetit-fa196383c8654badaeb43bfc085c7a36",
  },
  {
    title: "EpiLog",
    description:
      "Epilog is a mobile app that was designed to help epilepsy patients with tracking medications, appointments and monitoring seizures",
    imageSrc: "/images/projects/epilog.png",
    alt: "EpiLog",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/EpiLog-51a750b63ca749169b5f859c3a6560b3",
  },
  {
    title: "BlueNav",
    description:
      "BlueNav was an interactive degree planner for UBC students, that provided an easy-to-understand summary of pending degree requirements for undergrad students",
    imageSrc: "/images/projects/bluenav.png",
    alt: "BlueNav",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/BlueNav-a5f9bf80bd504c6685ce0bfc921f9586",
  },
  {
    title: "ClassSync",
    description:
      "ClassSync is a centralized ed-tech platform in collaboration with The C.O.D.E Initiative, creating a seamless experience for both students and volunteers.",
    imageSrc: "/images/projects/classsync.png",
    alt: "ClassSync",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/ClassSync-0dc8c3e8e54941869976e9b54585ef00",
  },
  {
    title: "Labby ",
    description:
      "Labby was a ticket management system platform developed in collaboration with   the non-profit organization BC Cancer, to meet their needs.",
    imageSrc: "/images/projects/labby.png",
    alt: "Labby",
    width: 372,
    height: 213,
    url: "https://launchpadubc.notion.site/Labby-b00fa2bdf707461687a898563dd5c833",
  },
];
