import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';

import { InputBaseField} from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { validateEmail, handleNumberKeyPress, validatePhoneNumber, formateMdnNumber } from '../../../../../src/components/Common/Extensions';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

function SendInvite({ dialogOpenClose, handleClose, handleSuccessClose, customerData, ...props }) {
    const classes = useStyles();
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    const { showMessage } = props;
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
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
    const [errorMessages, setErrorMessages] = useState({

    });

    const sendInvite = () => {
        let errorList = [];
        if (!state.email || !validateEmail(state.email)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmail: false
            }));
        }
        if (errorList.length < 1) {
            var invitationStatus = 'Pending';
            console.log(customerData);
            showActionDialog("Are you sure you want to sent invitation to customer?", "confirm", function () {
                var obj = {
                    invitedBy: parseInt(userID),
                    accountNumber: state.accountNumber,
                    invitationStatus: invitationStatus,
                    homePhone: customerData.homePhone
                };
                setIsLoading(true)
                PostDataAPI("customer/sendInvitationToCustomer", obj, true).then((result) => {
                    setIsLoading(false)
                    if (result.success) {
                        handleSuccessClose(invitationStatus);
                        console.log(result.message);
                    } else {
                        showMessage("Error", result.message, "error", 3000);
                        console.log(result.message);
                    }
                })
            });

        }
        
    }

    const loadCustomerDetails = () => {
        var obj = {
            accountNumber: customerData.accountNumber
        };
        setIsLoading(true)
        PostDataAPI("customer/getCustomerInfo", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data);
                setState(result.data);
            } else {
                showMessage("Error", result.message, "error", 3000);
                console.log(result.message);
            }
        })
    }


    useEffect(() => {
        console.log(customerData);
        loadCustomerDetails();
    }, []);

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="lg"
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Send Invite</Typography>

                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>


                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>


                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}><b>Customer Name:</b></Typography>
                                    <Typography className={classes.valueText}>{state.firstName}</Typography>
                                </Grid>

                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}><b>Invite Status:</b></Typography>
                                    <Typography className={classes.valueText}>{state.invitationStatus ? state.invitationStatus :'Not Invited'} </Typography>
                                </Grid>


                                <Grid container spacing={2}>
                                    <Grid item sm={12} md={12} lg={12} xl={12} >
                                        <Grid row >
                                            <Typography className={classes.labelText}><b>Send Invite To:</b></Typography>
                                            {/* <Label title="Send Invite To" size={12} mandatory={true} /> */}

                                            <InputBaseField
                                                name="email"
                                                value={state.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                type="email"
                                                MaxLength={100}
                                            />
                                            {errorMessages.errorEmail && (!state.email || !validateEmail(state.email)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter a valid email address
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                    </Grid>
                                </Grid>

                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                {isLoading ? <Button className={classes.changeBtn} >Send Invite</Button> :
                                    <Button className={classes.changeBtn} onClick={sendInvite}>Send Invite</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >


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

export default withSnackbar(SendInvite);
