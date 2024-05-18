import {Image} from "@nextui-org/react"
import {FC} from "react"
import Layout from "@/components/Layout"
import {DatabaseImage} from "@/interface/database_image";
import {
    fetchPageByName,
    fetchPageImages,
} from "@/services/image.services";
import {REVALIDATE} from "@/config/consts";
import {populateGalleryImages} from "@/services/gallery.services";

interface HomeProps {
    images: DatabaseImage[]
}

const HomePage: FC<HomeProps> = ({images}) => {
    return (
        <Layout>
            <div className="flex flex-col text-xl text-gray-500 items-center">
                <Image
                    loading="lazy"
                    width="4608"
                    height="3072"
                    radius="none"
                    alt="a girl looking to camera"
                    src="https://zmhtvmpgfbcmndmudwow.supabase.co/storage/v1/object/public/Nili%20Website/home_slider.webp?t=2024-05-11T16%3A58%3A12.926Z"/>
                <p className="px-56 pt-28">While there is perhaps a province in which the photograph can tell us nothing
                    more than what we see with
                    our own eyes, there is another in which it proves to us how little our eyes permit us to see.</p>
                <div className="w-1/4 pt-10">
                    <Image
                        loading="lazy"
                        isBlurred
                        width="776"
                        height="213"
                        radius="none"
                        alt="nili_sign"
                        src="https://zmhtvmpgfbcmndmudwow.supabase.co/storage/v1/object/public/Nili%20Website/nili_sign.png?t=2024-05-11T16%3A59%3A02.385Z"/>
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

    try {
        const page = await fetchPageByName(pageName)
        await populateGalleryImages(page, pageName)
        const images = await fetchPageImages(page.id)
        return {
            props: {
                images: images,
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