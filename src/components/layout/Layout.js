import React, { useState, lazy, Suspense, useEffect } from "react";
import clsx from 'clsx';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useUserDispatch, signOut } from "../../context/UserContext";
import { Table, Empty, Dropdown, Menu } from 'antd';
import { Route, Switch, Redirect, useLocation, NavLink, useHistory } from "react-router-dom";
import Subscriber from "../../pages/office/subscriber/Subscriber";

import {
    Drawer, Badge,
    Box, AppBar,
    Toolbar, List,
    IconButton, ListItem,
    Collapse,
    Button, Tooltip
} from "@material-ui/core";
import PostpaidWireless from '../../pages/postpaid/Postpaid';
import Dashboard from './../../pages/dashboard/Dashboard';
import OrderAndTracking from './../../pages/orderAndTracking/orderAndTracking';
import PrepaidWireless from "./../../pages/prepaid/PrepaidWireless";
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MessagesIcon from '../../assets/img/icons/Messages.svg';
//import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardIcon from '../../assets/img/icons/dashboardIcon.svg';
import Logo from '../../assets/img/Figgers-Logo.svg';
import DashboardOrderTracking from '../../assets/img/icons/DashboardOrderTracking.svg';
import BackendIcon from '../../assets/img/icons/DashboardBackendIcon.svg';
import FiggersUHP from '../../assets/img/icons/DashboardfiggersUHPIcon.svg';
import AddressBook from '../../assets/img/icons/DashboardAddressIcon.svg';
import PhoneUtilitiIcon from '../../assets/img/icons/PhoneUtilitiIcon.svg';
import LineManagement from '../../assets/img/icons/lineManagement.svg';
import ShopIcon from '../../assets/img/icons/DashboardShopIcon.svg';
import OrdreCart from "../../assets/img/shop/ordreCart.svg";
import Paymenticon from "../../assets/img/shop/Paymenticon.svg";
import InternationalTracking from "../../assets/img/shop/internationalTracking.svg";
import ReturnLab from "../../assets/img/shop/ReturnLab.svg";
import DiscountDeals from "../../assets/img/shop/discount&Deals.svg";
import Invention from '../../assets/img/icons/DashboardInventionsIcon.svg';
import ReviewsIcon from '../../assets/img/icons/DashboardReviewsIcon.svg';
import Notification from '../../assets/img/icons/Notification.svg';
import ProfileImage from '../../assets/img/profileImage.png';
import profilePlaceholder from '../../assets/img/profilePlaceholder.jpg';
import UserBold from '../../assets/img/icons/DashboardSubscriberIcon.svg';
import Avatarprofile from './../../assets/img/avatarprofile.svg';
import commentsIcons from '../../assets/img/icons/DashboardCommunicationIcon.svg';
import questionCircle from '../../assets/img/icons/DashboardInquiriesIcon.svg';
import DamageRepairIcon from '../../assets/img/icons/DamageAndRepair.svg';
import DashboardOfficeIcon from '../../assets/img/icons/DashboardOfficeIcon.svg'
import LogoSm from '../../assets/img/logo-sm.svg';
import SettingsIcon from '../../assets/img/icons/setting.svg';
import Prepaid from '../../assets/img/icons/DashboardPrepaidIcon.svg';
import Postpaid from '../../assets/img/icons/DashboardPostpaidIcon.svg';
import AddNewSimIcon from '../../assets/img//newSim/add-new-sim.svg';
import CorporateIcon from '../../assets/img/icons/corporateIcon.svg'
import SubscribersIconBlue from '../../assets/img/icons/SubscribersIconBlue.svg';
import InventionsIconBlue from '../../assets/img/icons/InventionsIconBlue.svg';
import InquiriesIconBlue from '../../assets/img/icons/InquiriesIconBlue.svg';
import DamageAndRepairIconBlue from '../../assets/img/icons/DamageAndRepairIconBlue.svg';
import TagIcon from '../../assets/img/icons/tag.svg';
import AddressbookIconBlue from '../../assets/img/icons/AddressbookIconBlue.svg';
import DomesticTrackingIcon from '../../assets/img/icons/DomesticTracking.svg';
import DashboardShopIcon from "../../assets/img/icons/DashboardShopIcon.svg";
import WirelessSubscriber from '../../assets/img/icons/wirelessSubscriber.svg';
import Phoenix from '../../assets/img/icons/Phoenix.svg';
import NetworkCoverage from '../../assets/img/icons/NetworkCoverage.svg';
import ProtectionPlan from '../../assets/img/icons/ProtectionPlan.svg';
import UsageReport from '../../assets/img/icons/UsageReport.svg';
import Loader from './../../components/Loader/Loader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddNewSim from '../../pages/lineManagement/addNewSim/AddNewSim';
import Popover from '@material-ui/core/Popover';
import Communication from '../../pages/communication/Communication';
import DomesticTracking from "../../pages/OrderTracking/domesticTracking/DomesticTracking";
import CorporateManagement from "../../pages/backend/corporateManagement/CorporateManagement";
import NewRegistrationDialog from "../../pages/postpaid/components/newRegistrationDialog/NewRegistrationDialog";
import Inventory from '../../pages/shop/inventoryDiscounts/Inventory';
import figgerACP from "../../pages/figgerACP/figgerACP";
import OrderList from "../../pages/shop/order/orderList/OrderList";
import DealsDiscounts from "../../pages/shop/dealsDiscounts/Deals&Discounts";
import CustomerList from "../../pages/shop/customerList/CustomerList";
import ProtectionPlans from "../../pages/shop/protectionPlan/ProdectionPlans";
import DamageRepair from "../../pages/damage&Repair/DamageRepair";
import AddressBookPage from "../../pages/office/addressBook/AddressBook";
import PackageExpiration from "../../pages/packageExpiration/PackageExpiration";
import Profile from "../../pages/profile/Profile";
import Payment from "../../pages/payment/Payment";
import ACPIndividuals from "../../pages/figgerACP/individual/ACPIndividuals";
import UserPlaceholder from "../../assets/img/userPlaceholder.svg";
import Order from "../../pages/shop/order/Order";
import ACPOrganization from "../../pages/figgerACP/organization/ACPOrganization";
import Reviews from "../../pages/reviews/Reviews";
import ShopDashboard from "../../pages/shop/shopDashboard/ShopDashboard";
import { PostDataAPI } from '../../Services/APIService';
import { GetUserInfo } from '../../../src/Services/GetUserInfo';
import { ActionDialog } from "../ActionDialog/ActionDialog";
import CellularUsageReport from "../../pages/backend/cellularUsageReport/CellularUsageReport";
import BusinessInquiries from "../../pages/office/businessInquiries/BusinessInquiries";
import InventionDisclousure from "../../pages/invention/InventionDisclousure";
import InventionDisclousureForms from "../../pages/invention/components/InventionDisclousureForm";
import ShopDashboardIcon from '@material-ui/icons/Dashboard';
import DataUsageIcon from '@material-ui/icons/DataUsage';

import useStyles from "./styles";

export default function Layout(props) {

    const location = useLocation();
    const HomeHistory = useHistory();
    const [userInfo, setUserInfo] = useState(sessionStorage.getItem('user_info'));
    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;
    const [counter, setCounter] = useState(0);
    var userDispatch = useUserDispatch();
    const classes = useStyles();
    const [subMenuOpen, setSubMenuOpen] = React.useState(false);
    const [subMenuBackend, setSubMenuBackend] = React.useState(false);
    const [subFiggerACP, setSubFiggerACP] = React.useState(false);
    const [childMenu, setChildMenu] = React.useState(false);
    const [shopMenu, setShopMenu] = React.useState(false);
    const [officeMenu, setOfficeMenu] = React.useState(false);
    const [shippingMenu, setShippingMenu] = React.useState(false);

    const [loading, setLoading] = React.useState(true);

    const handleClickShippingMenu = () => {

        if (shippingMenu == true) {
            setShippingMenu(false);
        } else {
            setShippingMenu(true);
        }

    };



    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })
    const showActionDialog = (message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogState(prevState => ({
            ...prevState,
            type: type,
            showHide: true,
            message: message,
            onClickOk: OnOkCallback,
            OnClickCancel: OnCancellCallback
        }));
    }


    const logoutUser = (item) => {
        signOut(userDispatch, props.history)
        //showActionDialog("Are you sure, you want to logout?", "confirm", function () {
        //    signOut(userDispatch, props.history)
        //});

    }


    const handleClickOfficeMenu = () => {

        if (officeMenu == true) {
            setOfficeMenu(false);
        } else {
            setOfficeMenu(true);
        }

    };


    const handleClickshopMenu = () => {

        if (shopMenu == true) {
            setShopMenu(false);
        } else {
            setShopMenu(true);
        }

    };

    const handleClickchildMenu = () => {

        if (childMenu == true) {
            setChildMenu(false);
        } else {
            setChildMenu(true);
        }

    };

    const handleClickBackend = () => {

        if (subMenuBackend == true) {
            setSubMenuBackend(false);
        } else {
            setSubMenuBackend(true);
        }

    };

    const handleClickACP = () => {

        if (subFiggerACP == true) {
            setSubFiggerACP(false);
        } else {
            setSubFiggerACP(true);
        }

    };




    const handleClick = () => {

        if (subMenuOpen == true) {
            setSubMenuOpen(false);
        } else {
            setSubMenuOpen(true);
        }

    };


    const [anchorEl, setAnchorEl] = React.useState(null);

    const [anchorE1, setAnchorE1] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const [anchorE4, setAnchorE4] = React.useState(null);
    const [anchorE5, setAnchorE5] = React.useState(null);

    const isPopoverOpen1 = Boolean(anchorE1);
    const isPopoverOpen2 = Boolean(anchorE2);
    const isPopoverOpen3 = Boolean(anchorE3);
    const isPopoverOpen4 = Boolean(anchorE4);
    const isPopoverOpen5 = Boolean(anchorE5);

    const poperClose4 = () => {
        setAnchorE4(null);
    };


    const handlePopoverOpen1 = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handlePopoverClose1 = (event) => {
        setAnchorE1(null);
    };

    const handlePopoverOpen2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handlePopoverClose2 = (event) => {
        setAnchorE2(null);
    };


    const handlePopoverOpen3 = (event) => {
        setAnchorE3(event.currentTarget);
    };
    const handlePopoverClose3 = (event) => {
        setAnchorE3(null);
    };



    const handlePopoverOpen4 = (event) => {
        setAnchorE4(event.currentTarget);
    };
    const handlePopoverClose4 = (event) => {
        setAnchorE4(null);
    };





    const openPoper = Boolean(anchorEl);

    const id = openPoper ? 'simple-popover' : undefined;

    const poperOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const poperClose = () => {
        setAnchorEl(null);
    };


    const [open, setOpen] = React.useState(window.isMobileView ? false : true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const counterGet = () => {
        user = sessionStorage.getItem('user_info');
        setUserInfo(sessionStorage.getItem('user_info'));
        userdata = JSON.parse(user).user;

        var params = {
            code: "unread_chat_count",
            parameters: [userdata.userID.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                setCounter(result.data[0].t1 ? parseInt(result.data[0].t1) : 0)

                var ui = GetUserInfo();
                if (ui) {
                    startCounter();
                }
            }
        })
    }
    const startCounter = () => { setTimeout(function () { counterGet(); }, 9000); }
    useEffect(() => {
        console.log('Login User Info: ' + userdata);
        if (location.pathname === "/app/prepaid" || location.pathname === "/app/postpaid") {
            setSubMenuOpen(true);
        }
        counterGet()
        setLoading(true)

        setTimeout(() => {
            setLoading(false);
        }, 500);

    }, []);
    return (
        <div className={classes.root}>

            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    {open ? <div className={classes.toolbarIcon}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerClose}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div> : <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    }

                    <div className={classes.rightContent}>
                        <NavLink to="/app/communication">
                            <IconButton color="inherit">
                                <Badge badgeContent={counter} color="secondary">
                                    <img src={MessagesIcon} />
                                </Badge>
                            </IconButton>
                        </NavLink>

                        <IconButton color="inherit" className={"disabledEvent"}>
                            <Badge badgeContent={4} color="secondary">
                                <img src={Notification} />
                            </Badge>
                        </IconButton>


                        <IconButton color="inherit" className={"disabledEvent"}>
                            <img src={SettingsIcon} />

                        </IconButton>

                        <Dropdown overlay={<Menu>

                            <Menu.Item className={classes.DropdownItems}>
                                <NavLink to="/app/profile">
                                    <img className={classes.profileNavigationIco} src={UserPlaceholder} /> Profile
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item
                                onClick={() => logoutUser()}
                                className={classes.DropdownItems}>  <ExitToAppIcon /> Logout
                            </Menu.Item>





                        </Menu>} trigger={["click"]}
                            className={classes.actionDropDown}>

                            <Button className={classes.profileDropper}>
                                <img className="user-profile" src={userdata != null ? '.' + userdata.userPhotoPath : ''}></img>
                                <h4>{userdata != null ? userdata.firstName + (userdata.middleName && userdata.middleName.length > 0 ? ' ' + userdata.middleName + ' ' : ' ') + userdata.lastName : "Melvin B. Price Static"}</h4>
                                <ArrowDropDownIcon />

                            </Button>
                        </Dropdown>

                    </div>

                </Toolbar>
            </AppBar>


            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open ? classes.drawerPaperClose : ''),
                }}
                open={open}
            >
                <div className={open ? classes.logo : classes.logoSm}>
                    {open ?
                        <img onClick={() => HomeHistory.push('/app/dashboard')} src={Logo} /> : <img onClick={() => HomeHistory.push('/app/dashboard')} src={LogoSm} />
                    }

                </div>

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"

                    className={classes.menuList}
                >
                    <Tooltip title={open ? '' : "Dashboard"} placement="right">
                        <ListItem>
                            <NavLink to="/app/dashboard"> <img src={DashboardIcon} /> <span className={classes.MenuLabel}> Dashboard </span></NavLink>
                        </ListItem>
                    </Tooltip>


                    <div className={shippingMenu ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <Tooltip title={open ? '' : "Shipping & Tracking"} placement="right">
                            <ListItem onClick={open ? handleClickShippingMenu : handlePopoverOpen1}>
                                <div className={classes.subMenuHead}><img src={DashboardOrderTracking} /> <span className={classes.MenuLabel}>Shipping & Tracking {shippingMenu ? <ExpandLess /> : <ExpandMore />} </span> </div>
                            </ListItem>
                        </Tooltip>


                        {open ?
                            <Collapse in={shippingMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/domesticTracking"><img src={DomesticTrackingIcon} /> <span className={classes.MenuLabel}> Domestic</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <a rel="noopener noreferrer" href="https://www.dhl.com/pk-en/home.html?locale=true" target="_blank"><img src={InternationalTracking} /> <span className={classes.MenuLabel}>  International</span></a>
                                        {/*<NavLink to="/app/internationalTracking"><img src={InternationalTracking} /> <span className={classes.MenuLabel}>  International</span></NavLink>*/}
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/returnLabel"><img src={ReturnLab} /> <span className={classes.MenuLabel}>  Return Label</span></NavLink>
                                    </ListItem>


                                </List>
                            </Collapse>
                            :
                            ''
                        }

                        <div className={classes.menuPoper}>

                            <Popover
                                id={id}
                                open={isPopoverOpen1}
                                anchorEl={anchorE1}
                                onClose={handlePopoverClose1}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <List component="div" disablePadding>
                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/domesticTracking"><img src={DomesticTrackingIcon} /> <span className={classes.MenuLabel}> Domestic</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <a rel="noopener noreferrer" href="https://www.dhl.com/pk-en/home.html?locale=true" target="_blank"><img src={InternationalTracking} /> <span className={classes.MenuLabel}>  International</span></a>
                                        {/*<NavLink to="/app/internationalTracking"><img src={InternationalTracking} /> <span className={classes.MenuLabel}>  International</span></NavLink>*/}
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/returnLabel"><img src={ReturnLab} /> <span className={classes.MenuLabel}>  Return Label</span></NavLink>
                                    </ListItem>


                                </List>
                            </Popover>
                        </div>

                    </div>

                    <div className={subFiggerACP ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <Tooltip title={open ? '' : "Figgers ACP"} placement="right">
                            <ListItem onClick={open ? handleClickACP : handlePopoverOpen3} className={"disabledEvent"}>
                                <div className={classes.subMenuHead}> <img src={FiggersUHP} /> <span className={classes.MenuLabel}>Figgers ACP  {subFiggerACP ? <ExpandLess /> : <ExpandMore />} </span></div>
                            </ListItem>
                        </Tooltip>


                        {open ?
                            <Collapse in={subFiggerACP} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/figgerACP"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Dashboard</span></NavLink>
                                    </ListItem>

                                </List>

                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/ACPIndividuals"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Individuals</span></NavLink>
                                    </ListItem>

                                </List>

                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/ACPOrganization"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Organizations</span></NavLink>
                                    </ListItem>

                                </List>
                            </Collapse>
                            :
                            ''
                        }

                        <div className={classes.menuPoper}>

                            <Popover
                                id={id}
                                open={isPopoverOpen3}
                                anchorEl={anchorE3}
                                onClose={handlePopoverClose3}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <List component="div" disablePadding>
                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/figgerACP"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Dashboard</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/ACPIndividuals"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Individuals</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/ACPOrganization"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>ACP Organizations</span></NavLink>
                                    </ListItem>


                                </List>
                            </Popover>
                        </div>


                    </div>

                    <div className={subMenuBackend ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <ListItem onClick={open ? handleClickBackend : poperOpen}>
                            <div className={classes.subMenuHead}><img src={BackendIcon} /> <span className={classes.MenuLabel}>Backend {subMenuBackend ? <ExpandLess /> : <ExpandMore />} </span> </div>
                        </ListItem>

                        {open ?
                            <Collapse in={subMenuBackend} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/corporateManagement"><img src={CorporateIcon} /> <span className={classes.MenuLabel}>Corporate Management</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/cellularUsageReport"> <img src={UsageReport} style={{width:"23px"}} /> <span className={classes.MenuLabel}>Usage Report</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/invention"><img src={Phoenix} /> <span className={classes.MenuLabel}>Phoenix</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/invention"><img src={NetworkCoverage} /> <span className={classes.MenuLabel}>Network Coverage</span></NavLink>
                                    </ListItem>
                                </List>
                            </Collapse>
                            :
                            ''
                        } </div>


                    <div className={subMenuOpen ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <Tooltip title={open ? '' : "Wireless Subscriber"} placement="right">
                            <ListItem onClick={open ? handleClick : poperOpen}>
                                <div className={classes.subMenuHead}><img src={LineManagement} /> <span className={classes.MenuLabel}>Wireless Subscriber  {subMenuOpen ? <ExpandLess /> : <ExpandMore />} </span> </div>
                            </ListItem>
                        </Tooltip>


                        {open ?
                            <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>

                                        <NavLink to="/app/prepaid"><img src={Prepaid} /> <span className={classes.MenuLabel}>Prepaid</span></NavLink>
                                    </ListItem>
                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/postPaidVerify"><img src={Postpaid} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Postpaid</span></NavLink>
                                    </ListItem>

                                </List>
                            </Collapse>
                            :
                            ''
                        }

                        <div className={classes.menuPoper}>

                            <Popover
                                id={id}
                                open={openPoper}
                                anchorEl={anchorEl}
                                onClose={poperClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <List component="div" disablePadding>
                                    <ListItem className={classes.popperSub}>

                                        <NavLink to="/app/prepaid"><img src={Prepaid} /> <span className={classes.MenuLabel}>Prepaid</span></NavLink>
                                    </ListItem>
                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/postpaid"><img src={Postpaid} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Postpaid</span></NavLink>
                                    </ListItem>

                                </List>
                            </Popover>
                        </div>


                    </div>


                    <div className={shopMenu ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <Tooltip title={open ? '' : "Shop"} placement="right">
                            <ListItem onClick={open ? handleClickshopMenu : handlePopoverOpen2}>
                                <div className={classes.subMenuHead}><img src={DashboardShopIcon} /> <span className={classes.MenuLabel}>Shop{shopMenu ? <ExpandLess /> : <ExpandMore />} </span> </div>
                            </ListItem>
                        </Tooltip>


                        {open ?
                            <Collapse in={shopMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/shopDashboard"> <ShopDashboardIcon /> <span className={classes.MenuLabel}>Dashboard</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/orderList"><img src={OrdreCart} /> <span className={classes.MenuLabel}>Orders</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/inventory"><img src={DomesticTrackingIcon} />  <span className={classes.MenuLabel}>Product/Inventory </span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/DealsAndDiscounts"><img src={DiscountDeals} /> <span className={classes.MenuLabel}>Deals & Discounts </span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/customerList"><img src={TagIcon} /> <span className={classes.MenuLabel}>Customers</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/payment"><img src={Paymenticon} /> <span className={classes.MenuLabel}>Payments</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/protectionPlans"><img src={ProtectionPlan} style={{width:"23px"}} /> <span className={classes.MenuLabel}>Protection Plans</span></NavLink>
                                    </ListItem>

                                
                                </List>
                            </Collapse>
                            :
                            ''
                        }

                        <div className={classes.menuPoper}>

                            <Popover
                                id={id}
                                open={isPopoverOpen2}
                                anchorEl={anchorE2}
                                onClose={handlePopoverClose2}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <List component="div" disablePadding>
                                

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/shopDashboard"><DashboardIcon /> <span className={classes.MenuLabel}>Dashboard</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/orderList"><img src={OrdreCart} /> <span className={classes.MenuLabel}>Orders</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/inventory"><img src={TagIcon} /> <span className={classes.MenuLabel}>Product/Inventory </span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/DealsAndDiscounts"><img src={DiscountDeals} /> <span className={classes.MenuLabel}>Deals & Discounts </span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/customerList"><img src={TagIcon} /> <span className={classes.MenuLabel}>Customers</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/payment"><img src={Paymenticon} /> <span className={classes.MenuLabel}>Payments</span></NavLink>
                                    </ListItem>


                                </List>
                            </Popover>
                        </div>




                    </div>

                    <Tooltip title={open ? '' : "Reviews"} placement="right">
                        <ListItem>
                            <NavLink to="/app/reviews"><img src={ReviewsIcon} /> <span className={classes.MenuLabel}>Reviews</span></NavLink>
                        </ListItem>
                    </Tooltip>



                    <Tooltip title={open ? '' : "Communications"} placement="right">
                        <ListItem>
                            <NavLink to="/app/communication"><img src={commentsIcons} /> <span className={classes.MenuLabel}>Communications</span>
                                <span className={classes.communicationCount}>
                                    <Badge badgeContent={counter} color="secondary">
                                    </Badge>
                                </span>
                            </NavLink>
                        </ListItem>
                    </Tooltip>


                    <Tooltip title={open ? '' : "Phone Utility"} placement="right">
                        <ListItem className={"disabledEvent"}>
                            <NavLink to="/app/addressBook"><img src={PhoneUtilitiIcon} /> <span className={classes.MenuLabel}>Phone Utility</span></NavLink>
                        </ListItem>
                    </Tooltip>



                    <div className={officeMenu ? classes.openHasSubmenu : classes.hasSubmenu}>

                        <Tooltip title={open ? '' : "Office"} placement="right">
                            <ListItem onClick={open ? handleClickOfficeMenu : handlePopoverOpen4}>
                                <div className={classes.subMenuHead}><img src={DashboardOfficeIcon} /> <span className={classes.MenuLabel}>Office {officeMenu ? <ExpandLess /> : <ExpandMore />} </span> </div>
                            </ListItem>
                        </Tooltip>

                        {open ?
                            <Collapse in={officeMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/damage&Repair"><img src={DamageAndRepairIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Damage and Repairs</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/addressBook"><img src={AddressbookIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Address Book</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/addressBook"><img src={InventionsIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Inventions</span></NavLink>
                                    </ListItem>


                                    <ListItem className={classes.nested}>
                                        <NavLink to="/app/subscribers"><img src={SubscribersIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Subscribers</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.nested + " " + "disabledEvent"}>
                                        <NavLink to="/app/businessInquiries"><img src={InquiriesIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Inquires</span></NavLink>
                                    </ListItem>

                                </List>
                            </Collapse>
                            :
                            ''
                        }

                        <div className={classes.menuPoper}>

                            <Popover
                                id={id}
                                open={isPopoverOpen4}
                                anchorEl={anchorE4}
                                onClose={handlePopoverClose4}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <List component="div" disablePadding>
                                    <ListItem className={classes.popperSub + " " + "disabledEvent"}>
                                        <NavLink to="/app/damage&Repair"><img src={DamageAndRepairIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Damage and Repairs</span></NavLink>
                                    </ListItem>
                                    <ListItem className={classes.popperSub + " " + "disabledEvent"}>
                                        <NavLink to="/app/addressBook"><img src={AddressbookIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Address Book</span></NavLink>
                                    </ListItem>


                                    <ListItem className={classes.popperSub + " " + "disabledEvent"}>
                                        <NavLink to="/app/addressBook"><img src={InventionsIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Inventions</span></NavLink>
                                    </ListItem>


                                    <ListItem className={classes.popperSub}>
                                        <NavLink to="/app/subscribers"><img src={SubscribersIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Subscribers</span></NavLink>
                                    </ListItem>

                                    <ListItem className={classes.popperSub + " " + "disabledEvent"}>
                                        <NavLink to="/app/addressBook"><img src={InquiriesIconBlue} style={{ width: '23px' }} /> <span className={classes.MenuLabel}>Inquires</span></NavLink>
                                    </ListItem>

                                </List>
                            </Popover>
                        </div>

                    </div>





                </List>
            </Drawer>


            <main className="theme-container">


                <Suspense fallback={<Box style={{ display: 'block', width: '100%', textAlign: "center", paddingTop: "10%" }}><CircularProgress /></Box>}>
                    <Switch>

                        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />

                        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />

                        <Route path="/app/dashboard" component={Dashboard} />
                        <Route path="/app/PostPaidVerify" component={PostpaidWireless} />
                        <Route path="/app/orderAndTracking" component={OrderAndTracking} />
                        <Route path="/app/domesticTracking" render={() => <DomesticTracking trackingType={'domesticTracking'} />} />
                        <Route path="/app/internationalTracking" render={() => <DomesticTracking trackingType={'internationalTracking'} />} />
                        <Route path="/app/returnLabel" render={() => <DomesticTracking trackingType={'returnLabel'} />} />

                        <Route path="/app/backend" component={OrderAndTracking} />

                        <Route path="/app/figgerACP" component={figgerACP} />
                        <Route path="/app/ACPIndividuals" component={ACPIndividuals} />
                        <Route path="/app/ACPOrganization" component={ACPOrganization} />


                        <Route path="/app/packageExpiration" component={PackageExpiration} />

                        <Route path="/app/shop" component={OrderAndTracking} />
                        <Route path="/app/inventory" component={Inventory} />
                        <Route path="/app/order" component={Order} />
                        <Route path="/app/orderList" component={OrderList} />
                        <Route path="/app/DealsAndDiscounts" component={DealsDiscounts} />
                        <Route path="/app/customerList" component={CustomerList} />
                        <Route path="/app/Payment" component={Payment} />
                        <Route path="/app/protectionPlans" component={ProtectionPlans} />
                        <Route path="/app/shopDashboard" component={ShopDashboard} />
 

                        <Route path="/app/invention" component={OrderAndTracking} />
                        <Route path="/app/reviews" component={Reviews} />
                        <Route path="/app/subscribers" component={Subscriber} />
                        <Route path="/app/communication" component={Communication} />
                        <Route path="/app/inquires" component={OrderAndTracking} />
                        <Route path="/app/businessInquiries" component={BusinessInquiries} />
                        <Route path="/app/portANumber" component={NewRegistrationDialog} />
                        <Route path="/app/corporateManagement" component={CorporateManagement} />

                        <Route path="/app/office" component={OrderAndTracking} />
                        <Route path="/app/cellularUsageReport" component={CellularUsageReport} />
                        <Route path="/app/addressBook" component={AddressBookPage} />
                        <Route path="/app/damage&Repair" component={DamageRepair} />
                        <Route path="/app/InventionDisclousure" component={InventionDisclousure} />
                        <Route path="/app/InventionDisclousureForms" component={InventionDisclousureForms} />
                 

                        <Route path="/app/prepaid" render={() => <PrepaidWireless isPostpaid={false} />} />
                        <Route path="/app/postpaid" render={() => <PrepaidWireless isPostpaid={true} />} />

                        <Route path="/app/add-new-sim" component={AddNewSim} />
                        <Route path="/app/profile" component={Profile} />


                    </Switch>
                </Suspense>
            </main>

            <ActionDialog
                type={actiondialogState.type}
                message={actiondialogState.message}
                actiondialogOpenClose={actiondialogState.showHide}
                onSubmit={actiondialogState.onClickOk}
                onCancel={() =>
                    setActionDialogState(prevState => ({
                        ...prevState, showHide: false
                    }))
                }
                onClose={() => setActionDialogState(prevState => ({
                    ...prevState, showHide: false
                }))

                }
            />

        </div>

    );
}
