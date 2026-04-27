import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { reviews, type ReviewItem } from '../data';
import { useModal } from '../hooks/ModalContext';

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: '18px' }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ item, isBlurred, onMouseEnter, onMouseLeave }: { item: ReviewItem; isBlurred: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        filter: isBlurred ? 'blur(4px)' : 'none',
        opacity: isBlurred ? 0.5 : 1,
        transition: 'filter 0.35s ease, opacity 0.35s ease',
      }}
    >
      <StarRating count={item.rating} />
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          lineHeight: 1.75,
          color: '#444444',
          flex: 1,
          marginBottom: '32px',
        }}
      >
        "{item.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          decoding="async"
          width={48}
          height={48}
          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              color: '#1A1A1A',
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#999999',
            }}
          >
            {item.timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}

const CARDS_PER_PAGE = 3;

export default function Reviews() {
  const [page, setPage] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
  const { openModal } = useModal();
  const { ref, controls } = useScrollAnimation();

  const visibleReviews = reviews.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'Kurdis, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              margin: '0 0 20px',
            }}
          >
            WHAT THEY SAY <span style={{ color: '#CC2020' }}>ABOUT US</span>
          </h2>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              padding: '8px 20px',
              borderRadius: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1A1A1A' }}>
              Excellent
            </span>
            <span style={{ color: '#F59E0B' }}>★★★★★</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#999999' }}>5.0 · Google Reviews</span>
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {visibleReviews.map((review) => (
              <ReviewCard
                key={review.id}
                item={review}
                isBlurred={hoveredId !== null && hoveredId !== review.id}
                onMouseEnter={() => setHoveredId(review.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
          <button
            onClick={prev}
            disabled={page === 0}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid #E5E5E5',
              backgroundColor: '#FFFFFF',
              cursor: page === 0 ? 'default' : 'pointer',
              opacity: page === 0 ? 0.4 : 1,
              fontSize: '18px',
              transition: 'border-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (page > 0) e.currentTarget.style.borderColor = '#CC2020';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            ←
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  width: i === page ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === page ? '#CC2020' : '#CCCCCC',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid #E5E5E5',
              backgroundColor: '#FFFFFF',
              cursor: page === totalPages - 1 ? 'default' : 'pointer',
              opacity: page === totalPages - 1 ? 0.4 : 1,
              fontSize: '18px',
              transition: 'border-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (page < totalPages - 1) e.currentTarget.style.borderColor = '#CC2020';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
          >
            →
          </button>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button
            onClick={openModal}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              letterSpacing: '0.1em',
              color: '#FFFFFF',
              backgroundColor: '#CC2020',
              padding: '18px 40px',
              borderRadius: '40px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(166,69,54,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            SCHEDULE YOUR FREE TRIAL CLASS →
          </button>
        </div>
      </div>
    </section>
  );
}
