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
    Select,
    InputBase
} from "@material-ui/core";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
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
import Loader from '../../../components/Loader/Loader';
import { withSnackbar } from "../../../components/Message/Alert";

import TrackingConfirmed from "../../../assets/img/icons/trackingConfirmed.svg";
import TrackingShipped from "../../../assets/img/icons/trackingShipped.svg";
import TrackingTransit from "../../../assets/img/icons/trackingTransit.svg";
import TrackingDelivered from "../../../assets/img/icons/trackingDelivered.svg";
import StockBoxFew from "../../../assets/img/shop/stockBoxFew.svg";
import StockBoxLow from "../../../assets/img/shop/stockBoxLow.svg";
import StockBoxAverage from "../../../assets/img/shop/StockBoxAverage.svg";
import StockBoxGoodStock from "../../../assets/img/shop/StockBoxGoodStock.svg";
import { formatCurrency } from '../../../components/Common/Extensions';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import ImgPlaceholder from "../../../assets/img/shop/ProductPlaceholder.svg";

function InventoryDiscount({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState({ salesFilter: 'this_month', purchaseFilter: 'this_month' });
    const [isLoading, setIsLoading] = useState(false);
    const [addNewItemDialog, setAddNewItemDialog] = useState(false);
    const [state, setState] = useState({ salesFilter: 'this_month', purchaseFilter: 'this_month' });
    const openNewItemDialog = () => {
        setAddNewItemDialog(true);
    }

    const closeNewItemDialog = () => {
        setAddNewItemDialog(false);
        setObjSelectedProduct({});
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
        let lstFiltInventor = [];
        if (lstStatus.length > 0) {
            for (var i = 0; i < lstStatus.length; i++) {
                let invStatus = lstStatus[i];
                let lstResult = [];
                switch (invStatus) {

                    case 'M':
                        lstResult = lstInventory.filter(t => t.quantity < 3);
                        break;
                    case 'P':
                        lstResult = lstInventory.filter(t => t.quantity >= 3 && t.quantity < 5);
                        break;
                    case 'I':
                        lstResult = lstInventory.filter(t => t.quantity >= 5 && t.quantity < 8);
                        break;
                    case 'D':
                        lstResult = lstInventory.filter(t => t.quantity >= 8);
                        break;
                }
                lstFiltInventor.push(...lstResult)
            }
            setFilteredLstInventory(lstFiltInventor);
        }
        else {
            setFilteredLstInventory(lstInventory);
        }

        handleDataGridUpdate();
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
        if (item.price) {
            item.price = parseFloat(item.price);
        }
        if (item.cost) {
            item.cost = parseFloat(item.cost);
        }
        if (item.quantity) {
            item.quantity = parseFloat(item.quantity);
        }
        item.name = '';
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
        }));
        loadInventory(value);
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const [totalCost, setTotalCost] = useState(0);
    const [lstInventory, setLstInventory] = useState([]);
    const [filteredLstInventory, setFilteredLstInventory] = useState([]);

    const daysFilter = [
        {
            value: 'Today',
            label: 'Today'
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
    const loadInventory = (filter) => {
        setIsLoading(true);
        var param = [filter ? filter : filters.salesFilter];
        PostDataAPI("product/getInventoryStats", param).then((result) => {
            if (result.success && result.data) {
                setLstInventory(
                    result.data.lstInventory.map((item, i) => {
                        item.cost = item.cost + '';
                        item.price = item.price + '';
                        item.quantity = item.quantity + '';
                        return { ...item }
                    })
                );

                setFilteredLstInventory(result.data.lstInventory.map((item, i) => {
                    //   item.name = <> <img className={"productImg"} src={item.filePath ? item.filePath : ImgPlaceholder} />  {item.name} </>
                    return { ...item }
                }));

                if (result.data.objProductStats?.totalRevenue > 0) {
                    result.data.objProductStats.totalProfit = result.data.objProductStats.totalRevenue - result.data.objProductStats.salesCost;
                }
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
    const [searchFilter, setValue] = useState('');
    const handleClearInput = (name) => {
        setValue('');
        handleDataGridUpdate();
    };
    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate();
        }

    }
    useEffect(() => {
        loadInventory();
    }, []);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Shop"} isBack={true} currentLink="Inventory"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

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
                                    <Select
                                        size="small"
                                        native
                                        name="salesFilter"
                                        value={filters.salesFilter}
                                        onChange={handleSelectChange}
                                        placeholder="Select"
                                        label="Select"
                                        className={classes.selectBaseInput}
                                    >
                                        {daysFilter.map(option =>
                                            <option value={option.value}>{option.label}</option>
                                        )
                                        }
                                    </Select>
                                    {/*<SelectField*/}
                                    {/*    name="salesFilter"*/}
                                    {/*    id="salesFilter"*/}
                                    {/*    size="small"*/}
                                    {/*    placeholder="Select"*/}
                                    {/*    options={daysFilter}*/}
                                    {/*    onChange={handleSelectChange}*/}
                                    {/*    value={"this_month"}*/}
                                    {/*/>*/}
                                </div>
                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.financialBox}>
                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={CostIcon} />
                                        <p>Cost</p>
                                        <h2>{formatCurrency(objProductStats?.salesCost)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={TotalSell} />
                                        <p>Total Sell</p>
                                        <h2>{objProductStats?.totalSales}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={Revenue} />
                                        <p>Revenue</p>
                                        <h2>{formatCurrency(objProductStats?.totalRevenue)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={Profit} />
                                        <p>Profit</p>
                                        <h2>{formatCurrency(objProductStats?.totalProfit)}</h2>
                                    </Grid>
                                </Grid>

                            </div>


                        </Paper>
                    </Grid>

                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <Paper className={classes.paper + " " + "disabledEvent"}>

                            <div className={classes.paperTop}>
                                <p className={classes.paperHeading}>Purchase Overview</p>
                                <div className={classes.FilterArea}>

                                    <Select
                                        size="small"
                                        native
                                        name="purchaseFilter"
                                        value={filters.purchaseFilter}
                                        onChange={handleSelectChange}
                                        placeholder="Select"
                                        label="Select"
                                        className={classes.selectBaseInput}
                                    >
                                        {daysFilter.map(option =>
                                            <option value={option.value}>{option.label}</option>
                                        )
                                        }
                                    </Select>

                                    {/* <SelectField
                                        name="saleOverview"
                                        id="saleOverview"
                                        size="small"
                                        placeholder="Select"
                                        options={daysFilter}
                                        onChange={handleSelectChange}
                                        value={"this_month"}
                                        className={false}
                                    /> */}
                                </div>
                            </div>

                            <div className={classes.paperBottom}>
                                <Grid container className={classes.financialBox}>
                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={NumbersOfPurchase} />
                                        <p>Number of Purchase</p>
                                        <h2>{objProductStats?.totalPurchases}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={CancelOrder} />
                                        <p>Cancel Order</p>
                                        <h2>{objProductStats?.cancelOrders}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
                                        <img src={CostIcon} />
                                        <p>Cost</p>
                                        <h2>{formatCurrency(objProductStats?.totalPurchaseCost)}</h2>
                                    </Grid>

                                    <Grid item xs={3} md={3} sm={3} lg={3} style={{ textAlign: 'center' }}>
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
                                {/*<h1>Add</h1>*/}
                                <h3>Add Product </h3>
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
                        <Grid container item direction="row" xs={3} sm={3} md={3} lg={3} xl={3} style={{ marginLeft: 'auto' }}>
                            <InputBase
                                id="search"
                                name="search"
                                value={searchFilter}
                                placeholder="Search"
                                className="grid-search-input"
                                endAdornment={searchFilter ? <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { handleClearInput('search') }} /> : ''}
                                startAdornment={<SearchIcon />}
                                onChange={handleSearch}
                            />

                        </Grid>
                    </div>

                    <div className={classes.paperBottom}>
                        <SearchGrid
                            columns="ShopInventory"
                            list={filteredLstInventory}
                            noRecordMsg="No inventory exist"
                            Icon={true}
                            isUpdate={isDataGridUpdate}
                            onDeleteClick={deleteShopInventory}
                            onEditClick={editShopInventory}
                            filter={searchFilter}
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