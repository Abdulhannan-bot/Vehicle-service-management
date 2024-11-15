// src/pages/Issues.js
import React from 'react';
import RecordModal from '../components/RecordModal';
const Issues = () => {
    return (
        <div>
            <h2>Issues Page</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Engine Overheating</td>
                        <td>Open</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Battery Failure</td>
                        <td>Resolved</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Issues;
