import { Divider, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Label, LinkS } from '../../../../../../components/UiElements/UiElements'
import { CheckboxField, InputBaseField } from '../../../../../../components/InputField/InputField'
import { PostDataAPI } from '../../../../../../Services/APIService';
import { withSnackbar } from "./../../../../../../components/Message/Alert";
import { formateMdnNumber } from '../../../../../../../src/components/Common/Extensions';

import useStyles from "./styles";
function ReviewAndAuthorize({ data, handleNext, triggerRevNAuthNext, updateTrigger, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState(data);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleChkboxChange = e => {

        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    const PortNumber = () => {
        //let errorList = [];
        //state.activationPlanId = state.activationPlanId ? parseInt(state.activationPlanId) : 0;
        //Validate(errorList);
        //if (errorList.length < 1) {
        if (!state.authorize || !state.agree) {
            showMessage("Error", "Please authorize and agree to wireless custmer agreement", "error", 3000);
            return;
        }
        setIsLoading(true);
        //state.creditCardExpiration = state.ccExpMonth + '/' + state.ccExpYear;
        PostDataAPI("telispire/portPrepaidNumber", state).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                handleNext(state);
                //if (result.data.objCoverage) {
                //setCoveragePercent(result.data.objCoverage.coveragePercent);
                //setIsCoverageLoaded(true);
                //}
                //showMessage("Success", "Line disconnected successfully", "success", 3000);
                //getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
        //}
    }
    useEffect(() => {
        if (triggerRevNAuthNext) {
            PortNumber();
            updateTrigger();
        }
    }, [triggerRevNAuthNext]);
    return (
        <Grid container>
            <Grid item lg={12}>
                <Typography className={classes.text}>Switching now for <LinkS>{formateMdnNumber(data.msisdn)}</LinkS> from {data.existingCarrier} to FIGGERS on {data.planType}</Typography>
            </Grid>
            <Grid item lg={12}>
                <Divider variant="middle" orientation="horizontal" className={classes.divider} />
            </Grid>
            <Grid item lg={12}>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Typography className={classes.title}>{data.existingCarrier} Information</Typography>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>Account Number :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.oldCarrierAccountNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>PIN Number :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.transferPin}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>IMEI # :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.imei}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>SSN # :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>*************{data.ssn}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Typography className={classes.title}>Payment and Shipping information</Typography>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>Name on Card :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.nameOnCard}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>Debit/Credit Card # :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.creditCardNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>CVC# :</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.cvc}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>Expiry:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>{data.creditCardExpiration}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item lg={4}>
                                <Typography className={classes.label}>Amount:</Typography>
                            </Grid>
                            <Grid item lg={8}>
                                <Typography className={classes.label}>$ 4.99</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <CheckboxField
                        color="primary"
                        onChange={handleChkboxChange}
                        name="authorize"
                        checked={state.authorize}
                        label="I authorize to transfer my phone number to Figgers Communication Inc."
                    />
                </Grid>
                <Grid item lg={12}>
                    <CheckboxField
                        color="primary"
                        onChange={handleChkboxChange}
                        name="agree"
                        checked={state.agree}
                        label="I agree to Wireless Customer Agreement"
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default withSnackbar(ReviewAndAuthorize);