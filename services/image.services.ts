import {DatabaseImage} from "@/interface/database_image";
import supabase from "@/config/supabase_service";
import {IMAGE_BUCKET, IMAGE_TABLE, PAGE_TABLE} from "@/config/consts";
import {Page} from "@/interface/page.interface";
import {BucketFile, BucketDirectory} from "@/interface/image.interface";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Buffer} from "node:buffer";
import sharp from "sharp";

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
export const fetchBucketFiles = async (pageName: Page["name"]) => {
    let {data: bucketImages, error: bucketImagesError} = await supabase
        .storage
        .from(IMAGE_BUCKET)
        .list(pageName)
    if (bucketImagesError) {
        throw bucketImagesError
    }
    const filteredBucketFiles: BucketFile[] | undefined = bucketImages?.filter(image => image.metadata != null)

    return filteredBucketFiles as BucketFile[]
}
export const fetchPageImages = async (pageId: Page["id"]) => {
    const {data: dbImage, error: dbImageError} = await supabase
        .from(IMAGE_TABLE)
        .select("*")
        .eq('page_id', pageId)
        .order('order')
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
export const getImageWidthHeight = async (path: string) => {
    console.log('path', path)
    const {data, error} = await supabase
        .storage
        .from(IMAGE_BUCKET)
        .download(path)
    if (error) throw error
    let width = 0
    let height = 0
    if (data?.size > 0) {
        const imageBuffer = await data?.arrayBuffer()
        const buffer = Buffer.from(imageBuffer)
        const metadata = await sharp(buffer).metadata()
        width = metadata.width || 0
        height = metadata.height || 0
    }
    return {width, height}
}
export const imageToDbImage = async (bucketImage: BucketFile, page: Page, path: string = '') => {
    const {width, height} =
        await getImageWidthHeight(`${path}/${bucketImage.name}`)
    console.log('widthm height:', width, height)
    return {
        alt: bucketImage.name.split('.')[0],
        bucket_image_id: bucketImage.id,
        page_id: page.id,
        order: 99,
        url: fetchPublicImageUrl(`${path}/${bucketImage.name}`),
        width: width,
        height: height,
    }
}
export const fetchPageImage = async (pageName: Page["name"]) => {
    const {data: slider, error} = await supabase
        .from(PAGE_TABLE)
        .select("*, nili_image:image_id (*)")
        .eq("name", pageName)
    if (error) throw error;
    return slider[0].nili_image as DatabaseImage
}