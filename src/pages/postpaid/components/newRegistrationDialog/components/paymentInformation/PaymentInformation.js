import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Label } from '../../../../../../components/UiElements/UiElements'
import { InputBaseField } from '../../../../../../components/InputField/InputField'

import useStyles from "./styles";
function PaymentInformation({ ...props }) {
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
                        <Label size={12} title="Name On Card" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="nameOnCard"
                                name="nameOnCard"
                                type="text"
                                value={state.nameOnCard}
                                onChange={handleChange}
                                placeholder='Name On Card'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="Debit /Credit Card Number" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                value={state.cardNumber}
                                onChange={handleChange}
                                placeholder='Debit /Credit Card Number'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="CVC" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="cvc"
                                name="cvc"
                                type="text"
                                value={state.cvc}
                                onChange={handleChange}
                                placeholder='CVC'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="Expiry Date" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="expiryDate"
                                name="expiryDate"
                                type="text"
                                value={state.expiryDate}
                                onChange={handleChange}
                                placeholder='Expiry Date'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={12} className={classes.noteSection}>
                        <Typography>Note:  $ 4.99 per SIM shall be charged</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PaymentInformation