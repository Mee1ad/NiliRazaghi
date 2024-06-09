import {PiInstagramLogoLight, PiTelegramLogoThin} from "react-icons/pi";
import {RxHamburgerMenu} from "react-icons/rx";
import {CiLinkedin} from "react-icons/ci";
import clsx from "clsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {useCallback, useEffect} from "react";
import React from "react";


export const Sidebar = () => {

    const router = useRouter()
    const links = [
        {href: "/", text: "Home"},
        {href: "/about", text: "About"},
        {
            href: "/galleries", text: "Gallery",
            items: [
                {href: "/galleries/portrait", text: "Portrait"},
                {href: "/galleries/self portrait", text: "Self Portrait"},
                {href: "/galleries/commercial", text: "Commercial"},
            ]
        },
        {href: "/reels", text: "Reels"},
        {href: "/feedback", text: "Feedback"},
        {href: "/contact", text: "Contact"}
    ]

    const navigateTo = useCallback((route: string) => () => {
        router.push(route)
    }, [router])

    const [isMenuOpen, setIsMenuOpen] = React.useState(true)

    useEffect(() => {
        links.filter(link => link.items).map(link => {
            router.prefetch(link.href)
        })
    }, [links, router])

    useEffect(() => {
        setIsMenuOpen(prev => !prev)
    }, [router])

    function triggerMenu() {
        setIsMenuOpen(prev => !prev)
    }

    return (
        <div className="w-full md:w-23 h-full">
            <div
                className={`${isMenuOpen ? `w-full` : `w-0 overflow-hidden`} md:w-23 z-50 h-full fixed transition-all duration-200`}>
                <div
                    className={`${isMenuOpen ? `w-full` : `w-0 overflow-hidden`} px-8 py-8 md:w-23 bg-white h-full md:fixed text-center transition-all duration-200`}
                    style={{boxShadow: "1px 1px 20px 0 rgba(153, 153, 153, 0.32)"}}>
                    <button className="text-2xl md:hidden text-left block fixed" onClick={triggerMenu}>
                        <RxHamburgerMenu/>
                    </button>
                    <section className="flex flex-col items-center mb-6 mt-8">

                        <Link
                            href="/"
                            className="text-3xl font-bold sticky top-0">Nili Razaghi</Link>
                        <h3>Photographer</h3>
                        {/*<ThemeSwitch/>*/}

                    </section>
                    <section className="flex-col flex text-left divide-y">
                        {links.map(link => {
                            // console.log("link", link.href)
                            // console.log("pathname", router.pathname)
                            const isActive = router.pathname.includes(link.href) &&
                                (link.href !== '/' || router.pathname === '/')
                            if (link.items === undefined) {
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={clsx(
                                            "leading-[3]",
                                            "transition-colors duration-200",
                                            {
                                                "text-gray-500 hover:text-black": !isActive,
                                                "text-black": isActive
                                            })}
                                        color="foreground"
                                    >
                                        {link.text}
                                    </Link>
                                );
                            }
                            if (link.items) {
                                return (
                                    <Accordion key={link.href} isCompact onSelectionChange={navigateTo(link.href)}
                                               selectedKeys={isActive ? "all" : []} hideIndicator
                                               itemClasses={{
                                                   title: clsx(
                                                       "hover:text-black",
                                                       {
                                                           "text-gray-500": !isActive,
                                                           "text-black": isActive
                                                       }),
                                               }}
                                               className={clsx("px-0 py-1 ",
                                               )}>
                                        <AccordionItem key="1" aria-label="Galleries" title="Galleries"
                                                       classNames={{content: "py-0 border-t-1.5"}}>
                                            <div className="flex flex-col pl-4 py-0 text-gray-500 divide-y">
                                                {link.items.map((item, index) => {
                                                    const href = item.href.split('/')[2]
                                                    const pathname = router.query['galleryname']
                                                    const isActive = href === pathname
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className={clsx(
                                                                "leading-[3] transition-colors duration-200",
                                                                {
                                                                    "text-gray-500 hover:text-black": !isActive,
                                                                    "text-black": isActive
                                                                })}
                                                            color="foreground"
                                                        >
                                                            {item.text}
                                                        </Link>
                                                    );
                                                })
                                                }
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            }

                        })}
                    </section>
                    <footer className="flex text-3xl justify-center gap-2 pt-4">
                        <Link href="https://t.me/Nilucheh" target="_blank">
                            <PiTelegramLogoThin/>
                        </Link>
                        <Link href="https://www.instagram.com/nilucheh/" target="_blank">
                            <PiInstagramLogoLight/>
                        </Link>
                        <Link href="https://www.linkedin.com/in/mahsarazagh/" target="_blank">
                            <CiLinkedin/>
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    )
}