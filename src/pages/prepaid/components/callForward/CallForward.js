import React, { useState } from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { InputBaseField } from '../../../../components/InputField/InputField';
import { PostDataAPI } from '../../../../Services/APIService';
import { formatDate, formateMdnNumber } from '../../../../components/Common/Extensions';

function CallForward({ dialogOpenClose, handleClose,handleSuccessClose, ...props }) {
    const classes = useStyles();
    const [errorMessages, setErrorMessages] = useState({ errorPhoneLength: false
    })
    const [isLoading, setIsLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [farwardNumber, setfarwardNumber] = useState('');

    const handlePhoneChange = e => {

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

                        setfarwardNumber(number);
                        return;
                    }

                    setfarwardNumber(number);
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setfarwardNumber(value);

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

    const farwardToPhoneNumber =()=> {
        let errorList = [];
        if (farwardNumber != "" && farwardNumber != undefined && farwardNumber.length < 10) {

            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPhoneLength: false
            }));
        }
        if (errorList.length < 1) {
            var obj = {
                MDN: mdnNumber,
                newICC: farwardNumber,
                referenceNumber: accountNumber + '_' + mdnNumber + '_' + Math.floor(Math.random() * 99999).toString(),
                callbackURL: ''
            };
            setIsLoading(true)
            PostDataAPI("telispire/callFarwardToPhoneNumber", obj,true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    handleSuccessClose("Call farward to phone number successfully.");
                } else {
                    handleSuccessClose("Call farward to phone number failed.");
                    console.log(result.message);
                }
            })
        }
    }

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableEscapeKeyDown
            open={dialogOpenClose}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                        <Typography className={classes.title}>Call forward</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                    </div>
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                            <Grid container direction="column">
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>Phone number</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.valueText}>{formateMdnNumber(props.mdnNumber)}</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>Forward to Number</Typography>
                                    <b>Enter Number</b>
                                </Grid>
                            
                                <Grid item lg={12}>
                                    <InputBaseField
                                        id="fowardNumber"
                                        name="fowardNumber"
                                        type="text"
                                        value={farwardNumber}
                                        onChange={handlePhoneChange}
                                        placeholder='Enter Number'
                                        IsDisabled={false}
                                        MaxLength='14'
                                    />
                                    {errorMessages.errorPhoneLength && farwardNumber != "" ? (<FormHelperText style={{ color: "red" }} >
                                        The office phone number is invalid
                                    </FormHelperText>) : ('')}
                                   
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <Button className={classes.backBtn} onClick={handleClose}>CLOSE</Button>

                            {isLoading ?
                                <Button className={classes.changeBtn}>Set call forwarding</Button>
                                :
                                <Button className={classes.changeBtn} onClick={farwardToPhoneNumber}>Set call forwarding</Button>
                            }
                            

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default CallForward;