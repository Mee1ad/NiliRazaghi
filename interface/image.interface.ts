export interface BucketImage {
    name: string,
    id: string,
    updated_at: string,
    created_at: string,
    last_accessed_at: string,
    metadata: {
        eTag?: string,
        size?: number,
        mimetype?: string,
        cacheControl?: string,
        lastModified?: string,
        contentLength?: number,
        httpStatusCode?: number
    }

}

export interface BucketDirectory {
    name: string,
    id?: string,
    updated_at?: string,
    created_at?: string,
    last_accessed_at?: string,
    metadata?: object
}