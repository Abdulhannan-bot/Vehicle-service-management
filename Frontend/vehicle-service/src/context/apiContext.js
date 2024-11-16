import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

export const Context = createContext();

export const Provider = ({ children }) => {
    const [vehiclesData, setVehiclesData] = useState(null);
    const [issuesData, setIssuesData] = useState(null);
    const [componentsData, setComponentsData] = useState(null);
    const [paymentsData, setPaymentsData] = useState(null);

    const getPayments = () => {
        axios
            .get(`${BASE_URL}payments/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setPaymentsData(incomingData.data);
                }
            })
            .catch((err) => {});
    };

    const addPayment = (formData) => {
        axios
            .post(`${BASE_URL}payments/create/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getPayments();
                }
            })
            .catch((err) => {});
    };

    const patchPaymentData = (id, formData) => {
        axios
            .patch(`${BASE_URL}payments/edit/${id}/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getPayments();
                }
            })
            .catch((err) => {});
    };

    const deletePaymentData = (id) => {
        axios
            .delete(`${BASE_URL}components/delete/${id}/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getPayments();
                }
            })
            .catch((err) => {});
    };

    const getComponents = () => {
        axios
            .get(`${BASE_URL}components/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setComponentsData(incomingData.data);
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
            .patch(`${BASE_URL}components/edit/${id}/`, formData)
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
            .delete(`${BASE_URL}components/delete/${id}/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getComponents();
                }
            })
            .catch((err) => {});
    };

    const getIssues = () => {
        axios
            .get(`${BASE_URL}issues/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setIssuesData(incomingData.data);
                }
            })
            .catch((err) => {});
    };

    const addIssue = (formData) => {
        axios
            .post(`${BASE_URL}issues/create/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getIssues();
                }
            })
            .catch((err) => {});
    };

    const patchIssueData = (id, formData) => {
        axios
            .patch(`${BASE_URL}issues/update/${id}/`, formData)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getIssues();
                }
            })
            .catch((err) => {});
    };

    const deleteIssueData = (id) => {
        axios
            .delete(`${BASE_URL}issues/delete/${id}/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    getIssues();
                }
            })
            .catch((err) => {});
    };

    const getVehicles = () => {
        axios
            .get(`${BASE_URL}vehicles/`)
            .then((res) => {
                let incomingData = res.data;
                if (incomingData.success) {
                    setVehiclesData(incomingData.data);
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
            .patch(`${BASE_URL}vehicles/edit/${id}/`, formData)
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
            .delete(`${BASE_URL}vehicles/delete/${id}/`)
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
                issuesData,
                paymentsData,
                getPayments,
                addPayment,
                patchPaymentData,
                deletePaymentData,
                getIssues,
                addIssue,
                patchIssueData,
                deleteIssueData,
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
