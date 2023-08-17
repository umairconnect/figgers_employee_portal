import React, { useState, useEffect } from "react";
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { Row, Col, Card, Progress} from "antd";

// styles

import './style.css';


export default function LatestReadings(props) {

    
    const [percentValue, setPercentValue] = useState(0);
    const [percentColor, setPercentColor] = useState('');
    const [percentStatus, setPercentStatus] = useState('');
    const [percentClass, setPercentClass] = useState('');

    const [highbpValue, setHighbpValue] = useState('');
    const [normalbpValue, setNormalbpValue] = useState('');
    const [lowbpValue, setLowbpValue] = useState('');

    const [userId] = useState(JSON.parse(GetUserInfo()).user.userID);

    useEffect(() => {
        loadHighestReading();
    }, []);

    function loadHighestReading() {

        var params = {
            code: "gluco_latest_reading",
            parameters: [userId]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setPercentValue(parseInt(result.data[0].t2));

                if (result.data[0].t2 > 0) {

                    if (result.data[0].t2 > 0 && result.data[0].t2 < 80 ) {
                        setPercentColor("#1976D2")
                        setPercentStatus("Low")
                        setPercentClass("low")
                    }
                    else if (result.data[0].t2 > 80 && result.data[0].t2 < 120) {
                        setPercentColor("#1CADBF")
                        setPercentStatus("Normal")
                        setPercentClass("normal")
                    }
                    else if (result.data[0].t2 > 120 && result.data[0].t2 < 240) {
                        setPercentColor("#FFB22B")
                        setPercentStatus("High")
                        setPercentClass("high")
                    }
                    else if(result.data[0].t2 > 240) {
                        setPercentColor("#EF5350")
                        setPercentStatus("Very High")
                        setPercentClass("very-high")
                    }
                }
            }
        })

        var params1 = {
            code: "gluco_latest_reading_tm",
            parameters: [userId]
        };

        PostDataAPI("ddl/loadItems", params1).then((result) => {

            if (result.success && result.data != null) {

                setHighbpValue(parseInt(result.data[0].t1));
                setNormalbpValue(parseInt(result.data[0].t2));
                setLowbpValue(parseInt(result.data[0].t3));
            }
        })
    }

    return (
        <>
            <Card bordered={false} className="card latest-reading">
                <span className="card-title">Latest Reading</span>
                <Row className="latest-reading-row">
                    <Col span={15}>
                        <Row align="middle" justify="center" className="p-relative">
                            <Progress className={percentClass} gapDegree={0} strokeLinecap="square" type="dashboard"
                                percent={percentValue}
                                strokeWidth={3}
                                width={180}
                                status='active'
                                strokeColor={percentColor }
                                trailColor={percentColor}
                                format={percent => `${percentValue} `} />
                            <span className="progress-text">
                                <span className="progress-text-mg">-mg/dl</span>
                                <span className="progress-text-low" style={{color:percentColor}}>{percentStatus} 
                                {percentStatus =="Low"? <>&#8595;</>:''}
                                {percentStatus =="High"? <>&#8593;</>:''}
                                {percentStatus =="Very High"? <>&#8593;</>:''}
                                </span>
                            </span>
                        </Row>
                    </Col>
                    <Col span={9}>
                        <Row align="middle" >

                            <span className="reading"><span className="reading-box very-high">&gt; {highbpValue}</span> Very High</span>
                            <span className="reading"><span className="reading-box high">{normalbpValue}-{highbpValue}</span> High</span>
                            <span className="reading"><span className="reading-box normal">{lowbpValue}-{normalbpValue}</span> Normal</span>
                            <span className="reading"><span className="reading-box low"> &lt; {lowbpValue}</span> Low</span>
                             
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

