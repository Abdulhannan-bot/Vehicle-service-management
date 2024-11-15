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
    const [formData, setFormData] = useState({
        model: '',
        registration_number: '',
        owner_name: '',
        issue_type: 1, // default value for dropdown (1: "new component")
        repair_cost: '',
        is_repaired: false,
        name: '',
        component_type: 1, // default value (1: "new")
        purchase_price: '',
        repair_price: '',
        vehicle: '',
        issue_description: '',
        status: 1, // default value for status (1: "pending")
    });

    useEffect(() => {
        if (record) {
            setFormData(record); // prefill form for edit
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
        onSubmit(formData);
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
                        <Label for="is_repaired">Is Repaired?</Label>
                        <Input
                            type="checkbox"
                            id="is_repaired"
                            name="is_repaired"
                            checked={formData.is_repaired}
                            onChange={handleCheckboxChange}
                        />
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
                        <Label for="vehicle">Vehicle</Label>
                        <Input
                            type="text"
                            name="vehicle"
                            id="vehicle"
                            value={formData.vehicle}
                            onChange={handleChange}
                        />
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
