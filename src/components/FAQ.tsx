import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { faqItems, type FAQItem } from '../data';

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid #E5E5E5',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '24px 0',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '17px',
            color: '#1A1A1A',
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: open ? '#CC2020' : '#FFFFFF',
            color: open ? '#FFFFFF' : '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: 1,
            transition: 'background-color 0.2s ease, color 0.2s ease',
          }}
        >
          {open ? '×' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: 1.75,
                color: '#666666',
                paddingBottom: '24px',
                paddingRight: '48px',
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="faq"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: '80px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Title */}
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
            style={{ flex: '0 0 320px', maxWidth: '100%' }}
          >
            <h2
              style={{
                fontFamily: 'Kurdis, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 64px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: '#1A1A1A',
                marginBottom: '24px',
              }}
            >
              GOT QUESTIONS?{' '}
              <span style={{ color: '#CC2020' }}>WE'VE GOT ANSWERS.</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#999999',
                lineHeight: 1.7,
              }}
            >
              Everything you need to know before stepping on the mat for the first time.
            </p>
          </motion.div>

          {/* Right Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ flex: 1, minWidth: '280px' }}
          >
            {faqItems.map((item) => (
              <FAQAccordionItem key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
