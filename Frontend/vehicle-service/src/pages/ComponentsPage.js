// src/pages/ComponentPage.js
import React, { useState, useContext } from 'react';
import RecordModal from '../components/RecordModal';
import { Button, Table } from 'reactstrap';
import { Context } from '../context/apiContext';
const ComponentPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const {} = useContext(Context);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = () => {};

    const handleAddRecord = () => {
        setActionType('Add');
        setSelectedRecord(null); // Clear the selected record for adding a new one
        toggleModal();
    };

    const handleEditRecord = (record) => {
        setActionType('Edit');
        setSelectedRecord(record); // Set the selected record for editing
        toggleModal();
    };

    return (
        <div>
            <h2>Component Page</h2>
            <Button color="primary" onClick={handleAddRecord} className="mb-3">
                Add Record
            </Button>
            <Table striped>
                <thead>
                    <tr>
                        <th>Component Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Engine</td>
                        <td>New</td>
                        <td>Resolved</td>
                        <td>$2,500</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Engine',
                                        type: 'New',
                                        status: 'Damaged',
                                        cost: '$2,500',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Battery</td>
                        <td>Repairl</td>
                        <td>Resolved</td>
                        <td>$800</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Battery',
                                        type: 'Repairl',
                                        status: 'Replaced',
                                        cost: '$800',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Brakes</td>
                        <td>New</td>
                        <td>Resolved</td>
                        <td>$300</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Brakes',
                                        type: 'New',
                                        status: 'Repaired',
                                        cost: '$300',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspension</td>
                        <td>New</td>
                        <td>Pending</td>
                        <td>$1,000</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Suspension',
                                        type: 'New',
                                        status: 'Under Maintenance',
                                        cost: '$1,000',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Transmission</td>
                        <td>New</td>
                        <td>Pending</td>
                        <td>$1,500</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Transmission',
                                        type: 'New',
                                        status: 'Damaged',
                                        cost: '$1,500',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>

                    <tr>
                        <td>Radiator</td>
                        <td>Repair</td>
                        <td>Repaired</td>
                        <td>$350</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Radiator',
                                        type: 'Cooling System',
                                        status: 'Repaired',
                                        cost: '$350',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Exhaust</td>
                        <td>New</td>
                        <td>Functional</td>
                        <td>$150</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        componentName: 'Exhaust',
                                        type: 'New',
                                        status: 'Functional',
                                        cost: '$150',
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <RecordModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                record={selectedRecord}
                actionType={actionType}
                onSubmit={handleSubmit}
                pageType="component"
                // isOpen={isModalOpen}
                // toggle={toggleModal}
                // actionType={actionType}
                // selectedRecord={selectedRecord}
            />
        </div>
    );
};

export default ComponentPage;
