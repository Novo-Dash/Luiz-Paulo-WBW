import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useModal } from '../hooks/ModalContext';

interface ClassCard {
  title: string[];
  image: string;
}

const cards: ClassCard[] = [
  { title: ['KIDS', 'JIU-JITSU'], image: '/images/programs/kids.webp' },
  { title: ['BEGINNERS', 'JIU-JITSU'], image: '/images/programs/beginner.webp' },
  { title: ['ADULTS', 'JIU-JITSU'], image: '/images/programs/adults.webp' },
];

export default function Classes() {
  const { openModal } = useModal();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i === index) {
        gsap.to(card, {
          flex: 1.6,
          filter: 'blur(0px) brightness(1)',
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(card, {
          flex: 0.7,
          filter: 'blur(3px) brightness(0.5)',
          opacity: 0.6,
          scale: 0.97,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  };

  const handleMouseLeave = () => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        flex: 1,
        filter: 'blur(0px) brightness(1)',
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  useEffect(() => {
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) gsap.killTweensOf(card);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .classes-container {
          display: flex;
          flex-direction: row;
          gap: 16px;
          overflow: hidden;
        }
        .class-card {
          flex: 1;
          height: 520px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .class-card-cta-text {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        @media (max-width: 767px) {
          .classes-container {
            flex-direction: column;
          }
          .class-card {
            flex: none !important;
            width: 100%;
            height: 400px;
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section
        id="classes"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '0 0 48px 0',
            }}
          >
            <span style={{ color: '#1A1A1A' }}>OUR </span>
            <span style={{ color: '#CC2020' }}>CLASSES</span>
          </h2>

          <div className="classes-container">
            {cards.map((card, i) => (
              <div
                key={card.title[0]}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="class-card"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={openModal}
              >
                {/* Full-cover image */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                }}>
                  <img
                    src={card.image}
                    alt={card.title.join(' ')}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                  zIndex: 1,
                }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '28px',
                    left: '28px',
                    right: '28px',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Kurdis, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(36px, 4vw, 56px)',
                      lineHeight: 0.95,
                      letterSpacing: '-1px',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                    }}
                  >
                    {card.title.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'Kurdis, sans-serif',
                        fontWeight: 600,
                        fontSize: '12px',
                        letterSpacing: '3px',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                      }}
                    >
                      START YOUR JOURNEY
                    </span>

                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#CC2020',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: '#FFFFFF', fontSize: '18px', lineHeight: 1, transform: 'translateY(-1px)', display: 'block' }}>
                        ↗
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
