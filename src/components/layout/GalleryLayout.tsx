import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { LOGO_WORDMARK_LIGHT } from '../../data/brand';
import { FOOTER_GROUPS, NAV_LINKS } from './navLinks';
import type { NavLink } from './navLinks';

// Shell for pages restyled to match the 3D gallery home page: the gallery's
// dark header and a footer of crawlable links, with `.theme-gallery` (see
// index.css) re-colouring the page inside it. Pages keep their own markup.
// The menu structure comes from ./navLinks, shared with the classic Navigation.

// The logo already goes home, so the "Home" entry is left out of the bar.
const BAR_LINKS = NAV_LINKS.filter((l) => l.path !== '/');

interface GalleryLayoutProps {
  children: ReactNode;
}

interface DropdownProps {
  link: NavLink;
  isOpen: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/** Desktop dropdown: opens on hover, click or Enter/Space; Escape closes and returns focus to the trigger. */
const DesktopDropdown = ({ link, isOpen, active, onOpen, onClose }: DropdownProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  // A pointer arrives by hovering, which already opens the menu, so the click that follows must not toggle it shut again.
  const hoverOpened = useRef(false);
  const groups = link.groups ?? [];
  const multi = groups.length > 1;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      onClose();
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      className="gallery-dd"
      onMouseEnter={() => {
        hoverOpened.current = true;
        onOpen();
      }}
      onMouseLeave={() => {
        hoverOpened.current = false;
        onClose();
      }}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="gallery-dd-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={panelId}
        data-active={active ? 'true' : undefined}
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            onOpen();
          } else if (isOpen) onClose();
          else onOpen();
        }}
      >
        {link.name}
        <ChevronDown aria-hidden="true" className="gallery-chev" />
      </button>
      <div id={panelId} className={`gallery-dd-wrap ${multi ? 'is-wide' : ''}`} data-open={isOpen ? 'true' : 'false'}>
        <div className="gallery-dd-panel">
          {groups.map((group, i) => (
            <div key={group.heading ?? i} className="gallery-dd-col">
              {group.heading && <p className="gallery-dd-head">{group.heading}</p>}
              <ul>
                {group.links.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} tabIndex={isOpen ? 0 : -1}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryLayout = ({ children }: GalleryLayoutProps) => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const mobileId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));
  const linkActive = (link: NavLink) =>
    link.groups ? link.groups.some((g) => g.links.some((l) => isActive(l.path) && l.path !== '/')) : isActive(link.path);

  // Any navigation closes every menu.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // The drawer covers the page, so freeze page scroll and let Escape close it.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // Resizing up to the desktop bar must not leave the drawer (and its scroll lock) behind.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="theme-gallery flex min-h-screen flex-col">
      <header className="gallery-bar fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0" aria-label="YuDeZign home">
            <img src={LOGO_WORDMARK_LIGHT} alt="YuDeZign" className="h-7 w-auto" />
          </Link>

          <nav aria-label="Main navigation" className="gallery-links ml-auto hidden items-center gap-7 lg:flex">
            {BAR_LINKS.map((link) =>
              link.groups ? (
                <DesktopDropdown
                  key={link.name}
                  link={link}
                  isOpen={openMenu === link.name}
                  active={linkActive(link)}
                  onOpen={() => setOpenMenu(link.name)}
                  onClose={() => setOpenMenu((cur) => (cur === link.name ? null : cur))}
                />
              ) : (
                <Link key={link.path} to={link.path} aria-current={isActive(link.path) ? 'page' : undefined}>
                  {link.name}
                </Link>
              )
            )}
          </nav>
          <Link to="/contact" className="gallery-cta hidden shrink-0 lg:inline-block">
            Start Your Project
          </Link>

          <button
            ref={burgerRef}
            type="button"
            className="gallery-burger ml-auto lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </header>

      {/* outside the header: its backdrop-filter would otherwise become the containing block of this fixed drawer */}
      {mobileOpen && (
        <nav id={mobileId} aria-label="Mobile navigation" className="gallery-drawer lg:hidden">
          <ul>
            {BAR_LINKS.map((link) => {
              if (!link.groups) {
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="gallery-acc-row"
                      aria-current={isActive(link.path) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              }
              const open = mobileSection === link.name;
              const secId = `${mobileId}-${link.name.replace(/\s+/g, '-')}`;
              return (
                <li key={link.name}>
                  <button
                    type="button"
                    className="gallery-acc-row"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={secId}
                    onClick={() => setMobileSection(open ? null : link.name)}
                  >
                    {link.name}
                    <ChevronDown aria-hidden="true" className="gallery-chev" data-open={open ? 'true' : 'false'} />
                  </button>
                  <div id={secId} className="gallery-acc-body" hidden={!open}>
                    {link.groups.map((group, i) => (
                      <div key={group.heading ?? i}>
                        {group.heading && <p className="gallery-dd-head">{group.heading}</p>}
                        <ul>
                          {group.links.map((item) => (
                            <li key={item.path}>
                              <Link to={item.path} aria-current={pathname === item.path ? 'page' : undefined}>
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <Link to="/contact" className="gallery-cta gallery-cta-block">
            Start Your Project
          </Link>
        </nav>
      )}

      <main role="main" aria-label="Main content" className="flex-grow">
        {children}
      </main>

      <footer role="contentinfo" aria-label="Site footer" className="gallery-foot">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Footer" className="gallery-foot-grid">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <p className="gallery-foot-head">{group.heading}</p>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="gallery-foot-base">
            <div>
              <img src={LOGO_WORDMARK_LIGHT} alt="YuDeZign" className="mb-3 h-6 w-auto" />
              <p>13366 Murphy Rd, Stafford, TX 77477</p>
              <p>
                <a href="tel:+17135020399">(713) 502-0399</a> &nbsp;&middot;&nbsp;{' '}
                <a href="mailto:orders@yudezign.com">orders@yudezign.com</a>
              </p>
              <p>Mon-Fri, 9:00 AM - 5:30 PM</p>
            </div>
            <div className="gallery-foot-tools">
              <Link to="/sales/login">Sales Portal</Link>
              <Link to="/admin/login">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GalleryLayout;
