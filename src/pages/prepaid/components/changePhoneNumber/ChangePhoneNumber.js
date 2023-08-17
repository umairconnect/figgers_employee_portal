import React, { useState ,useEffect} from 'react'

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

function ChangePhoneNumberDialog({ dialogOpenClose, handleClose,handleSuccessClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({ zipCode: '' });
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [emailAddress, setEmailAddress] = useState(props.emailAddress);
    const [userName, setUserName] = useState(props.userName);
    const [errorMessages, setErrorMessages] = useState({
        errorZipCode: false, errorZipCodeLength: false
    })

    const handleZipChange = e => {
        errorMessages.errorZipCodeLength = false;
        if (e.nativeEvent.data != 'e' && e.nativeEvent.data != '+' && e.nativeEvent.data != '-') {

            if (e.nativeEvent.data != null || e.target.value != "") {
                const re = /^[0-9\b]+$/;
                if ((e.target.value === '' || re.test(e.target.value))) {
                    if (e.target.value.length <= 9) {

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

    const changeLineMDN = () => {
        let errorList = [];
        if (state.zipCode === null
            || state.zipCode === "") {
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
        if (state.zipCode.length != 5) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZipCodeLength: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorZipCodeLength: false
            }));
        }
        if (errorList.length < 1) {
            //reference number is any random number, the api will response with this reference number
            var obj = {
                MDN: mdnNumber,
                newZip: state.zipCode,
                referenceNumber: accountNumber + '_' + mdnNumber+'_'+Math.floor(Math.random() * 99999).toString(),
                callbackURL: '',
                userName: userName,
                emailAddress: emailAddress,
                accountNumber:accountNumber
            };
            setIsLoading(true)
            PostDataAPI("telispire/changeLineMDNNumber", obj,true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    handleSuccessClose("Phone number changed successfully.");
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
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            PaperComponent={DraggableComponent}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                        <Typography className={classes.title}>Change Phone Number</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                    </div>
                    
                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                
                            <Grid container direction="column">
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>Current Phone Number:</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.valueText}>{formateMdnNumber(props.mdnNumber)}</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>Zip Code:</Typography>
                                </Grid>
                                {/*<Grid item lg={12}>
                                    <Typography className={classes.valueText}>{updateMdnNumber}</Typography>
                                </Grid>*/}
                                <Grid item lg={12}>
                                    <InputBaseField
                                        id="zipCode"
                                        name="zipCode"
                                        value={state.zipCode}
                                        type="number"
                                        onChange={handleZipChange}
                                        placeholder='ZIP Code'
                                        IsDisabled={false}
                                        MaxLength="9"
                                        MinLength="1"
                                    />
                                    {errorMessages.errorZipCode && state.zipCode == '' ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter zip code
                                    </FormHelperText>) : ('')}

                                    {errorMessages.errorZipCodeLength && state.zipCode != '' && state.zipCode.length != 5 ? (<FormHelperText style={{ color: "red" }} >
                                        Zip code must be 5 digits
                                    </FormHelperText>) : ('')}
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <Button className={classes.backBtn} onClick={handleClose}>CLOSE</Button>
                            {isLoading ?
                                <Button className={classes.changeBtn}>CHANGE</Button>
                                :
                                <Button className={classes.changeBtn}
                                    onClick={changeLineMDN}>CHANGE</Button>
                            }
                            

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}
export default withSnackbar(ChangePhoneNumberDialog);