import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const OrderChart = () => {

    const datatest = [
        {
            name: 'Jan',
            Plans: 93,
            Devices: 130,
            SIMS: 30,
        },
        {
            name: 'Feb',
            Plans: 110,
            Devices: 100,
            SIMS: 90,
        },
        {
            name: 'Mar',
            Plans: 90,
            Devices: 110,
            SIMS: 20,
        },
        {
            name: 'Apr',
            Plans: 40,
            Devices: 70,
            SIMS: 80,
        },
        {
            name: 'May',
            Plans: 90,
            Devices: 80,
            SIMS: 95,
        },
        {
            name: 'Jun',
            Plans: 60,
            Devices: 130,
            SIMS: 70,

        },
    ];


    const formatNumber = (value) => {
        // Format the value with comma separators
        const formattedValue = value.toLocaleString();

        return formattedValue;
    };



    useEffect(() => {
       
    }, [])


    return (

        <ResponsiveContainer width="95%" height={window.isMobileView ? 300 : 350} className="responsive-chart">
            <BarChart height={window.isMobileView ? 310 : 350} data={datatest}>

                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip formatter={formatNumber} />
                <Legend />
                <Bar dataKey="Devices" fill="#0049A3" />
                <Bar dataKey="SIMS" fill="#FE9800" />
                <Bar dataKey="Plans" fill="#843C9F" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderChart;