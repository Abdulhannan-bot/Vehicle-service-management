// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Sidebar = () => {
    return (
        <div
            className="sidebar bg-light p-3"
            style={{ width: '250px', height: '100vh' }}>
            <h4>Navigation</h4>
            <Nav vertical>
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
            </Nav>
        </div>
    );
};

export default Sidebar;
