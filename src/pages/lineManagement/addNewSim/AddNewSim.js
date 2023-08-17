
import React, { useState } from "react";
import {
    Badge,
    Breadcrumbs,
    Button,
    Card,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    Radio,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography, RadioGroup
} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SearchOutlined } from "@material-ui/icons";
import SearchGrid from "../../../components/table/SearchGrid";
import { InputBaseField } from "../../../components/InputField/InputField";

import { CustomBtn } from '../../../components/UiElements/UiElements';

import PendingIcon from '../../../assets/img/newSim/pending.svg';
import ShippingIcon from '../../../assets/img/newSim/shipping.svg';
import ActivatedIcon from '../../../assets/img/newSim/activated.svg';
import RefundedIcon from '../../../assets/img/newSim/refunded.svg';
import BreadcrumComponent from "../../../components/BreadCrums/breadcrums";
import ActivateNow from "./../../prepaid/components/activateNow/ActivateNow";

import useStyles from "./styles";
export default function AddNewSim({ ...props }) {
    const classes = useStyles();
    const [activateNow, setActivateNow] = useState(false);

    const showActivateNow = () => {
        setActivateNow(true)
    }
    const pendingData = [
        {
            requestsId: 0,
            sr: '1',
            fullName: 'John Doe',
            phone: '165411-1654-564',
            email: 'johndoe@gmail.com',
            address: 'Street 2, Flat 6, xyz Eve, brandon road, FL',
            orderDate: 'Tuesday 10, 2023',
            figgersAccount: '',
            billingCycle: '28 days',
            plan: 'Talk and Type',
            orderNumber: '4546566666',
            customerInformation: '',
            orderInformation: '',
            orderStatus: 'Pending',
            requestAction: ''
        }
    ];
    const shippedData = [
        {
            requestsId: 0,
            sr: '1',
            fullName: 'John Doe',
            phone: '165411-1654-564',
            email: 'johndoe@gmail.com',
            address: 'Street 2, Flat 6, xyz Eve, brandon road, FL',
            orderDate: 'Tuesday 10, 2023',
            figgersAccount: '',
            billingCycle: '28 days',
            plan: 'Talk and Type',
            orderNumber: '4546566666',
            customerInformation: '',
            orderInformation: '',
            orderStatus: 'Shipped',
            requestAction: ''
        }
    ];
    const activatedData = [
        {
            requestsId: 0,
            sr: '1',
            fullName: 'John Doe',
            phone: '165411-1654-564',
            email: 'johndoe@gmail.com',
            address: 'Street 2, Flat 6, xyz Eve, brandon road, FL',
            orderDate: 'Tuesday 10, 2023',
            figgersAccount: '',
            billingCycle: '28 days',
            plan: 'Talk and Type',
            orderNumber: '4546566666',
            customerInformation: '',
            orderInformation: '',
            orderStatus: 'Activated',
            requestAction: ''
        }
    ];
    const refundedData = [
        {
            requestsId: 0,
            sr: '1',
            fullName: 'John Doe',
            phone: '165411-1654-564',
            email: 'johndoe@gmail.com',
            address: 'Street 2, Flat 6, xyz Eve, brandon road, FL',
            orderDate: 'Tuesday 10, 2023',
            figgersAccount: '',
            billingCycle: '28 days',
            plan: 'Talk and Type',
            orderNumber: '4546566666',
            customerInformation: '',
            orderInformation: '',
            orderStatus: 'Refunded',
            requestAction: ''
        }
    ];
    const [state, setState] = useState({ status: 'Pending' });
    const [rowsData, setRowsData] = useState(pendingData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (value === 'Pending') {
            setRowsData(pendingData);
        } else if (value === 'Shipped') {
            setRowsData(shippedData);
        } else if (value === 'Activated') {
            setRowsData(activatedData);
        } else if (value === 'Refunded') {
            setRowsData(refundedData);
        }
    }
    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        console.log('value', state.status, name, checked)
    }
    const statusRadiobox = [
        {
            value: '02',
            status: 'Pending',
            icon: PendingIcon,
        },
        {
            value: '20',
            status: 'Shipped',
            icon: ShippingIcon,
        },
        {
            value: '25',
            status: 'Activated',
            icon: ActivatedIcon,
        },
        {
            value: '20',
            status: 'Refunded',
            icon: RefundedIcon,
        }
    ]
    return (<div>
        <div className={classes.appBarSpacer} />
        <div className={classes.header}>

            <BreadcrumComponent parentLink="Add New Line" ></BreadcrumComponent>


        </div>
        <div className={classes.newSimContainer}>

            <Grid container>
                <Grid item lg={6}>
                    <Typography className={classes.title}>Requests</Typography>
                </Grid>
                <Grid item lg={6} style={{ textAlign: 'right', paddingBottom: '6px' }}>
                    <CustomBtn onClick={() => showActivateNow()} id="addButtonBorder" btnType="primary" className={classes.smButton} customClass={true} shape="round"> Add New Line</CustomBtn>
                </Grid>

            </Grid>

            <Grid container>
                <Grid item lg={12}>
                    <RadioGroup
                        // row
                        className={classes.cardContainer}
                        onChange={handleChange}
                        value={state.status}>
                        {statusRadiobox.map((item, i) => (
                            <>
                                <FormControlLabel
                                    className={classes.checkBoxFormLabel}
                                    control={
                                        <Radio
                                            color="primary"
                                            name="status"
                                            // className={classes.checkBoxBtn}
                                            value={item.status}
                                        />
                                    }
                                    label={<>
                                        <Card className={`card ${item.status === "Pending" ? "pendingCard active" :
                                            item.status === "Shipped" ? "shippedCard active" :
                                                item.status === "Activated" ? "activatedCard active" :
                                                    item.status === "Refunded" ? "refundedCard active" : ''}`}
                                        // className={`${classes.card} ${classes.pendingCard}`}
                                        >
                                            <span>
                                                <Typography component="h5">{item.status}</Typography>
                                                <Typography component="h3">{item.value}</Typography>
                                            </span>
                                            <img src={item.icon} alt="pending" />
                                        </Card>
                                    </>}
                                />
                            </>
                        ))}
                    </RadioGroup>
                </Grid>
            </Grid>
            <div className={classes.gridSection}>
                <Grid container>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9} />
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
                        />
                    </Grid>
                </Grid>

                {
                    state.status && <SearchGrid key={state.status} columns="AddNewSim" list={rowsData}
                    // onActionClick={handleActionClick} 
                    />
                }
            </div>
        </div>

        {activateNow ?
            <ActivateNow
                dialogOpenClose={activateNow}
                handleClose={() => setActivateNow(false)}
            ></ActivateNow>
            : null}

    </div >);
}
