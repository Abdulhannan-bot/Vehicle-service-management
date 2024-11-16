// src/components/Layout.js
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './Siedebar';
import NavbarComponent from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Sidebar */}
            <NavbarComponent />

            {/* Content Area */}
            <div className="container content flex-grow-1 p-3">{children}</div>
        </div>
    );
};

export default Layout;
