import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'
import RichTextEditor from 'react-rte';
import { message, Space, Row } from "antd";
import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { InputBaseField, TextareaField, SelectField } from "../../../../components/InputField/InputField";
import { Label, CustomBtn, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { formateMdnNumber } from '../../../../../src/components/Common/Extensions';
import DialogLoader from './../../../../components/Loader/DialogLoader';


function Sms({ dialogOpenClose, handleClose, handleSuccessClose, customerData, ...props }) {
    const classes = useStyles();
    const chatFrom = 'Support';
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ messageText: '', cellPhone:'' });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
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
    const [contactNumbers, setContactNumbers] = useState([]);

    const handleSelectChange = (name, value) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function sendSMS() {
        
        let success = true;

        if (!state.messageText || state.messageText.trim() == "") {
            setErrorMessage(true);
            success = false;
        } else {
            setErrorMessage(false);
        }
        if (!state.cellPhone || state.cellPhone.trim() == "") {
            setErrorPhone(true);
            success = false;
        } else {
            setErrorPhone(false);
        }

        if (success == true) {

            let method = "customer/sendSMS";

            state.userId = parseInt(userID);
            state.customerId = customerData.accountNumber.toString();
            state.smsFromCode = chatFrom;
            setLoading(true);
            PostDataAPI(method, state, true, '').then((result) => {
                setLoading(false);
                if (result.success == true) {
                    handleSuccessClose("SMS sent successfully.");
                }
                else {
                    message.error(result.message, 3);
                }
            })
        }

    };

    const getCustomerLines = () => {
        var _contactNumbers = [];
        if (customerData?.homePhone) {
            _contactNumbers.push({
                value: customerData?.homePhone,
                label: formateMdnNumber(customerData?.homePhone)
            })
        }
        var obj = { AccountNumber: customerData.accountNumber, MDN: '', isPrepaid: true, includeDisconnectedLines: false };
        setLoading(true);
        PostDataAPI("telispire/getCustomerLines", obj, true).then((result) => {
            setLoading(false)
            if (result.success && result.data != null) {
                result.data.map((item, i) => {
                    _contactNumbers.push({ value: item.mDN, label: formateMdnNumber(item.mDN) });
                });
                setContactNumbers(_contactNumbers);
            }
            if (_contactNumbers.length > 0) {
                setState(prevState => ({
                    ...prevState,
                    ['cellPhone']: _contactNumbers[0].value
                }))

            }
        })

    }

    useEffect(() => {
        getCustomerLines();

    }, []);
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
                            <Typography className={classes.title}>Send SMS - {customerData.accountNumber}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                      
                        {loading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>

                                <Grid container direction="column">

                                    <Grid row item lg={12} >
                                        <Label title="Contact Number" size={2} />

                                        <Select
                                            name="cellPhone"
                                            id= "cellPhone"
                                            size="small"
                                            native
                                            onChange={handleSelectChange}
                                            placeholder="Select"
                                            value={state.cellPhone}
                                            className={classes.selectBaseInput}>
                                            {
                                                contactNumbers.map(option => <option value={option.value}>{option.label}</option>)
                                            }
                                        </Select>

                                        {errorPhone && !state.cellPhone ? (
                                            <FormHelperText color="secondary" className="error-message">Please select contact number </FormHelperText>
                                        ) : ("")}

                                    </Grid>

                                    <Grid row item lg={12} >

                                        <Label title="Message" size={2} />

                                        {/* <RichTextEditor*/}
                                        {/*    className={classes.comlplaintrichTextEdit}*/}
                                        {/*    value={state.messageText}*/}
                                        {/*    onChange={handleChange}*/}
                                        {/*    toolbarConfig={toolbarConfig}*/}
                                        {/*/> */}

                                        <TextareaField
                                            id="messageText"
                                            name="messageText"
                                            rows={6}
                                            onChange={handleChange}
                                            value={state.messageText}
                                            placeholder = "Enter message"
                                            MaxLength = "4000"
                                        ></TextareaField>
                                        {errorMessage && (!state.messageText || state.messageText.trim() == "") ? (
                                            <FormHelperText color="secondary" className="error-message">Please enter sms text </FormHelperText>
                                        ) : ("")}
                                    </Grid>

                                </Grid>


                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                {loading ? <Button className={classes.changeBtn} >Send SMS</Button> :
                                    <Button className={classes.changeBtn} onClick={sendSMS}>Send SMS</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default Sms;