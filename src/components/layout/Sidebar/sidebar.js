import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import OrderTrackingIcon from '../../../assets/img/icons/orderTracking.svg';
import BackendIcon from '../../../assets/img/icons/backend.svg';
import FiggersUHP from '../../../assets/img/icons/figgersUHP.svg';
import AddressBook from '../../../assets/img/icons/addressbook.svg';
import LineManagement from '../../..//assets/img/icons/lineManagement.svg';
import ShopIcon from '../../../assets/img/icons/store-Bold.svg';
import Invention from '../../../assets/img/icons/Invention.svg';
import Reviews from '../../../assets/img/icons/Reviews.svg';
import Notification from '../../../assets/img/icons/Notification.svg';
import ProfileImage from '../../..//assets/img/profileImage.png';
import UserBold from '../../..//assets/img/icons/user-Bold.svg';
import commentsIcons from '../../../assets/img/icons/comments-Bold.svg';
import questionCircle from '../../../assets/img/icons/question-circle-Bold.svg';
import mobileIcon from '../../../assets/img/icons/mobile-Bold.svg';
import folderBold from '../../../assets/img/icons/folderBold.svg'
import LogoSm from '../../../assets/img/logo-sm.svg';
import SettingsIcon from '../../../assets/img/icons/setting.svg';


import {
    Grid, Drawer,
    CssBaseline,
    Box, AppBar,
    Toolbar, List,
    Typography, Divider,
    IconButton, Badge,
    Container, Paper,
    Link
} from "@material-ui/core";

function Sidebar() {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
        <>
                  <Link className={classes.menuListActive} to="/app/dashboard"><DashboardIcon /> <span className={classes.MenuLabel}> Dashboard </span></Link>
                    <Link to=""><img src={OrderTrackingIcon} /> <span className={classes.MenuLabel}> Order and Tracking </span></Link>
                    <Link to=""><img src={BackendIcon} /> <span className={classes.MenuLabel}>Backend</span></Link>
                    <Link to=""><img src={FiggersUHP} /> <span className={classes.MenuLabel}>Figgers UHP</span></Link>
                    <Link to=""><img src={AddressBook} /> <span className={classes.MenuLabel}>Address Book</span></Link>
                    <Link to="/app/wireless"><img src={LineManagement} /> <span className={classes.MenuLabel}>Line Management</span></Link>
                    <Link to=""><img src={ShopIcon} /> <span className={classes.MenuLabel}>Shop</span></Link>
                    <Link to=""><img src={Invention} /> <span className={classes.MenuLabel}>Inventions</span></Link>
                    <Link to=""><img src={Reviews} /> <span className={classes.MenuLabel}>Reviews</span></Link>
                    <Link to=""><img src={UserBold} /> <span className={classes.MenuLabel}>Subscribers</span></Link>
                    <Link to=""><img src={commentsIcons} /> <span className={classes.MenuLabel}>Communication</span></Link>
                    <Link to=""><img src={questionCircle} /> <span className={classes.MenuLabel}>Inquires</span></Link>
                    <Link to=""><img src={mobileIcon} /> <span className={classes.MenuLabel}>Damage and Repairs</span></Link>
                    <Link to=""><img src={folderBold} /> <span className={classes.MenuLabel}>Office</span></Link>
        </>
    )

}

export default Sidebar;
