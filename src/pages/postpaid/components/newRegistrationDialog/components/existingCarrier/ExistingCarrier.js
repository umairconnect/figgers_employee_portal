import { Card, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { Label } from '../../../../../../components/UiElements/UiElements'
import { InputBaseField } from '../../../../../../components/InputField/InputField';

import VerizonIcon from '../../../../../../assets/img/verizon-logo.svg';
import TMobileIcon from '../../../../../../assets/img/t-mobile.svg';
import SprintIcon from '../../../../../../assets/img/Sprint_Corporation-logo.svg';
import ATTIcon from '../../../../../../assets/img/Att_logo.svg';
import CellPhoneIcon from '../../../../../../assets/img/cellphone-plan.svg';

import useStyles from "./styles";
function ExistingCarrier() {
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
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Card className={classes.card}>
                            <img src={VerizonIcon} alt="verizon" />
                        </Card>
                    </Grid>
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Card className={classes.card}>
                            <img src={TMobileIcon} alt="TMobile" />
                        </Card>
                    </Grid>
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Card className={classes.card}>
                            <img src={SprintIcon} alt="Sprint" />
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={classes.card}>
                                <img src={ATTIcon} alt="At&t mobile" />
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Grid container justifyContent='center'>
                            <Card className={classes.card}>
                                <img src={CellPhoneIcon} alt="cell-phones" />
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ExistingCarrier