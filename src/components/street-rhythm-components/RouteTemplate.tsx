'use client'

import React from 'react'
import styles from './RouteTemplate.module.css'

export function RouteTemplate() {
  return (
    <section className={styles.routeTemplate} id="route-example">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Route Details</div>
          <h2>Example: Yaba to Maryland</h2>
          <p>This is how route information will be displayed.</p>
        </div>

        <div className={styles.routeCard}>
          {/* Route Header */}
          <div className={styles.routeHeader}>
            <div className={`${styles.difficultyBadge} ${styles.difficultyIntermediate}`}>
              Intermediate
            </div>
            <div className={styles.routePath}>
              <span className={styles.routeLocation}>Yaba</span>
              <span className={styles.routeArrow}>↓</span>
              <span className={styles.routeLocation}>Maryland</span>
            </div>
            <div className={styles.routeMeta}>
              <div className={styles.metaItem}>
                <span>🛣️</span>
                <span>Via Ikorodu Road</span>
              </div>
              <div className={styles.metaItem}>
                <span>⏱️</span>
                <span>25-40 mins (traffic dependent)</span>
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className={styles.routeBody}>
            {/* Transport Options */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>🚌</div>
                <h4>Transport Options</h4>
              </div>
              <div className={styles.transportOptions}>
                <div className={styles.transportBadge}>
                  <span>🚐</span>
                  <span>Danfo (Yellow Bus)</span>
                </div>
                <div className={styles.transportBadge}>
                  <span>🚍</span>
                  <span>BRT (Blue Bus)</span>
                </div>
              </div>
            </div>

            {/* Key Landmarks */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>📍</div>
                <h4>Key Landmarks</h4>
              </div>
              <div className={styles.landmarksGrid}>
                <div className={styles.landmarkItem}>
                  <strong>Starting Point</strong>
                  <span>Yaba BRT Station - easily recognizable blue structure</span>
                </div>
                <div className={styles.landmarkItem}>
                  <strong>Along Route</strong>
                  <span>Presbyterian Church of Nigeria, Yaba</span>
                </div>
                <div className={styles.landmarkItem}>
                  <strong>Destination</strong>
                  <span>Maryland Mall - major shopping complex</span>
                </div>
              </div>
            </div>

            {/* Bus Calls */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>📢</div>
                <h4>Listen For These Bus Calls</h4>
              </div>
              <div className={styles.busCalls}>
                <div className={styles.busCall}>Ikeja</div>
                <div className={styles.busCall}>Maryland</div>
              </div>
              <p className={styles.busCallNote}>
                Conductors will shout these destinations. Make sure your bus calls &quot;Maryland&quot; before boarding.
              </p>
            </div>

            {/* Fare Information */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>💰</div>
                <h4>Expected Fares</h4>
              </div>
              <div className={styles.fareGrid}>
                <div className={styles.fareCard}>
                  <div className={styles.fareTime}>Morning</div>
                  <div className={styles.fareAmount}>₦600-700</div>
                </div>
                <div className={styles.fareCard}>
                  <div className={styles.fareTime}>Afternoon</div>
                  <div className={styles.fareAmount}>₦600-700</div>
                </div>
                <div className={styles.fareCard}>
                  <div className={styles.fareTime}>Evening</div>
                  <div className={styles.fareAmount}>₦800</div>
                </div>
                <div className={styles.fareCard}>
                  <div className={styles.fareTime}>Rush Hour</div>
                  <div className={styles.fareAmount}>₦1,000</div>
                </div>
              </div>
            </div>

            {/* Safety Assessment */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>🛡️</div>
                <h4>Safety Assessment</h4>
              </div>
              <div className={styles.safetyIndicator}>
                <div className={styles.safetyIcon}>✓</div>
                <div className={styles.safetyText}>
                  <strong>Generally Safe During Daylight</strong>
                  <p>
                    This is a well-traveled route with consistent traffic. No specific danger zones identified.
                    Follow general night travel guidelines if traveling after dark.
                  </p>
                </div>
              </div>
            </div>

            {/* Route Challenges */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>⚠️</div>
                <h4>Things to Watch Out For</h4>
              </div>
              <ul className={styles.challengesList}>
                <li>
                  <strong>Bus Stop Recognition:</strong> Some stops along Ikorodu Road are not clearly marked.
                  Watch your route video and listen carefully to conductor announcements.
                </li>
                <li>
                  <strong>Rush Hour Crowding:</strong> Buses fill up quickly during peak hours.
                  You may need to wait for 2-3 buses before finding space.
                </li>
              </ul>
            </div>

            {/* Video Player Placeholder */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeader}>
                <div className={styles.detailIcon}>🎥</div>
                <h4>Watch Your Journey</h4>
              </div>
              <div className={styles.videoPlaceholder}>
                <p>📹</p>
                <p>
                  Your step-by-step video guide will appear here, showing the exact journey from Yaba to Maryland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
