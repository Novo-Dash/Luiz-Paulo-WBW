import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useModal } from '../hooks/ModalContext';

interface HeroProps {}


const avatars = [
  '/images/herodo/member1.webp',
  '/images/herodo/member2.webp',
  '/images/herodo/member3.webp',
];

function AvatarStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      {avatars.map((src, i) => {
        const isHovered = hoveredIndex === i;
        const isBlurred = hoveredIndex !== null && hoveredIndex !== i;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              width: '34px',
              height: '34px',
              marginLeft: i === 0 ? 0 : '-9px',
              zIndex: isHovered ? 10 : avatars.length - i,
              transition: 'transform 0.25s ease, z-index 0s',
              transform: isHovered ? 'scale(1.5)' : 'scale(1)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt={`Member ${i + 1}`}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '2px solid #CC2020',
                objectFit: 'cover',
                display: 'block',
                filter: isBlurred ? 'blur(2px)' : 'none',
                transition: 'filter 0.25s ease',
              }}
            />
            {/* 50% dark overlay when blurred */}
            {isBlurred && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  transition: 'opacity 0.25s ease',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero(_props: HeroProps) {
  const { openModal } = useModal();
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.1
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.25
      )
      .fromTo(
        rightColRef.current,
        { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 0.75 },
        0.4
      );
  }, []);

  return (
    <section
      id="home"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
      className="hero-section"
    >
      {/* Image container — rounded, fills padded area */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="hero-container"
      >
        {/* Background Image — LCP element */}
        <picture>
          <source srcSet="/images/1.webp" type="image/webp" />
          <img
            src="/images/1.jpg"
            alt="BJJ Training at Luiz Paulo Norwood academy"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="hero-bg-img"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
        </picture>

        {/* Overlay — desktop: fade bottom-up / mobile: fade top-down */}
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />


        {/* ── BOTTOM CONTENT ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            marginTop: 'auto',
            padding: '0 48px 52px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {/* LEFT — Badge + Headline */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            {/* Social Proof Badge */}
            <div
              ref={badgeRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                opacity: 0,
              }}
            >
              <AvatarStack />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.88)',
                  letterSpacing: '0.02em',
                }}
              >
                300+ Active Members
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <h1
                style={{
                  fontFamily: 'Kurdis, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 6vw, 112px)',
                  lineHeight: 0.95,
                  letterSpacing: '-2px',
                  color: '#FFFFFF',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Grit,
                <br />
                Discipline,
                <br />
                and Black Belts.
              </h1>
            </div>
          </div>

          {/* RIGHT — Subtext + Buttons */}
          <div
            ref={rightColRef}
            style={{
              flex: '0 0 auto',
              maxWidth: '360px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              opacity: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.7,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Experience jiu-jitsu like never before — real self-defense, discipline, and a community that feels like family.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
              {/* Primary — Red */}
              <button
                onClick={openModal}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.07em',
                  color: '#FFFFFF',
                  backgroundColor: '#CC2020',
                  padding: '13px 24px',
                  borderRadius: '40px',
                  textDecoration: 'none',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(204,32,32,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                CLAIM YOUR FREE TRIAL ↗
              </button>

              {/* Secondary — Ghost */}
              <a
                href="#classes"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.55)',
                  padding: '13px 24px',
                  borderRadius: '40px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.85)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
                }}
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Overlay — desktop: fade bottom-up */
        /* Posição da imagem — desktop padrão */
        .hero-bg-img { object-position: center 75%; }
        .hero-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.10) 100%);
        }
        /* Notebook: Y ajustado */
        @media (min-width: 768px) and (max-width: 1439px) {
          .hero-bg-img { object-position: center 90%; }
        }
        /* Desktop & notebook: altura fixa para consistência */
        @media (min-width: 768px) {
          .hero-section {
            height: 100vh;
            min-height: 560px;
          }
          .hero-container {
            flex: 1;
            min-height: 0;
          }
        }
        /* Mobile */
        @media (max-width: 767px) {
          .hero-container {
            min-height: 100svh;
          }
          /* Zoom + shift real para descer o conteúdo da imagem */
          .hero-bg-img {
            transform: scale(1.25) translateY(8%);
            transform-origin: center center;
          }
          /* Fade top → bottom no mobile */
          .hero-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.50) 100%) !important;
          }
          /* Conteúdo no TOPO, centralizado */
          section#home > div > div:last-child {
            margin-top: 0 !important;
            padding: 100px 24px 32px !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          /* Badge centralizado */
          section#home > div > div:last-child > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          /* Col direita full width */
          section#home > div > div:last-child > div:last-child {
            max-width: 100% !important;
            align-items: center !important;
          }
          /* Botões na mesma linha, centralizados */
          section#home > div > div:last-child > div:last-child > div {
            justify-content: center !important;
          }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </section>
  );
}
