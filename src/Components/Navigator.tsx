import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Navigator = () => {

const [isExpanded, setIsExpanded] = useState(false);

return (
<>
  <Navbar expanded={isExpanded} expand="lg" bg="dark" variant="dark" >
    <Navbar.Brand href="Weather"><div style={{'float':'left', 'paddingLeft':'15px'}}>My Weather Pad</div></Navbar.Brand>
    <Navbar.Toggle onClick={() => setIsExpanded(isExpanded === false ? true : false)} aria-controls="basic-navbar-nav" />
    <Navbar.Collapse  id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link href="/Weather" className="nav-link">Weather</Nav.Link>
            <Nav.Link href="/Favorite" className="nav-link" >Favorites</Nav.Link>
        </Nav>
        <div>&nbsp;</div>
    </Navbar.Collapse>
  </Navbar>
</>
)

}

export default Navigator;