import { programs } from '../data';
import { useModal } from '../hooks/ModalContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Programs() {
  const { openModal } = useModal();
  const { ref, controls } = useScrollAnimation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="classes"
      style={{ backgroundColor: '#FFFFFF', padding: '100px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          style={{ marginBottom: '56px' }}
        >
          <h2
            style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            <span style={{ color: '#1A1A1A' }}>OUR </span>
            <span style={{ color: '#CC2020' }}>PROGRAMS</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {programs.map((item) => {
            const isActive = hoveredId === item.id;
            const isDimmed = hoveredId !== null && !isActive;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={openModal}
                style={{
                  flex: '1',
                  minWidth: '280px',
                  minHeight: '420px',
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease, opacity 0.3s ease',
                  transform: isActive
                    ? 'translateY(-18px)'
                    : isDimmed
                    ? 'scale(0.97)'
                    : 'translateY(0) scale(1)',
                  filter: isDimmed ? 'blur(3px) brightness(0.5)' : 'none',
                  opacity: isDimmed ? 0.6 : 1,
                  boxShadow: isActive
                    ? '0 32px 64px rgba(0,0,0,0.4)'
                    : '0 4px 16px rgba(0,0,0,0.1)',
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px',
                    color: '#FFFFFF',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '28px',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      margin: '0 0 12px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                  <button
                    onClick={openModal}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      letterSpacing: '0.1em',
                      color: '#CC2020',
                      backgroundColor: '#FFFFFF',
                      padding: '14px 28px',
                      borderRadius: '40px',
                      textDecoration: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      display: 'inline-block',
                      marginTop: '20px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    FREE TRIAL →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
