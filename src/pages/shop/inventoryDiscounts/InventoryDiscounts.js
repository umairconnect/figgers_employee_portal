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
import { SelectField } from "../../../components/InputField/InputField";
import CostIcon from "../../../assets/img/shop/costIcon.svg"
import TotalSell from "../../../assets/img/shop/totalSell.svg";
import Revenue from "../../../assets/img/shop/revenue.svg";
import Profit from "../../../assets/img/shop/profit.svg";
import AddIcon from '@material-ui/icons/Add';
import AddNewItem from "./addNewItem/AddNewItem";
import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";
import { FormatColorResetSharp } from "@material-ui/icons";
import ProductIcon from "../../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../../assets/img/shop/productIcon2.svg";
import NumbersOfPurchase from "../../../assets/img/shop/numbersOfPurchase.svg";
import CancelOrder from "../../../assets/img/shop/cancelOrder.svg";
import ReturnIcon from "../../../assets/img/shop/returnIcon.svg"
import { PostDataAPI } from '../../../Services/APIService';
import DialogLoader from '../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../components/Message/Alert";

import TrackingConfirmed from "../../../assets/img/icons/trackingConfirmed.svg";
import TrackingShipped from "../../../assets/img/icons/trackingShipped.svg";
import TrackingTransit from "../../../assets/img/icons/trackingTransit.svg";
import TrackingDelivered from "../../../assets/img/icons/trackingDelivered.svg";
import StockBoxFew from "../../../assets/img/shop/stockBoxFew.svg";
import StockBoxLow from "../../../assets/img/shop/stockBoxLow.svg";
import StockBoxAverage from "../../../assets/img/shop/StockBoxAverage.svg";
import StockBoxGoodStock from "../../../assets/img/shop/StockBoxGoodStock.svg";
import { formatCurrency } from '../../../../src/components/Common/Extensions';
import { ActionDialog } from "./../../../components/ActionDialog/ActionDialog";

function InventoryDiscount({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [addNewItemDialog, setAddNewItemDialog] = useState(false);
    const [orderTracking, setOrderTracking] = useState([]);
    const [state, setState] = useState({ salesFilter: 'this_month', purchaseFilter: 'this_month' });
    const openNewItemDialog = () => {
        setAddNewItemDialog(true)
    }

    const closeNewItemDialog = () => {
        setAddNewItemDialog(false);
        loadInventory();
    }
    const handleSuccessClose = (message) => {
        showMessage("Success", message, "success", 3000);
        closeNewItemDialog()
    }
    const [objProductStats, setObjProductStats] = useState({});
    const [statusCheckbox, setStatusCheckbox] = useState([
        {
            value: 'Very few Stock Item',
            status: 'M',
            Icon: StockBoxFew,
            number: 0,
            lessMsg: 'Less than 3',
        },
        {
            value: 'Low Stock Item',
            status: 'P',
            Icon: StockBoxLow,
            number: 0,
            lessMsg: 'Less than 5',
        },
        {
            value: 'Average Stock Item ',
            status: 'I',
            Icon: StockBoxAverage,
            number: 0,
            lessMsg: 'Less than 8',
        },
        {
            value: 'Good Stock Item',
            status: 'D',
            Icon: StockBoxGoodStock,
            number: 0,
            lessMsg: 'More than 8',
        },


    ]);

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
        //if (lstStatus.length > 0) {
        //    setFilteredOrderTracking(orderTracking.filter(o => lstStatus.some(s => s == o.status)));
        //}
        //else {
        //    setFilteredOrderTracking(orderTracking);
        //}

        //handleDataGridUpdate();
    }


    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    });
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
    const deleteShopInventory = (item) => {
        showActionDialog("Are you sure you want to delete this product?", "confirm", function () {
            deleteProduct(item);
        });
    }
    const deleteProduct = (item) => {

        setIsLoading(true);
        
        PostDataAPI("product/delete", item, true).then((result) => {
            if (result.success) {
                if (result.data) {
                     showMessage("Success", "Product deleted successfully", "success", 3000);
                    loadInventory();
                }
                else {
                    showMessage("Error", "Error deleting product, please contact administrator", "error", 3000);
                }
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);

        })

    }
    const [objSelectedProduct, setObjSelectedProduct] = useState({});
    const editShopInventory = (item) => {
        setIsLoading(true);
        PostDataAPI("product/get", item.productId).then((result) => {
            if (result.success && result.data) {
                setObjSelectedProduct(result.data);
                openNewItemDialog();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const [totalCost, setTotalCost] = useState(0);
    const [lstInventory, setLstInventory] = useState([]);

    //[
    //    {
    //        SrNo: "234383",
    //        Product: <> <img src={ProductIcon} /> "Figgers F Buds Pro" </>,
    //        Description: "F-Buds Pro",
    //        Quantity: "02",
    //        Price: "$90"
    //    },
    //    {
    //        SrNo: "234383",
    //        Product: <> <img src={ProductIcon2} /> "Figgers F Buds Pro" </>,
    //        Description: "Figgers DX  Mobile Phone",
    //        Quantity: "02",
    //        Price: "$90"
    //    }
    // ]
    const daysFilter = [
        {
            value: 'Today',
            label: 'today'
        },

        {
            value: 'this_week',
            label: 'This Week'
        },
        {
            value: 'this_month',
            label: 'This Month'
        },

    ]
    const loadInventory = () => {
        setIsLoading(true);
        PostDataAPI("product/getInventoryStats").then((result) => {
            if (result.success && result.data) {
                setLstInventory(result.data.lstInventory);
                setObjProductStats(result.data.objProductStats);
                var lstStockStats = statusCheckbox;
                lstStockStats = lstStockStats.map((item, i) => {
                    if (i === 0) {
                        item.number = result.data.objProductStats.fewStock;
                    }
                    else if (i === 1) {
                        item.number = result.data.objProductStats.lowStock;
                    }
                    else if (i === 2) {
                        item.number = result.data.objProductStats.averageStock;
                    }
                    else {
                        item.number = result.data.objProductStats.goodStock;
                    }
                    return item;
                })
                setStatusCheckbox(lstStockStats);
                handleDataGridUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        loadInventory();
    }, []);
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers Shop"} currentLink="Inventory"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <DialogLoader></DialogLoader> : ''}

            <Grid container className={classes.container}>

                <h1 className={classes.heading}>
                    Figgers Inventory
                </h1>
            </Grid>
            <Grid row className={classes.container}>
                <Grid container>
                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Sales Overview</p>
                                <div className={classes.FilterArea}>
                                    <SelectField
                                        name="saleOverview"
                                        id="saleOverview"
                                        size="small"
                                        placeholder="Select"
                                        options={daysFilter}
                                        onChange={handleSelectChange}
                                        value={"this_month"}
                                    />
                                </div>
                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.financialBox}>
                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={CostIcon} />
                                        <p>Cost</p>
                                        <h2>{formatCurrency(objProductStats?.salesCost)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={TotalSell} />
                                        <p>Total Sell</p>
                                        <h2>{objProductStats?.totalSales}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={Revenue} />
                                        <p>Revenue</p>
                                        <h2>{formatCurrency(objProductStats?.totalRevenue)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={Profit} />
                                        <p>Profit</p>
                                        <h2>{formatCurrency(objProductStats?.totalProfit)}</h2>
                                    </Grid>
                                </Grid>

                            </div>


                        </Paper>
                    </Grid>

                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Paper className={classes.paper}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Purchase Overview</p>
                                <div className={classes.FilterArea}>
                                    <SelectField
                                        name="saleOverview"
                                        id="saleOverview"
                                        size="small"
                                        placeholder="Select"
                                        options={daysFilter}
                                        onChange={handleSelectChange}
                                        value={"this_month"}
                                    />
                                </div>
                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.financialBox}>
                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={NumbersOfPurchase} />
                                        <p>Number of Purchase</p>
                                        <h2>{objProductStats?.totalPurchases}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={CancelOrder} />
                                        <p>Cancel Order</p>
                                        <h2>{objProductStats?.cancelOrders}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={CostIcon} />
                                        <p>Cost</p>
                                        <h2>{formatCurrency(objProductStats?.totalPurchaseCost)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3}>
                                        <img src={ReturnIcon} />
                                        <p>Returns</p>
                                        <h2>{objProductStats?.totalReturns}</h2>
                                    </Grid>
                                </Grid>

                            </div>


                        </Paper>
                    </Grid>
                </Grid>

                <Grid container>

                    <Grid item xs={9} md={9} sm={9} lg={9}>
                        <Grid container>
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
                                                <div className={item.status == "M" ? classes.statusBoxes + " " + "viewStock" :
                                                    item.status == "P" ? classes.statusBoxes + " " + "lowStock" :
                                                        item.status == "I" ? classes.statusBoxes + " " + "averageStoke" :
                                                            item.status == "D" ? classes.statusBoxes + " " + "goodStoke" : ''


                                                }>
                                                    <img src={item.Icon} />
                                                    <div className={classes.statusBoxContent}>
                                                        <h3>{item.value}</h3>
                                                        <h2>{item.number}</h2>
                                                        <p className={classes.SmText}>{item.lessMsg}</p>
                                                    </div>

                                                </div>
                                            </>}
                                        />
                                    </>
                                ))}

                            </div>
                        </Grid>
                    </Grid>

                    <Grid item xs={3} md={3} sm={3} lg={3}>
                        <div className={classes.BigButton} onClick={openNewItemDialog}>
                            <div className={classes.AddIcon}> <AddIcon /> </div>
                            <div>
                                <h1>Add</h1>
                                <h3>Add Items </h3>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </Grid>

            <Grid row className={classes.container}>
                <Paper className={classes.paper}>

                    <div className={classes.paperTop}>
                        <p className={classes.paperHeading}>Inventory</p>
                        <div className={classes.FilterArea}>

                        </div>
                    </div>

                    <div className={classes.paperBottom}>
                        <SearchGrid
                            columns="ShopInventory"
                            list={lstInventory}
                            noRecordMsg="No inventory exist"
                            Icon={true}
                            isUpdate={isDataGridUpdate}
                            onDeleteClick={deleteShopInventory}
                            onEditClick={editShopInventory}
                            isSearchAble={true}
                        />
                    </div>
                </Paper>

            </Grid>

            {addNewItemDialog ?
                <AddNewItem
                    dialogOpenClose={openNewItemDialog}
                    handleClose={closeNewItemDialog}
                    handleSuccessClose={handleSuccessClose}
                    data={objSelectedProduct} />
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
export default withSnackbar(InventoryDiscount);