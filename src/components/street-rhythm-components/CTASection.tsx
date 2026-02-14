'use client'

import React from 'react'
import styles from './CTASection.module.css'

export function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2>Ready to Navigate Lagos?</h2>
          <p>
            Join thousands of commuters who&apos;ve discovered the confidence of knowing
            exactly where they&apos;re going.
          </p>
          <a href="#search" className={styles.btnCta}>
            Start Your Journey →
          </a>
        </div>
      </div>
    </section>
  )
}
