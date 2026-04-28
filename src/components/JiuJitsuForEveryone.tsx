import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../hooks/ModalContext';

export default function JiuJitsuForEveryone() {
  const { openModal } = useModal();

  return (
    <section
      style={{
        backgroundColor: 'var(--color-accent)',
        padding: '100px 40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="philosophy-grid"
      >
        {/* Left */}
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '20px',
          }}>
            // Our Philosophy
          </p>
          <h2 style={{
            fontFamily: 'Kurdis, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: '#FFFFFF',
            margin: '0 0 32px',
          }}>
            Jiu-Jitsu<br />
            is for<br />
            everyone.
          </h2>
          <button
            onClick={openModal}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.07em',
              color: 'var(--color-accent)',
              backgroundColor: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '40px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            CLICK FOR A FREE TRIAL CLASS <ArrowUpRight size={14} strokeWidth={2.5} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Right */}
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.88)',
            margin: '0 0 24px',
          }}>
            Whether you're a complete beginner, a parent looking for the right activity for your child, or someone who simply wants to improve their fitness and mental focus — this is your place.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.88)',
            margin: 0,
          }}>
            Our methodology is built around welcoming people of all backgrounds, ages, and fitness levels. You don't need experience. You just need to show up.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
