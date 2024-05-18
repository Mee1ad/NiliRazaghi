'use client';
import "@/styles/globals.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {fontJosefin} from "@/config/fonts";
import clsx from "clsx";
import {Sidebar} from "@/components/Sidebar";
import {Footer} from "@/components/Footer";
import {Providers} from '@/app/providers'
import {ReactNode} from "react";


export default function Layout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <Providers themeProps={{attribute: "class", defaultTheme: "light"}}>
            <div className={clsx(
                "h-full flex flex-wrap josefin-sans font-josefin",
                fontJosefin.variable
            )}
                 style={{fontFamily: "var(--font-josefin)"}}>
                <Sidebar/>
                <section className="relative min-h-screen w-77 flex-grow">
                    <main>{children}</main>
                    <Footer/>
                </section>
            </div>
        </Providers>
    );
}
