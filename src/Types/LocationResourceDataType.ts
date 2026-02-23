

export interface LocationResourceDataType {
    content_url: string,
    description: string,
    from_location: string,
    to_location: string,
    from_normalized: string,
    to_normalized: string,
    from_keywords: string[],
    to_keywords: string[],
    tags: string[],
    type: string,
    id: string,
    route_key: string,
    language?: string,
    step_images?: string[]
    order?: number
}