import "@/styles/globals.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {fontJosefin} from "@/config/fonts";
import clsx from "clsx";
import {Sidebar} from "@/components/Sidebar";
import {Footer} from "@/components/Footer";
import {Providers} from '@/app/providers'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
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
        <Providers themeProps={{attribute: "class", defaultTheme: "light"}}>
            <div className={clsx(
                "h-full flex flex-wrap josefin-sans font-josefin",
                fontJosefin.variable
            )}
                 style={{fontFamily: "var(--font-josefin)"}}>
                <Sidebar/>
                <section className="w-77 flex-grow">
                    {children}
                    <Footer/>
                </section>
            </div>
        </Providers>
    );
}
