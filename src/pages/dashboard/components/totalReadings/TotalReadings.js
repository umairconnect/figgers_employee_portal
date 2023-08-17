import React, { useState, useEffect } from "react";
import { Rose } from '@ant-design/charts';
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
// styles

import './style.css';


export default function TotalReadings(props) {

  
    const [data, setData] = useState([]);
    const [userId] = useState(JSON.parse(GetUserInfo()).user.userID);
    //const [startDate] = useState(props.startDate);
    //const [endDate] = useState(props.endDate);
   // const [type] = useState("all");
    const [total, setTotal] = useState(0);


    useEffect(() => {

        var params = {
            code: "gluco_user_reading_chart",
            parameters: [userId, props.startDate, props.endDate, props.type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
               
                var _total = parseInt(result.data[0].t1) + parseInt(result.data[0].t2) + parseInt(result.data[0].t3) + parseInt(result.data[0].t4);
                var _low = 0;
                var _normal = 0;
                var _high = 0;
                var _vhigh = 0;
                if (_total > 0) {
                    _low = Math.round(parseInt(result.data[0].t4));// / _total * 100);
                    _normal = Math.round(parseInt(result.data[0].t3));// / _total * 100);
                    _high = Math.round(parseInt(result.data[0].t2));// / _total * 100);
                    _vhigh = Math.round(parseInt(result.data[0].t1));// / _total * 100);
                }

                var arr = [
                    {
                        Reading: 'Low',
                        value: _low
                    },
                    {
                        Reading: 'Normal',
                        value: _normal,
                    },
                    {
                        Reading: 'High',
                        value: _high,
                    },
                    {
                        Reading: 'Very High',
                        value: _vhigh,
                    }]
                setData(arr);
                setTotal(_total);
            }
        })

    }, [props.startDate, props.endDate, props.type]);

    var config = {
        data: data,
        xField: 'Reading',
        yField: 'value',
        height: 260,
        seriesField: 'Reading',
        color: ({ Reading }) => {
            if (Reading === 'Low') {
                return '#1976D2';
            }
            else if (Reading === 'High') {
                return '#FFB22B';
            }
            else if (Reading === 'Very High') {
                return '#EF5350';
            }
            else if (Reading === 'Normal') {
                return '#1CADBF';
            }
        },
        legend: { position: 'start' },
        label: { offset: -15 },
        interactions: [{ type: 'element-active' }],
    };

    return (
        <div className="Recent10ReadingsAverageLineChart">
            <Rose   {...config} />
            <div className="total-number">
                <span>Total Readings {total}</span>
            </div>
        </div>
    );
}
