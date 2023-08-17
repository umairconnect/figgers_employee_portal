import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
import LoadingIcon from "../../assets/img/icons/loaderfiggers.gif";

export default function DialogLoader({position, ...props}) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.dialogloader} style={{position: position}}>
                <img src={LoadingIcon} />
            </div>
        </>
    )
}
