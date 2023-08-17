import React, { useEffect, useState } from "react";
import {
    Grid, Button, InputBase, FormControlLabel,Checkbox, FormHelperText} from "@material-ui/core";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";

import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";
import Loader from '../../../components/Loader/Loader';
import { withSnackbar } from "./../../../components/Message/Alert";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../Services/APIService';
import { validatePhoneNumber,formatDateTime, formateMdnNumber, formatDate, getFormatedDate, formatDateByFormate, formatSizeUnits, convertMinToHours } from './../../../components/Common/Extensions';
import { InputBaseField, SelectField, TextareaField } from './../../../components/InputField/InputField';
import ProfilePlaceholder from "../../../assets/img/profilePlaceholder.jpg";

function CellularUsageReport({ dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    let history = useHistory();
    const { showMessage } = props;
    const [errorMessages, setErrorMessages] = useState({});
    const [accountNumber, setAccountNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //9412012391
    const [state, setState] = useState({ mdnNumber:''});
    const [isRecordExists, setIsRecordExists] = useState(false);
    const [filteredStatus, setFilteredStatus] = useState([]);
    // Calculate the default date range of one month
    const defaultStartDate = moment().subtract(1, 'months');
    const defaultEndDate = moment();
    const [selectedDateRange, setSelectedDateRange] = useState([]);

    const handleDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
    };

    const Validate = (errorList) => {
        if (!state.mdnNumber) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorMdnNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorMdnNumber: false
            }));
        }

        if ((state.mdnNumber && !validatePhoneNumber(state.mdnNumber))) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidMdnNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidMdnNumber: false
            }));
        }

        if (selectedDateRange.length <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDates: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDates: false
            }));
        }
    }

    const generateReport = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            getLineDetails();
            loadMonthlyDetails();
        }
    }


    const handlePhoneChange = e => {
        const { name, value } = e.target;
        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));
                        return;
                    }
                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {

                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }

            }
        }
        else
            e.preventDefault();
    }

    const handleChange = e => {
        const { name, value } = e.target;

        if (value.trim() === "" && value !== "") {
            return;
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

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
            MDN: state.mdnNumber,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/getLineDetailsByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success) {
                if (result.data) {
                    setIsRecordExists(true);
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
                        ['lineType']: result.data.lineType,
                        ['accountNumber']: result.data.accountNumber
                    }));
                    loadCustomerDetails(result.data.accountNumber);
                    getLineOtherDetails(result.data.accountNumber);
                }
                else {
                    setIsRecordExists(false);
                    showMessage("Error", "Error adding new line, please contact administrator", "error", 3000);
                }
                
            }
            else {
                setIsRecordExists(false);
                showMessage("Error", result.message, "error", 3000);
                
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



    const loadCustomerDetails = (accNumber) => {
        var obj = {
            accountNumber: accNumber
        };
        PostDataAPI("customer/getCustomerInfo", obj, true).then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data);
                setState((prevState) => ({
                    ...prevState,
                    ['photoPath']: result.data.photoPath
                }));
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
        
    }, []);
    return (
        <>

            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers Backend"} currentLink="Usage Report"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Cellular Usage Report
                </h1>
            </Grid>

            <Grid container className={classes.container}>
                <Grid container justifyContent="center" alignItems="flex-start" spacing={2}>
                    <Grid item lg={3}>
                        <InputBaseField
                            name="mdnNumber"
                            onChange={handlePhoneChange}
                            placeholder="Number"
                            type="phone #"
                            MaxLength={14}
                            value={state.mdnNumber}
                        />
                        {errorMessages.errorMdnNumber && !state.mdnNumber ? (<FormHelperText style={{ color: "red" }} >
                            Please enter phone number
                        </FormHelperText>) : ('')}
                        {errorMessages.errorInvalidMdnNumber && (state.mdnNumber && !validatePhoneNumber(state.mdnNumber)) ? (<FormHelperText style={{ color: "red" }} >
                            Please enter valid phone number
                        </FormHelperText>) : ('')}
                    </Grid>
                    <Grid item lg={3}>
                        <InputBaseField
                            name="dateRange"
                            handleChangeDate={handleDateRangeChange}
                            type="dateRange"
                            MaxLength={19}
                            dateFormat={'MM/DD/yyyy'}
                            value={selectedDateRange}
                        />
                        {errorMessages.errorDates && selectedDateRange.length <= 0 ? (<FormHelperText style={{ color: "red" }} >
                            Please select date range
                        </FormHelperText>) : ('')}
                    </Grid>
                    <Grid item lg={2}>
                        <Button className={classes.changeBtn} onClick={generateReport}>Generate</Button>
                    </Grid>
                </Grid>

            </Grid>


            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Cellular Usage Report for {formateMdnNumber(state.mdnNumber)}
                </h1>
                <hr></hr>
            </Grid>


            {isRecordExists ? <>
                <Grid container className={classes.container} >
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item lg={2} md={2} sm={2} style={{ textAlign: 'center' }}>
                            <div className={classes.userImage}>
                                {state.photoPath ?
                                    <img src={'.' + state.photoPath} className="user-Photo" alt="" />
                                    : <img className="user-Photo" src={ProfilePlaceholder}></img>
                                }
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4}>
                            <div className={classes.customerInformation}>
                                <Grid row>
                                    <p>  <b> {state.username} </b> </p>
                                    <p>{state.accountNumber} </p>
                                </Grid>
                                <Grid container>
                                    <Grid item lg={4} md={4} sm={4}>
                                        <p> <b> ICC Number: </b> </p>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8}>
                                        <p>{state.icc}</p>
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item lg={4} md={4} sm={4}>
                                        <p><b>  Active Since: </b> </p>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8}>
                                        <p>{formatDateByFormate(state.activationDate, "dddd, MMMM DD, YYYY")}</p>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4}>
                            <div className={classes.whiteInfo}>
                                <Grid row>
                                    <Grid container>
                                        <Grid item lg={5} md={5} sm={5}>
                                            <p> <b> Line Status: </b> </p>
                                        </Grid>
                                        <Grid item lg={7} md={7} sm={7}>
                                            <div className="statuses"><span className={
                                                state.status === "Active" ? 'activeStatus' :
                                                    state.status === "Inactive" ? 'inActiveStatus' :
                                                        state.status === "Suspended" ? 'SuspendedStatus' :
                                                            state.status === "Disconnected" ? 'disconnectStatus' :
                                                                state.status === "Hotlined" ? 'hotlineStatus' : ''


                                            }> {state.status}</span >
                                            </div>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid row>
                                    <Grid container>
                                        <Grid item lg={5} md={5} sm={5}>
                                            <p> <b> Type: </b> </p>
                                        </Grid>
                                        <Grid item lg={7} md={7} sm={7}>
                                            <p>{state.lineType}</p>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>

                            <div className={classes.whiteInfo}>

                                <Grid row>
                                    <Grid container>
                                        <Grid item lg={5} md={5} sm={5}>
                                            <p> <b> Billing Address: </b> </p>
                                        </Grid>
                                        <Grid item lg={7} md={7} sm={7}>
                                            <p> {state.billingAddress}</p>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.container}>

                    <Grid container justifyContent="center" style={{ margin: '25px 0' }}>
                        <Grid lg={12} md={12} sm={12} className={classes.whiteInfo}>
                            <div className={classes.cardHeader}>
                                <div className={classes.cardHeaderTitle}>
                                    <h2 className={classes.cardTitle}>Call Details</h2>
                                </div>

                            </div>
                            <div className={classes.tabContainer}>
                                {/*CallsGrid*/}
                                <SearchGrid
                                    Icon={true}
                                    noRecordMsg="No record found"
                                    list={callDetails}
                                    isUpdate={isDataGridUpdate}
                                    columns="CallDetails" />
                            </div>
                        </Grid>
                    </Grid>


                    <Grid container justifyContent="center" style={{ margin: '25px 0' }}>
                        <Grid lg={12} md={12} sm={12} className={classes.whiteInfo}>
                            <div className={classes.cardHeader}>
                                <div className={classes.cardHeaderTitle}>
                                    <h2 className={classes.cardTitle}>SMS Details</h2>
                                </div>

                            </div>
                            <div className={classes.tabContainer}>
                                {/*SMSsGrid*/}
                                <SearchGrid
                                    Icon={true}
                                    noRecordMsg="No record found"
                                    list={smsDetails}
                                    isUpdate={isDataGridUpdate}
                                    columns="SMSDetails" />
                            </div>
                        </Grid>
                    </Grid>


                    <Grid container justifyContent="center" style={{ margin: '25px 0' }}>
                        <Grid lg={12} md={12} sm={12} className={classes.whiteInfo}>
                            <div className={classes.cardHeader}>
                                <div className={classes.cardHeaderTitle}>
                                    <h2 className={classes.cardTitle}>Data Details</h2>
                                </div>

                            </div>
                            <div className={classes.tabContainer}>
                                {/*DataGrid*/}
                                <SearchGrid
                                    Icon={true}
                                    noRecordMsg="No record found"
                                    list={dataDetails}
                                    isUpdate={isDataGridUpdate}
                                    columns="DataDetails" />
                            </div>
                        </Grid>
                    </Grid>

                </Grid>
            </> : ''}
           




        </>
    )
}
export default withSnackbar(CellularUsageReport);