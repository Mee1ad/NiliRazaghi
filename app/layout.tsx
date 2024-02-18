import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontJosefin} from "@/config/fonts";
import clsx from "clsx";
import {Sidebar} from "@/components/sidebar";
import {Footer} from "@/components/footer";
import {Navbar} from "@/components/navbar";
import{Providers} from './providers'

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
					"h-full",
					fontJosefin.variable
				)}
				style={{ fontFamily: "var(--font-josefin)"}}
			>
			<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
				<div className="flex flex-wrap">
					<Sidebar />
					<section className="w-77 flex-grow">
						{ children }
						<Footer />
					</section>
				</div>
			</Providers>
			</body>
		</html>
	);
}
