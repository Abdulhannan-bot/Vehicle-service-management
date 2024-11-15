import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

export const Context = createContext();

export const Provider = ({ children }) => {
    const [vehiclesData, setVehiclesData] = useState(null);
    const [issuesData, setIssuesData] = useState(null);
    const [componentsData, setComponentsData] = useState(null);

    const getComponents = () => {
        axios
            .post(`${BASE_URL}components/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setComponentsData(res.data);
                }
            })
            .catch((err) => {});
    };

    const addComponent = (formData) => {
        axios
            .post(`${BASE_URL}components/create/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getComponents();
                }
            })
            .catch((err) => {});
    };

    const patchComponentData = (id, formData) => {
        axios
            .patch(`${BASE_URL}compenents/edit/${id}`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getComponents();
                }
            })
            .catch((err) => {});
    };

    const deleteComponentData = (id) => {
        axios
            .delete(`${BASE_URL}compenents/delete/${id}`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getComponents();
                }
            })
            .catch((err) => {});
    };

    const getVehicles = () => {
        axios
            .post(`${BASE_URL}vehicles/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setVehiclesData(res.data);
                }
            })
            .catch((err) => {});
    };

    const addVehicle = (formData) => {
        axios
            .post(`${BASE_URL}vehicles/create/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getVehicles();
                }
            })
            .catch((err) => {});
    };

    const patchVehicleData = (id, formData) => {
        axios
            .patch(`${BASE_URL}vehicles/edit/${id}`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getVehicles();
                }
            })
            .catch((err) => {});
    };

    const deleteVehicleData = (id) => {
        axios
            .delete(`${BASE_URL}vehicles/delete/${id}`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getVehicles();
                }
            })
            .catch((err) => {});
    };

    return (
        <Context.Provider
            value={{
                vehiclesData,
                componentsData,
                getVehicles,
                addVehicle,
                patchVehicleData,
                deleteVehicleData,
                getComponents,
                addComponent,
                patchComponentData,
                deleteComponentData,
            }}>
            {children}
        </Context.Provider>
    );
};
