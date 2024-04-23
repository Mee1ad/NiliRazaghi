import {DatabaseImage} from "@/interface/database_image";
import supabase from "@/config/supabase_service";
import {IMAGE_BUCKET, IMAGE_TABLE, PAGE_TABLE} from "@/config/consts";
import {Page} from "@/interface";
import {BucketImage, BucketDirectory} from "@/interface/image.interface";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const insertImages = async (images: DatabaseImage[]) => {
    const {error} = await supabase
        .from(IMAGE_TABLE)
        .insert(images)
    if (error) {
        throw error
    }
    return images
}

export const insertImage = async (image: DatabaseImage) => {
    const {error} = await supabase
        .from(IMAGE_TABLE)
        .insert(image)
    if (error) {
        throw error
    }
    return image
}

export const fetchBucketImages = async (pageName: Page["name"]) => {
    let {data: bucketImages, error: bucketImagesError} = await supabase
        .storage
        .from(IMAGE_BUCKET)
        .list(pageName)
    if (bucketImagesError) {
        throw bucketImagesError
    }
    const filteredBucketImages: BucketImage[] | undefined = bucketImages?.filter(image => image.metadata != null)

    return filteredBucketImages as BucketImage[]
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
        .from(IMAGE_BUCKET)
        .getPublicUrl(path)
    return publicImageUrl.publicUrl
}
export const fetchFileName = (fileName: string) => {
    return fileName.split('.')[0]
}
export const imageToDbImage = (bucketImage, page) => {
    return {
        alt: bucketImage.name.split('.')[0],
        bucket_image_id: bucketImage.id,
        page_id: page.id,
        order: 99,
        url: fetchPublicImageUrl(`${page.name}/${bucketImage.name}`)
    }
}
