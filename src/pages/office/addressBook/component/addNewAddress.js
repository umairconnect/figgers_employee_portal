import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';

import { InputBaseField, SelectField, TextareaField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { validateEmail, handleNumberKeyPress, isDigitsOnly, formateMdnNumber, validatePhoneNumber } from '../../../../../src/components/Common/Extensions';
import axios from 'axios';

function AddNewAddress({ dialogOpenClose, handleClose, handleSuccessClose, data, ...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(data ? data : { addressBookId:0});

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
    const { showMessage } = props;

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
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const [errorMessages, setErrorMessages] = useState({});
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const Validate = (errorList) => {

        if (!state.companyName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCompanyName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCompanyName: false
            }));
        }

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

        if (!state.email) {
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

        if (state.email && !validateEmail(state.email)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorValidEmail: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorValidEmail: false
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

        if (!state.address) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAddress: false
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
    }

    const addAddressBook = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            PostDataAPI("figgaddressbook/add", state).then((result) => {
                if (result.success && result.data != null) {
                    if (result.data) {
                        if (state.addressBookId > 0)
                            handleSuccessClose("Address updated successfully.");
                        else
                            handleSuccessClose("Address saved successfully.");
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
    }, []);

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            PaperComponent={DraggableComponent}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>{state.addressBookId >0 ?'Update Address':'Add New Address'}</Typography>

                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>


                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <Scrollbars autoHeight autoHeightMax={570}>
                        <div className={classes.content}>
                            <Grid container spacing={4}>
                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Label size={12} title="Company Name" mandatory={true}/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            value={state.companyName}
                                            onChange={handleChange}
                                            placeholder='Company Name'
                                            IsDisabled={false}
                                            MaxLength={80}
                                        />
                                        {errorMessages.errorCompanyName && !state.companyName ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter company name
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Label size={12} title="Attention to" mandatory={true}/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            id="attentionTo"
                                            name="attentionTo"
                                            type="text"
                                            value={state.attentionTo}
                                            onChange={handleChange}
                                            placeholder='Attention To'
                                            IsDisabled={false}
                                            MaxLength={80}
                                        />
                                        {errorMessages.errorAttentionTo && !state.attentionTo ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter attention to
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={4}>
                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Label size={12} title="Email" mandatory={true}/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            id="email"
                                            name="email"
                                            type="text"
                                            value={state.email}
                                            onChange={handleChange}
                                            placeholder='Email'
                                            IsDisabled={false}
                                            MaxLength={80}
                                        />
                                        {errorMessages.errorEmail && !state.email ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter email
                                        </FormHelperText>) : ('')}

                                        {errorMessages.errorValidEmail && (state.email && !validateEmail(state.email)) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid email
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                                <Grid item sm={6} md={6} lg={6} xl={6} >
                                    <Label size={12} title="Phone #" mandatory={true}/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            name="phone"
                                            value={formateMdnNumber(state?.phone)}
                                            onChange={handlePhoneChange}
                                            placeholder="Phone #"
                                            type="text"
                                            MaxLength={14}
                                        />
                                        {errorMessages.errorPhone && !state.phone ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter phone number
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorInvalidPhone && state.phone && !validatePhoneNumber(state.phone) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid phone number
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Label size={12} title="Address" mandatory={true} />
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <InputBaseField
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={state.address}
                                        onChange={handleChange}
                                        placeholder='Address'
                                        IsDisabled={false}
                                        MaxLength={80}
                                    />
                                    {errorMessages.errorAddress && !state.address ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter address
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item sm={4} md={4} lg={4} xl={4} >
                                    <Label size={12} title="City" mandatory={true} />
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            id="city"
                                            name="city"
                                            type="text"
                                            value={state.city}
                                            onChange={handleChange}
                                            placeholder='City'
                                            IsDisabled={false}
                                            MaxLength={50}
                                        />
                                        {errorMessages.errorCity && !state.city ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter city
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                                <Grid item sm={4} md={4} lg={4} xl={4} >
                                    <Label size={12} title="State" mandatory={true} />
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
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

                                <Grid item sm={4} md={4} lg={4} xl={4} >
                                    <Label size={12} title="Zip code" mandatory={true}/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <InputBaseField
                                            id="zipCode"
                                            name="zipCode"
                                            type="text"
                                            value={state.zipCode}
                                            onChange={handleZipCodeChange}
                                            MaxLength={9}
                                            onKeyPress={(e) => handleNumberKeyPress(e)}
                                            placeholder='Zip code'
                                            IsDisabled={false}
                                        />
                                        {errorMessages.errorZipCode && !state.zipCode ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter zip code
                                        </FormHelperText>) : ('')}

                                        {errorMessages.errorInvalidZipCode && (state.zipCode && !isDigitsOnly(state.zipCode)) ? (<FormHelperText style={{ color: "red" }} >
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
                            <Button className={classes.changeBtn} onClick={addAddressBook}>{state.addressBookId > 0 ? 'Update' : 'Add New'}</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(AddNewAddress);
