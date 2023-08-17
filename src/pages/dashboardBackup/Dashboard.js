import React, { useState, useEffect } from "react";
import { Row, Col, Card, Space, Typography, Divider, Breadcrumb, Radio, Select, DatePicker, Progress, Form, Input, Button } from "antd";
import moment from 'moment';
import 'moment/locale/en-au';
import { PostDataAPI } from '../../Services/APIService';
// styles

import './style.css';

import {
    CalendarOutlined,
    BellOutlined,
    ShoppingCartOutlined,
    InfoCircleOutlined,
    RedoOutlined,
    ExclamationCircleOutlined,
    RightOutlined,
    LeftOutlined,
    CloseOutlined
} from '@ant-design/icons';
import InjIcon from '../../images/icons/inj.png';
import ShoeIcon from '../../images/icons/shoe.png';
import SprIcon from '../../images/icons/spr.png';

import Recent10ReadingsAverage from './components/recent10ReadingsAverage/Recent10ReadingsAverage';
import TestReadingsAverage from './components/testReadingsAverage/TestReadingsAverage';
import Recent10Readings from './components/recent10Readings/Recent10Readings';
import TotalReadings from './components/totalReadings/TotalReadings';
import HighestReadings from './components/highestReadings/HighestReadings';
import LowestReadings from './components/lowestReadings/LowestReadings';
import LatestReadings from './components/latestReadings/LatestReadings';
import MissedReadings from './components/missedReadings/MissedReadings';
import RecentReadingsMeals from './components/recentReadingsMeals/RecentReadingsMeals';


import { GetUserInfo } from '../../../src/Services/GetUserInfo';


export default function Dashboard(props) {
    const [reset, setReset] = useState(false);
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YYYY'];
    const [recordCount, setRecordCount] = useState(0);
    const [recordLowestCount, setRecordLowestCount] = useState(0);
    const [timeValue, setTimeValue] = useState('All Times');
    const [filterDateValue, setFilterDateValue] = useState('1Year');
    const [defualtDateValue, setDefualtDateValue] = useState('1Year');
    const [startEndDate, setStartEndDate] = useState({
        start: moment().subtract(1, 'year').format('MMM DD, YYYY'),
        end: moment().subtract(0, 'month').format('MMM DD, YYYY')
    });
    const [disabledDate, setDisabledDate] = useState(false);

    const [disabledMealTime, setDisabledMealTime] = useState(false);

    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [type, setType] = useState("All Times");
    const [recentActivitiesData, setRecentActivitiesData] = useState([]);
    const [maxReadingData, setMaxReadingData] = useState(0);
    const [minReadingData, setMinReadingData] = useState(0);

 
    const userdata = JSON.parse(GetUserInfo()).user;

    let lastLoginDate = "";
    let lastLoginTime = "";

    if (userdata.lastLoginTime != null && userdata.lastLoginTime != "") {
        let lastLoginDateTime = userdata.lastLoginTime.split(' ');
        lastLoginDate = new Date(lastLoginDateTime[0]).toDateString();

        lastLoginTime = new Date('1970-01-01T' + lastLoginDateTime[1] + 'Z')
            .toLocaleTimeString({},
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );
    }

    let lastReadingDate = "";
    let lastReadingTime = "";

    if (userdata.lastReading != null && userdata.lastReading != "") {
        let lastReadingDateTime = userdata.lastReading.split(' ');

        lastReadingDate = new Date(lastReadingDateTime[0]).toDateString();

        lastReadingTime = new Date('1970-01-01T' + lastReadingDateTime[1] + 'Z')
            .toLocaleTimeString({},
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );

        userdata.lastReading = lastReadingDate + ' ' + lastReadingTime;
    }
    

    var nextReadingDate = "";
    var nextReadingTime = "";

    if (userdata.nextReadingDate != null && userdata.nextReadingDate != "") {

        nextReadingDate = new Date(userdata.nextReadingDate).toDateString();

        if (userdata.nextReadingTime != null && userdata.nextReadingTime != "") {

            nextReadingTime = new Date('1970-01-01T' + userdata.nextReadingTime + 'Z')
                .toLocaleTimeString({},
                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );

            userdata.nextReadingDate = nextReadingDate + ' ' + nextReadingTime;
        }
    }

    const timeChange = (label) => {
        setTimeValue(label);
        setType(label)
        if (label == "All Times" || label == undefined) {
            setDisabledMealTime(false)
        } else {
            setDisabledMealTime(true)
        }

    }
    const dateChange = (e) => {
        let dateChangeValue = e.target.value;
        setDefualtDateValue(dateChangeValue)
        setFilterDateValue(dateChangeValue);
        setDisabledDate(false)
        if (dateChangeValue == '1Week') {
            setStartEndDate({
                start: moment().subtract(7, 'days').format('MMM DD, YYYY'),
                end: moment().subtract(0, 'days').format('MMM DD, YYYY')
            })
        } else if (dateChangeValue == '1Month') {
            setStartEndDate({
                start: moment().subtract(1, 'month').format('MMM DD, YYYY'),
                end: moment().subtract(0, 'month').format('MMM DD, YYYY')
            })
        } else if (dateChangeValue == '3Months') {
            setStartEndDate({
                start: moment().subtract(3, 'month').format('MMM DD, YYYY'),
                end: moment().subtract(0, 'month').format('MMM DD, YYYY')
            })
        } else if (dateChangeValue == '1Year') {
            setStartEndDate({
                start: moment().subtract(1, "year").format('MMM DD, YYYY'),
                end: moment().subtract(0, 'month').format('MMM DD, YYYY')
            })
        }
       
    }
    const dateOnChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        let startDate = dateString[0];
        let endDate = dateString[1];
        let checkDate = moment(startDate).format('MMM DD, YYYY');
        if (checkDate != "Invalid date") {
            setStartEndDate({
                start: moment(startDate).format('MMM DD, YYYY'),
                end: moment(endDate).format('MMM DD, YYYY')
            })
            setDisabledDate(true)
            setDefualtDateValue("")
        } else {
            setStartEndDate({
                start: "Start Date",
                end: "End Date"
            })
            setDisabledDate(true)
            setDefualtDateValue("")
        }
    }


    useEffect(() => {
        loadRecentActivitiesReading();
        loadMaxAndMinReading();
    }, [startEndDate.start, startEndDate.end, type]);

    function loadRecentActivitiesReading() {

        let startDate = moment(startEndDate.start).format('MM/DD/YYYY');
        let endDate = moment(startEndDate.end).format('MM/DD/YYYY');

        var params = {
            code: "gluco_recent_activities",
            parameters: [userID, startDate, endDate, type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setRecentActivitiesData(
                    result.data.map((item, i) => {
                        return {
                            t1: item.t1, t2: parseInt(item.t2), t3: item.t3,
                            t4: parseInt(item.t4), t5: parseInt(item.t5),
                            t6: parseInt(item.t6)
                        };
                    }));

            }
        })
    }

    function loadMaxAndMinReading()
    {
        let startDate = moment(startEndDate.start).format('MM/DD/YYYY');
        let endDate = moment(startEndDate.end).format('MM/DD/YYYY');

        var params = {
            code: "gluco_maxAndmin_reading",
            parameters: [type, userID, startDate, endDate]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setMaxReadingData(parseInt(result.data[0].t1))
                setMinReadingData(parseInt(result.data[0].t2))
            }
        })
        
    }


    return (
        <>
            <Row className="sub-header" align="middle">
                <Col span={3}>
                    <span className="sub-header-title">
                        Dashboard
                    </span>

                </Col>
                <Col span={6}>
                    <span className="last-title">
                        {/*<CalendarOutlined /> Last Reading: <span>Monday, May 31, 2023 05:40 PM PKT</span>*/}
                        {/*<CalendarOutlined /> Last Reading: <span> {lastReadingDate + ' ' + lastReadingTime }  </span>*/}
                        <CalendarOutlined /> Last Reading: <span> {userdata.lastReading}  </span>
                    </span>
                </Col>
                <Col span={6}>
                    <span className="next-title">
                        {/*<BellOutlined />Next Reading: <span>{nextReadingDate + ' ' + nextReadingTime } </span>*/}
                        <BellOutlined />Next Reading: <span>{userdata.nextReadingDate} </span>
                    </span>
                </Col>
                <Col span={6} className="p-relative">
                    <Space className="group-btn" split={<Divider type="vertical" />}>
                        <Typography.Link><InfoCircleOutlined />Strips:11 Left</Typography.Link>
                        <Typography.Link onClick={() => setReset(true)}><RedoOutlined />Reset</Typography.Link>
                        <Typography.Link><ShoppingCartOutlined />Order Now</Typography.Link>

                    </Space>
                    {reset ?
                        (<div className="reset-box">
                            <div className="reset-box-header">Reset Strips <span className="reset-close" onClick={() => setReset(false)}><CloseOutlined /></span></div>
                            <Form layout="inline" className="reset-box-form">
                                <Form.Item name="price" label="Strip Count:" >
                                    <Input
                                        type="text"
                                        style={{ width: 78 }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={() => setReset(false)}>
                                        Reset
                  </Button>
                                </Form.Item>
                            </Form>
                        </div>)
                        : null}
                </Col>
                <Col span={3}>
                    <Row justify="end">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                </Col>
            </Row>

            <Row className="header-summary" align="middle">
                <Col span={7}>
                    <span className="header-summary-title">
                        Summary
            <span>See insights on how things are going</span>
                        <span className="date-to-all"><i>from {startEndDate.start} to {startEndDate.end} - <span>{timeValue}</span></i></span>
                    </span>

                </Col>
                <Col span={17} justify="end">
                    <Row justify="end">
                        <Select size="large" defaultValue="All Times" allowClear onChange={timeChange}>
                            <Option value="Fasting">Fasting</Option>
                            <Option value="Before Breakfast">Before Breakfast</Option>
                            <Option value="After Breakfast">After Breakfast</Option>
                            <Option value="Before Lunch">Before Lunch</Option>
                            <Option value="After Lunch">After Lunch</Option>
                            <Option value="Before Dinner">Before Dinner</Option>
                            <Option value="After Dinner">After Dinner</Option>
                            <Option value="Bed Time">Bed Time</Option>
                            <Option value="Random">Random</Option>
                            <Option value="All Times">All Times</Option>
                        </Select>
                        {disabledDate ?
                        <>
                        <Space className="header-summary-group-btn" split={<Divider type="vertical" />}>
                            <Radio.Group onChange={dateChange}  defaultChecked={disabledDate}>
                                <Radio.Button value="1Week"  >1 Week</Radio.Button>
                                <Radio.Button value="1Month"  >1 Month</Radio.Button>
                                <Radio.Button value="3Months" >3 Months</Radio.Button>
                                <Radio.Button value="1Year" >1 Year</Radio.Button>
                            </Radio.Group>
                           </Space></> :
                            <span>
                                 <Space className="header-summary-group-btn" split={<Divider type="vertical" />}>
                                    <Radio.Group onChange={dateChange}  defaultValue={defualtDateValue}>
                                        <Radio.Button value="1Week"  >1 Week</Radio.Button>
                                        <Radio.Button value="1Month"  >1 Month</Radio.Button>
                                        <Radio.Button value="3Months" >3 Months</Radio.Button>
                                        <Radio.Button value="1Year" >1 Year</Radio.Button>
                                    </Radio.Group></Space></span>
                           
                            }
                        

                        {
                            filterDateValue == "1Week" ?
                                <><RangePicker format={dateFormatList}  onChange={dateOnChange} defaultValue={[moment().subtract(7, 'days'), moment().subtract(0, 'days')]} /></> : ""}
                        {
                            filterDateValue == "1Month" ?
                                <span> <RangePicker format={dateFormatList}  onChange={dateOnChange} defaultValue={[moment().subtract(1, 'month'), moment().subtract(0, 'month')]} /></span> : ""}
                        {filterDateValue == "3Months" ?
                            <i><RangePicker format={dateFormatList}  onChange={dateOnChange} defaultValue={[moment().subtract(3, 'month'), moment().subtract(0, 'month')]} /></i> : ""}
                        {
                            filterDateValue == "1Year" ?
                                <RangePicker  format={dateFormatList}  onChange={dateOnChange} defaultValue={[moment().subtract(1, "year"), moment().subtract(0, 'month')]} /> : ""}
                    </Row>
                </Col>
            </Row>
            <div className="wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card bordered={false} className="card highest-readings">
                            <Row>
                                <Col span={12}>
                                    <span className="card-title">Highest Readings</span>
                                    <span className="highest-readings-number">{maxReadingData ? maxReadingData : ('-')}</span>
                                    <span className="highest-readings-sub-number">-mg/dl</span>
                                </Col>
                                <Col span={12}>
                                    <Row align="middle" justify="center"> <span className="last-r">{recordCount} Readings<br /></span></Row>
                                </Col>
                            </Row>
                            <Row>
                                <HighestReadings startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type} RecordCount={(recordCount) => setRecordCount(recordCount)} />
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} className="card lowest-readings">
                            <Row>
                                <Col span={12}>
                                    <span className="card-title">Lowest Readings</span>
                                    <span className="highest-readings-number">{minReadingData ? minReadingData : ('-')}</span>
                                    <span className="highest-readings-sub-number">-mg/dl</span>

                                </Col>
                                <Col span={12}>
                                    <Row align="middle" justify="center"> <span className="last-r">{recordLowestCount} Readings<br /> </span></Row>
                                </Col>
                            </Row>
                            <Row>
                                <LowestReadings startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type}  RecordLowestCount={(recordLowestCount) => setRecordLowestCount(recordLowestCount)} />
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <LatestReadings />
                    </Col>
                </Row>
            </div>
            <div className="wrapper">
                <Row gutter={16}>
                    <Col span={16}>
                        <Card bordered={false} className="card recent-10-readings">
                            <Row className="recent-10-readings-row">
                                <Col span={24}>
                                    <span className="card-title">Recent Readings</span>
                                </Col>
                                {/* <Col span={14}>
                                    <span className="reading2"><span className="reading-box very-high"></span> Very High</span>
                                    <span className="reading2"><span className="reading-box high"></span> High</span>
                                    <span className="reading2"><span className="reading-box normal"></span> Normal</span>
                                    <span className="reading2"><span className="reading-box low"></span> Low</span>
                                </Col> */}
                            </Row>
                            <Row>
                                <Recent10Readings startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type}  />
                            </Row>
                        </Card>

                    </Col>

                    <Col span={8}>
                         
                        <MissedReadings startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={timeValue} />

                        <Card bordered={false} className="card test-readings-average">
                            <Row>
                                <Col span={20}>
                                    <span className="card-title">Test Readings Average</span>
                                </Col>
                                <Col span={4}>
                                    <Row justify="center">
                                        <span className="reading-high"> High</span>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <TestReadingsAverage startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type}/>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="wrapper">
                <Row gutter={16}>
                    <Col span={16} className="p-relative">
                        <Card bordered={false} className="card recent-activities">
                            <span className="card-title">Recent Activities</span>
                            <span className="left-arrow">
                                <LeftOutlined />
                            </span>
                            <ul className="recent-activities-list">
                                {
                                    recentActivitiesData ?
                                        recentActivitiesData.map((item, i) => (

                                            <li>
                                                <div className="r-header">
                                                    <span className="r-number">{item.t2}</span>
                                                    <span className="r-mg">mg/dl</span>
                                                </div>
                                                <div className="r-time-table">{item.t1}</div>
                                                <div className="r-date-time-box">
                                                    <span className="r-date">{item.t3}</span>
                                                    <span className="r-time">01:20 pm</span>
                                                </div>
                                                {   item.t4 > 0 || item.t5 > 0 || item.t6 > 0 ?
                                                    <div className="r-status">
                                                        {item.t4 > 0 ? <span><img src={InjIcon} alt="Status" /></span> : null}
                                                        {item.t5 > 0 ? <span><img src={ShoeIcon} alt="Status" /></span> : null}
                                                        {item.t6 > 0 ? <span><img src={SprIcon} alt="Status" /></span> : null}
                                                    </div>
                                                    : null
                                                }
                                            </li>

                                        ))
                                        : null
                                }
                                {/* 
                                <li>
                                    <div className="r-header">
                                        <span className="r-number">200</span>
                                        <span className="r-mg">mg/dl</span>
                                    </div>
                                    <div className="r-time-table">After Lunch</div>
                                    <div className="r-date-time-box">
                                        <span className="r-date">Tuesday June 01,2023</span>
                                        <span className="r-time">02:20 pm</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="r-header">
                                        <span className="r-number r-high">290</span>
                                        <span className="r-mg r-high">mg/dl</span>
                                    </div>
                                    <div className="r-time-table">Before Dinner</div>
                                    <div className="r-date-time-box">
                                        <span className="r-date">Tuesday June 01,2023</span>
                                        <span className="r-time">09:20 pm</span>
                                    </div>
                                    <div className="r-status">
                                        <span><img src={InjIcon} alt="Status" /></span>
                                        <span><img src={SprIcon} alt="Status" /></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="r-header">
                                        <span className="r-number r-high">320</span>
                                        <span className="r-mg r-high">mg/dl</span>
                                    </div>
                                    <div className="r-time-table">After Dinner</div>
                                    <div className="r-date-time-box">
                                        <span className="r-date">Tuesday June 01,2023</span>
                                        <span className="r-time">10:40 pm</span>
                                    </div>
                                </li>
                                */}
                            </ul>
                            <span className="right-arrow">
                                <RightOutlined />
                            </span>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card bordered={false} className="card p-chart">

                            <Row>
                                <TotalReadings startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={timeValue} />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="wrapper">
                <Row gutter={16}>
                    <Col span={16}>
                        <Card bordered={false} className="card recent-10-readings-average">
                            <Row className="recent-10-readings-row">
                                <Col span={10}>
                                    <span className="card-title">Recent Readings Average</span>
                                </Col>
                                <Col span={14}>
                                    <span className="reading2"><span className="reading-box very-high"></span> Very High</span>
                                    <span className="reading2"><span className="reading-box high"></span> High</span>
                                    <span className="reading2"><span className="reading-box normal"></span> Normal</span>
                                    <span className="reading2"><span className="reading-box low"></span> Low</span>
                                </Col>
                            </Row>
                            <Row>
                                <Recent10ReadingsAverage startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type}/>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <RecentReadingsMeals startDate={moment(startEndDate.start).format('MM/DD/YYYY')} endDate={moment(startEndDate.end).format('MM/DD/YYYY')} type={type} userID={userID} disabledMealTime={disabledMealTime} />
                    </Col>
                </Row>
            </div>

        </>
    );
}

