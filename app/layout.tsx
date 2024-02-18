import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontJosefin} from "@/config/fonts";
import clsx from "clsx";
import {Sidebar} from "@/components/sidebar";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className="h-full">
			<head/>
			<body
				className={clsx(
					"h-full flex",
					fontJosefin.variable
				)}
				style={{ fontFamily: "var(--font-josefin)"}}
			>
			<Sidebar />
			<section className="w-77">
				{ children }
			</section>


			</body>
		</html>
	);
}
