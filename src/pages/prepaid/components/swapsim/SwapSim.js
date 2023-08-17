import React, { useState,useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { withSnackbar } from "./../../../../components/Message/Alert";
import { InputBaseField } from '../../../../components/InputField/InputField';
import { formateMdnNumber } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';

function SwapSim({ dialogOpenClose, handleClose,handleSuccessClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [emailAddress, setEmailAddress] = useState(props.emailAddress);
    const [userName, setUserName] = useState(props.userName);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({ newICC: '' });
    const [errorMessages, setErrorMessages] = useState({
        errorICCNumber: false, errorICCNumberLength: false
    })
    function validateICCLength(object) {

        if (object != null) {
            if (object.length === 19)
                return true;
            else
                return false;
        }

    }

    const handleICCChange = e => {
        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 19) {

                        const { name, value } = e.target;
                        setState(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }
                }
                else
                    e.preventDefault();
            }
            else {
                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
        else
            e.preventDefault();
    };

    //function, ICC Swap provisions a different SIM card for the subscriber.
    const swapICCByMDN = () => {
        let errorList = [];
        if (state.newICC === null
            || state.newICC === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorICCNumber: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorICCNumber: false
            }));
        }

        if (state.newICC != null && state.newICC != "" && state.newICC != undefined) {

            if (state.newICC.length < 19) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorICCNumberLength: true
                }));

                errorList.push(true);
            }
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorICCNumberLength: false
            }));
        }
        if (errorList.length < 1) {
            var obj = {
                MDN: mdnNumber,
                newICC: state.newICC,
                referenceNumber: accountNumber + '_' + mdnNumber + '_' + Math.floor(Math.random() * 99999).toString(),
                callbackURL: '',
                emailAddress: emailAddress,
                userName: userName,
                accountNumber:accountNumber
            };
            setIsLoading(true)
            PostDataAPI("telispire/swapICCByMdn", obj,true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    handleSuccessClose("ICC number changed successfully.");
                } else {
                    showMessage("Error", result.message, "error", 3000);
                    console.log(result.message);
                }
            })
        }
        
    }
    useEffect(() => {
        console.log(props)
    }, []);
    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableEscapeKeyDown
            open={dialogOpenClose}
            maxWidth="lg"
            PaperComponent={DraggableComponent}
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                        <Typography className={classes.title}>Swap SIM</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                    </div>
                   
                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                       
                            <Grid container direction="column">
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>Phone Number</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.valueText}>{formateMdnNumber(props.mdnNumber)}</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>New SIM ICC</Typography>
                                </Grid>
                            
                                <Grid item lg={12}>
                                    <InputBaseField
                                        id="newICC"
                                        name="newICC"
                                        type="number"
                                        value={state.newICC}
                                        placeholder='Enter Number'
                                        onChange={handleICCChange}
                                        IsDisabled={false}
                                        MaxLength="19"
                                        MinLength="1"
                                    />
                                    {errorMessages.errorICCNumber && state.newICC == '' ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter new ICC number
                                    </FormHelperText>) : ('')}

                                    {errorMessages.errorICCNumberLength && state.newICC != '' && !validateICCLength(state.newICC) ? (<FormHelperText style={{ color: "red" }} >
                                        ICC number must be 19 digits
                                    </FormHelperText>) : ('')}
                                   
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <Button className={classes.backBtn} onClick={handleClose}>CLOSE</Button>
                            {isLoading ?
                                <Button className={classes.changeBtn}>SWAP SIM</Button>
                                :
                                <Button className={classes.changeBtn} onClick={swapICCByMDN}
                                >SWAP SIM</Button>
                            }
                           

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(SwapSim);