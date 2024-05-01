import supabase from "@/config/supabase_service";
import {REELS_TABLE} from "@/config/consts";
import {DBReels} from "@/interface/reels.interface";
import {BucketFile} from "@/interface/image.interface";
import {fetchPublicImageUrl} from "@/services/image.services";

export const fetchDBReels = async () => {
    const {data: reels, error} = await supabase
        .from(REELS_TABLE)
        .select("*")
        .order('order')
    if (error) throw error;
    return reels ? reels as DBReels[] : []
}

export const removeDeletedReelsFromDB = async (dbReels: DBReels[], bucketReels: BucketFile[]) => {
    dbReels.map(async (dbReel) => {
        const reelExistsInBucket = bucketReels.some((bucketReel) =>
            bucketReel.id === dbReel.bucket_id)
        if (!reelExistsInBucket) {
            await supabase.from(REELS_TABLE).delete().eq("bucket_id", dbReel.bucket_id)
        }
    })
}

export const insertReels = async (bucketReels: BucketFile[], dbReels: DBReels[], dbReelsCovers: BucketFile[])=> {
    const reelsToInsert: DBReels[] = []
    bucketReels.map(async (bucketReel) => {
        const reelsExistsInDB = dbReels.some((dbReel) => bucketReel.id === dbReel.bucket_id)
        if (!reelsExistsInDB){
            const reelCoverName = bucketReel.name.split('.')[0] + ".webp"
            const dbReel = {
                bucket_id: bucketReel.id,
                video_url: fetchPublicImageUrl(`reels/${bucketReel.name}`),
                cover_url: fetchPublicImageUrl(`reels/covers/${reelCoverName}`),
                alt: bucketReel.name.split('.')[0]
            }
            reelsToInsert.push(dbReel)
        }
    })
    await supabase.from(REELS_TABLE).insert(reelsToInsert)
}