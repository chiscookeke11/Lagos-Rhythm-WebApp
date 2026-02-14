'use client'

import React from 'react'
import styles from './HeroSection.module.css'
import { SearchCard } from './SearchCard'

export function HeroSection() {
  return (
    <section className={` ${styles.hero} font-merienda ` }>
      <div className={styles.noise}></div>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              Navigate Lagos Like a <span className={styles.accent}>Local</span>
            </h1>
            <p className="serif">
              Video-guided journeys through Lagos&apos;s informal transport system.
              See your route before you take it—with real commuter footage and step-by-step navigation.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#search" className={`${styles.btn} ${styles.btnPrimary}`}>
                 Find Your Route
              </a>
              <a href="#how-it-works" className={`${styles.btn} ${styles.btnSecondary}`}>
                How It Works
              </a>
            </div>
          </div>

          <SearchCard />
        </div>
      </div>
    </section>
  )
}
