import React, { lazy, Suspense, useEffect } from "react";
import {
    Grid, Drawer,
    CssBaseline,
    Box, AppBar,
    Toolbar, List,
    Typography, Divider,
    IconButton, Badge,
    Breadcrumbs, Paper,
    Link
} from "@material-ui/core"
import useStyles from "./styles";
import Breadcrums from "../../components/BreadCrums/breadcrums";
import TopSpacer from "../../components/Common/spacer/TopSpacer";
import NoRecord from "../../components/NoRecord/NoRecord";

function PackageExpiration() {
    const classes = useStyles();
    return (
        <>

            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={8}>
                        <Breadcrums parentLink={"Package Expiration"} currentLink=""></Breadcrums>
                    </Grid>
                </Grid>

            </div>

            <div className={classes.container}>
                <Grid row>
                    <NoRecord Icon={true} message="Coming Soon"></NoRecord>
                </Grid>
            </div>


        </>
    )
}
export default PackageExpiration;