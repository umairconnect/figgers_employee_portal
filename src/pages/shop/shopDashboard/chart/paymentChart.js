import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDateByFormate } from "../../../../components/Common/Extensions.js";
import { PostDataAPI } from "../../../../Services/APIService";

const OrderChart = () => {

    const [paymentData, setPaymentData] = useState([]);

    


    const loadPayments = () => {
        var params = {
            code: "get_payment_detail",
            parameters: ['']
        };
        PostDataAPI("ddl/GetPaymentDetail", params).then((result) => {
            if (result.success && result.data != null) {
                // setPaymentData(() => {
                //     return processData(result.data);
                // });
            }
        })
    }


    const getShortMonthName = (fullMonthName) => {
        const date = new Date(Date.parse(`${fullMonthName} 1, 2000`));
        return date.toLocaleString("default", { month: "short" });
    }

    const processData = (data) => {
        const processedData = {};


        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); 

        for (let i = 5; i >= 0; i--) {
            const targetMonth = (currentMonth - i + 12) % 12; 

            const monthAbbreviation = (new Date(0, targetMonth)).toLocaleString('default', { month: 'long' });

            processedData[monthAbbreviation] = { name: getShortMonthName(monthAbbreviation), Pending: 0, Recieved: 0, Declined: 0 };
        }

        data.forEach((item) => {
            const { t1: status, t2: amount, t3: month } = item;

            if (month in processedData) {
                if (!processedData[month]) {
                    processedData[month] = { name: getShortMonthName(month), Pending: 0, Recieved: 0, Declined: 0 };
                }

                if (status === 'Pending') {
                    processedData[month].Pending += parseFloat(amount);
                } else if (status === 'Recieved') {
                    processedData[month].Recieved += parseFloat(amount);
                } else if (status === 'Declined') {
                    processedData[month].Declined += parseFloat(amount);
                }
            }
        });

        return Object.values(processedData);
    };



    const formatNumber = (value) => {
        // Format the value with comma separators
        const formattedValue = value.toLocaleString();

        return formattedValue;
    };



    useEffect(() => {
        loadPayments();
    }, [])


    return (

        <ResponsiveContainer width="95%" height={window.isMobileView ? 300 : 346} className="responsive-chart">
            <BarChart height={window.isMobileView ? 310 : 350} data={paymentData}>

                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip formatter={formatNumber} />
                <Legend />
                <Bar dataKey="Recieved" fill="#65E972" />
                <Bar dataKey="Pending" fill="#FFB13D" />
                <Bar dataKey="Declined" fill="#F56C6C" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderChart;