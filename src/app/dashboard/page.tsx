"use client"

import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import Link from "next/link"
import { 
  ArrowRight, 
  MonitorPlay, 
  Beaker, 
  PenSquare, 
  Heart, 
  Sparkles, 
  TicketPercent,
  Images,
  Newspaper 
} from "lucide-react"
import Loader from "@/components/common/Loader"

interface DashboardStats {
  streetRhythmRoutes: number
  streetRhythmMedia: number
  blogs: number
  feedbacks: number
  exclusiveBookings: number
  freeBookings: number
  galleryImages: number
  newsletters: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    streetRhythmRoutes: 0,
    streetRhythmMedia: 0,
    blogs: 0,
    feedbacks: 0,
    exclusiveBookings: 0,
    freeBookings: 0,
    galleryImages: 0,
    newsletters: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch Street Rhythm routes
        const routesSnapshot = await getDocs(
          collection(fireDB, "routes_resources")
        )
        const routeKeys = new Set(
          routesSnapshot.docs.map((doc) => doc.data().route_key)
        )

        // Fetch other data
        const [blogsSnap, feedbacksSnap, exclusiveSnap, freeSnap, gallerySnap, newslettersSnap] = await Promise.all([
          getDocs(collection(fireDB, "blogs")),
          getDocs(collection(fireDB, "Feedback")),
          getDocs(collection(fireDB, "exclusive_Tour_form")),
          getDocs(collection(fireDB, "booked_Free_Rhythm")),
          getDocs(collection(fireDB, "gallery")),
          getDocs(collection(fireDB, "subscribers")),
        ])

        setStats({
          streetRhythmRoutes: routeKeys.size,
          streetRhythmMedia: routesSnapshot.size,
          blogs: blogsSnap.size,
          feedbacks: feedbacksSnap.size,
          exclusiveBookings: exclusiveSnap.size,
          freeBookings: freeSnap.size,
          galleryImages: gallerySnap.size,
          newsletters: newslettersSnap.size,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const menuItems = [
    {
      label: "Street Rhythm Routes",
      description: "Manage routes with video guides, audio, images, and text",
      icon: MonitorPlay,
      href: "/dashboard/street-rhythm-routes",
      stat: stats.streetRhythmRoutes,
      statLabel: "Routes",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Test Lab",
      description: "Preview and test all media and routes from Firebase",
      icon: Beaker,
      href: "/dashboard/test-lab",
      stat: stats.streetRhythmMedia,
      statLabel: "Media Items",
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Blogs",
      description: "Create, edit, and manage blog posts",
      icon: PenSquare,
      href: "/dashboard/blog-control",
      stat: stats.blogs,
      statLabel: "Published",
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Feedbacks",
      description: "View customer feedback and testimonials",
      icon: Heart,
      href: "/dashboard/Feedbacks",
      stat: stats.feedbacks,
      statLabel: "Feedbacks",
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Exclusive Tour Bookings",
      description: "Manage premium tour bookings",
      icon: Sparkles,
      href: "/dashboard/Exclusive-tour-booking",
      stat: stats.exclusiveBookings,
      statLabel: "Bookings",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Free Tour Bookings",
      description: "Manage free tour bookings",
      icon: TicketPercent,
      href: "/dashboard/free-tour-book",
      stat: stats.freeBookings,
      statLabel: "Bookings",
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Gallery",
      description: "Manage gallery images",
      icon: Images,
      href: "/dashboard/gallery-control",
      stat: stats.galleryImages,
      statLabel: "Images",
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Newsletters",
      description: "Manage newsletter subscribers",
      icon: Newspaper,
      href: "#",
      stat: stats.newsletters,
      statLabel: "Subscribers",
      color: "bg-indigo-100 text-indigo-600",
      disabled: true,
    },
  ]

  return (
    <div className="w-full min-h-screen flex flex-col items-start gap-8 py-7 px-7 font-lato">
      {/* Header */}
      <div>
        <h1 className="text-[#05073C] font-bold text-4xl font-playfair">
          Admin Dashboard
        </h1>
        <p className="text-[#737791] text-sm mt-2">
          Manage Street Rhythm routes, content, and all site operations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
          <p className="text-[#737791] text-xs font-medium">Street Rhythm Routes</p>
          {loading ? (
            <div className="mt-2"><Loader /></div>
          ) : (
            <p className="text-[#05073C] text-3xl font-bold mt-1">
              {stats.streetRhythmRoutes}
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
          <p className="text-[#737791] text-xs font-medium">Total Media Items</p>
          {loading ? (
            <div className="mt-2"><Loader /></div>
          ) : (
            <p className="text-[#05073C] text-3xl font-bold mt-1">
              {stats.streetRhythmMedia}
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
          <p className="text-[#737791] text-xs font-medium">Total Feedbacks</p>
          {loading ? (
            <div className="mt-2"><Loader /></div>
          ) : (
            <p className="text-[#05073C] text-3xl font-bold mt-1">
              {stats.feedbacks}
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
          <p className="text-[#737791] text-xs font-medium">Tour Bookings</p>
          {loading ? (
            <div className="mt-2"><Loader /></div>
          ) : (
            <p className="text-[#05073C] text-3xl font-bold mt-1">
              {stats.exclusiveBookings + stats.freeBookings}
            </p>
          )}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="w-full bg-gradient-to-r from-[#EF8F57] to-[#D4422C] rounded-lg p-6 text-white">
        <h2 className="font-bold text-lg mb-3">🎯 Quick Start</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ <strong>Street Rhythm Routes:</strong> Manage video routes with multiple language support</li>
          <li>✅ <strong>Test Lab:</strong> Preview all media and test functionality locally</li>
          <li>✅ <strong>Firebase Integration:</strong> All media is synced with your Firebase Cloud Storage</li>
          <li>✅ <strong>Admin Controls:</strong> Full CRUD operations on all resources</li>
        </ul>
      </div>

      {/* Menu Grid */}
      <div className="w-full">
        <h2 className="text-[#05073C] font-bold text-2xl mb-6 font-playfair">
          Management Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group ${item.disabled ? "pointer-events-none opacity-50" : ""}`}
              >
                <div className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#EF8F57] hover:shadow-lg transition-all duration-300 p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg ${item.color}`}
                    >
                      <Icon size={24} />
                    </div>
                    {!item.disabled && (
                      <ArrowRight
                        size={20}
                        className="text-[#737791] group-hover:text-[#EF8F57] transform group-hover:translate-x-1 transition-all"
                      />
                    )}
                  </div>

                  <h3 className="text-[#05073C] font-bold text-lg mb-1">
                    {item.label}
                  </h3>
                  <p className="text-[#737791] text-sm mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <span className="text-[#737791] text-xs">
                      {item.statLabel}
                    </span>
                    <span className="text-[#05073C] font-bold text-lg">
                      {item.stat}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#F5F5F5] rounded-lg p-8">
        <h2 className="text-[#05073C] font-bold text-2xl mb-6 font-playfair">
          Dashboard Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-[#05073C] font-bold">Street Rhythm Management</h3>
            <ul className="text-[#737791] text-sm space-y-1">
              <li>• Create and manage transport routes</li>
              <li>• Upload and organize media (videos, audio, images)</li>
              <li>• Support for multiple languages (English, Pidgin, Yoruba)</li>
              <li>• Preview routes before publishing</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-[#05073C] font-bold">Content Management</h3>
            <ul className="text-[#737791] text-sm space-y-1">
              <li>• Create and edit blog posts</li>
              <li>• Manage gallery images</li>
              <li>• Monitor customer feedback</li>
              <li>• View tour bookings</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-[#05073C] font-bold">Testing & Debugging</h3>
            <ul className="text-[#737791] text-sm space-y-1">
              <li>• Test Lab for media preview</li>
              <li>• Firebase API information</li>
              <li>• Media URL inspection</li>
              <li>• Live data verification</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-[#05073C] font-bold">Data Analytics</h3>
            <ul className="text-[#737791] text-sm space-y-1">
              <li>• Real-time statistics</li>
              <li>• Booking insights</li>
              <li>• Feedback analytics</li>
              <li>• Media usage tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-blue-900 font-bold text-lg mb-4">📚 Getting Started</h2>
        <ol className="text-blue-800 text-sm space-y-2 ml-4 list-decimal">
          <li>
            <strong>Start with Street Rhythm Routes:</strong> Go to &quot;Street Rhythm Routes&quot;
            to view existing routes and add new ones
          </li>
          <li>
            <strong>Use the Form:</strong> Click &quot;Add New Route&quot; to create a route with all required media
          </li>
          <li>
            <strong>Add Media:</strong> For each route, add text guides, audio in multiple languages, images, and videos
          </li>
          <li>
            <strong>Test Before Publishing:</strong> Go to &quot;Test Lab&quot; to preview your routes before going live
          </li>
          <li>
            <strong>Monitor the Site:</strong> Use other sections to manage blogs, feedback, and bookings
          </li>
        </ol>
      </div>
    </div>
  )
}
