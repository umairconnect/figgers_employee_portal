import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';

import { InputBaseField, SelectField, TextareaField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { lstStates, lstCountry, lstMonths } from '../../../../../src/components/Common/Lookup';
import { formateMdnNumber, validatePhoneNumber, handleNumberKeyPress, isDigitsOnly } from '../../../../../src/components/Common/Extensions';

function ChangeShippingAddress({ addressType, dialogOpenClose, handleClose, handleSuccessClose, accountNumber, objAddress, ...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const { showMessage } = props;
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
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

    const [months] = useState([
        { label: 'Please Select Month', value: '' },
        { label: 'Jan',  value: '01' },
        { label: 'Feb',  value: '02' },
        { label: 'Mar',  value: '03' },
        { label: 'Apr',  value: '04' },
        { label: 'May',  value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'Aug',  value: '08' },
        { label: 'Sept', value: '09' },
        { label: 'Oct',  value: '10' },
        { label: 'Nov',  value: '11' },
        { label: 'Dec',  value: '12' },

    ]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const Validate = (errorList, includeShipment) => {
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

        if (!state.zip) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZip: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZip: false
            }));
        }

        if (state.zip && !isDigitsOnly(state.zip)) {
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

        if (addressType == "updateBillingAddress") {
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

            if (state.creditCardNumber && state.creditCardNumber.length != 19) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidCardNumber: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorInvalidCardNumber: false
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
        }
        else {
            if (state.phone && !validatePhoneNumber(state.phone)) {
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
    const UpdateAddress = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.accountNumber = accountNumber;
            var obj = { accountNumber: accountNumber };
            if (addressType == "updateBillingAddress") {
                obj.billingAddress1 = state.address1;
                obj.billingAddress2 = state.address2;
                obj.billingCity = state.city;
                obj.billingState = state.state;
                obj.billingName = state.contactName;
                obj.billingZip = state.zip;
                obj.creditCardExpiration = state.ccExpMonth + '/' + state.ccExpYear;
                obj.creditCardNumber = state.creditCardNumber;
                obj.creditCardType = state.creditCardType;
                obj.billingCvv = '232'
            }
            else if (addressType == "updateShipAddress") {
                obj.shipAddress1 = state.address1;
                obj.shipAddress2 = state.address2;
                obj.shipCity = state.city;
                obj.shipState = state.state;
                obj.shipName = state.contactName;
                obj.shipPhone = state.phone ? state.phone.replace(' ', '').replace('(', '').replace(')', '').replace('-', '') : '';
                obj.shipZip = state.zip;
            }
            PostDataAPI("telispire/" + addressType, obj).then((result) => {
                if (result.success && result.data != null) {
                    if (result.data) {
                        handleSuccessClose(state);
                        //showMessage("Success", "Line added successfully", "success", 3000);
                        /*setTimeout(() => { handleSuccessClose(); }, 3000)*/

                    }
                    else {
                        showMessage("Error", "Error updating address, please contact administrator", "error", 3000);
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
       
        if (objAddress) {
            if (objAddress.creditCardExpiration) {
                objAddress.ccExpMonth = objAddress.creditCardExpiration.split('/')[0]
                objAddress.ccExpYear = objAddress.creditCardExpiration.split('/')[1]
            }
            
            setState(objAddress)
        }
       
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
                            <Typography className={classes.title}>{addressType === "updateBillingAddress" ? "Change Payment Info" : "Change Shipping Address"}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>


                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>
                                <Grid container>

                                    {addressType == "updateBillingAddress" ?
                                        <>
                                            <Grid row container>
                                                <Grid item sm={6} md={6} lg={6} xl={6} className='paddingRightEight'>
                                                    <Grid row >
                                                        <Label title="Card Type" size={4} mandatory={true} />

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

                                                    <Grid row>

                                                        <Label title="Expiry Date" size={12} mandatory={true} />

                                                        <div style={{ maxWidth: "100%", display: "flex", alignItems: "baseline", gap: '8px' }}>

                                                            <Select
                                                                size="small"
                                                                native
                                                                name="ccExpMonth"
                                                                value={state?.ccExpMonth}
                                                                onChange={handleSelectChange}
                                                                placeholder="Select Month"
                                                                label="Select"
                                                                className={classes.selectBaseInput}
                                                            >
                                                                {months.map(option =>
                                                                    <option value={option.value}>{option.label}</option>
                                                                )
                                                                }
                                                            </Select>

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

                                                <Grid item sm={6} md={6} lg={6} xl={6}>
                                                    <Grid row >
                                                        <Label title="Card Number" size={4} mandatory={true} />
                                                        <InputBaseField
                                                            name="creditCardNumber"
                                                            value={state?.creditCardNumber}
                                                            onChange={handleCardChange}
                                                            placeholder="Credit Card Number"
                                                            type="text"
                                                            MaxLength={19}
                                                        />
                                                        {errorMessages.errorCardNumber && !state.creditCardNumber ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter credit card number
                                                        </FormHelperText>) : ('')}

                                                        {errorMessages.errorInvalidCardNumber && state.creditCardNumber && state.creditCardNumber.length != 19 ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter valid credit card number
                                                        </FormHelperText>) : ('')}

                                                    </Grid>

                                                    <Grid row >
                                                        <Label title="CVV" size={4} mandatory={true} />
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
                                               

                                            </Grid>


                                            <h3 className="textLeft"> Billing Information </h3>
                                            <hr className="greyLine"></hr>

                                        </>
                                        : ''}
                                </Grid>

                                <Grid container spacing={2} className={classes.shippinglayout}>

                                    <Grid item sm={6} md={6} lg={6} xl={6} style={{order: addressType == "updateBillingAddress" ? 1: 0}}>
                                        
                                    {addressType == "updateBillingAddress" ? '' : <Grid row >
                                            <Label title="Name" size={4} />
                                            <InputBaseField
                                                name="contactName"
                                                value={state?.contactName}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                type="text"
                                                MaxLength={50}
                                            />
                                        </Grid>
                                        }

                                        <Grid row >
                                            <Label title="Address 2" size={4} />
                                            <InputBaseField
                                                name="address2"
                                                value={state?.address2}
                                                onChange={handleChange}
                                                placeholder="Address 2"
                                                type="text"
                                                MaxLength={80}
                                            />
                                        </Grid>

                                        <Grid row >
                                            <Label title="State" size={4} mandatory={true} />

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


                                        {addressType == "updateShipAddress" ?
                                            <>
                                                <Grid row >
                                                    <Label title="Phone" size={4} />
                                                    <InputBaseField
                                                        name="phone"
                                                        value={formateMdnNumber(state?.phone)}
                                                        onChange={handlePhoneChange}
                                                        placeholder="Phone"
                                                        type="text"
                                                        MaxLength={14}
                                                    />
                                                    {errorMessages.errorPhone && state.phone && !validatePhoneNumber(state.phone) ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter valid phone number
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </>
                                            : ''}

                                    </Grid>

                                    <Grid item sm={6} md={6} lg={6} xl={6} style={{order: addressType == "updateBillingAddress" ? 0: 1}}>

                                        <Grid row >
                                            <Label title="Address 1" size={4} mandatory={true} />
                                            <InputBaseField
                                                name="address1"
                                                value={state?.address1}
                                                onChange={handleChange}
                                                placeholder="Address 1"
                                                type="text"
                                                MaxLength={80}
                                            />
                                            {errorMessages.errorAddress1 && !state.address1 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter address 1
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="City" size={4} mandatory={true} />
                                            <InputBaseField
                                                name="city"
                                                value={state?.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                type="text"
                                                MaxLength={50}
                                            />
                                            {errorMessages.errorCity && !state.city ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter city
                                            </FormHelperText>) : ('')}
                                        </Grid>

                                        <Grid row >
                                            <Label title="Zip Code" size={4} mandatory={true} />
                                            <InputBaseField
                                                name="zip"
                                                value={state?.zip}
                                                onChange={handleChange}
                                                placeholder="Zip Code"
                                                type="text"
                                                MaxLength={9}
                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                            />
                                            {errorMessages.errorZip && !state.zip ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter zip code
                                            </FormHelperText>) : ('')}
                                            {errorMessages.errorInvalidZipCode && (state.zip && !isDigitsOnly(state.zip)) ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter valid zip code
                                            </FormHelperText>) : ('')}
                                            
                                        </Grid>



                                    </Grid>
                                </Grid>
                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                <Button className={classes.changeBtn} onClick={UpdateAddress}>Change</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >







        </>
    )
}

export default withSnackbar(ChangeShippingAddress);
