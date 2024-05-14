import supabase from "@/config/supabase_service";
import {IMAGE_BUCKET, IMAGE_TABLE, PAGE_TABLE} from "@/config/consts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {
    fetchBucketFiles, fetchFileName,
    fetchPageByName,
    fetchPageImages, fetchPublicImageUrl, getImageWidthHeight,
    imageToDbImage,
    insertImage, insertImages
} from "@/services/image.services";
import {type FileObject} from "@supabase/storage-js";
import {DatabaseImage} from "@/interface/database_image";
import GalleryPage from "@/pages/galleries";
import {BucketFile} from "@/interface/image.interface";
import {Page} from "@/interface/page.interface";
import galleries from "@/pages/galleries";


export const populateGalleryCover = async (bucketFile: BucketFile, galleryId: number) => {
    const {data: galleryCover, error} = await supabase
        .from(IMAGE_TABLE)
        .select("id")
        .eq("bucket_image_id", bucketFile.id)
    if (galleryCover?.length === 0) {
        const {width, height} =
            await getImageWidthHeight(`galleries/${bucketFile.name}`)
        const dbImage = {
            alt: fetchFileName(bucketFile.name),
            bucket_image_id: bucketFile.id,
            page_id: galleryId,
            order: 99,
            url: fetchPublicImageUrl(`galleries/${bucketFile.name}`),
            width: width,
            height: height
        }
        await insertImage(dbImage);
    }
}

export const populateGalleries = async (bucketGalleries: BucketFile[]) => {
    const pageName = 'galleries'
    const mainGalleryId = await fetchPageId('gallery')
    await removeDeletedGalleriesFromDb(bucketGalleries, mainGalleryId)
    await Promise.all(bucketGalleries.map(async (bucketFile) => {
        if (bucketFile.id) {
            const path = pageName + '/' + bucketFile.name.replace('.webp', '')
            const galleryName = path.replace('galleries/', '')
            await submitGalleryInDBIfNotExist(galleryName, mainGalleryId)
            await populateGalleryCover(bucketFile, mainGalleryId)
        }
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

export const populateGalleryImages = async (gallery: Page, path: string) => {
    const bucketImages = await fetchBucketFiles(path)
    const galleryImages = await fetchPageImages(gallery.id)
    await removeDeletedImagesFromDB(galleryImages, bucketImages)
    const imagesToInsert: DatabaseImage[] = []
    const imagesPromises = bucketImages?.map(async (bucketImage) => {
        let galleryImage =
            galleryImages.find((image) => image.bucket_image_id === bucketImage.id)
        if (!galleryImage) {
            galleryImage = await imageToDbImage(bucketImage, gallery)
            imagesToInsert.push(galleryImage)
        }
        return galleryImage
    })
    const images = await Promise.all(imagesPromises || [])
    if (images) {
        await insertImages(imagesToInsert)
    }
}

export const removeDeletedImagesFromDB = async (dbImages: DatabaseImage[], bucketImages: BucketFile[]) => {
    dbImages.map(async (dbImage) => {
        const isImageExist = bucketImages.some((bucketImage) => bucketImage.id === dbImage.bucket_image_id);
        if (!isImageExist) {
            let {data, error} = await supabase
                .from(IMAGE_TABLE)
                .delete()
                .match({id: dbImage.id})
            if (error) throw error
        }
    })
}

export const fetchPages = async (parentId: number) => {
    const {data: page, error} = await supabase
        .from(PAGE_TABLE)
        .select("*")
        .eq("parent_id", parentId)
    if (error) throw error
    return page
}
export const removeDeletedGalleriesFromDb = async (bucketGalleries: BucketFile[], pageId: number) => {
    const dbGalleries = await fetchPages(pageId)
    dbGalleries?.map(async (dbGallery) => {
        let fileExists = bucketGalleries.some((bucketGallery) =>
            bucketGallery.name.split(".")[0] === dbGallery.name)
        if (!fileExists) {
            await removeGalleryImagesFromDB(dbGallery.id)
            await removeGalleryFromDB(dbGallery.id)
        }
    })
}

export const removeGalleryImagesFromDB = async (galleyId: number) => {
    let {data: images, error: imagesError} = await supabase
        .from(IMAGE_TABLE)
        .delete()
        .match({page_id: galleyId})
    if (imagesError) throw imagesError
}

export const removeGalleryFromDB = async (galleryId: number) => {
    let {data: gallery, error: galleryError} = await supabase
        .from(PAGE_TABLE)
        .delete()
        .match({id: galleryId})
    if (galleryError) throw galleryError
}