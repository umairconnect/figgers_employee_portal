import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import SearchGrid from '../../../../components/table/SearchGrid';
import { withSnackbar } from "./../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import {numberDisplay} from '../../../../../src/components/Common/Extensions';

function ViewShippingDetails({ orderId,dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const [shippingDetails, setShippingDetails] = useState([]);
    const loadOrderDetails = () => {
        var params = {
            code: "order_products_details",
            parameters: [''+orderId]
        };
        setIsLoading(true);
        PostDataAPI("ddl/loadItems", params).then((result) => {
            setIsLoading(false)
            console.log(result.data);
            if (result.success && result.data != null) {
                setTotalPrice(result.data.reduce((acc, item) => acc + parseInt(item.t3), 0));
                setShippingDetails(result.data);
                handleDataGridUpdate();
            }
        })
    }
    useEffect(() => {
        loadOrderDetails();
    }, [])
    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="md"
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Shipment Details</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        <Scrollbars autoHeight autoHeightMax={540}>
                            {isLoading ? <DialogLoader></DialogLoader> : ''}
                            <div className={classes.content}>
                                <Grid row xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                    <SearchGrid
                                        columns="shippingDetails"
                                        list={shippingDetails}
                                        isUpdate={isDataGridUpdate}
                                        noRecordMsg="No record exists"
                                        Icon={true}
                                    />
                                   
                                </Grid>
                                <p >Total: {numberDisplay(totalPrice, 2, 2, 0)}</p>

                            </div>
                        </Scrollbars>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                               
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default ViewShippingDetails;