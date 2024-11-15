// src/components/Layout.js
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './Siedebar';

const Layout = ({ children }) => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Content Area */}
            <div className="content flex-grow-1 p-3">{children}</div>
        </div>
    );
};

export default Layout;
