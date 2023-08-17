import { Dialog, Grid, InputAdornment, TextField, Typography, Button, Icon } from '@material-ui/core'
import React, { useState } from 'react'

import Scrollbars from "rc-scrollbars";
import MapsImage from '../../../../assets/img/maps.png';
import InActiveArrowLeft from '../../../../assets/img/stepper/in-active-arrow-left.svg';
import StepIcon from '../../../../assets/img/stepper/in-active-step.svg';
import ActiveArrowLeft from '../../../../assets/img/stepper/active-arrow-left.svg';
import ActiveStepIcon from '../../../../assets/img/stepper/active-step.svg';
import CompletedActiveStepIcon from '../../../../assets/img/stepper/completed-step.svg';
import { SearchOutlined } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import { CustomBtn, DraggableComponent } from '../../../../components/UiElements/UiElements';

// import ReactSpeedometer from 'react-d3-speedometer';
import useStyles from "./styles";
import { Progress, Tooltip } from 'antd';
import { green, red, yellow, blue, grey } from '@ant-design/colors';
// import RegistrationWizard from './components/RegistrationWizard'
import ExistingCarrier from './components/existingCarrier/ExistingCarrier';
import CheckEligibility from './components/checkEligibility/CheckEligibility';
import CarrierInformation from './components/carrierInformation/CarrierInformation';
import ChoosePlan from './components/choosePlan/ChoosePlan';
import ShippingAddress from './components/shippingAddress/ShippingAddress';
import PaymentInformation from './components/paymentInformation/PaymentInformation';
import ReviewAndAuthorize from './components/reviewAndAuthorize/ReviewAndAuthorize';
import OrderCompleted from './components/orderCompleted/OrderCompleted';
import { PostDataAPI } from '../../../../Services/APIService';
import Loader from './../../../../components/Loader/Loader';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../../components/Message/Alert";
import Breadcrums from '../../../../components/BreadCrums/breadcrums';
import GoogleMapReact from 'google-map-react';
//import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
function NewRegistrationDialog({ dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [registrationWizardState, setRegistrationWizardState] = useState(false);
    //Wizard setup
    const [state, setState] = useState({ search: "" });
    const [objReview, setObjReview] = useState({});
    const [selectedMSISDN, setSelectedMSISDN] = useState("");

    /*const [arrowPosition, setArrowPosition] = useState(50);*/

    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const steps = ['Confirm Coverage', 'Check Eligibility', /*'Existing Carrier',*/ 'Line Information', 'Review & Authorize', 'Complete Order'];
    const handleBack = (newState) => {
        if (activeStep !== -1 && activeStep > 0) {
            setActiveStep(activeStep - 1);
        } else {
            setActiveStep(0);
        }
    }
    const [triggerEligibilityNext, setTriggerEligibilityNext] = useState(false);
    const [triggerLineInfoNext, setTriggerLineInfoNext] = useState(false);
    const [triggerRevNAuthNext, setTriggerRevNAuthNext] = useState(false);
    const handleNext = (newState) => {

        if (activeStep !== -1 && activeStep < steps?.length - 1 &&
            activeStep !== 1 && activeStep !== 2 && activeStep !== 3) {
            setActiveStep(activeStep + 1);
        }
        switch (activeStep) {
            case 1:
                setTriggerEligibilityNext(true);
                break;
            case 2:
                setTriggerLineInfoNext(true);
                break;
            case 3:
                setTriggerRevNAuthNext(true);
                break;
        }
        //else if (activeStep === 1) {
        //    setTriggerEligibilityNext(true);
        //}
        //else if (activeStep === 3) {
        //    setTriggerLineInfoNext(true);
        //}
        //else if (activeStep === 4) {
        //    setTriggerLineInfoNext(true);
        //}
    }

    const handleComponentNext = (data) => {
        if (activeStep == 1) {
            setSelectedMSISDN(data);
        } if (activeStep == 2) {
            data.msisdn = selectedMSISDN;
            setObjReview(data);
        }
        setActiveStep(activeStep + 1);


    }

    const handleConfirmCoverageChange = (e) => {
        if (e.charCode == 13) {
            ConfirmCoverage(e.target.value);

            //fetch(
            //    `https://maps.googleapis.com/maps/api/geocode/json?address=${e.target.value}&key=AIzaSyChz5K-sgDL_0su71kcpqmLi4dGAbh_aRc`
            //)
            //    .then((response) => response.json())
            //    .then((data) => {
            //        if (data.status === "OK") {
            //            const { lat, lng } = data.results[0].geometry.location;
            //            setCenter({ lat: lat, lng: lng });
            //        } else {
            //            // Handle error case when geocoding fails
            //            console.error("Geocoding failed. Please try again.");
            //        }
            //    })
            //    .catch((error) => {
            //        console.error("Error occurred during geocoding:", error);
            //    });
        }
    }
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    const defaultProps = {
        center: {
            lat: 27.6648,
            lng: 81.5158
        },
        zoom: 11
    };
    const [coveragePercent, setCoveragePercent] = useState(0);
    const [isCoverageLoaded, setIsCoverageLoaded] = useState(false);
    const ConfirmCoverage = (zip) => {
        setIsLoading(true);
        PostDataAPI("telispire/checkCoverage", parseInt(zip)).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                if (result.data.objCoverage) {
                    setCoveragePercent(result.data.objCoverage.coveragePercent);
                    setIsCoverageLoaded(true);
                }
                //showMessage("Success", "Line disconnected successfully", "success", 3000);
                //getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const [center, setCenter] = useState(defaultProps.center);

    const Form1 = () => {
        return (
            <>
                <Grid container alignItems='center'>

                    <Grid container >
                        <Grid item lg={3} />
                        <Grid item sm={6} md={6} lg={6} xl={6}>
                            <Grid container alignItems='center' justifyContent='center'>

                                {
                                    /*state.search === "" &&*/
                                    <TextField
                                        size="small"
                                        id="search"
                                        name="search"
                                        label="Search"
                                        placeholder="Search"
                                        value={state.search}
                                        InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                        variant="outlined"
                                        onChange={handleChange}
                                        className={classes.baseInput}
                                        onKeyPress={handleConfirmCoverageChange}
                                    />
                                }
                            </Grid>
                        </Grid>
                        <Grid item lg={3} />
                    </Grid>
                    {
                        isCoverageLoaded &&
                        <>
                            <Grid container justifyContent='center'>
                                <Grid item lg={3} />
                                <Grid item sm={6} md={6} lg={6} xl={6}>
                                    <Grid container alignItems='center' justifyContent='center'>
                                        <div className={classes.progressBar}>

                                            <div className={classes.percentageArrowPosition} style={{ left: coveragePercent + '%' }}>
                                                <span> {coveragePercent + "%"}</span>
                                                <div className={classes.percentageArrow}></div>
                                            </div>

                                            <Tooltip placement="top" title=''>
                                                <div className={classes.child1}>No Coverage</div>
                                            </Tooltip>
                                            <Tooltip placement="top" title=''>
                                                <div className={classes.child2}>Poor</div>
                                            </Tooltip>
                                            <Tooltip placement="top" title=''>
                                                <div className={classes.child3}>Fair</div>
                                            </Tooltip>
                                            <Tooltip placement="top" title=''>
                                                <div className={classes.child4}>Good</div>
                                            </Tooltip>
                                            <Tooltip placement="top" defaultOpen>
                                                <div className={classes.child5}>Excellent</div>
                                            </Tooltip>
                                        </div>
                                        <Progress percent={coveragePercent} steps={5}
                                            strokeColor={[grey[8], red[6], yellow[6], green[6], blue[7]]}
                                            size={[20, 30]}
                                            showInfo={true} />
                                    </Grid>
                                </Grid>
                                <Grid item lg={3} />
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Grid item lg={3} />
                                <Grid item sm={6} md={6} lg={6} xl={6}>
                                    <Typography className={classes.searchSubLabel}>Recommended: Above 50 % you are good to go.</Typography>
                                </Grid>
                                <Grid item lg={3} />
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Grid item lg={3} />
                                <Grid item sm={6} md={6} lg={6} xl={6}>
                                    <Grid container alignItems='center' justifyContent='center'>
                                        <Button className={classes.customNextBtn} onClick={handleNext}>Next</Button>
                                    </Grid>
                                </Grid>
                                <Grid item lg={3} />
                            </Grid>
                        </>
                    }

                </Grid>

                <Grid container style={{ positiion: "relative", width: "100%", height: "500px" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        center={center}
                    />
                </Grid>

                <Typography className={classes.rightsText}>Figgers Communication Inc. © 2023</Typography>

            </>
        )
    }


    function getStepContent(step) {
        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return Form1();
            case 1:
                return <CheckEligibility
                    handleNext={(msisdn) => { handleComponentNext(msisdn) }}
                    triggerEligibilityNext={triggerEligibilityNext}
                    updateTrigger={() => { setTriggerEligibilityNext(false) }}
                    msisdn={selectedMSISDN}
                />
            //case 2:
            //    return <ExistingCarrier />
            case 2:
                return <CarrierInformation
                    handleNext={(data) => { handleComponentNext(data) }}
                    triggerLineInfoNext={triggerLineInfoNext}
                    updateTrigger={() => { setTriggerLineInfoNext(false) }}
                    data={objReview} />
            //case 4:
            //    return <ChoosePlan />
            case 3:
                /*return <ShippingAddress />*/
                return <ReviewAndAuthorize
                    handleNext={handleComponentNext}
                    triggerRevNAuthNext={triggerRevNAuthNext}
                    updateTrigger={() => { setTriggerRevNAuthNext(false) }}
                    data={objReview}
                    msisdn={selectedMSISDN} />
            //case 6:
            //    return <PaymentInformation />
            //case 7:
            //    return <ReviewAndAuthorize />
            case 4:
                return <OrderCompleted
                    msisdn={objReview.msisdn}
                    fromCarrier={objReview.existingCarrier}
                    planType={objReview.planType} />
            default:
                return <>Default</>

        }
    }
    return (
        <>
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
                            <Typography className={classes.title}>Port a Number</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="white"><CloseIcon /></Icon>
                        </div>

                        {isLoading ? <DialogLoader></DialogLoader> : ''}

                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMax={570}>
                                <Grid container className={classes.container}>
                                    <Grid item lg={12} className={classes.stepContainer}>
                                        <ul className={classes.stepList}>
                                            {
                                                steps?.map((stepItem, i) => {
                                                    return <li className={activeStep === i ? 'Active' : ''} key={i}>
                                                        {
                                                            i < activeStep ?
                                                                < div className={classes.completedStep}>
                                                                    <img src={ActiveArrowLeft} alt="back-arrow" className="arrowIcon" />
                                                                    <img src={CompletedActiveStepIcon} alt="stepper" className="stepIcon" />
                                                                    <Typography>{stepItem}</Typography>
                                                                </div> :
                                                                activeStep === i
                                                                    ?
                                                                    < div className={classes.step}>
                                                                        <img src={ActiveArrowLeft} alt="back-arrow" className="arrowIcon" />
                                                                        <img src={ActiveStepIcon} alt="stepper" className="stepIcon" />
                                                                        <Typography>{stepItem}</Typography>
                                                                    </div>
                                                                    :
                                                                    <div className={classes.step}>
                                                                        <img src={InActiveArrowLeft} alt="back-arrow" className={`${classes.leftArrowImage} arrowIcon`} />
                                                                        <img src={StepIcon} alt="stepper" className="stepIcon" />
                                                                        <Typography>{stepItem}</Typography>
                                                                    </div>

                                                        }

                                                    </li>
                                                })
                                            }
                                        </ul>

                                        <div className={classes.containerSection}>
                                            {getStepContent(activeStep)}
                                        </div>

                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>
                        {activeStep > 0 && < div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {activeStep != 4 ?
                                    <>
                                        <CustomBtn id="back" size="medium" onClick={handleBack}>Back</CustomBtn>
                                        <CustomBtn id="next" size="medium" onClick={handleNext} >Next</CustomBtn></>
                                    : ''}
                            </div>
                        </div>}
                    </div>
                </div >
                {/* </Dialog > */}
                {/* <RegistrationWizard
                            dialogOpenClose={registrationWizardState}
                            handleClose={() => setRegistrationWizardState(false)}
                            onBack={handleBack}
                            onNext={handleNext}
                        /> */}
            </Dialog>
        </>

    )
}
export default withSnackbar(NewRegistrationDialog);