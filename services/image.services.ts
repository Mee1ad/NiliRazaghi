import {DatabaseImage} from "@/interface/database_image";
import supabase from "@/config/supabase_service";
import {BUCKET_NAME, IMAGE_TABLE, PAGE_TABLE} from "@/config/consts";
import {Page} from "@/interface";

export const insertImage = async (image: DatabaseImage) => {
    const {error} = await supabase
        .from(IMAGE_TABLE)
        .insert([image])
    if (error) {
        throw error
    }
    return image
}
export const fetchBucketImages = async (pageName: Page["name"]) => {
    const {data: bucketImages, error: bucketImagesError} = await supabase
        .storage
        .from(BUCKET_NAME)
        .list(pageName)
    if (bucketImagesError) {
        throw bucketImagesError
    }
    return bucketImages
}
export const fetchPageImages = async (pageId: Page["id"]) => {
    const {data: dbImage, error: dbImageError} = await supabase
        .from(IMAGE_TABLE)
        .select("*")
        .eq('page_id', pageId)
    if (dbImageError) {
        throw dbImageError
    }
    return dbImage as DatabaseImage[]
}
export const fetchPageByName = async (pageName: Page["name"]) => {
    const {data: page, error: pageError} = await supabase
        .from(PAGE_TABLE)
        .select("*")
        .eq("name", pageName)
    if (pageError) {
        throw pageError
    }
    return page[0] as Page
}
export const fetchPublicImageUrl = (path: string) => {
    const {data: publicImageUrl} = supabase
        .storage
        .from(BUCKET_NAME)
        .getPublicUrl(path)
    return publicImageUrl.publicUrl
}

export const fetchFileName = (fileName: string) => {
    return fileName.split('.')[0]
}