import React, { useState, useEffect } from "react";
import { Button, Dialog, Grid, Icon, Typography, Select, Tooltip, FormHelperText, Switch } from '@material-ui/core'
import useStyles from "./styles";
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { InputBaseField, SelectField, TextareaField, CheckboxField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { GetUserInfo } from "../../../../Services/GetUserInfo";
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import Loader from './../../../../components/Loader/Loader';
import CloseIcon from '@material-ui/icons/Close';
import Scrollbars from "rc-scrollbars";

function AccountSettings({ dialogOpenClose, handleClose, handleSuccessClose, accountNumber, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = React.useState({
        sendNotifications: false,
        sendExpiryReminders: false,
        sendNewOffers: false,
        electronicBillingDisable: false,
        usageMonths: 4,
        reminderDays: 5,

    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    const handleInputChange = (event) => {
        //if (event.target.value)
        //   setState({ ...state, [event.target.name]: parseInt(event.target.value) });
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    let user_info = JSON.parse(GetUserInfo());

    const [customerRecord, setCustomerRecord] = React.useState({});
    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isNumber = /\d/.test(keyValue);
        const isSpecialChar = /[^a-zA-Z0-9]/.test(keyValue);
        if (!isNumber || isSpecialChar) {
            event.preventDefault();
        }
    }
    const getCustomerSetting = () => {
        var obj = {
            accountNumber: accountNumber
        };
        setIsLoading(true);
        PostDataAPI("customer/getCustomerInfo", obj).then((result) => {

            if (result.success && result.data != null) {
                //result.data.usageMonths = 4;
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }
    const updateCustomerSetting = () => {
        setIsLoading(true);
        if (state.usageMonths) {
            state.usageMonths = parseInt(state.usageMonths);
        } else {
            state.usageMonths = 0;
        }
        if (state.reminderDays) {
            state.reminderDays = parseInt(state.reminderDays);
        } else {
            state.reminderDays = 0;
        }
        if (state.daysBeforeDeactivation) {
            state.daysBeforeDeactivation = parseInt(state.daysBeforeDeactivation);
        } else {
            state.daysBeforeDeactivation = 0;
        }
        //state.accountPhoneNumber=customerRecord.accountPhoneNumber;
        PostDataAPI("customer/updateProfile", state).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {
                handleSuccessClose("Account settings updated successfully");
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }

        });
    }
    const getCustomerProfileDetails = () => {

        var obj = { accountNumber: accountNumber };
        setIsLoading(true);
        PostDataAPI("telispire/getCustomerProfileDetail", obj, true).then((result) => {
            if (result.success && result.data != null) {
                //result.data.objCustomerInfo.workPhone = formateMdnNumber(result.data.objCustomerInfo.workPhone);
                //result.data.objCustomerInfo.homePhone = formateMdnNumber(result.data.objCustomerInfo.homePhone);
                //result.data.objCustomerInfo.shipPhone = formateMdnNumber(result.data.objCustomerInfo.shipPhone);
                //result.data.objCustomerInfo.billingPhone = formateMdnNumber(result.data.objCustomerInfo.billingPhone);
                setCustomerRecord(result.data.objCustomerInfo);
                //if (result.data.objCustomerInfo.creditCardExpiration) {
                //    var expiryDate = result.data.objCustomerInfo.creditCardExpiration.split('/');
                //    result.data.objCustomerInfo.ccExpMonth = expiryDate[0];
                //    result.data.objCustomerInfo.cc = expiryDate[1];
                //}

                //setState(result.data.objCustomerInfo);
                //console.log(result.data)
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        getCustomerSetting();
        getCustomerProfileDetails();
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
                            <Typography className={classes.title}>Account Settings</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={450}>
                            <div className={classes.content}>
                                <Grid container className={classes.settingContainer}>
                                    <h3>Reminders and Notification (Email/SMS)</h3>
                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <p>Send important notifications and updates</p>
                                        </Grid>
                                        <Grid md={6} lg={6} sm={6} className="align-right">
                                            <Switch
                                                checked={state.sendNotifications}
                                                onChange={handleChange}
                                                name="sendNotifications"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                classes={{
                                                    root: classes.root,
                                                    switchBase: classes.switchBase,
                                                    thumb: classes.thumb,
                                                    track: classes.track,
                                                    checked: classes.checked,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <p>Send Reminder for Expiration Date </p>
                                        </Grid>
                                        <Grid md={6} lg={6} sm={6} className="align-right">
                                            <Switch
                                                checked={state.sendExpiryReminders}
                                                onChange={handleChange}
                                                name="sendExpiryReminders"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                classes={{
                                                    root: classes.root,
                                                    switchBase: classes.switchBase,
                                                    thumb: classes.thumb,
                                                    track: classes.track,
                                                    checked: classes.checked,
                                                }}
                                            />
                                        </Grid>
                                        <Grid container>
                                            <Grid md={6} lg={6} sm={6}>
                                                <div className="d-flex tab-6 flexWrap flexBaseline">
                                                    <p className="align-right">Remind before</p>
                                                    <div className={classes.remindMe}>
                                                        <InputBaseField
                                                            value={(state.reminderDays && state.reminderDays > 0) ? state.reminderDays : ''}
                                                            name="reminderDays"
                                                            onChange={handleInputChange}
                                                            type="text"
                                                            onKeyPress={(e) => handleKeyPress(e)}
                                                            MaxLength={1}
                                                        ></InputBaseField>
                                                    </div>

                                                    <p> Days </p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <p>Notify when new offers are available </p>
                                        </Grid>
                                        <Grid md={6} lg={6} sm={6} className="align-right">
                                            <Switch
                                                checked={state.sendNewOffers}
                                                onChange={handleChange}
                                                name="sendNewOffers"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                classes={{
                                                    root: classes.root,
                                                    switchBase: classes.switchBase,
                                                    thumb: classes.thumb,
                                                    track: classes.track,
                                                    checked: classes.checked,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <h3>Account Settings</h3>

                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <div className="d-flex tab-6 flexWrap flexBaseline">
                                                <p className="align-right">View Usage for Last</p>
                                                <div className={classes.remindMe}>
                                                    <InputBaseField
                                                        value={(state.usageMonths && state.usageMonths > 0) ? state.usageMonths : ''}
                                                        name="usageMonths"
                                                        MaxLength={2}
                                                        type="text"
                                                        onKeyPress={(e) => handleKeyPress(e)}
                                                        onChange={handleInputChange}></InputBaseField>
                                                </div>

                                                <p> Months </p>
                                            </div>
                                        </Grid>
                                    </Grid>


                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <div className="d-flex tab-6 flexWrap flexBaseline">
                                                <p className="align-right">Deactivate Line  if not used for </p>
                                                <div className={classes.remindMe}>
                                                    <InputBaseField
                                                        type="text"
                                                        value={(state.daysBeforeDeactivation && state.daysBeforeDeactivation > 0) ? state.daysBeforeDeactivation : ''}
                                                        name="daysBeforeDeactivation"
                                                        onChange={handleInputChange}
                                                        MaxLength={2}
                                                        onKeyPress={(e) => handleKeyPress(e)}
                                                    ></InputBaseField>
                                                </div>

                                                <p> Days </p>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.settingOptions}>
                                        <Grid md={6} lg={6} sm={6}>
                                            <p>Enable Electronic Billing</p>
                                        </Grid>
                                        <Grid md={6} lg={6} sm={6} className="align-right">
                                            <Switch
                                                checked={state.electronicBillingDisable}
                                                onChange={handleChange}
                                                name="electronicBillingDisable"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                classes={{
                                                    root: classes.root,
                                                    switchBase: classes.switchBase,
                                                    thumb: classes.thumb,
                                                    track: classes.track,
                                                    checked: classes.checked,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                
                                </Grid>
                            </div>
                        </Scrollbars>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.changeBtn} onClick={handleClose}>Close</Button>
                                <Button className={classes.changeBtn} onClick={updateCustomerSetting}>Update</Button>
                            </div>
                        </div>
                    </div>
                </div>



            </Dialog>
        </>
    )
}
export default withSnackbar(AccountSettings);