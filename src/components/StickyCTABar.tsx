import { useEffect, useState } from 'react';
import { useModal } from '../hooks/ModalContext';

export default function StickyCTABar() {
  const { openModal } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 600); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className="sticky-cta-bar"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <button
          onClick={openModal}
          style={{
            width: '100%',
            maxWidth: '420px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.06em',
            color: '#FFFFFF',
            backgroundColor: 'var(--color-accent)',
            padding: '16px 24px',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          Book Your Free Trial Class ↗
        </button>
      </div>
      <style>{`
        @media (min-width: 768px) { .sticky-cta-bar { display: none !important; } }
      `}</style>
    </>
  );
}
