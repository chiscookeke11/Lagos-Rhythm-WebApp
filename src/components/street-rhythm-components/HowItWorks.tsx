'use client'

import React from 'react'
import styles from './HowItWorks.module.css'

const steps = [
  {
    number: 1,
    title: 'Search Your Route',
    description: 'Enter your starting point and destination. We\'ll find all available routes.',
  },
  {
    number: 2,
    title: 'Watch the Journey',
    description: 'See real commuter videos showing every step—bus stops, landmarks, and transfer points.',
  },
  {
    number: 3,
    title: 'Get Route Details',
    description: 'View fares, safety info, bus calls, and first-timer tips specific to your route.',
  },
  {
    number: 4,
    title: 'Travel Confidently',
    description: 'Navigate like a local with offline access to your route video and all essential information.',
  },
]

export function HowItWorks() {
  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className={styles.noise}></div>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>The Process</div>
          <h2>How Street Rhythm Works</h2>
          <p>From search to arrival, we make navigating Lagos simple.</p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
