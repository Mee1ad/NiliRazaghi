import {IMAGE_TABLE} from "@/config/consts";

export interface Feedback {
    id: number,
    name: string,
    text: string,
    social_media_id: string,
    created_at: string,
    [IMAGE_TABLE]: {
        id: number,
        alt: string,
        url: string,
        order: number,
        page_id: number,
        created_at: string,
        bucket_image_id: string
    }

}