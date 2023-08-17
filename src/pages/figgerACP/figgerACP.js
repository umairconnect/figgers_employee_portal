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

import TopSpacer from "../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../components/BreadCrums/breadcrums";
import AddIcon from '@material-ui/icons/Add';
import SearchGrid from "../../components/table/SearchGrid";

import useStyles from "./styles";

import ProductIcon from "../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../assets/img/shop/productIcon2.svg";
import Stopwatch from "../../assets/img/icons/stopwatch.svg";
import Calendar from "../../assets/img/icons/calendar.svg";


import DialogLoader from '../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../components/Message/Alert";

import ApplicantChart from "./chart/ApplicantChart";

import { useLocation, useParams, useHistory } from "react-router-dom";

function FiggerACP({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const [orderTracking, setOrderTracking] = useState([]);

    let history = useHistory();

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);

    const [totalCost, setTotalCost] = useState(0);

    const FiggerACP = [
        {
            productImg: <> <img src={ProductIcon} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon2} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon} /> </>,
            ID: "234383",
            ProductName: <> Figgers Tablet</>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            Status: "Pending",
            DateTime: "06:00 PM",

        },
    ]

    const CorporateListing = [
        {
            ListName: <><img src={ProductIcon} /> Broward Community Public </>,
            ListingStatus: "Active",
            corporateListingAction: "Figgers Tablet",
        },
        {
            ListName: <><img src={ProductIcon2} /> Broward Community Public </>,
            ListingStatus: "Active",
            corporateListingAction: "Figgers Tablet",
        },
      
    ]

    const ShipmentListing = [
        {
            id: "B2864-46420",
            shipmentImg: <><img src={ProductIcon} /> </>,
            status: "Shipped",
            date: "June 14, 2023",
        },
        {
            id: "B2864-46420",
            shipmentImg: <><img src={ProductIcon} /> </>,
            status: "Shipped",
            date: "June 14, 2023",
        },
    ]

    const clickOrderRow = (key, item) => {
        history.push("/app/order")
    }

    useEffect(() => {

    }, []);
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers ACP"} currentLink=""></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <DialogLoader></DialogLoader> : ''}

            <Grid container className={classes.container}>

                <h1 className={classes.heading}>
                    Figgers ACP
                </h1>
            </Grid>

            <Grid container className={classes.container}>
                <Grid container>
                    {FiggerACP.map((item, i) => {
                        return (
                            <Grid item lg={2} sm={2} md={2}>
                                <div className={classes.recentOrders}>
                                    {item.productImg}

                                    <h4>{item.ProductName}</h4>
                                    <p> {item.ID}  </p>
                                    <p className={"pending"}>{item.Status}</p>
                                    <div className={classes.CalendarDate}>
                                        <h3>
                                            June 7, 2023
                                        </h3>
                                    </div>
                                </div>
                            </Grid>
                        )

                    })}


                </Grid>

            </Grid >

            <Grid row spacing={2} container className={classes.container}>

                <Grid item sm={8} md={8} lg={8}>
                    <Paper className={classes.chartPaper}>
                        <div className={classes.chartTop}>
                            <p className={classes.reviewHeading}>Total Applicants</p>
                            <div className={classes.FilterArea}>
                            </div>
                        </div>
                        <div className={classes.chartBottom}>

                            <div className={classes.graphBottom}>
                                <ApplicantChart></ApplicantChart>
                            </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item sm={4} md={4} lg={4}>
                    <Paper className={classes.chartPaper}>
                        <div className={classes.chartTop}>
                            <p className={classes.reviewHeading}>Total Count</p>
                            <div className={classes.FilterArea}>
                            </div>
                        </div>
                        <div className={classes.chartBottom}>
                            <div className={classes.countData}>
                                <p>Individual Applicants </p>
                                <h2>2137</h2>
                            </div>

                            <div className={classes.countData}>
                                <p style={{color: 'rgba(0, 164, 76, 1)'}}>Organizations</p>
                                <h2 style={{color: 'rgba(0, 164, 76, 1)'}}>36</h2>
                            </div>


                            <div className={classes.countData}>
                                <p style={{color: 'rgba(108, 59, 212, 1)'}}>Affiliates</p>
                                <h2 style={{color: 'rgba(108, 59, 212, 1)'}}>12</h2>
                            </div>

                            
                        </div>
                    </Paper>
                </Grid>


            </Grid>



            <Grid row spacing={2} container className={classes.container}>
                <Grid item sm={6} md={6} lg={6}>
                    <Paper className={classes.chartPaper}>
                        <div className={classes.chartTop}>
                            <p className={classes.reviewHeading}>Corporate Listing</p>
                            <div className={classes.FilterArea}>
                            </div>
                        </div>

                        <div className={classes.chartBottom}>
                         
                                <SearchGrid
                                    columns="CorporateListing"
                                    list={CorporateListing}
                                    noRecordMsg="No List exist"
                                    Icon={true}
                                />

                            
                        </div>
                    </Paper>
                </Grid>

                <Grid item sm={6} md={6} lg={6}>
                    <Paper className={classes.chartPaper}>
                        <div className={classes.chartTop}>
                            <p className={classes.reviewHeading}>Shipments</p>
                            <div className={classes.FilterArea}>
                            </div>
                        </div>

                        <div className={classes.chartBottom}>
                                <SearchGrid
                                    columns="ShipmentListing"
                                    list={ShipmentListing}
                                    noRecordMsg="No shipment exist"
                                    Icon={true}
                                />
                        </div>
                    </Paper>
                </Grid>

            </Grid>


        </>
    )
}
export default withSnackbar(FiggerACP);