import React,{ useState } from 'react'
import { Row, Col, Card, Space, Typography, Divider, Breadcrumb, Radio, Select, DatePicker, Progress, Form, Input, Button } from "antd";
import {
    CalendarOutlined,
    BellOutlined,
    ShoppingCartOutlined,
    InfoCircleOutlined,
    RedoOutlined,
    ExclamationCircleOutlined,
    RightOutlined,
    LeftOutlined,
    ClockCircleOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { GetUserInfo } from '../../../src/Services/GetUserInfo';

function Header({title,...props}) {
    const {Link}=Typography;

    const [reset, setReset] = useState(false);
    const [lastReading, setLastReading] = useState('Breakfast');

    const userdata = JSON.parse(GetUserInfo()).user;

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


    return (
        <div>
            <Row className="sub-header" align="middle">
                <Col span={3}>
                    <span className="sub-header-title">
                        {title}
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
                            {title==="Dashboard" ? 
                                <Breadcrumb.Item ><Link to="/app/dashboard">Dashboard</Link></Breadcrumb.Item>
                                :
                            title==="Settings" ?
                                <Breadcrumb.Item ><Link to="/app/settings">Settings</Link></Breadcrumb.Item>
                                :""
                            }
                        </Breadcrumb>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Header
