import { Grid, Typography, Divider } from '@material-ui/core'
import React, { useState } from 'react'
import { Label, LinkS } from '../../../../../../components/UiElements/UiElements'
import CompleteOrderImage from '../../../../../../assets/img/complete-order.svg';
import { formateMdnNumber } from '../../../../../../../src/components/Common/Extensions';

import useStyles from "./styles";
function OrderCompleted({ msisdn, fromCarrier, planType, ...props }) {
    const classes = useStyles();
    const [state, setState] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    return (
        <Grid container justifyContent='center'>
            <Grid item lg={12}>
                <div className={classes.subContainer}>
                    <img src={CompleteOrderImage} alt="order" />
                    <Typography className={classes.text}>
                        Your Request for <LinkS className={classes.linkItem}>{formateMdnNumber(msisdn)}</LinkS> from {fromCarrier} to FIGGERS on <LinkS> {planType}</LinkS> Completed
                    </Typography>
                    <Divider variant="middle" orientation="horizontal" className={classes.divider} />
                    <Typography className={classes.noteText}>Your request for port-in will be done in few hours</Typography>
                </div>
            </Grid>
        </Grid>
    )
}

export default OrderCompleted