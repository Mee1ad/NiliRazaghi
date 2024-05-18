import {title} from "@/components/primitives";
import {MdCameraAlt} from "react-icons/md";
import {Input} from "@nextui-org/react";
import Layout from "@/components/Layout";
import {
    fetchBucketFiles,
    fetchFileName,
    fetchPageByName,
    fetchPageImages,
    fetchPublicImageUrl,
    insertImage
} from "@/services/image.services";
import {DatabaseImage} from "@/interface/database_image";
import {fetchFeedbacks} from "@/services/feedback.services";
import {REVALIDATE} from "@/config/consts";
import {Feedback} from "@/interface/feedback.interface";
import {FC} from "react";
import FeedbackCard from "@/components/FeedbackCard";

interface FeedbackProps {
    feedbacks: Feedback[]
}

const FeedbackPage: FC<FeedbackProps> = ({feedbacks}) => {
    return (
        <Layout>
            <div className="py-20 px-10">
                <div className="text-center">
                    <span className="text-sm text-gray-500">REVIEWS</span>
                    <h1>
                        <title className={title({size: 'sm'})}>Feedback</title>
                    </h1>

                </div>
                <h4 className="pt-20 pb-10 text-gray-500 underline decoration-dotted underline-offset-8 decoration-gray-500">Leave Feedback</h4>
                <div className="flex flex-col">
                    {
                        feedbacks.map((feedback) =>
                            <FeedbackCard key={feedback.id} feedback={feedback}/>
                        )}
                </div>
                <h5 className="text-2xl font-bold">Leave Feedback</h5>
                <div className="flex py-10 gap-20">
                    <div className="flex h-28 w-28 bg-gray-400 justify-center items-center rounded-full">
                        <MdCameraAlt className="text-7xl text-white"/>
                    </div>
                    <div className="flex flex-col gap-4 w-7/12">
                        <Input type="text" autoComplete="off" placeholder="Your Name"/>
                        <Input type="text" autoComplete="off" placeholder="Link To Your Social Network Account"/>
                        <Input type="text" autoComplete="off" placeholder="Your Feedback"/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FeedbackPage

export async function getStaticProps() {
    const pageName = "feedback"

    try {
        const BucketFiles = await fetchBucketFiles(pageName)
        const page = await fetchPageByName(pageName)
        const pageImages = await fetchPageImages(page.id)
        const uploadBucketFiles = BucketFiles.map(
            async (bucketFile) => {
                let dbImage = pageImages
                    .find((pageImage) => pageImage.bucket_image_id === bucketFile.id)
                if (!dbImage) {
                    const dbImage = {
                        alt: fetchFileName(bucketFile.name),
                        bucket_image_id: bucketFile.id,
                        page_id: page.id,
                        order: 99,
                        url: fetchPublicImageUrl(`${pageName}/${bucketFile.name}`)
                    }
                    await insertImage(dbImage)
                }
                return dbImage as DatabaseImage
            })
        await Promise.all(uploadBucketFiles)
        const feedbacks = await fetchFeedbacks()
        return {
            props: {
                feedbacks: feedbacks
            },
            revalidate: REVALIDATE
        }
    } catch (error) {
        return {
            props: {
                feedbacks: []
            },
            revalidate: REVALIDATE
        }
    }

}