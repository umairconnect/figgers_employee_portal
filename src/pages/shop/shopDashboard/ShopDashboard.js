import React, { lazy, Suspense, useEffect, useState } from "react";
import {
    Grid, Button,
    CssBaseline,
    Box, AppBar,
    Toolbar, List,
    Typography, Divider,
    IconButton, Badge,
    FormControlLabel, Paper,
    Checkbox,
} from "@material-ui/core";
import moment from 'moment';
import { PostDataAPI } from '../../../Services/APIService';
import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";
import AddIcon from '@material-ui/icons/Add';
import SearchGrid from "../../../components/table/SearchGrid";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useStyles from "./styles";

import ProductIcon from "../../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../../assets/img/shop/productIcon2.svg";
import Stopwatch from "../../../assets/img/icons/stopwatch.svg";
import Calendar from "../../../assets/img/icons/calendar.svg";
import CustomLabel from "../../../assets/img/icons/CustomLabel.svg";

import DealOne from "../../../assets/img/common/deal1.svg";
import DealTwo from "../../../assets/img/common/deal2.svg";
import DealThree from "../../../assets/img/common/deal3.svg";
import DealFour from "../../../assets/img/common/deal1.svg";
import { formatDate, formatDateTime, formateMdnNumber, getFormatedDate } from '../../../../src/components/Common/Extensions.js';
import AddNewDeal from "../dealsDiscounts/addNewDeal/AddNewDeal";

import ImgPlaceholder from "../../../assets/img/shop/ProductPlaceholder.svg";

import DialogLoader from '../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../components/Message/Alert";

import OrderChart from "./../../dashboard/orderchart/OrderChartBarLines";
import PaymentChart from "./chart/paymentChart";
import { useLocation, useParams, useHistory } from "react-router-dom";


function ShopDashboard({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState({ salesFilter: 'this_month', purchaseFilter: 'this_month' });
    const [isLoading, setIsLoading] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [addNewDealDialog, setAddNewDealDialog] = useState();
    const openNewDealDialog = () => {
        setAddNewDealDialog(true)
    }
    const closeNewDealDialog = () => {
        setAddNewDealDialog(false)

    }
    const [orderList, setOrderList] = useState([]);
    const [dealsDiscounts, setDealsDiscounts] = useState([]);
    const [currentTime, setCurrentTime] = useState();

    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);

    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const [orderTracking, setOrderTracking] = useState([]);

    let history = useHistory();


    // const clickOrderRow = (key, item) => {
    //     history.push("/app/order")
    // }

    const loadRecentOrders = () => {
        PostDataAPI("figgorder/getOrderStats").then((result) => {
            if (result.success && result.data) {
                setOrderList(
                    result.data.map((item) => {
                        item.productNames = item.lstOrderItem?.map(product => (product.productName));
                        item.productImages = item.lstOrderItem?.map(product => (product.filePath))
                        return { ...item }
                    }
                    )
                );
            }
            else {
                showMessage("Error", result.message, "error", 3000)
            }
        })
    }

    const loadInventory = (filter) => {
        var param = [filter ? filter : filters.salesFilter];
        PostDataAPI("product/getInventoryStats", param).then((result) => {
            if (result.success && result.data) {

                var inventory = result.data.lstInventory.slice(0, 8);

                setInventoryItems(inventory);
                handleDataGridUpdate();
            }

            else {
                showMessage("Error", result.message, "error", 3000);
            }

        });
    }

    const loadDeals = () => {
        PostDataAPI("figgdeals/getAllDealMedia").then((result) => {
            if (result.success && result.data != null) {
                var data = result.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                setDealsDiscounts(data);
                console.log(result.data)
            }
        })
    }

    const makeCurrentTime = () => {
        const now = moment();
        const hours = now.format('h').toString().padStart(2, '0');
        const minutes = now.format('mm').toString().padStart(2, '0');
        const seconds = now.format('s').toString().padStart(2, '0');
        const meridium = now.format('a').toString().padStart(2, '0');

        const time = `${hours}:${minutes}:${seconds} ${meridium}`;
        setCurrentTime(time);
    };

    const goToInventory = () => {
        history.push({
            pathname: "/app/inventory",
        });

    }
    const clickOrderRow = (item, key) => {
        history.push({
            pathname: "/app/order",
            state: { orderId: item.orderId }
        });
    }


    const currentDate = moment();

    useEffect(() => {
        loadRecentOrders();
        loadInventory();
        loadDeals();
        makeCurrentTime();
        setInterval(makeCurrentTime, 1000);

    }, []);


    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers Shop"} currentLink=""></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <DialogLoader></DialogLoader> : ''}

            <Grid container className={classes.container}>

                <h1 className={classes.heading}>
                    Figgers Shop
                </h1>
            </Grid>

            <Grid container className={classes.container}>
                <Grid container>


                    {orderList.slice(0, 5).map((item, i) => {
                        return (
                            <Grid item lg={2} sm={2} md={2}>
                                <div className={classes.recentOrders} onClick={() => clickOrderRow(item)}>
                                    <img src={item.productImages} alt="product image"></img>
                                    <h4>{item.productNames}</h4>
                                    <p> {item.orderId}  </p>
                                    <p className={"pending"}>{item.orderStatus}</p>
                                    <div className={classes.CalendarDate}>

                                        <p className={classes.DateTime}>
                                            <img src={Stopwatch} />{formatDate(item.createDate)} </p>

                                    </div>
                                </div>
                            </Grid>
                        )

                    })}
                    <Grid item lg={2} sm={2} md={2}>
                        <div className={classes.timeOrders}>
                            <h1>{currentDate.format('Do')}</h1>
                            <p>{currentDate.format('MMMM')}</p>
                            <p className={classes.recentTime}>
                                {currentTime}</p>
                        </div>
                    </Grid>

                </Grid>

            </Grid>

            <Grid row className={classes.container}>
                <Grid spacing={2} container>
                    <Grid item sm={8} md={8} lg={8}>
                        <Paper className={classes.chartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Top 4 Selling Products</p>
                                <div className={classes.topLinks}>

                                    <span style={{ color: '#FE9800' }}>
                                        <span className={classes.servicesUsedDot}></span>  SIMS
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

                    <Grid item sm={4} md={4} lg={4}>
                        <Paper className={classes.chartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Run Discounts and Deals</p>
                                <div className={classes.FilterArea}>
                                </div>
                            </div>
                            <div className={classes.chartBottom}>
                                <Grid container>
                                    {dealsDiscounts.slice(0, 3).map((item) => {
                                        return (
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div className={classes.greyRactBox} style={{ marginRight: '8px' }}>
                                                    <img src={item.filePath} />

                                                </div>
                                            </Grid>
                                        )
                                    })}

                                    <Grid item xs={12} md={6} lg={6}>
                                        <div className={classes.addNewDeal} onClick={openNewDealDialog} style={{ marginRight: '8px' }}>
                                            <AddCircleOutlineIcon />
                                            Add New Deal
                                        </div>
                                    </Grid>
                                </Grid>


                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>



            <Grid row className={classes.container}>
                <Grid spacing={2} container>
                    <Grid item sm={6} md={6} lg={6}>
                        <Paper className={classes.inventorychartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Inventory</p>
                                <div className={classes.FilterArea}>
                                    <Button className={classes.filterBtn} onClick={goToInventory}>View All</Button>

                                </div>
                            </div>

                            <div className={classes.chartBottom}>

                                <SearchGrid
                                    columns="inventoryList"
                                    list={inventoryItems}
                                    noRecordMsg="No List exist"
                                    Icon={true}
                                    isUpdate={isDataGridUpdate}
                                />


                            </div>
                        </Paper>
                    </Grid>

                    <Grid item sm={6} md={6} lg={6}>
                        <Paper className={classes.chartPaper}>
                            <div className={classes.chartTop}>
                                <p className={classes.reviewHeading}>Payments</p>
                                <div className={classes.FilterArea}>
                                </div>
                            </div>

                            <div className={classes.chartBottom} style={{ marginTop: '15px' }}>

                                <div className={classes.graphBottom}>
                                    <PaymentChart></PaymentChart>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>



            {addNewDealDialog ?
                <AddNewDeal
                    dialogOpenClose={openNewDealDialog}
                    handleClose={closeNewDealDialog}
                />
                : ''}


        </>
    )
}

export default withSnackbar(ShopDashboard);