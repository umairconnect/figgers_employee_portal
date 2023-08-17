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
import moment from 'moment';

function AddManualTracking({ dialogOpenClose, successInquiryNumber, handleClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        orderInquiryNumber: '', shipName: '', shipEmail: '',
        shipPhone: '', shipAddress1: '', shipCity: '', shipState: '', shipZip:''
    });
    const [trackDetails, setTrackDetails] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const addManualShipmentOrder = () => {
        let errorList = [];
        if (!state.orderInquiryNumber || state.orderInquiryNumber.length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTrackingNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTrackingNumber: false
            }));
        }
        if (errorList.length < 1) {
            setIsLoading(true);
            PostDataAPI("telispire/validateManualShipmentTrackNumber", state).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    if (!result.data.errorResponse) {
                        successInquiryNumber(result.data.trackResponse, state.orderInquiryNumber);
                    } else {
                        showMessage("Error", result.data.errorResponse.message,"error", 3000);
                         //tracking number not verified
                    }
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
       
    }

    
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
                            <Typography className={classes.title}>Add Manual Shipment</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={540}>
                           
                            <div className={classes.content}>
                                
                                <Grid row xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                    <h1> Submitting this form will only record tracking number for notifications, it will not create shipping label. </h1>
                                </Grid>
                                <Grid xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                    <Label title="Tracking Number" size={12} />
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <InputBaseField
                                            id="orderInquiryNumber"
                                            name="orderInquiryNumber"
                                            type="text"
                                            placeholder='Tracking Number'
                                            MaxLength='50'
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorTrackingNumber && !state.orderInquiryNumber ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter tracking number
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                <Button className={classes.changeBtn} onClick={addManualShipmentOrder}>Validate</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default withSnackbar(AddManualTracking);