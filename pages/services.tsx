import Layout from "@/components/Layout";
import {title} from "@/components/primitives";
import {ThemeSwitch} from "@/components/theme-switch";
import {CardFooter, Image, Card, Button, Link} from "@nextui-org/react";

export default function ServicesPage() {
    return (
        <Layout>
            <div className="flex flex-col items-center py-20 px-10">
                <title className={title()}>Services</title>
                <span className="text-sm text-gray-500">WHAT WE DO</span>
                <h1 className="text-3xl font-bold">Services</h1>
                <div className="flex w-full flex-wrap gap-8 justify-between py-10">
                    {
                        Array.from({length: 6}).map((_, index) =>
                            <div key={index} className="w-album-image">
                                <Card
                                    radius="none"
                                    isPressable
                                    disableRipple
                                >
                                    <Image
                                        key={index}
                                        shadow="sm"
                                        loading="eager"
                                        isBlurred={true}
                                        width="100%"
                                        radius="none"
                                        alt="test"
                                        src={`/services/${index}.jpg`}/>
                                    <CardFooter className="py-1 absolute bottom-1 ml-1 z-10">
                                        <p className="text-white/80 text-3xl">Photography</p>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                </div>
                <span className="text-sm text-gray-500 mt-10 mb-5">INTERESTED TO WORK WITH US</span>
                <Button
                    href="/contact"
                    as={Link}
                    className="bg-black text-white px-5"
                    radius="full"
                    variant="shadow"
                >
                    Contact With Us
                </Button>
            </div>
        </Layout>
    )
}