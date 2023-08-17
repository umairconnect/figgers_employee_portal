import { Dialog, Grid, InputAdornment, TextField, Typography, Button, Icon } from '@material-ui/core'
import React, { useState } from 'react'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { SearchOutlined } from "@material-ui/icons";

import { CustomBtn, Label } from '../../../../../components/UiElements/UiElements';

import useStyles from "./styles";
import { Progress } from 'antd';
import { green, red } from '@ant-design/colors';
import { InputBaseField } from '../../../../../components/InputField/InputField';
import ExistingCarrier from './existingCarrier/ExistingCarrier';
import CarrierInformation from './carrierInformation/CarrierInformation';
import ChoosePlan from './choosePlan/ChoosePlan';
import ShippingAddress from './shippingAddress/ShippingAddress';
import PaymentInformation from './paymentInformation/PaymentInformation';
import ReviewAndAuthorize from './reviewAndAuthorize/ReviewAndAuthorize';
import OrderCompleted from './orderCompleted/OrderCompleted';
function RegistrationWizard({ dialogOpenClose, handleClose, onBack, onNext, ...props }) {
    const classes = useStyles();

    const [registrationWizardState, setRegistrationWizardState] = useState(true);
    //Wizard setup
    const [state, setState] = useState({ search: "" });
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Check Eligibility', 'Existing Carrier', 'Carrier Info', 'Choose a Plan', 'Shipping Address', 'Payment Info', 'Review & Authorize', 'Complete Order'];
    const handleBack = (newState) => {
        if (activeStep !== -1 && activeStep > 0) {
            setActiveStep(activeStep - 1);
        } else {
            setActiveStep(0);
        }
        onBack();
    }

    const handleNext = (newState) => {
        if (activeStep !== -1 && activeStep < steps?.length - 1) {
            setActiveStep(activeStep + 1);
        }
        onNext();
    }
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    const onClose = () => {
        handleClose();
        setActiveStep(0);
    }
    const Form1 = () => {
        return (
            <>
                <Grid container alignItems='center'>
                    <Label size={12} title="Phone Number" />
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.searchLabel}>
                        <InputBaseField
                            id="fowardNumber"
                            name="fowardNumber"
                            type="text"
                            value={state.phoneNumber}
                            onChange={handleChange}
                            placeholder='Enter Number'
                            IsDisabled={false}
                            MaxLength='14'
                        />
                    </Grid>
                    <Label size={12} title="Phone Number" />
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.searchLabel}>
                        <InputBaseField
                            id="fowardNumber"
                            name="fowardNumber"
                            type="text"
                            value={state.phoneNumber}
                            onChange={handleChange}
                            placeholder='Enter Number'
                            IsDisabled={false}
                            MaxLength='14'
                        />
                    </Grid>
                </Grid>
            </>
        )
    }


    function getStepContent(step) {
        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return Form1();
            case 1:
                return <ExistingCarrier />
            case 2:
                return <CarrierInformation />
            case 3:
                return <ChoosePlan />
            case 4:
                return <ShippingAddress />
            case 5:
                return <PaymentInformation />
            case 6:
                return <ReviewAndAuthorize />
            case 7:
                return <OrderCompleted />
            default:
                return <PaymentInformation />

        }
    }
    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>{steps[activeStep]}</Typography>
                        <Icon className={classes.closeIcon} onClick={onClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    <div className={classes.content}>
                        <Grid container className={classes.container}>
                            <Grid item lg={12} className={classes.stepContainer}>
                                {/* <ul className={classes.stepList}>
                                    {
                                        steps?.map((stepItem, i) => {
                                            return <li className={activeStep === i ? 'Active' : ''}>
                                                {
                                                    i < activeStep ?
                                                        < div className={classes.completedStep}>
                                                            <img src={ActiveArrowLeft} alt="back-arrow" className="arrowIcon" />
                                                            <img src={CompletedActiveStepIcon} alt="stepper" />
                                                            <Typography>{stepItem}</Typography>
                                                        </div> :
                                                        activeStep === i
                                                            ?
                                                            < div className={classes.step}>
                                                                <img src={ActiveArrowLeft} alt="back-arrow" className="arrowIcon" />
                                                                <img src={ActiveStepIcon} alt="stepper" />
                                                                <Typography>{stepItem}</Typography>
                                                            </div>
                                                            :
                                                            <div className={classes.step}>
                                                                <img src={InActiveArrowLeft} alt="back-arrow" className="arrowIcon" />
                                                                <img src={StepIcon} alt="stepper" />
                                                                <Typography>{stepItem}</Typography>
                                                            </div>

                                                }

                                            </li>
                                        })
                                    }
                                </ul> */}
                                {/* <Scrollbars autoHeight autoHeightMax={900} autoHeightMin={550}> */}
                                {getStepContent(activeStep)}
                                {/* </Scrollbars> */}
                            </Grid>
                        </Grid>
                        {/* <Scrollbars autoHeight autoHeightMin={350} autoHeightMax={400}> */}
                        {/* {getStepContent(activeStep)} */}
                        {/* </Scrollbars> */}
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <CustomBtn id="back" size="medium" onClick={onClose}  >Close</CustomBtn>

                            <CustomBtn id={"back"} size="medium" onClick={handleBack}>Back</CustomBtn>

                            <CustomBtn id={"next"} size="medium" onClick={handleNext} >Next</CustomBtn>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >

    )
}

export default RegistrationWizard