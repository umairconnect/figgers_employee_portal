import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { DraggableComponent } from '../../../../../components/UiElements/UiElements';
import useStyles from "./../styles";
import { formateMdnNumber } from '../../../../../../src/components/Common/Extensions';
//import printImg from '../../../../../images/login-image.png';
function ActivatedMessage({ dialogOpenClose, handleClose, accountNumber, phoneNumber, shipmentIncluded, imagePath, ...props }) {
    const classes = useStyles();
    const [printImageContent, setprintImageContent] = useState(imagePath);
    const printImage = () => {
        var printContent = document.getElementById('upsImg').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }
    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="lg"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Message</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>



                        <Scrollbars autoHeight autoHeightMax={570}>
                            <div className={classes.content}>

                                <Grid container direction="column">
                                    <h3 style={{ margin: '3px 0px 12px 0' }}>Account has been created with following information: </h3>
                                </Grid>

                                <Grid row container className={classes.accountInfor}>
                                    <Grid item lg={6} md={6}>
                                        <Typography className={classes.labelText}>Account Number:</Typography>
                                        <Typography className={classes.valueText}>{accountNumber}</Typography>
                                    </Grid>
                                    <Grid item lg={6} md={6}>
                                        <Typography className={classes.labelText}>Current Phone Number:</Typography>
                                        <Typography className={classes.valueText}>{formateMdnNumber(phoneNumber)}</Typography>
                                    </Grid>
                                </Grid>
                             
                                {shipmentIncluded ?
                                    <Grid row container>
                                        <Grid item lg={12} md={12}>
                                            <Typography className={classes.labelText}>UPS Label:</Typography>
                                            <div id="upsImg" className={classes.upsImage}>
                                                <img src={imagePath} width="500px" alt="UPS Label"></img></div>
                                        </Grid>
                                    </Grid>
                                    : ''}

                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                {shipmentIncluded ?
                                    <Button className={classes.backBtn} onClick={printImage}>Print</Button>
                                    : ''}
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default ActivatedMessage;