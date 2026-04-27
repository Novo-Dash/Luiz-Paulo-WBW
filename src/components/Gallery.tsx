import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const galleryImages = [
  { id: 1,  src: '/images/gallery/1.webp',   alt: 'BJJ Training Gallery 01' },
  { id: 2,  src: '/images/gallery/2.webp',   alt: 'BJJ Training Gallery 02' },
  { id: 3,  src: '/images/gallery/3.webp',   alt: 'BJJ Training Gallery 03' },
  { id: 4,  src: '/images/gallery/4.webp',   alt: 'BJJ Training Gallery 04' },
  { id: 5,  src: '/images/gallery/5.webp',   alt: 'BJJ Training Gallery 05' },
  { id: 6,  src: '/images/gallery/6.webp',   alt: 'BJJ Training Gallery 06' },
  { id: 7,  src: '/images/gallery/7.webp',   alt: 'BJJ Training Gallery 07' },
  { id: 8,  src: '/images/gallery/8.webp',   alt: 'BJJ Training Gallery 08' },
  { id: 9,  src: '/images/gallery/9.webp',   alt: 'BJJ Training Gallery 09' },
  { id: 10, src: '/images/gallery/10.webp',  alt: 'BJJ Training Gallery 10' },
  { id: 11, src: '/images/gallery/11.webp',  alt: 'BJJ Training Gallery 11' },
  { id: 12, src: '/images/gallery/12.webp',  alt: 'BJJ Training Gallery 12' },
  { id: 13, src: '/images/gallery/13.webp',  alt: 'BJJ Training Gallery 13' },
  { id: 14, src: '/images/gallery/14.webp',  alt: 'BJJ Training Gallery 14' },
  { id: 15, src: '/images/gallery/15.webp',  alt: 'BJJ Training Gallery 15' },
  { id: 16, src: '/images/gallery/16.webp',  alt: 'BJJ Training Gallery 16' },
];

export default function Gallery() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '100px 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          style={{
            marginBottom: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              margin: 0,
            }}
          >
            GALLERY
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <div className="gallery-track">
          {[...galleryImages, ...galleryImages].map((img, index) => {
            const isBlurred = hoveredIdx !== null && hoveredIdx !== index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  flex: '0 0 auto',
                  width: '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  filter: isBlurred ? 'blur(4px)' : 'none',
                  opacity: isBlurred ? 0.5 : 1,
                  transition: 'filter 0.35s ease, opacity 0.35s ease',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={240}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .gallery-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: gallery-marquee 35s linear infinite;
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
        @keyframes gallery-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
