// src/pages/ComponentPage.js
import React, { useState, useContext, useEffect } from 'react';
import RecordModal from '../components/RecordModal';
import { Button, Table } from 'reactstrap';
import { Context } from '../context/apiContext';
const ComponentPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const {
        getComponents,
        addComponent,
        componentsData,
        patchComponentData,
        deleteComponenetData,
    } = useContext(Context);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        getComponents();
    }, []);

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
            addComponent(formData);
        } else {
            patchComponentData(selectedRecordId, formData);
        }
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
                        <th>Purchase Price</th>
                        <th>Repair Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {componentsData &&
                        componentsData.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td>{x.name}</td>
                                    <td>
                                        {x.component_type === 1
                                            ? 'New'
                                            : 'Repair'}
                                    </td>
                                    <td>{x.purchase_price}</td>
                                    <td>{x.repair_price}</td>
                                    <td>
                                        <Button
                                            color="warning"
                                            onClick={() =>
                                                handleEditRecord(
                                                    {
                                                        name: x.name,
                                                        type:
                                                            x.component_type ===
                                                            1
                                                                ? 'New'
                                                                : 'Repair',
                                                        purchase_price:
                                                            x.purchase_price,
                                                        repair_price:
                                                            x.repair_price,
                                                    },
                                                    x.id
                                                )
                                            }
                                            className="mr-2">
                                            Edit
                                        </Button>
                                        <Button
                                            color="danger"
                                            onClick={() => {
                                                deleteComponenetData(x.id);
                                            }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <RecordModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                record={selectedRecord}
                actionType={actionType}
                onSubmit={handleSubmit}
                pageType="component"
            />
        </div>
    );
};

export default ComponentPage;
