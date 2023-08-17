import React, { useState, useEffect } from 'react'
import {
    InputBase,
    Grid,
    Button
} from "@material-ui/core";
import useStyles from "./styles";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import SearchGrid from '../../../components/table/SearchGrid';
import Breadcrums from '../../../components/BreadCrums/breadcrums';
import TopSpacer from '../../../components/Common/spacer/TopSpacer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { PostDataAPI } from '../../../Services/APIService';
import Loader from '../../../components/Loader/Loader';
import { ActionDialog } from "../../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../../components/Message/Alert";
import AddNewAddress from './component/addNewAddress';


function AddressBook({ trackingType, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [editItem, setEditItem] = useState({});
    const [addNewAddressDialog, setAddNewAddressDialog] = useState(false);

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

    const deleteAddressBook = (item) => {
        showActionDialog("Are you sure you want to delete this record?", "confirm", function () {
            var params = { addressBookId: item.addressBookId}
            setIsLoading(true);
            PostDataAPI("figgaddressbook/delete", params,true).then((result) => {
                if (result.success) {
                    showMessage("Success", "Record deleted successfully", "success", 3000);
                    loadAddressBookGrid();
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
                setIsLoading(false);
            })
        });
    }
    const editAddressBook = (item) => {
        setEditItem(item);
        setAddNewAddressDialog(true);
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [state, setState] = useState({});
    const closeAddAddress = () => {
        setEditItem({});
        setAddNewAddressDialog(false);
    }
    const handleSuccessClose = (message) => {
        closeAddAddress();
        showMessage("Success", message, "success", 3000);
        loadAddressBookGrid();
    }
    const addAddress = () => {
        setEditItem({});
        setAddNewAddressDialog(true);
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [addressBook, setAddressBook] = useState([]);


    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }


    const [filteredStatus, setFilteredStatus] = useState([]);


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

    const loadAddressBookGrid = () => {
        setIsLoading(true);
        PostDataAPI("figgaddressbook/loadGrid").then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data)
                setAddressBook(
                    result.data.map((item, i) => {
                        item.phoneNumber = item.phone;
                        item.completeAddress = item.address + " " + item.city + ', ' + item.state + ' ' + item.zipCode;
                        return { ...item };
                    }));
            }
            else {
                setAddressBook([]);
            }
            handleDataGridUpdate();
            setIsLoading(false);

        })
    }

    useEffect(() => {
        loadAddressBookGrid();
    }, []);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Address Book"} isBack={true}></Breadcrums>
                    </Grid>
                </Grid>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Address Book
                </h1>
            </Grid>



            <Grid row className={classes.gridHeader}>
                <div className={classes.gridActions}>
                    <Button className={classes.changeBtn} onClick={() => addAddress()}><AddCircleOutlineIcon style={{marginRight: '6px'}} /> Add New</Button>
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
                    />
                </div>

            </Grid>

        

            <Grid row className={classes.container} >
                <SearchGrid columns="addressBook"
                    list={addressBook}
                    noRecordMsg="No record exists"
                    Icon={true}
                    isUpdate={isDataGridUpdate}
                    filter={searchFilter}
                    onDeleteClick={deleteAddressBook}
                    onEditClick={editAddressBook}
                />
            </Grid>

            {addNewAddressDialog ? 
                <AddNewAddress
                    dialogOpenClose={addAddress}
                    handleClose={closeAddAddress}
                    handleSuccessClose={handleSuccessClose}
                    data={ editItem}
                ></AddNewAddress>
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

export default withSnackbar(AddressBook);