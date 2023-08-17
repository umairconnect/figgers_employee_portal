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


function OrderAndTracking() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.appBarSpacer} />
            <div className={classes.header}>
                {/* <h1>WELCOME BACK!</h1> */}
                
                <Breadcrumbs separator=">" aria-label="breadcrumb" className={classes.customBreadcrumbs}>
                    {/* <Link color="inherit" href="/" >
                        Order And Tracking
                    </Link> */}
                </Breadcrumbs>
                
               
            </div>

            <Grid className={classes.container}>
            {/* <h1> test</h1> */}

            </Grid>
            
            </>
    )
}
export default OrderAndTracking;