import React, { useState, useEffect } from 'react'
import {
    Button,
    Checkbox,
    FormControlLabel,
    InputBase,
    Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import { Filter, SearchOutlined as SearchIcon } from '@material-ui/icons';
import SearchGrid from '../../../components/table/SearchGrid';
import Breadcrums from '../../../components/BreadCrums/breadcrums';
import TopSpacer from '../../../components/Common/spacer/TopSpacer';

import TrackingClaimed from "../../../assets/img/icons/trackingClaimed.svg";
import TrackingConfirmed from "../../../assets/img/icons/trackingConfirmed.svg";
import TrackingDeleted from "../../../assets/img/icons/trackingDeleted.svg";
import TrackingDelivered from "../../../assets/img/icons/trackingDelivered.svg";
import TrackingReturned from "../../../assets/img/icons/trackingReturned.svg";
import TrackingShipped from "../../../assets/img/icons/trackingShipped.svg";
import TrackingTransit from "../../../assets/img/icons/trackingTransit.svg";
import TrackingVoid from "../../../assets/img/icons/trackingVoid.svg";
import { PostDataAPI } from '../../../Services/APIService';
import axios from 'axios';

import { formatDate, formatDateTime, formateMdnNumber, getFormatedDate, orderTrackStatus } from '../../../components/Common/Extensions';
import Loader from '../../../components/Loader/Loader';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../components/Message/Alert";
import moment from 'moment';

function ACPIndividuals({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isDataRefresh, setIsDataRefresh] = useState(false);

    const handleDataRefresh = () => {
        setIsDataRefresh(!isDataRefresh);
    }
    //action dialog
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })

    const showActionDialog = (message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogState(prevState => ({
            ...prevState,
            type: type,
            showHide: true,
            message: message,
            onClickOk: OnOkCallback,
            OnClickCancel: OnCancellCallback
        }));
    }


    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [filteredStatus, setFilteredStatus] = useState([]);
    const handleStatusClick = (event, status) => {

        var lstStatus = filteredStatus;
        if (event.target.checked) {
            lstStatus.push(status);
        }
        else {
            lstStatus = lstStatus.filter(s => s != status)
        }
        setFilteredStatus(lstStatus);
        if (lstStatus.length > 0) {
            setFilteredAcpApplications(acpApplications.filter(o => lstStatus.some(s => s == o.applicationStatus)));
        }
        else {
            setFilteredAcpApplications(acpApplications);
        }

        handleDataRefresh();
    }

    const [state, setState] = useState({
        confirmed: '', shipped: '', inTransit: '', delivered: '', returned: '',
        claimed: '', voided: '', deleted: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [acpApplications, setAcpApplications] = useState([]);
    const [filteredAcpApplications, setFilteredAcpApplications] = useState([{}]);


    const ACPIndividual = [
        {
            Application: <>
                Figgers Tablet <br></br>
                ID: B48163-01592  <br></br>
                Date: Tuesday, March 28, 2023 <br></br>
                Reference: ---
            </>,
            ApplicationInformation: <>
                Terron C Edwards <br></br>
                12/24/1979 <br></br>
                terrondotedwards@gmail.com <br></br>
                5463
            </>,
            Addresses: <>
                Contact Address<br></br>
                3838 N, 6th St, Milwaukee, WI 53212
            </>,
            Eligibility: <>
                E1: Medicaid <br></br>
                Status: NALD_Verified <br></br>
                Initials: --- <br></br>
                Signature: --- <br></br>
            </>
        }
    ]

    const statusCheckbox = [
        {
            value: 'All',
            status: 'all',
            numbers: '1560',
            Icon: TrackingConfirmed,

        },
        {
            value: 'NV Pending',
            status: 'nv_pending',
            numbers: '102',
            Icon: TrackingShipped,

        },
        {
            value: 'Attention Req',
            status: 'attention_req',
            numbers: '10',
            Icon: TrackingTransit,

        },
        {
            value: 'NV Failed',
            status: 'nv_failed',
            numbers: '02',
            Icon: TrackingDelivered,

        },
        {
            value: 'Eligible',
            status: 'eligible',
            numbers: '00',
            Icon: TrackingReturned,

        },
        {
            value: 'Switch',
            status: 'switch',
            numbers: '02',
            Icon: TrackingClaimed,

        },
        {
            value: 'Enrolled',
            status: 'enrolled',
            numbers: '02',
            Icon: TrackingVoid,

        },
        {
            value: 'Enrolled Error',
            status: 'enrolled_error',
            numbers: '02',
            Icon: TrackingVoid,

        },


    ]


    const [searchFilter, setValue] = useState('');
    const handleSearch = (e) => {
        const currValue = e.target.value;

        if (currValue.trim().length > 0) {
            setValue(currValue);
        }

    }


    const loadAcpAccessToken = () => {
        //string URI = _configuration["USPShipmentConfig:ShipConfirmURL"];
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios.post(`https://api.universalservice.org/auth/token`, '', config)
            .then((response) => {
                console.log('fetching ACP Access Token:', response);
            })
            .catch((error) => {
                console.log('Error fetching location data:', error);
            });
    }

    const loadFiggerACPApplications = () => {
        setIsLoading(true)
        var params = {applicationType:'individual'}
        PostDataAPI("figgacpapplication/loadACPApplications",params).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data)
                var applicationList = result.data.map((item, i) => {
                    const eligibilityProgramCode = item.eligibilityProgramCode.split(',')
                    item.Application = <>
                        <strong>{item.productName}</strong> <br></br>
                        <strong>ID:</strong> {item.applicationId}  <br></br>
                        <strong>Date:</strong> {formatDateTime(item.createDate)} <br></br>
                        <strong>Reference:</strong> {item.hearAboutAcpBy}
                    </>
                    item.ApplicationInformation = <>
                        {item.firstName + ' ' + item.lastName} <br></br>
                        {formateMdnNumber(item.phone)} <br></br>
                        {formatDate(item.dateOfBirth)} <br></br>
                        {item.email} <br></br>
                        {item.ssn4}
                    </>
                    item.Addresses = <>
                        {item.contactAddress ? <>
                            <strong>Contact Address</strong><br></br>
                            {item.contactAddress}, {item.contactCity}, {item.contactState+' ' +item.contactZipCode}
                            
                            <br></br>
                        </> : ''}

                        {item.shippingAddress ? <>
                            <strong>Shipping Address</strong><br></br>
                            {item.contactAddress}, {item.contactCity}, {item.contactState + ' ' + item.contactZipCode}
                            <br></br>
                        </> : ''}
                    </>
                    item.Eligibility = <>
                        {eligibilityProgramCode.includes('E1') ? <><strong>E1:</strong> Medicaid <br></br></> : ''}
                        {eligibilityProgramCode.includes('E2') ? <><strong>E2:</strong> Supplemental Nutrition Assistance
                            Program (SNAP)<br></br></> : ''}
                        {eligibilityProgramCode.includes('E3') ? <><strong>E3:</strong> Supplemental Security<br></br></> : ''}
                        {eligibilityProgramCode.includes('E4') ? <><strong>E4:</strong> Federal Public Housing Assistance<br></br></> : ''}
                        {eligibilityProgramCode.includes('E8') ? <><strong>E8:</strong> Bureau of Indian Affairs General
                            Assistance<br></br></> : ''}
                        {eligibilityProgramCode.includes('E9') ? <><strong>E9:</strong> Tribal Temporary Assistance for Needy Families (Tribal TANF) <br></br></> : ''}
                        {eligibilityProgramCode.includes('E10') ? <><strong>E10:</strong> Food Distribution Program on Indian
Reservations (FDPIR) <br></br></> : ''}
                        {eligibilityProgramCode.includes('E11') ? <><strong>E11:</strong> Head Start <br></br></> : ''}
                        {eligibilityProgramCode.includes('E13') ? <><strong>E13:</strong> Eligibility Based on Income <br></br></> : ''}
                        {eligibilityProgramCode.includes('E15') ? <><strong>E15:</strong>  Veterans Pension or Survivors
Pension <br></br></> : ''}
                        {eligibilityProgramCode.includes('E50') ? <><strong>E50:</strong> School Lunch/Breakfast Program <br></br></> : ''}
                        {eligibilityProgramCode.includes('E51') ? <><strong>E51:</strong> Federal Pell Grant <br></br></> : ''}
                        {eligibilityProgramCode.includes('E54') ? <><strong>E54:</strong> Special Supplemental Nutrition
                            Program for Women, Infants, and Children
(WIC) <br></br></> : ''}
                        <strong>Status:</strong>  {item.applicationVerificationStatus} <br></br>
                        <strong>Initials:</strong>  {item.applicantLegalName}<br></br>
                        <strong>Signature:</strong>  {item.applicantLegalSignature}<br></br>
                    </>
                    return { ...item }
                });
                setAcpApplications(applicationList);
                setFilteredAcpApplications(applicationList);
                handleDataRefresh();
            }

        })
    }

    useEffect(() => {
        loadAcpAccessToken();
        //loadFiggerACPApplications();
    }, []);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers ACP"} currentLink={"ACP Individuals"}></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    ACP Individuals
                </h1>
            </Grid>

            <Grid container row className={classes.container}>

                <div className={classes.statusBoxContainer}>

                    {statusCheckbox.map((item, i) => (
                        <>
                            <FormControlLabel
                                className={classes.checkBoxFormLabel}
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                        className={classes.checkBoxBtn}
                                        onClick={(e) => { handleStatusClick(e, item.status) }}
                                    />
                                }
                                label={<>
                                    <div className={item.status == "all" ? classes.statusBoxes + " " + "All" :
                                        item.status == "nv_pending" ? classes.statusBoxes + " " + "Pending" :
                                            item.status == "attention_req" ? classes.statusBoxes + " " + "AttentionReq" :
                                                item.status == "nv_failed" ? classes.statusBoxes + " " + "NVFailed" :
                                                    item.status == "eligible" ? classes.statusBoxes + " " + "Eligible" :
                                                        item.status == "switch" ? classes.statusBoxes + " " + "Switch" :
                                                            item.status == "enrolled" ? classes.statusBoxes + " " + "Enrolled" :
                                                                item.status == "enrolled_error" ? classes.statusBoxes + " " + "EnrolledError" : ''


                                    }>
                                        <img src={item.Icon} />
                                        <div className={classes.statusBoxContent}>
                                            <h3>{item.value}</h3>
                                            <h2>{acpApplications?.filter(t => t.applicationStatus == item.status).length}</h2>
                                        </div>

                                    </div>
                                </>}
                            />
                        </>
                    ))}

                </div>

            </Grid>

            <Grid row className={classes.gridHeader}>

                <div className={classes.gridActions} style={{ marginRight: '7px' }} >
                    <InputBase
                        id="search"
                        name="search"
                        value={searchFilter}
                        placeholder="Search"
                        className="grid-search-input"
                        startAdornment={<SearchIcon />}
                        onChange={handleSearch}
                    />

                </div>

                {/* <div className={classes.gridActions}>
                        <Button className={classes.changeBtn}>Create Shipping Label</Button>
                        <Button className={classes.changeBtn}>Add Manual Shipping</Button>
                </div> */}



            </Grid>

            <Grid row className={classes.container} >
                <SearchGrid columns="ACPIndividual"
                    list={filteredAcpApplications}
                    noRecordMsg="No record exists"
                    Icon={true}
                    isUpdate={isDataRefresh}
                    filter={searchFilter}
                />
            </Grid>

            <ActionDialog
                type={actiondialogState.type}
                message={actiondialogState.message}
                actiondialogOpenClose={actiondialogState.showHide}
                onSubmit={actiondialogState.onClickOk}
                onCancel={() =>
                    setActionDialogState(prevState => ({
                        ...prevState, showHide: false
                    }))
                }
                onClose={() => setActionDialogState(prevState => ({
                    ...prevState, showHide: false
                }))

                }
            />

        </>
    )

}

export default withSnackbar(ACPIndividuals);