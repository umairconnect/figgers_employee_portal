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
import SearchGrid from '../../../components/table/SearchGrid';
import Breadcrums from '../../../components/BreadCrums/breadcrums';
import TopSpacer from '../../../components/Common/spacer/TopSpacer';



import Loader from '../../../components/Loader/Loader';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../components/Message/Alert";


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

    const [businessInquiries, setBusinessInquiries] = useState([
        {
            Tracking: "Figgers-DRS-6327992a80b81",
            DeviceNumber: "F20190325-01e",
            CustomerName: "John Kennerson",
            Phone: "(337) 447-3153",
            Email: "kenncom@outlook.com",
        }
    ]);


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
                        <Breadcrums parentLink={"Business Inquiries"} isBack={true}></Breadcrums>
                    </Grid>
                </Grid>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Business Inquiries
                </h1>
            </Grid>





            <Grid row className={classes.container} >
                <SearchGrid columns="businessInquiries"
                    list={businessInquiries}
                    noRecordMsg="No record exists"
                    Icon={true}
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

        </>
    )

}

export default withSnackbar(DamageRepair);