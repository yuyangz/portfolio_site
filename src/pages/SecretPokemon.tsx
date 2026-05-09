import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import pokemonCardBack from '../assets/pokemon-card-back.png'
import pokeballButton from '../assets/pokeball-button.png'

type CardBrief = { id?: string }
type CardImage = { low?: string; high?: string }
type CardDetail = {
  id?: string
  name?: string
  category?: string
  legal?: {
    standard?: boolean
  }
  set?: {
    name?: string
  }
  image?: string | CardImage
}

/** Pokémon TCG Live (Standard); excludes TCG Pocket (`legal.standard` is false on Pocket). */
function isTcgLivePokemonCard(d: CardDetail): boolean {
  if (d.category !== 'Pokemon' || d.legal?.standard !== true) return false
  const raw =
    typeof d.image === 'string'
      ? d.image
      : (d.image?.high ?? d.image?.low ?? '')
  if (/\/tcgp\//i.test(raw)) return false
  return true
}

const TCGLIVE_PAGE_SIZE = 250

async function fetchTcgLivePokemonCardIds(): Promise<string[]> {
  const ids: string[] = []
  for (let page = 1; ; page += 1) {
    const params = new URLSearchParams({
      category: 'Pokemon',
      'legal.standard': 'true',
      'pagination:itemsPerPage': String(TCGLIVE_PAGE_SIZE),
      'pagination:page': String(page),
    })
    const res = await fetch(
      `https://api.tcgdex.net/v2/en/cards?${params.toString()}`,
    )
    if (!res.ok) throw new Error('Could not load card index.')
    const batch = listFromApiJson(await res.json())
    for (const c of batch) {
      if (c.id) ids.push(c.id)
    }
    if (batch.length < TCGLIVE_PAGE_SIZE) break
  }
  return ids
}

function imageUrlFor(card: CardDetail | null): string | null {
  if (!card?.image) return null
  const normalize = (u: string) => {
    const hasExt = /\.[a-z0-9]+$/i.test(u)
    const hasVariant = /\/(low|high)\.webp$/i.test(u)
    if (hasExt || hasVariant) return u
    return `${u}/high.webp`
  }

  if (typeof card.image === 'string') return normalize(card.image)
  return card.image.high ?? (card.image.low ? normalize(card.image.low) : null)
}

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive)
}

function listFromApiJson(json: unknown): CardBrief[] {
  if (Array.isArray(json)) return json as CardBrief[]
  if (
    json &&
    typeof json === 'object' &&
    Array.isArray((json as { data?: unknown[] }).data)
  ) {
    return (json as { data: CardBrief[] }).data
  }
  return []
}

export function SecretPokemon() {
  const CARD_INTRO_MS = 5000
  const CARD_INTRO_TOTAL_DEGREES = 2880
  const [hasPressedHuh, setHasPressedHuh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [card, setCard] = useState<CardDetail | null>(null)
  const [rx, setRx] = useState(0)
  const [ry, setRy] = useState(0)
  const [cardFrontLoaded, setCardFrontLoaded] = useState(false)
  const [isCardIntroAnimating, setIsCardIntroAnimating] = useState(false)
  const dragRef = useRef<{
    startX: number
    startY: number
    baseRx: number
    baseRy: number
    id: number
  } | null>(null)
  const introRafRef = useRef<number | null>(null)
  const tcgLiveCardIdsRef = useRef<string[] | null>(null)

  const imageSrc = useMemo(() => imageUrlFor(card), [card])
  const hasCard = Boolean(imageSrc)

  useEffect(() => {
    setCardFrontLoaded(false)
    setIsCardIntroAnimating(false)
    if (introRafRef.current !== null) {
      cancelAnimationFrame(introRafRef.current)
      introRafRef.current = null
    }
  }, [imageSrc])

  useEffect(() => {
    if (!cardFrontLoaded || !hasCard) return
    setIsCardIntroAnimating(true)
    setRx(0)
    setRy(0)

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / CARD_INTRO_MS)
      const eased = 1 - Math.pow(1 - progress, 3)
      setRy(CARD_INTRO_TOTAL_DEGREES * eased)

      if (progress < 1) {
        introRafRef.current = requestAnimationFrame(tick)
        return
      }

      setIsCardIntroAnimating(false)
      /* Leave ry at 2880 (= 8 full turns = facing forward) — resetting to 0 causes a visible snap */
      introRafRef.current = null
    }

    introRafRef.current = requestAnimationFrame(tick)
    return () => {
      if (introRafRef.current !== null) {
        cancelAnimationFrame(introRafRef.current)
        introRafRef.current = null
      }
    }
  }, [CARD_INTRO_MS, CARD_INTRO_TOTAL_DEGREES, cardFrontLoaded, hasCard])

  /* Fallback: some engines defer `onLoad` on opacity-0 layers; `Image()` still completes decode. */
  useEffect(() => {
    if (!imageSrc) return
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setCardFrontLoaded(true)
    }
    img.onerror = () => {
      if (!cancelled) setCardFrontLoaded(true)
    }
    img.src = imageSrc
    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
    }
  }, [imageSrc])

  const showSpinningPokeball =
    (hasPressedHuh && loading) ||
    (hasPressedHuh && Boolean(imageSrc) && !cardFrontLoaded)

  async function fetchRandomCard() {
    setHasPressedHuh(true)
    setLoading(true)
    setError(null)
    try {
      if (!tcgLiveCardIdsRef.current) {
        tcgLiveCardIdsRef.current = await fetchTcgLivePokemonCardIds()
      }
      const pool = tcgLiveCardIdsRef.current ?? []
      if (!pool.length) throw new Error('No Standard-legal Pokémon cards found.')

      const maxAttempts = 40
      let cardJson: CardDetail | null = null
      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const id = pool[randomInt(pool.length)]
        if (!id) continue
        const cardRes = await fetch(
          `https://api.tcgdex.net/v2/en/cards/${encodeURIComponent(id)}`,
        )
        if (!cardRes.ok) continue
        const next = (await cardRes.json()) as CardDetail
        if (isTcgLivePokemonCard(next)) {
          cardJson = next
          break
        }
      }

      if (!cardJson) {
        throw new Error('Could not draw a TCG Live Pokémon card. Try again.')
      }
      setCard(cardJson)
      setRx(0)
      setRy(0)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (isCardIntroAnimating) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseRx: rx,
      baseRy: ry,
      id: e.pointerId,
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (isCardIntroAnimating) return
    if (!dragRef.current || dragRef.current.id !== e.pointerId) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setRy(dragRef.current.baseRy + dx * 0.22)
    setRx(dragRef.current.baseRx - dy * 0.22)
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (isCardIntroAnimating) return
    if (dragRef.current?.id !== e.pointerId) return
    dragRef.current = null
  }

  /*
   * Shadow tracks card's Y rotation continuously across full 360°:
   * - scaleX uses |cos(ry)| so the shadow shrinks to a thin sliver when card is edge-on
   *   (90°/270°) and is full-width when card faces forward or backward (0°/180°/360°).
   * - rotate uses (ry mod 360) so the shadow's long axis appears to spin under the card —
   *   this gives a continuous "follow" feel through the full rotation, never freezing.
   */
  const shadowPhaseRad = (ry * Math.PI) / 180
  const isBackFacing = Math.cos(shadowPhaseRad) < 0
  const shadowScaleX = Math.max(0.04, Math.abs(Math.cos(shadowPhaseRad)))
  const shadowRotateDeg =
    (isBackFacing ? 1 : -1) * Math.sin(shadowPhaseRad) * 10
  const shadowAlpha = 0.32 + Math.min(0.16, Math.abs(rx) * 0.0025)

  return (
    <section
      id="secret"
      className="snap-section snap-section--secret"
      aria-label="Secret section"
    >
      <div className="snap-section-inner">
        <div className="page secret-page">
          <header className="page-header">
            <h1>Secret Section: What&apos;s your Pokemon card?</h1>
            {!showSpinningPokeball ? (
              <p className="secret-subtitle">
                Click the Poké Ball to find out!
              </p>
            ) : null}
          </header>
          <div className="secret-stage">
            <div
              className={`secret-reveal-slot ${cardFrontLoaded && hasCard ? 'secret-reveal-slot--card-ready' : ''} ${showSpinningPokeball ? 'secret-reveal-slot--loading' : ''}`}
            >
              {!hasPressedHuh ? (
                <button
                  type="button"
                  className="secret-huh-button"
                  onClick={fetchRandomCard}
                  disabled={loading}
                  aria-label="Huh?"
                >
                  <img src={pokeballButton} alt="" className="secret-huh-icon" />
                </button>
              ) : (
                <div className="secret-reveal-stack">
                  {hasCard ? (
                    <div
                      className={`secret-card-wrap ${!cardFrontLoaded ? 'secret-card-wrap--preloading' : ''} ${isCardIntroAnimating ? 'secret-card-wrap--intro-animating' : ''}`}
                      style={
                        {
                          '--card-shadow-scale': `${shadowScaleX}`,
                          '--card-shadow-alpha': `${Math.min(0.62, shadowAlpha)}`,
                          '--card-shadow-rotate': `${shadowRotateDeg}deg`,
                        } as CSSProperties
                      }
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerCancel={onPointerUp}
                    >
                      <div
                        className={`secret-card-intro-shell ${isCardIntroAnimating ? 'secret-card-intro-shell--animating' : ''}`}
                      >
                        <div
                          className="secret-card-3d"
                          style={{ transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}
                        >
                          <img
                            src={imageSrc ?? undefined}
                            alt={card?.name ?? 'Pokemon card front'}
                            className="secret-card-face secret-card-face--front"
                            draggable={false}
                            loading="eager"
                            decoding="async"
                            onLoad={() => setCardFrontLoaded(true)}
                            onError={() => setCardFrontLoaded(true)}
                            ref={(el) => {
                              if (el?.complete && el.naturalHeight > 0) {
                                setCardFrontLoaded(true)
                              }
                            }}
                          />
                          <img
                            src={pokemonCardBack}
                            alt="Pokemon card back"
                            className="secret-card-face secret-card-face--back"
                            draggable={false}
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {showSpinningPokeball ? (
                    <div
                      className="secret-pokeball-loading--overlay"
                      aria-busy="true"
                      aria-label="Loading Pokémon card"
                    >
                      <div className="secret-pokeball-loading">
                        <img
                          src={pokeballButton}
                          alt=""
                          className="secret-huh-icon secret-huh-icon--spinning"
                          draggable={false}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            {error ? <p className="form-error">{error}</p> : null}
            {cardFrontLoaded && card?.set?.name ? (
              <p className="secret-set-name">(From {card.set.name})</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

