import React, { useEffect, useState } from "react";
import {
    Grid
} from "@material-ui/core";

import TopSpacer from "../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../components/BreadCrums/breadcrums";

import SearchGrid from "../../components/table/SearchGrid";

import useStyles from "./styles";

import CustomerOne from "../../assets/img/shop/customerOne.svg";
import CustomerTwo from "../../assets/img/shop/customerTwo.svg";
import Stopwatch from "../../assets/img/icons/stopwatch.svg";
import DialogLoader from '../../components/Loader/DialogLoader';
import { withSnackbar } from "../../components/Message/Alert";
import Loader from '../../components/Loader/Loader';
import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../Services/APIService';
import UserPlaceholder from "../../assets/img/userPlaceholder.svg";
import { formateMdnNumber, getFormatedDate, formatDate } from '../../../src/components/Common/Extensions';

function Payment({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isDataRefresh, setIsDataRefresh] = useState(false);

    const handleDataRefresh = () => {
        setIsDataRefresh(!isDataRefresh);
    }

    const [userPayments, setUserPayments] = useState([
        //{
        //    Order: "12135",
        //    customerName: "Alax John",
        //    Amount: "125.00",
        //    PaymentType: "Credit Card",
        //    Card: "xxxx-xxxx-xxxx-2253",
        //    billingAddress: "1055 W Baseline Rd # 2055, Mesa, Az, 85210",
        //    status: "Pending",
        //    dataAndTime: "Monday, June 12, 2023",
        //},
        //{
        //    Order: "12136",
        //    customerName: "John doe",
        //    Amount: "75.00",
        //    PaymentType: "Visa",
        //    Card: "xxxx-xxxx-xxxx-2353",
        //    billingAddress: "1055 W Baseline Rd # 2055, Mesa, Az, 85210",
        //    status: "Pending",
        //    dataAndTime: "Monday, May 28, 2023",
        //},
    ]);

    let history = useHistory();

    const clickOrderRow = (item, key) => {
        history.push({
            pathname: "/app/order",
            state: { orderId: item.orderId }
        });
    }

    const loadFiggPayments = () => {
        setIsLoading(true)
        PostDataAPI("figgorder/getCustomerOrderPayments").then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                setUserPayments(
                     result.data.map((item, i) => {
                         item.phone = formateMdnNumber(item.phone)
                         item.customerName = item.customerFirstName+' '+item.customerLastName
                         item.billingAddress = item.address + ', ' + item.city + ' ' + item.state + ' ' + item.zip
                         item.orderAmount = '$' + item.orderAmount
                         //Monday, June 12, 2023
                         item.createDate = formatDate(item.createDate) + '  ' + getFormatedDate(item.createDate,'hh:mm A')
                         item.cardNumberFormated = '*'+item.cardNumber.slice(-4)
                         return { ...item }
                     }));
                handleDataRefresh();
            }

        })
    }

    useEffect(() => {
        loadFiggPayments();
    }, []);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Shop"} currentLink={"Payments"}></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>


            <Grid container className={classes.container}>
                {userPayments.length > 0 ?
                    <h1 className={classes.heading}>
                        Recent Payments
                    </h1> : ''}
            </Grid>

            <Grid container className={classes.container}>
                <Grid container>
                    {userPayments.slice(0, 8).map((item, i) => {
                        return (
                            <Grid item lg={2} sm={2} md={2}>
                                <div className={classes.paymentBox} onClick={() => clickOrderRow(item)}>
                                    
                                    <p style={{ display: 'contents' }}>Order # {item.orderId} </p>
                                    <h3>{item.orderAmount}</h3>
                                    <p className={"pending"}>{item.customerFirstName + ' '+item.customerLastName}</p>
                                    <div className={classes.timerwatch}><img src={Stopwatch} /> {item.createDate}</div>
                                </div>
                            </Grid>
                        )

                    })}

                </Grid>

            </Grid >


            <Grid row className={classes.container}>
                <SearchGrid
                    columns="userPayments"
                    list={userPayments}
                    noRecordMsg="No payment exist"
                    Icon={true}
                    isUpdate={isDataRefresh}
                    isSearchAble={true}
                    onRowClick={clickOrderRow}
                />
            </Grid>
        </>
    )
}
export default withSnackbar(Payment);