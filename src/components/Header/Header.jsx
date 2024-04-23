import { useState } from 'react'
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import './Header.css'; // Importe o arquivo CSS

function Header() {

  const [isLogin, setLogin] = useState(true)
  
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
        {
          isLogin ? (
            <>
              <Link to = "/Login">Login</Link>
              <Link to = "/Cadastro">Registrar</Link>
            </>
          ) : (
            <Link to = "/Perfil">Perfil</Link>
          )
        }
      </nav>
    </header>
  );
}

export default Header;