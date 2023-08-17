import React, { useEffect, useState } from 'react'
import { Grid, FormHelperText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { Label } from '../../../../../../components/UiElements/UiElements';
import { InputBaseField } from '../../../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../../../Services/APIService';
import Loader from './../../../../../../components/Loader/Loader';
import { withSnackbar } from "./../../../../../../components/Message/Alert";
import { validatePhoneNumber, formateMdnNumber } from '../../../../../../../src/components/Common/Extensions';

function CheckEligibility({ handleClose, handleNext, triggerEligibilityNext, updateTrigger, msisdn, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState({ msisdn: formateMdnNumber(msisdn) });
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    const [errorMessages, setErrorMessages] = useState({});
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
    const Validate = (errorList) => {
        //if (addressType == "updateBillingAddress") {
        //    if (!validateCreditCardExpiry()) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardExpiration: true
        //        }));
        //        errorList.push(true);
        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardExpiration: false
        //        }));
        //    }

        //    if (!state.creditCardNumber) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardNumber: true
        //        }));
        //        errorList.push(true);
        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardNumber: false
        //        }));
        //    }

        //    if (state.creditCardNumber && state.creditCardNumber.length != 19) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorInvalidCardNumber: true
        //        }));
        //        errorList.push(true);
        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorInvalidCardNumber: false
        //        }));
        //    }

        //    if (!state.creditCardType) {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardType: true
        //        }));
        //        errorList.push(true);
        //    }
        //    else {
        //        setErrorMessages(prevState => ({
        //            ...prevState,
        //            errorCardType: false
        //        }));
        //    }
        //}
        //else {
        if (!state.msisdn && !validatePhoneNumber(state.msisdn)) {
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
        //}
    }
    const CheckEligibility = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.msisdn = state.msisdn.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
            PostDataAPI("telispire/checkEligibility", state).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    if (result.data.isValid) {
                        handleNext(state.msisdn);
                    }
                    else {
                        //result.data.failureReason
                        showMessage("Error", "Not eligible to port this number", "error", 3000);
                    }
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    }
    useEffect(() => {
        if (triggerEligibilityNext) {
            CheckEligibility();
            updateTrigger();
        }
    }, [triggerEligibilityNext]);
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <Grid container alignItems='center'>
                <Grid item lg={12}>
                    <Grid container >
                        <Grid item lg={3} />
                        <Grid item lg={6}>
                            <Grid container >
                                <Label size={12} title="Phone Number" />
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.searchLabel}>
                                    <InputBaseField
                                        id="msisdn"
                                        name="msisdn"
                                        type="text"
                                        value={state.msisdn}
                                        onChange={handlePhoneChange}
                                        placeholder='Enter Number'
                                        IsDisabled={false}
                                        MaxLength='14'
                                    />
                                    {errorMessages.errorPhone && !state.msisdn && !validatePhoneNumber(state.phone) ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter valid phone number
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} />
                    </Grid>
                </Grid>
            </Grid>
        </>

    )
}
export default withSnackbar(CheckEligibility);