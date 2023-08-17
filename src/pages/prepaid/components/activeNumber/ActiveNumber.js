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
import { validateEmail, handleNumberKeyPress } from '../../../../../src/components/Common/Extensions';

function ActiveNumber({ dialogOpenClose, handleClose, handleSuccessClose, accountNumber, isPrepaid ,...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState([]);
    const { showMessage } = props;
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [errorMessages, setErrorMessages] = useState({

    });
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }))
    }
    const Validate = (errorList) => { 
        if (!state.icc || state.icc.length < 19) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIcc: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorIcc: false
            }));
        }

        if (!state.imei || state.imei.length < 15) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImei: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorImei: false
            }));
        }        
    }
    const addNewNumber = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.accountNumber = accountNumber;
            state.isPrepaid = isPrepaid;
            PostDataAPI("telispire/addLineToExistingAccount", state).then((result) => {
                if (result.success && result.data != null) {
                    if (result.data) {
                        showMessage("Success", "Line added successfully", "success", 3000);
                        setTimeout(() => { handleSuccessClose(); }, 3000)

                    }
                    else {
                        showMessage("Error", "Error adding new line, please contact administrator", "error", 3000);
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
                        <Typography className={classes.title}>Add New Line</Typography>

                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>


                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <Scrollbars autoHeight autoHeightMax={570}>
                        <div className={classes.content}>



                            <Grid container spacing={2}>
                                
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}><b>Account:</b></Typography>
                                    <Typography className={classes.valueText}>{props.customerNumber} - {props.customerName} </Typography>
                                </Grid>

                              

                                <Grid item sm={12} md={12} lg={12} xl={12} >
                                    <Grid row >
                                        <Label title="Figgers SIM Number" size={12} mandatory={true} />
                                        <InputBaseField
                                            name="icc"
                                            value={state.icc}
                                            onChange={handleChange}
                                            placeholder="Number"
                                            type="text"
                                            MaxLength={19}
                                        />
                                        {errorMessages.errorIcc && (!state.icc || state?.icc.length < 19) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a valid SIM number
                                        </FormHelperText>) : ('')}
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={12} lg={12} xl={12} >
                                    <Grid row >
                                        <Label title="IMEI #" size={2} mandatory={true} />

                                        <InputBaseField
                                            name="imei"
                                            value={state.imei}
                                            onChange={handleChange}
                                            placeholder="IMEI"
                                            type="text"
                                            MaxLength={15}
                                            onKeyPress={(e) => handleNumberKeyPress(e)}
                                        />
                                        {errorMessages.errorImei && (!state.imei || state?.imei.length < 15) ? (<FormHelperText style={{ color: "red" }} >
                                            Please enter a valid IMEI
                                        </FormHelperText>) : ('')}
                                    </Grid>


                                </Grid>
                            </Grid>

                        </div>
                    </Scrollbars>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                            <Button className={classes.changeBtn} onClick={addNewNumber}>Activate</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(ActiveNumber);
