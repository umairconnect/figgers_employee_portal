import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import { PostDataAPI } from '../../../Services/APIService';
import { GetUserInfo } from "../../../Services/GetUserInfo";

const ApplicantChart = () => {

    let user_info = JSON.parse(GetUserInfo());

    const [accountNumber] = useState(user_info.user.accountNumber);



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


    const getShortMonthName = (fullMonthName) => {
        const date = new Date(Date.parse(`${fullMonthName} 1, 2000`));
        return date.toLocaleString("default", { month: "short" });
    }

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
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip formatter={formatNumber} />
                <Legend />
                <Bar dataKey="Devices" fill="#9F97F1" />
                <Bar dataKey="SIMS" fill="#F091E3" />
                <Bar dataKey="Plans" fill="#F7D385" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ApplicantChart;