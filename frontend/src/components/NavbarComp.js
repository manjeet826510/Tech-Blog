import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store';

const NavbarComp = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    // console.log(state);
    localStorage.removeItem("userInfo");
    // navigate('/signin');
    window.location.href = "/signin";
  };

  return (
    <Navbar className='' sticky="top"   bg="dark" variant="dark" expand="lg">
        <Container>
            <Link to="/" className="nav-link">
                <Navbar.Brand>Tech Blog</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
              <br/>

                <Nav className="me-auto w-100 justify-content-start">

                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </Nav>
              </Navbar.Collapse>

              <Navbar.Collapse>
                <Nav className="me-auto w-100 justify-content-end right-nav">

                  <Link to="/newpost" className="nav-link">
                    New Post
                  </Link>
                  
            

                    {userInfo ? (
                    <NavDropdown  title={<img src={userInfo.image } className='profile-pic'alt="Profile" />}  id="basic-nav-dropdown">
                   
  
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) 
                  : 
                  (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}

</Nav>

</Navbar.Collapse>
</Container>
    </Navbar>
  )
}

export default NavbarComp