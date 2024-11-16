import React, { useState, useContext, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import RecordModal from '../components/RecordModal';
import { Context } from '../context/apiContext';

const Vehicle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const {
        getVehicles,
        patchVehicleData,
        addVehicle,
        deleteVehicleData,
        vehiclesData,
    } = useContext(Context);

    useEffect(() => {
        getVehicles();
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleAddRecord = () => {
        setActionType('Add');
        setSelectedRecord(null); // Clear the selected record for adding a new one
        toggleModal();
    };

    const handleEditRecord = (record, id) => {
        setSelectedRecordId(id);
        setActionType('Edit');
        setSelectedRecord(record); // Set the selected record for editing
        toggleModal();
    };

    const handleSubmit = (formData) => {
        console.log(formData);

        if (actionType === 'Add') {
            addVehicle(formData);
        } else {
            patchVehicleData(selectedRecordId, formData);
        }
    };

    return (
        <div>
            <h2>Vehicle Page</h2>
            <Button color="primary" onClick={handleAddRecord} className="mb-3">
                Add Record
            </Button>
            <Table striped>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Registration Number</th>
                        <th>Owner Name</th>
                        <th>Issue Type</th>
                        <th>Repair Cost</th>
                        <th>Is Repaired?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiclesData &&
                        vehiclesData.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td>{x.model}</td>
                                    <td>{x.registration_number}</td>
                                    <td>{x.owner_name}</td>
                                    <td>
                                        {x.issue_type === 1 ? 'New' : 'Repair'}
                                    </td>
                                    <td>{x.repair_cost}</td>
                                    <td>{x.is_repaired ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Button
                                            color="warning"
                                            onClick={() =>
                                                handleEditRecord(
                                                    {
                                                        model: x.model,
                                                        registration_number:
                                                            x.registration_number,
                                                        owner_name:
                                                            x.owner_name,
                                                        issue_type:
                                                            x.issue_type,
                                                        repair_cost:
                                                            x.repair_cost,
                                                        is_repaired:
                                                            x.is_repaired,
                                                    },
                                                    x.id
                                                )
                                            }
                                            className="mr-2">
                                            Edit
                                        </Button>
                                        <Button color="danger">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>

            {/* Render the RecordModal */}
            <RecordModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                record={selectedRecord}
                actionType={actionType}
                onSubmit={handleSubmit}
                pageType="vehicle"
            />
        </div>
    );
};

export default Vehicle;
