import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import DialogLoader from '../../../../components/Loader/DialogLoader';
import RichTextEditor from 'react-rte';
import { InputBaseField, SelectField, TextareaField } from '../../../../components/InputField/InputField';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { validateEmail, validatePhoneNumber, handleNumberKeyPress } from '../../../../../src/components/Common/Extensions';
import Logo from '../../../../assets/img/Figgers-Logo.svg';
import googleGif from "../../../../assets/img/common/googleGif.gif"
import BBBGif from "../../../../assets/img/common/bbbGif.gif"
import TwitterGif from "../../../../assets/img/common/twitterGif.gif"
import TrustpilotGif from "../../../../assets/img/common/trustpilotGif.gif"
import FiggersGif from "../../../../assets/img/common/figgersGif.gif"
import FacebookGif from "../../../../assets/img/common/facebookGif.gif"
import StarGif from "../../../../assets/img/Top-Stars-Animation-.gif";

import EmailIcon from "../../../../assets/img/email/email2-white.png";
import CallIcon from "../../../../assets/img/email/call2-white.png";
import GlobIcon from "../../../../assets/img/email/globe2-white.png";
import MapIcon from "../../../../assets/img/email/map2-white.png";

function ReviewRequest({ dialogOpenClose, handleClose, handleSuccessClose, accountNumber, isPrepaid, ...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState([]);
    const { showMessage } = props;

    const handleChange = e => {
        const { name, value } = e.target;

        if (value.trim() === "" && value !== "") {
            return;
        }

        const trimmedValue = value.replace("/\s{2,}/g", "");

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const handlePhoneChange = e => {
        const { name, value } = e.target;

            if ( e.target.value != "") {
             
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


            }
        
    }


    const toolbarConfig = {

        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'strikethrough', style: 'STRIKETHROUGH' },

        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
            { label: 'Blockquote', style: 'blockquote' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Style', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ]

    };

    const [templateState, setTemplateState] = useState("Google");
    const [defaultTemplate, setDefaultTemplate] = useState("Google");
    const [emailTemp, setEmailTemp] = useState([]);

    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);

    const regex = /(<([^>]+)>)/ig;
    const regexSpaces = /((&nbsp;))*/gmi;

    const MAX_EDITOR_LENGTH = 2000;

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const handleEditorChange = (editorValue) => {
        const editorDetail = editorValue.toString('html').replace(regex, '');

        if (editorDetail && editorDetail.length > (MAX_EDITOR_LENGTH)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }
        setEDITOR_CHAR_LENGTH(editorDetail.length);

        setEditorValue(editorValue);

        setState(prevState => ({
            ...prevState,
            Message: editorDetail
        }))
    }


    const [errorMessages, setErrorMessages] = useState({

    });
    const changeTemplate = (e) => {
        const { name, value } = e.target;
        setTemplateState(value);

        var obj = emailTemp.find(obj => obj.value == value)
        var id = obj.tempId

        setState(prevState => ({
            ...prevState,
            templateId: parseInt(id),
            templateCode: value

        }))

    }

    const Validate = (errorList) => {
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

        if (!state.phone || !validatePhoneNumber(state.phone)) {
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

        if (!state.Message) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorMessage: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorMessage: false
            }));
        }

    }
    const addNew = () => {

        //resetErrors();
        debugger
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            var method = "figgreviewrequest/add";
            state.reviewStatus = 'Submitted';
            state.templateId = parseInt(state.templateId)
            PostDataAPI(method, state, true).then((result) => {
                if (result.success) {
                    if (result.data) {

                        setIsLoading(false);
                        handleSuccessClose("Review request added successfully");
                        // sendEmail();

                    }
                    else {
                        showMessage("Error", "Error adding review request, please contact administrator", "error", 3000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }
                setIsLoading(false);

            })
        }

    }



    const loadEmailTemplate = () => {
        var params = {
            code: "get_reviews_template",
            parameters: ['']
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                //setEmailTemp(prevState => [...prevState, { value: '', label: 'Select Template' }]);
                result.data.map((item, i) => {
                    setEmailTemp(prevState => [...prevState, { value: item.text2, label: item.text2, att: item.t3, tempId: item.text1 }]);
                    if (item.text2 === 'Google') {
                        setTemplateState(item.text2);
                        setDefaultTemplate(item.text2);
                    }
                })
            }
        })
    }

    useEffect(() => {
        state.templateId = "20011"
        state.templateCode = "Google"
        loadEmailTemplate()

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
                        <Typography className={classes.title}>Review Request</Typography>

                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>


                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <Scrollbars autoHeight autoHeightMax={550}>
                        <div className={classes.content}>

                            <Grid container spacing={2}>
                                <Grid item sm={6} md={6} lg={6} xl={6}>


                                    <Grid container spacing={3}>

                                        <Grid item sm={6} md={6} lg={6} xl={6}>
                                            <Grid row >
                                                <Label title="First Name" size={12} mandatory={true} />
                                                <InputBaseField
                                                    name="firstName"
                                                    value={state.firstName}
                                                    onChange={handleChange}
                                                    placeholder="First Name"
                                                    type="text"
                                                    MaxLength={19}
                                                />
                                                {errorMessages.errorFirstName && (!state.firstName || state?.firstName.length < 19) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter first name
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>

                                        <Grid item sm={6} md={6} lg={6} xl={6}>
                                            <Grid row >
                                                <Label title="Last Name" size={12} mandatory={true} />
                                                <InputBaseField
                                                    name="lastName"
                                                    value={state.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Last Name"
                                                    type="text"
                                                    MaxLength={19}
                                                />
                                                {errorMessages.errorLastName && (!state.lastName || state?.lastName.length < 19) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter last name
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} >
                                        <Grid item sm={12} md={12} lg={12} xl={12} >
                                            <Grid row >
                                                <Label title="Email Address" size={12} mandatory={true} />

                                                <InputBaseField
                                                    name="emailAddress"
                                                    value={state.emailAddress}
                                                    onChange={handleChange}
                                                    placeholder="Email Address"
                                                    type="text"
                                                    MaxLength={30}
                                                />
                                                {errorMessages.errorEmailAddress && (!state.emailAddress || state?.emailAddress.length < 15 || !validateEmail(state.emailAddress)) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter a valid email
                                                </FormHelperText>) : ('')}
                                            </Grid>


                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>

                                        <Grid item sm={6} md={6} lg={6} xl={6}>
                                            <Grid row >
                                                <Label title="Phone #" size={12} mandatory={true} />
                                                <InputBaseField
                                                    name="phone"
                                                    value={state.phone}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Phone #"
                                                    type="text"
                                                    MaxLength={14}
                                                />
                                                {errorMessages.errorPhone && (!state.phone || state?.phone.length < 14) ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter a valid phone number
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>

                                        <Grid item sm={6} md={6} lg={6} xl={6}>
                                            <Grid row >
                                                <Label title="Template" size={12} mandatory={true} />
                                                <SelectField options={emailTemp}
                                                    onChange={changeTemplate}
                                                    defualtValue={defaultTemplate}
                                                    name="templateId"
                                                    value={state.templateId}


                                                />
                                                {errorMessages.errorTemplate && !state.templateId ? (<FormHelperText style={{ color: "red" }} >
                                                    Please select template
                                                </FormHelperText>) : ('')}
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} className={classes.textEditor}>
                                        <Grid item sm={12} md={12} lg={12} xl={12}>
                                            <Grid row >
                                                <Label title="Message" size={12} mandatory={true} />
                                                <RichTextEditor
                                                    value={editorValue}
                                                    onChange={handleEditorChange}
                                                    className={classes.note}
                                                    placeholder="Message goes here..."
                                                    toolbarConfig={toolbarConfig}
                                                >
                                                </RichTextEditor>

                                                {errorMessages.errorMessage && !state.Message ? (<FormHelperText style={{ color: "red" }} >
                                                    Please enter a message
                                                </FormHelperText>) : ('')}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>


                                <Grid item sm={6} md={6} lg={6} xl={6}>


                                    <div className={classes.templateContainer}>
                                        <div className={"tempHeader"} style={{
                                            background: templateState == "Google" ? '#3173EF' : templateState == "Accredited Business" ? '#006495' :
                                                templateState == "Twitter" ? '#1D9BF0' : templateState == "Trustpilot" ? '#00B47B' :
                                                    templateState == "Facebook" ? '#3A5A9C' : ''
                                        }}>
                                            <Grid container alignItems='center'>
                                                <Grid item lg={6} md={6}>
                                                    <img src={Logo} />
                                                </Grid>
                                                <Grid item lg={6} md={6} className={"textRight"}>
                                                    <img src={StarGif} />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={"tempHeaderBottom"}>
                                            <h3> Take a minute to give us ★★★★★ review </h3>
                                        </div>

                                        <div className={"tempContent"}>
                                            <h1>{state.firstName} {state.lastName}</h1>

                                            <Grid container>
                                                <Grid item md={8} lg={8}>
                                                    <p dangerouslySetInnerHTML={{
                                                        __html: editorValue.toString('html'),
                                                    }}></p>
                                                </Grid>

                                                {templateState !== "All" ?
                                                    <Grid item md={4} lg={4} style={{ paddingLeft: '5px', }}>
                                                        <div className={classes.brandBox}
                                                            style={{
                                                                background: templateState == "Google" ? '#3173EF' : templateState == "Accredited Business" ? '#006495' :
                                                                    templateState == "Twitter" ? '#1D9BF0' : templateState == "Trustpilot" ? '#00B47B' :
                                                                        templateState == "Facebook" ? '#3A5A9C' : ''
                                                            }}>
                                                            <h2>Click here to add Review! </h2>
                                                            <img src={
                                                                templateState == "Google" ? googleGif : templateState == "Accredited Business" ? BBBGif :
                                                                    templateState == "Twitter" ? TwitterGif : templateState == "Trustpilot" ? TrustpilotGif :
                                                                        templateState == "Facebook" ? FacebookGif : ''} />
                                                        </div>
                                                    </Grid> : ''}

                                            </Grid>

                                            <div>
                                                <p>Sincerely, </p>
                                                <p> </p><b>Figgers Communication Inc.</b>
                                            </div>
                                        </div>

                                        {templateState == "All" ?
                                            <Grid container>

                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#3173EF' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={googleGif} />
                                                    </div>
                                                </Grid>

                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#006495' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={BBBGif} />
                                                    </div>
                                                </Grid>


                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#1D9BF0' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={TwitterGif} />
                                                    </div>
                                                </Grid>


                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#00B47B' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={TrustpilotGif} />
                                                    </div>
                                                </Grid>


                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#004990' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={FiggersGif} />
                                                    </div>
                                                </Grid>


                                                <Grid item md={4} lg={4}>
                                                    <div className={classes.brandBox} style={{ background: '#3A5A9C' }}>
                                                        <h2>Click here to add Review! </h2>
                                                        <img src={FacebookGif} />
                                                    </div>
                                                </Grid>

                                            </Grid> : ''}

                                        <Grid container>
                                            <Grid lg={12} md={12} sm={12}>
                                                <div className={classes.templateFooter}>
                                                    <Grid container>
                                                        <Grid item lg={4} md={4} sm={4}>
                                                            <p> <img src={CallIcon} /> 1-800-223-5435	 </p>
                                                        </Grid>
                                                        <Grid item lg={4} md={4} sm={4}>
                                                            <p> <img src={EmailIcon} /> customer.service@figgers.com	 </p>
                                                        </Grid>
                                                        <Grid item lg={4} md={4} sm={4} style={{ textAlign: 'right' }}>
                                                            <p> <img src={GlobIcon} /> figgers.com</p>
                                                        </Grid>

                                                        <Grid item lg={12} md={12} sm={12}>
                                                            <p style={{ textAlign: 'center', margin: '5px' }}> <img src={MapIcon} /> 3810 Inverrary Blvd. Suite: 401, Fort Lauderdale, Florida 33319</p>
                                                        </Grid>

                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>

                                    </div>


                                </Grid>
                            </Grid>
                        </div>
                    </Scrollbars>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                            <Button className={classes.changeBtn} onClick={addNew}>Send</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(ReviewRequest);
