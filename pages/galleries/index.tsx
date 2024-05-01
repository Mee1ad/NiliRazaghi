import {FC} from "react";
import {REVALIDATE} from "@/config/consts";
import {fetchBucketGalleries, fetchGalleries, fetchGalleryPage, populateGalleries} from '@/services/gallery.services'
import {fetchBucketFiles, fetchPageImages} from "@/services/image.services";
import {BucketFile} from "@/interface/image.interface";
import {title} from "@/components/primitives";
import {Button, Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import Layout from "@/components/Layout";
import {DatabaseImage} from "@/interface/database_image";
import NextLink from "next/link";

const GalleryPage: FC<{ galleries: DatabaseImage[] }> = ({galleries}) => {
    return (
        <Layout>
            <div className="text-center py-20">
                <title className={title()}>Portfolio</title>
                <section className="columns-1 sm:columns-2 md:columns-3 gap-10 p-10">
                    {
                        galleries.map((gallery) =>
                            <div key={gallery.bucket_image_id} className="mb-10">
                                <NextLink href={`/galleries/${gallery.alt}`}>
                                    {/*<Card className="py-4">*/}
                                    {/*    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">*/}
                                    {/*        <h4 className="font-bold text-large">{gallery.alt}</h4>*/}
                                    {/*    </CardHeader>*/}
                                    {/*    <CardBody className="overflow-visible py-2">*/}
                                    {/*        <Image*/}
                                    {/*            shadow="sm"*/}
                                    {/*            loading="eager"*/}
                                    {/*            isBlurred={true}*/}
                                    {/*            width="100%"*/}
                                    {/*            radius="none"*/}
                                    {/*            alt="test"*/}
                                    {/*            src={gallery.url}/>*/}
                                    {/*    </CardBody>*/}
                                    {/*</Card>*/}

                                    {/*<Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>*/}
                                    {/*    <CardBody className="overflow-visible p-0">*/}
                                    {/*        <Image*/}
                                    {/*                shadow="sm"*/}
                                    {/*                loading="eager"*/}
                                    {/*                isBlurred={true}*/}
                                    {/*                width="100%"*/}
                                    {/*                radius="none"*/}
                                    {/*                alt="test"*/}
                                    {/*                src={gallery.url}/>*/}
                                    {/*    </CardBody>*/}
                                    {/*    <CardFooter className="text-small justify-between">*/}
                                    {/*        <b>{gallery.alt}</b>*/}
                                    {/*        <p className="text-default-500">3.00$</p>*/}
                                    {/*    </CardFooter>*/}
                                    {/*</Card>*/}

                                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                            <p className="text-tiny text-white/60 uppercase font-bold">Collection</p>
                                            <h4 className="text-white font-medium text-large">{gallery.alt}</h4>
                                        </CardHeader>
                                        <Image
                                            removeWrapper
                                            className="z-0 w-full h-full object-cover"
                                            shadow="sm"
                                            loading="eager"
                                            isBlurred={true}
                                            width="100%"
                                            radius="none"
                                            alt="test"
                                            src={gallery.url}/>
                                    </Card>


                                </NextLink>
                            </div>
                        )
                    }
                </section>
            </div>
        </Layout>
    )
}

export default GalleryPage

export async function getStaticProps() {
    const pageName = "galleries"
    const bucketGalleries: BucketFile[] | [] = await fetchBucketFiles(pageName)
    await populateGalleries(bucketGalleries)
    const galleryPage = await fetchGalleryPage()
    return {
        props: {
            galleries: galleryPage
        },
        revalidate: REVALIDATE
    }
}