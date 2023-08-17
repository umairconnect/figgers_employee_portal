import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from "./styles";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import moment from 'moment';
import { formateMdnNumber, validatePhoneNumber, handleNumberKeyPress, isDigitsOnly, validateEmail, getFormatedDate } from '../../../../../src/components/Common/Extensions';
import { ActionDialog } from "./../../../../components/ActionDialog/ActionDialog";
import DialogLoader from './../../../../components/Loader/DialogLoader';
import { notification } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AddressBookAdd from '../addAddress/AddressBookAdd';

function CreateShippingLabel({ dialogOpenClose, validated, trackNumberDetails, trackingType, handleClose, handleSuccessClose, orderId, customerId, isFromOrderDetails, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    let history = useHistory();
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        trackingNumber: trackNumberDetails?.trackingNumber,
        lastScanDateTime: trackNumberDetails?.lastScanDateTime,
        status: trackNumberDetails?.status,
        type: trackingType,
        shipmentNotifications: []
    });

    const [showAddressGrid, setShowAddressGrid] = useState(false);

    const openAddressGrid = () => {
        setShowAddressGrid(true)
    }

    const closeAddressGrid = () => {
        setShowAddressGrid(false)
    }

    const handleAddressSelection = (addressBook) => {
        setState(prevState => ({
            ...prevState,
            ['companyName']: addressBook.companyName,
            ['attentionTo']: addressBook.attentionTo,
            ['emailAddress']: addressBook.email,
            ['phone']: addressBook.phone,
            ['address1']: addressBook.address,
            ['city']: addressBook.city,
            ['state']: addressBook.state,
            ['zipCode']: addressBook.zipCode
        }));
        closeAddressGrid();
    }

    const [notifications, setNotifications] = useState([]);
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
    const handleOverNightShipping = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            showActionDialog("Please confirm to create overnight shipping label. Additional charges will apply.", "confirm", function () {
                setState(prevState => ({
                    ...prevState,
                    [name]: checked
                }));
            });
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: checked
            }));
        }

    };

    const options = [
        {
            value: "world",
            label: "world"
        },
        {
            value: "cinema",
            label: "cinema"
        }
    ]



    const handlePhoneChange = (e, index) => {
        const { name, value } = e.target;
        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
                        if (index >= 0) {
                            const newInputs = [...notifications];
                            newInputs[index][name] = number;
                            setNotifications(newInputs);
                        } else {
                            setState(prevState => ({
                                ...prevState,
                                [name]: number
                            }));
                        }

                        return;
                    }

                    if (index >= 0) {
                        const newInputs = [...notifications];
                        newInputs[index][name] = value;
                        setNotifications(newInputs);
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {
                if (index >= 0) {
                    const newInputs = [...notifications];
                    newInputs[index][name] = value;
                    setNotifications(newInputs);
                } else {
                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }

            }
        }
        else
            e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const Validate = (errorList) => {
        
        if (!state.attentionTo) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttentionTo: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttentionTo: false
            }));
        }

        if (!state.emailAddress || !validateEmail(state.emailAddress)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmailAddress: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEmailAddress: false
            }));
        }
   
        if (!state.phone) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhone: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhone: false
            }));
        }

        if (state.phone && !validatePhoneNumber(state.phone)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPhone: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPhone: false
            }));
        }
          
        if (!state.address1) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress1: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress1: false
            }));
        }
        //if (!state.address2) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorAddress2: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorAddress2: false
        //    }));
        //}
           
        if (!state.city) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCity: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCity: false
            }));
        }

        if (!state.state) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorState: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorState: false
            }));
        }
        if (!state.zipCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZipCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZipCode: false
            }));
        }

        if (state.zipCode && !isDigitsOnly(state.zipCode)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidZipCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidZipCode: false
            }));
        }

        if (notifications && notifications.length > 0) {
            const hasNameError = notifications.some((t) => t.isDeleted == false && !t.notificationToName);
            const hasEmailError = notifications.some((t) => t.isDeleted == false && (!t.notificationToEmail || !validateEmail(t.notificationToEmail)));
            const hasPhoneError = notifications.some((t) => t.isDeleted == false && (!t.notificationToPhone || !validatePhoneNumber(t.notificationToPhone)));

            if (hasNameError) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiName: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiName: false
                }));
            }

            if (hasEmailError) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiEmailAddress: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiEmailAddress: false
                }));
            }

            if (hasPhoneError) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiInvalidPhone: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorNotiInvalidPhone: false
                }));
            }
        }
    }

    const addManaulOrderTrackingInfo = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            state.shipmentNotifications = notifications;
            state.type = trackingType;
            console.log(state);
            setIsLoading(true);
            PostDataAPI("telispire/addUpdateShipmentTrackInfo", state, true).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    //track info saved successfuly
                    if (state.trackingId <= 0) {
                        handleSuccessClose("Record saved successfully");
                    } else {
                        handleSuccessClose("Record updated successfully");
                    }


                } else {
                    //error in track info saving
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    const createShipmentTrackingLabel = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            state.shipmentNotifications = notifications;
            state.orderId = orderId;
            state.type = trackingType;

            setIsLoading(true);
            PostDataAPI("telispire/createShipmentTrackingLabel", state, true).then((result) => {
                setIsLoading(false);


                if (result.success && result.data != null) {
                    //track info saved successfuly
                    handleSuccessClose("Record saved successfully");


                } else {
                    //error in track info saving
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    const CreateReturnShippingLabel = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            state.shipmentNotifications = notifications;
            state.orderId = orderId;
            state.type = trackingType;
            console.log(state)
            setIsLoading(true);
            PostDataAPI("telispire/createShipmentReturnLabel", state, true).then((result) => {
                setIsLoading(false);
                if (result.success && result.data != null) {
                    //track info saved successfuly
                    handleSuccessClose("Record saved successfully");

                } else {
                    //error in track info saving
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    }

    const updateTrackingInfo = () => {
        addManaulOrderTrackingInfo()
    }

    const [lstStates] = useState([
        { label: 'Please Select State', value: '' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'District of Columbia', value: 'DC' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho	', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'Va.WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' }
    ]);

    const handleAddNotificationItem = () => {
        var listCount = notifications.filter(t => !t.isDeleted).length;
        if (listCount == 5) {
            showMessage("Error", "You cannot add more than five items.", "error", 3000);
        } else {
            var newObj = { notificationId: 0, notificationToName: '', notificationToEmail: '', notificationToPhone: '', isDeleted: false };
            setNotifications([...notifications, newObj]);
        }

    };

    const handleDeleteNotificationItem = (item, index) => {
        if (item.notificationId <= 0) {
            const notificationItems = [...notifications];
            notificationItems.splice(index, 1);
            setNotifications(notificationItems);
        } else {
            const updatedArray = notifications.map((obj, i) => {
                if (obj.notificationId === item.notificationId) {
                    return { ...obj, isDeleted: true };
                }
                return obj;
            });
            setNotifications(updatedArray);
        }
    };

    const handleNotificationInputChange = (e, index) => {
        const { name, value } = e.target;
        const newInputs = [...notifications];
        newInputs[index][name] = value;
        setNotifications(newInputs);
    };

    const handleAddressBookClick = () => {
        showMessage("Warning", "Feature comming soon", "warning", 3000);
    }
    const loadCustomerDetail = () => {
        setIsLoading(true);
        PostDataAPI("figgorder/getFiggCustomer", customerId).then((result) => {
            if (result.success && result.data) {
                setState(prevState => ({
                    ...prevState,
                    attentionTo: (result.data.firstName + ' ' + result.data.lastName),
                    emailAddress: result.data.email,
                    phone: result.data.phone,
                    address1: result.data.address,
                    city: result.data.city,
                    state: result.data.state,
                    zipCode: result.data.zip


                }));
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }

    const handleZipCodeChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (value.trim() != '' && value.trim().length > 4) {
            getStateAndCityOnZipCodeChange(value);
        }

    };

    const removeSpacesFromKeys = (obj) => {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            const newKey = key.replace(/\s/g, '_');
            newObj[newKey] = obj[key];
        });
        return newObj;
    };

    const getStateAndCityOnZipCodeChange = (zipCode) => {
        axios
            .get(`https://api.zippopotam.us/us/${zipCode}`)
            .then((response) => {
                if (response.data != null && response.data.places != null && response.data.places.length > 0) {

                    const { state, state_abbreviation, place_name } = removeSpacesFromKeys(response.data.places[0]);

                    setState(prevState => ({
                        ...prevState,
                        ['state']: state_abbreviation,
                        ['city']: place_name
                    }))
                }
            })
            .catch((error) => {
                console.log('Error fetching location data:', error);
            });
    };

    useEffect(() => {
        if (trackNumberDetails) {
            setState(trackNumberDetails);
            setNotifications(trackNumberDetails.shipmentNotifications ? trackNumberDetails.shipmentNotifications : []);
        }
        if (customerId && customerId > 0) {
            loadCustomerDetail();
        }
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
                            {state.trackingId > 0 ? <Typography className={classes.title}>Update Tracking Details</Typography>
                                : trackingType == 'returnLabel' ? <Typography className={classes.title}>Create Return Label</Typography>
                                    : trackingType == 'domesticTracking' && !state.trackingNumber ? <Typography className={classes.title}>Create Shipping Label</Typography>
                                        : <Typography className={classes.title}>Add Manual Tracking</Typography>}
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        {isLoading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>


                                <Grid row container>

                                    {state?.trackingNumber ?
                                        <Grid xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                            <Label title="Tracking Number" size={12} />
                                            <Grid xl={12} md={12} sm={12} lg={12}>
                                                <InputBaseField
                                                    id="trackingNumber"
                                                    name="trackingNumber"
                                                    type="text"
                                                    MaxLength='50'
                                                    value={state?.trackingNumber}
                                                    IsDisabled={true}
                                                />
                                            </Grid>
                                        </Grid> : ""}

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Company Name" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                placeholder='Company Name'
                                                MaxLength='50'
                                                value={state?.companyName}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title={trackingType == 'returnLabel' ? 'Name' : 'Attention To'} size={12} mandatory={true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="attentionTo"
                                                name="attentionTo"
                                                type="text"
                                                placeholder={trackingType == 'returnLabel' ? 'Name' : 'Attention To'}
                                                MaxLength='50'
                                                value={state.attentionTo}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorAttentionTo && !state.attentionTo ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter attention to name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Email Address" size={12} mandatory={true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="emailAddress"
                                                name="emailAddress"
                                                type="email"
                                                placeholder='Email Address'
                                                MaxLength='50'
                                                value={state.emailAddress}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorEmailAddress &&
                                                (!state.emailAddress || !validateEmail(state.emailAddress)) ?
                                                (<FormHelperText style={{ color: "red" }} >
                                                    Please enter a valid email address
                                                </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Phone #" size={12} mandatory={true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                placeholder='Phone #'
                                                MaxLength='14'
                                                value={formateMdnNumber(state?.phone)}
                                                onChange={(event) => { handlePhoneChange(event) }}
                                            />

                                            {errorMessages.errorPhone && !state.phone ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter phone number
                                            </FormHelperText>) : ('')}

                                            {errorMessages.errorInvalidPhone && state.phone && !validatePhoneNumber(state.phone) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid phone number
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Address 1" size={12} mandatory={true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="address1"
                                                name="address1"
                                                type="text"
                                                placeholder='Address 1'
                                                MaxLength='100'
                                                value={state?.address1}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorAddress1 && !state.address1 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter address1
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Address 2" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="address2"
                                                name="address2"
                                                type="text"
                                                placeholder='Address 2'
                                                MaxLength='100'
                                                value={state?.address2}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorAddress2 && !state.address2 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter address2
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Grid row container>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.Leftcol}>
                                                <Label title="City" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        placeholder='City'
                                                        MaxLength='20'
                                                        value={state.city}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessages.errorCity && !state.city ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter city
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6}>
                                                <Label title="State" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="state"
                                                        value={state?.state}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstStates.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>
                                                    {errorMessages.errorState && !state.state ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select state
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                        </Grid>


                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Zip Code" size={12} mandatory={true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="zipCode"
                                                name="zipCode"
                                                placeholder='Zip Code'
                                                IsDisabled={false}
                                                value={state?.zipCode}
                                                onChange={handleZipCodeChange}
                                                type="text"
                                                MaxLength={5}
                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                            />
                                            {errorMessages.errorZipCode && !state.zipCode ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter zip code
                                            </FormHelperText>) : ('')}

                                            {errorMessages.errorInvalidZipCode && (state.zipCode && !isDigitsOnly(state.zipCode)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid zip code
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>


                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>

                                        <Grid container style={{ paddingTop: '15px' }}>
                                            <Grid item xl={6} md={6} sm={6} lg={6} className={classes.headform}>
                                                <h1> Over Night Shipping </h1>
                                            </Grid>
                                            <Grid item xl={6} md={6} sm={6} lg={6}>
                                                <Switch
                                                    name="overNightShipping"
                                                    checked={state?.overNightShipping}
                                                    onChange={handleOverNightShipping}
                                                    color="primary"
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>



                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Shopify URL" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="shopifyUrl"
                                                name="shopifyUrl"
                                                type="text"
                                                placeholder='URL'
                                                IsDisabled={false}
                                                MaxLength='200'
                                                value={state.shopifyUrl}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="Memo" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <TextareaField
                                                id="memoNote"
                                                name="memoNote"
                                                rows={6}
                                                placeholder="Add Note / Memo"
                                                MaxLength="2000"
                                                value={state.memoNote}
                                                onChange={handleChange}
                                            ></TextareaField>
                                        </Grid>

                                    </Grid>

                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                        <Label title="What’s In Box" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <TextareaField
                                                id="whatInBox"
                                                name="whatInBox"
                                                rows={6}
                                                placeholder="Define what is in the box"
                                                MaxLength="2000"
                                                value={state.whatInBox}
                                                onChange={handleChange}
                                            ></TextareaField>
                                        </Grid>

                                    </Grid>

                                </Grid>

                                <Grid row container className={classes.headform}>
                                    <Grid xl={8} md={8} sm={8} lg={8}>
                                        <h1> Want notification to more people?
                                            <span className={classes.addNotification} onClick={handleAddNotificationItem}> <AddCircleOutlineIcon style={{ marginRight: '5px' }} />Add </span></h1>
                                    </Grid>
                                    <Grid xl={4} md={4} sm={4} lg={4} className={classes.paddingLeftRight}>
                                    </Grid>
                                    {/*<Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>*/}
                                    {/*    <Button className={classes.backBtn} onClick = {handleAddressBookClick}> <AddCircleOutlineIcon style={{ marginRight: '5px' }} /> Address book</Button>*/}
                                    {/*</Grid>*/}
                                </Grid>
                                {notifications?.filter(t => !t.isDeleted).map((item, index) => (
                                    <Grid row container>
                                        <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                            <Grid row container>
                                                <Grid xl={6} md={6} sm={6} lg={6} className={classes.Leftcol}>
                                                    <Label title="Full Name" size={12} mandatory={true} />
                                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                                        <InputBaseField
                                                            id="notificationToName"
                                                            name="notificationToName"
                                                            type="text"
                                                            value={item.notificationToName}
                                                            placeholder='Full Name'
                                                            MaxLength='100'
                                                            onChange={(event) => { handleNotificationInputChange(event, index) }}
                                                        />
                                                        {errorMessages.errorNotiName && !item.notificationToName ?
                                                            (<FormHelperText style={{ color: "red" }} >
                                                                Please enter name
                                                            </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>

                                                <Grid xl={6} md={6} sm={6} lg={6}>
                                                    <Label title="Email Address" size={12} mandatory={true} />
                                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                                        <InputBaseField
                                                            id="notificationToEmail"
                                                            name="notificationToEmail"
                                                            type="email"
                                                            value={item.notificationToEmail}
                                                            placeholder='Email Address'
                                                            MaxLength='100'
                                                            onChange={(event) => { handleNotificationInputChange(event, index) }}
                                                        />

                                                        {errorMessages.errorNotiEmailAddress &&
                                                            (!item.notificationToEmail || !validateEmail(item.notificationToEmail)) ?
                                                            (<FormHelperText style={{ color: "red" }} >
                                                                Please enter a valid email address
                                                            </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                            <Label title="Phone #" size={12} mandatory={true} />
                                            <Grid container xl={12} md={12} sm={12} lg={12}>
                                                <Grid item xl={8} md={8} sm={8} lg={8}>
                                                    <InputBaseField
                                                        id="notificationToPhone"
                                                        name="notificationToPhone"
                                                        type="text"
                                                        placeholder='Phone #'
                                                        MaxLength='14'
                                                        value={formateMdnNumber(item.notificationToPhone)}
                                                        onChange={(event) => { handlePhoneChange(event, index) }}
                                                    />
                                                    {errorMessages.errorNotiInvalidPhone &&
                                                        (!item.notificationToPhone || !validatePhoneNumber(item.notificationToPhone)) ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter valid phone number
                                                        </FormHelperText>) : ('')}
                                                </Grid>
                                                <Grid item xl={4} md={4} sm={4} lg={4} style={{ padding: '6px' }}>
                                                    <Button className={classes.deleteBtn} onClick={() => { handleDeleteNotificationItem(item, index) }}>Delete</Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                ))
                                }

                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                <Button className={classes.changeBtn} onClick={openAddressGrid}>Add Address</Button>
                                {state.trackingId ? <Button className={classes.changeBtn} onClick={updateTrackingInfo}>Update</Button>
                                    : trackingType == 'returnLabel' ? <Button className={classes.changeBtn} onClick={CreateReturnShippingLabel}>Create Return Label</Button>
                                        : trackingType == 'domesticTracking' && !state.trackingNumber ? <Button className={classes.changeBtn} onClick={createShipmentTrackingLabel}>Create Label</Button>
                                            : trackingType == 'domesticTracking' ? <Button className={classes.changeBtn} onClick={addManaulOrderTrackingInfo}>{'Add Manual'}</Button>
                                                : ''}


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

            {showAddressGrid ?
                <AddressBookAdd
                    handleClose={closeAddressGrid}
                    dialogOpenClose={openAddressGrid}
                    handleAddressBookSelection={ handleAddressSelection}
                ></AddressBookAdd>
                : ''}

        </>
    )
}

export default withSnackbar(CreateShippingLabel);