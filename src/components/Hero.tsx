import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../hooks/ModalContext';

export default function Hero() {
  const { openModal } = useModal();

  return (
    <>
      <section id="home" className="hero-section" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div className="hero-grid">
          {/* Left — text */}
          <div className="hero-left">
            <p
              data-hero-animate=""
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
                animationDelay: '0.1s',
              }}
            >
              // West Bridgewater, MA
            </p>

            <h1
              data-hero-animate=""
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 5.2vw, 6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                margin: '0 0 24px',
                animationDelay: '0.2s',
              }}
            >
              Jiu-Jitsu<br />
              in West<br />
              Bridgewater
            </h1>

            <p
              data-hero-animate=""
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: 1.65,
                color: 'var(--color-text-secondary)',
                margin: '0 0 32px',
                maxWidth: '380px',
                animationDelay: '0.3s',
              }}
            >
              No experience needed. For all ages and levels — from kids to adults.
            </p>

            {/* CTA buttons */}
            <div
              data-hero-animate=""
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px', animationDelay: '0.4s' }}
            >
              <button
                onClick={openModal}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.07em',
                  color: '#FFFFFF',
                  backgroundColor: 'var(--color-accent)',
                  padding: '14px 28px',
                  borderRadius: '40px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(204,32,32,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                CLAIM YOUR FREE TRIAL <ArrowUpRight size={14} strokeWidth={2.5} style={{ marginLeft: '4px' }} />
              </button>
              <a
                href="#classes"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#1A1A1A',
                  border: '1px solid rgba(0,0,0,0.2)',
                  padding: '14px 24px',
                  borderRadius: '40px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
                }}
              >
                Learn more
              </a>
            </div>

            {/* Inline stats */}
            <div
              data-hero-animate=""
              style={{ display: 'flex', gap: '0', alignItems: 'center', animationDelay: '0.5s' }}
            >
              {[
                { value: '300+', label: 'Students' },
                { value: '10+', label: 'Years' },
                { value: '5.0★', label: 'Google' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', padding: i === 0 ? '0 20px 0 0' : '0 20px' }}>
                    <div style={{
                      fontFamily: 'Kurdis, sans-serif',
                      fontWeight: 800,
                      fontSize: '22px',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginTop: '3px',
                    }}>
                      {s.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(0,0,0,0.12)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="hero-right">
            <div className="hero-img-wrapper">
              <img
                src="/images/hero.webp"
                alt="BJJ Training at Luiz Paulo West Bridgewater"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        [data-hero-animate] {
          opacity: 0;
          animation: hero-fade-up 0.7s ease forwards;
        }
        .hero-section {
          height: 100vh;
        }
        @supports (height: 100svh) {
          .hero-section { height: 100svh; }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: stretch;
          height: 100%;
          padding: 0 40px;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 88px;
          padding-bottom: 40px;
        }
        .hero-right {
          position: relative;
        }
        .hero-img-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 80px;
          border-radius: 0 0 20px 20px;
          overflow: hidden;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
        }
        @media (max-width: 767px) {
          .hero-section {
            height: auto !important;
            background-color: #FFFFFF !important;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 0;
            gap: 0;
            height: auto;
          }
          .hero-left {
            position: static;
            z-index: auto;
            padding: 96px 24px 32px;
            justify-content: flex-start;
          }
          .hero-right {
            display: block;
            position: relative;
            height: 300px;
            margin: 0 16px 48px;
            padding-bottom: 0;
          }
          .hero-img-wrapper {
            bottom: 0;
            border-radius: 16px;
          }
        }
      `}</style>
    </>
  );
}
