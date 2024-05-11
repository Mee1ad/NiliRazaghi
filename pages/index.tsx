import {Image} from "@nextui-org/react"
import {FC} from "react"
import Layout from "@/components/Layout"
import {DatabaseImage} from "@/interface/database_image";
import {
    fetchBucketFiles,
    fetchPageByName, fetchPageImage,
    fetchPageImages,
    fetchPublicImageUrl, imageToDbImage,
    insertImage
} from "@/services/image.services";
import {IMAGE_TABLE, PAGE_TABLE, REVALIDATE} from "@/config/consts";
import supabase from "@/config/supabase_service";

interface HomeProps {
    images: DatabaseImage[]
    slider: DatabaseImage
}

const HomePage: FC<HomeProps> = ({images, slider}) => {
    return (
        <Layout>
            <div className="flex flex-col text-xl text-gray-500 items-center">
                <Image
                    width="100%"
                    radius="none"
                    alt={slider.alt}
                    src={slider.url}/>
                <p className="px-56 pt-28">While there is perhaps a province in which the photograph can tell us nothing
                    more than what we see with
                    our own eyes, there is another in which it proves to us how little our eyes permit us to see.</p>
                <div className="w-1/4 pt-10">
                    <Image
                        width="100%"
                        radius="none"
                        alt="Nili Razaghi"
                        src="/home/sign.png"/>
                </div>
                <div className="flex w-full flex-wrap gap-8 justify-between px-10 py-10">
                    {
                        images.map((image, index) =>
                            <div key={image?.bucket_image_id} className="w-album-image">
                                <Image
                                    shadow="sm"
                                    loading="eager"
                                    isBlurred={true}
                                    width="100%"
                                    radius="none"
                                    alt={image?.alt}
                                    src={image?.url}/>
                            </div>
                        )}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage

export async function getStaticProps() {
    const pageName = "home"
    const slider = await fetchPageImage("home_slider")

    try {
        const BucketFiles = await fetchBucketFiles(pageName)
        const page = await fetchPageByName(pageName)
        const pageImages = await fetchPageImages(page.id)

        const images = await Promise.all(BucketFiles.map(async (bucketFile) => {
            let pageImage = pageImages.find(image => (image.bucket_image_id === bucketFile.id))
            if (!pageImage) {

                const imageToInsert: DatabaseImage = imageToDbImage(bucketFile, page)

                pageImage = await insertImage(imageToInsert)
            }
            return pageImage as DatabaseImage
        }))
        return {
            props: {
                images: images,
                slider: slider
            },
            revalidate: REVALIDATE
        }
    } catch (error) {
        console.error('Failed to fetch home images', error)
        return {
            props: {
                images: []
            },
            revalidate: REVALIDATE
        }
    }
}