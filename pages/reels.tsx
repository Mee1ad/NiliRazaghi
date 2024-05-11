import Layout from "@/components/Layout";
import dynamic from 'next/dynamic';
import {title} from "@/components/primitives";
import {fetchBucketFiles} from "@/services/image.services";
import {REVALIDATE} from "@/config/consts";
import {fetchDBReels, insertReels, removeDeletedReelsFromDB} from "@/services/reels.services";
import {DBReels} from "@/interface/reels.interface";
import {FC} from "react";
import {Image} from "@nextui-org/react";
import clsx from "clsx";
import {FaPlay} from "react-icons/fa";

const DynamicReactPlayer = dynamic(
    () => import('react-player'),
    {ssr: false}
);

const ReelsPage: FC<{ reels: DBReels[] }> = ({reels}) => {
    return (
        <Layout>
            <div className="text-center py-20">
                <title className={title()}>Reels</title>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-10 ">
                    {
                        reels.map((reel) => (
                            <div className="mb-10 relative pt-[177.25%] rounded-xl" key={reel.bucket_id}>
                                <DynamicReactPlayer
                                    width="100%" height="100%"
                                    playing controls disablepictureinpicture
                                    light={<Image shadow="sm" isBlurred src={reel.cover_url} alt={reel.alt}/>}
                                    url={[{src: reel.video_url, type: 'video/webm'}]}
                                    className={clsx(
                                        'absolute top-0 left-0',
                                        '[&_video]:overflow-hidden [&_video]:rounded-2xl [&_video]:shadow-black/5 [&_video]:shadow-lg',
                                        '[&_.react-player__shadow]:z-20'
                                    )}
                                    playIcon={<FaPlay
                                        className="z-20 absolute text-4xl text-white opacity-70"/>}
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

    return {
        props: {
            reels: reels
        },
        revalidate: REVALIDATE
    }
}