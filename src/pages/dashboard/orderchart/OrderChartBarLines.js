import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import { PostDataAPI } from '../../../Services/APIService';
import { GetUserInfo } from "../../../Services/GetUserInfo";

const OrderChartBar = () => {

    let user_info = JSON.parse(GetUserInfo());

    const [accountNumber] = useState(user_info.user.accountNumber);

    const [data, setData] = useState([]);
    const [topOrders, setTopOrders] = useState([]);


    const getShortMonthName = (fullMonthName) => {
        const date = new Date(Date.parse(`${fullMonthName} 1, 2000`));
        return date.toLocaleString("default", { month: "short" });
    }

    const formatNumber = (value) => {
        // Format the value with comma separators
        const formattedValue = value.toLocaleString();

        return formattedValue;
    };
    
  
    const loadUsageDetails = () => {
        var obj = {
            accountNumber: accountNumber
        };
        PostDataAPI("telispire/getAccountUsageDetails", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setData(
                    result.data.map((item, i) => {
                        item.name = getShortMonthName(item.billCycleName.split('-')[0]) + " " + item.billCycleName.split('-')[1];
                        item.Calls = item.voiceMinutes;
                        item.International = item.roamingMinutes;
                        item.Internet = item.internetUsage * 1024;
                        item.SMS = item.sMSMessages;
                        return { ...item }
                    }));
            } else {
            }
        })
    }

    //for changing the top orders data into the correct format
    const processData = (data) => {
        const categorizedData = {};

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

    
        for (let i = 5; i >= 0; i--) {
            const targetMonth = (currentMonth - i + 12) % 12; 

            const monthAbbreviation = (new Date(0, targetMonth)).toLocaleString('default', { month: 'short' });

            categorizedData[monthAbbreviation] = { Plans: 0, Device: 0, SIMS: 0, 'Gift Card': 0 };
        }

        data.forEach(entry => {
            const month = entry.t1.slice(0, 3);
            const product = entry.t3;
            const quantity = parseInt(entry.t2);

            if (month in categorizedData && product in categorizedData[month]) {
                categorizedData[month][product] += quantity;
            }
        });

        const result = Object.keys(categorizedData).map(month => ({
            name: month,
            ...categorizedData[month],
        }));

        return result;
    };



    const loadTopOrders = () => {
        var params = {
            code: "get_top_orders",
            parameters : ['']
        };
        PostDataAPI("ddl/GetTopOrders", params).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data)
                setTopOrders(() => {
                    return processData(result.data);
                });
                
            }
        })
    }


    useEffect(() => {
        if (accountNumber > 0) {
            loadUsageDetails();
        }
        loadTopOrders();

    }, [])


    return (

        <ResponsiveContainer width="95%" height={window.isMobileView ? 300 : 350} className="responsive-chart">
            <BarChart height={window.isMobileView ? 310 : 350} data={topOrders}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip formatter={formatNumber} />
                <Legend />
                <Bar dataKey="Gift Card" fill="#0049A3" />
                <Bar dataKey="Device" fill="#0686D8" />
                <Bar dataKey="SIMS" fill="#D47838" />
                <Bar dataKey="Plans" fill="#843C9F" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderChartBar;