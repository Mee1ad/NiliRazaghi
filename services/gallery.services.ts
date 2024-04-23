import supabase from "@/config/supabase_service";
import {IMAGE_BUCKET, IMAGE_TABLE, PAGE_TABLE} from "@/config/consts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {
    fetchBucketImages, fetchFileName,
    fetchPageByName,
    fetchPageImages, fetchPublicImageUrl,
    imageToDbImage,
    insertImage, insertImages
} from "@/services/image.services";
import {type FileObject} from "@supabase/storage-js";
import {DatabaseImage} from "@/interface/database_image";
import GalleryPage from "@/pages/galleries";
import {BucketImage} from "@/interface/image.interface";
import {Page} from "@/interface";


export const populateGalleryCover = async (bucketFile: BucketImage, galleryId: number) => {
    const {data: galleryCover, error} = await supabase
        .from(IMAGE_TABLE)
        .select("id")
        .eq("bucket_image_id", bucketFile.id)
    if (galleryCover?.length === 0) {
        const dbImage = {
            alt: fetchFileName(bucketFile.name),
            bucket_image_id: bucketFile.id,
            page_id: galleryId,
            order: 99,
            url: fetchPublicImageUrl(`galleries/${bucketFile.name}`)
        }
        await insertImage(dbImage);
    }
}

export const populateGalleries = async (bucketGalleries: BucketImage[]) => {
    const page_name = 'galleries'
    const mainGalleryId = await fetchPageId('gallery')
    await Promise.all(bucketGalleries.map(async (bucketFile) => {
        if (bucketFile.id) {
            const path = page_name + '/' + bucketFile.name.replace('.jpg', '')
            const galleryName = path.replace('galleries/', '')
            await submitGalleryInDBIfNotExist(galleryName, mainGalleryId)
            const bucketImages = await fetchBucketImages(path)
            const gallery = await fetchPageByName(galleryName)
            await populateGalleryCover(bucketFile, mainGalleryId)
            const galleryImages = await fetchPageImages(gallery.id)

            const imagesToInsert: DatabaseImage[] = []
            const images = bucketImages?.map((bucketImage) => {
                let galleryImage =
                    galleryImages.find((image) => image.bucket_image_id === bucketImage.id)
                if (!galleryImage) {
                    galleryImage = imageToDbImage(bucketImage, path)
                    galleryImage.page_id = gallery.id
                    imagesToInsert.push(galleryImage)
                }
                return galleryImage
            })
            if (images) {
                await insertImages(imagesToInsert)
            }
        }
        // await Promise.all(images)
    }))
}

export const fetchBucketGalleries = async () => {
    const {data: galleries, error} = await supabase
        .storage
        .from(IMAGE_BUCKET)
        .list('galleries')
    if (error) {
        throw error
    }
    return galleries
}

export const fetchGalleryPage = async () => {
    const gallery = await fetchPageByName('gallery')
    const {data: galleries, error} = await supabase
        .from(IMAGE_TABLE)
        .select("*")
        .eq('page_id', gallery.id)
    if (error) {
        throw error
    }
    return galleries as DatabaseImage[]
}

export const fetchGalleries = async (page_id: number) => {
    const {data: galleries, error} = await supabase
        .from(PAGE_TABLE)
        .select("*, nili_image (*)")
        .eq("parent_id", page_id)

    return galleries || []
}

export const submitGalleryInDBIfNotExist = async (galleryName: string, galleryId: number) => {
    const {data: galleryPage, error} = await supabase
        .from(PAGE_TABLE)
        .select("*")
        .eq("parent_id", galleryId)
        .eq("name", galleryName)
    if (galleryPage?.length === 0) {
        const {error} = await supabase
            .from(PAGE_TABLE)
            .insert([{name: galleryName, parent_id: galleryId}])
        if (error) throw error
    }
    return galleryPage
}

export const fetchPageId = async (pageName: string) => {
    const {data: page, error: pageError} = await supabase
        .from(PAGE_TABLE)
        .select("id")
        .eq("name", pageName)
    if (pageError) {
        throw pageError
    }
    return page[0]?.id
}