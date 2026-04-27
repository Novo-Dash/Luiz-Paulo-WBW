import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CardNav.css';

interface NavLink {
  label: string;
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onOpenModal?: () => void;
}

function ArrowIcon() {
  return (
    <svg className="nav-card-link-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor = '#0A0A0A',
  buttonTextColor = '#fff',
  onOpenModal,
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content');
      if (contentEl) {
        const prevVis = contentEl.style.visibility;
        const prevPE = contentEl.style.pointerEvents;
        const prevPos = contentEl.style.position;
        const prevH = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        void contentEl.offsetHeight;

        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = prevVis;
        contentEl.style.pointerEvents = prevPE;
        contentEl.style.position = prevPos;
        contentEl.style.height = prevH;

        return 72 + contentHeight + 16;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 72, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) { tl.progress(1); tlRef.current = tl; }
      } else {
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) tlRef.current = tl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
        aria-label="Main navigation"
      >
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Logo */}
          <div className="logo-container">
            {logo ? (
              <img src={logo} alt={logoAlt} className="card-nav-logo" width={120} height={40} />
            ) : (
              <span style={{ fontFamily: 'Kurdis, sans-serif', fontSize: '15px', letterSpacing: '0.05em', color: '#0A0A0A' }}>
                LUIZ PAULO BJJ
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={onOpenModal}
            aria-label="Book a trial class"
          >
            TRIAL CLASS
            <svg
              style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'middle' }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href ?? '#'}
                    aria-label={lnk.ariaLabel}
                    onClick={lnk.onClick ? (e) => { e.preventDefault(); lnk.onClick!(); } : undefined}
                  >
                    <ArrowIcon />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
