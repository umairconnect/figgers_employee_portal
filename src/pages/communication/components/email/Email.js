import React, { useState, useEffect, useRef } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'
import RichTextEditor from 'react-rte';

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { message, Space, Row } from "antd";

import useStyles from "./styles";
import { InputBaseField, TextareaField } from "../../../../components/InputField/InputField";
import { Label, CustomBtn, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
import { validateEmail } from '../../../../../src/components/Common/Extensions';
import Loader from './../../../../components/Loader/Loader';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../../components/Message/Alert";
import { allowedAttachments } from '../../../../common/allowedAttachments';

function Email({ dialogOpenClose, handleClose, handleSuccessClose, isUpdate, customerData, phoneNumber, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const commonAttachments = allowedAttachments();
    const [state, setState] = useState({ emailAddress: customerData.email, subject: '', bodyText: '' });
    const chatFrom = 'Support';
    const inputFile = useRef(null);
    const [chatDocument, setChatDocument] = useState({ file: null, chatPhoto: null, chatPhotoName: null });
    const [errorMessages, setErrorMessages] = useState({
        errorEmailAddress: false, errorValidEmailAddress: false,
        errorSubject: false, errorBody: false,
        errorEditorMaxValue:false,
    });


    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);

    const regex = /(<([^>]+)>)/ig;
    const regexSpaces = /((&nbsp;))*/gmi;

    const MAX_EDITOR_LENGTH = 2000;

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [loading, setLoading] = useState(false);
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const convertBytesToMegabytes = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(2);
    };

    function uploadSingleFile(e) {

        const file = e.target.files[0];
        if (file == null || file <= 0)
            return;
        const fileSize = convertBytesToMegabytes(file.size);
        if (fileSize > 10) {
            showMessage("Error", "File size must be less than 10 MB", "error", 3000);
            return;
        }
        const name = file.name;
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
        setChatDocument({
            file: URL.createObjectURL(file),
            chatPhoto: file,
            chatPhotoName: file.name
        })
    }

    const getFileName = (name) => {
        let filename = name.replace(/^.*[\\\/]/, '');

        return filename;
    }

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
        
        if (!isEditorEmpty(editorValue))
            errorMessages.errorBody = false;
        setEditorValue(editorValue);
    }
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' }
        ]
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function isEditorEmpty(_editorValue)
    {
        let editorDetail = _editorValue.toString('html').replace(regex, '');
        let isEmpty = false;
        if (editorDetail.trim() === ""
            || editorDetail.trim().length === 0
            || editorDetail == "<p><br></p>"
            || !!editorDetail.replace(regex, "") == ""
            || !!editorDetail.replace(regexSpaces, '') == ""
            || editorDetail == "<p></p>") {
            isEmpty = true;
        }
        return isEmpty;
    }

    const Validate = (errorList) => {
       
        if (!state.emailAddress || !validateEmail(state.emailAddress)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorValidEmailAddress: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorValidEmailAddress: false
            }));
        }

        if (!state.subject || state.subject.trim() == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSubject: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorSubject: false
            }));
        }
        const editorDetail = editorValue.toString('html').replace(regex, '');
        if (isEditorEmpty(editorValue)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBody: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorBody: false
            }));
        }

        if (editorDetail && editorDetail.length > MAX_EDITOR_LENGTH) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }

       
    }

    function saveEmail() {
        let errorList = [];
        Validate(errorList);

        if (errorList.length < 1) {
            let method = "customer/sendEmailChat";

            state.userId = userID;
            state.customerId = customerData.accountNumber.toString();
            state.emailFromCode = chatFrom;
            state.custFirstName = customerData.fullName;
            state.bodyText = editorValue.toString('html');
            state.phoneNumber = phoneNumber;
            //-------------------- To Save File

            const formData = new FormData();

            for (var key in state) {
                if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }


            formData.append("ChatPhoto", chatDocument.chatPhoto);
            formData.append("ChatPhotoName", chatDocument.chatPhotoName);

            //--------------------


            setLoading(true);
            PostDataAPI(method, formData, true, '').then((result) => {
                setLoading(false);
                if (result.success == true) {
                    handleSuccessClose("Email sent successfully.");
                }
                else {
                    if (result.message = "SizeIncreased") {
                        message.warning("File size must be less than 10 MB", 3);
                    }
                    else
                        message.error(result.message, 2);
                }
            })
        } else {
            setLoading(false);
        }

    };


    useEffect(() => {
        console.log(customerData)
    }, [isUpdate]);
    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="lg"
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Send Email - {customerData.accountNumber}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        {loading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>

                                <Grid container direction="column">
                                    <Grid row item lg={12} >

                                        <Label title="To" size={2} />

                                        <InputBaseField
                                            name="emailAddress"
                                            id="emailAddress"
                                            type="text"
                                            value={state.emailAddress}
                                            onChange={handleChange}
                                            placeholder="Enter Email Address"
                                            MaxLength="50"
                                        />
                                        {errorMessages.errorValidEmailAddress &&
                                            (!state.emailAddress || !validateEmail(state.emailAddress)) ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please enter a valid email address
                                            </FormHelperText>) : ('')}

                                    </Grid>

                                    <Grid row item lg={12} >

                                        <Label title="Subject" size={2} />

                                        <InputBaseField
                                            name="subject"
                                            id="subject"
                                            type="text"
                                            value={state.subject}
                                            onChange={handleChange}
                                            placeholder="Enter Email Subject"
                                            MaxLength="200"
                                        />

                                        {errorMessages.errorSubject && !state.subject ?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please enter subject
                                            </FormHelperText>) : ('')}

                                    </Grid>

                                    <Grid row item lg={12} >

                                        <Label title="Message" size={2} />


                                        <RichTextEditor

                                            value={editorValue}
                                            onChange={handleEditorChange}
                                            className={classes.note}
                                            placeholder="Enter Email Body"
                                        >
                                        </RichTextEditor>

                                        <div className={classes.DisplayBlock}> {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH} </div>


                                        {/* <TextareaField
                                            name="bodyText"
                                            id="bodyText"
                                            rows={6}
                                            value={state.bodyText}
                                            onChange={handleChange}
                                            placeholder="Enter Email Body"
                                            MaxLength="4000"
                                        ></TextareaField> */}


                                        {errorMessages.errorBody? (<FormHelperText style={{ color: "red" }} >
                                            Please enter email body
                                        </FormHelperText>) : ('')}

                                        {errorMessages.errorEditorMaxValue && EDITOR_CHAR_LENGTH > MAX_EDITOR_LENGTH ?
                                            (<FormHelperText style={{ color: "red" }} >Maximum {MAX_EDITOR_LENGTH} characters allowed</FormHelperText>)
                                            : ('')
                                        }

                                    </Grid>

                                </Grid>


                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                {loading ? <Button className={classes.changeBtn} >Send Email</Button> :
                                    <Button className={classes.changeBtn} onClick={saveEmail}>Send Email</Button>}

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default withSnackbar(Email);