import React, { useState, useEffect } from 'react'

import { Button, Grid, Dialog, Collapse, Icon, Typography } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';
import SearchGrid from "./../../../../components/table/SearchGrid";

import NoRecord from "./../../../../components/NoRecord/NoRecord";
import { PostDataAPI } from '../../../../Services/APIService';
import { formateMdnNumber, formatDateByFormate, formatDateTime, getFormatedDate, convertMinToHours, formatSizeUnits } from '../../../../components/Common/Extensions';
import profilePlaceholder from '../../../../assets/img/profilePlaceholder.webp';
import GlobeIcon from '../../../../assets/img/status/globalization.svg';
import CallIcon from '../../../../assets/img/status/call.svg';
import SMSIcon from '../../../../assets/img/status/sms.svg';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import moment from 'moment';
import useStyles from "./styles";

function MonthlyUsageSummary({ dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    // Calculate the default date range of one month
    const defaultStartDate = moment().subtract(1, 'months');
    const defaultEndDate = moment();
    const [selectedDateRange, setSelectedDateRange] = useState([defaultStartDate, defaultEndDate]);
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    const [callDetails, setCallDetails] = useState([]);
    const [smsDetails, setSMSDetails] = useState([]);
    const [dataDetails, setDataDetails] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const [isSMSGridUpdate, setIsSMSGridUpdate] = useState(false);
    const [isCallGridUpdate, setIsCallGridUpdate] = useState(false);
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const [totalDataUsed, setTotalDataUsed] = useState();
    const [totalSMSUsed, setTotalSMSUsed] = useState();
    const [totalCallUsed, setTotalCallUsed] = useState();
    const handleSMSGridUpdate = () => {
        setIsSMSGridUpdate(!isSMSGridUpdate);
    }
    const handleCallGridUpdate = () => {
        setIsCallGridUpdate(!isCallGridUpdate);
    }
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const getLineDetails = () => {
        var obj = {
            MDN: mdnNumber,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/getLineDetailsByMDN", obj, true).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                if (result.data.status == 1) {
                    result.data.status = "InActive";
                }
                else if (result.data.status == 2) {
                    result.data.status = "Active";
                }
                else if (result.data.status == 3) {
                    result.data.status = "Suspended";
                }
                else if (result.data.status == 4) {
                    result.data.status = "Disconnected";
                }
                else if (result.data.status == 6) {
                    result.data.status = "Hotlined";
                }
                else if (result.data.status == 7) {
                    result.data.status = "Rejected";
                }
                result.data.lineType = result.data.isPrepaid ? 'Prepaid' : 'Postpaid';
                setState((prevState) => ({
                    ...prevState,
                    ['username']: result.data.username,
                    ['icc']: result.data.icc,
                    ['activationDate']: result.data.activationDate,
                    ['status']: result.data.status,
                    ['lineType']: result.data.lineType
                }));
                setIsLoading(false)
                //getLineOtherDetails(result.data.accountNumber);
            }
            else {
                setIsLoading(false)
            }
        })
    }

    const getLineOtherDetails = (accNumber) => {
        var obj = {
            accountNumber: accNumber
        };
        PostDataAPI("telispire/getAccountInfoByAccountNumber", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                if (!result.data.billingAddress || result.data.billingAddress.address1 == '') {
                    result.data.billingAddress = result.data.homeAddress;
                }
                if (result.data.billingAddress) {
                    result.data.billingAddress = result.data.billingAddress?.address1 + ", " + result.data.billingAddress?.city + ", " + result.data.billingAddress?.state
                }

                setState((prevState) => ({
                    ...prevState,
                    ['billingAddress']: result.data.billingAddress
                }));
            }
        })
    }

    

    const loadCustomerDetails = () => {
        var obj = {
            accountNumber: accountNumber
        };
        PostDataAPI("customer/getCustomerInfo", obj, true).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                setState((prevState) => ({
                    ...prevState,
                    ['photoPath']: result.data.photoPath
                }));
                //setState(result.data);
            } else {
                console.log(result.message);
            }
        })
    }

    function loadMonthlyDetails() {
        var params = {
            mdnNumber: state.mdnNumber,
            fromDate: getFormatedDate(new Date(selectedDateRange[0]),'YYYY-MM-DD')+'',
            toDate: getFormatedDate(new Date(selectedDateRange[1]), 'YYYY-MM-DD')+''
        }
        PostDataAPI("telispire/getLineMonthlyUsageDetails", params, true).then((result) => {
            if (result.success && result.data != null) {
                var _totalCallUsed = 0;
                if (result.data.montlyCallDetails) {
                    setCallDetails(
                        result.data.montlyCallDetails.map((item, i) => {
                            _totalCallUsed++;
                            item.column1 = formateMdnNumber(item.column1);
                            item.column2 = formateMdnNumber(item.column2);
                            item.column3 = formatDateTime(item.column3);
                            item.column4 = convertMinToHours(item.column4);
                            item.column5 = item.column5;
                            item.column6 = item.column6;
                            item.column7 = formatSizeUnits(item.column7);
                            return { ...item }
                        }));
                    setCallDetails(result.data.montlyCallDetails);
                }
                setTotalCallUsed(_totalCallUsed);
               
                var _totalSMSUsed = 0;
                if (result.data.montlySmsDetails) {
                    setSMSDetails(
                        result.data.montlySmsDetails.map((item, i) => {
                            _totalSMSUsed++;
                            item.column1 = formateMdnNumber(item.column1);
                            item.column2 = formateMdnNumber(item.column2);
                            item.column3 = formatDateTime(item.column3);
                            item.column4 = convertMinToHours(item.column4);
                            item.column5 = item.column5;
                            item.column6 = item.column6;
                            item.column7 = formatSizeUnits(item.column7);
                            return { ...item }
                        }));
                }
                
                setTotalSMSUsed(_totalSMSUsed);

               
                var _totalDataUsed = 0;
                if (result.data.montlyDataDetails) {
                    setDataDetails(
                        result.data.montlyDataDetails.map((item, i) => {
                            _totalDataUsed += item.column7 ? parseFloat(item.column7) : 0;
                            item.column1 = formateMdnNumber(item.column1);
                            item.column2 = formateMdnNumber(item.column2);
                            item.column3 = formatDateTime(item.column3);
                            item.column4 = convertMinToHours(item.column4);
                            item.column5 = item.column5;
                            item.column6 = item.column6;
                            item.column7 = formatSizeUnits(item.column7);
                            return { ...item }
                        }));
                }
                
                setTotalDataUsed(formatSizeUnits(_totalDataUsed));

                handleDataGridUpdate();
            }
        })
    }

    useEffect(() => {
        loadCustomerDetails();
        getLineDetails();
        loadMonthlyDetails();
    }, []);

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            PaperComponent={DraggableComponent}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>Usage Details Summary</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>


                            <Grid row>
                                <div className={classes.profileInfo}>
                                    <Grid container alignItems='center'>
                                        <Grid item lg={3}>

                                            {state.photoPath ?
                                                <img src={'.' + state.photoPath} className={classes.profileCircle} alt="" />
                                                : <div className={classes.profileCircle} style={{ backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>
                                            }

                                        </Grid>
                                        <Grid item lg={4}>
                                            <div className={classes.customerName}>
                                                <p> <b>  {state.username}</b> </p>
                                                <p>{formateMdnNumber(mdnNumber)}</p>
                                                <p><b>ICC Number:</b> {state.icc}</p>
                                                <p><b>Active Since: </b>{formatDateByFormate(state.activationDate, "dddd, MMMM DD, YYYY")}</p>
                                            </div>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <div className={classes.customerStatus}>
                                                <div className={classes.customerWhiteBox}>
                                                    <p><b>Line Status:</b> <span className={
                                                        state.status === "Active" ? 'activeStatus' :
                                                            state.status === "Inactive" ? 'inActiveStatus' :
                                                                state.status === "Suspended" ? 'SuspendedStatus' :
                                                                    state.status === "Disconnected" ? 'disconnectStatus' :
                                                                        state.status === "Hotlined" ? 'hotlineStatus' : ''


                                                    }> {state.status}</span > </p>

                                                </div>

                                                {/*<div className={classes.customerWhiteBox}>*/}
                                                {/*   <p><b>Billing Address:</b><span>{state.billingAddress ? state.billingAddress:'' }</span>   </p>*/}
                                                {/*</div>*/}

                                            </div>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>


                            <Grid row container>

                                <Grid item lg={4}>
                                    <div className={classes.graphCircle}>
                                        <img src={CallIcon} />
                                        <h2>Calls</h2>
                                        <p>{totalCallUsed}</p>

                                    </div>
                                </Grid>



                                <Grid item lg={4}>
                                    <div className={classes.graphCircle}>
                                        <img src={SMSIcon} />
                                        <h2>SMS</h2>
                                        <h3>Used </h3>
                                        <p>{totalSMSUsed}</p>

                                    </div>
                                </Grid>


                                <Grid item lg={4}>
                                    <div className={classes.graphCircle}>
                                        <img src={GlobeIcon} />
                                        <h2>Data </h2>
                                        <h3>Used </h3>
                                        <p>{totalDataUsed}</p>

                                    </div>
                                </Grid>
                            </Grid>

                            <Grid row>
                                <div className={classes.skyBlueBar}>
                                    <h4>SMS/MMS Details </h4>
                                </div>

                                <SearchGrid columns="SMSDetails"
                                    list={smsDetails}
                                    isUpdate={isDataGridUpdate}
                                    noRecordMsg="No SMS/MMS detail exists"
                                    Icon={true}
                                />
                            </Grid>

                            <Grid row>

                                <div className={classes.skyBlueBar}>
                                    <h4>Call Details</h4>
                                </div>
                                <SearchGrid
                                    columns="CallDetails"
                                    list={callDetails}
                                    isUpdate={isDataGridUpdate}
                                    noRecordMsg="No call detail exists"
                                    Icon={true}
                                />

                            </Grid>

                            <Grid row>
                                <div className={classes.skyBlueBar}>
                                    <h4>Data Details </h4>
                                </div>

                                <SearchGrid columns="DataDetails"
                                    list={dataDetails}
                                    isUpdate={isDataGridUpdate}
                                    noRecordMsg="No Data detail exists"
                                    Icon={true}
                                />
                            </Grid>

                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>
                            <Button className={classes.changeBtn} onClick={handleClose}>Close</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default MonthlyUsageSummary