// src/pages/Issues.js
import React, { useState, useContext, useEffect } from 'react';
import RecordModal from '../components/RecordModal';
import { Button, Table } from 'reactstrap';
import { Context } from '../context/apiContext';
const Issues = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const { issuesData, getIssues, addIssue, patchIssueData, deleteIssueData } =
        useContext(Context);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        getIssues();
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
            addIssue(formData);
        } else {
            patchIssueData(selectedRecordId, formData);
        }
    };
    return (
        <div>
            <h2>Issues Page</h2>
            <Button color="primary" onClick={handleAddRecord} className="mb-3">
                Add Record
            </Button>
            <Table className="table">
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Issue Description</th>
                        <th>Issue Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issuesData &&
                        issuesData.map((x, i) => {
                            console.log(x);

                            return (
                                <tr key={i}>
                                    <td>{x.vehicle.model}</td>
                                    <td>{x.issue_description}</td>
                                    <td>
                                        {x.issue_type === 1 ? 'New' : 'Repair'}
                                    </td>
                                    <td>
                                        {x.status === 1
                                            ? 'Pending'
                                            : 'Resolved'}
                                    </td>
                                    <td>
                                        <Button
                                            color="warning"
                                            onClick={() =>
                                                handleEditRecord(
                                                    {
                                                        vehicle: x.vehicle.id,
                                                        issue_descriptiom:
                                                            x.issue_description,
                                                        issue_type:
                                                            x.issue_type,
                                                        status: x.status,
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
                                                deleteIssueData(x.id);
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
                pageType="issue"
            />
        </div>
    );
};

export default Issues;
