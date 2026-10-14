// src/components/Navbar.jsx
import { IconSalir } from './Icons';
import logoSenati from '../assets/logo-senati-blanco.png';

const Navbar = () => {
  return (
    <header className="navbar-app">
      <div className="contenedor navbar-app__inner">
        <div className="navbar-app__marca">
          <img className="navbar-app__logo" src={logoSenati} alt="Logo SENATI" />
          <span className="navbar-app__titulo">
            Sistema de Matrícula <span className="navbar-app__sep">-</span>{' '}
            <span className="navbar-app__senati">SENATI</span>
          </span>
        </div>

        <button type="button" className="btn-salir">
          <IconSalir width={16} height={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
