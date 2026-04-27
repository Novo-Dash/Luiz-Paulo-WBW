import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// ── Types ────────────────────────────────────────────────────────────────────

interface SlidePair {
  left: string;
  right: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURED_IMAGE = '/images/about%20us/principal.webp';

const SLIDES: SlidePair[] = [
  { left: '/images/about%20us/auxiliar1.webp',   right: '/images/about%20us/Auxiliar%202.webp' },
  { left: '/images/about%20us/auxiliar3.webp',   right: '/images/about%20us/auxiliar4.webp'    },
  { left: '/images/about%20us/auxiliar4.webp',   right: '/images/about%20us/auxiliar1.webp'    },
  { left: '/images/about%20us/Auxiliar%202.webp', right: '/images/about%20us/auxiliar3.webp'   },
];

const AUTOPLAY_INTERVAL = 3500;

// ── Animation variants ────────────────────────────────────────────────────────

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2 } },
};

function bottomVariant(index: number) {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.15 * index },
    },
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: '14px',
        left: '14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '2px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}
    >
      {label}
    </span>
  );
}

// ── Carousel ─────────────────────────────────────────────────────────────────

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLImageElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  function goTo(nextIndex: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const leftEl = leftImgRef.current;
    const rightEl = rightImgRef.current;
    if (!leftEl || !rightEl) { isAnimating.current = false; return; }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setActiveIndex(nextIndex);
      },
    });

    // Slide current pair out to the left
    tl.to([leftEl, rightEl], {
      x: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        // Swap images while invisible, then reset x
        leftEl.src = SLIDES[nextIndex].left;
        rightEl.src = SLIDES[nextIndex].right;
        gsap.set([leftEl, rightEl], { x: 20 });
      },
    });

    // Slide next pair in from the right
    tl.to([leftEl, rightEl], {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.1,
    });
  }

  function advance() {
    const next = (activeIndex + 1) % SLIDES.length;
    goTo(next);
  }

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(advance, AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    dragStartX.current = e.clientX;
    isDragging.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (!isDragging.current) return;
    if (delta < -40) goTo((activeIndex + 1) % SLIDES.length);
    else if (delta > 40) goTo((activeIndex - 1 + SLIDES.length) % SLIDES.length);
  }

  return (
    <div>
      {/* Two images side by side */}
      <div
        style={{ display: 'flex', gap: '16px', cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {(['left', 'right'] as const).map((side, i) => (
          <motion.div
            key={side}
            ref={side === 'left' ? leftRef : rightRef}
            variants={bottomVariant(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{
              flex: 1,
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '400 / 260',
            }}
          >
            <img
              ref={side === 'left' ? leftImgRef : rightImgRef}
              src={SLIDES[0][side]}
              alt={`Academy ${side}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
            <Badge label={`// 0${i + 1}`} />
          </motion.div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: i === activeIndex ? '#CC2020' : '#E0E0E0',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '100px 40px', overflow: 'hidden' }}>
      <div
        className="about-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          gap: '48px',
          alignItems: 'stretch',
        }}
      >
        {/* ── Left: tall featured image ── */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            minHeight: '500px',
          }}
        >
          <img
            src={FEATURED_IMAGE}
            alt="Luiz Paulo BJJ Norwood"
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <Badge label="// 01" />
        </motion.div>

        {/* ── Right: text + carousel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Text block */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '16px',
              }}
            >
              // About Us
            </p>
            <h3
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(24px, 3vw, 40px)',
                lineHeight: 1.2,
                color: '#1A1A1A',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}
            >
              More Than a Gym —<br />
              A Home for{' '}
              <span style={{ color: '#CC2020' }}>Every</span> Level,<br />
              Every <span style={{ color: '#CC2020' }}>Background.</span>
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#666666',
                maxWidth: '520px',
              }}
            >
              Luiz Paulo BJJ Norwood was built from the ground up as a space where
              anyone can walk in and belong — from absolute beginners to seasoned
              competitors. Located in the heart of Norwood, our academy brings
              world-class Brazilian Jiu-Jitsu instruction to the local community.
              <br />
              <br />
              We believe the mat is a place of growth, respect, and connection.
              Whether your goal is self-defense, fitness, competition, or simply
              showing up — you will always have a place here.
            </p>
          </motion.div>

          {/* Carousel */}
          <Carousel />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .about-grid > *:first-child {
            height: 300px !important;
            min-height: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
