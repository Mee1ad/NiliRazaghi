import {FC} from "react";
import {GetStaticPropsContext, NextPageContext} from "next";
import {REVALIDATE} from "@/config/consts";
import {useRouter} from "next/navigation";
import {DatabaseImage} from "@/interface/database_image";
import {fetchPageByName, fetchPageImages} from "@/services/image.services";
import {fetchPageId, populateGalleryImages} from "@/services/gallery.services";
import Layout from "@/components/Layout";
import {Image} from "@nextui-org/react";
import {Page} from "@/interface";

const GalleryPage: FC<{ images: DatabaseImage[] }> = ({images}) => {
    return (
        <Layout>
            <div className="text-center py-20">
                <section className="columns-1 sm:columns-2 md:columns-3 gap-10 p-10">
                    {
                        images && images.map((image) =>
                            <div key={image.bucket_image_id} className="mb-10">
                                <Image
                                    shadow="sm"
                                    loading="eager"
                                    isBlurred={true}
                                    width="100%"
                                    radius="none"
                                    alt={image?.alt}
                                    src={image.url}/>
                            </div>)
                    }
                </section>
            </div>
        </Layout>
    );
}

export default GalleryPage;

export async function getStaticProps(context: GetStaticPropsContext) {
    const galleryName: string = context.params?.galleryname as string
    const page: Page = await fetchPageByName(galleryName)
    await populateGalleryImages(page, 'galleries/' + galleryName)

    const images: DatabaseImage[] = await fetchPageImages(page.id)

    return {
        props: {
            images: images
        },
        revalidate: REVALIDATE
    }

}

export async function getStaticPaths() {
    return {
        paths: [
            '/galleries/kid',
        ],
        fallback: true,
    }
}