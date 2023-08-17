import React, { useState, useEffect } from 'react'
import {
    Badge,
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    InputBase,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography,
    FormHelperText
} from "@material-ui/core";
import useStyles from "./styles";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import SearchGrid from '../../components/table/SearchGrid';
import Breadcrums from '../../components/BreadCrums/breadcrums';
import TopSpacer from '../../components/Common/spacer/TopSpacer';

import NewRequest from "../../assets/img/damageAndRepair/NewRequest.svg";
import Accepted from "../../assets/img/damageAndRepair/Accepted.svg";
import InProcessing from "../../assets/img/damageAndRepair/InProcessing.svg";
import Dispatch from "../../assets/img/damageAndRepair/Dispatched.svg";
import Completed from "../../assets/img/damageAndRepair/Completed.svg";
import Rejected from "../../assets/img/damageAndRepair/Rejected.svg";


import Loader from './../../components/Loader/Loader';
import { ActionDialog } from "./../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "./../../components/Message/Alert";


function DamageRepair({ trackingType, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;

    //action dialog
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })
   

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [state, setState] = useState({
      
    });
    const [orderTracking, setOrderTracking] = useState([]);
    const [filteredOrderTracking, setFilteredOrderTracking] = useState([{}]);
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [damageAndRepair, setDamageAndRepair] = useState([
        {
            Tracking: "Figgers-DRS-6327992a80b81",
            DeviceNumber:  "F20190325-01e",
            CustomerName : "John Kennerson",
            Phone: "(337) 447-3153",
            Email: "kenncom@outlook.com",
        }
    ]);

    const statusCheckbox = [
        {
            value: 'New Requests',
            status: 'NewRequest',
            numbers: '02',
            Icon: NewRequest,

        },
        {
            value: 'Accepted',
            status: 'Accepted',
            numbers: '00',
            Icon: Accepted,

        },
        {
            value: 'In Processing',
            status: 'InProcessing',
            numbers: '00',
            Icon: InProcessing,

        },
        {
            value: 'Dispatched',
            status: 'Dispatch',
            numbers: '00',
            Icon: Dispatch,

        },
        {
            value: 'Completed',
            status: 'Completed',
            numbers: '00',
            Icon: Completed,

        },
        {
            value: 'Rejected ',
            status: 'Rejected',
            numbers: '00',
            Icon: Rejected,
        },
    

    ]
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
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
            setFilteredOrderTracking(orderTracking.filter(o => lstStatus.some(s => s == o.status)));
        }
        else {
            setFilteredOrderTracking(orderTracking);
        }

        handleDataGridUpdate();
    }



   
    const [searchFilter, setValue] = useState('');
    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate()
        }
    }
    // Function to clear the input field
    const handleClearInput = (name) => {
        setValue('');
        handleDataGridUpdate();
    };



    useEffect(() => {
  
    }, []);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Damage & Repair"} isBack={true}></Breadcrums>
                    </Grid>
                </Grid>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Damage & Repair
                </h1>
            </Grid>

            <Grid container row className={classes.container}>

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
                                    <div className={item.status == "NewRequest" ? classes.statusBoxes + " " + "NewRequest" :
                                        item.status == "Accepted" ? classes.statusBoxes + " " + "Accepted" :
                                            item.status == "InProcessing" ? classes.statusBoxes + " " + "InProcessing" :
                                                item.status == "Dispatch" ? classes.statusBoxes + " " + "Dispatch" :
                                                    item.status == "Completed" ? classes.statusBoxes + " " + "Completed" :
                                                        item.status == "Rejected" ? classes.statusBoxes + " " + "Rejected" : ''


                                    }>
                                        <img src={item.Icon} />
                                        <div className={classes.statusBoxContent}>
                                            <h3>{item.value}</h3>
                                            {item.status == "Deleted" ? <h2>{orderTracking?.filter(t => t.isDeleted).length}</h2>
                                                : <h2>{orderTracking?.filter(t => t.status == item.status).length}</h2>}

                                        </div>

                                    </div>
                                </>}
                            />
                        </>
                    ))}

                </div>

            </Grid>

            <Grid row className={classes.gridHeader}>


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
                    />
                </div>
            </Grid>

            <Grid row className={classes.container} >
                <SearchGrid columns="damageRepair"
                    list={damageAndRepair}
                    noRecordMsg="No record exists"
                    Icon={true}
                    isUpdate={isDataGridUpdate}
                    filter={searchFilter}
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

        </>
    )

}

export default withSnackbar(DamageRepair);