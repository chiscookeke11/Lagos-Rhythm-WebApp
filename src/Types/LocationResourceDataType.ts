export interface RouteSegmentStop {
    stop_name: string,
    normalized_stop_name?: string,
    order?: number,
    video_start?: number,
    video_end?: number
}

// This interface covers the current Street Rhythm documents and the near-term
// fields we need for richer route rendering before maps/notifications land.
export interface LocationResourceDataType {
    id: string,
    type: string,
    route_key: string,
    content_url: string,
    description: string,
    from_location: string,
    to_location: string,
    from_normalized: string,
    to_normalized: string,
    from_keywords: string[],
    to_keywords: string[],
    tags: string[],
    language?: string,
    order?: number,
    step_images?: string[],
    title?: string,
    subtitle?: string,
    summary?: string,
    content_text?: string,
    overview_download_url?: string,
    download_label?: string,
    fare_info?: string,
    safety_info?: string,
    landmark_title?: string,
    landmark_name?: string,
    segment_stops?: RouteSegmentStop[]
}
