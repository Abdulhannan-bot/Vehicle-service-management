import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Label,
} from 'reactstrap';

const RecordModal = ({
    isOpen,
    toggle,
    record,
    actionType,
    onSubmit,
    pageType,
}) => {
    // const [formData, setFormData] = useState({
    //     model: '',
    //     registration_number: '',
    //     owner_name: '',
    //     issue_type: 1,
    //     repair_cost: '',
    //     is_repaired: false,
    //     name: '',
    //     component_type: 1,
    //     purchase_price: '',
    //     repair_price: '',
    //     vehicle: '',
    //     issue_description: '',
    //     status: 1,
    // });

    const getInitialState = (actionType) => {
        switch (actionType) {
            case 'vehicle':
                return {
                    model: '',
                    registration_number: '',
                    owner_name: '',
                    issue_type: 1,
                    repair_cost: '',
                    is_repaired: false,
                };
            case 'component':
                return {
                    name: '',
                    component_type: 1,
                    purchase_price: '',
                    repair_price: '',
                };
            case 'issue':
                return {
                    vehicle: '',
                    issue_description: '',
                    issue_type: 1,
                    status: 1,
                };
            case 'issue':
                return {
                    vehicle: '',
                    amount_paid: '',
                    payment_method: '',
                };
            default:
                return {};
        }
    };
    const [formData, setFormData] = useState(getInitialState(actionType));
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/vehicles/'
                );
                const data = await response.json();
                setVehicles(data.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        if (pageType === 'issue' || pageType === 'payment') {
            fetchVehicles();
        }
    }, [pageType]);

    useEffect(() => {
        if (record) {
            setFormData(record);
        }
    }, [record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = () => {
        onSubmit(formData, actionType);
        toggle();
    };

    const renderFields = () => {
        if (pageType === 'vehicle') {
            return (
                <>
                    <div className="form-group">
                        <Label for="model">Model</Label>
                        <Input
                            type="text"
                            name="model"
                            id="model"
                            value={formData.model}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="registration_number">
                            Registration Number
                        </Label>
                        <Input
                            type="text"
                            name="registration_number"
                            id="registration_number"
                            value={formData.registration_number}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="owner_name">Owner Name</Label>
                        <Input
                            type="text"
                            name="owner_name"
                            id="owner_name"
                            value={formData.owner_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="issue_type">Issue Type</Label>
                        <Input
                            type="select"
                            name="issue_type"
                            id="issue_type"
                            value={formData.issue_type}
                            onChange={handleChange}>
                            <option value={1}>New Component</option>
                            <option value={2}>Repair</option>
                        </Input>
                    </div>

                    <div className="form-group">
                        <Label for="repair_cost">Repair Cost</Label>
                        <Input
                            type="number"
                            name="repair_cost"
                            id="repair_cost"
                            value={formData.repair_cost}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="checkbox"
                            id="is_repaired"
                            name="is_repaired"
                            checked={formData.is_repaired}
                            onChange={handleCheckboxChange}
                        />
                        <Label for="is_repaired">Is Repaired?</Label>
                    </div>
                </>
            );
        } else if (pageType === 'component') {
            return (
                <>
                    <div className="form-group">
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="component_type">Component Type</Label>
                        <Input
                            type="select"
                            name="component_type"
                            id="component_type"
                            value={formData.component_type}
                            onChange={handleChange}>
                            <option value={1}>New</option>
                            <option value={2}>Repair</option>
                        </Input>
                    </div>

                    <div className="form-group">
                        <Label for="purchase_price">Purchase Price</Label>
                        <Input
                            type="number"
                            name="purchase_price"
                            id="purchase_price"
                            value={formData.purchase_price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="repair_price">Repair Price</Label>
                        <Input
                            type="number"
                            name="repair_price"
                            id="repair_price"
                            value={formData.repair_price}
                            onChange={handleChange}
                        />
                    </div>
                </>
            );
        } else if (pageType === 'issue') {
            return (
                <>
                    <div className="form-group">
                        <div className="form-group">
                            <Label for="vehicle">Vehicle</Label>
                            <Input
                                type="select"
                                name="vehicle"
                                id="vehicle"
                                value={formData.vehicle}
                                onChange={handleChange}>
                                <option value="">Select a Vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.model}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    </div>

                    <div className="form-group">
                        <Label for="issue_description">Issue Description</Label>
                        <Input
                            type="text"
                            name="issue_description"
                            id="issue_description"
                            value={formData.issue_description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <Label for="issue_type">Issue Type</Label>
                        <Input
                            type="select"
                            name="issue_type"
                            id="issue_type"
                            value={formData.issue_type}
                            onChange={handleChange}>
                            <option value={1}>New</option>
                            <option value={2}>Repair</option>
                        </Input>
                    </div>

                    <div className="form-group">
                        <Label for="status">Status</Label>
                        <Input
                            type="select"
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={handleChange}>
                            <option value={1}>Pending</option>
                            <option value={2}>Resolved</option>
                        </Input>
                    </div>
                </>
            );
        } else if (pageType === 'payment') {
            return (
                <>
                    <div className="form-group">
                        <div className="form-group">
                            <Label for="vehicle">Vehicle</Label>
                            <Input
                                type="select"
                                name="vehicle"
                                id="vehicle"
                                value={formData.vehicle}
                                onChange={handleChange}>
                                <option value="">Select a Vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.model}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    </div>
                    <div className="form-group">
                        <Label for="amount_paid">Amount Paid</Label>
                        <Input
                            type="number"
                            name="amount_paid"
                            id="amount_paid"
                            value={formData.amount_paid}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <Label for="payment_method">Payment Method</Label>
                        <Input
                            type="text"
                            name="payment_method"
                            id="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{actionType} Record</ModalHeader>
            <ModalBody>{renderFields()}</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    {actionType === 'Add' ? 'Add' : 'Save'}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RecordModal;
