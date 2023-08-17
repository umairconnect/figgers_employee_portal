import React, { useState, useEffect } from "react";
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { Row, Col, Card, Progress} from "antd";

// styles

import './style.css';

import {
    CalendarOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
export default function MissedReadings(props) {


    const [missingReadingData, setMissingReadingData] = useState([]);

    const [userId] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [type] = useState("all");

    useEffect(() => {
        loadMissedReadings();
    }, [props.startDate, props.endDate]);

    function loadMissedReadings() {

        var params = {
            code: "gluco_missed_reading",
            parameters: [userId, props.startDate, props.endDate, type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setMissingReadingData(
                    result.data.map((item, i) => {
                        return {
                            year: item.t1
                        };
                    })
                );
            }
        })
    }

    return (
        <>
            <Card bordered={false} className="card missed-readings">
                <span className="card-title">Missed Readings</span>
                <span className="last-missed">Last 4 missed readings</span>
                <ul className="list-last-missed">
                    {
                        missingReadingData.map((item, i) => (
                            <li><CalendarOutlined /> {item.year} </li>
                        ))
                    }

                </ul>
                <span className="missed-reading-title">Missed reading include the day in which no readings were taken at all.</span>
                <ExclamationCircleOutlined />
            </Card>
            
        </>
    );
}

