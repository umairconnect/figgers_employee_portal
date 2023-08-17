import React, { useState, useEffect, useRef } from 'react'

import {
    Button,
    Card, Collapse, Grid, Paper, Typography, Select,
    FormHelperText
} from "@material-ui/core";

import useStyles from "./styles";

import { InputBaseField, SelectField } from "../../components/InputField/InputField";
import { CustomBtn, Label } from "../../components/UiElements/UiElements";
import profilePlaceholder from '../../assets/img/profilePlaceholder.jpg';
import Envelope from '../../assets/img/action/email-icon.svg';
import CallIcon from '../../assets/img/action/call-icon.svg';
import CalendarToday from '../../assets/img/icons/calendarToday.svg';
//import Location from '../../assets/img/icons/map-marker-Bold.svg';
import { GetUserInfo } from "../../Services/GetUserInfo";
import { PostDataAPI } from '../../Services/APIService';
import EditPen from '../../assets/img/action/penWhite.svg';
import Loader from './../../components/Loader/Loader';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TopSpacer from '../../components/Common/spacer/TopSpacer';
import { withSnackbar } from "./../../components/Message/Alert";
import { formateMdnNumber, getAgeByDOBInYears, validatePhoneNumber, handleNumberKeyPress, allowedAttachmentsImages, validateEmail, validateDateOfBirth, formatDate, getFormatedDate } from '../../../src/components/Common/Extensions';
import Breadcrums from '../../components/BreadCrums/breadcrums';
import { useLocation, useParams, useHistory } from "react-router-dom";

function Profile({ ...props }) {

    const classes = useStyles();
    const { showMessage } = props;
    const commonAttachments = allowedAttachmentsImages();
    const [isLoading, setIsLoading] = useState(false);
    let user_info = JSON.parse(GetUserInfo());
    const [customerID] = useState(user_info.user.customerID);
    const [userID] = useState(user_info.user.userID);
    const [state, setState] = React.useState({ firstName:'',lastName:''});
    const [customerRecord, setCustomerRecord] = React.useState({});

    let history = useHistory();
    const [errorMessages, setErrorMessages] = useState({});

    const [profileImage, setProfileImage] = useState({ file: null, fileToSend: null, fileName: null });
    function uploadSingleFile(e) {
        if (e.target.files == null || e.target.files.length <= 0)
            return
        const name = e.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        switch (ext) {
            case commonAttachments[ext]:
                break;
            default:
                showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg", "error", 3000);
                return;
        }
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    const inputFile = useRef(null);

    const uploadFile = () => {

        inputFile.current.click();
    };

    const [occupation, setOccupation] = useState([]);

    //const Occupation = [
    //    {
    //        label: 'Select Occupation',
    //        value: ''
    //    },
    //    {
    //        label: "Engineer",
    //        value: "Engineer",
    //    },
    //    {
    //        label: "Doctor",
    //        value: "Doctor",
    //    },
    //]

    const Gender = [
        { label: 'Select Gender', value: '' },
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        },
    ]

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



    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

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

    const ValidateRecord = (errorList) => {
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

        if (!state.phoneNumber) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneNumber: false
            }));
        }
        if ((state.phoneNumber && !validatePhoneNumber(state.phoneNumber))) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPhoneNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPhoneNumber: false
            }));
        }

        if (!state.occupation) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOccupation: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorOccupation: false
            }));
        }


        var toDay = toDayDate();
        if (!state.dateOfBirth || state.dateOfBirth.trim() === "") {

            setErrorMessages(prevState => ({
                ...prevState,
                errorDOB: true
            }));

            errorList.push(true);

        }
        else if (state.dateOfBirth && state.dateOfBirth > toDay) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: true
            }));

            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOB: false
            }));
            setErrorMessages(prevState => ({
                ...prevState,
                errorDOBFuture: false
            }));
        }

        if (!state.gender) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGender: true
            }));
            errorList.push(true);
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorGender: false
            }));
        }

        //address validation

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

        //if (!state.homeContactName) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorHomeName: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorHomeName: false
        //    }));
        //}

        //if (!state.homePhone || (state.homePhone && !validatePhoneNumber(state.homePhone))) {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorHomePhone: true
        //    }));
        //    errorList.push(true);
        //}
        //else {
        //    setErrorMessages(prevState => ({
        //        ...prevState,
        //        errorHomePhone: false
        //    }));
        //}




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

    const updateCustomerProfileImage = (_url, _file, _name) => {
        let method = "telispire/updateCustomerProfileImage";
        const formData = new FormData();
        formData.append("customerId", customerID);
        formData.append("formFile", _file);
        formData.append("fileName", _name);
        formData.append("accountPhoneNumber", state.accountPhoneNumber);

        PostDataAPI(method, formData, true, "formData").then((result) => {
            if (result.success == true) {
                showMessage("Success", "Profile Image updated successfully.", "success", 3000);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
        })

    }


    const updateUserProfileDetails = () => {
        let errorList = [];
        ValidateRecord(errorList);
        if (errorList.length < 1) {
            let method = "auth/updateUserDetails";

            const formData = new FormData();
            for (var key in state) {
                if (state[key] && key != "fileToSend"
                    && key != "photoName"
                    && key != "encUserID"
                )
                    formData.append(key, state[key]);
            }
            formData.append("photoFile", profileImage.fileToSend);
            formData.append("photoName", profileImage.fileName);
            setIsLoading(true);

            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsLoading(false);
                if (result.success == true) {
                    setErrorMessages([]);
                    updateUserSessionInfo();
                    showMessage("Success", "Profile updated successfully.", "success", 3000);
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    const updateUserSessionInfo = () => {
        var obj = { userID: userID };
        PostDataAPI("auth/getLoginUserDetails", obj, true).then((result) => {
            if (result.success && result.data != null) {
                user_info.user.firstName = result.data.firstName
                user_info.user.lastName = result.data.lastName
                user_info.user.userPhotoPath = result.data.userPhotoPath
                sessionStorage.removeItem('user_info')
                sessionStorage.setItem('user_info', JSON.stringify(user_info))
            }
        });
    }

    const getLoginUserDetails = () => {

        var obj = { userID: userID };
        setIsLoading(true);
        PostDataAPI("auth/getLoginUserDetails", obj, true).then((result) => {
            if (result.success && result.data != null) {
                result.data.dateOfBirth = result.data.dateOfBirth?.split('T')[0];
                setState(result.data);
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }

    function toDayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const initializations = () => {
        var params = {
            code: "get_occupations",
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setOccupation(prevState => [...prevState, { value: '', label: 'Select Occupation' }]);
                result.data.map((item, i) => {
                    setOccupation(prevState => [...prevState, { value: item.text1, label: item.text2 }]);
                })
            }
        })
    }

    useEffect(() => {
        initializations();
        getLoginUserDetails();
    }, []);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums isBack={true} parentLink={"Profile"} currentLink=""></Breadcrums>
                    </Grid>
                </Grid>
             
            </div>


            <Grid container className={classes.boxContainer}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.whiteBox}>
                        <div className={classes.informationSec}>

                            <div className={classes.profileImg}>
                                {profileImage.file || state.userPhotoPath ?
                                    <>
                                        <img src={profileImage.file ? profileImage.file : '.' + state.userPhotoPath} className='profile-image' />
                                    </>
                                    : <div className="user-profile-page" style={{ backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>
                                }
                                <img className={classes.EditICon} src={EditPen} onClick={uploadFile} />
                                <form>
                                    <div>
                                        <input type="file" id="fileUploadField" ref={inputFile} className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                    </div>
                                </form>
                            </div>

                            <div style={{ padding: '10px 15px' }}>
                                <h4>{state.firstName + ' ' + state.lastName}</h4>
                                <p style={{ display: 'flex', alignItems: 'inherit' }}><span style={{minWidth: '40px'}}> <img src={Envelope} />  </span> {state?.emailAddress} </p>
                                <p style={{ display: 'flex', alignItems: 'inherit' }}><span style={{minWidth: '40px'}}> <img src={CallIcon} /> </span>  {state?.phoneNumber ? formateMdnNumber(state?.phoneNumber) : ''}</p>
                                <p style={{ display: 'flex', alignItems: 'inherit' }}><span style={{minWidth: '40px'}}> <img src={CalendarToday} />  </span> {state?.dateOfBirth ? " " + formatDate(state?.dateOfBirth) +' '+ getAgeByDOBInYears(state.dateOfBirth,' | ') : ''}</p>
                            </div>

                        </div>

                    </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.whiteBox}>
                        <h3> Profile</h3>

                        <Grid container className={classes.formContaner}>

                            <Grid lg={4} md={4} sm={4} xs={4} className="p-right-ten">
                                <Grid row >
                                    <Label item title="First Name" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <InputBaseField
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            MaxLength="50"
                                            value={state.firstName}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorFirstName && !state.firstName ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter first name
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                            </Grid>


                            <Grid lg={4} md={4} sm={4} xs={4} className="p-right-ten">
                                <Grid row >
                                    <Label item title="Last Name" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <InputBaseField
                                            name="lastName"
                                            type="text"
                                            placeholder="Name"
                                            MaxLength="50"
                                            value={state.lastName}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorLastName && !state.lastName ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter last name
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>

                            </Grid>


                        </Grid>

                        <Grid container className={classes.formContaner}>
                            <Grid lg={4} md={4} sm={4} xs={4}>

                                <Grid row>
                                    <Label item title="Email address" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <InputBaseField
                                            name="emailAddress"
                                            type="email"
                                            placeholder="Email"
                                            MaxLength="100"
                                            value={state.emailAddress}
                                            onChange={handleChange}
                                        />
                                        {errorMessages.errorEmailAddress && (!state.emailAddress || !validateEmail(state.emailAddress)) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid email address
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid lg={4} md={4} sm={4} xs={4}>

                                <Grid row>
                                    <Label item title="Phone #" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <InputBaseField
                                            name="phoneNumber"
                                            type="phone"
                                            placeholder="Phone"
                                            MaxLength={14}
                                            value={state.phoneNumber}
                                            onChange={handlePhoneChange}
                                        />
                                        {errorMessages.errorPhoneNumber && !state.phoneNumber ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter phone number
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorInvalidPhoneNumber && (state.phoneNumber && !validatePhoneNumber(state.phoneNumber)) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter valid phone number
                                        </FormHelperText>) : ('')}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.formContaner}>
                            <Grid lg={4} md={4} sm={4} xs={4}>
                                <Grid row>
                                    <Label item title="Occupation" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <Select
                                            size="small"
                                            native
                                            name="occupation"
                                            value={state?.occupation}
                                            onChange={handleSelectChange}
                                            placeholder="Select"
                                            label="Select"
                                            className={classes.selectBaseInput}
                                        >
                                            {occupation.map(option =>
                                                <option value={option.value}>{option.label}</option>
                                            )
                                            }
                                        </Select>
                                        {errorMessages.errorOccupation && !state.occupation ? (<FormHelperText style={{ color: "red" }} >
                                            Please select occupation
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={4} md={4} sm={4} xs={4}>
                                <Grid row>
                                    <Label item title="Date of birth" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <InputBaseField
                                            name="dateOfBirth"
                                            type="date"
                                            placeholder="Date of birth"
                                            MaxLength="100"
                                            value={state.dateOfBirth}
                                            onChange={handleChange}
                                        />

                                        {errorMessages.errorDOB && !state.dateOfBirth ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter date of birth
                                        </FormHelperText>) : ('')}
                                        {errorMessages.errorDOBFuture && state.dateOfBirth > toDayDate() ? (<FormHelperText style={{ color: "red" }} >
                                            Date of birth cannot be in future
                                            {/* Date of Birth can not be in the future  */}
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={4} md={4} sm={4} xs={4}>
                                <Grid row>
                                    <Label item title="Gender" size={12} mandatory={true} />
                                    <Grid lg={12} md={12} sm={12}>
                                        <Select
                                            size="small"
                                            native
                                            name="gender"
                                            value={state?.gender}
                                            onChange={handleSelectChange}
                                            placeholder="Select"
                                            label="Select"
                                            className={classes.selectBaseInput}
                                        >
                                            {Gender.map(option =>
                                                <option value={option.value}>{option.label}</option>
                                            )
                                            }
                                        </Select>
                                        {errorMessages.errorGender && !state.gender ? (<FormHelperText style={{ color: "red" }} >
                                            Please select gender
                                        </FormHelperText>) : ('')}
                                    </Grid>
                                </Grid>
                            </Grid>



                        </Grid>




                        <h3> Address </h3>



                        <Grid container className={classes.formContaner}>

                            <Grid lg={6} md={6} sm={12} xs={12} className="p-right-ten">

                                <Grid row>
                                    <Label item title="Address Line 1" size={12} mandatory={true} />
                                    <InputBaseField
                                        name="address1"
                                        type="text"
                                        placeholder="Address Line 1"
                                        MaxLength={200}
                                        value={state?.address1}
                                        onChange={handleChange}
                                    />
                                    {errorMessages.errorAddress1 && !state.address1 ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter address1
                                    </FormHelperText>) : ('')}
                                </Grid>



                            </Grid>

                            <Grid lg={6} md={6} sm={12} xs={12} >

                                <Grid row>
                                    <Label item title="Address Line 2" size={12}/>
                                    <InputBaseField
                                        name="address2"
                                        type="text"
                                        placeholder="Address Line 2"
                                        MaxLength={200}
                                        onChange={handleChange}
                                        value={state?.address2}
                                    />
                                    {errorMessages.errorAddress2 && !state.address2 ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter address1
                                    </FormHelperText>) : ('')}
                                </Grid>



                            </Grid>
                        </Grid>

                        <Grid container className={classes.formContaner}>
                            <Grid item lg={4} md={4} sm={4} className="p-right-ten">
                                <Grid row>
                                    <Label item title="City" size={12} mandatory={true} />
                                    <InputBaseField
                                        name="city"
                                        type="text"
                                        placeholder="City"
                                        MaxLength={50}
                                        onChange={handleChange}
                                        value={state?.city}
                                    />
                                    {errorMessages.errorCity && !state.city ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter city
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4}>
                                <Grid row>
                                    <Label item title="State" size={12} mandatory={true} />
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

                            <Grid item lg={4} md={4} sm={4}>
                                <Grid row>
                                    <Label item title="Zip" size={12} mandatory={true} />
                                    <InputBaseField
                                        name="zipCode"
                                        type="text"
                                        placeholder="zip code"
                                        MaxLength={9}
                                        value={state?.zipCode}
                                        onChange={handleChange}
                                        onKeyPress={(e) => handleNumberKeyPress(e)}
                                    />
                                    {errorMessages.errorZipCode && !state.zipCode ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter zip
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>


                        </Grid>



                        <Grid container className={classes.formContaner}>
                            <div className={classes.footer}>
                                <div className={classes.footerRight}>
                                      <Button className={classes.backBtn} onClick={() => history.goBack()}>Cancel</Button>
                                    <Button className={classes.changeBtn} onClick={updateUserProfileDetails}>Update</Button>
                                </div>
                            </div>
                        </Grid>


                    </div>
                </Grid >
            </Grid >

        </>
    )
}

export default withSnackbar(Profile);