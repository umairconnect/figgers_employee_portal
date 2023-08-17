import React, { lazy, Suspense, useEffect, useState } from "react";
import {
    Grid, Button,
    InputBase,
    Box, AppBar,
    Toolbar, List,
    Typography, Divider,
    IconButton, Badge,
    FormControlLabel, Paper,
    Checkbox,
} from "@material-ui/core";

import ClearIcon from '@material-ui/icons/Clear';
import { SearchOutlined as SearchIcon } from '@material-ui/icons';

import TopSpacer from "../../../components/Common/spacer/TopSpacer";
import Breadcrums from "../../../components/BreadCrums/breadcrums";

import AddProtectionPlans from "./components/AddProtectionPlans";
import SearchGrid from "../../../components/table/SearchGrid";
import { numberDisplay } from '../../../../src/components/Common/Extensions';

import useStyles from "./styles";
import { PostDataAPI } from '../../../Services/APIService';
import DialogLoader from '../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../components/Message/Alert";
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";

function ProtectionPlans({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [addPlanDialog, setAddPlanDialog] = useState(false);

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
            setProtectionFilteredPlanList(protectionPlanList.filter(o => lstStatus.some(s => s == o.status)));
        }
        else {
            setProtectionFilteredPlanList(protectionPlanList);
        }

        handleDataGridUpdate();
    }


    //action dialog 
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })

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

    const handleClose = () => {
        setAddPlanDialog(false)
    }

    const handleSuccessClose = (message) => {
        setEditItem({});
        showMessage("Success", message, "success", 3000);
        handleClose();
        loadProtectionPlans();
    }

    const [searchFilter, setValue] = useState('');

    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate()
        }
    }

    const deleteProtectionPlan = (item) => {
        deleteRecord(item);
    }

    const editProtectionPlan = (item) => {
        setEditItem(item);
        setAddPlanDialog(true)
    }

    const addProtectionPlan = () => {
        setEditItem({});
        setAddPlanDialog(true)
    }

    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const [protectionPlanList, setProtectionPlanList] = useState([])
    const [protectionFilteredPlanList, setProtectionFilteredPlanList] = useState([])

    const handleClearInput = (name) => {
        setValue('');
        handleDataGridUpdate();
    };

    const deleteRecord = (item) => {
        showActionDialog("Are you sure you want to delete this plan?", "confirm", function () {
            setIsLoading(true);
            var params = { protectionPlanId: item.protectionPlanId }
            PostDataAPI("product/deleteProtectionPlan", params, true).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    showMessage("Success", "Plan deleted successfully", "success", 3000);
                    loadProtectionPlans();
                } else {
                    showMessage("Error", result.message, "error", 3000);
                    //var msg = "Error deleting protection plan, please contact administrator";
                    //if (result.message.indexOf('cannot be deleted') > 0)
                    //    msg = result.message;
                    //showMessage("Error", msg, "error", 3000);
                }

            })
        });

    }

    const loadProtectionPlans = () => {
        setIsLoading(true);
        PostDataAPI("product/loadProtectionPlanGrid").then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {

                var _List = result.data.map(item => {
                    item.priceFormated = '$'+numberDisplay(item.price, 2, 2, 0)
                    item.status = item.isActive?'Active':'In Active'
                    return { ...item }
                })
                setProtectionPlanList(_List);
                setProtectionFilteredPlanList(_List);
                handleDataGridUpdate();
            }

        })
    }

    useEffect(() => {
        loadProtectionPlans();
    }, []);
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Shop"} currentLink="Protection Plans"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            {isLoading ? <DialogLoader></DialogLoader> : ''}



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
                                                    {protectionPlanList?.filter(t => t.status == "Active").length}
                                                </> :
                                                item.status == "In Active" ?
                                                    <>
                                                        {protectionPlanList?.filter(t => t.status == "In Active").length}
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
                    <Button className={classes.changeBtn} onClick={() => addProtectionPlan()}>Add New Plan</Button>
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
                    columns="protectionPlanList"
                    list={protectionFilteredPlanList}
                    noRecordMsg="No plan exist"
                    Icon={true}
                    filter={searchFilter}
                    onDeleteClick={deleteProtectionPlan}
                    onEditClick={editProtectionPlan}
                    isUpdate={isDataGridUpdate}
                />

            </Grid>

            {addPlanDialog ?
                <AddProtectionPlans
                    dialogOpenClose={addPlanDialog}
                    handleClose={handleClose}
                    handleSuccessClose={handleSuccessClose}
                    data={editItem}
                ></AddProtectionPlans>
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
export default withSnackbar(ProtectionPlans);