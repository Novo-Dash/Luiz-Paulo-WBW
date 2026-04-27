import { useModal } from '../hooks/ModalContext';
import CardNav from './CardNav';

const NAV_ITEMS = [
  {
    label: 'Programs',
    bgColor: '#F5F5F5',
    textColor: '#1A1A1A',
    links: [
      { label: 'Adults Jiu-Jitsu', href: '#classes',  ariaLabel: 'Adults Jiu-Jitsu program' },
      { label: 'Kids Jiu-Jitsu',   href: '#classes',  ariaLabel: 'Kids Jiu-Jitsu program' },
    ],
  },
  {
    label: 'Schedule',
    bgColor: '#EBEBEB',
    textColor: '#1A1A1A',
    links: [
      { label: 'Class Schedule', href: '#schedule',        ariaLabel: 'View class schedule' },
      { label: 'How to Start',   href: '#how-to-schedule', ariaLabel: 'How to get started' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#E0E0E0',
    textColor: '#1A1A1A',
    links: [
      { label: 'Book a Free Trial', href: '#', ariaLabel: 'Book a free trial class' },
      { label: 'Our Location',      href: '#schedule', ariaLabel: 'View our location' },
    ],
  },
];

export default function Header() {
  const { openModal } = useModal();

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    links: item.links.map((lnk) =>
      lnk.label === 'Book a Free Trial'
        ? { ...lnk, onClick: openModal }
        : lnk
    ),
  }));

  return (
    <header role="banner">
      <CardNav
        logo="/icons/logo.svg"
        logoAlt="Luiz Paulo BJJ West Bridgewater"
        items={items}
        baseColor="#ffffff"
        menuColor="#1A1A1A"
        buttonBgColor="var(--color-accent)"
        buttonTextColor="#fff"
        ease="power3.out"
        onOpenModal={openModal}
      />
    </header>
  );
}
