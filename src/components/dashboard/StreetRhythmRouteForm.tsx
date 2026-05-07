"use client"

import React, { useState, useEffect } from "react"
import { collection, addDoc, serverTimestamp, query, getDocs, doc, deleteDoc } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import toast from "react-hot-toast"
import { X } from "lucide-react"

interface RouteMediaItem {
  type: "text" | "sound" | "image" | "video"
  language?: string
  title?: string
  content_url?: string
  order?: number
}

interface RouteData {
  route_key: string
  from_location: string
  to_location: string
  title?: string
  subtitle?: string
  description?: string
  media: RouteMediaItem[]
}

interface Props {
  editingRoute?: RouteData | null
  onSave: () => void
  onCancel: () => void
}

export default function StreetRhythmRouteForm({
  editingRoute,
  onSave,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<RouteData>({
    route_key: "",
    from_location: "",
    to_location: "",
    title: "",
    subtitle: "",
    description: "",
    media: [],
  })

  const [newMedia, setNewMedia] = useState<RouteMediaItem>({
    type: "text",
    language: "english",
    title: "",
    content_url: "",
    order: 1,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingRoute) {
      setFormData(editingRoute)
    }
  }, [editingRoute])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewMedia((prev) => {
      if (name === "order") {
        return { ...prev, [name]: parseInt(value) || 0 }
      }
      return { ...prev, [name]: value }
    })
  }

  const addMedia = () => {
    if (!newMedia.content_url) {
      toast.error("Please enter a media URL")
      return
    }

    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, { ...newMedia }],
    }))

    setNewMedia({
      type: "text",
      language: "english",
      title: "",
      content_url: "",
      order: 1,
    })

    toast.success("Media added")
  }

  const removeMedia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.route_key || !formData.from_location || !formData.to_location) {
      toast.error("Please fill all required fields")
      return
    }

    if (formData.media.length === 0) {
      toast.error("Please add at least one media item")
      return
    }

    try {
      setLoading(true)

      // If editing, delete old entries
      if (editingRoute) {
        const q = query(collection(fireDB, "routes_resources"))
        const querySnapshot = await getDocs(q)
        const batch = querySnapshot.docs.filter(
          (d) => d.data().route_key === editingRoute.route_key
        )
        for (const docSnapshot of batch) {
          await deleteDoc(
            doc(fireDB, "routes_resources", docSnapshot.id)
          )
        }
      }

      // Add new media documents
      for (const media of formData.media) {
        await addDoc(collection(fireDB, "routes_resources"), {
          route_key: formData.route_key,
          from_location: formData.from_location,
          to_location: formData.to_location,
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          ...media,
          createdAt: serverTimestamp(),
        })
      }

      toast.success(editingRoute ? "Route updated" : "Route created successfully")
      onSave()
    } catch (error) {
      console.error("Error saving route:", error)
      toast.error("Failed to save route")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg border border-[#E5E7EB] p-6">
      <h2 className="text-[#05073C] font-bold text-xl mb-6">
        {editingRoute ? "Edit Route" : "Create New Route"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              Route Key *
            </label>
            <Input
              name="route_key"
              value={formData.route_key}
              onChange={handleInputChange}
              placeholder="e.g., yaba-maryland"
              disabled={!!editingRoute}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              From Location *
            </label>
            <Input
              name="from_location"
              value={formData.from_location}
              onChange={handleInputChange}
              placeholder="e.g., Yaba"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              To Location *
            </label>
            <Input
              name="to_location"
              value={formData.to_location}
              onChange={handleInputChange}
              placeholder="e.g., Maryland"
              className="w-full"
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              Route Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Yaba to Maryland Route Overview"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              Subtitle
            </label>
            <Input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="e.g., Mainland corridor guide"
              className="w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#05073C] font-semibold text-sm mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the route..."
            rows={3}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF8F57]"
          />
        </div>

        {/* Media Section */}
        <div className="border-t pt-6">
          <h3 className="text-[#05073C] font-bold text-lg mb-4">Add Media</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#05073C] font-semibold text-sm mb-2">
                Media Type *
              </label>
              <select
                name="type"
                value={newMedia.type}
                onChange={handleMediaChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF8F57]"
              >
                <option value="text">Text/PDF</option>
                <option value="sound">Audio</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {(newMedia.type === "sound" || newMedia.type === "video") && (
              <div>
                <label className="block text-[#05073C] font-semibold text-sm mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={newMedia.language || "english"}
                  onChange={handleMediaChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF8F57]"
                >
                  <option value="english">English</option>
                  <option value="pidgin">Pidgin</option>
                  <option value="yoruba">Yoruba</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[#05073C] font-semibold text-sm mb-2">
              Media URL *
            </label>
            <Input
              name="content_url"
              value={newMedia.content_url}
              onChange={handleMediaChange}
              placeholder="https://firebasestorage.googleapis.com/..."
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-[#05073C] font-semibold text-sm mb-2">
                Title
              </label>
              <Input
                name="title"
                value={newMedia.title}
                onChange={handleMediaChange}
                placeholder="e.g., Full Route Video"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-[#05073C] font-semibold text-sm mb-2">
                Order
              </label>
              <Input
                name="order"
                type="number"
                value={newMedia.order}
                onChange={handleMediaChange}
                placeholder="1"
                className="w-full"
              />
            </div>
          </div>

          <Button
            onClick={addMedia}
            label="Add Media Item"
            type="button"
            className="!bg-[#05073C] mt-4 w-full"
          />
        </div>

        {/* Media List */}
        {formData.media.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-[#05073C] font-bold text-lg mb-4">
              Added Media ({formData.media.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.media.map((media, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#F5F5F5] p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-[#05073C] font-semibold text-sm">
                      {media.type.toUpperCase()}
                      {media.language && ` (${media.language})`}
                    </p>
                    <p className="text-[#737791] text-xs truncate">
                      {media.title || media.content_url}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedia(idx)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            onClick={onCancel}
            label="Cancel"
            type="button"
            className="!bg-[#E5E7EB] text-[#737791] flex-1"
          />
          <Button
            label={loading ? "Saving..." : "Save Route"}
            type="submit"
            disabled={loading}
            className="!bg-[#EF8F57] flex-1"
          />
        </div>
      </form>
    </div>
  )
}
