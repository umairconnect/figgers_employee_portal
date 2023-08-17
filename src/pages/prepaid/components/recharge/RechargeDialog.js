import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'
import RichTextEditor from 'react-rte';
import { message, Space, Row } from "antd";
import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { InputBaseField, TextareaField, SelectField } from "../../../../components/InputField/InputField";
import { Label, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import {
    handleNumberKeyPress, validateEmail, formateMdnNumber, wirelessStatus, formatDateByFormate,
    validatePhoneNumber
} from '../../../../../src/components/Common/Extensions';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import OfferImage from './../../../../assets/img/action/offerImage.svg';
import { withSnackbar } from "../../../../components/Message/Alert";
import MessageDialog from '../../../../components/MessageDialog/MessageDialog';
import PaymentSuccessIcon from './../../../../assets/img/Payment_Success.gif';
import PaymentFailedIcon from './../../../../assets/img/Payment_Faled_failed.gif';


function RechargeDialog({ dialogOpenClose, handleClose, handleSuccessClose, userData, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [customerId] = useState(userData.accountNumber);
    const [loginUser] = useState(JSON.parse(GetUserInfo()).user);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [lineApproved, setLineApproved] = useState(false);

    const [lineInformation, setLineInformation] = useState({});
    const [state, setState] = useState({ phoneNumber: '' });
    const [wirelessLine, setWirelessLines] = useState([]);
    const [paymentResponse, setPaymentResponse] = useState('');
    const [messageDialog, setMessageDialog] = useState(false);
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

    const openMessage = () => {
        setMessageDialog(true)
    }

    const closeMessage = () => {
        setMessageDialog(false)
    }

    const [months] = useState([
        { label: 'Please Select Month', value: '' },
        { label: 'Jan', value: '01' },
        { label: 'Feb', value: '02' },
        { label: 'Mar', value: '03' },
        { label: 'Apr', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'Aug', value: '08' },
        { label: 'Sept', value: '09' },
        { label: 'Oct', value: '10' },
        { label: 'Nov', value: '11' },
        { label: 'Dec', value: '12' },

    ]);

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


    const getLineInformation = (mdnNumber) => {
        var obj = {
            mdn: mdnNumber
        };
        setLoading(true);
        PostDataAPI("telispire/getLineIVRDetailsByMDN", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setLineInformation(result.data);
                console.log(result.data);
                setLineApproved(true);
            }
            else {
                //show line error message
                showMessage("Error", result.message, "error", 3000);
                setLineApproved(false);
            }
            setLoading(false);
        })
    }

    const Validate = (errorList, includeShipment) => {
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
        if (state.emailAddress && !validateEmail(state.emailAddress)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidEmailAddress: true
            }));
            errorList.push(true);
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidEmailAddress: false
            }));
        }
    }

    const rechargeLine = () => {
        if (!lineApproved) {
            showMessage("Error", "Figgers wireless line Inactive, please activate line first.", "error", 3000);
            return;
        } else {
            let errorList = [];
            Validate(errorList);
            if (errorList.length < 1) {
                var obj = {
                    AccountNumber: userData.accountNumber,
                    mdn: state.phoneNumber,
                    homeZip: userData.homeZip,
                    billingZip: userData.billingZip,
                    mdnStatus: lineInformation.currentStatus,
                    creditCardNumber: state.creditCardNumber,
                    creditCardExpiration: state.ccExpMonth + '/' + state.ccExpYear,
                    isPrepaid: lineInformation.isPrepaid,
                    email: state.emailAddress
                };
                PostDataAPI("telispire/rechargePackage", obj, true).then((result) => {
                    setMessageDialog(true)
                    if (result.success) {
                        setPaymentResponse('Your Transaction is successful, Keep smiling! The receipt has been sent to your provided / registered email address.');
                        setShowSuccessDialog(true)
                    }
                    else {
                        setPaymentResponse('Card number you have entered is not valid or incorrect, please check or re-enter the card number');
                        setShowSuccessDialog(false)
                    }
                })
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



    const getCustomerLines = () => {
        var obj = {
            AccountNumber: userData.accountNumber
        };
        PostDataAPI("customer/getCustomerLines", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setWirelessLines(prevState => [...prevState, { value: '', label: 'Select Phone Number' }]);
                result.data.map((item, i) => {
                    setWirelessLines(prevState => [...prevState, { value: item.mdn, label: formateMdnNumber(item.mdn) }]);
                })
                const primaryMdn = result.data.filter((item) => item.is_primary == true);
                if (primaryMdn) {
                    setState(prevState => ({
                        ...prevState,
                        ['phoneNumber']: primaryMdn[0].mdn
                    }));
                }
            }
        })
    }

    const checkIfPhoneNumberIsActive = () => {
        let errorList = [];
        if (!state.phoneNumber) {
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
        if (state.phoneNumber && !validatePhoneNumber(state.phoneNumber)) {
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
        if (errorList.length < 1) {
            getLineInformation(state.phoneNumber);
        }

    }
    const handleBackClick = () => {
        setLineApproved(false);
    }

    useEffect(() => {
        console.log(userData);
        getCustomerLines();
        //getLineInformation();
    }, []);
    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="lg"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Express Payment </Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        {loading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>
                                <Grid row>
                                    <h1>Express payments are processed immediately </h1>
                                    <p>If your service is disconnected, please allow up to two (2) hours.  </p>
                                </Grid>

                                {!lineApproved ?
                                    <div className={classes.greyBorderbox}>
                                        <Grid row>
                                            <Grid container lg={11} md={11} sm={11} xl={11} justifyContent={"center"} style={{ margin: 'auto' }}>
                                                <Grid item lg={12} md={12} >
                                                    <Label title="Number" size={12} mandatory={true} />
                                                </Grid>
                                                <Grid item lg={9} md={9} sm={9} xl={9}>
                                                    {/*<InputBaseField*/}
                                                    {/*    name="phoneNumber"*/}
                                                    {/*    placeholder="Number"*/}
                                                    {/*    type="text"*/}
                                                    {/*    value={state.phoneNumber}*/}
                                                    {/*    onChange={handlePhoneChange}*/}
                                                    {/*    MaxLength={14}*/}
                                                    {/*/>*/}

                                                    <Select
                                                        size="small"
                                                        native
                                                        name="phoneNumber"
                                                        onChange={handleSelectChange}
                                                        value={state?.phoneNumber}
                                                        placeholder="Select Phone Number"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {wirelessLine.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>

                                                    {errorMessages.errorPhone && !state.phoneNumber ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select phone number
                                                    </FormHelperText>) : ('')}
                                                    {errorMessages.errorInvalidPhone && state.phoneNumber && !validatePhoneNumber(state.phoneNumber) ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select valid phone number
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                                <Grid item lg={3} md={3} sm={3} xl={3} style={{ paddingLeft: '10px', paddingBottom: '15px', paddingTop: '6px' }}>
                                                    <Button className={classes.changeBtn} onClick={checkIfPhoneNumberIsActive}>Next</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid> </div> : ''}



                                {lineApproved ? <Grid row>

                                    <Grid row>
                                        <Grid sm={12} md={112} lg={12} xl={12}>
                                            <h2 className={classes.paymentHeading}>PAYMENT INFORMATION </h2>
                                        </Grid>
                                        <Grid sm={12} md={112} lg={12} xl={12} className={classes.paymentInfor}>
                                            <h3 className={classes.payInfo}> Payment for:  <span>{formateMdnNumber(lineInformation.mdn)}</span></h3>
                                            <h3 className={classes.payInfo}> Plan Name:   <span> {lineInformation.planName} </span></h3>
                                            <h3 className={classes.payInfo}> Current Status:  <span>  {wirelessStatus(lineInformation.currentStatus)} </span></h3>
                                            <h3 className={classes.payInfo}> Amount Due (including taxes): <span> {lineInformation.balance ? '$ ' + lineInformation.balance : ''} </span><span>{lineInformation.isPayEarly ? ' Pay Early' : ''}</span></h3>
                                        </Grid>
                                    </Grid>

                                    <Grid row>

                                        <Grid sm={12} md={112} lg={12} xl={12} className={classes.rechargeForm}>
                                            <h2 className={classes.paymentHeading}>CARD INFORMATION </h2>
                                            <div className={classes.formContainer}>

                                                <Grid row lg={12}>
                                                    <Label title="Card Number" className={classes.flexStart} size={12} mandatory={true} />
                                                    <Grid lg={12} md={12} sm={12}>
                                                        <InputBaseField
                                                            name="creditCardNumber"
                                                            value={state?.creditCardNumber}
                                                            onChange={handleCardChange}
                                                            placeholder="0000-0000-0000-0000"
                                                            type="text"
                                                            MaxLength={19}
                                                            cardField={true}
                                                        />
                                                        {errorMessages.errorCardNumber && !state.creditCardNumber ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter credit card number
                                                        </FormHelperText>) : ('')}
                                                        {errorMessages.errorInvalidCardNumber && state.creditCardNumber && state.creditCardNumber.length != 19 ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter valid credit card number
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>

                                                <Grid row lg={12}>
                                                    <Label title="Credit Card Expiration Date:" className={classes.flexStart} size={12} mandatory={true} />
                                                    <Grid container lg={12} style={{ alignItems: 'baseline' }}>
                                                        <Grid item lg={6} md={6} sm={6} style={{ paddingRight: '8px' }}>
                                                            <Grid lg={12} md={12} sm={12}>
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
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item lg={6} md={6} sm={6}>

                                                            <InputBaseField
                                                                name="ccExpYear"
                                                                value={state?.ccExpYear}
                                                                onChange={handleChange}
                                                                placeholder="Year"
                                                                type="text"
                                                                MaxLength={2}
                                                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    {errorMessages.errorCardExpiration && !validateCreditCardExpiry() ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter valid credit card expiration
                                                    </FormHelperText>) : ('')}
                                                </Grid>


                                                <Grid row lg={12}>
                                                    <Label title="Email to get a receipt (optional)" className={classes.flexStart} size={12} />

                                                    <Grid lg={12} md={12} sm={12} xl={12}>
                                                        <InputBaseField
                                                            name="emailAddress"
                                                            placeholder="Email Address"
                                                            type="email"
                                                            value={state.emailAddress}
                                                            onChange={handleChange}
                                                            MaxLength={80}
                                                        />
                                                        {errorMessages.errorEmailAddress && !state.emailAddress ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter email address
                                                        </FormHelperText>) : ('')}
                                                        {errorMessages.errorInvalidEmailAddress && state.emailAddress && !validateEmail(state.emailAddress) ? (<FormHelperText style={{ color: "red" }} >
                                                            Please enter valid email address
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>


                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div className={classes.footer}>
                                        <Button className={classes.changeBtn} onClick={handleBackClick} >Back</Button>
                                        {loading ? <Button className={classes.changeBtn} disabled={!lineApproved}>Submit</Button> :
                                            <Button className={classes.changeBtn} onClick={rechargeLine} disabled={!lineApproved}>Submit</Button>}
                                    </div>
                                </Grid> : ''
                                }

                                <Grid row className={classes.Notes}>
                                    <p> Please Note: Your Payment will be posted today, {formatDateByFormate(new Date(), 'dddd, MMMM D, YYYY')}</p>
                                    <p>Each Month will be charged individually. </p>
                                </Grid>

                                <Grid row className={"textCenter"}>
                                    <img src={OfferImage} />
                                </Grid>

                            </div>
                        </Scrollbars>

                    </div>
                </div>
            </Dialog >
            {messageDialog ?
                <MessageDialog
                    icon={showSuccessDialog ? PaymentSuccessIcon : PaymentFailedIcon}
                    iconSize={"160px"}
                    messageText={paymentResponse}
                    openMessage={openMessage}
                    closeMessage={closeMessage}>
                </MessageDialog> : ''
            }

        </>
    )
}

export default withSnackbar(RechargeDialog);