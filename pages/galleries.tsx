import {FC} from "react";
import {REVALIDATE} from "@/config/consts";
import {fetchBucketGalleries, fetchGalleries, fetchGalleryPage, populateGalleries} from '@/services/gallery.services'
import {fetchBucketImages, fetchPageImages} from "@/services/image.services";
import {BucketImage} from "@/interface/image.interface";
import {title} from "@/components/primitives";
import {Image} from "@nextui-org/react";
import Layout from "@/components/Layout";
import {DatabaseImage} from "@/interface/database_image";

const GalleryPage: FC<{ galleries: DatabaseImage[] }> = ({galleries}) => {
    return (
        <Layout>
            <div className="text-center py-20">
                <title className={title()}>Gallery</title>
                <h1 className="text-3xl font-bold">Portfolio</h1>
                <section className="columns-1 sm:columns-2 md:columns-3 gap-10 p-10">
                    {
                        galleries.map((gallery) =>
                            <div key={gallery.bucket_image_id} className="mb-10">
                                <Image
                                    shadow="sm"
                                    loading="eager"
                                    isBlurred={true}
                                    width="100%"
                                    radius="none"
                                    alt="test"
                                    src={gallery.url}/>
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
    const bucketGalleries: BucketImage[] | [] = await fetchBucketImages(pageName)
    await populateGalleries(bucketGalleries)
    const galleryPage = await fetchGalleryPage()
    return {
        props: {
            galleries: galleryPage
        },
        revalidate: REVALIDATE
    }
}