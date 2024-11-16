import React, { useContext, useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    CardHeader,
    CardBody,
} from 'reactstrap';
import { Context } from '../context/apiContext';

export default function Dashboard() {
    const { dailyData, yearlyData, monthlyData, getRevenueData } =
        useContext(Context);

    useEffect(() => {
        getRevenueData();
    }, []);

    // Wait for data to be available
    if (!dailyData || !monthlyData || !yearlyData) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <Spinner color="primary" />
                        <p>Loading...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h2 className="text-center my-4">Revenue Dashboard</h2>
                </Col>
            </Row>

            {/* Daily Revenue */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card>
                        <CardHeader>Daily Revenue</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={[
                                        {
                                            name: dailyData.date,
                                            revenue: dailyData.revenue,
                                        },
                                    ]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Monthly and Yearly Revenue */}
            <Row className="mb-4">
                {/* Monthly Revenue */}
                <Col md={12} lg={6}>
                    <Card>
                        <CardHeader>Monthly Revenue</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={[
                                        {
                                            month: monthlyData.month,
                                            revenue: monthlyData.revenue,
                                        },
                                    ]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>

                {/* Yearly Revenue */}
                <Col md={12} lg={6}>
                    <Card>
                        <CardHeader>Yearly Revenue</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            {
                                                name: 'Yearly Revenue',
                                                value: yearlyData.revenue,
                                            },
                                        ]}
                                        dataKey="value"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label>
                                        <Cell key="0" fill="#82ca9d" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
