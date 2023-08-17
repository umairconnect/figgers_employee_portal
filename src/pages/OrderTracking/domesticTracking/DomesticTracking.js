import React, { useState, useEffect } from 'react'
import {
    Badge,
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    InputBase,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography,
    FormHelperText
} from "@material-ui/core";
import useStyles from "./styles";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
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
import { GetUserInfo } from '../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../Services/APIService';
import CreateShippingLabel from './createShippingLabel/CreateShippingLabel';
import AddManualTracking from './addManualTracking/AddManualTracking';
import ViewShippingDetails from './viewShippingDetails/ViewShippingDetails';
import ViewPrint from './viewPrint/ViewPrint';
import StatusSummary from './statusSummary/StatusSummary';

import { formatDate, formateMdnNumber, numberDisplay, getFormatedDate, orderTrackStatus } from '../../../../src/components/Common/Extensions';
import Loader from './../../../components/Loader/Loader';
import { ActionDialog } from "./../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "./../../../components/Message/Alert";
import moment from 'moment';
import { useLocation, useParams, useHistory } from "react-router-dom";

function DomesticTracking({ trackingType, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    let history = useHistory();
    const [historyTrackingNumber, setHistoryTrackingNumber] = useState(history.location?.state?.trackingNumber);
    const [orderTrackShipmentInfo, setOrderTrackShipmentInfo] = useState();
    const [trackLabelImage, setTrackImageLabel] = useState('');
    const [type, setType] = useState(trackingType ? trackingType :'domesticTracking');
    //action dialog
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })
    const [shippingDetails, SetShippingDetails] = useState(false);

    const [statusDialogSummary, setStatusDialogSummary] = useState(false);

    const statusDialogSummaryClose = () => {
        setStatusDialogSummary(false)
    }

    const statusDialogSummaryOpen = () => {
        setStatusDialogSummary(true)
    }

    const openShipmentDetailsDialog = () => {
        SetShippingDetails(true)
    }
    const closeShipmentDetailsDialog = () => {
        SetShippingDetails(false)
    }
    const [viewShipmentLabelPrint, setViewShipmentLabelPrint] = useState(false);
    const openShipmentLabelPrintDialog = () => {
        setViewShipmentLabelPrint(true)
    }
    const closeShipmentLabelPrintDialog = () => {
        setViewShipmentLabelPrint(false)
    }
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

    const [errorMessages, setErrorMessages] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [state, setState] = useState({
        confirmed: '', shipped: '', inTransit: '', delivered: '', returned: '',
        claimed: '', voided: '', deleted: ''
    });
    const [orderTracking, setOrderTracking] = useState([]);
    const [filteredOrderTracking, setFilteredOrderTracking] = useState([{}]);
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [shippingLabelDialog, setShippingLabelDialog] = useState(false);
    const [addManualTracking, setAddManualTracking] = useState(false);

    const [validated, setValidated] = useState(false);

    const closeManualTrackingDialog = () => {
        setAddManualTracking(false)
    }

    const openManualTrackingDialog = () => {
        setOrderTrackShipmentInfo({});
        setAddManualTracking(true)
    }

    const closeShippinglabelDialog = () => {
        setShippingLabelDialog(false);
    }

    const handleSuccessClose = (message) => {
        setType('')
        setOrderTrackShipmentInfo({});
        setAddManualTracking(false)
        setShippingLabelDialog(false);
        showMessage("Success", message, "success", 3000);
        loadShipmentGrid();
    }

    const openShippinglabelDialog = () => {
        setType(trackingType);
        setOrderTrackShipmentInfo({});
        setShippingLabelDialog(true);
    }

    const openShippingReturnLabelDialog = () => {
        setType(trackingType);
        setOrderTrackShipmentInfo({});
        setShippingLabelDialog(true);
    }

    const DomesticOrderTrackingTest = [
        {
            CreatedBy: "Sarah",
            TrackingNumber: "1Z224F540395382703",
            FullName: "John Doe",
            PhoneNumer: "(919) 675-0932",
            Status: "Shipper Created A Label, UPS",
            LastScan: "Monday, January 30, 2023 06:00 PM",
        }
    ]

    const statusCheckbox = [
        {
            value: 'Confirmed',
            status: 'M',
            numbers: '00',
            Icon: TrackingConfirmed,

        },
        {
            value: 'Shipped',
            status: 'P',
            numbers: '00',
            Icon: TrackingShipped,

        },
        {
            value: 'In Transit',
            status: 'I',
            numbers: '00',
            Icon: TrackingTransit,

        },
        {
            value: 'Delivered',
            status: 'D',
            numbers: '00',
            Icon: TrackingDelivered,

        },
        {
            value: 'Returned',
            status: 'RS',
            numbers: '00',
            Icon: TrackingReturned,

        },
        {
            value: 'Claimed',
            status: 'Claimed',
            numbers: '00',
            Icon: TrackingClaimed,

        },
        {
            value: 'Void',
            status: 'MV',
            numbers: '00',
            Icon: TrackingVoid,

        },
        //{
        //    value: 'Deleted',
        //    status: 'Deleted',
        //    numbers: '00',
        //    Icon: TrackingDeleted,
        //},

    ]
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const loadShipmentGrid = () => {
        var obj = { trackingType: trackingType};
        PostDataAPI("telispire/updateShipmentActivityStatuses", obj).then((result) => { })
        setIsLoading(true);
        PostDataAPI("telispire/loadShipmentTrackingGrid", obj).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                console.log(result.data);

                var orderTackingList = result.data.map((item, i) => {
                    item.statusLabel = orderTrackStatus(item.status);
                    item.shipPhone = formateMdnNumber(item.phone);
                    item.lastScanned = formatDate(item.lastScanDateTime) + '  ' + getFormatedDate(item.lastScanDateTime,'hh:mm A')

                    return { ...item }
                });
                setOrderTracking(orderTackingList);
                setFilteredOrderTracking(orderTackingList);
                setValue(historyTrackingNumber ? historyTrackingNumber : '');
                handleDataGridUpdate();
                
                   
            } else {
                setOrderTracking([]);
                setFilteredOrderTracking([]);
                handleDataGridUpdate();
            }

        })
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
            setFilteredOrderTracking(orderTracking.filter(o => lstStatus.some(s => s == o.status)));
        }
        else {
            setFilteredOrderTracking(orderTracking);
        }

        handleDataGridUpdate();
    }
    const handleActionClick = (key, item) => {
        if (key == 'delete') {
            showActionDialog("Once deleted, this shipment order will be Voided from UPS. Are you sure you want to delete this order tracking?", "confirm", function () {
                deleteCustomerOrder(item);
            });
        } else if (key == 'updateRecord') {
            setType(item.type)
            setOrderTrackShipmentInfo(item)
            setAddManualTracking(false)
            setShippingLabelDialog(true);
        }
        else if (key == 'details') {
            setOrderTrackShipmentInfo(item)
            openShipmentDetailsDialog();
        }
        else if (key == 'statusSummary') {
            setOrderTrackShipmentInfo(item)
            setStatusDialogSummary(true);
        }
        else if (key == 'printLabel') {
            if (item.graphicImage && item.graphicImage.length > 0) {
                setOrderTrackShipmentInfo(item)
                setAddManualTracking(false)
                setViewShipmentLabelPrint(true)
            } else {
                if (item.status == 'D') {
                    showMessage("Error", "Label is unavailable -- all the packages of the shipment have been sent to the destination address", "error", 3000);
                } else {
                    showMessage("Error", "Label is unavailable", "error", 3000);
                }
            }
        }
    }

    const deleteCustomerOrder = (item) => {
        var params = {
            trackingId: item.trackingId + ""
        }
        PostDataAPI("telispire/deleteShipmentTrackingDetails", params).then((result) => {
            if (result.success) {
                showMessage("Success", "Record deleted successfully", "success", 3000);
                loadShipmentGrid();
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const handleSuccessInquiryNumberValidation = (_record, trackingNumber) => {
        setType(trackingType)
        var inquiryNumber = trackingNumber;
        var orderState = _record?.shipment[0]?.package[0]?.activity[0]?.status?.type;
        var orderLastScanDate = _record?.shipment[0]?.package[0]?.activity[0]?.date;
        var orderLastScanTime = _record?.shipment[0]?.package[0]?.activity[0]?.time;
        var lastScanDateTime = moment(orderLastScanDate + ' ' + orderLastScanTime, 'YYYYMMDD HHmmss').toDate();

        const params = {
            trackingNumber: inquiryNumber,
            lastScanDateTime: lastScanDateTime,
            status: orderState ? orderState : ''
        }
        setOrderTrackShipmentInfo(params)
        setAddManualTracking(false)
        setShippingLabelDialog(true);
    }

    const validateReset = () => {
        setType('')
        setValidated(false)
    }

    const recoverLabel = () => {
        var obj = { orderInquiryNumber: '1Z12345E8791315509' };
        PostDataAPI("telispire/labelRecovery", obj).then((result) => { })
    }

    const voidShipment = () => {
        var obj = { orderInquiryNumber: '1Z12345E0390817264' };
        PostDataAPI("telispire/shipmentVoid", obj).then((result) => { })
    }
    const [searchFilter, setValue] = useState('');
    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate()
        }
    }
    // Function to clear the input field
    const handleClearInput = (name) => {
        setValue('');
        handleDataGridUpdate();
    };

   

    useEffect(() => {
        loadShipmentGrid();
    }, [trackingType]);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Order Tracking"} isBack={true} currentLink={trackingType == 'domesticTracking'?'Domestic':trackingType == 'returnLabel'?'Return Label':'International'}></Breadcrums>
                    </Grid>
                </Grid>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Shipping & Tracking - {trackingType == 'domesticTracking' ? 'Domestic' : trackingType == 'returnLabel' ? 'Return' : 'International'}
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
                                    <div className={item.status == "M" ? classes.statusBoxes + " " + "Confirmed" :
                                        item.status == "P" ? classes.statusBoxes + " " + "Shipped" :
                                            item.status == "I" ? classes.statusBoxes + " " + "InTransit" :
                                                item.status == "D" ? classes.statusBoxes + " " + "Delivered" :
                                                    item.status == "RS" ? classes.statusBoxes + " " + "Returned" :
                                                        item.status == "Claimed" ? classes.statusBoxes + " " + "Claimed" :
                                                            item.status == "Deleted" ? classes.statusBoxes + " " + "Deleted" :
                                                                item.status == "MV" ? classes.statusBoxes + " " + "Void" : ''


                                    }>
                                        <img src={item.Icon} />
                                        <div className={classes.statusBoxContent}>
                                            <h3>{item.value}</h3>
                                            {item.status == "Deleted" ? <h2>{orderTracking?.filter(t => t.isDeleted).length}</h2>
                                                : <h2>{orderTracking?.filter(t => t.status == item.status).length}</h2>}

                                        </div>

                                    </div>
                                </>}
                            />
                        </>
                    ))}

                </div>

            </Grid>

            <Grid row className={classes.gridHeader}>
                
                <div className={classes.gridActions}>
                    {trackingType == 'domesticTracking' ? <>
                        <Button className={classes.changeBtn} onClick={openShippinglabelDialog} >Create Shipping Label</Button>
                        <Button className={classes.changeBtn} onClick={openManualTrackingDialog}>Add Manual Shipping</Button>
                    </> : trackingType == 'returnLabel' ? <Button className={classes.changeBtn} onClick={openShippingReturnLabelDialog} >Create Return Label</Button>:''}
                </div>

                <div className={classes.gridActions} style={{ marginRight: '7px' }} >
                    <InputBase
                        id="search"
                        name="search"
                        value={searchFilter}
                        placeholder="Search"
                        className="grid-search-input"
                        endAdornment={searchFilter ? <ClearIcon style={{cursor: 'pointer'}} onClick={() => { handleClearInput('search') }} /> : ''}
                        startAdornment={<SearchIcon />}
                        onChange={handleSearch}
                    />
                </div>
            </Grid>

            <Grid row className={classes.container} >
                <SearchGrid columns="DomesticOrderTracking"
                    list={filteredOrderTracking}
                    noRecordMsg="No tracking exists"
                    Icon={true}
                    onActionClick={handleActionClick}
                    isUpdate={isDataGridUpdate}
                    filter={searchFilter}
                />
            </Grid>

            {shippingLabelDialog ?
                <CreateShippingLabel
                    dialogOpenClose={shippingLabelDialog}
                    handleClose={closeShippinglabelDialog}
                    trackNumberDetails={orderTrackShipmentInfo}
                    trackingType={trackingType}
                    handleSuccessClose={handleSuccessClose}
                ></CreateShippingLabel> :
                ''}

            {shippingDetails ?
                <ViewShippingDetails
                    dialogOpenClose={shippingDetails}
                    handleClose={closeShipmentDetailsDialog}
                    orderId={orderTrackShipmentInfo.orderId}
                >
                </ViewShippingDetails>
                : ''
            }

            {statusDialogSummary ?
                <StatusSummary
                    dialogOpenClose={statusDialogSummaryOpen}
                    handleClose={statusDialogSummaryClose}
                    trackNumberDetails={orderTrackShipmentInfo}
                >
                </StatusSummary> : ''
            }

            {addManualTracking ?
                <AddManualTracking
                    dialogOpenClose={addManualTracking}
                    handleClose={closeManualTrackingDialog}
                    successInquiryNumber={handleSuccessInquiryNumberValidation}
                ></AddManualTracking> : ''}
            {viewShipmentLabelPrint ?
                <ViewPrint
                    dialogOpenClose={viewShipmentLabelPrint}
                    handleClose={closeShipmentLabelPrintDialog}
                    trackNumberDetails={orderTrackShipmentInfo} >

                </ViewPrint>
                : ''}


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

export default withSnackbar(DomesticTracking);