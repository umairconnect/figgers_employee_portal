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

import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";
import AddIcon from '@material-ui/icons/Add';
import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";

import ProductIcon from "../../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../../assets/img/shop/productIcon2.svg";
import Stopwatch from "../../../assets/img/icons/stopwatch.svg";
import Calendar from "../../../assets/img/icons/calendar.svg";

import { GetUserInfo } from '../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../Services/APIService';
import Loader from '../../../components/Loader/Loader';
import { withSnackbar } from "./../../../components/Message/Alert";
import { isBefore, isWithinInterval} from 'date-fns';
import { formatDate, formateMdnNumber, numberDisplay, getFormatedDate, orderTrackStatus } from '../../../../src/components/Common/Extensions';
import { ActionDialog } from "./../../../components/ActionDialog/ActionDialog";
import { useLocation, useParams, useHistory } from "react-router-dom";
import AddNewDeal from "./addNewDeal/AddNewDeal";
import ImgPlaceholder from "../../../assets/img/shop/ProductPlaceholder.svg";

function DealsDiscount({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [editItem, setEditItem] = useState({});
    //action dialog 
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })
    const openActionDialog = (dealId) => {
        showActionDialog("Are you sure you want to delete this deal?", "confirm", function () {
            deleteDeal(dealId);
        });
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
    const [filters, setFilters] = useState();
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const [isLoading, setIsLoading] = useState(false);

    const [addNewDealDialog, setAddNewDealDialog] = useState(false);

    const openNewDealDialog = () => {
        setEditItem({});
        setAddNewDealDialog(true)
    }

    const closeNewDealDialog = () => {
        setAddNewDealDialog(false)
    }

    const successClose = (message) => {
        showMessage("Success", message, "success", 3000);
        setAddNewDealDialog(false)
        loadDeals();
    }

    const [orderTracking, setOrderTracking] = useState([]);

    let history = useHistory();

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const [totalCost, setTotalCost] = useState(0);

    const [recentDeals, setRecentDeals] = useState(
        [
            //{
            //    productImg: <> <img src={ProductIcon} /> </>,
            //    Order: "234383",
            //    ProductName: <> Figgers F Buds Pro </>,
            //    ProductDescription: "F-Buds Pro",
            //    CustomerName: "02",
            //    color: "Black",
            //    Status: "Pending",
            //    DateTime: "06:00 PM",

            //},
            //{
            //    productImg: <> <img src={ProductIcon2} /> </>,
            //    Order: "234383",
            //    ProductName: <> Figgers F Buds Pro </>,
            //    ProductDescription: "F-Buds Pro",
            //    CustomerName: "02",
            //    color: "Black",
            //    Status: "Pending",
            //    DateTime: "06:00 PM",

            //},
        ]
    );

    const [deals,setDeals] = useState([
        //{
        //    SrNo: "234383",
        //    DealName: "Discount on Figgers F3",
        //    ProductName: "Figgers F Buds Pro",
        //    ProductImage: <img src={ProductIcon} />,
        //    Discount: "20 %",
        //    Status: "Inprogress",
        //    Datefrom: "Monday, June 10, 2023 06:00 PM",
        //    Dateto: "Monday, June 12, 2023 06:00 PM",

        //},
        //{
        //    SrNo: "234383",
        //    DealName: "Discount on Figgers F3",
        //    ProductName: "Figgers F Buds Pro",
        //    ProductImage: <img src={ProductIcon2} />,
        //    Discount: "30 %",
        //    Status: "Inprogress",
        //    Datefrom: "Monday, June 10, 2023 06:00 PM",
        //    Dateto: "Monday, June 12, 2023 06:00 PM",

        //}
    ])

    const clickOrderRow = (key, item) => {
        history.push("/app/order")
    }

    const dealStatus = (fromDate, toDate) => {
        var currentDate = new Date();
        var _fromDate = new Date(fromDate)
        var _toDate = new Date(toDate)
        var _status = 'Scheduled';
        if (currentDate > _toDate) {
            _status = 'Completed'
        }
        else if (_fromDate <= currentDate && _toDate >= currentDate) {
            _status = 'Active'
        }
        else if (currentDate < _fromDate) {
            _status = 'Scheduled'
        }
        else {
            _status = 'Pending'
        }
       
        return _status
    }

    const handleActionClick = (key, item) => {
        if (key === "Delete") {
            openActionDialog(item.dealId);
        } else if (key === "Edit") {
            //edit the deal
            setEditItem(item);
            setAddNewDealDialog(true)
        } 
    }
    
    const deleteDeal = (dealId) => {
        var obj = { dealId: dealId }
        setIsLoading(true);
        PostDataAPI("figgdeals/delete", obj, true).then((result) => {
            setIsLoading(false);
            if (result.success) {
                showMessage("Success", "Deal deleted successfully", "success", 3000);
                loadDeals();
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const loadDeals = () => {
        setIsLoading(true);
        PostDataAPI("figgdeals/loadGrid").then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                console.log(result.data)
                setRecentDeals(result.data.slice(0,4))
                setDeals(result.data.map(item => {
                    item.discountFormated = item.discount + ' %'
                    item.fromDateFormated = formatDate(item.fromDate ? item.fromDate : item.fromDate)
                    item.toDateFormated = formatDate(item.toDate ? item.toDate : item.toDate)
                    item.status = dealStatus(item.fromDate, item.toDate)
                    return {...item}
                }));
                handleDataGridUpdate();
            }
        })
    }

    useEffect(() => {
        loadDeals();
    }, []);
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Shop"} currentLink="Deals & Discounts"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <Loader></Loader> : ''}
           
            <Grid container className={classes.container}>
                {recentDeals.length > 0 ?
                    <h1 className={classes.heading}>
                        Recent Deals & Discounts
                    </h1> : ''}
            </Grid>

            <Grid container className={classes.container}>
                <Grid container>
                    {recentDeals.map((item, i) => {
                        return (
                            <Grid item lg={2} sm={2} md={2}>
                                <div className={classes.recentOrders}>
                                    <img className={classes.DealImg} src={item.lstAttachedFiles && item.lstAttachedFiles.length > 0 ? '.'+item.lstAttachedFiles[0].filePath: ImgPlaceholder} />
                                  
                                    <p>{item.title}  </p>
                                    <p className={"pending"}>{dealStatus(item.fromDate, item.toDate)}</p>
                                    <div className={classes.CalendarDate}>
                                        <h3> <img src={Calendar} />
                                            {getFormatedDate(item.fromDate, 'MMMM DD')}  <b>to</b>
                                            <img src={Calendar} />
                                            {getFormatedDate(item.toDate, 'MMMM DD')}
                                        </h3>
                                    </div>
                                </div>
                            </Grid>
                        )

                    })}
                    <Grid item lg={3} sm={3} md={3}>
                        <div className={classes.BigButton} onClick={openNewDealDialog}>
                            <div className={classes.AddIcon}> <AddIcon /> </div>
                            <div>
                                <h1>Add</h1>
                               {/* <h3> </h3>*/}
                            </div>
                        </div>
                    </Grid>

                </Grid>

            </Grid >


            <Grid row className={classes.container}>
                <SearchGrid
                    columns="dealsDiscount"
                    list={deals}
                    noRecordMsg="No deal exists"
                    Icon={true}
                    onActionClick={handleActionClick}
                    isUpdate={isDataGridUpdate}
                    isSearchAble={true}
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

            {addNewDealDialog ?
                <AddNewDeal
                    dialogOpenClose={openNewDealDialog}
                    handleClose={closeNewDealDialog}
                    handleSuccessClose={successClose}
                    data={editItem}
                />
                : ''}

        </>
    )
}
export default withSnackbar(DealsDiscount);