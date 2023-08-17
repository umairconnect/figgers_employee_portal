import { Card, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import EconomicalIcon from '../../../../../../assets/img/economical.svg';
import FamilyPlanIcon from '../../../../../../assets/img/family-plan.svg';
import TypeIcon from '../../../../../../assets/img/type.svg';
import UnlimitedPLanIcon from '../../../../../../assets/img/unlimited-plan.svg';

import useStyles from "./styles";
function ChoosePlan() {
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
        <Grid container>
            <Grid lg={12}>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={`${classes.card} ${classes.cardTitle}`}>
                                <img src={TypeIcon} alt="icon" />
                                <Typography className={classes.cardTitle}>Text and Type</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={classes.card}>
                                <img src={EconomicalIcon} alt="economical" />
                                <Typography className={classes.cardTitle}>Economical</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={classes.card}>
                                <img src={UnlimitedPLanIcon} alt="unlimited plan" />
                                <Typography className={classes.cardTitle}>Unlimited Plan</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={classes.card}>
                                <img src={FamilyPlanIcon} alt="family plan" />
                                <Typography className={classes.cardTitle}>Family Plan</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChoosePlan