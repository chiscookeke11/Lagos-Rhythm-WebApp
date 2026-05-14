"use client"

import React, { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import Button from "@/components/common/Button"
import toast from "react-hot-toast"
import Loader from "@/components/common/Loader"
import { Trash2, Edit2, Eye } from "lucide-react"
import StreetRhythmRouteForm from "@/components/dashboard/StreetRhythmRouteForm"
import StreetRhythmRoutePreview from "@/components/dashboard/StreetRhythmRoutePreview"

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
  createdAt?: Date
}

interface FirestoreRouteResource {
  route_key?: string
  from_location?: string
  to_location?: string
  title?: string
  subtitle?: string
  description?: string
  type?: RouteMediaItem["type"]
  language?: string
  content_url?: string
  order?: number
  createdAt?: {
    toDate?: () => Date
  }
}

export default function StreetRhythmRoutesPage() {
  const [routes, setRoutes] = useState<RouteData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null)
  const [previewRoute, setPreviewRoute] = useState<RouteData | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Fetch routes from Firestore
  const fetchRoutes = async () => {
    try {
      setLoading(true)
      const q = query(
        collection(fireDB, "routes_resources"),
        orderBy("order", "asc")
      )
      const querySnapshot = await getDocs(q)

      // Group by route_key to combine all media for each route
      const routeMap = new Map<string, RouteData>()

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data() as FirestoreRouteResource
        const route_key = data.route_key || "unknown"

        if (!routeMap.has(route_key)) {
          routeMap.set(route_key, {
            id: route_key,
            route_key,
            from_location: data.from_location || "",
            to_location: data.to_location || "",
            title: data.title || "",
            subtitle: data.subtitle || "",
            description: data.description || "",
            media: [],
            createdAt: data.createdAt?.toDate?.() || new Date(),
          })
        }

        const route = routeMap.get(route_key)!
        route.media.push({
          type: data.type,
          language: data.language,
          title: data.title,
          content_url: data.content_url,
          order: data.order,
        })
      })

      setRoutes(Array.from(routeMap.values()))
    } catch (error) {
      console.error("Error fetching routes:", error)
      toast.error("Failed to fetch routes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoutes()
  }, [])

  // Delete route
  const handleDelete = async (route_key: string) => {
    if (!confirm(`Delete route ${route_key}?`)) return

    try {
      setDeleting(route_key)
      const q = query(collection(fireDB, "routes_resources"))
      const querySnapshot = await getDocs(q)

      const batch = querySnapshot.docs.filter(
        (doc) => doc.data().route_key === route_key
      )

      // Delete all documents for this route
      for (const docSnapshot of batch) {
        await deleteDoc(doc(fireDB, "routes_resources", docSnapshot.id))
      }

      setRoutes((prev) => prev.filter((r) => r.route_key !== route_key))
      toast.success("Route deleted successfully")
    } catch (error) {
      console.error("Error deleting route:", error)
      toast.error("Failed to delete route")
    } finally {
      setDeleting(null)
    }
  }

  // Media type badge
  const getMediaTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      text: "bg-blue-100 text-blue-800",
      sound: "bg-purple-100 text-purple-800",
      image: "bg-green-100 text-green-800",
      video: "bg-red-100 text-red-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  // Get media count by type
  const getMediaStats = (
    media: RouteMediaItem[]
  ): Record<string, number> => {
    return media.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-start gap-8 py-7 px-7 font-lato">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-[#05073C] font-bold text-3xl font-playfair">
            Street Rhythm Routes
          </h1>
          <p className="text-[#737791] text-sm mt-1">
            Manage routes, media, and test data
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingRoute(null)
            setShowForm(!showForm)
          }}
          label={showForm ? "Cancel" : "Add New Route"}
          ariaLabel="add new route"
          type="button"
          className="!bg-[#EF8F57] flex items-center gap-2"
        />
      </div>

      {/* Form */}
      {showForm && (
        <StreetRhythmRouteForm
          editingRoute={editingRoute}
          onSave={() => {
            setShowForm(false)
            setEditingRoute(null)
            fetchRoutes()
          }}
          onCancel={() => {
            setShowForm(false)
            setEditingRoute(null)
          }}
        />
      )}

      {/* Preview */}
      {previewRoute && (
        <StreetRhythmRoutePreview
          route={previewRoute}
          onClose={() => setPreviewRoute(null)}
        />
      )}

      {/* Loading */}
      {loading && (
        <div className="w-full h-64 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Empty State */}
      {!loading && routes.length === 0 && (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-[#F5F5F5] rounded-lg">
          <p className="text-[#737791] text-lg font-medium">
            No routes found
          </p>
          <p className="text-[#737791] text-sm mt-1">
            Create your first route to get started
          </p>
        </div>
      )}

      {/* Routes Grid */}
      {!loading && routes.length > 0 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map((route) => {
            const mediaStats = getMediaStats(route.media)

            return (
              <div
                key={route.route_key}
                className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow"
              >
                {/* Route Title */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-[#05073C] font-bold text-lg">
                    {route.from_location} → {route.to_location}
                  </h3>
                  {route.title && (
                    <p className="text-[#737791] text-sm">{route.title}</p>
                  )}
                  {route.subtitle && (
                    <p className="text-[#737791] text-xs">{route.subtitle}</p>
                  )}
                </div>

                {/* Description */}
                {route.description && (
                  <p className="text-[#737791] text-sm mb-4 line-clamp-2">
                    {route.description}
                  </p>
                )}

                {/* Media Stats */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {Object.entries(mediaStats).map(([type, count]) => (
                    <span
                      key={type}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getMediaTypeBadge(type)}`}
                    >
                      {count} {type}
                      {count !== 1 ? "s" : ""}
                    </span>
                  ))}
                </div>

                {/* Media List */}
                <div className="mb-4 max-h-32 overflow-y-auto">
                  <p className="text-[#05073C] font-semibold text-xs mb-2">
                    Media Items:
                  </p>
                  <div className="space-y-1">
                    {route.media.map((media, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-[#737791] flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-[#EF8F57] rounded-full" />
                        <span>
                          {media.type}
                          {media.language && ` (${media.language})`}
                          {media.title && `: ${media.title}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setPreviewRoute(route)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#05073C] hover:bg-[#F5F5F5] rounded transition-colors flex-1"
                    title="Preview"
                  >
                    <Eye size={16} />
                    Preview
                  </button>

                  <button
                    onClick={() => {
                      setEditingRoute(route)
                      setShowForm(true)
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#EF8F57] hover:bg-[#FFF5F0] rounded transition-colors flex-1"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(route.route_key)}
                    disabled={deleting === route.route_key}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors flex-1 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === route.route_key ? (
                      <Loader />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Stats */}
      {!loading && routes.length > 0 && (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-[#F5F5F5] rounded-lg p-4">
            <p className="text-[#737791] text-xs font-medium">Total Routes</p>
            <p className="text-[#05073C] text-2xl font-bold mt-1">
              {routes.length}
            </p>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-4">
            <p className="text-[#737791] text-xs font-medium">Total Media</p>
            <p className="text-[#05073C] text-2xl font-bold mt-1">
              {routes.reduce((sum, r) => sum + r.media.length, 0)}
            </p>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-4">
            <p className="text-[#737791] text-xs font-medium">Videos</p>
            <p className="text-[#05073C] text-2xl font-bold mt-1">
              {routes.reduce(
                (sum, r) =>
                  sum + r.media.filter((m) => m.type === "video").length,
                0
              )}
            </p>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-4">
            <p className="text-[#737791] text-xs font-medium">Audio Guides</p>
            <p className="text-[#05073C] text-2xl font-bold mt-1">
              {routes.reduce(
                (sum, r) =>
                  sum + r.media.filter((m) => m.type === "sound").length,
                0
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
