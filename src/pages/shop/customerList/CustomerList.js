import React, { useEffect, useState } from "react";
import {
    Grid
} from "@material-ui/core";

import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";

import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";

import CustomerOne from "../../../assets/img/shop/customerOne.svg";
import CustomerTwo from "../../../assets/img/shop/customerTwo.svg";
import Stopwatch from "../../../assets/img/icons/stopwatch.svg";
import DialogLoader from '../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../components/Message/Alert";
import Loader from '../../../components/Loader/Loader';
import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../Services/APIService';
import UserPlaceholder from "../../../assets/img/userPlaceholder.svg";
import { formatDateTime, formateMdnNumber } from '../../../../src/components/Common/Extensions';

function CustomerList({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isDataRefresh, setIsDataRefresh] = useState(false);

    const handleDataRefresh = () => {
        setIsDataRefresh(!isDataRefresh);
    }

    const [customerList, setCustomerList] = useState([
        //{
        //    Sr: "1",
        //    customerName: <> <img src={CustomerOne} /> John doe </>,
        //    phone: "202-555-0162",
        //    email: "johndoe@gmail.com",
        //    order: "4k Tv",
        //    Date: "Monday June 14",

        //},
        //{
        //    Sr: "2",
        //    customerName: <> <img src={CustomerTwo} /> Alex Hartman </>,
        //    phone: "232-555-4452",
        //    email: "alexHartman555@gmail.com",
        //    order: "Figger F3",
        //    Date: "Saturday June 20",

        //},
    ]);

    let history = useHistory();

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const loadFiggCustomers = () => {
        setIsLoading(true)
        PostDataAPI("figgorder/loadFiggCustomerGrid").then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                setCustomerList(
                    result.data.map((item, i) => {
                        //item.customerName = <> <img className={item.profileImage ? '' : 'placeholder'} src={item.profileImage ? item.profileImage : UserPlaceholder} /> {item.customerName} </>
                        item.phone = formateMdnNumber(item.phone)
                        return { ...item }
                    }));
                handleDataRefresh();
            }

        })
    }



    const [orderList, setorderList] = useState([]);


    useEffect(() => {
        loadFiggCustomers();
    }, []);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Shop"} currentLink="Customer"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>


            <Grid container className={classes.container}>
                {customerList.length > 0 ?
                    <h1 className={classes.heading}>
                        Recent Customers
                    </h1> : ''}
            </Grid>

            <Grid container className={classes.container}>
                <Grid container>
                    {customerList.slice(0, 8).map((item, i) => {
                        return (
                            <Grid item lg={2} sm={2} md={2}>
                                <div className={classes.customerBox}>
                                    <div className="avatarContainer">
                                          <img className={item.profileImage ? '' : 'placeholder'} src={item.profileImage ? '.'+item.profileImage : UserPlaceholder} />
                                    </div>
                                    <p style={{ display: 'contents' }}>{item.customerName} </p>
                                    <p>{formateMdnNumber(item.phone)}</p>
                                    <a>{item.email}</a>
                                    {/*<p>{item.products}</p>*/}
                                </div>
                            </Grid>
                        )

                    })}

                </Grid>

            </Grid >


            <Grid row className={classes.container}>
                <SearchGrid
                    columns="customerList"
                    list={customerList}
                    noRecordMsg="No customer exist"
                    isUpdate={isDataRefresh}
                    Icon={true}
                    isSearchAble={true}
                />
            </Grid>
        </>
    )
}
export default withSnackbar(CustomerList);