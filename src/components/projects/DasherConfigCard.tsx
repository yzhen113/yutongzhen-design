"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './DasherConfigCard.module.css'
import { KudosLottie, type KudosLottieId } from './KudosLottie'

/**
 * The recognition framework, shown as one card that holds still while its
 * content rotates through every moment it has to carry: the three Day 2
 * metrics, the week-one recap, and the first-dash celebration.
 *
 * Card, type and spacing are the Figma components (Card 246:17242, Kudos —
 * Day two metric 933:70354, week recap 933:70327, Kudos — First Dash Complete
 * 843:69602) at their designed 361px width.
 */

const CARD_SCALE = 0.75
/** Long enough to read the card, not just watch it change. */
const HOLD_MS = 4000
/** Each slot fades out and the next one fades in behind it. */
const SWAP_STAGGER_MS = 26
/**
 * The number rolls the way it does in the prototype — a 0–9 strip per digit,
 * each one starting a beat after the last — just run slower here, since the
 * card holds on the value rather than being tapped into.
 */
const TICK_MS = 1250
const TICK_STAGGER_MS = 140
const TICK_EASE = 'cubic-bezier(0.12, 0.75, 0.18, 1)'
/** Matches the line box of the 84px value. */
const DIGIT_H = 88
/**
 * A straight dissolve: old and new run over each other for the same window, on
 * a linear curve so the pair holds a steady weight and nothing moves.
 */
const FADE_OUT_MS = 260
const FADE_IN_MS = 260
const SWAP_OVERLAP_MS = FADE_OUT_MS
const SWAP_EASE_OUT = 'linear'
const SWAP_EASE_IN = 'linear'

const INK = '#191919'
const SUBDUED = '#606060'
const LINE = '#e4e4e4'
const RED = '#eb1700'

type Metric = {
  id: string
  kind: 'metric'
  /** A shipped Lottie, or a flat spot for a metric that has no animation yet. */
  lottie?: KudosLottieId
  spot?: string
  label: string
  value: string
  benchmark: string
}

type Recap = {
  id: string
  kind: 'recap'
  lottie: KudosLottieId
  dates: string
  headline: string
  totals: { value: string; label: string; icon: string }[]
  rates: { label: string; value: string }[]
}

type FirstDash = {
  id: string
  kind: 'firstDash'
  lottie: KudosLottieId
  eyebrow: string
  lead: string
  accentWord: string
}

type Card = Metric | Recap | FirstDash

/** Starts on the on-time metric, works through the rest, then the two
 *  milestone moments the same shell also has to carry. */
const CARDS: Card[] = [
  {
    id: 'on-time',
    kind: 'metric',
    lottie: 'onTime',
    label: 'You delivered on-time',
    value: '96%',
    benchmark: 'Higher than 75% of new Dashers nearby',
  },
  {
    id: 'acceptance',
    kind: 'metric',
    lottie: 'acceptance',
    label: 'Accepted orders sent your way',
    value: '93%',
    benchmark: 'Higher than 68% of new Dashers nearby',
  },
  {
    id: 'completion',
    kind: 'metric',
    lottie: 'completion',
    label: 'Completed the orders you took',
    value: '99%',
    benchmark: 'Higher than 82% of new Dashers nearby',
  },
  {
    id: 'issue-free',
    kind: 'metric',
    spot: '/media/dasher/spot/issue-free.svg',
    label: 'Issue-free orders',
    value: '98%',
    benchmark: 'Higher than 71% of new Dashers nearby',
  },
  {
    id: 'recap',
    kind: 'recap',
    lottie: 'medal',
    dates: 'July 6 – 13',
    headline: 'What a week!',
    totals: [
      { value: '15', label: 'Deliveries', icon: '/media/dasher/icons/deliveries.png' },
      { value: '$100.54', label: 'Earnings', icon: '/media/dasher/icons/earnings.png' },
    ],
    rates: [
      { label: 'Completion rate', value: '100%' },
      { label: 'Acceptance rate', value: '94%' },
      { label: 'On-time rate', value: '96%' },
    ],
  },
  {
    id: 'first-dash',
    kind: 'firstDash',
    lottie: 'cupcake',
    eyebrow: 'Cody, you did it!',
    lead: 'Your',
    accentWord: 'first dash',
  },
]

/**
 * Each note points at the slot it describes — art, the metric block, the
 * benchmark line — and every card puts those slots at a different height, so
 * the leaders travel with the card as it changes. A `null` means that card
 * doesn't use the slot, and the note fades out until a card that does.
 */
const ANNOTATIONS: {
  tops: Record<Card['kind'], number | null>
  title: string
}[] = [
  {
    tops: { metric: 120, recap: 100, firstDash: 120 },
    title: 'Illustration / Lottie',
  },
  {
    tops: { metric: 233, recap: 214, firstDash: 250 },
    title: 'Celebration',
  },
  {
    tops: { metric: null, recap: 380, firstDash: null },
    title: 'Metric',
  },
  {
    tops: { metric: 372, recap: null, firstDash: null },
    title: 'Benchmark',
  },
]

/** Where a note rests on the cards that don't use its slot — the first height
 *  it does have, so it fades out in place instead of flying to the top. */
function restingTop(tops: Record<Card['kind'], number | null>) {
  return Object.values(tops).find((top) => top != null) ?? 0
}

export function DasherConfigCard() {
  const { ref, step, live } = useRotation(CARDS.length)
  const card = CARDS[step]
  const bodyRef = useRef<HTMLDivElement>(null)
  const [bodyHeight, setBodyHeight] = useState(386)

  useLayoutEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const observer = new ResizeObserver(([entry]) => setBodyHeight(entry.contentRect.height))
    observer.observe(body)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.root} style={{ "--card-scale": CARD_SCALE, "--card-width": `${361 * CARD_SCALE}px`, "--card-height": `${(bodyHeight + 34) * CARD_SCALE}px` } as CSSProperties}>
      <div className={styles.layout}>
        <div className={styles.cardStage}>
          <div className={styles.cardScale}>
            <div className={styles.card} style={{ height: bodyHeight + 34 }}>
              <div ref={bodyRef}>
                <CardBody key={card.kind} card={card} playing={live} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notes}>
          {ANNOTATIONS.map((note) => {
            const top = note.tops[card.kind] ?? restingTop(note.tops)
            const shown = note.tops[card.kind] != null
            return (
              <div
                key={note.title}
                className={styles.note}
                data-shown={shown}
                aria-hidden={!shown}
                style={{ '--note-top': `${top * CARD_SCALE}px` } as CSSProperties}
              >
                <div className={styles.leader} aria-hidden><span /><span /></div>
                <div>
                  <h3>{note.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Advances the card index on a timer, once the block has been scrolled to. */
function useRotation(length: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      threshold: 0.3,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return undefined
    const timer = setInterval(() => setStep((s) => (s + 1) % length), HOLD_MS)
    return () => clearInterval(timer)
  }, [live, length])

  return { ref, step, live }
}

/**
 * One swappable region of the card — art, label, value, benchmark. The region
 * clears and its next value fades up in place; nothing slides, so a card full
 * of changing slots stays calm to read.
 */
function Swap({
  swapKey,
  delay,
  animate,
  mode = 'fade',
  children,
  style,
}: {
  swapKey: string
  delay: number
  /** False when the whole card changes kind — those swap outright. */
  animate: boolean
  /**
   * `none` leaves the swap to the content itself, as the ticker does. `inner`
   * does the same but keeps the wrapper mounted, so a fixed frame — the
   * benchmark pill — can stay put while only what's inside it changes.
   */
  mode?: 'fade' | 'none' | 'inner'
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const inStart = FADE_OUT_MS - SWAP_OVERLAP_MS
  const swapMs = inStart + FADE_IN_MS
  const outAnimation = `${styles.fadeOut} ${FADE_OUT_MS}ms ${SWAP_EASE_OUT} ${delay}ms both`
  const inAnimation = `${styles.fadeIn} ${FADE_IN_MS}ms ${SWAP_EASE_IN} ${delay + inStart}ms both`

  const [shown, setShown] = useState<{
    key: string
    node: React.ReactNode
    outgoing: { key: string; node: React.ReactNode } | null
  }>({ key: swapKey, node: children, outgoing: null })

  // Retain the previous slot for the dissolve in the same render as its replacement.
  if (shown.key !== swapKey) {
    setShown({
      key: swapKey,
      node: children,
      outgoing: animate && mode === 'fade' ? { key: shown.key, node: shown.node } : null,
    })
  }
  const outgoing = shown.outgoing
  const fading = outgoing != null

  useEffect(() => {
    if (!outgoing) return
    const timer = window.setTimeout(() => {
      setShown((current) => ({ ...current, outgoing: null }))
    }, delay + swapMs)
    return () => window.clearTimeout(timer)
  }, [outgoing, delay, swapMs])

  return (
    <div
      // Clipped so a value stays inside its own line box. The few px of padding
      // keep descenders out of the clip, and the matching negative margin keeps
      // the card's spacing unchanged.
      style={{
        display: 'grid',
        width: '100%',
        justifyItems: 'center',
        overflow: 'hidden',
        paddingBlock: 4,
        marginBlock: -4,
        ...style,
      }}
    >
      {outgoing && (
        <div key={outgoing.key} aria-hidden="true" style={{ gridArea: '1 / 1', animation: outAnimation }}>
          {outgoing.node}
        </div>
      )}
      <div
        key={mode === 'inner' ? 'kept' : swapKey}
        style={{ gridArea: '1 / 1', animation: fading ? inAnimation : undefined }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * The headline number, rolled digit by digit like the card in the prototype:
 * each digit is a 0–9 strip that slides to its value, one starting after the
 * next. Nothing reflows, since every cell is a fixed width.
 */
function Ticker({ value }: { value: string }) {
  const parts = value.match(/^(\D*)(\d+)(.*)$/)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPlay(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!parts) return <>{value}</>

  return (
    <span role="img" aria-label={value}>
      <span aria-hidden style={{ display: 'inline-flex', alignItems: 'flex-start', fontVariantNumeric: 'tabular-nums' }}>
      {parts[1]}
      {parts[2].split('').map((digit, i) => (
        <span key={i} style={{ display: 'block', height: DIGIT_H, overflow: 'hidden' }}>
          <span
            style={{
              display: 'block',
              transform: `translateY(${play ? -Number(digit) * DIGIT_H : 0}px)`,
              transition: `transform ${TICK_MS}ms ${TICK_EASE} ${i * TICK_STAGGER_MS}ms`,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((slot) => (
              <span key={slot} style={{ display: 'block', height: DIGIT_H, textAlign: 'center' }}>
                {slot}
              </span>
            ))}
          </span>
        </span>
      ))}
      {parts[3]}
      </span>
    </span>
  )
}

function CardBody({ card, playing }: { card: Card; playing: boolean }) {
  const sections = cardSections(card, playing)

  return (
    <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {sections.map((section, i) => (
        <Swap
          key={i}
          swapKey={`${card.id}-${i}`}
          delay={i * SWAP_STAGGER_MS}
          animate
          mode={section.mode}
          style={section.style}
        >
          {section.node}
        </Swap>
      ))}
    </div>
  )
}

type Section = { node: React.ReactNode; style?: React.CSSProperties; mode?: 'fade' | 'none' | 'inner' }

function cardSections(card: Card, playing: boolean): Section[] {
  if (card.kind === 'metric') {
    return [
      {
        node: card.lottie ? (
          <KudosLottie id={card.lottie} size={200} playing={playing} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.spot} alt="" width={200} height={200} style={{ display: 'block' }} />
        ),
      },
      {
        node: (
          <div style={{ fontSize: 20, lineHeight: '24px', fontWeight: 700, color: SUBDUED, textAlign: 'center' }}>
            {card.label}
          </div>
        ),
      },
      {
        mode: 'none',
        node: (
          <div
            style={{
              marginTop: 8,
              fontSize: 84,
              lineHeight: '88px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: INK,
            }}
          >
            <Ticker value={card.value} />
          </div>
        ),
      },
      {
        // The pill itself is part of the frame, so it holds while only the
        // comparison inside it changes.
        mode: 'inner',
        node: (
          <div
            style={{
              marginTop: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              background: '#e8f4ec',
              color: '#12683a',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span aria-hidden="true">↗</span>
            <Swap swapKey={card.id} delay={0} animate style={{ width: 'auto' }}>
              <span style={{ whiteSpace: 'nowrap' }}>{card.benchmark}</span>
            </Swap>
          </div>
        ),
      },
    ]
  }

  if (card.kind === 'recap') {
    return [
      { node: <KudosLottie id={card.lottie} size={160} playing={playing} /> },
      {
        node: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, lineHeight: '22px', fontWeight: 500, color: SUBDUED }}>{card.dates}</div>
            <div style={{ marginTop: 4, fontSize: 32, lineHeight: '40px', fontWeight: 700, color: '#000' }}>
              {card.headline}
            </div>
          </div>
        ),
      },
      {
        style: { marginTop: 16, justifyItems: 'stretch' },
        node: (
          <div style={{ display: 'flex', width: '100%' }}>
            {card.totals.map((total, i) => (
              <div
                key={total.label}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRight: i === 0 ? `1px solid ${LINE}` : undefined,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={total.icon} alt="" width={24} height={24} style={{ display: 'block', flex: 'none' }} />
                <div>
                  <div style={{ fontSize: 16, lineHeight: '22px', fontWeight: 700, color: INK }}>{total.value}</div>
                  <div style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: SUBDUED }}>
                    {total.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        style: { marginTop: 8, justifyItems: 'stretch' },
        node: (
          <div style={{ width: '100%' }}>
            {card.rates.map((rate, i) => (
              <div
                key={rate.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderBottom: i === card.rates.length - 1 ? undefined : `1px solid ${LINE}`,
                }}
              >
                <span style={{ fontSize: 16, lineHeight: '22px', fontWeight: 500, color: INK }}>{rate.label}</span>
                <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: SUBDUED }}>
                  {rate.value}
                </span>
              </div>
            ))}
          </div>
        ),
      },
    ]
  }

  return [
    { node: <KudosLottie id={card.lottie} size={200} playing={playing} /> },
    {
      node: (
        <div style={{ fontSize: 20, lineHeight: '24px', fontWeight: 700, color: INK, textAlign: 'center' }}>
          {card.eyebrow}
        </div>
      ),
    },
    {
      node: (
        <div style={{ fontSize: 40, lineHeight: '60px', fontWeight: 700, color: INK, textAlign: 'center' }}>
          {card.lead} <span style={{ color: RED }}>{card.accentWord}</span>
        </div>
      ),
    },
  ]
}
