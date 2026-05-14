"use client"

import React from "react"
import { Play, Download, Volume2, Image as ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RouteMediaItem {
  type: "text" | "sound" | "image" | "video"
  language?: string
  title?: string
  content_url?: string
  order?: number
}

interface RouteData {
  id: string
  route_key: string
  from_location: string
  to_location: string
  title?: string
  subtitle?: string
  description?: string
  media: RouteMediaItem[]
}

interface Props {
  route: RouteData
  onClose: () => void
}

export default function StreetRhythmRoutePreview({ route, onClose }: Props) {
  const mediaByType = route.media.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = []
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, RouteMediaItem[]>
  )

  // Get primary video
  const videos = mediaByType.video || []
  const primaryVideo = videos.find((v) => v.order === 1) || videos[0]

  // Get audio guides
  const audioGuides = mediaByType.sound || []

  // Get images
  const images = mediaByType.image || []

  // Get text guide
  const textGuide = mediaByType.text?.[0]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#05073C]">
            {route.from_location} → {route.to_location}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Route Info */}
          <div className="bg-[#F5F5F5] p-4 rounded-lg">
            {route.title && (
              <p className="text-[#05073C] font-semibold">{route.title}</p>
            )}
            {route.subtitle && (
              <p className="text-[#737791] text-sm">{route.subtitle}</p>
            )}
            {route.description && (
              <p className="text-[#737791] text-sm mt-2">{route.description}</p>
            )}
          </div>

          {/* Primary Video */}
          {primaryVideo && primaryVideo.content_url && (
            <div className="space-y-2">
              <h3 className="text-[#05073C] font-bold text-lg flex items-center gap-2">
                <Play size={18} />
                Main Route Video
              </h3>
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  src={primaryVideo.content_url}
                  controls
                  className="w-full h-full"
                  poster=""
                />
              </div>
              {primaryVideo.title && (
                <p className="text-[#737791] text-sm">{primaryVideo.title}</p>
              )}
            </div>
          )}

          {/* Audio Guides */}
          {audioGuides.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[#05073C] font-bold text-lg flex items-center gap-2">
                <Volume2 size={18} />
                Audio Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {audioGuides.map((audio, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F5F5] p-4 rounded-lg space-y-2"
                  >
                    <p className="text-[#05073C] font-semibold text-sm capitalize">
                      {audio.language || "English"}
                    </p>
                    <audio
                      src={audio.content_url}
                      controls
                      className="w-full h-8"
                    />
                    {audio.title && (
                      <p className="text-[#737791] text-xs">{audio.title}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[#05073C] font-bold text-lg flex items-center gap-2">
                <ImageIcon size={18} />
                Landmarks & Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="bg-[#F5F5F5] rounded-lg overflow-hidden aspect-video">
                      <img
                        src={image.content_url}
                        alt={image.title || "Route image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {image.title && (
                      <p className="text-[#05073C] font-semibold text-sm">
                        {image.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Guide */}
          {textGuide && textGuide.content_url && (
            <div className="space-y-2">
              <h3 className="text-[#05073C] font-bold text-lg flex items-center gap-2">
                <Download size={18} />
                Route Guide
              </h3>
              <a
                href={textGuide.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#EF8F57] text-white px-4 py-2 rounded-lg hover:bg-[#EF8F57]/90 transition-colors"
              >
                <Download size={16} />
                Download PDF Guide
              </a>
            </div>
          )}

          {/* Media Summary */}
          <div className="bg-[#F5F5F5] p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[#737791] text-xs font-medium">Videos</p>
              <p className="text-[#05073C] text-xl font-bold">
                {mediaByType.video?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-[#737791] text-xs font-medium">Audio</p>
              <p className="text-[#05073C] text-xl font-bold">
                {mediaByType.sound?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-[#737791] text-xs font-medium">Images</p>
              <p className="text-[#05073C] text-xl font-bold">
                {mediaByType.image?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-[#737791] text-xs font-medium">Guides</p>
              <p className="text-[#05073C] text-xl font-bold">
                {mediaByType.text?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
