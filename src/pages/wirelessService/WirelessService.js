import React, { useState } from "react";
import {
    Badge,
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Select, Tab, Tabs, TextField, Typography
} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SearchOutlined } from "@material-ui/icons";
import SearchGrid from "./../../components/table/SearchGrid";

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

import useStyles from "./styles";
import { red } from "@material-ui/core/colors";
import { PostDataAPI } from '../../Services/APIService';
import { formatDate } from '../../../src/components/Common/Extensions';

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

function WirelessService() {
    const classes = useStyles();
    const [tabvalue, setTabValue] = useState(0);

    const [customerTabValue, setCustomerTabValue] = useState(0);
    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
    };

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


    const [accountCardOpen, setAccountCardOpen] = useState(true);
    const [wirelessCardOpen, setWirelessCardOpen] = useState(true);
    const [showSearch, setshowSearch] = useState(false);

    const showHideSearch = () => {
        if(showSearch == false) {
            setshowSearch(true)
        } else {
            setshowSearch(false)
        }
      
    }
    
    const [state, setState] = useState({ accounts: "" });
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



    const [selectedCustomer, setSelectedCustomer] = useState({});
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
        var obj = { AccountNumber: accountNo.trim(), MDN: '', isPrepaid: true, includeDisconnectedLines: true };
        PostDataAPI("customer/getCustomerDetail", obj).then((result) => {
            if (result.success && result.data != null) {
                var existingList = customerData;
                var obj = { number: accountNo, name: 'New Customer', active: true, img: Avatarprofile};
                existingList.unshift(obj);
                setCustomerData(existingList);
                setSelectedCustomer(result.data);
            }
        })
    }
    return (
        <>
            <div className={classes.appBarSpacer} />

            <div className={classes.header}>
                <Breadcrumbs separator=">" aria-label="breadcrumb" className={classes.customBreadcrumbs}>
                    <Link color="inherit" className="no-link" >
                        Postpaid
                    </Link>
                    <Link color="inherit" className="no-link" >
                        Wireless services
                    </Link>
                    {/* <Typography color="textPrimary">Breadcrumb</Typography> */}
                </Breadcrumbs>
                <div className={classes.rightHeader}>
                    {/* <TextField
                        size="small"
                        id="accounts"
                        name="accounts"
                        label="SEARCH ACCOUNTS"
                        value={state.accounts}
                        InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                        variant="outlined"
                        onChange={handleChange}
                        className={classes.baseInput}
                    />
                    <FormControlLabel
                        className={classes.checkBoxFormLabel}
                        control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                                className={classes.checkBoxBtn}
                            />
                        }
                        label="Include Inactive Accounts"
                    /> */}
                </div>
            </div>

            <Grid row container style={{ padding: '5px 25px 5px 5px', alignItems: 'center' }}>
                <Grid item lg={9} xs={12}>
                    <h1 className={classes.recentHeading}>Recent Customers</h1>
                </Grid>
                <Grid item lg={3} xs={12}>
                    <TextField
                        size="small"
                        id="accountNumber"
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
                                    <Typography className={classes.accountCardMember}>Customer : {selectedCustomer.accountNumber} <span className={classes.accountCardOrganisationName}>{selectedCustomer.fullName}</span></Typography>

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
                                        {/*{*/}
                                        {/*    accountList1.map((account, index) => {*/}
                                        <li>
                                            <Typography className={classes.accountLabel}>Account #:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.accountNumber}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Date Created:</Typography>
                                            <Typography className={classes.accountValue}>{formatDate(selectedCustomer.dateCreated)}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Billing Cycle:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.billingCycle}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Total Monthly Charges:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.minimumBilling}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Payment Method:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.billingMethod}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Last Payment:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Past Due Balance:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Email:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.email}</Typography>
                                        </li>
                                    </ul>
                                </div>
                                <div className={classes.accountSection} style={{ alignSelf: 'baseline' }}>
                                    <ul className={classes.accountList}>
                                        <li>
                                            <Typography className={classes.accountLabel}>Original Account # :</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.oldAccountNumber}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Sale Rep:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.salesRep}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Billing Type:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.billingType}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Next Billing Date:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Card # (Last Four):</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Total Balance:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                        <li>
                                            <Typography className={classes.accountLabel}>Billing Phone#:</Typography>
                                            <Typography className={classes.accountValue}>{selectedCustomer.dateCreated}</Typography>
                                        </li>
                                    </ul>

                                </div>
                                <div className={classes.accountSubCardSection}>
                                    <div className={classes.accountHomeSection}>
                                        <Typography className={classes.accountHomeTitle}>Home</Typography>
                                        <Typography className={classes.accountHomeSubTitle}>{selectedCustomer.companyName}</Typography>
                                        <Typography className={classes.accountHomeAddress}>700 8th Ave West Plametto, FL 34221</Typography>
                                        <Typography className={classes.accountHomeAddress}>Contact:</Typography>
                                    </div>
                                    <div className={classes.accountBillingSection}>
                                        <Typography className={classes.accountHomeTitle}>Shipping/Billing</Typography>
                                        <Typography className={classes.accountHomeSubTitle}>{selectedCustomer.shipCompanyName}</Typography>
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
                                                {showSearch ? <TextField
                                                    size="small"
                                                    id="accounts"
                                                    name="accounts"
                                                    label="Search Customer"
                                                    placeholder="Search Customer"
                                                    value={state.accounts}
                                                    InputProps={{ endAdornment: <InputAdornment position="start"></InputAdornment> }}
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    className={classes.baseInput}
                                                />
                                                    : ''}

                                                <SearchOutlined className={classes.cardSearch} onClick={() => showHideSearch()} />

                                                {/* <Button
                                                    size="small"
                                                    className={classes.closeButton}
                                                    // startIcon={<ExpandLessIcon />}
                                                    startIcon={wirelessCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    onClick={() => setWirelessCardOpen(!wirelessCardOpen)}
                                                >
                                                </Button> */}
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


                                            <SearchGrid />

                                        </div>
                                    </div>
                                </Collapse>
                            </Grid>
                            : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={1} className={classes.tabPan}>
                        {tabvalue === 1 ?
                            <Grid container>
                                <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>
                                    <div className={classes.accountPaper} >
                                        <div className={classes.accountCardHeader}>
                                            <div className={classes.accountCardHeaderTitle}>
                                                <Typography className={classes.accountCardTitle}>Packages</Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    size="small"
                                                    className={classes.closeButton}
                                                    // startIcon={<ExpandLessIcon />}
                                                    startIcon={wirelessCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    onClick={() => setWirelessCardOpen(!wirelessCardOpen)}
                                                >
                                                </Button>
                                            </div>
                                        </div>

                                        <Grid container row style={{ marginBottom: '15px', alignItems: 'flex-end' }}>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <TextField
                                                    size="small"
                                                    id="accounts"
                                                    name="accounts"
                                                    label="Search"
                                                    placeholder="Search"
                                                    value={state.accounts}
                                                    InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    className={classes.baseInput}
                                                />
                                            </Grid>

                                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ marginLeft: '10px' }}>
                                                <FormControl variant="outlined" className={classes.customFormControl}>
                                                    <InputLabel htmlFor="status" className={classes.label}>Status</InputLabel>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="status"
                                                        onChange={handleChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        <option aria-label="Select Status" />
                                                        <option value={10}>Active</option>
                                                        <option value={20}>In-Active</option>
                                                        <option value={30}>All</option>
                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                        </Grid>

                                        <div className={classes.tabContainer}>


                                            <SearchGrid />

                                        </div>
                                    </div>
                                </Collapse>
                            </Grid>
                            : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={2} className={classes.tabPan}>
                        {tabvalue === 2 ?
                            <Grid container>
                                <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>
                                    <div className={classes.accountPaper} >
                                        <div className={classes.accountCardHeader}>
                                            <div className={classes.accountCardHeaderTitle}>
                                                <Typography className={classes.accountCardTitle}>Charges</Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    size="small"
                                                    className={classes.closeButton}
                                                    // startIcon={<ExpandLessIcon />}
                                                    startIcon={wirelessCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    onClick={() => setWirelessCardOpen(!wirelessCardOpen)}
                                                >
                                                </Button>
                                            </div>
                                        </div>

                                        <Grid container row style={{ marginBottom: '15px', alignItems: 'flex-end' }}>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <TextField
                                                    size="small"
                                                    id="accounts"
                                                    name="accounts"
                                                    label="Search"
                                                    placeholder="Search"
                                                    value={state.accounts}
                                                    InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    className={classes.baseInput}
                                                />
                                            </Grid>

                                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ marginLeft: '10px' }}>
                                                <FormControl variant="outlined" className={classes.customFormControl}>
                                                    <InputLabel htmlFor="status" className={classes.label}>Status</InputLabel>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="status"
                                                        onChange={handleChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        <option aria-label="Select Status" />
                                                        <option value={10}>Active</option>
                                                        <option value={20}>In-Active</option>
                                                        <option value={30}>All</option>
                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                        </Grid>

                                        <div className={classes.tabContainer}>


                                            <SearchGrid />

                                        </div>
                                    </div>
                                </Collapse>
                            </Grid> : null}
                    </TabPanel>
                    <TabPanel value={tabvalue} index={3} className={classes.tabPan}>
                        {tabvalue === 3 ?
                            <Grid container>
                                <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>
                                    <div className={classes.accountPaper} >
                                        <div className={classes.accountCardHeader}>
                                            <div className={classes.accountCardHeaderTitle}>
                                                <Typography className={classes.accountCardTitle}> Customer Notes </Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    size="small"
                                                    className={classes.closeButton}
                                                    // startIcon={<ExpandLessIcon />}
                                                    startIcon={wirelessCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    onClick={() => setWirelessCardOpen(!wirelessCardOpen)}
                                                >
                                                </Button>
                                            </div>
                                        </div>

                                        <Grid container row style={{ marginBottom: '15px', alignItems: 'flex-end' }}>

                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <TextField
                                                    size="small"
                                                    id="accounts"
                                                    name="accounts"
                                                    label="Search"
                                                    placeholder="Search"
                                                    value={state.accounts}
                                                    InputProps={{ endAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    className={classes.baseInput}
                                                />
                                            </Grid>

                                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ marginLeft: '10px' }}>
                                                <FormControl variant="outlined" className={classes.customFormControl}>
                                                    <InputLabel htmlFor="status" className={classes.label}>Status</InputLabel>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="status"
                                                        onChange={handleChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        <option aria-label="Select Status" />
                                                        <option value={10}>Active</option>
                                                        <option value={20}>In-Active</option>
                                                        <option value={30}>All</option>
                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                        </Grid>

                                        <div className={classes.tabContainer}>


                                            <SearchGrid />

                                        </div>
                                    </div>
                                </Collapse>
                            </Grid> : null}
                    </TabPanel>

                </Grid>


            </Grid ></>
    )
}
export default WirelessService;