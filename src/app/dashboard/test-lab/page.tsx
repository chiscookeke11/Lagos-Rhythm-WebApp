"use client"

import React, { useEffect, useState } from "react"
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import Loader from "@/components/common/Loader"
import toast from "react-hot-toast"
import {
  Play,
  Volume2,
  Download,
  Image as ImageIcon,
  Eye,
  Copy,
  Check,
} from "lucide-react"

interface MediaItem {
  type: "text" | "sound" | "image" | "video"
  language?: string
  title?: string
  content_url?: string
  route_key?: string
}

interface RouteMedia {
  route_key: string
  from_location: string
  to_location: string
  media: MediaItem[]
}

export default function TestLabPage() {
  const [routes, setRoutes] = useState<RouteMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<"routes" | "media" | "api">("routes")
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true)
        const q = query(
          collection(fireDB, "routes_resources"),
          orderBy("order", "asc"),
          limit(100)
        )
        const querySnapshot = await getDocs(q)

        // Group by route_key
        const routeMap = new Map<string, RouteMedia>()

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data() as {
            route_key?: string
            from_location?: string
            to_location?: string
            type?: MediaItem["type"]
            language?: string
            title?: string
            content_url?: string
          }
          const route_key = data.route_key || "unknown"

          if (!routeMap.has(route_key)) {
            routeMap.set(route_key, {
              route_key,
              from_location: data.from_location || "",
              to_location: data.to_location || "",
              media: [],
            })
          }

          const route = routeMap.get(route_key)!
          route.media.push({
            type: data.type,
            language: data.language,
            title: data.title,
            content_url: data.content_url,
            route_key: data.route_key,
          })
        })

        setRoutes(Array.from(routeMap.values()))
      } catch (error) {
        console.error("Error fetching routes:", error)
        toast.error("Failed to load test data")
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  // Copy URL to clipboard
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  // Media preview card
  const MediaPreview = ({ media }: { media: MediaItem }) => {
    return (
      <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-2 py-1 bg-[#EF8F57] text-white rounded">
            {media.type.toUpperCase()}
            {media.language && ` • ${media.language}`}
          </span>
        </div>

        {media.title && (
          <p className="text-[#05073C] font-semibold text-sm mb-2">
            {media.title}
          </p>
        )}

        <div className="space-y-2">
          {media.type === "video" && media.content_url && (
            <video
              src={media.content_url}
              controls
              className="w-full rounded bg-black"
              style={{ maxHeight: "200px" }}
            />
          )}

          {media.type === "sound" && media.content_url && (
            <audio
              src={media.content_url}
              controls
              className="w-full"
            />
          )}

          {media.type === "image" && media.content_url && (
            <div className="relative group">
              <img
                src={media.content_url}
                alt="preview"
                className="w-full rounded max-h-48 object-cover"
              />
              <button
                onClick={() => window.open(media.content_url, "_blank")}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity"
              >
                <Eye size={24} className="text-white" />
              </button>
            </div>
          )}

          {media.type === "text" && media.content_url && (
            <a
              href={media.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              <Download size={14} />
              Open PDF
            </a>
          )}

          {media.content_url && (
            <button
              onClick={() => copyUrl(media.content_url!)}
              className="w-full flex items-center gap-2 text-xs text-[#737791] bg-white px-2 py-1 rounded border border-[#E5E7EB] hover:bg-[#FFF5F0] transition-colors mt-2"
            >
              {copiedUrl === media.content_url ? (
                <>
                  <Check size={12} className="text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy URL
                </>
              )}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-start gap-8 py-7 px-7 font-lato">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-[#05073C] font-bold text-3xl font-playfair">
          Test Lab
        </h1>
        <p className="text-[#737791] text-sm mt-1">
          Preview and test Street Rhythm media & routes
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full flex gap-4 border-b border-[#E5E7EB]">
        <button
          onClick={() => setSelectedTab("routes")}
          className={`pb-3 px-4 font-semibold transition-colors ${
            selectedTab === "routes"
              ? "text-[#EF8F57] border-b-2 border-[#EF8F57]"
              : "text-[#737791] hover:text-[#05073C]"
          }`}
        >
          Routes ({routes.length})
        </button>
        <button
          onClick={() => setSelectedTab("media")}
          className={`pb-3 px-4 font-semibold transition-colors ${
            selectedTab === "media"
              ? "text-[#EF8F57] border-b-2 border-[#EF8F57]"
              : "text-[#737791] hover:text-[#05073C]"
          }`}
        >
          Media Gallery
        </button>
        <button
          onClick={() => setSelectedTab("api")}
          className={`pb-3 px-4 font-semibold transition-colors ${
            selectedTab === "api"
              ? "text-[#EF8F57] border-b-2 border-[#EF8F57]"
              : "text-[#737791] hover:text-[#05073C]"
          }`}
        >
          API Info
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="w-full h-64 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Routes Tab */}
      {selectedTab === "routes" && !loading && (
        <div className="w-full space-y-4">
          {routes.length === 0 ? (
            <div className="bg-[#F5F5F5] p-8 rounded-lg text-center">
              <p className="text-[#737791]">No routes found</p>
            </div>
          ) : (
            routes.map((route) => (
              <div
                key={route.route_key}
                className="bg-white border border-[#E5E7EB] rounded-lg p-6"
              >
                <h3 className="text-[#05073C] font-bold text-lg mb-2">
                  {route.from_location} → {route.to_location}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {["video", "sound", "image", "text"].map((type) => {
                    const count = route.media.filter((m) => m.type === type).length
                    return (
                      <div
                        key={type}
                        className="bg-[#F5F5F5] p-2 rounded text-center text-sm"
                      >
                        <p className="text-[#05073C] font-semibold">{count}</p>
                        <p className="text-[#737791] text-xs capitalize">
                          {type}s
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Sample Media Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {route.media.slice(0, 3).map((media, idx) => (
                    <MediaPreview key={idx} media={media} />
                  ))}
                </div>

                {route.media.length > 3 && (
                  <p className="text-[#737791] text-xs mt-4">
                    +{route.media.length - 3} more items
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Media Gallery Tab */}
      {selectedTab === "media" && !loading && (
        <div className="w-full space-y-6">
          {/* Videos */}
          {routes.some((r) => r.media.some((m) => m.type === "video")) && (
            <div>
              <h2 className="text-[#05073C] font-bold text-xl mb-4 flex items-center gap-2">
                <Play size={20} />
                Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes
                  .flatMap((r) =>
                    r.media
                      .filter((m) => m.type === "video")
                      .map((m) => ({ ...m, route: r }))
                  )
                  .map((media, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden"
                    >
                      <MediaPreview media={media} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Audio */}
          {routes.some((r) => r.media.some((m) => m.type === "sound")) && (
            <div>
              <h2 className="text-[#05073C] font-bold text-xl mb-4 flex items-center gap-2">
                <Volume2 size={20} />
                Audio Guides
              </h2>
              <div className="space-y-4">
                {routes
                  .flatMap((r) =>
                    r.media
                      .filter((m) => m.type === "sound")
                      .map((m) => ({
                        ...m,
                        route: r,
                      }))
                  )
                  .map((media, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5E7EB] rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-[#05073C] font-semibold text-sm">
                            {media.route.from_location} → {media.route.to_location}
                          </p>
                          <p className="text-[#737791] text-xs capitalize">
                            {media.language} Audio
                          </p>
                        </div>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">
                          AUDIO
                        </span>
                      </div>
                      <audio src={media.content_url} controls className="w-full mt-3" />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Images */}
          {routes.some((r) => r.media.some((m) => m.type === "image")) && (
            <div>
              <h2 className="text-[#05073C] font-bold text-xl mb-4 flex items-center gap-2">
                <ImageIcon size={20} />
                Landmarks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes
                  .flatMap((r) =>
                    r.media
                      .filter((m) => m.type === "image")
                      .map((m) => ({
                        ...m,
                        route: r,
                      }))
                  )
                  .map((media, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden"
                    >
                      <MediaPreview media={media} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Info Tab */}
      {selectedTab === "api" && !loading && (
        <div className="w-full space-y-6 max-w-2xl">
          <div className="bg-[#F5F5F5] p-6 rounded-lg space-y-4">
            <h2 className="text-[#05073C] font-bold text-lg">API Endpoints</h2>

            {/* Collections Info */}
            <div className="bg-white p-4 rounded border border-[#E5E7EB]">
              <p className="text-[#05073C] font-semibold text-sm mb-2">
                Firestore Collection
              </p>
              <code className="text-xs bg-[#05073C] text-[#EF8F57] p-2 rounded block mt-1">
                db.collection(&quot;routes_resources&quot;)
              </code>
            </div>

            {/* Sample Document */}
            <div className="bg-white p-4 rounded border border-[#E5E7EB]">
              <p className="text-[#05073C] font-semibold text-sm mb-2">
                Document Structure
              </p>
              <pre className="text-xs bg-[#05073C] text-[#EF8F57] p-3 rounded overflow-x-auto">
                {`{
  route_key: "yaba-maryland",
  from_location: "Yaba",
  to_location: "Maryland",
  type: "video" | "sound" | "image" | "text",
  language: "english" | "pidgin" | "yoruba",
  title: "Route Title",
  content_url: "https://firebase...",
  order: 1
}`}
              </pre>
            </div>

            {/* Statistics */}
            <div className="bg-white p-4 rounded border border-[#E5E7EB]">
              <p className="text-[#05073C] font-semibold text-sm mb-3">
                Current Data
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[#737791] text-xs">Total Routes</p>
                  <p className="text-[#05073C] font-bold text-lg">
                    {routes.length}
                  </p>
                </div>
                <div>
                  <p className="text-[#737791] text-xs">Total Media Items</p>
                  <p className="text-[#05073C] font-bold text-lg">
                    {routes.reduce((sum, r) => sum + r.media.length, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-[#737791] text-xs">Videos</p>
                  <p className="text-[#05073C] font-bold text-lg">
                    {routes.reduce((sum, r) => sum + r.media.filter((m) => m.type === "video").length, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-[#737791] text-xs">Audio Guides</p>
                  <p className="text-[#05073C] font-bold text-lg">
                    {routes.reduce((sum, r) => sum + r.media.filter((m) => m.type === "sound").length, 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="bg-white p-4 rounded border border-[#E5E7EB]">
              <p className="text-[#05073C] font-semibold text-sm mb-2">
                Firebase Project
              </p>
              <p className="text-xs text-[#737791] font-mono">
                lagos-rhythm-19b8a
              </p>
            </div>

            {/* Testing Notes */}
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="text-blue-900 font-semibold text-sm mb-2">💡 Testing Tips</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• All media URLs are from Firebase Cloud Storage</li>
                <li>• Videos support standard playback controls</li>
                <li>• Audio guides are available in multiple languages</li>
                <li>• Images are optimized for mobile viewing</li>
                <li>• All URLs are publicly accessible</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
