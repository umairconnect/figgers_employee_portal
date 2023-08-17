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
    FormHelperText
} from "@material-ui/core";

import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";
import { SelectField, TextareaField } from "../../../components/InputField/InputField";
import CostIcon from "../../../assets/img/shop/costIcon.svg"
import TotalSell from "../../../assets/img/shop/totalSell.svg";
import Revenue from "../../../assets/img/shop/revenue.svg";
import Profit from "../../../assets/img/shop/profit.svg";
import AddIcon from '@material-ui/icons/Add';

import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";
import { FormatColorResetSharp } from "@material-ui/icons";
import ProductIcon from "../../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../../assets/img/shop/productIcon2.svg";
import NumbersOfPurchase from "../../../assets/img/shop/numbersOfPurchase.svg";
import CancelOrder from "../../../assets/img/shop/cancelOrder.svg";
import ReturnIcon from "../../../assets/img/shop/returnIcon.svg"
import CustomerInfoIcon from "../../../assets/img/shop/CustomerInfoIcon.svg";
import OrderBuds from "../../../assets/img/shop/orderBuds.svg";
import HomeIcon from "../../../assets/img/shop/homeIcon.svg";
import SendField from "../../../assets/img/shop/sendField.svg";
import ReviewImg from "../../../assets/img/shop/reviewImg.svg";
import ReviewsImages from "../../../assets/img/shop/reviewsImages.svg";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../Services/APIService';
import { withSnackbar } from "./../../../components/Message/Alert";
import { formateMdnNumber, formatNumber, getFormatedDate } from '../../../../src/components/Common/Extensions';
import CreateShippingLabel from '../../OrderTracking/domesticTracking/createShippingLabel/CreateShippingLabel';//createShippingLabel/CreateShippingLabel';
import Loader from '../../../components/Loader/Loader';
import ImgPlaceholder from "../../../assets/img/shop/ProductPlaceholder.svg";
import Scrollbars from "rc-scrollbars";
import CustomerDetails from "./customerDetail/CustomerDetails";
import ViewPrint from '../../OrderTracking/domesticTracking/viewPrint/ViewPrint';


function Order({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState();
    let history = useHistory();
    const [orderId, setOrderId] = useState(history.location?.state?.orderId);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [state, setState] = useState({});
    const [customerDetails, setCustomerDetails] = useState(false)
    const [shippingLabelDialog, setShippingLabelDialog] = useState(false);
    const closeShippinglabelDialog = () => {
        setShippingLabelDialog(false);
    }
    const isEmptyOrSpace = (_value) => {
        // Check if the value is empty or contains only whitespace
        const isEmptyOrSpaces = /^\s*$/.test(_value);
        return isEmptyOrSpaces;
    }
    const [errorMessages, setErrorMessages] = useState({});

    const openCustomerDetails = () => {
        setCustomerDetails(true)
    }

    const closeCustomerDetails = () => {
        setCustomerDetails(false)
    }
    const [orderTrackShipmentInfo, setOrderTrackShipmentInfo] = useState();
    const [viewShipmentLabelPrint, setViewShipmentLabelPrint] = useState(false);
    const openShipmentLabelPrintDialog = () => {
        setViewShipmentLabelPrint(true)
    }
    const closeShipmentLabelPrintDialog = () => {
        setViewShipmentLabelPrint(false)
    }
    const printLabel = () => {
        console.log(state);
        if (state.graphicImage && state.graphicImage.length > 0) {
            setOrderTrackShipmentInfo(state)
            setViewShipmentLabelPrint(true)
        } else {
            if (state.shipmentStatus == 'D') {
                showMessage("Error", "Label is unavailable -- all the packages of the shipment have been sent to the destination address", "error", 3000);
            } else {
                showMessage("Error", "Label is unavailable", "error", 3000);
            }
        }
    }


    const openShippinglabelDialog = () => {
        sessionStorage.setItem('order_id', orderId);
        setShippingLabelDialog(true);
    }
    const handleSuccessClose = (message) => {
        setShippingLabelDialog(false);
        showMessage("Success", message, "success", 3000);
        //loadShipmentGrid();
        loadOrderDetail();
    }
    const handleSelectChange = (e) => {
        const { name, value } = e.target;

        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const ShopInventory = [
        {
            SrNo: "234383",
            Product: <> <img src={ProductIcon} /> "Figgers F Buds Pro" </>,
            Description: "F-Buds Pro",
            Quantity: "02",
            Price: "$90"
        },
        {
            SrNo: "234383",
            Product: <> <img src={ProductIcon2} /> "Figgers F Buds Pro" </>,
            Description: "Figgers DX  Mobile Phone",
            Quantity: "02",
            Price: "$90"
        }
    ]
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
    const [orderList, setOrderList] = useState([]);
    const [shipmentActivityDetails, setShipmentActivityDetails] = useState([]);
    const loadOrderDetail = () => {
        var _orderId = orderId;
        if (sessionStorage.getItem('order_id') != undefined) {
            _orderId = parseInt(sessionStorage.getItem('order_id'));
            setOrderId(_orderId);
            sessionStorage.removeItem('order_id')
        }
        setIsLoading(true);
        PostDataAPI("figgorder/getOrderDetail", _orderId).then((result) => {
            if (result.success && result.data) {
                setState(result.data.objOrderDetail);
                setOrderList(
                    result.data.lstOrderItems.map((item, i) => {
                        //item.productName = <> <img style={{ maxWidth: '45px' }} src={item.filePath ? item.filePath : ImgPlaceholder} /> {item.productName} </>
                        return { ...item }
                    }));

                //setOrderList(result.data.lstOrderItems);
                handleDataGridUpdate();
                loadOrderActivities(result.data.objOrderDetail.trackingNumber, result.data.objOrderDetail.trackingId);
                //var todayDate = new Date().setHours(0, 0, 0, 0);
                //setRecentOrder(result.data.filter(t => new Date(t.createDate).setHours(0, 0, 0, 0) == todayDate));
                //handleDataGridUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const loadOrderActivities = (trackingNumber, trackingId) => {
        setIsLoading(true);
        var obj = { orderInquiryNumber: trackingNumber, trackingId: trackingId, orderId: orderId };
        PostDataAPI("telispire/loadShipmentTrackDetails", obj).then((result) => {
            setIsLoading(false);
            if (result.success) {
                console.log(result.data)
                setShipmentActivityDetails(result.data);
            } else {
            }
        })
    }
    const saveManualComments = () => {
        let errorList = [];
        if (!state.comment || isEmptyOrSpace(state.comment)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorComment: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorComment: false
            }));
        }
        if (errorList < 1) {
            setIsLoading(true);
            var obj = { type: 'Manual', activityDetails: state.comment, trackingId: state.trackingId, orderId: orderId };
            PostDataAPI("figgorder/addOrderActivity", obj).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    loadOrderActivities(state.trackingNumber, state.trackingId);
                    state.comment = '';
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    const handleTrackingNumberClick = () => {
        sessionStorage.setItem('order_id', orderId)
        history.push({
            pathname: "/app/domesticTracking",
            state: { trackingNumber: state.trackingNumber }
        });
    }

    useEffect(() => {
        if (orderId > 0 || sessionStorage.getItem('order_id') != undefined) {
            loadOrderDetail();
        } else {
            history.push({
                pathname: '/app/orderlist'
            });
        }

    }, [isRefresh]);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">

                    <Breadcrums isBack={true} parentLink={"Shop"} currentLink="Order" currentURL="/app/orderlist" childText={"Order Details"}></Breadcrums>

                </Grid>

            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Orders
                </h1>
            </Grid>
            <Grid row className={classes.container}>
                <Grid container>
                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Order# {orderId}{state.trackingNumber ? <>  ~  <span style={{ cursor: 'pointer' }} onClick={() => handleTrackingNumberClick()}>{state.trackingNumber} </span></> : ''}</p>
                                <div className={classes.FilterArea}>
                                    {state.trackingNumber ? <><Button className={classes.changeBtn} onClick={printLabel} >Print Label</Button></> : <Button className={classes.changeBtn} onClick={openShippinglabelDialog} >Create Shipping Label</Button>}

                                </div>
                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.financialBox}>
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <SearchGrid list={orderList} columns="orderDetails" isUpdate={isDataGridUpdate} />
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={3} md={3} sm={3} lg={3}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Customer Information</p>

                            </div>

                            <div className={classes.paperBottom} >
                                <Grid container className={classes.customerInfo} onClick={openCustomerDetails}>
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <img src={state?.customerImage ? '.' + state?.customerImage : CustomerInfoIcon} />

                                        <h2> {state.customerName}</h2>

                                        <p>{formateMdnNumber(state.customerPhone)}</p>
                                        <p>{state.customerEmail}</p>

                                    </Grid>
                                </Grid>

                            </div>


                        </Paper>
                    </Grid>

                    <Grid item xs={3} md={3} sm={3} lg={3}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Home Address</p>

                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.homeAddress}>

                                    <Grid item xs={8} md={8} sm={8} lg={8}>
                                        <h3>{state.customerAddress}<br></br>
                                            {state.customerCity}, {state.customerState} {state.customerZip}</h3>

                                        <h1>Shipping Address</h1>

                                        <h3>{state.shippingAddress}<br></br>
                                            {state.shippingCity} {state.shippingCity ? "," : ""} {state.shippingState} {state.shippingZip}</h3>
                                    </Grid>

                                    <Grid item xs={4} md={4} sm={4} lg={4}>
                                        <img src={HomeIcon} />
                                    </Grid>
                                </Grid>

                            </div>


                        </Paper>
                    </Grid>

                </Grid>

                <Grid container>
                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Grid row>
                            <Paper className={classes.paymentPaper}>

                                <div className={classes.paperTop}>
                                    <p className={classes.paperHeading}>Payment</p>
                                    {/*<div className={classes.FilterArea}>*/}
                                    {/*    <p className={classes.unfulfilLink}>Unfullfilled Orders</p>*/}
                                    {/*</div>*/}
                                </div>

                                <div className={classes.paperBottom}>

                                    <div className={classes.textRows}>
                                        <div className={classes.leftCol}>
                                            <h4>Subtotal </h4>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <h4>${formatNumber(state.paidAmount)}</h4>
                                        </div>
                                    </div>

                                    <div className={classes.textRows}>
                                        <div className={classes.leftCol}>
                                            <h4>Shipping </h4>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <h4>Free</h4>
                                        </div>
                                    </div>

                                    <div className={classes.textRows}>
                                        <div className={classes.leftCol}>

                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <h4>$0</h4>
                                        </div>
                                    </div>

                                    <hr style={{ opacity: 0.3 }}></hr>

                                    <div className={classes.textRows}>
                                        <div className={classes.leftCol}>
                                            <h4>TOTAL </h4>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <h4>${formatNumber(state.paidAmount)}</h4>
                                        </div>
                                    </div>


                                </div>


                            </Paper>
                        </Grid>

                        <Grid row>
                            <Paper className={classes.paymentPaper + " " + "disabledEvent"}>
                                <div className={classes.paperTop} style={{ padding: '15px 15px 7px 15px' }}>
                                    <p className={classes.paperHeading}>Reviews</p>
                                    <div className={classes.FilterArea}>
                                        <img src={ReviewImg} width="130px" />
                                    </div>
                                </div>

                                <div className={classes.paperBottom}>
                                    <Grid container className={classes.reviewContent}>
                                        <Grid item xs={9} md={9} sm={9} lg={9}>
                                            <h2>Hannah (female) 26</h2>
                                            <p>I used F-Buds  Sports and they are  very best product for a regular usage , and very good battery timing. </p>
                                            <img src={ReviewsImages} />
                                        </Grid>
                                        <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: "right" }}>
                                            <h1>2 Days ago</h1>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid>

                    </Grid>

                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Order Timeline</p>
                                <div className={classes.FilterArea}>

                                </div>
                            </div>

                            <div className={classes.paperBottom}>

                                <div className={classes.addfield}>
                                    <TextareaField
                                        name="comment"
                                        rows={3}
                                        placeholder="Add Notes"
                                        MaxLength="2000"
                                        onChange={handleChange}
                                        value={state.comment}
                                    ></TextareaField>
                                    <img src={SendField} onClick={saveManualComments} />

                                </div>

                                <div style={{ padding: '0 30px' }}>
                                    {errorMessages.errorComment && (!state.comment || isEmptyOrSpace(state.comment)) ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter comment
                                    </FormHelperText>) : ('')}
                                </div>


                                <div className={classes.ListContain}>
                                    <Scrollbars autoHeight autoHeightMax={450}>
                                        {shipmentActivityDetails.map((item, i) => {
                                            return (
                                                <>
                                                    <div className={classes.recentActivityList}>

                                                        <Grid row container lg={12} alignItems="center">
                                                            <Grid item row lg={1} className="textRight">  </Grid>
                                                            <Grid item row className={classes.borderContent}><h2>{getFormatedDate(item[0].createDate, 'MMM DD,YYYY')}</h2> </Grid>
                                                        </Grid>
                                                    </div>

                                                    {item.map((activityItem, i) => {
                                                        return (
                                                            <>
                                                                <div className={classes.recentActivityList}>
                                                                    <Grid row container lg={12} alignItems="center">
                                                                        <Grid item row lg={1} className="textRight"> <span className={activityItem.type == "internal" ? classes.smallRadiusCustomer : classes.smallRadius}></span> </Grid>
                                                                        <Grid item row lg={10} className={classes.borderContent}>
                                                                            <div className={classes.flexRow}> <div style={{
                                                                                fontSize: '16px',
                                                                                whiteSpace: 'break-spaces',
                                                                                width: '80%'
                                                                            }}>
                                                                                {activityItem.activityDetails} </div>
                                                                                <span className={classes.contentTime}>
                                                                                    {getFormatedDate(activityItem.createDate, 'hh:mm A')}
                                                                                </span>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>

                                                                </div>

                                                            </>
                                                        )

                                                    })}
                                                </>
                                            )
                                        })}

                                    </Scrollbars>
                                </div>

                            </div>


                        </Paper>
                    </Grid>


                </Grid>

            </Grid >

            {customerDetails ?
                <CustomerDetails
                    dialogOpenClose={customerDetails}
                    handleClose={closeCustomerDetails}
                    customerId={state.customerId}
                ></CustomerDetails> : ''}

            {shippingLabelDialog ?
                <CreateShippingLabel
                    dialogOpenClose={closeShippinglabelDialog}
                    handleClose={closeShippinglabelDialog}
                    orderId={orderId}
                    trackingType={'domesticTracking'}
                    handleSuccessClose={handleSuccessClose}
                    customerId={state.customerId}
                    isFromOrderDetails={true}
                ></CreateShippingLabel> :
                ''}

            {viewShipmentLabelPrint ?
                <ViewPrint
                    dialogOpenClose={viewShipmentLabelPrint}
                    handleClose={closeShipmentLabelPrintDialog}
                    trackNumberDetails={orderTrackShipmentInfo} >

                </ViewPrint>
                : ''}

        </>
    )
}
export default withSnackbar(Order);