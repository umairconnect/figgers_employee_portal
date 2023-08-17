import React, { useState, useEffect } from 'react'
import { Button, Dialog, Grid, Icon, Typography, Select, FormHelperText } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import WarningMsg from './../../assets/img/action/warningmsg.svg';
import WarningRed from './../../assets/img/icons/warning_red.svg';
import WarningRedTrasp from './../../assets/img/icons/warning-sign-transp.svg';
import useStyles from "./styles";
import RechargeDialog from '../../pages/prepaid/components/recharge/RechargeDialog';

function MessageDialog({ messageText, openMessage, closeMessage,successClose, icon, rechargeBtn, iconSize, ...props }) {
    const classes = useStyles();
    
    const [rechargeDialog, setRechargeDialog] = useState(false);

    const handleCloseDialog = () => {
        if (successClose) {
            successClose();
            closeMessage();
        } else {
            closeMessage();
        }
    }

    useEffect(() => {
    }, [])
    return (
        <>
            <Dialog open={openMessage} onClose={closeMessage}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>

                        {/* <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>Package Expiry</Typography>
                        <Icon className={classes.closeIcon} onClick={closeMessage} color="primary"><CloseIcon /></Icon>
                    </div> */}

                        <div className={classes.content}>
                            <img src={icon} style={{width : iconSize}} />
                            <p>{messageText} </p>
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.footerButtons}>
                                <Button className={classes.changeBtn} onClick={handleCloseDialog}>OK</Button>
                                {rechargeBtn ? 
                                    <Button className={classes.changeBtn} onClick={() => setRechargeDialog(true)}>Recharge Now</Button>: ''
                                }
                            

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            {rechargeDialog ?
                <RechargeDialog dialogOpenClose={rechargeDialog}
                    handleClose={() => { setRechargeDialog(false) }}
                /> : ''
            }</>

    );
};

export default MessageDialog