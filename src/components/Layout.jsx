import { NavLink, Outlet, Link } from 'react-router-dom';

const links = [
  ['/', 'Overview'],
  ['/approach', 'Approach'],
  ['/shortlist', 'Shortlist'],
  ['/evidence', 'Evidence'],
];

export default function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-row">
          <Link to="/" className="brand">SupeRR Selector</Link>
          <nav className="nav" aria-label="Main">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-row">
          <span>SupeRR Selector · RR IPL 2027 auction analysis · Data: IPL and T20I ball-by-ball, 2022 onward</span>
          <span className="footer-links">
            <a href="#/evidence">Evidence and downloads</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">Repository</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
