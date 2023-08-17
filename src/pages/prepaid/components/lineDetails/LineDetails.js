import { Dialog, Grid, Icon, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { formatDate, formateMdnNumber } from '../../../../components/Common/Extensions';
import Loader from '../../../../components/Loader/Loader';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements'

import DialogLoader from '../../../../components/Loader/DialogLoader';

function LineDetailsDialog({ dialogOpenClose, handleClose, isPrepaid, ...props }) {
    const classes = useStyles();
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [lineDetails, setLineDetails] = useState(props.lineDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    const getLineDetails = () => {
        var obj = {
            MDN: mdnNumber,
            accountNumber: accountNumber,
            isPrepaid: isPrepaid
        };
        setIsLoading(true)
        PostDataAPI("telispire/getLineDetailsByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data);
                debugger;
                if (result.data.status == '1') {
                    result.data.currentStatus = "InActive";
                }
                else if (result.data.status == '2') {
                    result.data.currentStatus = "Active";
                }
                else if (result.data.status == '3') {
                    result.data.currentStatus = "Suspended";
                }
                else if (result.data.status == '4') {
                    result.data.currentStatus = "Disconnected";
                }
                else if (result.data.status == '6') {
                    result.data.currentStatus = "Hotlined";
                }
                else if (result.data.status == '7') {
                    result.data.currentStatus = "Rejected";
                }
                result.data.lineType = result.data.isPrepaid ? 'Prepaid' : 'Postpaid'
                setState(result.data);
            } else {

            }
        })
    }

    const getLineIVRDetailsByMdn = () => {
        var obj = {
            MDN: mdnNumber,
            accountNumber: accountNumber,
            isPrepaid: isPrepaid
        };
        setIsLoading(true)
        PostDataAPI("telispire/getLineIVRDetailsByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data);
                if (result.data.currentStatus == 1) {
                    result.data.currentStatus = "InActive";
                }
                else if (result.data.currentStatus == 2) {
                    result.data.currentStatus = "Active";
                }
                else if (result.data.currentStatus == 3) {
                    result.data.currentStatus = "Suspended";
                }
                else if (result.data.currentStatus == 4) {
                    result.data.currentStatus = "Disconnected";
                }
                else if (result.data.currentStatus == 6) {
                    result.data.currentStatus = "Hotlined";
                }
                else if (result.data.currentStatus == 7) {
                    result.data.currentStatus = "Rejected";
                }
                result.data.lineType = result.data.isPrepaid ? 'Prepaid' : 'Postpaid'
                setState(result.data);
            } else {

            }
        })
    }
    useEffect(() => {
        console.log(props.lineDetails)
        //getLineDetails();
    }, []);
    return (
        <>

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="lg"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.dialogContent}>

                    <div className={classes.box}>

                        <div className={classes.header} id="draggable-dialog-title">
                            {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                            <Typography className={classes.title}>Line Details : {formateMdnNumber(props.mdnNumber)}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                            {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <div className={classes.content}>


                            <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                                <Grid container row>
                                    <Grid item lg={6}>
                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>Name:</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{lineDetails.username}</Typography>
                                        </Grid>

                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>Type:</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{lineDetails.isPrepaid ? 'Prepaid' : 'Postpaid'}</Typography>
                                        </Grid>


                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>Activated on:</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{formatDate(lineDetails.activationDate)}</Typography>
                                        </Grid>

                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>ICC /SIM</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{lineDetails.iCC}</Typography>
                                        </Grid>


                                    </Grid>


                                    <Grid item lg={6}>
                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>Plan Name:</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{lineDetails.primaryPlanName}</Typography>
                                        </Grid>

                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>Status:</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={`${classes.valueText} ${classes.active}`}>
                                                <div className="statuses"><span className={
                                                    lineDetails.status === "Active" ? 'activeStatus' :
                                                        lineDetails.status === "Inactive" ? 'inActiveStatus' :
                                                            lineDetails.status === "Suspended" ? 'SuspendedStatus' :
                                                                lineDetails.status === "Disconnected" ? 'disconnectStatus' :
                                                                    lineDetails.status === "Hotlined" ? 'hotlineStatus' : ''

                                                }> {lineDetails.status}</span>
                                                </div>
                                            </Typography>
                                        </Grid>

                                        <Grid row lg={12}>
                                            <Typography className={classes.labelText}>ESN / IMEI</Typography>
                                        </Grid>
                                        <Grid row lg={12}>
                                            <Typography className={classes.valueText}>{lineDetails.eSN}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>


                            </Scrollbars>
                        </div>
                        {/* <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <CustomBtn id="save" size="medium" onClick={handleClose}  >Close</CustomBtn>

                        </div>
                    </div> */}
                    </div>
                </div>
            </Dialog >
        </>

    )
}

export default LineDetailsDialog