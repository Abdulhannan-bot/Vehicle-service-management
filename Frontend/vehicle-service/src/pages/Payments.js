import React, { useState, useContext, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import RecordModal from '../components/RecordModal';
import { Context } from '../context/apiContext';

const Payments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('Add'); // 'Add' or 'Edit'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const {
        getPayments,
        patchPaymentData,
        addPayment,
        deletePaymentData,
        paymentsData,
    } = useContext(Context);

    useEffect(() => {
        getPayments();
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
            addPayment(formData);
        } else {
            patchPaymentData(selectedRecordId, formData);
        }
    };

    return (
        <div>
            <h2>Payment Page</h2>
            <Button color="primary" onClick={handleAddRecord} className="mb-3">
                Add Record
            </Button>
            <Table striped>
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Amount Paid</th>
                        <th>Payment Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentsData &&
                        paymentsData.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td>{x.vehicle.model}</td>
                                    <td>{x.amount_paid}</td>
                                    <td>{x.payment_method}</td>
                                    <td>
                                        <Button
                                            color="warning"
                                            onClick={() =>
                                                handleEditRecord(
                                                    {
                                                        vehicle: x.vehicle.id,
                                                        amount_paid:
                                                            x.amount_paid,
                                                        payment_method:
                                                            x.payment_method,
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
                pageType="payment"
            />
        </div>
    );
};

export default Payments;
