import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../hooks/ModalContext';

const STEPS = [
  {
    id: 'form',
    label: '01',
    title: 'Fill the Form',
    description: 'Click the button and fill out the short form with your name and contact info. It takes less than a minute.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'day',
    label: '02',
    title: 'Pick Your Day',
    description: 'Choose the class day and time that works best for your schedule. We offer morning and evening sessions.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'confirm',
    label: '03',
    title: 'Get Confirmed',
    description: 'Our team will reach out within 24 hours to confirm your free trial and answer any questions you have.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    id: 'train',
    label: '04',
    title: 'Start Training',
    description: 'Show up in comfortable clothes. No gear needed for your first class — just bring your enthusiasm.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function HowToSchedule() {
  const { openModal } = useModal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="how-to-schedule"
      style={{ position: 'relative', padding: '100px 40px', overflow: 'hidden', backgroundColor: '#0A0A0A' }}
    >
      {/* Background image */}
      <img
        src="/images/how-to-get.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 25%',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '40px',
            marginBottom: '64px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>
              // Getting Started
            </span>
            <h2 style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.92,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: 0,
            }}>
              How to<br />Get Started
            </h2>
          </div>

          <button
            onClick={openModal}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
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
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(204,32,32,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book a Free Class <ArrowUpRight size={14} strokeWidth={2.5} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Stacked cards */}
        <div className="benefits-stack">
          {STEPS.map((step, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={step.id}
                className="benefit-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  transform: isHovered ? 'translateY(-30px) scale(1.04)' : 'none',
                  zIndex: isHovered ? 10 : 1,
                  boxShadow: isHovered
                    ? '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="benefit-bar"
                  style={{
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    background: 'var(--color-accent)',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isHovered ? 'rgba(204,32,32,0.15)' : 'rgba(255,255,255,0.06)',
                    color: isHovered ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                    border: `1px solid ${isHovered ? 'rgba(204,32,32,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '28px' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.3s',
                  }}>
                    {step.label}
                  </span>
                  <span style={{
                    fontFamily: 'Kurdis, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    transition: 'color 0.3s',
                  }}>
                    {step.title}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'color 0.3s',
                  }}>
                    {step.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
