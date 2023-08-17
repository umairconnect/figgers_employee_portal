import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Tooltip, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';

import { InputBaseField, SelectField, TextareaField, CheckboxField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { validateEmail, handleNumberKeyPress, isDigitsOnly, validatePhoneNumber, formateMdnNumber } from '../../../../../src/components/Common/Extensions';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import { lstStates, lstCountry, lstMonths } from '../../../../../src/components/Common/Lookup';

import InfoIcon from '@material-ui/icons/Info';

import ActivatedMessage from "./component/ActivatedMessage"

function ActivateNow({ dialogOpenClose, handleClose, handleSuccess, isPrepaid, customerInfo,isEdit, ...props }) {
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
    const handlePostpaidChange = (e, objName) => {
        const { name, value } = e.target;
        let obj = state[objName] ? state[objName] : {};
        obj[name] = name == "mRC" ? parseFloat(value) : value;
        setState(prevState => ({
            ...prevState,
            [objName]: obj
        }));
    }

    const handleShipPhoneChange = e => {
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
                        errorShipPhoneLength: true
                    }));
                }

            }
        }
        else
            e.preventDefault();
    }

    const handleHomePhoneChange = e => {
        e.preventDefault();
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
                        errorHomePhoneLength: true
                    }));
                }

            }
        }
        else
            e.preventDefault();
    }

    const handleCardChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // remove non-numeric characters
        const { name } = event.target;

        if (value.length <= 16) {
            value = value.match(/.{1,4}/g)?.join('-') || ''; // add - space after every 4 digits
        } else {
            value = state.creditCardNumber; // ignore input if it exceeds 16 digits
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeList = (e, index) => {
        const { name, value } = e.target;
        var existing = [...registrationFields];
        existing[index][name] = value;
        setRegistrationFields(existing);
    }

    const [registrationFields, setRegistrationFields] = useState([{ icc: '', imei: '' }]);

    const addMoreFields = () => {
        if (registrationFields.length < 4) {
            var obj = { icc: '', imei: '' };
            setRegistrationFields([...registrationFields, obj]);
        }

    }

    const minusFields = (index) => {
        var existData = [...registrationFields];
        existData.splice(index, 1);
        setRegistrationFields(existData);
    }

    const [activatedMessage, setActivatedMessage] = useState(false);

    const activateCloseDialog = () => {
        setActivatedMessage(false);
        //handleClose();
        handleSuccess(newAccountNumber);
    }

    const [errorMessages, setErrorMessages] = useState({

    });
    const billingCycle = [
        {
            label: "Select Bill Cycle",
            value: "",
        },
        {
            label: "1",
            value: "1",
        },
        {
            label: "2",
            value: "2",
        },
        {
            label: "3",
            value: "3",
        },
        {
            label: "4",
            value: "4",
        },
        {
            label: "5",
            value: "5",
        },
        {
            label: "6",
            value: "6",
        },
        {
            label: "7",
            value: "7",
        },
        {
            label: "8",
            value: "8",
        },
        {
            label: "9",
            value: "9",
        },
        {
            label: "10",
            value: "10",
        },
        {
            label: "11",
            value: "11",
        },
        {
            label: "12",
            value: "12",
        },
        {
            label: "13",
            value: "13",
        },
        {
            label: "14",
            value: "14",
        },
        {
            label: "15",
            value: "15",
        },
        {
            label: "16",
            value: "16",
        },
        {
            label: "17",
            value: "17",
        },
        {
            label: "18",
            value: "18",
        },
        {
            label: "19",
            value: "19",
        },
        {
            label: "20",
            value: "20",
        },
        {
            label: "21",
            value: "21",
        },
        {
            label: "22",
            value: "22",
        },
        {
            label: "23",
            value: "23",
        },
        {
            label: "24",
            value: "24",
        },
        {
            label: "25",
            value: "25",
        },
        {
            label: "26",
            value: "26",
        },
        {
            label: "27",
            value: "27",
        },
        {
            label: "28",
            value: "28",
        },

    ]
    const handleSelectChange = (e) => {
        if (state.activationPlanId == '15016')
            setRegistrationFields([{ icc: '', imei: '' }]);
        const { name, value } = e.target;

        if (!isPrepaid && name == 'activationPlanId') {
            var mRC = 0;
            var packageName = e.target.options[e.target.options.selectedIndex].text.split('-')[0];
            var price = e.target.options[e.target.options.selectedIndex].text.split('-')[1];
            mRC = price.replace('$', '');
            setState(prevState => ({
                ...prevState,
                mRC: mRC,
                packageName: packageName
            }));
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const Validate = (errorList, includeShipment) => {
     
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

        if (!state.cycleDay) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingCycle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingCycle: false
            }));
        }
        if (!isEdit) {
            if (registrationFields.some(t => !t.icc || t.icc.length < 19)) {
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

            if (registrationFields.some(t => !t.imei || t.icc.length < 15)) {
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

        if (!state.homeContactName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeContactName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeContactName: false
            }));
        }
        if (!state.homePhone) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhone: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhone: false
            }));
        }
        if (state.homePhone && !validatePhoneNumber(state.homePhone)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhoneLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomePhoneLength: false
            }));
        }

        if (!state.homeAddress1) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeAddress1: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeAddress1: false
            }));
        }

        if (!state.homeCity) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeCity: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeCity: false
            }));
        }

        if (!state.homeState) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeState: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeState: false
            }));
        }

        if (!state.homeZip) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeZip: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorHomeZip: false
            }));
        }


        if (state.homeZip && !isDigitsOnly(state.homeZip)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidHomeZipCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidHomeZipCode: false
            }));
        }

        if (includeShipment || isEdit) {
            if (!state.shipName) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorShipName: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorShipName: false
                }));
            }

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

            if (state.shipZip && !isDigitsOnly(state.shipZip)) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidShipZipCode: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidShipZipCode: false
                }));
            }

            validateBillingInfo(errorList);

        }
    }
    const validateBillingInfo = (errorList) => {
        if (state.billingName || state.billingCity || state.billingAddress1 ||
            state.billingState || state.billingZip || state.creditCardNumber ||
            state.creditCardType || state.ccExpMonth || state.ccExpYear) {
            if (!state.billingName) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingName: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingName: false
                }));
            }

            if (!state.billingCity) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingCity: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingCity: false
                }));
            }

            if (!state.billingAddress1) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingAddress1: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingAddress1: false
                }));
            }

            if (!state.billingState) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingState: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingState: false
                }));
            }

            if (!state.billingZip) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingZip: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorBillingZip: false
                }));
            }

            if (state.billingZip && !isDigitsOnly(state.billingZip)) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidBillingZipCode: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidBillingZipCode: false
                }));
            }

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

            if (!state.creditCardType) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCardType: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCardType: false
                }));
            }
            if (!state.creditCardExpirationCvv) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCardCVV: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorCardCVV: false
                }));
            }

            if (state.creditCardExpirationCvv && state.creditCardExpirationCvv.length != 3) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidCardCVV: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidCardCVV: false
                }));
            }
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBillingName: false,
                errorBillingCity: false,
                errorBillingAddress1: false,
                errorBillingState: false,
                errorBillingZip: false,
                errorCardExpiration: false,
                errorCardNumber: false,
                errorCardType: false,
                errorCardCVV: false,
                errorInvalidCardCVV: false
            }));

            return true;
        }
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
    const [newAccountNumber, setNewAccountNumber] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [shipmentIncluded, setShipmentIncluded] = useState('');
    const [imagePath, setImagePath] = useState('');
    const resetErrors = () => {
        setErrorMessages({});
    }
    const addNewNumber = (includeShipment) => {
        setShipmentIncluded(includeShipment);
        state.activationPlanId = state.activationPlanId ? parseInt(state.activationPlanId) : 0;
        resetErrors();
        let errorList = [];
        Validate(errorList, includeShipment);
        if (errorList.length < 1) {
            setIsLoading(true);
            //state.vpRateplan = { installDate: "2023-06-05", mRC: "22", packageName: "IL" };
            state.iccArr = registrationFields.map(t => t.icc);
            state.imeiArr = registrationFields.map(t => t.imei);
            state.includeShipment = includeShipment;
            state.isPrepaid = isPrepaid;
            state.cycleDay = parseInt(state.cycleDay);
            state.customerId = ''
            if (state.ccExpMonth) {
                state.creditCardExpiration = state.ccExpMonth + '/' + state.ccExpYear;
            }
           
            state.billingCvv = state.creditCardExpirationCvv ? state.creditCardExpirationCvv:''
            var method = 'updateCustomerInformation';
            if (!isEdit) {
                method = 'addNewNumber';
            }
            PostDataAPI("telispire/" + method, state, true).then((result) => {
                if (result.success) {
                    if (result.data) {
                        if (isEdit) {
                            handleSuccess(state.accountNumber,"Customer information updated successfully" );
                            //showMessage("Success", "Customer information updated successfully", "success", 3000);
                        } else {
                            setNewAccountNumber(result.data.accountNumber);
                            setNewPhoneNumber(result.data.phoneNumber);
                            setActivatedMessage(true);
                            if (includeShipment && result.data.path) {
                                //window.open(result.data.path, "_blank");
                                setImagePath(result.data.path);
                            }
                        }
                        
                        // showMessage("Success", "Line added successfully", "success", 3000);
                        //setTimeout(() => { handleClose(); }, 3000)

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
    const [wirelessPlans, setWirelessPlans] = useState([]);
    const [lstCCType] = useState([
        { label: 'Please Select State', value: '' },
        //{ label: 'Mail in Payment', value: '1' },
        { label: 'Mastercard', value: '2' },
        { label: 'Visa', value: '3' },
        { label: 'Amex', value: '4' },
        { label: 'Discover', value: '5' },
        //{ label: 'Checking', value: '6' },
        //{ label: 'Savings', value: '7' },
        //{ label: 'Cash', value: '8' },
    ]);
    const [lstPostPaidPackages] = useState([
        { label: 'Please Select Package', value: '' },
        { label: 'Package 1', value: 'Package1' },
        { label: 'Package 2', value: 'Package2' },
        { label: 'Package 3', value: 'Package3' },
    ]);
    const handleChkboxChange = e => {

        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
        if (name == 'ShipAddressSame') {
            if (checked) {
                setState(prevState => ({
                    ...prevState,
                    shipName: state.homeContactName,
                    shipAddress2: state.homeAddress2,
                    shipState: state.homeState,
                    shipAddress1: state.homeAddress1,
                    shipCity: state.homeCity,
                    shipZip: state.homeZip,
                    shipPhone: state.homePhone,
                }));
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    shipName: '',
                    shipAddress2: '',
                    shipState: '',
                    shipAddress1: '',
                    shipCity: '',
                    shipZip: '',
                    shipPhone: '',
                }));
            }
        }
        else {
            if (checked) {
                setState(prevState => ({
                    ...prevState,
                    billingName: state.homeContactName,
                    billingAddress2: state.homeAddress2,
                    billingState: state.homeState,
                    billingAddress1: state.homeAddress1,
                    billingCity: state.homeCity,
                    billingZip: state.homeZip,
                }));
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    billingName: '',
                    billingAddress2: '',
                    billingState: '',
                    billingAddress1: '',
                    billingCity: '',
                    billingZip: '',
                }));
            }
        }
    }
    useEffect(() => {
        console.log(customerInfo)
        if (isEdit) {
            const splitName = customerInfo.fullName.split(' ');
            customerInfo.firstName = splitName[0]
            customerInfo.lastName = splitName[splitName.length-1]
            customerInfo.cycleDay = customerInfo.billingCycle
            if (customerInfo.creditCardExpiration) {
                customerInfo.ccExpMonth = customerInfo.creditCardExpiration.split('/')[0]
                customerInfo.ccExpYear = customerInfo.creditCardExpiration.split('/')[1]
            }
            setState(customerInfo);
        }
        
        var params = {
            code: "get_wireless_plans",
            parameters: [isPrepaid ? "1" : "0"]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.unshift({ t2: 'Please Select Plan', t1: 0 });
                setWirelessPlans(result.data.map(t => { return { label: t.t2, value: t.t1 } }));
            }
        })
    }, []);

    return (
        <>

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                maxWidth="lg"
                {...props} >
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>{isEdit ? 'Update - ' + customerInfo.accountNumber :'Add New Line'}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>


                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>

                                <Grid container spacing={1}>
                                    {/*{!isPrepaid ? '' :*/}
                                    {!isEdit ? <Grid row container alignItems="center">
                                        <Label title="Choose a Plan" size={3} mandatory={true} />
                                        <Grid sm={6} md={6} lg={6} xl={6}>
                                            <Select
                                                size="small"
                                                native
                                                name="activationPlanId"
                                                value={state.activationPlanId}
                                                onChange={handleSelectChange}
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
                                    </Grid>:''}
                                    
                                    {/* }*/}
                                </Grid>

                                <Grid container spacing={2}>

                                    <h4 className={classes.secHeading}>User Information</h4>

                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="First Name" size={12} mandatory={true} />
                                            <InputBaseField
                                                name="firstName"
                                                value={state.firstName}
                                                onChange={handleChange}
                                                placeholder="First name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter first name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>
                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Last Name" size={12} mandatory={true} />

                                            <InputBaseField
                                                name="lastName"
                                                value={state.lastName}
                                                onChange={handleChange}
                                                placeholder="Last name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorLastName && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter last name
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Email" size={12} mandatory={true} />
                                            <InputBaseField
                                                name="email"
                                                value={state.email}
                                                onChange={handleChange}
                                                placeholder="Email address"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorEmail && (!state.email || !validateEmail(state.email)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter a valid email address
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                    </Grid>

                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Billing Cycle" size={12} mandatory={true} />

                                            <Select
                                                size="small"
                                                native
                                                name="cycleDay"
                                                onChange={handleSelectChange}
                                                placeholder="Select"
                                                label="Select"
                                                value={state.cycleDay}
                                                className={classes.selectBaseInput}
                                            >

                                                {billingCycle.map(option =>
                                                    <option value={option.value}>{option.label}</option>
                                                )
                                                }
                                            </Select>
                                            {errorMessages.errorBillingCycle && !state.cycleDay > 0 ? (<FormHelperText style={{ color: "red" }} >
                                                Please select billing cycle
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                    </Grid>
                                </Grid>

                                {!isEdit ? <><Grid container spacing={2}>

                                    <h4 className={classes.secHeading}>Registration Information</h4>

                                </Grid>

                                    {
                                        registrationFields.map((obj, i) =>
                                            <>
                                                <Grid container spacing={2} alignItems="center" key={i}>
                                                    <Grid item lg={6}>
                                                        <Grid row >

                                                            <Label title="Figgers SIM Number" size={12} mandatory={true} />
                                                            <InputBaseField
                                                                name="icc"
                                                                value={obj.icc}
                                                                onChange={(e) => { handleChangeList(e, i) }}
                                                                placeholder="Number"
                                                                type="text"
                                                                MaxLength={19}
                                                                onKeyPress={(e) => handleNumberKeyPress(e)}

                                                            />
                                                            {errorMessages.errorIcc && (!obj.icc || obj?.icc.length < 19) ? (<FormHelperText style={{ color: "red" }} >
                                                                Please enter a valid SIM number
                                                            </FormHelperText>) : ('')}


                                                        </Grid>
                                                    </Grid>
                                                    <Grid item lg={state.activationPlanId === "15016" ? 5 : 6}>
                                                        <Grid row >
                                                            <Label title="IMEI #" size={12} mandatory={true} />

                                                            <InputBaseField
                                                                name="imei"
                                                                value={obj.imei}
                                                                onChange={(e) => { handleChangeList(e, i) }}
                                                                placeholder="IMEI"
                                                                type="text"
                                                                MaxLength={15}
                                                                onKeyPress={(e) => handleNumberKeyPress(e)}

                                                            />
                                                            {errorMessages.errorImei && (!obj.imei || obj?.imei.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                                                Please enter a valid IMEI
                                                            </FormHelperText>) : ('')}
                                                        </Grid>

                                                    </Grid>

                                                    {state.activationPlanId === "15016" ?
                                                        <Grid item sm={1} md={1} lg={1} xl={1} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <>
                                                                {i === (registrationFields?.length - 1) ?
                                                                    <span className={classes.paddingUpdate} onClick={() => addMoreFields()}> <AddCircleOutlineIcon className={classes.addIcon} /></span>
                                                                    : ""
                                                                }

                                                                {i === 0 ? "" :
                                                                    <span onClick={() => minusFields(i)}> <RemoveIcon style={{ position: 'relative', top: '10px' }} /></span>
                                                                }


                                                            </>


                                                        </Grid> : ''}
                                                </Grid>

                                            </>
                                        )
                                    }

                                    <Grid container spacing={2}>
                                        <Grid item sm={6} md={6} lg={6} xl={6} >
                                            <Grid row >
                                                <Label title="Activation ZIP Code" size={12} mandatory={true} />
                                                <InputBaseField
                                                    name="zipCode"
                                                    value={state.zipCode}
                                                    onChange={handleChange}
                                                    placeholder="Zip Code"
                                                    type="text"
                                                    MaxLength={9}
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

                                    </Grid></>:''}

                                

                                <Grid container spacing={2}>

                                    <h4 className={classes.secHeading}>Home Address</h4>

                                </Grid>

                                <Grid container spacing={2} className={classes.shippinglayout}>

                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Name" size={6} mandatory={true} />
                                            <InputBaseField
                                                name="homeContactName"
                                                value={state.homeContactName}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorHomeContactName && !state.homeContactName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Address 1" size={6} mandatory={true} />
                                            <InputBaseField
                                                name="homeAddress1"
                                                value={state.homeAddress1}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                            {errorMessages.errorHomeAddress1 && !state.homeAddress1 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter home address 1
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="City" size={6} mandatory={true} />
                                            <InputBaseField
                                                name="homeCity"
                                                value={state.homeCity}
                                                onChange={handleChange}
                                                placeholder="City"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorHomeCity && !state.homeCity ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter home city
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Zip Code" size={6} mandatory={true} />
                                            <InputBaseField
                                                name="homeZip"
                                                value={state.homeZip}
                                                onChange={handleChange}
                                                placeholder="Zip Code"
                                                type="text"
                                                MaxLength={9}
                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                            />
                                            {errorMessages.errorHomeZip && !state.homeZip ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter zip code
                                            </FormHelperText>) : ('')}
                                            {errorMessages.errorInvalidHomeZipCode && (state.homeZip && !isDigitsOnly(state.homeZip)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid zip code
                                            </FormHelperText>) : ('')}
                                            
                                        </Grid>


                                    </Grid>

                                    <Grid item sm={6} md={6} lg={6} xl={6}>


                                        <Grid row >
                                            <Label title="Alternate Phone #" size={6} mandatory={true} />
                                            <InputBaseField
                                                name="homePhone"
                                                value={formateMdnNumber(state?.homePhone)}
                                                onChange={handleHomePhoneChange}
                                                placeholder="Phone #"
                                                type="text"
                                                MaxLength={14}
                                            />
                                            {errorMessages.errorHomePhone && !state.homePhone ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter phone number
                                            </FormHelperText>) : ('')}
                                            {errorMessages.errorHomePhoneLength && state.homePhone ? (<FormHelperText style={{ color: "red" }} >
                                                The home phone number is invalid
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Address 2" size={6} />
                                            <InputBaseField
                                                name="homeAddress2"
                                                value={state.homeAddress2}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                        </Grid>

                                        <Grid row >
                                            <Label title="State" size={6} mandatory={true} />

                                            <Select
                                                size="small"
                                                native
                                                name="homeState"
                                                value={state.homeState}
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
                                            {errorMessages.errorHomeState && !state.homeState ? (<FormHelperText style={{ color: "red" }} >
                                                Please select home state
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>

                                    <h4 className={classes.secHeading}>Billing Information
                                        <Tooltip title="Provide name, address, city, state, zip code, card type, card number and card expiration values or keep all fields empty">
                                            <InfoIcon />
                                        </Tooltip>
                                        <div style={{ width: "80%", textAlign: "right" }}>
                                            <CheckboxField
                                                color="primary"
                                                onChange={handleChkboxChange}
                                                name="billAddressSame"
                                                checked={state.billAddressSame}
                                                label="Use same as home address"
                                            />
                                        </div>
                                    </h4>

                                </Grid>

                                <Grid container spacing={2} className={classes.shippinglayout}>

                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Name" size={6} />
                                            <InputBaseField
                                                name="billingName"
                                                value={state.billingName}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorBillingName && !state.billingName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter billing name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Address 2" size={6} />
                                            <InputBaseField
                                                name="billingAddress2"
                                                value={state.billingAddress2}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                        </Grid>

                                        <Grid row >
                                            <Label title="State" size={6} />

                                            <Select
                                                size="small"
                                                native
                                                name="billingState"
                                                value={state.billingState}
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
                                            {errorMessages.errorBillingState && !state.billingState ? (<FormHelperText style={{ color: "red" }} >
                                                Please select billing state
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Card Number" size={6} />
                                            <InputBaseField
                                                name="creditCardNumber"
                                                value={state?.creditCardNumber}
                                                onChange={handleCardChange}
                                                placeholder="Credit Card Number"
                                                type="text"
                                                MaxLength={19}
                                            />
                                            {errorMessages.errorCardNumber && !state.creditCardNumber ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid credit card number
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        
                                    </Grid>

                                    <Grid item sm={6} md={6} lg={6} xl={6}>
                                        <Grid row >
                                            <Label title="Address 1" size={6} />
                                            <InputBaseField
                                                name="billingAddress1"
                                                value={state.billingAddress1}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                            {errorMessages.errorBillingAddress1 && !state.billingAddress1 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter billing address 1
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="City" size={6} />
                                            <InputBaseField
                                                name="billingCity"
                                                value={state.billingCity}
                                                onChange={handleChange}
                                                placeholder="City"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorBillingCity && !state.billingCity ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter billing city
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Zip Code" size={6} />
                                            <InputBaseField
                                                name="billingZip"
                                                value={state.billingZip}
                                                onChange={handleChange}
                                                placeholder="Zip Code"
                                                type="text"
                                                MaxLength={9}
                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                            />
                                            {errorMessages.errorBillingZip && !state.billingZip ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter zip code
                                            </FormHelperText>) : ('')}

                                            {errorMessages.errorInvalidBillingZipCode && (state.billingZip && !isDigitsOnly(state.billingZip)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid zip code
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Card Type" size={6} />

                                            <Select
                                                size="small"
                                                native
                                                name="creditCardType"
                                                value={state?.creditCardType}
                                                onChange={handleSelectChange}
                                                placeholder="Select Credit Card Type"
                                                label="Select"
                                                className={classes.selectBaseInput}
                                            >
                                                {lstCCType.map(option =>
                                                    <option value={option.value}>{option.label}</option>
                                                )
                                                }
                                            </Select>
                                            {errorMessages.errorCardType && !state.creditCardType ? (<FormHelperText style={{ color: "red" }} >
                                                Please select credit card type
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item md={6} lg={6} sm={6}>
                                            <Grid row >
                                                <Label title="Expiration" size={2} />
                                                <div style={{ maxWidth: "50%", display: "inline-block", marginRight: "10px" }}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="ccExpMonth"
                                                        value={state.ccExpMonth}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstMonths.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>
                                          
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
                                    <Grid item md={6} lg={6} sm={6}>
                                        <Label title="CVV" size={4}  />
                                        <InputBaseField
                                            name="creditCardExpirationCvv"
                                            value={state?.creditCardExpirationCvv}
                                            onChange={handleChange}
                                            placeholder="Cvv"
                                            type="password"
                                            MaxLength={3}
                                            onKeyPress={(e) => handleNumberKeyPress(e)}
                                        />
                                        {errorMessages.errorCardCVV && !state.creditCardExpirationCvv ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter cvv
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorInvalidCardCVV && state.creditCardExpirationCvv ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid cvv
                                        </FormHelperText>) : ('')}

                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <h4 className={classes.secHeading}>Shipping Information
                                        <Tooltip title="Name, address, city, state and zip code are mandatory for shipping">
                                            <InfoIcon />
                                        </Tooltip>
                                        <div style={{ width: "78%", textAlign: "right" }}>
                                            <CheckboxField
                                                color="primary"
                                                onChange={handleChkboxChange}
                                                name="ShipAddressSame"
                                                checked={state.ShipAddressSame}
                                                label="Use same as home address"
                                            />
                                        </div>
                                    </h4>
                                </Grid>
                                <Grid container spacing={2} className={classes.shippinglayout}>
                                    <Grid item sm={6} md={6} lg={6} xl={6} >
                                        <Grid row >
                                            <Label title="Name" size={12} />
                                            <InputBaseField
                                                name="shipName"
                                                value={state.shipName}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorShipName && !state.shipName ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter shipment contact name
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Address" size={12} />
                                            <InputBaseField
                                                name="shipAddress1"
                                                value={state.shipAddress1}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                            {errorMessages.errorShipAddress1 && !state.shipAddress1 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid address
                                            </FormHelperText>) : ('')}
                                        </Grid>


                                        <Grid row >
                                            <Label title="City" size={12} />
                                            <InputBaseField
                                                name="shipCity"
                                                value={state.shipCity}
                                                onChange={handleChange}
                                                placeholder="City"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorShipCity && !state.shipCity ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter city
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Zip Code" size={6} />
                                            <InputBaseField
                                                name="shipZip"
                                                value={state.shipZip}
                                                onChange={handleChange}
                                                placeholder="Zip Code"
                                                type="text"
                                                MaxLength={9}
                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                            />
                                            {errorMessages.errorShipZip && !state.shipZip ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter zip code
                                            </FormHelperText>) : ('')}
                                            {errorMessages.errorInvalidShipZipCode && (state.shipZip && !isDigitsOnly(state.shipZip)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid zip code
                                            </FormHelperText>) : ('')}

                                            
                                        </Grid>


                                    </Grid>
                                    <Grid item sm={6} md={6} lg={6} xl={6}>

                                        <Grid row >
                                            <Label title="Phone" size={12} />
                                            <InputBaseField
                                                name="shipPhone"
                                                value={formateMdnNumber(state?.shipPhone)}
                                                onChange={handleShipPhoneChange}
                                                placeholder="Phone"
                                                type="text"
                                                MaxLength={14}
                                            />
                                            {errorMessages.errorShipPhone && !state.shipPhone ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter phone number </FormHelperText>) : ('')}

                                            {errorMessages.errorShipPhoneLength && state.shipPhone ? (<FormHelperText style={{ color: "red" }} >
                                                The ship phone number is invalid
                                            </FormHelperText>) : ('')}


                                        </Grid>


                                        <Grid row >
                                            <Label title="Address 2" size={6} />
                                            <InputBaseField
                                                name="shipAddress2"
                                                value={state.shipAddress2}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                type="text"
                                                MaxLength={80}
                                            />
                                        </Grid>

                                        <Grid row >
                                            <Label title="State" size={12} />

                                            <Select
                                                size="small"
                                                native
                                                name="shipState"
                                                value={state.shipState}
                                                onChange={handleSelectChange}
                                                placeholder="Select"
                                                label="Select"
                                                className={classes.selectBaseInput}
                                            >
                                                {lstStates?.map(option =>
                                                    <option value={option.value}>{option.label}</option>
                                                )
                                                }
                                            </Select>
                                            {errorMessages.errorShipState && !state.shipState ? (<FormHelperText style={{ color: "red" }} >
                                                Please select state
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                
                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                {!isEdit ? <><Button className={classes.changeBtn} onClick={() => { addNewNumber() }}>Activate</Button>
                                    <Button className={classes.changeBtn} onClick={() => { addNewNumber(true) }}>Activate & Ship</Button></> : ''}
                                {isEdit ? <Button className={classes.changeBtn} onClick={() => { addNewNumber(true) }}>Update</Button>:''}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >

            {activatedMessage ?
                <ActivatedMessage
                    dialogOpenClose={activatedMessage}
                    handleClose={activateCloseDialog}
                    accountNumber={newAccountNumber}
                    phoneNumber={newPhoneNumber}
                    shipmentIncluded={shipmentIncluded}
                    imagePath={imagePath}

                ></ActivatedMessage>
                : null}





        </>
    )
}

export default withSnackbar(ActivateNow);
