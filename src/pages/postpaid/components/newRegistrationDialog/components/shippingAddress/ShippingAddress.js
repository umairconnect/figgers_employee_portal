import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { Label } from '../../../../../../components/UiElements/UiElements'
import { InputBaseField } from '../../../../../../components/InputField/InputField'

function ShippingAddress({ ...props }) {
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
                        <Label size={12} title="First Name" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={state.firstName}
                                onChange={handleChange}
                                placeholder='First Name'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="Last Name" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={state.lastName}
                                onChange={handleChange}
                                placeholder='Last Name'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Label size={12} title="Address" />
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <InputBaseField
                            id="address"
                            name="address"
                            type="text"
                            value={state.address}
                            onChange={handleChange}
                            placeholder='Address'
                            IsDisabled={false}
                            MaxLength='14'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Label size={12} title="City" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="city"
                                name="city"
                                type="text"
                                value={state.city}
                                onChange={handleChange}
                                placeholder='City'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Label size={12} title="State" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="state"
                                name="state"
                                type="text"
                                value={state.state}
                                onChange={handleChange}
                                placeholder='State'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={4} md={4} lg={4} xl={4} >
                        <Label size={12} title="Zip code" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                value={state.zipCode}
                                onChange={handleChange}
                                placeholder='Zip code'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="Email" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="email"
                                name="email"
                                type="text"
                                value={state.email}
                                onChange={handleChange}
                                placeholder='Email'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6} >
                        <Label size={12} title="Contact Number" />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            <InputBaseField
                                id="contactNumber"
                                name="contactNumber"
                                type="text"
                                value={state.contactNumber}
                                onChange={handleChange}
                                placeholder='Contact Number'
                                IsDisabled={false}
                                MaxLength='14'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ShippingAddress