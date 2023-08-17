import React, { useState, useEffect } from "react";
import {
    Badge,
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography,
    FormHelperText
} from "@material-ui/core";
import { Row } from 'antd';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SearchOutlined } from "@material-ui/icons";
import SearchGrid from "../../components/table/SearchGrid";
import { InputBaseField } from "../../components/InputField/InputField";

import { CustomBtn } from '../../components/UiElements/UiElements';

import { withRouter, useHistory } from "react-router-dom";

import WarningIcon from './../../assets/img/icons/warning.svg';

import Avatarprofile from './../../assets/img/avatarprofile.svg';
import AvatarGirl from './../../assets/img/avatarGirl.svg';

import Hotline from './../../assets/img/status/Hotline.svg';
import ActiveIcon from './../../assets/img/status/Active.svg';
import Inactive from './../../assets/img/status/Inactive.svg';
import Rejected from './../../assets/img/status/Rejected.svg';
import Suspended from './../../assets/img/status/Suspended.svg';
import PortInCancel from './../../assets/img/status/Port-In-Cancel.svg';
import Disconnected from './../../assets/img/status/Disconnected.svg';
import FiggLogo from "./../../assets/img/LogoBlue.svg";

import LineDetailsDialog from "./../prepaid/components/lineDetails/LineDetails";
import ChangePhoneNumberDialog from "./../prepaid/components/changePhoneNumber/ChangePhoneNumber";
import UsageDetailsDialog from "./../prepaid/components/usageDetails/UsageDetails";

import useStyles from "./styles";
import { red } from "@material-ui/core/colors";
import { PostDataAPI } from '../../Services/APIService';

import NewRegistrationDialog from "./components/newRegistrationDialog/NewRegistrationDialog";
import { GetUserInfo } from '../../Services/GetUserInfo';
import DialogLoader from '../../components/Loader/DialogLoader';
import { handleNumberKeyPress } from '../../../src/components/Common/Extensions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PostpaidWireless() {
    const classes = useStyles();
    const [tabvalue, setTabValue] = useState(0);
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [lineDetailsDialogState, setLineDetailsDialogState] = useState(false);
    const [changePhoneNumberDialogState, setChangePhoneNumberDialogState] = useState(false);
    const [userDetailsDialogState, setUserDetailsDialogState] = useState(false);
    const [registrationDialogState, setRegistrationDialogState] = useState(false);
    const [isPinSend, setIsPinSend] = useState(false);
    const [isPinNotVerified, setIsPinNotVerified] = useState(false);
    const [pinVerificationErrorMessage, setPinVerificationErrorMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        errorPIN: false
    })
    let history = useHistory();
    const [customerTabValue, setCustomerTabValue] = useState(0);

    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onTabChange = (e, newValue) => {

        setTabValue(newValue);
    };

    const handleActionClick = (item) => {
        if (item.key === "lineDetails") {
            setLineDetailsDialogState(true);
        } else if (item.key === "usage") {
            setUserDetailsDialogState(true);
        } else if (item.key === "changePhoneNumber") {
            setChangePhoneNumberDialogState(true);
        }
        else if (item.key === "disconnect") {
            setChangePhoneNumberDialogState(true);
        }

    }

    const customerTabChange = (e, newValue) => {

        setCustomerTabValue(newValue);
    }
    const [customerData, setCustomerData] = useState([
        { number: '15418535', name: 'Ryan Braswell', active: true, img: Avatarprofile },
        { number: '25869856', name: 'John Doe', active: false, img: Avatarprofile },
        { number: '23884856', name: 'Sarah Smith', active: false, img: AvatarGirl },
        { number: '23123546', name: 'Alex John', active: false, img: Avatarprofile },
        { number: '48886868', name: 'Lara Kraft', active: false, img: AvatarGirl },
        { number: '75585695', name: 'James Rambo', active: false, img: Avatarprofile },
        { number: '23884856', name: 'Sarah Smith', active: false, img: AvatarGirl }
    ]);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    const [accountCardOpen, setAccountCardOpen] = useState(true);
    const [wirelessCardOpen, setWirelessCardOpen] = useState(true);
    const [showSearch, setshowSearch] = useState(false);

    const showHideSearch = () => {
        if (showSearch == false) {
            setshowSearch(true)
        } else {
            setshowSearch(false)
        }

    }

    const [state, setState] = useState({ accounts: "", PIN: '' });
    const accountList1 = [
        { label: 'Account # :', value: '101116356511838' },
        { label: 'Date Created:', value: '1/22/2016' },
        { label: 'Billing Cycle', value: '1/22/2016' },
        { label: 'Total Monthly Charges:', value: '1/22/2016' },
        { label: 'Payment Method:', value: 'Mail in Payment' },
        { label: 'Last Payment:', value: '1/22/2022' },
        { label: 'Past Due Balance:', value: '$2533' },
        { label: 'Email:', value: 'Freddie@figgershealth.com' },
    ];
    const accountList2 = [
        { label: 'Original Account # :', value: '101116356511838' },
        { label: 'Sale Rep:', value: '33' },
        { label: 'Billing Type:', value: 'Standard Billing' },
        { label: 'Next Billing Date:', value: '1/17/2023' },
        { label: 'Card # (Last Four):', value: '7654' },
        { label: 'Total Balance:', value: '$23,400.00' },
        { label: 'Billing Phone#:', value: '941-776-6400' }
    ];

    const statusCheckbox = [
        {
            value: '102',
            status: 'Active',
            icon: ActiveIcon,
        },
        {
            value: '102',
            status: 'Inactive',
            icon: Inactive,
        },
        {
            value: '102',
            status: 'Suspended',
            icon: Suspended,
        },
        {
            value: '102',
            status: 'Disconnected',
            icon: Disconnected,
        },
        {
            value: '102',
            status: 'Hotline',
            icon: Hotline,
        },
        {
            value: '102',
            status: 'Rejected',
            icon: Rejected,
        },
        {
            value: '102',
            status: 'Port-In-Cancel',
            icon: PortInCancel,
        }
    ]

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    }
    const handleCustomerSearch = (e) => {
        const { name, value } = e.target;

        if (e.charCode == 13) {
            getCustomerDetail(value);

        }

        //setState((prevState) => ({
        //    ...prevState,
        //    [name]: value,

        //}));
    }
    const getCustomerDetail = (accountNo) => {
        var obj = { AccountNumber: accountNo.trim(), MDN: '', isPrepaid: false, includeDisconnectedLines: true };
        PostDataAPI("customer/getCustomerDetail", obj).then((result) => {
            if (result.success && result.data != null) {
                var existingList = customerData;
                var obj = { number: accountNo, name: 'New Customer', active: true, img: Avatarprofile };
                existingList.unshift(obj);
                setCustomerData(existingList);
                setSelectedCustomer(result.data.objCustomerInfo);
            }
        })
    }

    const validatePinCode = () => {
        let errorList = [];
        if (state.PIN == '') {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPIN: true
            }));

            errorList.push(true);

        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPIN: false
            }));
        }
        if (errorList.length < 1) {
            var obj = { PinCode: state.PIN, UserId: userID };
            setIsLoading(true);
            PostDataAPI("auth/validatePinCode", obj).then((result) => {
                setIsLoading(false)
                if (result.success) {
                    setIsVerified(true);
                    sessionStorage.setItem('isPostPaidPinVerified', true);
                    history.push({
                        pathname: '/app/postpaid',
                        state: { isPostpaid: true }
                    });

                    //593029
                } else {
                    setPinVerificationErrorMessage(result.message);
                    setIsPinSend(false)
                    setIsPinNotVerified(true);

                }
            })
        }

    }

    const sendPinCode = () => {
        setIsLoading(true);
        setIsPinNotVerified(false);
        var obj = { UserId: userID };
        PostDataAPI("auth/sendPostPaidAccessPinCode", obj).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setIsPinSend(true);
            } else {
                //sms failed
            }
        })
    }

    useEffect(() => {
        if (sessionStorage.getItem('isPostPaidPinVerified')) {
            history.push({
                pathname: '/app/postpaid',
                state: { isPostpaid: true }
            });
        }
        //else {
        //    sendPinCode();
        //}
    }, []);
    return (
        <>
            <div className={classes.appBarSpacer} />

            {isVerified ?
                <div>

                    <div className={classes.header}>
                        <Breadcrumbs separator=">" aria-label="breadcrumb" className={classes.customBreadcrumbs}>

                            <Link color="inherit" className="no-link" >
                                Postpaid
                            </Link>


                            <Link color="inherit" className="no-link" >
                                Wireless services
                            </Link>

                        </Breadcrumbs>

                    </div>

                    <Grid row container style={{ padding: '5px 25px 5px 5px', alignItems: 'center' }}>
                        <Grid item lg={9} xs={12}>
                            <h1 className={classes.recentHeading}>Recent Customers</h1>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <TextField
                                size="small"
                                id="accouaccountNumbernts"
                                name="accountNumber"
                                label="Search Customer"
                                placeholder="Search Customer"
                                value={state.accountNumber}
                                InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                variant="outlined"
                                onChange={handleChange}
                                onKeyPress={handleCustomerSearch}
                                className={classes.baseInput}
                            />
                        </Grid>

                    </Grid>

                    <Grid row container>
                        <Tabs
                            value={customerTabValue}
                            onChange={customerTabChange}
                            aria-label="icon tabs example"
                            className={classes.customerTabs}
                            variant="scrollable"
                            scrollButtons={true}
                            allowScrollButtonsMobile
                        >
                            {customerData.map((customer, index) => (
                                <>
                                    <Tab className={customerTabValue === index ? "activeBtn" : ''} label={<>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div className="user-profile-dashbaord" style={{ backgroundImage: 'URL(' + customer.img + ')' }}></div>
                                            <div className={classes.customerInfo}>
                                                <Typography className={classes.customerNumber}>{customer.number}</Typography>
                                                <Typography className={classes.customerName}>{customer.name}</Typography>
                                            </div>
                                        </div>
                                    </>} {...a11yProps(index)} />


                                </>
                            ))
                            }

                        </Tabs>
                        {/* <TabPanel value={customerTabValue} index={0} className={classes.tabPan}>
                                {customerTabValue === 0 ?
                                    <div>test</div>
                                    : null}
                            </TabPanel>
                            <TabPanel value={customerTabValue} index={1} className={classes.tabPan}>
                                {customerTabValue === 1 ?
                                    <div>test2</div>
                                    : null}
                            </TabPanel> */}

                    </Grid>
                    <Grid className={classes.container}>

                        <Grid container>

                            <Collapse in={accountCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>
                                <div className={classes.accountPaper} >
                                    <div className={classes.accountCardHeader}>
                                        <div className={classes.accountCardHeaderTitle}>
                                            <Typography className={classes.accountCardMember}>Customer : 15418535 <span className={classes.accountCardOrganisationName}>Ryan Braswell</span></Typography>

                                        </div>
                                        <div className={classes.flexBtn}>
                                            <IconButton color="inherit">
                                                <Badge badgeContent={12} color="secondary">
                                                    <img src={WarningIcon} alt="alt" />
                                                </Badge>
                                            </IconButton>
                                            <Button
                                                size="small"
                                                className={classes.closeButton}
                                                startIcon={accountCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                onClick={() => setAccountCardOpen(!accountCardOpen)}
                                            >
                                            </Button>
                                        </div>

                                    </div>

                                    <div className={classes.accountCardContainer} style={{ display: window.isMobileView || window.isIpadView ? 'block' : '' }}>
                                        <div className={classes.accountSection}>
                                            <ul className={classes.accountList}>
                                                {
                                                    accountList1.map((account, index) => {
                                                        return
                                                        <li>
                                                            <Typography className={classes.accountLabel}>{account.label}</Typography>
                                                            <Typography className={classes.accountValue}>{account.value}</Typography>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className={classes.accountSection} style={{ alignSelf: 'baseline' }}>
                                            <ul className={classes.accountList}>
                                                {
                                                    accountList2.map((account, index) => {
                                                        return <li>
                                                            <Typography className={classes.accountLabel}>{account.label}</Typography>
                                                            <Typography className={classes.accountValue}>{account.value}</Typography>
                                                        </li>
                                                    })
                                                }
                                            </ul>

                                        </div>
                                        <div className={classes.accountSubCardSection}>
                                            <div className={classes.accountHomeSection}>
                                                <Typography className={classes.accountHomeTitle}>Home</Typography>
                                                <Typography className={classes.accountHomeSubTitle}>MCR Health Services Inc.</Typography>
                                                <Typography className={classes.accountHomeAddress}>700 8th Ave West Plametto, FL 34221</Typography>
                                                <Typography className={classes.accountHomeAddress}>Contact:</Typography>
                                            </div>
                                            <div className={classes.accountBillingSection}>
                                                <Typography className={classes.accountHomeTitle}>Shipping/Billing</Typography>
                                                <Typography className={classes.accountHomeSubTitle}>MCR Health Services Inc</Typography>
                                                <Typography className={classes.accountHomeAddress}>700 8th Ave West Plametto, FL 34221</Typography>
                                                <Typography className={classes.accountHomeAddress}>Contact:</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>

                            <div className={classes.tabsSection}>
                                <Tabs

                                    value={tabvalue}
                                    onChange={onTabChange}
                                    aria-label="icon tabs example"
                                    variant="scrollable"
                                    scrollButtons={true}
                                    className={classes.Htabs}
                                    allowScrollButtonsMobile
                                >
                                    <Tab label="Wireless" aria-label="Wireless" {...a11yProps(0)} />
                                    <Tab label="Packages" aria-label="Packages" {...a11yProps(1)} />
                                    <Tab label="Charges" aria-label="Charges" {...a11yProps(2)} />
                                    <Tab label="Customer Notes" aria-label="Customer Notes" {...a11yProps(3)} />
                                </Tabs>
                            </div>
                            <TabPanel value={tabvalue} index={0} className={classes.tabPan}>
                                {tabvalue === 0 ?
                                    <Grid container>
                                        <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>


                                            <div className={classes.accountPaper} >
                                                <div className={classes.accountCardHeader}>

                                                    <div className={classes.accountCardHeaderTitle}>
                                                        <Typography className={classes.accountCardTitle}>Wireless</Typography>
                                                    </div>

                                                    <div className={classes.cardHeaderRight}>

                                                        <TextField
                                                            size="small"
                                                            id="accounts"
                                                            name="accounts"
                                                            label="Search Customer"
                                                            placeholder="Search Customer"
                                                            value={state.accounts}
                                                            InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                                            variant="outlined"
                                                            onChange={handleChange}
                                                            className={classes.baseInput}
                                                        />

                                                    </div>

                                                </div>

                                                <Grid container row>
                                                    <div className={classes.statusBoxContainer}>

                                                        {statusCheckbox.map((item, i) => (
                                                            <>
                                                                <FormControlLabel
                                                                    className={classes.checkBoxFormLabel}
                                                                    control={
                                                                        <Checkbox
                                                                            name="checkedB"
                                                                            color="primary"
                                                                            className={classes.checkBoxBtn}
                                                                        />
                                                                    }
                                                                    label={<>
                                                                        <div className={item.status == "Active" ? "statusBoxes Active" :
                                                                            item.status == "Inactive" ? "statusBoxes Inactive" :
                                                                                item.status == "Suspended" ? "statusBoxes Suspended" :
                                                                                    item.status == "Disconnected" ? "statusBoxes Disconnected" :
                                                                                        item.status == "Hotline" ? "statusBoxes Hotline" :
                                                                                            item.status == "Rejected" ? "statusBoxes Rejected" :
                                                                                                item.status == "Port-In-Cancel" ? "statusBoxes Port-In-Cancel" : ''


                                                                        }>
                                                                            <div className={classes.statusBoxContent}>
                                                                                <h5>{item.status}</h5>
                                                                                <h2>{item.value}</h2>
                                                                            </div>
                                                                            <img src={item.icon} />
                                                                        </div>
                                                                    </>}
                                                                />
                                                            </>
                                                        ))}

                                                    </div>

                                                </Grid>

                                                <div className={classes.tabContainer}>

                                                    <SearchGrid columns="PostpaidWireless" onActionClick={handleActionClick} />
                                                </div>
                                            </div>
                                        </Collapse>
                                    </Grid>
                                    : null}
                            </TabPanel>
                            <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                                {tabvalue === 1 ?
                                    <Grid container>

                                    </Grid>
                                    : null}
                            </TabPanel>
                            <TabPanel value={tabvalue} index={2} className={classes.tabPan}>
                                {tabvalue === 2 ?
                                    <Grid container>

                                    </Grid> : null}
                            </TabPanel>
                            <TabPanel value={tabvalue} index={3} className={classes.tabPan}>
                                {tabvalue === 3 ?
                                    <Grid container>

                                    </Grid> : null}
                            </TabPanel>

                        </Grid>


                    </Grid >

                </div> :
                <>
                    <div className={classes.loaderParent}>
                        {isLoading ? <DialogLoader position="fixed"></DialogLoader> : ''}
                    </div>
                    <div className={classes.authorizePin}>

                        <Grid row>
                            <img src={FiggLogo} />
                        </Grid>

                        <Grid row>
                            <p>Please enter your authorization PIN</p>
                        </Grid>

                        <Grid row className={classes.pinButton}>
                            <InputBaseField
                                name="PIN"
                                placeholder="PIN"
                                value={state.PIN}
                                onChange={handleChange}
                                onKeyPress={(e) => handleNumberKeyPress(e)}
                                type="text"
                                MaxLength={6}
                            />
                            {errorMessages.errorPIN && state.PIN == '' ? (<FormHelperText style={{ color: "red", marginTop: '15px' }} >
                                Enter PIN code
                            </FormHelperText>) : ('')}

                        </Grid>

                        <Grid row className={classes.pinButton}>
                            {isPinNotVerified && !(errorMessages.errorPIN && state.PIN == '') ? (<FormHelperText style={{ color: "red", marginTop: '15px' }} >
                                {pinVerificationErrorMessage}
                            </FormHelperText>) : ('')}

                        </Grid>

                        <Grid row>
                            {isPinSend ? <p className={classes.sendPin}>Your PIN Code has been sent to admin.</p> : ''}
                        </Grid>

                        <Grid row>
                            {/* <Typography className={classes.accountLabel} onClick={sendPinCode}>Resend PIN?</Typography>*/}
                            <p className={classes.sendPin} onClick={sendPinCode}>Request a PIN</p>
                        </Grid>


                        <Grid row>
                            <CustomBtn
                                id="save"
                                btnType="primary"
                                htmlType="submit"
                                shape="round"
                                size="default"
                                onClick={validatePinCode}
                            > Submit</CustomBtn>
                        </Grid>






                    </div>

                </>
            }

            {lineDetailsDialogState ? <LineDetailsDialog
                dialogOpenClose={lineDetailsDialogState}
                handleClose={() => setLineDetailsDialogState(false)}
            /> : ''}
            {changePhoneNumberDialogState?<ChangePhoneNumberDialog
                dialogOpenClose={changePhoneNumberDialogState}
                handleClose={() => setChangePhoneNumberDialogState(false)}
            />:''}
            {userDetailsDialogState ? <UsageDetailsDialog
                dialogOpenClose={userDetailsDialogState}
                handleClose={() => setUserDetailsDialogState(false)}
            /> : null}
            {registrationDialogState &&
                <NewRegistrationDialog
                    dialogOpenClose={registrationDialogState}
                    handleClose={() => setRegistrationDialogState(false)}
                />
            }

        </>
    )
}
export default PostpaidWireless;