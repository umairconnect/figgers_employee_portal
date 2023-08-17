import React from "react";
import SpacerStyle from "./styles";

function TopSpacer () {
    const classes = SpacerStyle();
    
    return (
        <div className={classes.appBarSpacer} />
    )
}
export default TopSpacer;