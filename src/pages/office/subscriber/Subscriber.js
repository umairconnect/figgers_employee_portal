import React, { useEffect, useState } from "react";
import {
    Grid, Button, InputBase, FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";

import SearchGrid from "../../../components/table/SearchGrid";

import useStyles from "./styles";
import Loader from '../../../components/Loader/Loader';
import CustomerOne from "../../../assets/img/shop/customerOne.svg";
import CustomerTwo from "../../../assets/img/shop/customerTwo.svg";
import UserPlaceholder from "../../../assets/img/userPlaceholder.svg";
import Stopwatch from "../../../assets/img/icons/stopwatch.svg";
import DialogLoader from '../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../components/Message/Alert";

import { useHistory } from "react-router-dom";
import { PostDataAPI } from '../../../Services/APIService';
import { formatDateTime, formateMdnNumber, formatDate, getFormatedDate } from './../../../components/Common/Extensions';

function Subscriber({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [filters, setFilters] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCustomerList, setFilteredCustomerList] = useState();

    const [customerList, setCustomerList] = useState([]);

    let history = useHistory();

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
    const [searchFilter, setValue] = useState('');

    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate()
        }
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
            setFilteredCustomerList(customerList.filter(o => lstStatus.some(s => s == o.status)));
        }
        else {
            setFilteredCustomerList(customerList);
        }

        handleDataGridUpdate();
    }

    // Function to clear the input field
    const handleClearInput = (name) => {
        setValue('');
        handleDataGridUpdate();
    };

    const loadSubscribers = () => {
        let reqData = {
            customerName: "",
            userId: ''
        }
        setIsLoading(true)
        PostDataAPI("customer/loadAllSubscibers", reqData).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data)
                var getCustomerList = result.data.map((item, i) => {
                    item.customerName = item.firstName
                    item.phone = formateMdnNumber(item.accountPhoneNumber)
                    item.expiryStatus = getExpiryStatus(item)
                    item.status = item.accountStatus == 'active' ? 'Active' : 'In Active'
                    item.dateCreated = formatDate(item.dateCreated ? item.dateCreated : item.createDate) + ' ' + getFormatedDate(item.dateCreated ? item.dateCreated : item.createDate, 'hh:mm A')
                    //item.dateCreated = getFormatedDate(item.dateCreated ? item.dateCreated : item.createDate, 'd MMMM,YYYY') + ' | ' + getFormatedDate(item.dateCreated ? item.dateCreated : item.createDate,'hh:mm A')
                    item.completeAddress = item.homeAddress1 ? item.homeAddress1 + ' ' + item.homeAddress2 + ' ,' + item.homeCity + ' ' + item.homeState + ' ' + item.homeZip : ''
                    return { ...item }
                })
                setCustomerList(getCustomerList);
                setFilteredCustomerList(getCustomerList);

                handleDataGridUpdate();
            }

        })
    }

    const getExpiryStatus = (item) => {
        if (!item.isPostpaid && item.packageExpirationDate) {
            return formatDate(item.packageExpirationDate);
        } else if (item.packageExpirationDate == null || !item.isPostpaid && new Date(item.packageExpirationDate) < new Date()) {
            return 'Inactive'
        } else {
            return 'Active'
        }
    }

    const [orderList, setorderList] = useState([]);
    const exportSubscribers = () => {
        let reqData = {
            reportName: "Subscriber Report",
            filter: searchFilter
        }
        setIsLoading(true)
        PostDataAPI("customer/getExportExcel", reqData).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                window.location.assign("." + result.data);

            } else {
                showMessage("Error", result.message, "error", 3000);
            }

        })
    }

    const InActiveFilters = [
        {
            value: 'Active',
            status: 'Active',
        },
        {
            value: 'In Active',
            status: 'In Active',
        },
    ]
    useEffect(() => {
        loadSubscribers();
    }, []);
    return (
        <>

            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Office"} currentLink="Subscribers"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            <Grid container row className={classes.container}>

                <div className={classes.statusBoxContainer}>

                    {InActiveFilters.map((item, i) => (
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
                                    <div className={item.status == "Active" ? classes.statusBoxes + " " + "active" :
                                        item.status == "In Active" ? classes.statusBoxes + " " + "in_active" : ''
                                    }>

                                        <div className={classes.statusBoxContent}>

                                            <h3> {item.status == "Active" ?
                                                <>
                                                    {customerList?.filter(t => t.status == "Active").length}
                                                </> :
                                                item.status == "In Active" ?
                                                    <>
                                                        {customerList?.filter(t => t.status == "In Active").length}
                                                    </> : ''
                                            } <br></br> {item.value}

                                            </h3>
                                        </div>
                                        <img src={item.Icon} />

                                    </div>
                                </>}
                            />
                        </>
                    ))}

                </div>

            </Grid>

            <Grid row className={classes.gridHeader}>
                <div className={classes.gridActions}>
                    <Button className={classes.changeBtn} onClick={exportSubscribers}>Export</Button>
                </div>
                <div className={classes.gridActions} style={{ marginRight: '7px' }} >
                    <InputBase
                        id="search"
                        name="search"
                        value={searchFilter}
                        placeholder="Search"
                        className="grid-search-input"
                        endAdornment={searchFilter ? <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { handleClearInput('search') }} /> : ''}
                        startAdornment={<SearchIcon />}
                        onChange={handleSearch}
                        maxLength="2"
                    />
                </div>

            </Grid>




            <Grid row className={classes.container}>
                <SearchGrid
                    columns="subscriberList"
                    list={filteredCustomerList}
                    noRecordMsg="No subscriber exists"
                    Icon={true}
                    isUpdate={isDataGridUpdate}
                    filter={searchFilter}
                />

            </Grid>


        </>
    )
}
export default withSnackbar(Subscriber);