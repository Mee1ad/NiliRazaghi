import Layout from "@/components/Layout";
import dynamic from 'next/dynamic';
import {title} from "@/components/primitives";
import {fetchBucketFiles} from "@/services/image.services";
import {REVALIDATE} from "@/config/consts";
import {fetchDBReels, insertReels, removeDeletedReelsFromDB} from "@/services/reels.services";
import {DBReels} from "@/interface/reels.interface";
import {FC} from "react";

const DynamicReactPlayer = dynamic(
    () => import('react-player'),
    {ssr: false}
);

const ReelsPage: FC<{ reels: DBReels[] }> = ({reels}) => {
    return (
        <Layout>
            <div className="text-center py-20">
                <title className={title()}>Reels</title>
                <section className="columns-1 sm-columns-2 md:columns-4 gap-10 p-10 ">
                    {
                        reels.map((reel) => (
                            <div className="mb-10 shadow-md relative pt-[177.25%]" key={reel.bucket_id}>
                                <DynamicReactPlayer width="100%" height="100%"
                                                    playing controls disablepictureinpicture
                                                    light={<img src={reel.cover_url} alt={reel.alt}/>}
                                                    url={[{src: reel.video_url, type: 'video/webm'}]}
                                                    className='absolute top-0 left-0'
                                                    config={{
                                                        file: {
                                                            attributes: {
                                                                controlsList: 'nodownload noplaybackrate disablepictureinpicture noremoteplayback ',
                                                                poster: reel.cover_url
                                                            },
                                                            forceHLS: true
                                                        }
                                                    }}
                                />
                            </div>
                        ))
                    }
                </section>
            </div>

        </Layout>
    )
}

export default ReelsPage

export async function getStaticProps() {
    const pageName = "reels"
    const coverPageName = "reels/covers"
    const bucketReels = await fetchBucketFiles(pageName)
    const bucketReelsCovers = await fetchBucketFiles(coverPageName)
    const dbReels = await fetchDBReels()
    await removeDeletedReelsFromDB(dbReels, bucketReels)
    await insertReels(bucketReels, dbReels, bucketReelsCovers)
    const reels = await fetchDBReels();
    console.log('reels', dbReels)

    return {
        props: {
            reels: reels
        },
        revalidate: REVALIDATE
    }
}