import React  from 'react'
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LoggedIn} from '.././utilities/auth'


export default function Navbarcomp() {


  const navigate = useNavigate()

  const handleLogout= (e) =>{
    e.preventDefault();
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  


  return (
    <>
        <Navbar bg="dark"  expand="sm" fixed="top"  >
          <Container>
            <Navbar.Brand href="home" className="text-white">Loop Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="home" className="text-white">Home</Nav.Link>
                {/* <Nav.Link href="login" className="text-white">Sign In</Nav.Link> */}

                {LoggedIn() ? (
                <>
                  <Nav.Link href="logout" onClick={handleLogout} className="text-white">Logout</Nav.Link>
                  <Nav.Link href="token" className="text-white">Test Token</Nav.Link>
                </>
                  
                ) : (
                  <Nav.Link href="login" className="text-white">Sign In</Nav.Link>
                )}
                  {/* <Nav.Link href="logout" onClick={handleLogout} className="text-white">Logout</Nav.Link>
                  <Nav.Link href="token" className="text-white">Test Token</Nav.Link> */}

                {/* <Nav.Link href="register" className="text-white">Sign Up</Nav.Link> */}
                <NavDropdown title="Dropdown" className="text-white" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" >Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}
