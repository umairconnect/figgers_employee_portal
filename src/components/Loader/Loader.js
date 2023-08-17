import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
import LoadingIcon from "../../assets/img/icons/loaderfiggers.gif";

export default function Loader({whiteBg, ...props}) {
    const classes = useStyles();
    return (
        <>
            <div className={whiteBg? classes.fixloaderWhite : classes.fixloader}>
                <img src={LoadingIcon} />
            </div>
        </>
    )
}
