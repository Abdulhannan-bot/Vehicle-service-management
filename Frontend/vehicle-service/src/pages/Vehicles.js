import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import RecordModal from '../components/RecordModal';

const Vehicle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

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
                    <tr>
                        <td>Model X</td>
                        <td>ABC-1234</td>
                        <td>John Doe</td>
                        <td>Engine</td>
                        <td>$500</td>
                        <td>No</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        model: 'Model X',
                                        registrationNumber: 'ABC-1234',
                                        ownerName: 'John Doe',
                                        issueType: 'Engine',
                                        repairCost: '$500',
                                        isRepaired: false,
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Model Y</td>
                        <td>XYZ-5678</td>
                        <td>Jane Smith</td>
                        <td>Brakes</td>
                        <td>$300</td>
                        <td>Yes</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        model: 'Model Y',
                                        registrationNumber: 'XYZ-5678',
                                        ownerName: 'Jane Smith',
                                        issueType: 'Brakes',
                                        repairCost: '$300',
                                        isRepaired: true,
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Model S</td>
                        <td>LMN-3456</td>
                        <td>Michael Johnson</td>
                        <td>Transmission</td>
                        <td>$1,200</td>
                        <td>No</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        model: 'Model S',
                                        registrationNumber: 'LMN-3456',
                                        ownerName: 'Michael Johnson',
                                        issueType: 'Transmission',
                                        repairCost: '$1,200',
                                        isRepaired: false,
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Model 3</td>
                        <td>DEF-7890</td>
                        <td>Emily Davis</td>
                        <td>Battery</td>
                        <td>$800</td>
                        <td>Yes</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        model: 'Model 3',
                                        registrationNumber: 'DEF-7890',
                                        ownerName: 'Emily Davis',
                                        issueType: 'Battery',
                                        repairCost: '$800',
                                        isRepaired: true,
                                    })
                                }
                                className="mr-2">
                                Edit
                            </Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Model Z</td>
                        <td>GHI-6543</td>
                        <td>Chris Brown</td>
                        <td>Suspension</td>
                        <td>$700</td>
                        <td>No</td>
                        <td>
                            <Button
                                color="warning"
                                onClick={() =>
                                    handleEditRecord({
                                        model: 'Model Z',
                                        registrationNumber: 'GHI-6543',
                                        ownerName: 'Chris Brown',
                                        issueType: 'Suspension',
                                        repairCost: '$700',
                                        isRepaired: false,
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

            {/* Render the RecordModal */}
            <RecordModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                record={selectedRecord}
                actionType={actionType}
                // onSubmit={handleSubmit}
                pageType="vehicle"
                // isOpen={isModalOpen}
                // toggle={toggleModal}
                // actionType={actionType}
                // selectedRecord={selectedRecord}
            />
        </div>
    );
};

export default Vehicle;
