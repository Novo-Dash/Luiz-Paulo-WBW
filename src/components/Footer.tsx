import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useModal } from '../hooks/ModalContext';

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}

export default function Footer() {
  const { openModal } = useModal();
  return (
    <footer
      style={{
        backgroundColor: '#CC2020',
        padding: '80px 24px 40px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <img
            src="/icons/logo.svg"
            alt="Luiz Paulo BJJ"
            style={{ height: '48px', width: 'auto' }}
          />
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

        {/* Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Address */}
          <div>
            <h4
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              ADDRESS
            </h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <MapPin size={18} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                120 W Center St<br />
                West Bridgewater, MA 02379<br />
                United States
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={16} color="#FFFFFF" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                  (617) 555-0100
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={16} color="#FFFFFF" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                  info@luizpaulobjj.com
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                {[IconInstagram, IconFacebook, IconYoutube].map((Icon, i) => (
                  <a key={i} href="#" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              HOURS
            </h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Clock size={16} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  <span>Mon – Fri</span>
                  <span>6:00 AM – 9:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  <span>Saturday</span>
                  <span>9:00 AM – 12:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  <span>Sunday</span>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Find Us */}
          <div>
            <h4
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              FIND US
            </h4>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px' }}>
              <iframe
                src="https://maps.google.com/maps?q=120+W+Center+St,+West+Bridgewater,+MA+02379&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="160"
                title="Luiz Paulo BJJ location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block', filter: 'grayscale(20%) invert(90%) hue-rotate(180deg)' }}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            © 2026 LUIZ PAULO BJJ · ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
