import { useMemo, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { schedule } from '../data/schedule';
import { useModal } from '../hooks/ModalContext';

type Filter = 'all' | 'adults' | 'kids';

const STATS_DATA = [
  { value: 300, suffix: '+', label: 'ACTIVE STUDENTS' },
  { value: 10,  suffix: '+', label: 'YEARS OF EXCELLENCE' },
  { value: 5.0, suffix: ' ★', label: 'GOOGLE REVIEWS' },
];

function getTypeColor(type: string): string {
  if (type.startsWith('KIDS')) return '#16A34A';
  if (type.startsWith('ADULT')) return '#2563EB';
  return '#6B7280';
}

export default function Stats() {
  const { openModal } = useModal();
  const [filter, setFilter] = useState<Filter>('all');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const filtered = useMemo(() =>
    schedule.map((day) => ({
      ...day,
      classes:
        filter === 'all'    ? day.classes :
        filter === 'adults' ? day.classes.filter((c) => c.type.startsWith('ADULT')) :
                              day.classes.filter((c) => c.type.startsWith('KIDS')),
    })),
  [filter]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;

        STATS_DATA.forEach((stat, i) => {
          const numberEl = document.getElementById(`sched-stat-${i}`);
          if (!numberEl) return;
          const isDecimal = stat.value % 1 !== 0;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: stat.value,
            duration: 2,
            delay: i * 0.15,
            ease: 'power2.out',
            onUpdate() {
              numberEl.textContent = isDecimal
                ? proxy.val.toFixed(1) + stat.suffix
                : Math.floor(proxy.val) + stat.suffix;
            },
          });
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="schedule"
        style={{ backgroundColor: '#F7F7F7', padding: '80px 24px' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Header + filter row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '40px',
            }}
          >
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '8px',
                margin: '0 0 8px',
              }}>
                // Schedule
              </p>
              <h2 style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
                color: '#1A1A1A',
                margin: 0,
              }}>
                CLASS SCHEDULE
              </h2>
            </div>

            {/* Filter pills */}
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '4px',
              backgroundColor: '#E5E5E5',
              borderRadius: '40px',
            }}>
              {(['all', 'adults', 'kids'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '8px 20px',
                    borderRadius: '40px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: filter === f ? '#1A1A1A' : 'transparent',
                    color: filter === f ? '#FFFFFF' : '#555555',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  {f === 'all' ? 'All' : f === 'adults' ? 'Adults' : 'Kids'}
                </button>
              ))}
            </div>
          </div>

          {/* 7-day grid */}
          <div className="schedule-grid">
            {filtered.map((day, i) => {
              const isEmpty = !day.closed && day.classes.length === 0;
              const isClosed = day.closed || isEmpty;
              const isHovered = hoveredDay === i;

              return (
                <div
                  key={day.day}
                  onMouseEnter={() => !isClosed && setHoveredDay(i)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '20px 16px',
                    borderTop: `${isHovered ? '5px' : '3px'} solid var(--color-accent)`,
                    transition: 'transform 0.3s cubic-bezier(0.34,1.48,0.64,1), box-shadow 0.3s ease, border-top-width 0.15s ease',
                    transform: isHovered ? 'translateY(-10px) scale(1.03)' : 'none',
                    boxShadow: isHovered
                      ? '0 16px 40px rgba(0,0,0,0.12)'
                      : '0 1px 4px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: isClosed ? 'default' : 'pointer',
                    opacity: isClosed ? 0.55 : 1,
                    minHeight: '120px',
                  }}
                >
                  {/* Day name */}
                  <div style={{
                    fontFamily: 'Kurdis, sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#1A1A1A',
                  }}>
                    {day.day}
                  </div>

                  {/* Classes or closed */}
                  {isClosed ? (
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#999',
                      fontStyle: 'italic',
                    }}>
                      Closed
                    </div>
                  ) : (
                    day.classes.map((cls, j) => (
                      <div key={j} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '9px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                          backgroundColor: getTypeColor(cls.type),
                          padding: '2px 7px',
                          borderRadius: '4px',
                          width: 'fit-content',
                        }}>
                          {cls.type}
                        </span>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#1A1A1A',
                        }}>
                          {cls.time}
                        </span>
                      </div>
                    ))
                  )}

                  {/* Book button — fades in on hover */}
                  {!isClosed && (
                    <button
                      onClick={openModal}
                      style={{
                        marginTop: 'auto',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        backgroundColor: 'var(--color-accent)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                        pointerEvents: isHovered ? 'auto' : 'none',
                      }}
                    >
                      BOOK ↗
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Count-up stats */}
          <div
            ref={statsRef}
            style={{ marginTop: '80px' }}
          >
            <div className="stats-count-row">
              {STATS_DATA.map((stat, i) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '16px 24px',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Kurdis, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(40px, 5vw, 68px)',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}>
                      <span id={`sched-stat-${i}`}>
                        {stat.value % 1 !== 0
                          ? stat.value.toFixed(1) + stat.suffix
                          : Math.floor(stat.value) + stat.suffix}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'Kurdis, sans-serif',
                      fontWeight: 500,
                      fontSize: '11px',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: '#1A1A1A',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                  {i < STATS_DATA.length - 1 && (
                    <div className="stat-div-line" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }
        @media (max-width: 1100px) {
          .schedule-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 640px) {
          .schedule-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .stats-count-row {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .stat-div-line {
          width: 1px;
          height: 60px;
          background-color: rgba(0,0,0,0.12);
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .stats-count-row { flex-direction: column; }
          .stats-count-row > div { flex-direction: column; width: 100%; }
          .stat-div-line { width: 60px; height: 1px; margin: 4px 0; }
        }
      `}</style>
    </>
  );
}
