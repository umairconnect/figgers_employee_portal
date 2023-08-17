import React, { useState, useEffect } from "react";
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
import { SearchOutlined, Update } from "@material-ui/icons";
import SearchGrid from "./../../components/table/SearchGrid";
import ClearIcon from '@material-ui/icons/Clear';
import EmptyGrid from './../../assets/img/emptyGrid.svg';
import WarningIcon from './../../assets/img/icons/warning.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Table, Empty, Dropdown, message, Menu } from 'antd';

import Avatarprofile from './../../assets/img/avatarprofile.svg';
import AvatarGirl from './../../assets/img/avatarGirl.svg';
import ActionIcon from './../../assets/img/action/action.svg';
import activeInactive from './../../assets/img/icons/activeInactive.svg';
import USBIcon from './../../assets/img/icons/usb.svg';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewActiveLog from './../../assets/img/icons/activeLog.svg'
import useStyles from "./styles";
import { red } from "@material-ui/core/colors";
import LineDetailsDialog from "./components/lineDetails/LineDetails";
import ChangePhoneNumberDialog from "./components/changePhoneNumber/ChangePhoneNumber";
import UsageDetailsDialog from "./components/usageDetails/UsageDetails";
import SwapSim from "./components/swapsim/SwapSim";
import CallForward from "./components/callForward/CallForward";
import MonthlyUsageSummary from "./components/monthlyUsageSummary/MonthlyUsageSummary";
import ChangeLineName from "./components/changeLineName/ChangeLineName";
import CustomNotesDialog from './components/customNotes/CustomNotes.js';
import ViewCustomerNotes from './components/viewCustomerNotes/viewCustomerNotes.js';
import ViewActivityLog from './components/viewLog/viewActivityLog';
import ActivateNow from './components/activateNow/ActivateNow';
import SendInvite from './components/sendInvite/SendInvite';
import ActiveNumber from './components/activeNumber/ActiveNumber';
import SearchResultDialog from './components/searchResultDialog/SearchResultDialog';
import NewRegistrationDialog from "../postpaid/components/newRegistrationDialog/NewRegistrationDialog";
import { PostDataAPI } from '../../Services/APIService';
import { ActionDialog } from "./../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "./../../components/Message/Alert";
import { formatDate, formateMdnNumber, numberDisplay, formatDateTime } from '../../../src/components/Common/Extensions';
import Loader from './../../components/Loader/Loader';
import { GetCustomerData } from './../../components/Common/GetCustomerData';
import BreadcrumComponent from "../../components/BreadCrums/breadcrums";
import Tooltip from '@material-ui/core/Tooltip';
import Chat from './../communication/components/chat/Chat';
import UserImage from './../../assets/img/profileImage.png';
import Edit from './../../assets/img/action/edit.svg'

import Hotline from './../../assets/img/status/Hotline.svg';
import ActiveIcon from './../../assets/img/status/Active.svg';
import Inactive from './../../assets/img/status/Inactive.svg';
import Rejected from './../../assets/img/status/Rejected.svg';
import Suspended from './../../assets/img/status/Suspended.svg';
import PortInCancel from './../../assets/img/status/Port-In-Cancel.svg';
import Disconnected from './../../assets/img/status/Disconnected.svg';
import DollarIcon from './../../assets/img/icons/dollar.svg';
import LinePortDialog from "./components/linePortDialog/LinePortDialog";
import SettingsIcon from './../../assets/img/icons/setting.svg';

import { GetUserInfo } from '../../Services/GetUserInfo';

import { CustomBtn } from './../../components/UiElements/UiElements';

import NoRecord from "./../../components/NoRecord/NoRecord";
import ChangeShippingAddress from './components/changeShippingAddress/ChangeShippingAddress';
import AccountSettings from './components/accountSettings/AccountSettings';

import { useLocation, useParams, useHistory } from "react-router-dom";
import { handleNumberKeyPress } from "../../../src/components/Common/Extensions";
import RechargeDialog from "./components/recharge/RechargeDialog";
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

function PrepaidWireless({ isPostpaid, isPinCodeVerified, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    let history = useHistory();
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [accountNumber, setAccountNumber] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [userName, setUserName] = useState('');
    const [lineUserName, setLineUserName] = useState('');
    const [mdnNumber, setMdnNumber] = useState('');
    const [lineDetails, setLineDetails] = useState({});
    const [emailAddress, setEmailAddress] = useState('');
    const [noteLevel, setNoteLevel] = useState('LineLevel');
    const [loadActivityLogType, setLogActivityLogType] = useState('');
    const [isPrepaid] = useState(!isPostpaid);

    const [searchResultDialog, setSearchResultDialog] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [tabvalue, setTabValue] = useState(0);
    const [lineDetailsDialogState, setLineDetailsDialogState] = useState(false);
    const [changePhoneNumberDialogState, setChangePhoneNumberDialogState] = useState(false);
    const [userDetailsDialogState, setUserDetailsDialogState] = useState(false);
    const [userSwapSim, setUserSwapSim] = useState(false);
    const [userCallForward, setUserCallForward] = useState(false);
    const [userChangeLineName, setUserChangeLineName] = useState(false);
    const [monthlyUsageSummary, setMonthlyUsageSummary] = useState(false)
    const [customNotesDialog, setCustomNotesDialog] = useState(false);
    const [viewCustomerNotes, setViewCustomerNotes] = useState(false);
    const [viewActivityLog, setViewActivityLog] = useState(false);
    const [sendInvite, setSendInvite] = useState(false);
    const [activateNow, setActivateNow] = useState(false);
    const [activeNumber, setActiveNumber] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [changeShippingAddress, setChangeShippingAddress] = useState(false);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [rechargeDialog, setRechargeDialog] = useState(false);
    const [isEditCustomerInfo, setisEditCustomerInfo] = useState(false);
    const [lstWireless, setLstWireless] = useState([]);
    const [searchResultsList, setSearchResultsList] = useState([]);
    const showIsSearch = () => {
        setIsSearch(true);
    }
    const [customerNotesData, setCustomerNotesData] = useState([])

    const [linePortDialog, setLinePortDialog] = useState(false);

    const openlinePortDialog = () => {
        setLinePortDialog(true)
    }

    const ShowSearchDialog = () => {
        setSearchResultDialog(true)
    }

    const CloseSearchDialog = () => {
        setSearchResultDialog(false)
    }
    const onSearchRowClick = (row) => {
        CloseSearchDialog();
        var filteredCustomer = customerData.filter(a => a.objCustomerInfo.accountNumber == row.accountNumber);
        if (filteredCustomer && filteredCustomer.length > 0) {
            loadFromRecent(row.accountNumber);
        }
        else {
            getCustomerDetail(row.accountNumber, null, true);
        }
    }
    const closelinePortDialog = () => {
        setLinePortDialog(false)
    }

    const [portANumber, setPortANumber] = useState(false);

    const showPortAnumber = () => {
        setPortANumber(true)
    }


    const messagesList = [
        {
            userName: 'Chatgram',
            time: '19:48',
            messageText: 'Chatgram Web was updated.',
            messageCount: 1,
            image: UserImage,
        },
        {
            userName: 'Jessica Drew',
            time: '18:30',
            messageText: 'Ok, see you later',
            messageCount: 2,
            image: UserImage,
        },
        {
            userName: 'David Moore',
            time: '18:16',
            messageText: "You: i don't remember anything 😄 ",
            messageCount: 0,
            image: UserImage,
            messagesList: [{
                text: 'Please update me about my bill and package',
                time: '18:12',
                type: 'receiver',
            },
            {
                text: 'Good Morning',
                time: '18:16',
                type: 'sender',
            },
            {
                text: 'Please wait while i check your records',
                time: '18:16',
                type: 'sender',
            },]
        },
        {
            userName: 'Greg James',
            time: '18:02',
            messageText: "I got a job at SpaceX 🎉 🚀  ",
            messageCount: 0,
            image: UserImage,
        },
        {
            userName: 'Emily Dorson',
            time: '17:42',
            messageText: 'Table for four, 5PM. Be there.  ',
            messageCount: 0,
            image: UserImage,
        },
        {
            userName: 'Office Chat',
            time: '17:08',
            messageText: "Lewis: All done mate 😆  ",
            messageCount: 0,
            image: UserImage,
        },
        {
            userName: 'Announcements',
            time: '16:15',
            messageText: 'Channel created',
            messageCount: 0,
            image: UserImage,
        },
    ]
    const statusCheckbox = [
        {
            value: '102',
            status: 'Active',
            label: 'Active',
            icon: ActiveIcon,
        },
        {
            value: '102',
            status: 'Inactive',
            label: 'Inactive',
            icon: Inactive,
        },
        {
            value: '102',
            status: 'Suspended',
            label: 'Suspended',
            icon: Suspended,
        },
        {
            value: '102',
            status: 'Disconnected',
            label: 'Disconnected',
            icon: Disconnected,
        },
        {
            value: '102',
            status: 'Hotlined',
            label: 'Hotlined',
            icon: Hotline,
        },
        {
            value: '102',
            status: 'Rejected',
            label: 'Rejected',
            icon: Rejected,
        },
        {
            value: '102',
            status: 'PortCancelled',
            label: 'PortCancelled',
            icon: PortInCancel,
        }
    ]
    const [isUpdate, setIsUpdate] = useState(false);
    const handleUpdate = () => {
        setIsUpdate(!isUpdate);
    }
    const [isUpdateCusNote, setIsUpdateCusNote] = useState(false);
    const handleUpdateCusNote = () => {
        setIsUpdateCusNote(!isUpdateCusNote);
    }

    const removeRecent = (objCustomer, index, e) => {
        e.stopPropagation();
        var obj = { UserId: parseInt(userID), AccountNumber: objCustomer.objCustomerInfo.accountNumber };
        setIsLoading(true);
        PostDataAPI("customer/deleteRecentCustomers", obj, true).then((result) => {
            if (result.success) {
                customerData.splice(index, 1);
                var lstCust = customerData.map(item => item.objCustomerInfo.accountNumber == selectedCustomer.objCustomerInfo.accountNumber ? { ...item, isSelected: true } : item);
                setCustomerData(lstCust);
                setIsLoading(false);
                if (lstCust && lstCust.length > 0 && (index == 0 || objCustomer.isSelected == true)) {
                    getCustomerDetail(lstCust[0]?.objCustomerInfo?.accountNumber, lstCust)
                }
            }
            else
                setIsLoading(false);
        })
    }
    const hideIsSearch = () => {
        setState((prevState) => ({
            ...prevState,
            ['accountNumber']: '',

        }));
        setIsSearch(false);
    }
    const [customerTabValue, setCustomerTabValue] = useState(0);

    //action dialog 
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })
    const showActivityLog = (type) => {
        setLogActivityLogType(type);
        setViewActivityLog(true)
    }

    const showAccountSettingDialog = () => {
        setShowAccountSettings(true)
    }

    const hideAccountSettingDialog = () => {
        setShowAccountSettings(false)
    }

    const showActivateNow = () => {
        setisEditCustomerInfo(false);
        setActivateNow(true)
    }
    const editCustomerAccountInfo = () => {
        if (selectedCustomer?.objCustomerInfo == null) {
            showMessage("Alert", "Can not find account detail", "warning", 3000);
        } else {
            setisEditCustomerInfo(true);
            setActivateNow(true);
        }

    }
    const showActiveNumber = () => {
        setActiveNumber(true)
    }
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

    const onTabChange = (e, newValue) => {

        setTabValue(newValue);

        if (newValue == 2 && !isPaymentHistoryLoaded) {
            getPaymentHistory();
        }
        if (newValue == 5) {
            LoadActivityLog();
        }
    };

    const customerTabChange = (e, newValue) => {

        setCustomerTabValue(newValue);
    }

    const [customerData, setCustomerData] = useState([]);


    const [selectedCustomer, setSelectedCustomer] = useState({ lstPaymentHistory: [] });

    const [accountCardOpen, setAccountCardOpen] = useState(true);
    const [wirelessCardOpen, setWirelessCardOpen] = useState(true);

    const [state, setState] = useState({ accounts: "" });
    const [isPaymentLoaded, setIsPaymentLoaded] = useState(false);
    const [isPaymentHistoryLoaded, setIsPaymentHistoryLoaded] = useState(false);
    const [addressType, setAddressType] = useState("");
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        let val = value;
        if (val)
            val = val.replace('/\s/g', '');
        if (name == 'accountNumber' && val.length <= 50) {
            setState((prevState) => ({
                ...prevState,
                [name]: val,
            }));
        }

    }
    const handleActionClick = (key, item) => {

        setLineUserName(item.username)
        setMdnNumber(item.mDN);
        setLineDetails(item);
        if (key === "lineDetails") {
            setLineDetailsDialogState(true);
        } else if (key === "usage") {
            setUserDetailsDialogState(true);
        } else if (key === "changePhoneNumber") {
            setChangePhoneNumberDialogState(true);
        } else if (key === "simSwipe") {
            setUserSwapSim(true);
        } else if (key === "forwardNumber") {
            showMessage("Alert", "This feature is comming soon", "warning", 3000);
            //setUserCallForward(true);
        } else if (key === "changeLineName") {
            setUserChangeLineName(true)
        } else if (key === "customerNotes") {
            //setCustomNotesDialog(true)
            openNoteDialog('LineLevel');
        } else if (key === "imeiCheck") {
            if (item.eSN) {
                var imeiURL = "https://swappa.com/imei/info/" + item.eSN;
                window.open(imeiURL, "_blank");
            }
            else
                showMessage("Error", "IMEI number missing", "error", 3000);
        }
        else if (key === "monthlyUsage") {
            setMonthlyUsageSummary(true);
        } else if (key === "disconnect") {
            openActionDialog("disconnect", key, item.mDN);
        } else if (key === "reconnect") {
            openActionDialog("reconnect", key, item.mDN);
        } else if (key === "suspendNumber") {
            openActionDialog("suspend", key, item.mDN);
        } else if (key === "restore") {
            openActionDialog("restore", key, item.mDN);
        }
        else if (key === "viewCustomerNotes") {
            setViewCustomerNotes(true)
        } else if (key === "viewActivityLog") {
            showActivityLog('Line');
        }


    }

    const openNoteDialog = (noteLevel) => {
        setNoteLevel(noteLevel);
        setCustomNotesDialog(true)
    }
    const openActionDialog = (message, action, mdnNumber) => {
        showActionDialog("Are you sure you want to " + message + " this line?", "confirm", function () {

            if (action === "disconnect") {
                disconnectLineByMDN(mdnNumber);
            } else if (action === "reconnect") {
                reconnectLineByMDN(mdnNumber);
            } else if (action === "suspendNumber") {
                suspendLineByMDN(mdnNumber);
            }
            else if (action === "restore") {
                restoreLineByMDN(mdnNumber);
            }
            else { }
        });
    }
    //function to disconnect the line
    //before disconnect we must save mdn record in local DB and use that record in reconnecting again
    const disconnectLineByMDN = (mdn) => {
        var obj = {
            MDN: mdn,
            userName: selectedCustomer?.objCustomerInfo?.fullName,
            emailAddress: selectedCustomer?.objCustomerInfo?.email,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/disconnectLineByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                showMessage("Success", "Line disconnected successfully", "success", 3000);
                getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    //function to reconnect the line
    const reconnectLineByMDN = (mdn) => {
        var obj = {
            MDN: mdn,
            userName: selectedCustomer?.objCustomerInfo?.fullName,
            emailAddress: selectedCustomer?.objCustomerInfo?.email,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/reconnectLineByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                showMessage("Success", "Line reconnected successfully", "success", 3000);
                getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    //function to suspend the line, after suspend we need to restore the line before connect

    //Line cannot be used (not disconnected, and can be restored
    const suspendLineByMDN = (mdn) => {
        var obj = {
            MDN: mdn,
            userName: selectedCustomer?.objCustomerInfo?.fullName,
            emailAddress: selectedCustomer?.objCustomerInfo?.email,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/suspendLineByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                showMessage("Success", "Line suspended successfully", "success", 3000);
                getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    //function to restore the line
    const restoreLineByMDN = (mdn) => {
        var obj = {
            MDN: mdn,
            userName: selectedCustomer?.objCustomerInfo?.fullName,
            emailAddress: selectedCustomer?.objCustomerInfo?.email,
            accountNumber: accountNumber
        };
        setIsLoading(true)
        PostDataAPI("telispire/restoreLineByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                showMessage("Success", "Line restored successfully", "success", 3000);
                getCustomerLines(accountNumber);
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    const handleCustomerSearch = (e) => {

        //const keyCode = e.keyCode || e.which;
        //const keyValue = String.fromCharCode(keyCode);
        //const isNumber = /\d/.test(keyValue);
        //const isSpecialChar = /[^a-zA-Z0-9]/.test(keyValue);
        //if (!isNumber || isSpecialChar) {
        //    e.preventDefault();
        //}
        const { name, value } = e.target;

        if (e.charCode == 13) {
            setTabValue(0);
            //first check in recent list, if exist then load from recent
            var filteredCustomer = customerData.filter(a => a.objCustomerInfo.accountNumber == value);
            if (filteredCustomer && filteredCustomer.length > 0) {
                loadFromRecent(value);
            }
            else {
                //getCustomerDetail(value, null, true);
                searchWirelessCustomer(value);
            }

        }
    }
    const loadFromRecent = (value) => {
        setAccountNumber(value);
        setTabValue(0);
        var existingList = customerData.map(a => { return { ...a, isSelected: false } });
        setCustomerData(existingList);
        var filteredCustomer = existingList.filter(a => a.objCustomerInfo.accountNumber == value);
        if (filteredCustomer[0].objCustomerInfo.email || (filteredCustomer[0].objCustomerInfo.dateCreated && filteredCustomer[0].objCustomerInfo.dateCreated != '0001-01-01T00:00:00')) {
            filteredCustomer[0].isSelected = true;
            setSelectedCustomer(filteredCustomer[0]);
            //update customer line state aary
            setLstWireless(filteredCustomer[0]?.lstWireless);
            handleUpdate();
            setState((prevState) => ({
                ...prevState,
                ['accountNumber']: '',

            }));
            LoadCustomerNotes(value);
        }
        else {
            getCustomerDetail(filteredCustomer[0].objCustomerInfo.accountNumber, existingList);
        }

    }

    const getWireLessByMdn = (mdnNo) => {
        var obj = {
            MDN: mdnNo
        };
        setIsLoading(true)
        PostDataAPI("telispire/getWirelesssByMDN", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                getCustomerDetail(result.data.accountNumber)
            }
        })
    }

    function saveRecentCustomer(customerInfo) {
        var obj = {
            UserId: parseInt(userID),
            FullName: customerInfo.fullName,
            AccountNumber: customerInfo.accountNumber,
            emailAddress: customerInfo.email ? customerInfo.email : '',
            workPhone: customerInfo.workPhone,
            homePhone: customerInfo.homePhone,
            isPrepaid: !isPostpaid,
            planId: customerInfo.planId

        };
        PostDataAPI("customer/addRecentCustomer", obj, true).then((result) => {
            if (result.success && result.data != null) {

            }
        })
    }

    function loadRecentCustomer() {
        var obj = { UserId: parseInt(userID), isPrepaid: !isPostpaid };
        PostDataAPI("customer/loadRecentCustomers", obj, true).then((result) => {
            if (result.success && result.data != null) {

                var lstData = result.data.map(obj => {
                    var objCustomerInfo = { accountNumber: obj.accountNumber, fullName: obj.fullName };
                    return { objCustomerInfo: objCustomerInfo };
                });
                setCustomerData(lstData);
                if (result.data.length > 0)
                    getCustomerDetail(result.data[0].accountNumber, lstData);
            }
        })
    }

    const getCustomerDetail = (accountNo, lstRecentCustomer, isFromSearch, isCustomerInfoUpdated) => {
        setAccountNumber(accountNo);
        setIsPaymentHistoryLoaded(false);

        var obj = { loginUserId: parseInt(userID), AccountNumber: accountNo.trim(), MDN: '', isPrepaid: !isPostpaid, includeDisconnectedLines: true };
        setIsLoading(true);
        PostDataAPI("telispire/getCustomerDetail", obj, true).then((result) => {
            if (result.success && result.data != null) {
                ////in case of prepaid check if any prepaid line exist
                ////in case of post paid check any postpaid line exist
                //var isAnyCategoryExistsList = result.data.lstWireless.filter(t => t.isPrepaid == !isPostpaid);
                //if (isAnyCategoryExistsList == null && isAnyCategoryExistsList.Count() <= 0) {
                //    var category = isPostpaid ? 'Postpaid' : 'Prepaid';
                //    showMessage("Error", "No " + category + " line exist", "error", 3000);
                //    
                //}
                setIsPaymentLoaded(false);
                //if (result.data.cardNumber && result.data.cardNumber.length > 0 && result.data.cardNumber.length > 0) {
                //    result.data.cardNumber = result.data.cardNumber.substring(result.data.cardNumber.length - 4)
                //}
                if (!result.data.objCustomerInfo.shipAddress1 && !result.data.objCustomerInfo.shipAddress2) {
                    result.data.objCustomerInfo.shipAddress1 = result.data.objCustomerInfo.homeAddress1;
                    result.data.objCustomerInfo.shipAddress2 = result.data.objCustomerInfo.homeAddress1;
                    result.data.objCustomerInfo.shipCity = result.data.objCustomerInfo.homeCity;
                    result.data.objCustomerInfo.shipState = result.data.objCustomerInfo.homeState;
                }
                var existingList = [];
                if (lstRecentCustomer)
                    existingList = lstRecentCustomer;//.filter(a => a.objCustomerInfo.accountNumber != accountNo);
                else
                    existingList = customerData;

                result.data.isSelected = true;
                existingList = existingList.map(a => { return { ...a, isSelected: false } });
                existingList = existingList.map(item => item.objCustomerInfo.accountNumber == accountNo ?
                    {
                        ...item,
                        objCustomerInfo: result.data.objCustomerInfo,
                        lstWireless: result.data.lstWireless,
                        lstPackages: result.data.lstPackages,
                        isSelected: true
                    } : item);

                setLstWireless(result.data.lstWireless);
                if (!lstRecentCustomer && !isCustomerInfoUpdated)
                    existingList.unshift(result.data);

                setCustomerData(existingList);

                setSelectedCustomer(result.data);
                handleUpdate();
                if (isFromSearch) {
                    //now on backedn side
                    //saveRecentCustomer(result.data.objCustomerInfo);
                }

            }
            else {
                setIsLoading(false);
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
            LoadCustomerNotes(accountNo);
            setState((prevState) => ({
                ...prevState,
                ['accountNumber']: '',

            }));
        })
    }
    const searchWirelessCustomer = (strSearch) => {
        setSearchTerm(strSearch);
        var obj = { loginUserId: parseInt(userID), AccountNumber: strSearch.trim(), isPrepaid: !isPostpaid };
        setIsLoading(true);
        PostDataAPI("customer/searchWirelessCustomer", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setSearchResultsList(result.data);
                setSearchResultDialog(true);
            }
            else {
                setIsLoading(false);
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }

    const getLastPayment = () => {
        var phoneNo = '';
        var lstTemp = selectedCustomer.lstWireless.filter(t => t.status == 'Active');
        if (lstTemp && lstTemp.length > 0)
            phoneNo = lstTemp[0].mDN;
        if (phoneNo) {
            var obj = { phoneNumber: phoneNo };
            setIsLoading(true);
            PostDataAPI("telispire/getLastPayment", obj).then((result) => {
                if (result.success && result.data != null) {
                    var existingData = selectedCustomer.objCustomerInfo;
                    existingData.lastPaymentDate = result.data.lastPaymentDate;
                    existingData.lastPaymentAmount = result.data.lastPaymentAmount;
                    existingData.dueDate = result.data.dueDate;
                    existingData.currentBalance = result.data.currentBalance;
                    setSelectedCustomer((prevState) => ({
                        ...prevState,
                        objCustomerInfo: existingData
                    }));
                }
                else {
                    //showMessage("Error", result.message, "error", 3000);
                }
                setIsPaymentLoaded(true);
                setIsLoading(false);

            })
        }
        else
            setIsPaymentLoaded(true);
    }
    const getPaymentHistory = () => {
        //if (selectedCustomer?.objCustomerInfo?.accountPhoneNumber) {
        var obj = { accountNumber: accountNumber };
        setIsLoading(true);
        PostDataAPI("telispire/getPaymentHistory", obj).then((result) => {
            if (result.success && result.data != null) {
                setIsPaymentHistoryLoaded(true);
                debugger;
                const filteredItems = result.data.filter(item => item.amount != 0);
                setSelectedCustomer((prevState) => ({
                    ...prevState,
                    lstPaymentHistory: filteredItems
                }));
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            handleUpdate();
            setIsLoading(false);

        })
        //}
        //else
        //    setIsPaymentLoaded(true);
    }

    const handleSuccessClose = (message) => {
        showMessage("Success", message, "success", 3000);
        setShowAccountSettings(false);
        setChangePhoneNumberDialogState(false);
        setUserChangeLineName(false);
        setUserSwapSim(false);
        setCustomNotesDialog(false);
        getCustomerLines(accountNumber);
        LoadCustomerNotes(accountNumber);
    }

    //function to load customer notes
    const LoadCustomerNotes = (accountNo) => {

        var obj = {
            accountNumber: accountNo,
            mDN: '',
            noteLevel: 'CustomerLevel'
        };
        PostDataAPI("telispire/loadCustomerNotes", obj, true).then((result) => {
            if (result.success && result.data != null) {

                setCustomerNotesData(
                    result.data.map((item, i) => {
                        item.noteDate = formatDate(item.createDate);
                        return { ...item }
                    }));
            } else {
                setCustomerNotesData([])
            }
            handleUpdateCusNote();
        })

    }

    const getCustomerLines = (accountNo) => {
        var obj = { AccountNumber: accountNo, MDN: '', isPrepaid: !isPostpaid, includeDisconnectedLines: true };
        setIsLoading(true);
        PostDataAPI("telispire/getCustomerLines", obj, true).then((result) => {
            if (result.success && result.data != null) {
                setSelectedCustomer((prevState) => ({
                    ...prevState,
                    lstWireless: result.data,

                }));
                setLstWireless(result.data);
                handleUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
            setState((prevState) => ({
                ...prevState,
                ['accountNumber']: '',

            }));
        })

    }

    const handleActivateNewLineClose = (_message) => {
        setActiveNumber(false);
        getCustomerLines(accountNumber);
    }
    const handleChangeAddressSuccessClose = (_address) => {
        var existingData = selectedCustomer.objCustomerInfo;
        showMessage("Success", "Address updated successfully", "success", 3000);
        if (addressType == "updateBillingAddress") {

            existingData.billingAddress1 = _address.address1
            existingData.billingAddress2 = _address.address2
            existingData.billingCity = _address.city;
            existingData.billingState = _address.state;
            existingData.billingZip = _address.zip;
            existingData.billingName = _address.contactName;
        }
        else {
            existingData.shipAddress1 = _address.address1;
            existingData.shipAddress2 = _address.address2
            existingData.shipCity = _address.city;
            existingData.shipState = _address.state;
            existingData.shipName = _address.contactName;
            existingData.shipPhone = _address.phone;
            existingData.shipZip = _address.zip;
        }
        setSelectedCustomer((prevState) => ({
            ...prevState,
            objCustomerInfo: existingData
        }));
        setChangeShippingAddress(false);
    }

    const handleInvitationSuccessClose = (_invitationStatus) => {

        var existingData = selectedCustomer.objCustomerInfo;
        showMessage("Success", "Invitation sent successfully", "success", 3000);
        existingData.invitationStatus = _invitationStatus;
        setSelectedCustomer((prevState) => ({
            ...prevState,
            objCustomerInfo: existingData
        }));
        setSendInvite(false);
    }
    const [objAddress, setObjAddress] = useState({});
    const changeAddress = (type) => {

        setAddressType(type);
        if (type == "updateBillingAddress") {
            setObjAddress({
                address1: selectedCustomer?.objCustomerInfo?.billingAddress1,
                address2: selectedCustomer?.objCustomerInfo?.billingAddress2,
                city: selectedCustomer?.objCustomerInfo?.billingCity,
                state: selectedCustomer?.objCustomerInfo?.billingState,
                zip: selectedCustomer?.objCustomerInfo?.billingZip,
                contactName: selectedCustomer?.objCustomerInfo?.billingName,
                creditCardNumber: selectedCustomer?.objCustomerInfo?.creditCardNumber,
                creditCardType: selectedCustomer?.objCustomerInfo?.creditCardType,
                creditCardExpiration: selectedCustomer?.objCustomerInfo?.creditCardExpiration,
                creditCardExpirationCvv: selectedCustomer?.objCustomerInfo?.creditCardExpirationCvv,
            });
        }
        else {
            setObjAddress({
                address1: selectedCustomer?.objCustomerInfo?.shipAddress1,
                address2: selectedCustomer?.objCustomerInfo?.shipAddress2,
                city: selectedCustomer?.objCustomerInfo?.shipCity,
                state: selectedCustomer?.objCustomerInfo?.shipState,
                zip: selectedCustomer?.objCustomerInfo?.shipZip,
                contactName: selectedCustomer?.objCustomerInfo?.shipName,
                phone: selectedCustomer?.objCustomerInfo?.shipPhone,

            });
        }
        setChangeShippingAddress(true);

    }
    const handleActivateNowSuccess = (accountNo, _message) => {
        if (_message) {
            showMessage("Success", _message, "success", 3000);
            getCustomerDetail(accountNo, null, false, true);
        } else {
            getCustomerDetail(accountNo);
        }
        setActivateNow(false);

    }

    const deleteCustomerNotes = (item) => {
        showActionDialog("Are you sure you want to delete this record?", "confirm", function () {
            var obj = {
                noteId: item.noteId,
                accountNumber: accountNumber,
                mDN: '',
                userName: selectedCustomer?.objCustomerInfo?.fullName
            };
            PostDataAPI("telispire/deleteCustomerNote", obj, true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    LoadCustomerNotes(accountNumber);
                    showMessage("Success", "Record deleted successfully.", "success", 3000);
                    console.log(result.message);
                } else {
                    showMessage("Error", result.message, "error", 3000);
                    console.log(result.message);
                }
            })
        });

    }

    const subsciberPortalAccess = () => {
        //send invitation to subscriber
        if (!selectedCustomer?.objCustomerInfo?.invitationStatus
            || selectedCustomer?.objCustomerInfo?.invitationStatus == ''
            || selectedCustomer?.objCustomerInfo?.invitationStatus == 'Cancel'
        ) {
            setSendInvite(true)
        }
        else if (selectedCustomer?.objCustomerInfo?.invitationStatus == 'Pending') {
            updateInvitationStatus('Cancel', 'Are you sure you want to cancel portal invitation?', 'Invitation canceled successfully')
        }
        else if (selectedCustomer?.objCustomerInfo?.invitationStatus == 'Accepted') {
            updateInvitationStatus('Revoked', 'Are you sure you want to revoke portal access?', 'Portal Access revoked successfully')
        }
        else if (selectedCustomer?.objCustomerInfo?.invitationStatus == 'Revoked') {
            updateInvitationStatus('Accepted', 'Are you sure you want to invoke portal access?', 'Portal Access invoked successfully')
        }

    }

    const updateInvitationStatus = (_invitationStatus, _message, _successMessage) => {
        showActionDialog(_message, "confirm", function () {
            var obj = {
                accountNumber: accountNumber,
                invitationStatus: _invitationStatus
            };
            setIsLoading(true)
            PostDataAPI("customer/updateCustomerInvitation", obj, true).then((result) => {
                setIsLoading(false)
                if (result.success) {
                    showMessage("Success", _successMessage, "success", 3000);
                    console.log(result.message);
                    var existingData = selectedCustomer.objCustomerInfo;
                    existingData.invitationStatus = _invitationStatus;
                    setSelectedCustomer((prevState) => ({
                        ...prevState,
                        objCustomerInfo: existingData
                    }));
                    setSendInvite(false);

                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        });

    }

    const location = useLocation();
    const [filteredStatus, setFilteredStatus] = useState([]);
    const handleStatusClick = (event, status) => {
        var lstStatus = filteredStatus;
        if (event.target.checked) {
            lstStatus.push(status);
        }
        else {
            lstStatus = lstStatus.filter(s => s != status)
        }
        setFilteredStatus(lstStatus);
        if (lstStatus.length > 0)
            setLstWireless(selectedCustomer?.lstWireless.filter(o => lstStatus.some(s => s == o.status)));
        else
            setLstWireless(selectedCustomer?.lstWireless);
        handleUpdate();
    }
    const [activityRow, setActivityRow] = useState([])
    const LoadActivityLog = () => {
        var method = "telispire/loadActivityLogByCustomer";
        const getParams = [accountNumber];
        setIsLoading(true)
        PostDataAPI(method, getParams, true).then((result) => {
            setIsLoading(false);
            if (result.success && result.data != null) {

                setActivityRow(
                    result.data.map((item, i) => {
                        item.accountNumber = item.customer;
                        item.activityDate = formatDateTime(item.createDate);
                        item.mdnNumber = formateMdnNumber(item.entityId);
                        return { ...item }
                    }));
                handleUpdate();
            }
        })

    }

    const handleRechargeSuccessClose = (_message) => {
        setRechargeDialog(false);
    }

    useEffect(() => {
        if (isPostpaid && !sessionStorage.getItem('isPostPaidPinVerified')) {
            history.push({
                pathname: '/app/postpaidverify'
            });
        } else {
            sessionStorage.removeItem("isPostPaidPinVerified");
        }

        loadRecentCustomer();

    }, [location]);

    return (
        <>

            {isLoading ? <Loader></Loader> : ''}

            <div className={classes.appBarSpacer} />

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={6}>
                        <BreadcrumComponent parentLink={"Wireless Subscriber"} currentLink={isPostpaid ? "Postpaid" : "Prepaid"}></BreadcrumComponent>
                    </Grid>
                    <Grid item lg={6} style={{ textAlign: 'right', paddingBottom: '6px' }}>
                        {/*{!isPostpaid ?*/}
                        <CustomBtn onClick={() => setLinePortDialog(true)} id="addButtonBorder" btnType="primary" className={classes.smButton} customClass={true} shape="round"> Add New Line</CustomBtn>
                        {/*: ''}*/}
                    </Grid>

                </Grid>
                <div className={classes.rightHeader}>

                </div>
            </div>

            <Grid row container style={{ alignItems: 'center' }}>
                <Grid item lg={9} xs={12}>
                    {customerData && customerData.length > 0 ? <h1 className={classes.recentHeading}>Recent Customers</h1> : ''}
                </Grid>


            </Grid>


            <Grid className={classes.customerContainer} row container justifyContent="space-between">
                <Grid item lg={9}>
                    {customerData && customerData.length > 0 ?
                        <Tabs
                            value={customerTabValue}
                            onChange={customerTabChange}

                            aria-label="icon tabs example"
                            className={classes.customerTabs}
                            variant="scrollable"
                            scrollButtons="auto"

                        >
                            {customerData.map((customer, index) => (
                                <>
                                    <Tab className={`${customer?.objCustomerInfo?.status === "active" ? 'active' : 'active'} ${customer?.isSelected ? 'selected' : ''}`}
                                        onClick={() => { loadFromRecent(customer?.objCustomerInfo?.accountNumber) }}
                                        label={<>

                                            <div style={{ display: 'flex', width: '100%' }}>
                                                {/* <div className="user-profile-dashbaord" style={{ backgroundImage: 'URL(' + customer.img + ')' }}></div> */}
                                                <div className={classes.customerInfo}>
                                                    <Typography className={classes.customerNumber}>{customer?.objCustomerInfo?.accountNumber}</Typography>
                                                    <Typography className={classes.customerName}>{customer?.objCustomerInfo?.fullName}</Typography>
                                                    <ClearIcon className={classes.crossIcon} onClick={(e) => removeRecent(customer, index, e)} />
                                                </div>

                                            </div>
                                        </>} {...a11yProps(index)} />


                                </>
                            ))
                            }

                        </Tabs> : ''}

                </Grid>

                <Grid item lg={3} xs={12} className={classes.customerSearch}>

                    <TextField
                        size="small"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Search by Account#, Name, Email"
                        value={state.accountNumber}
                        InputProps={{
                            endAdornment:
                                !isSearch ?
                                    <SearchOutlined onClick={showIsSearch} /> :
                                    <ClearIcon onClick={hideIsSearch} />

                        }}
                        variant="outlined"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleCustomerSearch}
                        className={isSearch ? classes.SearchFieldOpen : classes.SearchField}

                    />

                </Grid>


            </Grid>
            <Grid className={classes.container}>

                <Grid container>

                    <Collapse in={accountCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>
                        {customerData && customerData.length > 0 ?
                            <div className={classes.accountPaper} >
                                <div className={classes.accountCardHeader}>
                                    <div className={classes.accountCardHeaderTitle}>
                                        <span className={classes.cardHeading}>Account </span>  <Typography className={classes.accountCardMember}>Customer : {selectedCustomer?.objCustomerInfo?.accountNumber} <span className={classes.accountCardOrganisationName}> - {selectedCustomer?.objCustomerInfo?.fullName}</span></Typography>
                                        {selectedCustomer?.objCustomerInfo ? <Button className={classes.changeBtn} onClick={subsciberPortalAccess}>{
                                            selectedCustomer?.objCustomerInfo?.invitationStatus == 'Pending' ? 'Cancel Portal Invitation'
                                                : selectedCustomer?.objCustomerInfo?.invitationStatus == 'Accepted' ? 'Revoke Portal Access'
                                                    : selectedCustomer?.objCustomerInfo?.invitationStatus == 'Revoked' ? 'Invoke Portal Access'
                                                        : 'Invite to Customer Portal'
                                        }</Button> : ''}

                                    </div>
                                    {/* <div className={classes.accountCardHeaderTitle}>
                                        <span className={classes.cardHeading}>Package Expiry </span>
                                        <Typography className={classes.accountCardMember}>{formatDate(selectedCustomer?.objCustomerInfo?.packageExpirationDate)} </Typography>

                                    </div> */}
                                    <div className={classes.flexBtn}>
                                        {!isPostpaid && selectedCustomer?.objCustomerInfo?.packageExpirationDate ?
                                            <div className={selectedCustomer?.objCustomerInfo?.packageExpirationDate && new Date(selectedCustomer?.objCustomerInfo?.packageExpirationDate) > new Date() ? classes.expiryDate : classes.expiryDatePast}>
                                                Expiration Date  {': ' + formatDate(selectedCustomer?.objCustomerInfo?.packageExpirationDate)}
                                            </div>
                                            : !isPostpaid && new Date(selectedCustomer?.objCustomerInfo?.packageExpirationDate) < new Date() ? <div className={classes.expiryDatePast}>  Account Status: Inactive</div>
                                                : ''
                                        }
                                        <Button className={classes.changeBtn} onClick={() => setRechargeDialog(true)}><img src={DollarIcon} /> &nbsp; Recharge</Button>

                                        <Dropdown overlay={<Menu>
                                            {/*{selectedCustomer?.objCustomerInfo?.planId != 15016 ? <Menu.Item*/}
                                            {/*    className={classes.DropdownItems} onClick={showActiveNumber}> <img src={activeInactive} />  Add Line*/}
                                            {/*</Menu.Item> : ''}*/}

                                            {/*<Menu.Item*/}
                                            {/*    className={classes.DropdownItems}> <img src={USBIcon} />  Port a Number*/}
                                            {/*</Menu.Item>*/}

                                            <Menu.Item
                                                className={classes.DropdownItems} onClick={() => { showActivityLog("Customer") }}>  <img src={ViewActiveLog} /> View Log
                                            </Menu.Item>
                                            <Menu.Item
                                                className={classes.DropdownItems} onClick={() => { showAccountSettingDialog() }}> <img src={SettingsIcon} />  Account Settings
                                            </Menu.Item>
                                            <Menu.Item
                                                className={classes.DropdownItems} onClick={() => { editCustomerAccountInfo() }}> <img src={Edit} />  Edit Account
                                            </Menu.Item>

                                        </Menu>} trigger={["click"]}
                                            className={classes.actionDropDown}>
                                            <Button className={classes.actionBtn} startIcon={<img src={ActionIcon} alt="action" />}>
                                                Actions <ArrowDropDownIcon />
                                            </Button>
                                        </Dropdown>

                                        {/* <IconButton color="inherit">
                                            <Badge badgeContent={12} color="secondary">
                                                <img src={WarningIcon} alt="alt" />
                                            </Badge>
                                        </IconButton> */}
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
                                            <li>
                                                <Typography className={classes.accountLabel}>Account #:</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.accountNumber}</Typography>
                                            </li>
                                            <li>
                                                <Typography className={classes.accountLabel}>Date Created:</Typography>
                                                <Typography className={classes.accountValue}>{formatDate(selectedCustomer?.objCustomerInfo?.dateCreated)}</Typography>
                                            </li>
                                            {/*<li>*/}
                                            {/*    <Typography className={classes.accountLabel}>Billing Cycle</Typography>*/}
                                            {/*    <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.billingCycle}</Typography>*/}
                                            {/*</li>*/}
                                            <li>
                                                <Typography className={classes.accountLabel}>Total Monthly Charges:</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.monthlyCharges}</Typography>
                                            </li>
                                            <li>
                                                <Typography className={classes.accountLabel}>Billing Cycle:</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.billingCycle}</Typography>
                                            </li>
                                            <li>
                                                <Typography className={classes.accountLabel}>Email:</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.email}</Typography>
                                            </li>
                                            {/*{!isPaymentLoaded ? '' :*/}
                                            {/*    <>*/}
                                            {/*        <li>*/}
                                            {/*            <Typography className={classes.accountLabel}>Payment Method:</Typography>*/}
                                            {/*            <Typography className={classes.accountValue}></Typography>*/}
                                            {/*        </li>*/}
                                            {/*        <li>*/}
                                            {/*            <Typography className={classes.accountLabel}>Last Payment:</Typography>*/}
                                            {/*            <Typography className={classes.accountValue}>{numberDisplay(selectedCustomer?.objCustomerInfo?.lastPaymentAmount,0,0,'')}</Typography>*/}
                                            {/*        </li>*/}
                                            {/*        <li>*/}
                                            {/*            <Typography className={classes.accountLabel}>Past Due Balance:</Typography>*/}
                                            {/*            <Typography className={classes.accountValue}></Typography>*/}
                                            {/*        </li>*/}
                                            {/*    </>*/}
                                            {/*}*/}

                                            {/*{isPaymentLoaded == true ? '' :*/}
                                            {/*    <li>*/}
                                            {/*        <Typography className={classes.showMore} onClick={getLastPayment}>Show more...</Typography>*/}
                                            {/*    </li>*/}
                                            {/*}*/}
                                        </ul>
                                    </div>
                                    <div className={classes.accountSection} style={{ alignSelf: 'baseline' }}>
                                        <ul className={classes.accountList}>
                                            <li>
                                                <Typography className={classes.accountLabel}>Original Account #:</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.oldAccountNumber}</Typography>
                                            </li>

                                            <li>
                                                <Typography className={classes.accountLabel}>Home Phone #:</Typography>
                                                <Typography className={classes.accountValue}>{formateMdnNumber(selectedCustomer?.objCustomerInfo?.homePhone)}</Typography>
                                            </li>

                                            {/*<li>*/}
                                            {/*    <Typography className={classes.accountLabel}>Billing Type:</Typography>*/}
                                            {/*    <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.billingType}</Typography>*/}
                                            {/*</li>*/}
                                            <li>
                                                <Typography className={classes.accountLabel}>Card # (Last Four):</Typography>
                                                <Typography className={classes.accountValue}>{selectedCustomer?.objCustomerInfo?.cardNumber}</Typography>
                                            </li>

                                            <li>
                                                <Typography className={classes.accountLabel}>Sale Rep:</Typography>
                                                <Tooltip title={selectedCustomer?.objCustomerInfo?.salesRep}>
                                                    <Typography className={classes.accountValueTruncate}>{selectedCustomer?.objCustomerInfo?.salesRep}</Typography>
                                                </Tooltip>
                                            </li>
                                            <li>
                                                <Typography className={classes.accountLabel}>Security Pin:</Typography>
                                                <Typography className={classes.accountValueTruncate}>{selectedCustomer?.objCustomerInfo?.securityPin}</Typography>
                                            </li>

                                            {!isPaymentLoaded ? '' :
                                                <>
                                                    <li>
                                                        <Typography className={classes.accountLabel}>Next Billing Date:</Typography>
                                                        <Typography className={classes.accountValue}>{formatDate(selectedCustomer?.objCustomerInfo?.dueDate)}</Typography>
                                                    </li>

                                                    <li>
                                                        <Typography className={classes.accountLabel}>Total Balance:</Typography>
                                                        <Typography className={classes.accountValue}>{numberDisplay(selectedCustomer?.objCustomerInfo?.currentBalance, 0, 0, '')}</Typography>
                                                    </li>
                                                </>
                                            }
                                        </ul>

                                    </div>
                                    <div className={classes.accountSubCardSection}>
                                        <div className={classes.accountHomeSection}>
                                            <Typography className={classes.accountHomeTitle}>Payment Info
                                                <span onClick={() => changeAddress("updateBillingAddress")} className={classes.changeLink}>
                                                    <img src={Edit} />
                                                </span>
                                            </Typography>
                                            <Typography className={classes.accountHomeSubTitle}>
                                                {selectedCustomer?.objCustomerInfo?.billingAddress1 ? selectedCustomer?.objCustomerInfo?.billingAddress1 : ''}
                                            </Typography>

                                            <Typography className={classes.accountHomeSubTitle}>
                                                {selectedCustomer?.objCustomerInfo?.billingAddress2 ? selectedCustomer?.objCustomerInfo?.billingAddress2 : ''}
                                            </Typography>

                                            {selectedCustomer?.objCustomerInfo?.billingAddress1 ? '' :
                                                <Typography className={classes.accountAddress}>
                                                    <>
                                                        <img src={EmptyGrid} className={classes.addressEmptyBox} />
                                                    </>
                                                </Typography>
                                            }
                                            <Typography className={classes.accountSubAddress}>
                                                {selectedCustomer?.objCustomerInfo?.billingCity ? selectedCustomer?.objCustomerInfo?.billingCity + ', ' : ''}
                                                {selectedCustomer?.objCustomerInfo?.billingState} {selectedCustomer?.objCustomerInfo?.billingZip ? selectedCustomer?.objCustomerInfo?.billingZip : ''}
                                            </Typography>
                                            {/*<Typography className={classes.accountHomeAddress}>Contact: {formateMdnNumber(selectedCustomer?.objCustomerInfo?.homePhone?.homePhone)}</Typography>*/}
                                        </div>
                                        <div className={classes.accountBillingSection}>
                                            <Typography className={classes.accountHomeTitle}>Shipping Address <span onClick={() => changeAddress("updateShipAddress")} className={classes.changeLink}>
                                                <img src={Edit} />
                                            </span></Typography>
                                            {/*<Typography className={classes.accountHomeSubTitle}>{selectedCustomer?.objCustomerInfo?.shipName}</Typography> */}

                                            <Typography className={classes.accountAddress}>
                                                <b> {selectedCustomer?.objCustomerInfo?.shipAddress1 ? selectedCustomer?.objCustomerInfo?.shipAddress1 : ''} </b>
                                            </Typography>

                                            <Typography className={classes.accountAddress}>
                                                <b> {selectedCustomer?.objCustomerInfo?.shipAddress2 ? selectedCustomer?.objCustomerInfo?.shipAddress2 : ''} </b>
                                            </Typography>

                                            {selectedCustomer?.objCustomerInfo?.shipAddress1 ? '' :
                                                <>  <Typography className={classes.accountAddress}>

                                                    <img src={EmptyGrid} className={classes.addressEmptyBox} />
                                                </Typography>   </>}

                                            <Typography className={classes.accountSubAddress}>
                                                {selectedCustomer?.objCustomerInfo?.shipCity ? selectedCustomer?.objCustomerInfo?.shipCity + ', ' : ''}
                                                {selectedCustomer?.objCustomerInfo?.shipState} {selectedCustomer?.objCustomerInfo?.shipZip ? selectedCustomer?.objCustomerInfo?.shipZip : ''}
                                            </Typography>
                                            {selectedCustomer?.objCustomerInfo?.shipPhone ? <Typography className={classes.accountHomeAddress}>{selectedCustomer?.objCustomerInfo?.shipPhone ?
                                                'Contact : ' + formateMdnNumber(selectedCustomer?.objCustomerInfo?.shipPhone) : 'Contact : '}
                                            </Typography> : ''}

                                        </div>
                                    </div>
                                </div>
                            </div> :

                            <NoRecord Icon={true} message="Customer account is not loaded yet"></NoRecord>

                        }

                    </Collapse>

                    {customerData && customerData.length > 0 ? <>

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
                                <Tab label="Payment History" aria-label="Payment History" {...a11yProps(2)} />
                                <Tab label="Customer Notes" aria-label="Customer Notes" {...a11yProps(3)} />
                                <Tab label="Communication & Chat" aria-label="Communication & Chat" {...a11yProps(4)} />
                                <Tab label="Acc. Footprints & Log" aria-label="Acc. Footprints & Log" {...a11yProps(5)} />
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

                                                </div>

                                            </div>

                                            {isPostpaid ? <Grid container row>
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
                                                                        onClick={(e) => { handleStatusClick(e, item.status) }}
                                                                    />
                                                                }
                                                                label={<>
                                                                    <div className={item.status == "Active" ? "statusBoxes Active" :
                                                                        item.status == "Inactive" ? "statusBoxes Inactive" :
                                                                            item.status == "Suspended" ? "statusBoxes Suspended" :
                                                                                item.status == "Disconnected" ? "statusBoxes Disconnected" :
                                                                                    item.status == "Hotlined" ? "statusBoxes Hotline" :
                                                                                        item.status == "Rejected" ? "statusBoxes Rejected" :
                                                                                            item.status == "PortCancelled" ? "statusBoxes Port-In-Cancel" : ''


                                                                    }
                                                                    >
                                                                        <div className={classes.statusBoxContent}>
                                                                            <h5>{item.label}</h5>
                                                                            <h2>{selectedCustomer?.lstWireless?.filter(t => t.status == item.status).length}</h2>
                                                                        </div>
                                                                        <img src={item.icon} />
                                                                    </div>
                                                                </>}
                                                            />
                                                        </>
                                                    ))}

                                                </div>

                                            </Grid> : ''}


                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="PrepaidWireless"
                                                    onActionClick={handleActionClick}
                                                    list={lstWireless}
                                                    isUpdate={isUpdate}
                                                    noRecordMsg="No prepaid line exists"
                                                    Icon={true} />

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

                                                <div className={classes.cardHeaderRight}>

                                                </div>

                                            </div>
                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="PrepaidPackages"
                                                    onActionClick={handleActionClick}
                                                    list={selectedCustomer?.lstPackages}
                                                    isUpdate={isUpdate}
                                                    noRecordMsg="No package exists"
                                                    Icon={true}
                                                />
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
                                                    <Typography className={classes.accountCardTitle}>Payment History</Typography>
                                                </div>

                                                <div className={classes.cardHeaderRight}>

                                                </div>

                                            </div>
                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="PaymentHistory"
                                                    onActionClick={handleActionClick}
                                                    list={selectedCustomer?.lstPaymentHistory}
                                                    isUpdate={isUpdate}
                                                    noRecordMsg="No payment history exists"
                                                    Icon={true}
                                                />
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
                                                    <Typography className={classes.accountCardTitle}>Customer Notes</Typography>
                                                </div>

                                                <div className={classes.cardHeaderRight}>
                                                    <CustomBtn onClick={() => openNoteDialog("CustomerLevel")} id="addButtonBorder" btnType="primary" className={classes.smButton} customClass={true} shape="round"> Add Notes</CustomBtn>
                                                </div>

                                            </div>

                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="customerNotes"
                                                    isUpdate={isUpdateCusNote}
                                                    noRecordMsg="No customer notes exist"
                                                    Icon={true}
                                                    list={customerNotesData}
                                                    onDeleteClick={deleteCustomerNotes}
                                                />
                                            </div>

                                        </div>
                                    </Collapse>

                                </Grid> : null}
                        </TabPanel>


                        <TabPanel value={tabvalue} index={4} className={classes.tabPan}>
                            {tabvalue === 4 ?
                                <Grid container>
                                    <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>

                                        <div className={classes.accountPaper} >
                                            <div className={classes.accountCardHeader}>

                                                <div className={classes.accountCardHeaderTitle}>
                                                    <Typography className={classes.accountCardTitle}>Communication & Chat</Typography>
                                                </div>

                                                <div className={classes.cardHeaderRight}>

                                                </div>

                                            </div>


                                            <Chat scrollHeight={"250px"} showUser={true}
                                                customerData={selectedCustomer.objCustomerInfo}
                                                phoneNumber={selectedCustomer?.lstWireless ? selectedCustomer?.lstWireless[0].mDN : ""}
                                                isUpdate={isUpdate}
                                                chatHeader={true}

                                            />
                                        </div>
                                    </Collapse>

                                </Grid> : null}
                        </TabPanel>


                        <TabPanel value={tabvalue} index={5} className={classes.tabPan}>
                            {tabvalue === 5 ?
                                <Grid container>
                                    <Collapse in={wirelessCardOpen} collapsedSize={65} className={classes.accountPaperCollapse}>

                                        <div className={classes.accountPaper} >

                                            <div className={classes.accountCardHeader}>

                                                <div className={classes.accountCardHeaderTitle}>
                                                    <Typography className={classes.accountCardTitle}>Acc. Footprints & Log</Typography>
                                                </div>

                                                <div className={classes.cardHeaderRight}>

                                                </div>

                                            </div>

                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="ViewLog"
                                                    onActionClick={handleActionClick}
                                                    list={activityRow}
                                                    isUpdate={isUpdate}
                                                    noRecordMsg="No activity log exists"
                                                    Icon={true}
                                                />
                                            </div>


                                        </div>
                                    </Collapse>

                                </Grid> : null}
                        </TabPanel>

                    </> : ''}
                </Grid >

            </Grid >
            {
                lineDetailsDialogState ? <LineDetailsDialog
                    dialogOpenClose={lineDetailsDialogState}
                    handleClose={() => setLineDetailsDialogState(false)}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    isPrepaid={!isPostpaid}
                    lineDetails={lineDetails}
                /> : null
            }
            {
                changePhoneNumberDialogState ? <ChangePhoneNumberDialog
                    dialogOpenClose={changePhoneNumberDialogState}
                    handleClose={() => setChangePhoneNumberDialogState(false)}
                    handleSuccessClose={handleSuccessClose}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    userName={selectedCustomer?.objCustomerInfo?.fullName}
                    emailAddress={selectedCustomer?.objCustomerInfo?.email}
                /> : null
            }

            {
                userDetailsDialogState ? <UsageDetailsDialog
                    dialogOpenClose={userDetailsDialogState}
                    handleClose={() => setUserDetailsDialogState(false)}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    lineUserName={lineUserName}
                    userName={selectedCustomer?.objCustomerInfo?.fullName}
                    emailAddress={selectedCustomer?.objCustomerInfo?.email}
                    billingCycle={selectedCustomer?.objCustomerInfo?.billingCycle}
                /> : null
            }

            {
                userSwapSim ? <SwapSim
                    dialogOpenClose={userSwapSim}
                    handleClose={() => setUserSwapSim(false)}
                    handleSuccessClose={handleSuccessClose}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    userName={selectedCustomer?.objCustomerInfo?.fullName}
                    emailAddress={selectedCustomer?.objCustomerInfo?.email}
                /> : null
            }

            {
                userCallForward ? <CallForward
                    dialogOpenClose={userCallForward}
                    handleClose={() => setUserCallForward(false)}
                    handleSuccessClose={handleSuccessClose}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    userName={selectedCustomer?.objCustomerInfo?.fullName}
                    emailAddress={selectedCustomer?.objCustomerInfo?.email}
                /> : null
            }
            {
                userChangeLineName ? <ChangeLineName
                    dialogOpenClose={userChangeLineName}
                    handleClose={() => setUserChangeLineName(false)}
                    handleSuccessClose={handleSuccessClose}
                    mdnNumber={mdnNumber}
                    accountNumber={accountNumber}
                    emailAddress={selectedCustomer?.objCustomerInfo?.email}
                /> : null
            }

            {
                monthlyUsageSummary ?
                    <MonthlyUsageSummary
                        dialogOpenClose={monthlyUsageSummary}
                        handleClose={() => setMonthlyUsageSummary(false)}
                        mdnNumber={mdnNumber}
                        accountNumber={accountNumber}
                        userName={selectedCustomer?.objCustomerInfo?.fullName}
                        emailAddress={selectedCustomer?.objCustomerInfo?.email}
                    ></MonthlyUsageSummary> : null
            }

            {
                customNotesDialog ?
                    <CustomNotesDialog
                        dialogOpenClose={customNotesDialog}
                        handleClose={() => setCustomNotesDialog(false)}
                        handleSuccessClose={handleSuccessClose}
                        mdnNumber={mdnNumber}
                        accountNumber={accountNumber}
                        userName={selectedCustomer?.objCustomerInfo?.fullName}
                        emailAddress={selectedCustomer?.objCustomerInfo?.email}
                        noteType={noteLevel}
                    ></CustomNotesDialog> : null
            }


            {
                viewCustomerNotes ?
                    <ViewCustomerNotes
                        dialogOpenClose={viewCustomerNotes}
                        handleClose={() => setViewCustomerNotes(false)}
                        handleSuccessClose={handleSuccessClose}
                        mdnNumber={mdnNumber}
                        accountNumber={accountNumber}
                        userName={selectedCustomer?.objCustomerInfo?.fullName}
                        emailAddress={selectedCustomer?.objCustomerInfo?.email}
                        noteType='LineLevel'
                    >
                    </ViewCustomerNotes> : null
            }

            {
                viewActivityLog ?
                    <ViewActivityLog
                        dialogOpenClose={viewActivityLog}
                        handleClose={() => setViewActivityLog(false)}
                        handleSuccessClose={handleSuccessClose}
                        mdnNumber={mdnNumber}
                        accountNumber={accountNumber}
                        userName={selectedCustomer?.objCustomerInfo?.fullName}
                        loadActivityLogType={loadActivityLogType}
                    >
                    </ViewActivityLog> : null
            }

            {
                activateNow ?
                    <ActivateNow
                        dialogOpenClose={activateNow}
                        handleClose={() => setActivateNow(false)}
                        handleSuccess={(accountNo, message) => { handleActivateNowSuccess(accountNo, message) }}
                        isPrepaid={isPrepaid}
                        customerInfo={selectedCustomer?.objCustomerInfo}
                        isEdit={isEditCustomerInfo}
                    ></ActivateNow>
                    : null
            }

            {
                activeNumber ?
                    <ActiveNumber
                        dialogOpenClose={activeNumber}
                        handleClose={() => { setActiveNumber(false) }}
                        handleSuccessClose={handleActivateNewLineClose}
                        customerNumber={selectedCustomer?.objCustomerInfo?.accountNumber}
                        customerName={selectedCustomer?.objCustomerInfo?.fullName}
                        accountNumber={accountNumber}
                        isPrepaid={isPrepaid}
                    ></ActiveNumber>
                    : null
            }

            {/* {
                changeShippingAddress ?
                    <ChangeShippingAddress
                        dialogOpenClose={changeShippingAddress}
                        handleClose={() => { setChangeShippingAddress(false) }}
                        handleSuccessClose={handleActivateNewLineClose}
                        addressType={addressType}
                    ></ChangeShippingAddress>
                    : null
            } */}

            {
                portANumber ?
                    <NewRegistrationDialog
                        dialogOpenClose={portANumber}
                        handleClose={() => setPortANumber(false)}
                    ></NewRegistrationDialog>
                    : null
            }

            {
                sendInvite ?
                    <SendInvite
                        dialogOpenClose={sendInvite}
                        customerData={selectedCustomer?.objCustomerInfo}
                        handleSuccessClose={handleInvitationSuccessClose}
                        handleClose={() => { setSendInvite(false) }} /> : ''
            }

            {linePortDialog ?
                <LinePortDialog
                    dialogOpenClose={() => openlinePortDialog()}
                    handleClose={() => closelinePortDialog()}
                    openActivateDialog={() => { showActivateNow() }}
                    openPortANumber={() => setPortANumber(true)} />
                : ''}

            {searchResultDialog ?
                <SearchResultDialog
                    dialogOpenClose={ShowSearchDialog}
                    handleClose={CloseSearchDialog}
                    onRowClick={onSearchRowClick}
                    SearchResultsList={searchResultsList}
                    searchTerm={searchTerm}
                >

                </SearchResultDialog> : ''}





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
            {
                changeShippingAddress ?
                    <ChangeShippingAddress
                        dialogOpenClose={changeShippingAddress}
                        handleClose={() => { setChangeShippingAddress(false) }}
                        handleSuccessClose={handleChangeAddressSuccessClose}
                        addressType={addressType}
                        accountNumber={accountNumber}
                        objAddress={objAddress}
                    ></ChangeShippingAddress>
                    : null
            }

            {
                showAccountSettings ?
                    <AccountSettings
                        dialogOpenClose={showAccountSettings}
                        handleClose={() => { setShowAccountSettings(false) }}
                        handleSuccessClose={handleSuccessClose}
                        accountNumber={accountNumber}
                    ></AccountSettings>
                    : null
            }

            {rechargeDialog ?
                <RechargeDialog dialogOpenClose={rechargeDialog}
                    userData={selectedCustomer?.objCustomerInfo}
                    handleSuccessClose={handleRechargeSuccessClose}
                    handleClose={() => { setRechargeDialog(false) }}
                /> : ''
            }

        </>
    )
}
export default withSnackbar(PrepaidWireless);

