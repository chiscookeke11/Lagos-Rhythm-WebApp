'use client'

import React, { useState } from 'react'
import styles from './KnowledgeBase.module.css'

interface KnowledgeCard {
  icon: string
  title: string
  description: string
  tips: string[]
}

const knowledgeCards: KnowledgeCard[] = [
  {
    icon: '🚌',
    title: 'Danfo Basics',
    description: 'Master the fundamentals of Lagos public transport:',
    tips: [
      'Always ask the conductor for the fare before entering',
      'You may bargain ₦100 to ₦200 depending on traffic and time',
      'Conductors announce stops verbally as the bus moves',
      'Say "Owa" or call the bus stop name when you want to alight',
      'If unsure, tell the conductor you don\'t know the place',
    ],
  },
  {
    icon: '📍',
    title: 'Finding Your Stop',
    description: 'Never miss your destination:',
    tips: [
      'Look for bus stop names on most bus stop sheds',
      'Listen carefully to the conductor\'s announcements',
      'Use landmarks mentioned in your route video',
      'If you miss your stop, alight at the next one and take a return bus',
      'Speak confidently and clearly to conductors and drivers',
    ],
  },
  {
    icon: '💡',
    title: 'First-Timer Confidence',
    description: 'Stay calm and navigate like a pro:',
    tips: [
      'Do not panic if you miss your stop—it happens to everyone',
      'Confusion is normal for first-time users',
      'Asking questions at busy bus stops is perfectly acceptable',
      'Most routes have predictable correction paths',
      'Watch your route video multiple times before traveling',
    ],
  },
  {
    icon: '⏰',
    title: 'Traffic & Timing',
    description: 'Plan around Lagos traffic patterns:',
    tips: [
      'Traffic varies by morning, evening, and rush hour',
      'Fares rise during rush hour (7-9 AM, 5-8 PM)',
      'Road conditions can change quickly',
      'Allow extra time for your first journey on any route',
      'Check your route video for time-specific notes',
    ],
  },
  {
    icon: '🌙',
    title: 'Night Travel Safety',
    description: 'Stay safe when traveling after dark:',
    tips: [
      'Prefer crowded buses at night',
      'Stay at well-lit bus stops',
      'Avoid isolated corners or unfamiliar areas',
      'Seek help in public spaces if needed',
      'Travel with others when possible',
    ],
  },
  {
    icon: '💰',
    title: 'Fare Negotiation',
    description: 'Get fair prices for your journey:',
    tips: [
      'Ask other passengers what they paid if unsure',
      'Rush hour fares are typically 30-50% higher',
      'Have small change ready (₦50, ₦100, ₦200 notes)',
      'Stand firm but polite during negotiation',
      'Route-specific fares are shown in your search results',
    ],
  },
]

export function KnowledgeBase() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index)
  }

  return (
    <section className={styles.knowledgeBase} id="knowledge-base">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Essential Knowledge</div>
          <h2>Your Lagos Transport Guide</h2>
          <p>Everything you need to know before stepping on a danfo.</p>
        </div>

        <div className={styles.knowledgeAccordion}>
          {knowledgeCards.map((card, index) => (
            <div
              key={index}
              className={`${styles.knowledgeCard} ${
                activeCard === index ? styles.active : ''
              }`}
              onClick={() => toggleCard(index)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <div className={styles.cardTitle}>
                  <h3>{card.title}</h3>
                </div>
                <div className={styles.cardChevron}>▼</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardContentInner}>
                  <p>{card.description}</p>
                  <ul className={styles.knowledgeList}>
                    {card.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
