// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavbarComponent = () => {
    return (
        <Navbar color="light" light expand="md" className="p-3">
            <NavbarBrand tag={Link} to="/">
                Vehicle Service Management
            </NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/vehicle">
                        Vehicle Page
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/component">
                        Component Page
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/issues">
                        Issues Page
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/payments">
                        Payments Page
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavbarComponent;
