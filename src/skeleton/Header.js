// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import'../css/navbar.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Breadcrumbs from './Breadcrumbs';

function Header() {
  return (
    <header >
      {/* <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PokeFind</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse nabar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className='nav-link' to="/">Home</NavLink>
                <NavLink className='nav-link' to="PokemonByLocation">Pokémon Encountered by Location</NavLink>
                <NavLink className='nav-link' to="search-pokemon-location">Find Pokemon's Location</NavLink>
            </div>v
          </div>
        </div>
      </nav> */}
  <Navbar expand="lg" className="bg-body-tertiary tertiary-color" data-bs-theme='dark'>
        <Container className="container col-lg-8">
          <Navbar.Brand href="/">Pokefind</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-evenly w-100">
              
              <NavLink className="nav-link" to="search-pokemon-location">Locate Pokemon</NavLink>
              <NavLink className="nav-link" to="pokemon-encountered-by-location">Encounter Map</NavLink>
              <NavLink className="nav-link" to="pokedex">Pokedex</NavLink>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Breadcrumbs></Breadcrumbs>
    </header>
    
  );
}

export default Header;