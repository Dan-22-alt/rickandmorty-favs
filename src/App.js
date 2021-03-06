import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import Routes from './Routes';

function App() {
  return (
    <div>
      <div className="nav-bar">
        <NavLink className="link" activeClassName="active" to="/inicio">
          Inicio
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/favs">
          Favoritos
        </NavLink>
        <NavLink className="link" activeClassName="active"  to="/rickandmorty-favs">
          Login
        </NavLink>
      </div>
      <Routes />
    </div>
  );
}

export default App;
