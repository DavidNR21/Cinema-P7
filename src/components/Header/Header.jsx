import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import './Header.css'; // Importe o arquivo CSS

function Header() {
  return (
    <header className="header">
      <span className="logo">Cinema Ticket</span>

      <input type="checkbox" id="check" />
      <label htmlFor="check" className="icons">
        <i className='bx bx-menu' id="menu-icon"></i>
        <i className='bx bx-x' id="close-icon"></i>
      </label>

      <nav className="navbar">
        <Link to = "/" >Filmes</Link>
        <Link to = "/Salas">Salas</Link>
        <Link to = "/Login">Login</Link>
        <Link to = "/Cadastro">Registrar</Link>
      </nav>
    </header>
  );
}

export default Header;