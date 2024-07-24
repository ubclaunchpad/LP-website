import { Epilogue, Nunito_Sans } from 'next/font/google';

export const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	variable: "--font-nunito-sans",
});

export const epilogue = Epilogue({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-epilogue",
});
