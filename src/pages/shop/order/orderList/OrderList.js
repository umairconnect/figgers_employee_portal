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

import TopSpacer from "../../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../../components/BreadCrums/breadcrums";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import SearchGrid from "../../../../components/table/SearchGrid";

import useStyles from "./styles";

import ProductIcon from "../../../../assets/img/shop/productIcon.png";
import ProductIcon2 from "../../../../assets/img/shop/productIcon2.svg";
import Stopwatch from "../../../../assets/img/icons/stopwatch.svg";
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../../components/Message/Alert";

import { useLocation, useParams, useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../../Services/APIService';
import { formatDateTime, formatDate, formateMdnNumber, getFormatedDate } from '../../../../../src/components/Common/Extensions';
import ImgPlaceholder from "../../../../assets/img/shop/ProductPlaceholder.svg";
function OrderList({ ...props }) {
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

    const [recentOrder, setRecentOrder] = useState([]);

    const recentOrderDumi = [
        {
            orderId: "234383",
            product: [
                {
                    productName: <> Figgers F Buds Pro </>,
                    ProductDescription: "F-Buds Pro",
                    color: "Black",
                    filePath: ProductIcon,
                },
                {
                    productName: <> Figgers F Buds 2 </>,
                    ProductDescription: "Figgers F Buds 2 ",
                    color: "white",
                    filePath: ProductIcon,
                },
                {
                    productName: <> Figgers F Buds 3 </>,
                    ProductDescription: "F-Buds Pro",
                    color: "Black",
                    filePath: ProductIcon,
                },
            ],

            CustomerName: "02",
            orderStatus: "Pending",
            createDate: "06:00 PM",

        },
        {
            productImg: <> <img src={ProductIcon2} /> </>,
            orderId: "234383",
            productName: <> Figgers F Buds Pro </>,
            ProductDescription: "F-Buds Pro",
            CustomerName: "02",
            color: "Black",
            orderStatus: "Pending",
            createDate: "06:00 PM",

        },
    ]

    const [orderList, setorderList] = useState([]);

    const clickOrderRow = (item, key) => {
        history.push({
            pathname: "/app/order",
            state: { orderId: item.orderId }
        });
    }
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const loadOrders = () => {
        setIsLoading(true);
        PostDataAPI("figgorder/getOrderStats").then((result) => {

            if (result.success && result.data) {
                setIsLoading(false);
                setorderList(
                    result.data.map((item, i) => {
                        item.productNames = item.lstOrderItem?.map(product => ('<div><img src ="' + (product.filePath ? '.' + product.filePath : ImgPlaceholder) + '" ></img> ' + product.productName + '</div>')).join(' ');
                        item.customerPhone = formateMdnNumber(item.customerPhone);
                        return { ...item }
                    })
                );
                debugger
                console.log(orderList)

                var todayDate = new Date().setHours(0, 0, 0, 0);
                setRecentOrder(result.data.filter(t => new Date(t.createDate).setHours(0, 0, 0, 0) == todayDate));
                handleDataGridUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }

        });
    }

    useEffect(() => {
        sessionStorage.removeItem('order_id')
        loadOrders();
    }, []);
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Shop"} currentLink="Order List"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <DialogLoader></DialogLoader> : ''}


            {recentOrder.length > 0 ?
                <Grid container className={classes.container}>
                    <h1 className={classes.heading}>
                        Recent Orders
                    </h1>
                </Grid>
                : ''
            }
            {recentOrder.length > 0 ?
                <Grid container className={classes.container}>
                    <Grid container>

                    
                        {recentOrder.map((item, i) => {
                            return (
                                <Grid item>
                                    <div className={classes.recentOrders}>
                                        <p><b>Order #  </b> {item.orderId}  </p>

                                        <div style={{ display: 'flex', gap: '13px', justifyContent: 'center', }}>
                                            {item.lstOrderItem && (
                                                <>
                                                    {item.lstOrderItem.map((product, idx) => (
                                                        <>
                                                            <div style={{ display: 'flex', flexFlow: 'column' }}>
                                                                <img src={product.filePath ? product.filePath : ImgPlaceholder} />
                                                                <h4>{product.productName}</h4>
                                                            </div>
                                                        </>
                                                    ))}
                                                </>
                                            )}
                                        </div>

                                        <p className={"pending"}>{item.orderStatus}</p>
                                        <p className={classes.DateTime}> <img src={Stopwatch} /> {formatDateTime(item.createDate)}</p>
                                    </div>
                                </Grid>
                            )

                        })}

                    </Grid>

                </Grid > : ''}


            <Grid row className={classes.container}>


                <SearchGrid
                    columns="orderList"
                    list={orderList}
                    noRecordMsg="No orders exist"
                    Icon={true}
                    onRowClick={clickOrderRow}
                    isUpdate={isDataGridUpdate}
                    isSearchAble={true}
                />



            </Grid>


        </>
    )
}
export default withSnackbar(OrderList);