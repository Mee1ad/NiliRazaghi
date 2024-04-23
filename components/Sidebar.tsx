import {Link} from "@nextui-org/link";
import {siteConfig} from "@/config/site";
import { PiTelegramLogoThin } from "react-icons/pi";
import { PiInstagramLogoLight } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
// import {fontjosefin} from "@/config/fonts";
import clsx from "clsx";
import {ThemeSwitch} from "@/components/theme-switch";


export const Sidebar = () => {
    const links = [
        {href: "/", text: "Home"},
        {href: "about", text: "About"},
        {href: "galleries", text: "Gallery"},
        {href: "gallery2", text: "Gallery2"},
        {href: "reels", text: "Reels"},
        {href: "feedback", text: "Feedback"},
        {href: "contact", text: "Contact"}
    ]
    return (
        <div className="w-23 z-50">
            <div className="px-8 py-32 w-23 h-full fixed z-50 text-center"
                 style={{boxShadow: "1px 1px 20px 0 rgba(153, 153, 153, 0.32)"}}>
                <section className="flex flex-col items-center mb-14">
                    <h1 className="text-3xl font-bold sticky top-0">Nili Razaghi</h1>
                    <h3>Photographer</h3>
                    <ThemeSwitch/>
                </section>
                <section className="flex-col flex">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="border-b-1.5 leading-[3]"
                            color="foreground"
                        >
                            {link.text}
                        </Link>
                    ))}
                </section>
                <footer className="flex text-3xl mt-20 justify-center gap-2">
                    <PiTelegramLogoThin/>
                    <PiInstagramLogoLight/>
                    <CiLinkedin/>
                </footer>
                <h6 className="text-sm pt-5">With ❤️ by
                    <span className="font-bold ml-1">
                        Soheil Ravasani
                    </span>
                </h6>
            </div>
        </div>
    )
}