import {Card, CardFooter, Image} from "@nextui-org/react";
import {title} from "@/components/primitives";
import Layout from "@/components/Layout";

export default function GalleryPage2() {
    return (
        <Layout>
            <div className="text-center py-20">
                <title className={title()}>Gallery</title>
                <h1 className="text-3xl font-bold">Portfolio</h1>
                <section className="columns-1 sm:columns-2 md:columns-3 gap-10 p-10">
                    {
                        Array.from({length: 13}).map((_, index) =>
                            <div key={index} className="mb-10">
                                <Image
                                    key={index}
                                    shadow="sm"
                                    loading="eager"
                                    isBlurred={true}
                                    width="100%"
                                    radius="none"
                                    alt="test"
                                    src={`/gallery/${index}.jpg`}/>
                            </div>
                        )}
                </section>
            </div>
        </Layout>
    )
}