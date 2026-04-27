import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: 300, suffix: '+',  label: 'ACTIVE STUDENTS' },
  { value: 10,  suffix: '+',  label: 'YEARS OF EXCELLENCE' },
  { value: 5.0, suffix: ' ★', label: 'GOOGLE REVIEWS' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        statsData.forEach((stat, i) => {
          const el = document.getElementById(`stat-item-${i}`);
          const numberEl = document.getElementById(`stat-number-${i}`);
          if (!el || !numberEl) return;

          // Fade + slide up
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: i * 0.2, ease: 'power2.out' }
          );

          // Count-up via proxy object
          const isDecimal = stat.value % 1 !== 0;
          const proxy = { val: 0 };

          gsap.to(proxy, {
            val: stat.value,
            duration: 2,
            delay: i * 0.2,
            ease: 'power2.out',
            onUpdate() {
              if (!numberEl) return;
              numberEl.textContent = isDecimal
                ? proxy.val.toFixed(1) + stat.suffix
                : Math.floor(proxy.val) + stat.suffix;
            },
          });
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '60px 0',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="stats-row"
      >
        {statsData.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {/* Stat item */}
            <div
              id={`stat-item-${i}`}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '16px 24px',
                opacity: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'Kurdis, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  color: '#CC2020',
                  lineHeight: 1,
                  marginBottom: '10px',
                }}
              >
                <span id={`stat-number-${i}`}>
                  {stat.value % 1 !== 0
                    ? stat.value.toFixed(1) + stat.suffix
                    : Math.floor(stat.value) + stat.suffix}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'Kurdis, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                }}
              >
                {stat.label}
              </div>
            </div>

            {/* Vertical divider — not after last item */}
            {i < statsData.length - 1 && (
              <div
                className="stat-divider"
                style={{
                  width: '1px',
                  height: '64px',
                  backgroundColor: 'rgba(0,0,0,0.12)',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .stats-row {
            flex-direction: column !important;
          }
          .stats-row > div {
            flex-direction: column !important;
            width: 100%;
          }
          .stat-divider {
            width: 80px !important;
            height: 1px !important;
            margin: 4px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
