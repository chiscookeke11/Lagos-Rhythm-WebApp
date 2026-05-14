"use client"

import React from "react"

interface SummaryCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
}

export default function SummaryCard({ label, value, icon }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#737791] text-sm font-medium">{label}</p>
          <p className="text-[#05073C] text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && (
          <div className="text-[#EF8F57] opacity-20">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
