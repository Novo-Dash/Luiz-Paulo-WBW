import { motion } from 'framer-motion';
import { Globe, Medal, ShieldCheck, Clock, GraduationCap, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CredentialCard {
  Icon: LucideIcon;
  label: string;
  value: string;
}

const credentials: CredentialCard[] = [
  { Icon: Globe,          label: 'World Ranking',     value: 'Top 50 — IBJJF'        },
  { Icon: Medal,          label: 'Titles',             value: '20+ Competition Medals' },
  { Icon: ShieldCheck,    label: 'IBJJF',              value: 'Certified Black Belt'   },
  { Icon: Clock,          label: 'Experience',         value: '15+ Years Competing'    },
  { Icon: GraduationCap,  label: 'Instructor Certs',   value: 'IBJJF & GB Certified'   },
  { Icon: Users,          label: 'Students Promoted',  value: '50+ Black Belts'        },
];

export default function Coaches() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="coaches"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Title */}
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
            className="coaches-headline"
            style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            MEET THE <span style={{ color: '#CC2020' }}>COACHES</span>
          </h2>
        </motion.div>

        {/* Coach Card Layout */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="coach-photo-wrap"
            style={{
              flex: '0 0 400px',
              alignSelf: 'stretch',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/professor/luiz%20paulo.webp"
              alt="Professor Luiz Paulo"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ flex: '1', minWidth: '280px' }}
          >
            {/* Red Name Card */}
            <div
              style={{
                backgroundColor: '#CC2020',
                borderRadius: '16px',
                padding: '32px 40px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Kurdis, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Head Instructor
              </div>
              <h3
                style={{
                  fontFamily: 'Kurdis, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  margin: '0 0 12px',
                }}
              >
                PROFESSOR LUIZ PAULO
              </h3>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '6px 16px',
                  borderRadius: '40px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 12l2 2 4-4"/><path d="M6.5 16.5a9 9 0 0 0 11 0"/></svg>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                  }}
                >
                  CORAL BELT — 7TH DEGREE
                </span>
              </div>
            </div>

            {/* Credential Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {credentials.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    backgroundColor: '#F7F7F7',
                    borderRadius: '12px',
                    padding: '16px 18px',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#CC2020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color="#FFFFFF" strokeWidth={1.8} />
                  </div>
                  {/* Text */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        color: '#999999',
                        textTransform: 'uppercase',
                        marginBottom: '3px',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '13px',
                        color: '#1A1A1A',
                        lineHeight: 1.3,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: 1.75,
                color: '#666666',
              }}
            >
              Professor Luiz Paulo has dedicated his life to the art and science of Brazilian Jiu-Jitsu.
              Born in Brazil and trained under world-class instructors, he brings elite competition experience
              and genuine passion for teaching to every class. His approach is technical, patient, and
              deeply rooted in the philosophy that BJJ is for everyone — regardless of background, age, or athletic ability.
            </p>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .coaches-headline { font-size: 28px !important; white-space: nowrap; }
          .coach-photo-wrap { flex: 0 0 100% !important; max-width: 100% !important; height: 320px !important; align-self: auto !important; }
        }
      `}</style>
    </section>
  );
}
