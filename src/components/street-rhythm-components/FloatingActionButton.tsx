'use client'

import React from 'react'
import styles from './FloatingActionButton.module.css'

export function FloatingActionButton() {
  const scrollToSearch = () => {
    const searchElement = document.getElementById('search')
    if (searchElement) {
      searchElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <div className={styles.fab} onClick={scrollToSearch} role="button" aria-label="Go to search">
      🎯
    </div>
  )
}
