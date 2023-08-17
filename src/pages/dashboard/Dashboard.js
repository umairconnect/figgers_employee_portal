import React, { lazy, Suspense, useEffect, useState } from "react";
import {
    Grid, Button,
    CssBaseline,
    Box, AppBar,
    Toolbar, List,
    Typography, Divider,
    IconButton, Badge,
    Select, Paper,
    Link,
} from "@material-ui/core"
import { Tooltip, Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";
import useStyles from "./styles";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import figgLogo from './../../assets/img/figgerTransLogo.svg';
import OrderChart from './orderchart/OrderChartBarLines';
import BreadcrumComponent from "../../components/BreadCrums/breadcrums";
import OrderTrackingIcon from './../../assets/img/icons/orderTrackingIcon.svg';
import PackageExpiring from './../../assets/img/icons/packageExpiring.svg';
import figgersAcpReq from './../../assets/img/icons/figgersAcpReq.svg';
import DualSim from './../../assets/img/icons/dualSim.svg';
import AddIcon from '@material-ui/icons/Add';
import VideoIcon from "./../../assets/img/action/video-icon.svg";
import EnvelopeEmail from "./../../assets/img/action/email-icon.svg";
import CallIcon from "./../../assets/img/action/call-icon.svg";
import SmsIconText from "./../../assets/img/action/smsIcon.svg";
import ShowMoreIcon from "./../../assets/img/action/dotShowMore.svg";
import DashboardPhoneIco from './../../assets/img/icons/callColoredIcon.svg';
import DashboardEmailIco from './../../assets/img/icons/emailColoredIcon.svg';
import DashboardTextIco from './../../assets/img/icons/textColoredIcon.svg';
import profilePlaceholder from './../../assets/img/profilePlaceholder.jpg';
import CustomLabel from "./../../assets/img/icons/CustomLabel.svg";
import BusinessInquiries from "./../../assets/img/icons/BusinessInquiries.svg";
import ReviewReceived from "./../../assets/img/icons/ReviewReceived.svg";
import ChatMsgNotification from "./../../assets/img/icons/ChatMsgNotification.svg";
import ChatEmailNotification from "./../../assets/img/icons/ChatEmailNotification.svg";
import DashboardVideoMsg from "./../../assets/img/icons/DashboardVideoMsg.svg";
import DashboardCallMsg from "./../../assets/img/icons/DashboardCallMsg.svg";
import DashboardChatMsg from "./../../assets/img/icons/DashboardChatMsg.svg";
import { GetUserInfo } from '../../Services/GetUserInfo';
import { PostDataAPI } from '../../Services/APIService';
import { formatDate, formatTime, formateMdnNumber, numberDisplay, communicationFormatedDate, formatDateTime } from '../../../src/components/Common/Extensions';
import NoRecord from "../../components/NoRecord/NoRecord";
import { withSnackbar } from "../../components/Message/Alert";

import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';
function Dashboard({  ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [filters, setFilters] = useState({
        callFilter: 'All',
        chatFilter: 'All',
        emailFilter: 'All',
        textFilter: 'All',
        communicationDateFilter: 'Today',
        activityLogFilter: 'Today',

    });
    const [chatList, setChatList] = useState([]);
    const [callsList, setCallsList] = useState([]);
    const [textList, setTextList] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [trackingList, setTrackingList] = useState([]);
    const [reviewRecieved, setReviewRecieved] = useState([]);
    const [activityLog, setActivityLog] = useState([]);
    
    const daysFilter = [
        {
            value: 'Today',
            label: 'Today'
        },

        {
            value: 'This Week',
            label: 'This Week'
        },
        {
            value: 'This Month',
            label: 'This Month'
        },

    ]
    const commFilters = [
        {
            value: 'All',
            label: 'All'
        },
        {
            value: 'Support',
            label: 'Sent'
        },
        {
            value: 'Customer',
            label: 'Received'
        }
    ]
    const [state, setState] = useState();

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (name == 'callFilter') {
            loadDashboardCalls(value, filters.communicationDateFilter);
        } else if (name == 'chatFilter') {
            loadDashboardChats(value, filters.communicationDateFilter);
        } else if (name == 'emailFilter') {
            loadDashboardEmails(value, filters.communicationDateFilter);
        } else if (name == 'communicationDateFilter') {
            loadCommunicationGedgets(value);
        } else if (name == 'activityLogFilter') {
            LoadActivityLog(value);
        }
    }

    const getFromDate = (_filters) => {
        const today = new Date();
        var fromDate = today;
        var toDate = today;
        if (_filters == 'This Week') {
            fromDate = startOfWeek(today, { weekStartsOn: 1 });
        } else if (_filters == 'This Month') {
            fromDate = startOfMonth(today);
        }
        return fromDate;
    }
    const getToDate = (_filter) => {
        const today = new Date();
        var toDate = today;
        if (filters.communicationDateFilter == 'This Week') {
            toDate = endOfWeek(today, { weekStartsOn: 1 });
        } else if (filters.communicationDateFilter == 'This Month') {
            toDate = endOfMonth(today);
        }
        return toDate;
    }

    const loadDashboardCalls = (_filter, _comDateFilter) => {
        var fromDate = getFromDate(_comDateFilter);
        var toDate = getToDate(_comDateFilter);
        var obj = { UserId: userID, filter: _filter, fromDate: fromDate, toDate: toDate };
        PostDataAPI("dashboard/loadDashboardCalls", obj, true).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                setCallsList(result.data);
            } else {
                setCallsList([]);
            }
        })

    }

    const loadDashboardChats = (_filter, _comDateFilter) => {
        var fromDate = getFromDate(_comDateFilter);
        var toDate = getToDate(_comDateFilter);
        var obj = { UserId: userID, filter: _filter, fromDate: fromDate, toDate: toDate };
        PostDataAPI("dashboard/loadDashboardChat", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setChatList(result.data);
            } else {
                setChatList([]);
            }
        })

    }

    const loadDashboardText = (_filter, _comDateFilter) => {
        var fromDate = getFromDate(_comDateFilter);
        var toDate = getToDate(_comDateFilter);
        var obj = { UserId: userID, filter: _filter, fromDate: fromDate, toDate: toDate };
        PostDataAPI("dashboard/loadDashboardText", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setTextList(result.data);
            } else {
                setTextList([]);
            }
        })

    }

    const loadDashboardEmails = (_filter, _comDateFilter) => {
        var fromDate = getFromDate(_comDateFilter);
        var toDate = getToDate(_comDateFilter);
        var obj = { UserId: userID, filter: filters.emailFilter, fromDate: fromDate, toDate: toDate };
        PostDataAPI("dashboard/loadDashboardEmails", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setEmailList(result.data);
            } else {
                setEmailList([]);
            }
        })

    }

    const loadDashboardShipmentAndTracking = () => {
        var obj = { UserId: userID };
        PostDataAPI("dashboard/loadDashboardShipmentAndTracking", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setTrackingList(result.data);
            } else {
                setTrackingList([]);
            }
        })

    }

    const loadReviewsRecieved = () => {
        var obj = { UserId: userID };
        PostDataAPI("dashboard/loadReviewRecieved", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setReviewRecieved(result.data);
            } else {
                setReviewRecieved([]);
            }
        })

    }

    const LoadActivityLog = (_filter) => {
        var method = "dashboard/loadDashboardActivityLog";
        var fromDate = getFromDate(_filter);
        var toDate = getToDate(_filter);
        var obj = { UserId: userID, fromDate: fromDate, toDate: toDate}
        PostDataAPI(method, obj, true).then((result) => {
            console.log(result.data);
            if (result.success && result.data != null) {
                setActivityLog(
                    result.data.map((item, i) => {
                        item.accountNumber = item.customer;
                        item.activityDate = formatDateTime(item.createDate);
                        item.mdnNumber = formateMdnNumber(item.entityId);
                        return { ...item }
                    }));
            }
        })

    }


    const loadCommunicationGedgets = (_comDateFilter) => {
        loadDashboardCalls(filters.callFilter, _comDateFilter);
        loadDashboardChats(filters.chatFilter, _comDateFilter);
        loadDashboardEmails(filters.emailFilter, _comDateFilter);
    }

    const handleCommChatCLick = () => {
        showMessage("Warning", "Feature comming soon", "warning", 3000);
    }

    const handleCommVideoCLick = () => {
        showMessage("Warning", "Feature comming soon", "warning", 3000);
    }
    const handleCommCallCLick = () => {
        showMessage("Warning", "Feature comming soon", "warning", 3000);
    }

    useEffect(() => {
        loadCommunicationGedgets(filters.communicationDateFilter);
        loadDashboardShipmentAndTracking();
        LoadActivityLog(filters.activityLogFilter);
        loadReviewsRecieved();
    }, []);

    return (
        <>
            <div className={classes.appBarSpacer} />
            <div className={classes.header}>
                {/* <h1>WELCOME BACK!</h1> */}

                <BreadcrumComponent parentLink="Dashboard" ></BreadcrumComponent>


                <div className={classes.rightHeader}>
                    {window.forMobileView ?
                        <h2> Friday , January 13, 2023 | 11:38 AM <span className="greyText"> Last Login: Thursday January 12, 2023 | 05:30 PM</span></h2>
                        : ''}
                </div>
            </div>

            <Grid className={classes.container}>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={3} lg={3} sm={12}>
                        <NavLink to="/app/domesticTracking">
                            <Paper className={classes.orderTrackingBox}>
                                <Grid row container className={classes.topContent}>
                                    <Grid item xs={12} md={9} lg={9} sm={9}><h3>Shipping & <br></br>Tracking</h3> </Grid>
                                    <Grid item xs={12} md={3} lg={3} sm={3} className="textRight"> <img src={OrderTrackingIcon} /></Grid>
                                </Grid>

                                <Grid row container className={classes.bottomActions}>
                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.actionContent}>
                                            <div>
                                                <p>Confirmed</p>
                                                <h3>{trackingList?.filter(t =>  t.status == 'M').length}</h3>
                                            </div>
                                            <div>
                                                <p>Shipped</p>
                                                <h3>{trackingList?.filter(t => t.status == 'P').length}</h3>
                                            </div>
                                            <div>
                                                <p>In Transit</p>
                                                <h3>{trackingList?.filter(t => t.status == 'I').length}</h3>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.greyCurveBg} />
                                        <div className={classes.curveContent}>
                                            <p className={classes.actionInfo}>10 % <ArrowUpwardIcon /></p>
                                            <p className={classes.actionInforGrey}>This Week</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </NavLink>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={12}>
                        <NavLink to="/app/packageExpiration">
                            <Paper className={classes.packageExpiringBox}>
                                <Grid row container className={classes.topContent}>
                                    <Grid item xs={12} md={9} lg={9} sm={9}><h3>Package <br></br>Expiration</h3> </Grid>
                                    <Grid item xs={12} md={3} lg={3} sm={3} className="textRight"> <img src={PackageExpiring} /></Grid>
                                </Grid>
                                <Grid row container className={classes.bottomActions}>
                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.actionContent}>
                                            <div>
                                                <p> &gt; 15 Days</p>
                                                <h3 style={{ color: '#A1F0A9' }}>20</h3>
                                            </div>
                                            <div>
                                                <p>7-15 Days</p>
                                                <h3 style={{ color: '#FBD293' }}>10</h3>
                                            </div>
                                            <div>
                                                <p> 7 Days</p>
                                                <h3 style={{ color: '#B30F0F' }}>20</h3>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.greyCurveBg} />
                                        <div className={classes.curveContent}>
                                            <p className={classes.actionInfo}>5 % <ArrowUpwardIcon /></p>
                                            <p className={classes.actionInforGrey}>This Week</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </NavLink>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={12}>
                        <NavLink to="/app/figgerACP">
                            <Paper className={classes.figgerACPReuqests}>
                                <Grid row container className={classes.topContent}>
                                    <Grid item xs={12} md={9} lg={9} sm={9}><h3>Figgers ACP <br></br>Requests</h3> </Grid>
                                    <Grid item xs={12} md={3} lg={3} sm={3} className="textRight"> <img style={{ width: '64px' }} src={figgersAcpReq} /></Grid>
                                </Grid>
                                <Grid row container className={classes.bottomActions}>
                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.actionContent}>
                                            <div>
                                                <p>Submitted</p>
                                                <h3 style={{ color: '#0686D8' }}>02</h3>
                                            </div>
                                            <div>
                                                <p>NV Pending</p>
                                                <h3 style={{ color: '#FBD293' }}>20</h3>
                                            </div>
                                            <div>
                                                <p>Eligible</p>
                                                <h3 style={{ color: '#068B14' }}>20</h3>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.greyCurveBg} />
                                        <div className={classes.curveContent}>
                                            <p className={classes.actionInfo}>15 % <ArrowUpwardIcon /></p>
                                            <p className={classes.actionInforGrey}>This Week</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </NavLink>

                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={12}>
                        <NavLink to="/app/prepaid">
                            <Paper className={classes.ConnectionRequests}>
                                <Grid row container className={classes.topContent}>
                                    <Grid item xs={12} md={9} lg={9} sm={9}><h3>New <br></br>Activations</h3> </Grid>
                                    <Grid item xs={12} md={3} lg={3} sm={3} className="textRight"> <img src={DualSim} /></Grid>
                                </Grid>
                                <Grid row container className={classes.bottomActions}>
                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.actionContent}>
                                            <div>
                                                <p>Individuals</p>
                                                <h3>20</h3>
                                            </div>
                                            <div>
                                                <p>Data</p>
                                                <h3>10</h3>
                                            </div>
                                            <div>
                                                <p>ACP</p>
                                                <h3>10</h3>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} sm={12}>
                                        <div className={classes.greyCurveBg} />
                                        <div className={classes.curveContent}>
                                            <p className={classes.actionInfo}>15 % <ArrowUpwardIcon /></p>
                                            <p className={classes.actionInforGrey}>This Week</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </NavLink>
                    </Grid>

                </Grid>

                <Grid container spacing={2} className={classes.marginTopTen}>

                    <Grid item xs={12} md={6} lg={6} sm={12}>

                        <Paper className={classes.chartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Top 4 Selling Products</p>
                                <div className={classes.topLinks}>

                                    <span style={{ color: '#FE9800' }}>
                                        <span className={classes.servicesUsedDot}></span>      SIMS
                                    </span>

                                    <span style={{ color: '#843C9F' }}>
                                        <span className={classes.packageUpdateDot}></span>  Plans
                                    </span>


                                    <span style={{ color: '#0078D4' }}>
                                        <span className={classes.dot1}></span> Devices
                                    </span>

                                    <span> 
                                        <span className={classes.dot2}></span>  Gift Cards
                                    </span>

                                </div>
                            </div>

                            <div className={classes.graphBottom}>
                                <OrderChart></OrderChart>
                            </div>


                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3}>


                        <Paper className={classes.chartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}> Recent Activities</p>

                                <div className={classes.FilterArea}>
                                    <Select
                                        name="activityLogFilter"
                                        id="activityLogFilter"
                                        size="small"
                                        native
                                        onChange={handleSelectChange}
                                        value={filters.activityLogFilter }
                                        placeholder="Select"
                                        className={classes.selectBaseInput}>
                                        {
                                            daysFilter.map(option => <option value={option.value}>{option.label}</option>)
                                        }
                                    </Select>
                                </div>

                            </div>

                            <div className={classes.chartBottom}>
                                <div className={classes.ListContain}>

                                    {activityLog.length > 0 ?
                                        <>
                                            {activityLog.slice(0, 5).map((item, index) => (
                                                <div className={classes.recentActivityList}>
                                                    <Grid row container lg={12} alignItems="center">
                                                        <Grid item row lg={1} className="textRight"> <span className={classes.smallRadius}></span> </Grid>
                                                        {/*Freddie logged in <span> 05 JUN 8:10 PM - 2312365656</span>*/}
                                                        <Grid item row className={classes.borderContent}> {item.user + ' - ' + item.details}  <span>{item.activityDate} - {item.mdnNumber = '-1' ? item.accountNumber : item.mdnNumber }</span>  </Grid>
                                                    </Grid>
                                                </div>
                                            ))}
                                        </>
                                        : <NoRecord Icon={true} message="No log exist"></NoRecord>}


                                </div>
                            </div>


                        </Paper>



                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper className={classes.chartPaper}>

                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Others</p>
                                <div className={classes.FilterArea}>
                                    <Select
                                        name="DaysFilter"
                                        id="DaysFilter"
                                        size="small"
                                        native
                                        onChange={handleSelectChange}
                                        placeholder="Select"
                                        className={classes.selectBaseInput}>
                                        {
                                            daysFilter.map(option => <option value={option.value}>{option.label}</option>)
                                        }
                                    </Select>
                                </div>

                            </div>

                            <div className={classes.chartBottom}>
                                <Grid container>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <NavLink to="/app/returnLabel">
                                            <div className={classes.greyRactBox} style={{ marginRight: '8px' }}>
                                                <img src={CustomLabel} />
                                                <p>Return Labels</p>
                                                <h3>{trackingList?.filter(t => t.type == 'returnLabel').length}</h3>

                                            </div>
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <NavLink to="/app/reviews">
                                            <div className={classes.greyRactBox}>
                                                <img src={ReviewReceived} />
                                                <p>Reviews Received</p>
                                                <h3>{reviewRecieved.length} </h3>
                                            </div>
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className={classes.greyRactBox} style={{ flexFlow: 'nowrap', marginTop: '1px' }}>
                                            <img src={BusinessInquiries} />
                                            <div style={{ textAlign: 'center' }}><p>Business Inquiries</p>
                                                <h3> 10 </h3> </div>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </Paper>

                    </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.marginTopTen}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Paper className={classes.chartPaper}>

                            <div className={classes.chartTop}>

                                <div className={classes.headerRightSide}>
                                    <p className={classes.reviewHeading}>Communication</p>

                                </div>

                                <div className={classes.headerLeftSize}>
                                    <div className={classes.FilterArea}>
                                        <Select
                                            name="communicationDateFilter"
                                            id="communicationDateFilter"
                                            size="small"
                                            native
                                            value={filters?.communicationDateFilter}
                                            onChange={handleSelectChange}
                                            placeholder="Select"
                                            className={classes.selectBaseInput}>
                                            {
                                                daysFilter.map(option => <option value={option.value}>{option.label}</option>)
                                            }
                                        </Select>
                                    </div>
                                    <div className={classes.actionIcon}>

                                        <Tooltip placement="top" title='Send SMS'>
                                            <img src={DashboardChatMsg} className={classes.SmsIcon} onClick={handleCommChatCLick}/>
                                        </Tooltip>

                                        <Tooltip placement="top" title='Share video meeting link'>
                                            <img src={DashboardVideoMsg} onClick={handleCommVideoCLick} />
                                        </Tooltip>

                                        {/* <Tooltip placement="top" title='Send email'>
                                            <img src={EnvelopeEmail} />
                                        </Tooltip> */}

                                        <Badge badgeContent={0} color="secondary">
                                            <img src={DashboardCallMsg} onClick={handleCommCallCLick}/>
                                        </Badge>


                                        <Tooltip placement="top" title='Show more'>
                                            <Dropdown overlay={<Menu>
                                                <Menu.Item
                                                    className={classes.DropdownItems} >  Print Chat Log
                                                </Menu.Item>


                                                <Menu.Item
                                                    className={classes.DropdownItems}>  Email Chat Log
                                                </Menu.Item>

                                            </Menu>} trigger={["click"]}
                                                className={classes.actionDropDown}>
                                                <img src={ShowMoreIcon} />
                                            </Dropdown>
                                        </Tooltip>

                                    </div>
                                </div>
                            </div>


                            <div className={classes.chartBottom}>
                                <Grid row container>
                                    <Grid item xs={12} md={4} lg={4}>

                                        <div className={classes.communicationBox}>

                                            <div className={classes.communicationTop}>
                                                <img src={DashboardPhoneIco} />
                                                <h3>  Call Log </h3>
                                                <div className={classes.communcationFilter}>
                                                    <Select
                                                        name="callFilter"
                                                        id="callFilter"
                                                        size="small"
                                                        native
                                                        value={filters?.callFilter}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        className={classes.selectBaseInput}>
                                                        {
                                                            commFilters.map(option => <option value={option.value}>{option.label}</option>)
                                                        }
                                                    </Select>
                                                </div>
                                                <h1>{callsList ? callsList.length : ''}</h1>

                                            </div>
                                            {callsList.length > 0 ?
                                                <>
                                                    {callsList.slice(0, 4).map((item, index) => (
                                                        <div className={classes.communicationList}>
                                                            <div style={{ marginRight: '15px' }}>
                                                                <img className="user-profile-dashboard" src={item.customerPhotoPath ? '.' + item.customerPhotoPath : profilePlaceholder} alt="Customer" />
                                                                {/*<div className="user-profile-dashboard" style={{ margin: 'auto', backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>*/}
                                                            </div>
                                                            <div style={{ width: '100%' }}>
                                                                <p>{item.custFirstName}<span className={classes.counter}>{communicationFormatedDate(item.callDateTime)}</span></p>
                                                                <span>{formateMdnNumber(item.phoneNumber)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                                : <NoRecord Icon={true} message="No record exist"></NoRecord>}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <div className={classes.communicationBox}>

                                            <div className={classes.communicationTop}>
                                                <img src={DashboardTextIco} />
                                                <h3>  Chat </h3>
                                                <div className={classes.communcationFilter}>
                                                    <Select
                                                        name="chatFilter"
                                                        id="chatFilter"
                                                        size="small"
                                                        native
                                                        value={filters?.chatFilter}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        className={classes.selectBaseInput}>
                                                        {
                                                            commFilters.map(option => <option value={option.value}>{option.label}</option>)
                                                        }
                                                    </Select>
                                                </div>
                                                <h1 style={{ color: '#116D9A' }}>{chatList ? chatList.length : ''}</h1>
                                            </div>

                                            {chatList.length > 0 ?
                                                <>
                                                    {chatList.slice(0, 4).map((item, index) => (
                                                        <div className={classes.communicationList}>
                                                            <div style={{ marginRight: '15px' }}>
                                                                <img className="user-profile-dashboard" src={item.customerPhotoPath ? '.' + item.customerPhotoPath : profilePlaceholder} alt="Customer" />
                                                                {/*<div className="user-profile-dashboard" style={{ margin: 'auto', backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>*/}
                                                            </div>
                                                            <div style={{ width: '100%' }}>
                                                                <p>{item.custFirstName}<span className={classes.counter}>{communicationFormatedDate(item.messageDateTime)}</span></p>
                                                                <span>{formateMdnNumber(item.phoneNumber)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                                : <NoRecord Icon={true} message="No record exist"></NoRecord>}

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4}>

                                        <div className={classes.communicationBox}>

                                            <div className={classes.communicationTop}>
                                                <img src={DashboardEmailIco} />
                                                <h3>  Emails </h3>
                                                <div className={classes.communcationFilter}>
                                                    <Select
                                                        name="emailFilter"
                                                        id="emailFilter"
                                                        size="small"
                                                        native
                                                        value={filters?.emailFilter}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        className={classes.selectBaseInput}>
                                                        {
                                                            commFilters.map(option => <option value={option.value}>{option.label}</option>)
                                                        }
                                                    </Select>
                                                </div>
                                                <h1 style={{ color: '#843C9F' }}>{emailList ? emailList.length : ''}</h1>
                                            </div>

                                            {emailList.length > 0 ?
                                                <>
                                                    {emailList.slice(0, 4).map((item, index) => (
                                                        <div className={classes.communicationList}>
                                                            <div style={{ marginRight: '15px' }}>
                                                                <img className="user-profile-dashboard" src={item.customerPhotoPath ? '.' + item.customerPhotoPath : profilePlaceholder} alt="Customer" />
                                                                {/*<div className="user-profile-dashboard" style={{ margin: 'auto', backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>*/}
                                                            </div>
                                                            <div style={{ width: '100%' }}>
                                                                <p>{item.custFirstName}<span className={classes.counter}>{communicationFormatedDate(item.messageDateTime)}</span></p>
                                                                <span>{formateMdnNumber(item.phoneNumber)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                                : <NoRecord Icon={true} message="No record exist"></NoRecord>
                                            }

                                        </div>


                                    </Grid>
                                </Grid>
                            </div>

                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3}>

                        <Paper className={classes.chartPaper}>

                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Damage & Repair Requests</p>
                            </div>

                            <div className={classes.chartBottom}>
                                <NavLink to="/app/damage&Repair">
                                    <div className={classes.damageList}>
                                        <p>Figgers F3 Touch not working</p>
                                        <span>
                                            I have been using  Figgers F3 mobile phone since last december unfortunately it dropped from my work desk yesterday, now its touch screen is not working, it need to be repaired, i am requesting you to repair or replace the damaged part.
                                        </span>

                                        <div className={classes.damageListBottom}>
                                            <p>Alex True - 2223356 </p>
                                            <span> Friday Jun 4, 2023 | 08:35 PM</span>
                                        </div>
                                    </div>
                                </NavLink>

                                <NavLink to="/app/damage&Repair">
                                    <div className={classes.damageList}>
                                        <p>F-Buds Pro Noise Cancelling issue</p>
                                        <span>
                                            I have been using  F-buds since last month, I felt yesterday that its noise cancellation function is not working , its in warrantee i am sending it back to you so you can check and do what needs
                                            to be done. Thanks
                                        </span>

                                        <div className={classes.damageListBottom}>
                                            <p>Alex True - 2223356 </p>
                                            <span> Friday Jun 4, 2023 | 08:35 PM</span>
                                        </div>
                                    </div>
                                </NavLink>

                            </div>
                        </Paper>

                    </Grid>

                </Grid>

            </Grid></>
    )
}
export default withSnackbar(Dashboard);