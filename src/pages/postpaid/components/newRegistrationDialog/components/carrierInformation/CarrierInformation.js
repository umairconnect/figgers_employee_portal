import { Button, Dialog, Grid, Icon, Typography, Select, Tooltip, FormHelperText } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Label } from '../../../../../../components/UiElements/UiElements'
import { InputBaseField } from '../../../../../../components/InputField/InputField'
import { PostDataAPI } from '../../../../../../Services/APIService';
import Loader from './../../../../../../components/Loader/Loader';
import { validateEmail, handleNumberKeyPress, validatePhoneNumber, formateMdnNumber } from '../../../../../../../src/components/Common/Extensions';
import { withSnackbar } from "./../../../../../../components/Message/Alert";

import useStyles from "./styles";
function CarrierInformation({ handleNext, triggerLineInfoNext, updateTrigger, msisdn, data, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    data.activationPlanId = data.activationPlanId ? data.activationPlanId.toString() : '';
    const [state, setState] = useState(data);
    const [wirelessPlans, setWirelessPlans] = useState([]);
    const [carriersList, setCarriersList] = useState([
        { label: 'Please select existing carrier', value: '' },
        { label: 'AT&T', value: 'AT&T' },
        { label: 'Sprint', value: 'Sprint' },
        { label: 'TMobile', value: 'TMobile' },
        { label: 'Verizon', value: 'Verizon' }
    ]);
    const [planTypes, setPlanTypes] = useState([
        { label: 'Please select plan type', value: '' },
        { label: 'Text And Type', value: 'Text And Type' },
        { label: 'Economical', value: 'Economical' },
        { label: 'Unlimited Plan', value: 'Unlimited Plan' },
        { label: 'Family Plan', value: 'Family Plan' }
    ]);
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    const handlePhoneChange = e => {
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

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));
                        return;
                    }
                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

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

    const PortNumber = () => {
        let errorList = [];
        state.activationPlanId = state.activationPlanId ? parseInt(state.activationPlanId) : 0;
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.creditCardExpiration = state.ccExpMonth + '/' + state.ccExpYear;
            handleNext(state);
            handleNext(state);
        }
    }
    const Validate = (errorList) =>
    {
        if (!state.existingCarrier) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorExistingCarrier: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorExistingCarrier: false
            }));
        }
        if (!state.planType) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPlanType: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPlanType: false
            }));
        }

        if (!state.oldCarrierAccountNumber) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAccountNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAccountNumber: false
            }));
        }

        if (!state.transferPin) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNumberTransferPin: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNumberTransferPin: false
            }));
        }

        if (!state.ssn) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSsn: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSsn: false
            }));
        }

        if (!state.imei) {
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

        if (!state.firstName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }

        if (!state.lastName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
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

        if (!state.activationPlanId) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorActivationPlanId: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorActivationPlanId: false
            }));
        }

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

        // if (includeShipment) {
        //if (!state.shipName) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorShipName: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorShipName: false
        //    }));
        //}

        if (!state.shipCity) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipCity: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipCity: false
            }));
        }

        if (!state.shipPhone) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipPhone: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipPhone: false
            }));
        }
        if (state.shipPhone && !validatePhoneNumber(state.shipPhone)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipPhoneLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipPhoneLength: false
            }));
        }

        if (!state.shipAddress1) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipAddress1: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipAddress1: false
            }));
        }

        if (!state.shipState) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipState: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipState: false
            }));
        }

        if (!state.shipZip) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipZip: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorShipZip: false
            }));
        }

        /*validateBillingInfo(errorList);*/

        if (!validateCreditCardExpiry()) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCardExpiration: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCardExpiration: false
            }));
        }

        if (!state.creditCardNumber) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCardNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCardNumber: false
            }));
        }
        if (!state.nameOnCard) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNameOnCard: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorNameOnCard: false
            }));
        }
        if (!state.cvc) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCvc: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCvc: false
            }));
        }

        // }
    }
    const validateCreditCardExpiry = () => {
        if (!state.ccExpMonth || !state.ccExpYear || isNaN(state.ccExpMonth) || isNaN(state.ccExpYear))
            return false;
        if (state.ccExpMonth < 1 || state.ccExpMonth > 12)
            return false;
        if (state.ccExpYear < new Date().getFullYear().toString().substring(2))
            return false;

        return true;

    }
    useEffect(() => {
        var params = {
            code: "get_wireless_plans",
            parameters: ["1"]
        };
        
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.unshift({ t2: 'Please Select Plan', t1: 0 });
                setWirelessPlans(result.data.map(t => { return { label: t.t2, value: t.t1 } }));
            }
        })
        if (triggerLineInfoNext) {
            PortNumber();
            updateTrigger();
        }
    }, [triggerLineInfoNext]);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <Grid container>
                <Grid lg={12}>
                    <Grid container spacing={4}>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label title="Existing Carrier" size={12} mandatory={true} />
                            <Grid sm={12} md={12} lg={12} xl={12}>
                                <Select
                                    size="small"
                                    native
                                    name="existingCarrier"
                                    value={state.existingCarrier}
                                    onChange={handleChange}
                                    placeholder="Select"
                                    label="Select"
                                    className={classes.selectBaseInput}
                                >
                                    {carriersList.map(option =>
                                        <option value={option.value}>{option.label}</option>
                                    )
                                    }
                                </Select>
                                {errorMessages.errorExistingCarrier && !state.existingCarrier ? (<FormHelperText style={{ color: "red" }} >
                                    Please select existing carrier
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Plan Type" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Select
                                    size="small"
                                    native
                                    name="planType"
                                    value={state.planType}
                                    onChange={handleChange}
                                    placeholder="Select"
                                    label="Select"
                                    className={classes.selectBaseInput}
                                >
                                    {planTypes.map(option =>
                                        <option value={option.value}>{option.label}</option>
                                    )
                                    }
                                </Select>
                                {errorMessages.errorPlanType && !state.planType ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter plan type
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label title="Choose a Plan" size={12} mandatory={true} />
                            <Grid sm={12} md={12} lg={12} xl={12}>
                                <Select
                                    size="small"
                                    native
                                    name="activationPlanId"
                                    value={state.activationPlanId}
                                    onChange={handleChange}
                                    placeholder="Select"
                                    label="Select"
                                    className={classes.selectBaseInput}
                                >
                                    {wirelessPlans.map(option =>
                                        <option value={option.value}>{option.label}</option>
                                    )
                                    }
                                </Select>
                                {errorMessages.errorActivationPlanId && !state.activationPlanId > 0 ? (<FormHelperText style={{ color: "red" }} >
                                    Please select a paln
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="Account Number" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="oldCarrierAccountNumber"
                                    name="oldCarrierAccountNumber"
                                    type="text"
                                    value={state.oldCarrierAccountNumber}
                                    onChange={handleChange}
                                    placeholder='Account Number'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorAccountNumber && !state.oldCarrierAccountNumber ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter account number
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="Number Transfer Pin" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="transferPin"
                                    name="transferPin"
                                    type="text"
                                    value={state.transferPin}
                                    onChange={handleChange}
                                    placeholder='Number Transfer Pin'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorNumberTransferPin && !state.transferPin ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter transfer pin
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="SSN (Last Four Digits)" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="ssn"
                                    name="ssn"
                                    type="text"
                                    value={state.ssn}
                                    onChange={handleChange}
                                    placeholder='SSN'
                                    IsDisabled={false}
                                    MaxLength='4'
                                />
                                {errorMessages.errorSsn && !state.ssn ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter SSN
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="IMEI / Device Serial Number" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="imei"
                                    name="imei"
                                    type="text"
                                    value={state.imei}
                                    onChange={handleChange}
                                    placeholder='imei'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorImei && !state.imei ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter IMEI number
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="Activation Zip code" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    value={state.zipCode}
                                    onChange={handleChange}
                                    placeholder='Zip Code'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorZipCode && !state.zipCode ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter zip code
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <h4 className={classes.secHeading}>Shipping Information  </h4>
                </Grid>

                <Grid lg={12}>
                    <Grid container spacing={4}>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="First Name" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={state.firstName}
                                    onChange={handleChange}
                                    placeholder='First Name'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter first name
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Last Name" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={state.lastName}
                                    onChange={handleChange}
                                    placeholder='Last Name'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Label size={12} title="Address" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="shipAddress1"
                                name="shipAddress1"
                                type="text"
                                value={state.address}
                                onChange={handleChange}
                                placeholder='address'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                            {errorMessages.errorShipAddress1 && !state.shipAddress1 ? (<FormHelperText style={{ color: "red" }} >
                                Please enter shipping address
                            </FormHelperText>) : ('')}
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="City" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="shipCity"
                                    name="shipCity"
                                    type="text"
                                    value={state.shipCity}
                                    onChange={handleChange}
                                    placeholder='city'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorShipCity && !state.shipCity ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter city
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="State" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="shipState"
                                    name="shipState"
                                    type="text"
                                    value={state.shipState}
                                    onChange={handleChange}
                                    placeholder='state'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorShipState && !state.shipState ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter shipping state
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={4} md={4} lg={4} xl={4} >
                            <Label size={12} title="Zip code" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="shipZip"
                                    name="shipZip"
                                    type="text"
                                    value={state.shipZip}
                                    onChange={handleChange}
                                    placeholder='zip code'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorShipZip && !state.shipZip ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter zip code
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Email" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={state.email}
                                    onChange={handleChange}
                                    placeholder='email'
                                    IsDisabled={false}
                                    MaxLength='50'
                                />
                                {errorMessages.errorEmail && (!state.email || !validateEmail(state.email)) ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter a valid email address
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Contact Number" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="shipPhone"
                                    name="shipPhone"
                                    type="text"
                                    value={state.shipPhone}
                                    onChange={handlePhoneChange}
                                    placeholder='Contact Number'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorShipPhone && (!state.shipPhone || !validateEmail(state.email)) ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter contact number
                                </FormHelperText>) : ('')}
                                {errorMessages.errorShipPhoneLength && state.shipPhone ? (<FormHelperText style={{ color: "red" }} >
                                    The ship phone number is invalid
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <h4 className={classes.secHeading}>Payment Information  </h4>
                </Grid>

                <Grid lg={12}>
                    <Grid container spacing={4}>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Name On Card" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    type="text"
                                    value={state.nameOnCard}
                                    onChange={handleChange}
                                    placeholder='Name On Card'
                                    IsDisabled={false}
                                    MaxLength='50'
                                />
                                {errorMessages.errorNameOnCard && !state.nameOnCard ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter card holder name
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Debit /Credit Card Number" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="creditCardNumber"
                                    name="creditCardNumber"
                                    type="text"
                                    value={state.creditCardNumber}
                                    onChange={handleChange}
                                    placeholder='Debit /Credit Card Number'
                                    IsDisabled={false}
                                    MaxLength='14'
                                />
                                {errorMessages.errorCardNumber && !state.creditCardNumber ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid credit card number
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="CVC" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <InputBaseField
                                    id="cvc"
                                    name="cvc"
                                    type="text"
                                    value={state.cvc}
                                    onChange={handleChange}
                                    placeholder='CVC'
                                    IsDisabled={false}
                                    MaxLength='3'
                                />
                                {errorMessages.errorCvc && !state.cvc ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter CVC
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} >
                            <Label size={12} title="Expiry Date" />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <div style={{ maxWidth: "50%", display: "inline-block", marginRight: "10px" }}>
                                    <InputBaseField
                                        name="ccExpMonth"
                                        value={state?.ccExpMonth}
                                        onChange={handleChange}
                                        placeholder="Month"
                                        type="text"
                                        MaxLength={2}
                                        onKeyPress={(e) => handleNumberKeyPress(e)}
                                    />
                                </div>
                                <div style={{ maxWidth: "50%", display: "inline-block" }}>
                                    <InputBaseField
                                        name="ccExpYear"
                                        value={state?.ccExpYear}
                                        onChange={handleChange}
                                        placeholder="Year"
                                        type="text"
                                        MaxLength={2}
                                        onKeyPress={(e) => handleNumberKeyPress(e)}
                                    />
                                </div>
                                {errorMessages.errorCardExpiration && !validateCreditCardExpiry() ? (<FormHelperText style={{ color: "red" }} >
                                    Please enter valid credit card expiration
                                </FormHelperText>) : ('')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item lg={12} className={classes.noteSection}>
                            <Typography>Note:  $ 4.99 per SIM shall be charged</Typography>
                        </Grid>
                    </Grid>
                </Grid>




            </Grid>
        </>
    )
}
export default withSnackbar(CarrierInformation);
