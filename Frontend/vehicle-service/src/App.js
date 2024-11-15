// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from './components/Layout';
// import Vehicle from './pages/Vehicle.js';
// import ComponentPage from './pages/ComponentPage';
// import Issues from './pages/Issues';
import Layout from './components/Layout';
import Vehicle from './pages/Vehicles';
import ComponentPage from './pages/ComponentsPage';
import Issues from './pages/Issues';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/vehicle" element={<Vehicle />} />
                    <Route path="/component" element={<ComponentPage />} />
                    <Route path="/issues" element={<Issues />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
