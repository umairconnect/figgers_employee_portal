import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';

import { InputBaseField, SelectField, TextareaField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { validateEmail, handleNumberKeyPress } from '../../../../../src/components/Common/Extensions';

function SetupOrganization({ dialogOpenClose, handleClose, handleSuccessClose, accountNumber, isPrepaid, ...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState([]);
    const { showMessage } = props;
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [errorMessages, setErrorMessages] = useState({

    });
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }))
    }
    const Validate = (errorList) => {
        if (!state.icc || state.icc.length < 19) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIcc: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIcc: false
            }));
        }

        if (!state.imei || state.imei.length < 15) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImei: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImei: false
            }));
        }
    }
    const handleEmailSMSAlert = (event) => {
        const { name, checked } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));

    }
    const addNewNumber = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.accountNumber = accountNumber;
            state.isPrepaid = isPrepaid;
            PostDataAPI("telispire/addLineToExistingAccount", state).then((result) => {
                if (result.success && result.data != null) {
                    if (result.data) {
                        showMessage("Success", "Line added successfully", "success", 3000);
                        setTimeout(() => { handleSuccessClose(); }, 3000)

                    }
                    else {
                        showMessage("Error", "Error adding new line, please contact administrator", "error", 3000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
                setIsLoading(false);

            })
        }
    }

    useEffect(() => {
    }, []);

    return (
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
                        <Typography className={classes.title}>Setup Organization Manager</Typography>

                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>


                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <Scrollbars autoHeight autoHeightMax={570}>
                        <div className={classes.content}>

                            <Grid container spacing={2}>

                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Grid row >
                                        <Label title="Organization Name" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="organizationName"
                                            onChange={handleChange}
                                            placeholder="Organization Name"
                                            type="text"
                                            MaxLength={19}
                                        />
                                        {errorMessages.errorName && (!state.name || state?.name.length < 19) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a organization name
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>

                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Grid row >
                                        <Label title="User name" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="userName"
                                            onChange={handleChange}
                                            placeholder="User name"
                                            type="text"
                                            MaxLength={15}
                                        />
                                        {errorMessages.errorImei && (!state.userName || state?.userName.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a user name
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>


                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Grid row >
                                        <Label title="Phone Number" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="phoneNumber"
                                            value={state.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            type="text"
                                            MaxLength={15}
                                            onKeyPress={(e) => handleNumberKeyPress(e)}
                                        />
                                        {errorMessages.errorNumber && (!state.phoneNumber || state?.phoneNumber.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a user name
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>


                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Grid row >
                                        <Label title="Email Address" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="phoneNumber"
                                            value={state.EmailAddress}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            type="email"
                                            MaxLength={15}
                                            onKeyPress={(e) => handleNumberKeyPress(e)}
                                        />
                                        {errorMessages.errorEmailAddress && (!state.EmailAddress || state?.EmailAddress.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a user name
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>


                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Grid row >
                                        <Label title="Password" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            placeholder="Password"
                                            type="password"
                                            MaxLength={15}
                                        />
                                        {errorMessages.errorPassword && (!state.Password || state?.Password.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter password
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>

                                <Grid item sm={6} md={6} lg={6}>
                                    <Grid row >
                                        <Label title="Email and Sms Alerts" size={12} />
                                        <Grid item lg={12} md={12} sm={12}>
                                            <Switch
                                                name="handleEmailSMSAlert"
                                                checked={state?.handleEmailSMSAlert}
                                                onChange={handleEmailSMSAlert}
                                                color="primary"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>



                            </Grid>


                        </div>
                    </Scrollbars>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                            <Button className={classes.changeBtn} onClick={addNewNumber}>Admin setup</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(SetupOrganization);
