import { useEffect, useRef } from 'react';
import { useModal } from '../hooks/ModalContext';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

export default function BookingModal() {
  const { isModalOpen, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject LeadConnector embed script once
    const scriptId = 'lc-form-embed';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'back.out(1.7)' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, delay: 0.1, onComplete: closeModal, ease: 'power2.in' });
  };

  if (!isModalOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        opacity: 0,
      }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.06)')}
        >
          <X size={18} color="#1A1A1A" />
        </button>

        {/* LeadConnector Form */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/Ovb0DrUerXqQdLADin62"
            style={{ width: '100%', height: '777px', border: 'none', borderRadius: '24px', display: 'block' }}
            id="inline-Ovb0DrUerXqQdLADin62"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Form Novo Dash"
            data-height="777"
            data-layout-iframe-id="inline-Ovb0DrUerXqQdLADin62"
            data-form-id="Ovb0DrUerXqQdLADin62"
            title="Form Novo Dash"
          />
        </div>
      </div>
    </div>
  );
}
