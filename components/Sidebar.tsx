import {PiInstagramLogoLight, PiTelegramLogoThin} from "react-icons/pi";
import {CiLinkedin} from "react-icons/ci";
import clsx from "clsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {useCallback, useEffect} from "react";


export const Sidebar = () => {

    const router = useRouter()
    console.log('router.pathname', router.pathname)

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
        console.log('clicked')
        router.push(route)
    }, [router])

    useEffect(() => {
        links.filter(link => link.items).map(link => {
            router.prefetch(link.href)
        })
    }, [links, router])

    return (
        <div className="w-23 z-50">
            <div className="px-8 py-32 w-23 h-full fixed z-50 text-center"
                 style={{boxShadow: "1px 1px 20px 0 rgba(153, 153, 153, 0.32)"}}>
                <section className="flex flex-col items-center mb-10">
                    <Link
                        href="/"
                        className="text-3xl font-bold sticky top-0">Nili Razaghi</Link>
                    <h3>Photographer</h3>
                    {/*<ThemeSwitch/>*/}
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
                </section>
                <section className="flex-col flex text-left">
                    {links.map(link => {
                        const isActive = router.pathname.includes(link.href) &&
                            (link.href !== '/' || router.pathname === '/')
                        if (link.items === undefined) {
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        "border-b-1.5 leading-[3]",
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
                                // <Accordion key={link.href} isCompact defaultExpandedKeys={["1"]}
                                <Accordion key={link.href} isCompact onSelectionChange={navigateTo(link.href)}
                                           selectedKeys={isActive ? "all" : []}
                                           className={clsx("px-0 py-1",
                                               {
                                                   "[&_span]:text-gray-500 border-b-1.5": !isActive,
                                                   "[&_span]:text-black border-b-0": isActive
                                               })}>
                                    <AccordionItem key="1" aria-label="Galleries" title="Galleries"
                                                   classNames={{content: "py-0 border-t-1.5"}}>
                                        <div className="flex flex-col pl-4 py-0 text-gray-500">
                                            {link.items.map(item => {
                                                const href = item.href.split('/')[2]
                                                const pathname = router.query['galleryname']
                                                const isActive = href === pathname
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className={clsx(
                                                            "border-b-1.5 leading-[3]",
                                                            "transition-colors duration-200",
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

            </div>
        </div>
    )
}