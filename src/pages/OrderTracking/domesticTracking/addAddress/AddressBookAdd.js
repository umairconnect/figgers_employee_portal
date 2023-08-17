import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import SearchGrid from '../../../../components/table/SearchGrid';

function AddressBookAdd({ dialogOpenClose, handleClose,handleAddressBookSelection, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const [errorMessages, setErrorMessages] = useState({});
    const [addressBookList, setAddressBookList] = useState([]);

    const onRowClicked = (item)  => {
        handleAddressBookSelection(item);
    }   

    const loadAddressBookGrid = () => {
        setIsLoading(true);
        PostDataAPI("figgaddressbook/loadGrid").then((result) => {
            if (result.success && result.data != null) {
                console.log(result.data)
                setAddressBookList(
                    result.data.map((item, i) => {
                        item.phoneNumber = item.phone;
                        item.completeAddress = item.address + " " + item.city + ', ' + item.state + ' ' + item.zipCode;
                        return { ...item };
                    }));
            }
            else {
                setAddressBookList([]);
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

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="md"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Add Address</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>
                                <Grid xl={12} md={12} sm={12} lg={12}>
                                    <SearchGrid
                                        Icon={true}
                                        noRecordMsg="No record found"
                                        list={addressBookList}
                                        columns="addressBookInsertList"
                                        isSearchAble={true}
                                        onRowClick={onRowClicked}
                                        isUpdate={isDataGridUpdate}
                                        />
                                </Grid>
                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                {/* <Button className={classes.changeBtn}>Insert Address</Button> */}
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default withSnackbar(AddressBookAdd);