import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";

import EmptyGrid from './../../assets/img/emptyGrid.svg';

export default function NoRecord({ message, Icon, ...props }) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.noRecord}>
                {Icon ? <img src={EmptyGrid} /> : ''}
                <div className={classes.noRecordText}> {message} </div>
            </div>
        </>
    )
}
