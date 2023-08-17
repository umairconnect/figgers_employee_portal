import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { PostDataAPI } from '../../../Services/APIService';
import { GetUserInfo } from "../../../Services/GetUserInfo";


function OrderChart({ ...props }) {

    let user_info = JSON.parse(GetUserInfo());
    const [accountNumber] = useState(user_info.user.accountNumber);

    const [data, setData] = useState([]);

    const datatest = [
        {
            name: 'Jan',
            Internet: 100,
            Calls: 60,
            SMS: 450,
            Roaming: 30,
        },
        {
            name: 'Feb',
            Internet: 200,
            Calls: 500,
            SMS: 390,
            Roaming: 40,
        },
        {
            name: 'Mar',
            Internet: 330,
            Calls: 140,
            SMS: 420,
            Roaming: 50,
        },
        {
            name: 'Apr',
            Internet: 510,
            Calls: 400,
            SMS: 410,
            Roaming: 80,
        },

    ];

    const getShortMonthName = (fullMonthName) => {
        const date = new Date(Date.parse(`${fullMonthName} 1, 2000`));
        return date.toLocaleString("default", { month: "short" });
    }


    const loadUsageDetails = () => {
        var obj = {
            accountNumber: accountNumber
        };
        PostDataAPI("telispire/getAccountUsageDetails", obj, true).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data.reverse())
                setData(
                    result.data.map((item, i) => {
                        item.name = getShortMonthName(item.billCycleName.split('-')[0]) + " " + item.billCycleName.split('-')[1];

                        item.Calls = item.voiceMinutes;
                        item.Roaming = item.roamingMinutes;
                        item.Internet = item.internetUsage * 1024;
                        item.SMS = item.sMSMessages;
                        return { ...item }
                    }));
            } else {
            }
        })
    }




    const CustomDot = (props) => {
        const { cx, cy, fill } = props;

        return (
            <svg x={cx - 6} y={cy - 6} width={14} height={14}>
                <circle cx={6} cy={6} r={6} fill={fill} />
            </svg>
        );
    };

    const linearGradient = (
        <defs>
            <linearGradient id="internetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 73, 163, 1)" />
                <stop offset="100%" stopColor="rgba(0, 73, 163, 0)" />
            </linearGradient>
        </defs>
    );

    useEffect(() => {
        if (accountNumber > 0) {
            loadUsageDetails();
        }

    }, [])

    return (
        <>
            <ResponsiveContainer height={window.isMobileView ? 300 : 350} className="responsive-chart">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    {linearGradient}

                    <XAxis dataKey={"name"} stroke="#d2d2d2" strokeWidth={1} />
                    <YAxis stroke="#d2d2d2" strokeWidth={1} />
                    <Tooltip />
                    {/* 
                    <defs>
                        <linearGradient id="colorUv" x1="5" y1="0" x2="10" y2="1">
                            <stop offset={gradientOffset()} stopColor="#1356AA" stopOpacity={0.9} />
                            <stop offset={gradientOffset()} stopColor="#1356AA" stopOpacity={0.9} />
                        </linearGradient>
                    </defs> */}

                    <Area type="monotone" dataKey="Internet" stackId="1" stroke="#0049A3" fill="rgba(0, 73, 163, 1)" dot={<CustomDot fill="#014DA7" />} />
                    <Area type="monotone" dataKey="Calls" stackId="1" stroke="#0049A3" fill="rgba(6, 134, 216, 1)" dot={<CustomDot fill="#0686D8" />} />
                    <Area type="monotone" dataKey="SMS" stackId="1" stroke="#0049A3" fill="rgba(254, 152, 0, 1)" dot={<CustomDot fill="#D47838" />} />
                    <Area type="monotone" dataKey="Roaming" stackId="1" stroke="#0049A3" fill="rgba(132, 60, 159, 1)" dot={<CustomDot fill="#0686D8" />} />

                </AreaChart>
            </ResponsiveContainer>
        </>

    );

}
export default OrderChart
