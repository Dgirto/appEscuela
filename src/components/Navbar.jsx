// src/components/Navbar.jsx
import { IconBirrete, IconSalir } from './Icons';

const Navbar = () => {
  return (
    <header className="app-navbar">
      <div className="app-container app-navbar__inner">
        <div className="app-navbar__brand">
          <span className="app-navbar__logo">
            <IconBirrete width={22} height={22} />
          </span>
          <div className="app-navbar__titles">
            <span className="app-navbar__title">Sistema de Matrícula</span>
            <span className="app-navbar__subtitle">SENATI</span>
          </div>
        </div>

        <button type="button" className="btn-nav" aria-label="Cerrar sesión">
          <IconSalir width={18} height={18} />
          <span className="btn-nav__text">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
