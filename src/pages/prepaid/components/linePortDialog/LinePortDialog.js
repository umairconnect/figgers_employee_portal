import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";

import DialogLoader from '../../../../components/Loader/DialogLoader';
import PortaNumber from '../../../../assets/img/icons/portanumber.svg';
import Addaline from '../../../../assets/img/icons/addaline.svg';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import ActivateNow from '../activateNow/ActivateNow';
import NewRegistrationDialog from '../../../postpaid/components/newRegistrationDialog/NewRegistrationDialog';

function LinePortDialog({ dialogOpenClose, handleClose, handleSuccessClose, openActivateDialog, openPortANumber, ...props }) {
    const classes = useStyles();

    const [activateNow, setActivateNow] = useState(false);

    const AddALine = () => {
        openActivateDialog()
        handleClose()
    }

    const PortANumber = () => {
        openPortANumber()
        handleClose()
    }

    useEffect(() => {

    }, []);
    return (
        <>


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
                            <Typography className={classes.title}>Choose an option </Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>

                                <Grid container>
                                    <h1 className={classes.heading}>Select from these</h1>
                                </Grid>

                                <Grid container justifyContent='center' alignItems='center'>
                                    <div className={classes.linkBox} onClick={AddALine}>
                                        <img src={Addaline} />
                                        <h3>Add a Line</h3>
                                    </div>
                                    <p className={classes.orText}> OR  </p>
                                    <div className={classes.linkBox} onClick={PortANumber}>
                                        <img src={PortaNumber} />
                                        <h3>Port a Number</h3>
                                    </div>
                                </Grid>
                            </Scrollbars>
                        </div>
                        <div className={classes.footer}>

                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>CLOSE</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
         
        </>
    )
}

export default LinePortDialog;