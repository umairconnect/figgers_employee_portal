import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
import {
    Breadcrumbs,
    Button,
} from "@material-ui/core";
import { Link } from 'react-router-dom';


import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useHistory } from "react-router-dom";
import EmptyGrid from './../../assets/img/emptyGrid.svg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Breadcrums({ parentLink, isBack, currentLink, currentURL, childText, ...props }) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <>
            <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb" className={classes.customBreadcrumbs}>

                <Link color="inherit" className="no-link" >
                    <span className={classes.parantLink}>{parentLink}</span>
                </Link>

                <Link color="inherit" className={currentURL ? '': "no-link"} to={currentURL}>
                    <span className={classes.childLink}>  {currentLink}</span>
                </Link>

                {childText ?
                    <Link color="inherit" className="no-link">
                        <span className={classes.childLink}>  {childText}</span>
                    </Link> : ''
                }

            </Breadcrumbs>

            {isBack ?
                <Button className={classes.changeBtn} onClick={() => history.goBack()}>
                    <ArrowBackIosIcon /> Go Back
                </Button> : ''
            }


        </>
    )
}
