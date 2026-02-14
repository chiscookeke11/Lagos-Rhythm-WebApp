'use client'

import React, { useState } from 'react'
import styles from './Features.module.css'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🎥',
    title: 'Video-First Navigation',
    description: 'See your journey before you take it. Real footage from actual commuters shows exactly how to move from point A to point B.',
  },
  {
    icon: '🗺️',
    title: 'Informal Route Coverage',
    description: 'We document the routes Google Maps doesn\'t know—the danfo lines, bus calls, and local shortcuts that keep Lagos moving.',
  },
  {
    icon: '👥',
    title: 'Crowdsourced Intelligence',
    description: 'Built by the community, for the community. Every video is contributed, validated, and updated by real Lagosians.',
  },
  {
    icon: '📱',
    title: 'Works Offline',
    description: 'Download your route videos and access them anytime—no data required. Perfect for low-bandwidth areas.',
  },
  {
    icon: '🧭',
    title: 'Cultural Context',
    description: 'More than directions—we preserve the oral knowledge of Lagos transport: conductor calls, local landmarks, and unwritten rules.',
  },
  {
    icon: '🛡️',
    title: 'Safety-First Design',
    description: 'Every route includes safety ratings, night travel guidelines, and real-time community feedback on current conditions.',
  },
]

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index)
  }

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Why Street Rhythm</div>
          <h2>Built for Lagos, by Lagosians</h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${
                expandedFeature === index ? styles.expanded : ''
              }`}
              onClick={() => toggleFeature(index)}
            >
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureTitle}>
                  <h3>{feature.title}</h3>
                </div>
                <div className={styles.featureExpand}>▼</div>
              </div>
              <div className={styles.featureContent}>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
