import React, { useState, useEffect } from "react";
import {
    Badge,
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography
} from "@material-ui/core";
import useStyles from "./styles";
import SearchGrid from "../../../components/table/SearchGrid";
import Loader from "../../../components/Loader/Loader";
import Breadcrums from "../../../components/BreadCrums/breadcrums";
import { CustomBtn } from "../../../components/UiElements/UiElements";
import { CollapsibleSearch, SearchFormField } from "../../../components/InputField/InputField";
import profilePlaceholder from '../../../assets/img/profilePlaceholder.jpg';
import AddIcon from "../../../assets/img/buttonIcons/add.svg";


function CorporateManagement({ isPostpaid, isPinCodeVerified, ...props }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)

    const CorporateManagement = [
        {
            Account: "23423423",
            CustomerName: "Belita Wyatt",
            Phone: "(909) 644-9965",
            EmailAddress: "johnDoe@gmail.com",
            UserProfile: <div className="user-profile-grid" style={{ margin: 'auto', backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>,
            status: <div className={classes.accountStatus}> Activate</div>,
        },
        {
            Account: "23423423",
            CustomerName: "Belita Wyatt",
            Phone: "(909) 644-9965",
            EmailAddress: "johnDoe@gmail.com",
            UserProfile: <div className="user-profile-grid" style={{ margin: 'auto', backgroundImage: 'URL(' + profilePlaceholder + ')' }}></div>,
            status: <div className={classes.accountStatus}> Activate</div>,
        }
    ]
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}

            <div className={classes.appBarSpacer} />

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Figgers Backend"} currentLink="Corporate Management"></Breadcrums>
                    </Grid>
                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            <Grid row container className={classes.container} alignItems="baseline" >
                <Grid item lg={7}>
                    <h3 className={classes.pageHeading}> Corporate Management </h3>
                </Grid>

                <Grid item lg={5} >
                    <div style={{ paddingTop: '5px' }} className={"d-flex alignItemsCenter justifyContentEnd"}>
                        <Button className={classes.changeBtn}><img src={AddIcon} className={"filterwhite"} /> &nbsp; Setup Now</Button>
                        <SearchFormField
                            placeholder={"Search Account"}
                            value={""}
                            name={"accountNumber"}
                            id={"accountNumber"}
                            type="number"
                        />
                    </div>

                </Grid>
            </Grid>

            <Grid row className={classes.container} >


                <SearchGrid columns="CorporateManagement"
                    list={CorporateManagement}
                    noRecordMsg="No prepaid line exists"
                    Icon={true} />
            </Grid>

        </>
    )
}
export default CorporateManagement;