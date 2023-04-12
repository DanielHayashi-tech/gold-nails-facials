import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';

const DisplayServiceTrends = () => {
    const { getToken } = useAuth();

    const [servicesData, setServicesData] = useState({ data: [], serviceTypes: {} });
    const [isMounted, setIsMounted] = useState(false);

    const lineColors = [
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#FF8042',
        '#0088FE',
        '#FFBB28',
        '#FF8888',
      ];
      


    function transformData(data) {
        if (!Array.isArray(data)) {
            console.error('Fetched data is not an array:', data);
            return { data: [], serviceTypes: {} };
        }

        const uniqueDatesSet = new Set();
        const transformedData = [];
        const serviceTypes = {};

        data.forEach((item) => {
            uniqueDatesSet.add(item.date.slice(0, 10));
            serviceTypes[`service_type_${item.service_typeID}`] = item.service_type_description;
        });


        const uniqueDatesArray = Array.from(uniqueDatesSet).sort();


        uniqueDatesArray.forEach((date) => {
            const dateData = { date };
            data.forEach((item) => {
                if (item.date.slice(0, 10) === date) {
                    dateData[`service_type_${item.service_typeID}`] = item.count;
                }
            });
            transformedData.push(dateData);
        });

        return { data: transformedData, serviceTypes };
    }


    const fetchChartData = async () => {
        try {
            if (!getToken) {
                throw new Error('You must be logged in to view this page');
            }

            const token = await getToken();

            const response = await fetch('/api/admin/serviceTrends', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            const transformedData = transformData(data);
            setServicesData({ data: transformedData.data, serviceTypes: transformedData.serviceTypes });
            console.log(servicesData)
        } catch (error) {
            console.log(error);
            alert('Read the error message and try again, you got this :) ');
        }
    };

    useEffect(() => {
        setIsMounted(true);
        const fetchChart = async () => {
            const token = await getToken();
            if (token) {
                await fetchChartData();
            }
        };
        fetchChart();
        return () => setIsMounted(false);
    }, [getToken]);

    return (
        <>
            {isMounted && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={servicesData.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Iterate through unique service_typeIDs and create a Line for each one */}
                        {servicesData.data.length > 0 &&
                            Object.keys(servicesData.serviceTypes).map((key, index) => (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={lineColors[index % lineColors.length]}
                                    name={servicesData.serviceTypes[key]}
                                />
                                ))}
                    </LineChart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default DisplayServiceTrends;
