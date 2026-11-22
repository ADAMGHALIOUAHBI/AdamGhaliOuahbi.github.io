import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ECO_STORAGE_KEYS, readEcoCookie, setEcoCookie, writeSessionPreference } from './clientStorage';
import {
  ArrowUpRight,
  AudioLines,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Github,
  House,
  Info,
  ListMusic,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  ShieldCheck,
  Sun,
  UserPlus,
  X,
} from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import LanguageShowcase from './components/LanguageShowcase';
import TimelineVideo from './components/TimelineVideo';
import TimelinePage from './TimelinePage';
import { PUBLIC_PLAYLIST } from './music/playlist';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));

const PROFILE_URL = 'https://github.com/ADAMGHALIOUAHBI';
const REPOSITORIES_URL = `${PROFILE_URL}?tab=repositories`;
const PROTECTED_USERS_URL = '/protectedUSERS_root_path_secure/';
const SOURCE_URL = PROFILE_URL;

function EcoHeader({
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
  onCloseSidebars,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onCloseSidebars: () => void;
}) {
  return (
    <header className="eco-header" onClick={(event) => {
      if (event.target instanceof Element && event.target.closest('button.toggle-button')) return;
      onCloseSidebars();
    }}>
      <div className="header-side">
        <button className="icon-button toggle-button" type="button" onClick={onToggleLeft} aria-label="Toggle navigation" aria-expanded={leftOpen} title="Toggle navigation (Ctrl+B)">
          {leftOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
        </button>
        <a className="brand" href="/" aria-label="Ghali's World home"><span className="brand-mark">GW</span><span className="brand-label">Ghali's World</span></a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about.html">About</a>
          <a href="/timeline.html">Timeline</a>
          <a href="/#languages">Languages</a>
          <a href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'}>Listen</a>
        </nav>
      </div>
      <div className="header-side header-side-right">
        <a className="header-link github-link" href={REPOSITORIES_URL} target="_blank" rel="noreferrer" aria-label="View all repositories on GitHub"><Github size={16} /><span>Repositories</span></a>
        <a className="icon-button toggle-button" href={SOURCE_URL} target="_blank" rel="noreferrer" aria-label="Open the family-managed GitHub profile" title="Family-managed GitHub profile"><ArrowUpRight size={18} /></a>
        <a className="icon-button toggle-button" href={PROTECTED_USERS_URL} aria-label="Open family access" title="Family access"><UserPlus size={19} /></a>
        <button className="icon-button toggle-button right-toggle" type="button" onClick={onToggleRight} aria-label="Toggle right sidebar" aria-expanded={rightOpen} title="Toggle right sidebar (Ctrl+M)">
          {rightOpen ? <PanelRightClose size={19} /> : <PanelRightOpen size={19} />}
        </button>
      </div>
    </header>
  );
}

function EcoLeftSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="sidebar-backdrop left-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`left-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content">
          <div className="sidebar-section-label">Navigation</div>
          <nav className="sidebar-nav" aria-label="Ghali's World pages">
            <a href="/" className="sidebar-link"><House size={18} /><span>Home</span><ChevronRight size={15} /></a>
            <a href="/about.html" className="sidebar-link"><Info size={18} /><span>About</span></a>
            <a href="/timeline.html" className="sidebar-link"><Clock3 size={18} /><span>Learning journey</span></a>
            <a href="/#languages" className="sidebar-link"><Code2 size={18} /><span>Languages &amp; starter kits</span></a>
            <a href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'} className="sidebar-link"><ListMusic size={18} /><span>Music library</span></a>
            <div className="sidebar-divider" />
            <a href={SOURCE_URL} className="sidebar-link" target="_blank" rel="noreferrer"><ArrowUpRight size={18} /><span>Family-managed GitHub</span></a>
            <a href={PROTECTED_USERS_URL} className="sidebar-link"><UserPlus size={18} /><span>Family access</span></a>
          </nav>
          <p className="sidebar-footnote">A family-managed space for learning, creativity, and safe discovery.</p>
        </div>
        <button type="button" className="sidebar-close icon-button" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
      </aside>
    </>
  );
}

function EcoRightSidebar({
  open,
  onClose,
  theme,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}) {
  return (
    <>
      {open && <button className="sidebar-backdrop right-backdrop" type="button" aria-label="Close settings" onClick={onClose} />}
      <aside className={`right-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content settings-content">
          <div className="settings-title-row"><div><span className="sidebar-section-label">PREFERENCES</span><h2>Settings</h2></div><button type="button" className="icon-button" aria-label="Close settings" onClick={onClose}><X size={18} /></button></div>
          <section className="settings-section">
            <h3>Appearance</h3>
            <button type="button" className="setting-action" onClick={onToggleTheme}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            </button>
          </section>
          <section className="settings-section">
            <h3>Your music</h3>
            <a className="setting-action" href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'}><AudioLines size={17} /><span>Open your music library</span><ChevronRight size={15} /></a>
            <p className="settings-note">Private tracks and saved links stay in this browser on this device. They are never uploaded by this site.</p>
          </section>
          <section className="settings-section">
            <h3>Project information</h3>
            <a className="setting-action" href="/about.html#privacy"><ShieldCheck size={17} /><span>Privacy and safety</span><ArrowUpRight size={14} /></a>
            <a className="setting-action" href="/about.html#family"><CircleHelp size={17} /><span>Family access</span><ArrowUpRight size={14} /></a>
          </section>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="settings-version">Family-managed GitHub <ArrowUpRight size={13} /></a>
        </div>
      </aside>
    </>
  );
}

function HomePage() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  useEffect(() => {
    if (!isAvatarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAvatarOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAvatarOpen]);

  return (
    <main id="main" className="page-main" tabIndex={-1}>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">GAMES · CREATIVITY · LEARNING · DISCOVERY</p>
          <div className="hero-heading-row">
            <h1>Welcome to <span>Ghali's World.</span><br />Let's <span className="gradient-text">explore!</span></h1>
            <button
              className="hero-avatar-button"
              type="button"
              onClick={() => setIsAvatarOpen(true)}
              aria-label="Enlarge the illustrated avatar placeholder"
            >
              <img
                className="hero-avatar"
                src="/assets/avatar-placeholder.svg"
                alt="Generic illustrated avatar placeholder"
              />
            </button>
          </div>
          <p className="hero-subtitle">A family-managed space for games, creative ideas, learning projects, and new discoveries.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/timeline.html">Choose an adventure <ArrowUpRight size={16} /></a>
            <a className="secondary-button" href="/about.html">About this space <ArrowUpRight size={16} /></a>
          </div>
          <p className="hero-caption">Play · Create · Learn · Explore</p>
        </div>
      </section>
      {isAvatarOpen && (
        <div
          className="avatar-lightbox"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsAvatarOpen(false);
          }}
        >
          <div className="avatar-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Illustrated avatar placeholder">
            <button
              className="avatar-lightbox-close"
              type="button"
              onClick={() => setIsAvatarOpen(false)}
              aria-label="Close enlarged photo"
              autoFocus
            >
              <X size={24} />
            </button>
            <img src="/assets/avatar-placeholder.svg" alt="Generic illustrated avatar placeholder" />
          </div>
        </div>
      )}

      <section className="content-section intro-section" id="ecosystem">
        <div className="section-heading"><span className="eyebrow">START HERE</span><h2>Curiosity starts every adventure.</h2><p>Try a new idea, build something small, learn how it works, and keep the details private.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">◈</span><h3>Build and code</h3><p>Explore starter projects and learn how simple programs work.</p></article>
          <article className="feature-card"><span className="feature-icon">✳</span><h3>Create and imagine</h3><p>Turn sketches, questions, and playful ideas into small projects.</p></article>
          <article className="feature-card"><span className="feature-icon">♫</span><h3>Discover and learn</h3><p>Follow curiosity, try safe experiments, and celebrate progress.</p></article>
        </div>
      </section>

      <TimelineVideo />
      <section className="content-section source-section" id="ecosystem-source">
        <div><span className="eyebrow">LEARNING TOOLKIT</span><h2>Start small and keep exploring.</h2><p>Browse approachable examples, learn what each part does, and ask a parent or guardian before trying anything online.</p></div>
        <a className="secondary-button" href="#languages">Explore starter kits <ArrowUpRight size={15} /></a>
      </section>

      <LanguageShowcase />

      <section className="content-section listen-section" id="listen-section" aria-labelledby="listen-heading">
        <div className="listen-card">
          <span className="eyebrow">A LITTLE SPACE TO LISTEN</span>
          <h2 id="listen-heading">Press play. Make yourself at home.</h2>
          {PUBLIC_PLAYLIST.length ? (
            <>
              <p>Add audio files from your device or save audio links in your private browser library. You can also add public tracks to the shared playlist in <code>src/music/playlist.ts</code>.</p>
              <a className="primary-button" href="#listen">Open music player <AudioLines size={16} /></a>
              <p className="privacy-caption">Your private library stays on this device. Playback resumes after you press Play again.</p>
            </>
          ) : (
            <p>Add a track you have permission to publish to <code>src/music/playlist.ts</code>. The footer player will appear after the playlist is configured.</p>
          )}
        </div>
      </section>

      <section className="content-section source-section" id="privacy">
        <div><span className="eyebrow">A SAFE SPACE</span><h2>Privacy comes first.</h2><p>This page is managed by family. It does not publish an exact age, school, location, daily routine, or direct contact details.</p></div>
        <a className="secondary-button" href="/about.html#privacy">Read the safety notes <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main" className="page-main about-page" tabIndex={-1}>
      <section className="about-hero">
        <span className="eyebrow">ABOUT THIS SPACE</span>
        <h1>A little world for <span className="gradient-text">big ideas.</span></h1>
        <p>Ghali's World is a family-managed place for games, creativity, coding, learning, and discovery. It celebrates curiosity while keeping personal details private.</p>
        <div className="hero-actions">
          <a className="primary-button" href="/timeline.html"><House size={16} /> Explore the learning journey</a>
          <a className="secondary-button" href={PROTECTED_USERS_URL}><ShieldCheck size={16} /> Family access <ArrowUpRight size={15} /></a>
        </div>
      </section>
      <section className="content-section about-details">
        <div className="section-heading"><span className="eyebrow">THE ADVENTURE</span><h2>Learn by trying, building, and asking questions.</h2></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">✦</span><h3>Creativity</h3><p>Give new ideas room to grow into drawings, stories, and projects.</p></article>
          <article className="feature-card"><span className="feature-icon">⌕</span><h3>Curiosity</h3><p>Ask questions, explore how things work, and learn at a comfortable pace.</p></article>
          <article className="feature-card"><span className="feature-icon">♡</span><h3>Safe discovery</h3><p>Use the site with family guidance and keep private information offline.</p></article>
        </div>
      </section>
      <section className="content-section source-section" id="privacy">
        <div><span className="eyebrow">PRIVACY</span><h2>Family-managed and intentionally low-detail.</h2><p>The public pages use a generic avatar and do not include an exact age, school, home location, schedule, or personal contact links. A parent or guardian reviews any media before it is added.</p></div>
        <a className="secondary-button" href={PROTECTED_USERS_URL}><ShieldCheck size={17} /> Parent-approved access <ArrowUpRight size={15} /></a>
      </section>
      <section className="content-section source-section" id="family">
        <div><span className="eyebrow">FAMILY ACCESS</span><h2>Adult sign-in only.</h2><p>The protected sign-in is for parent-approved adult GitHub accounts. No child account or password is needed. OAuth secrets stay on the API host.</p></div>
        <a className="secondary-button" href="/protectedUSERS_root_path_secure/">Open family access <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function EcoFooter({ onCloseSidebars }: { onCloseSidebars: () => void }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <footer className="eco-footer" onClick={onCloseSidebars}>
      <span className="footer-license">Ghali's World · family-managed · © {now.getFullYear()}</span>
      <MusicPlayer />
      <a className="footer-github-link" href={REPOSITORIES_URL} target="_blank" rel="noreferrer" aria-label="View all GitHub repositories">
        <Github size={19} />
      </a>
      <div className="footer-meta">
        <time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
        <a href="/about.html#privacy">Privacy</a>
        <a href="/about.html#family">Family access</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(ECO_STORAGE_KEYS.theme)
        ?? readEcoCookie(ECO_STORAGE_KEYS.cookieTheme)
        ?? window.localStorage.getItem('eco-starter:theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const isAbout = pathname.endsWith('/about.html');
  const isTimeline = pathname.endsWith('/timeline.html');

  useEffect(() => {
    const appPaths = new Set(['/', '/index.html', '/about.html', '/timeline.html']);
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        !appPaths.has(destination.pathname)
      ) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
        if (destination.hash !== window.location.hash) return;
        event.preventDefault();
        return;
      }
      event.preventDefault();
      window.history.pushState(null, '', destination.href);
      setPathname(destination.pathname);
    };
    const handleHistoryNavigation = () => setPathname(window.location.pathname);
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', handleHistoryNavigation);
    return () => {
      document.removeEventListener('click', handleNavigation);
      window.removeEventListener('popstate', handleHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.title = isTimeline
      ? "Learning Journey | Ghali's World"
      : isAbout
        ? "About | Ghali's World"
        : "Ghali's World";
    try {
      window.localStorage.setItem(ECO_STORAGE_KEYS.theme, theme);
      setEcoCookie(ECO_STORAGE_KEYS.cookieTheme, theme);
      writeSessionPreference('theme', theme);
    } catch {
      // The selected theme remains active for this page even if storage is disabled.
    }
  }, [isAbout, isTimeline, theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setLeftOpen((open) => !open);
      } else if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setRightOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleSidebar = (side: 'left' | 'right') => {
    const setter = side === 'left' ? setLeftOpen : setRightOpen;
    (side === 'left' ? setRightOpen : setLeftOpen)(false);
    setter((open) => !open);
  };

  const closeSidebars = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  const closeSidebar = (side: 'left' | 'right') => {
    (side === 'left' ? setLeftOpen : setRightOpen)(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Suspense fallback={<div className="three-background canvas-fallback" aria-hidden="true" />}>
        <ThreeBackground theme={theme} />
      </Suspense>
      <div className="eco-public-layout">
        <EcoHeader
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onToggleLeft={() => toggleSidebar('left')}
          onToggleRight={() => toggleSidebar('right')}
          onCloseSidebars={closeSidebars}
        />
        <div className="main-container">
          <EcoLeftSidebar open={leftOpen} onClose={() => closeSidebar('left')} />
          {isTimeline ? <TimelinePage /> : isAbout ? <AboutPage /> : <HomePage />}
          <EcoRightSidebar
            open={rightOpen}
            onClose={() => closeSidebar('right')}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          />
        </div>
        <EcoFooter onCloseSidebars={closeSidebars} />
      </div>
    </>
  );
}
