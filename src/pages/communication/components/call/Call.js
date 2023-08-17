import React, { useState, useEffect, useRef} from 'react'

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

function Call({ dialogOpenClose, handleClose, handleSuccessClose, isUpdate, customerData, ...props  }) {
    const classes = useStyles();
    const [state, setState] = useState({ smsFromCode:'Support', remarks:''});
    const chatFrom = 'Support';
    const inputFile = useRef(null);
    const [chatDocument, setChatDocument] = useState({ file: null, chatPhoto: null, chatPhotoName: null });
    const [errorMessages, setErrorMessages] = useState({errorRemarks :false
    });
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [loading, setLoading] = useState(false);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const Validate = (errorList) => {

        if (!state.remarks || state.remarks.trim() == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRemarks: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorRemarks: false
            }));
        }
    }

    const sendCall = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            let method = "fwchat/addCall";

            state.userId = parseInt(userID);
            state.customerId = customerData.accountNumber.toString();
            state.callFromCode = chatFrom;
            state.remarks = state.remarks;
            //--------------------
            setLoading(true);
            PostDataAPI(method, state, true, '').then((result) => {
                setLoading(false);
                if (result.success == true) {
                    handleSuccessClose("Data saved successfully");
                }
                else {
                    message.error(result.message, 2);
                }
            })
        }
    }


    


    useEffect(() => {
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
                            <Typography className={classes.title}>Log Call - {customerData.accountNumber}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        

                        {loading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>

                                <Grid container direction="column">

                                    <Grid row item lg={12} >

                                        <Label title="Remarks" mandatory={true} size={2} />

                                        <TextareaField
                                            name="remarks"
                                            id="remarks"
                                            rows={6}
                                            value={state.remarks}
                                            onChange={handleChange}
                                            placeholder="Enter Remarks"
                                            MaxLength = "2000"
                                        ></TextareaField>

                                        {errorMessages.errorRemarks && (!state.remarks || state.remarks.trim() == '')?
                                            (<FormHelperText style={{ color: "red" }} >
                                                Please enter remarks
                                            </FormHelperText>) : ('')}

                                    </Grid>

                                </Grid>


                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                {loading ? <Button className={classes.changeBtn} >Save</Button> :
                                    <Button className={classes.changeBtn} onClick={sendCall}>Save</Button>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default Call;