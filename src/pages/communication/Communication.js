import React, { useState, useEffect } from 'react'
import { Badge, Input, InputAdornment, Typography } from '@material-ui/core';
import {
    Menu as MenuIcon,
    Search as SearchIcon
} from '@material-ui/icons';
import BreadcrumComponent from "../../components/BreadCrums/breadcrums";
import UserImage from '../../assets/img/profileImage.png';
import ClearIcon from '@material-ui/icons/Clear';
import Chat from './components/chat/Chat';
import UserPanel from './components/userpanel/UserPanel';
import { Scrollbars } from 'rc-scrollbars';
import { formatDateTime, formatTime, getFormatedDate, communicationFormatedDate } from '../../components/Common/Extensions';

import useStyles from "./styles";
import { PostDataAPI } from '../../../src/Services/PostDataAPI';
import { GetUserInfo } from '../../Services/GetUserInfo';
import profilePlaceholder from '../../assets/img/profilePlaceholder.jpg';
import { CustomBtn } from '../../components/UiElements/UiElements';
import { useLocation } from "react-router-dom"

function Communication({ ...props }) {
    const classes = useStyles();
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [customerList, setCustomerList] = useState([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [showChat, setShowChat] = useState(true);
    let isFirstTime = true;
    const [showToggle, setShowToggle] = useState(true);
    const [loading, setLoading] = useState(false);

    const Togglecollapse = () => {
        if (showToggle == true) {
            setShowToggle(false)
        } else {
            setShowToggle(true)
        }
    }

    const handleUpdate = () => {
        setIsUpdate(!isUpdate);
    }
    const [search, setSearchValue] = useState({searchValue:''});

    const onSearchChange = (e) => {
        const { name, value } = e.target;
        sessionStorage.setItem('customerSearchValue', value);
        setSearchValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        loadCustomers();
    }

    const handleClearInput = (name) => {
        sessionStorage.setItem('customerSearchValue', '');
        setSearchValue(prevState => ({
            ...prevState,
            [name]: ''
        }))
        loadCustomers();
    };

    const [selectedCustomer, setSelectedCustomer] = useState({});

    function loadCustomers() {
        let reqData = {
            customerName: sessionStorage.getItem('customerSearchValue') ? sessionStorage.getItem('customerSearchValue'):'',//search.searchValue,
            userId: userID?.toString()
        }
       
        setLoading(true);
        PostDataAPI("customer/loadCustomers", reqData).then((result) => {
            setLoading(false);
            if (result.success && result.data.length > 0) {
                setCustomerList(
                    result.data.map((item, i) => {
                        item.fullName = item.firstName + ' ' + item.lastName
                        return { ...item }
                    }));

                if (isFirstTime) {
                    isFirstTime = false;
                    setSelectedCustomer(result.data[0]);
                    sessionStorage.removeItem("customerChatObj");
                    sessionStorage.setItem('customerChatObj', JSON.stringify(result.data[0]));
                }
                var ui = GetUserInfo();
                if (ui)
                    startCounter();
                handleUpdate();
            }
            else {
                setCustomerList([]);
            }

        })
    }

    function reloadCustomerList() {
        loadCustomers(search);
    }

    function handleCustomerSelection(customer) {

        setShowChat(false);
        setSelectedCustomer(customer);
        sessionStorage.removeItem("customerChatObj");
        sessionStorage.setItem('customerChatObj', JSON.stringify(customer));

        setTimeout(function () {
            setShowChat(true);
            handleUpdate();
        }, 100);

    }

    const startCounter = () => { setTimeout(function () { loadCustomers(); }, 9000); }
    useEffect(() => {
        loadCustomers()
        return () => {
            sessionStorage.removeItem("customerChatObj");
            sessionStorage.removeItem('customerSearchValue')
        }
    }, []);

    return (
        <>
            <div className={classes.appBarSpacer} />
            <div className={classes.header}>
                <BreadcrumComponent parentLink="Communications" >Communications</BreadcrumComponent>
                <div className={classes.rightHeader}>
                    {/* <CustomBtn id="addButtonBorder" btnType="primary" className={classes.smButton} customClass={true} shape="round"> Add New Line</CustomBtn> */}
                </div>
            </div>
            <div className={classes.container}>
                <div className={showToggle ? classes.leftContainer : classes.leftContainerToggle}>



                    <div className={classes.leftHeader}>
                        <MenuIcon color='#707991' onClick={Togglecollapse} />
                        <Input
                            id='searchValue'
                            name='searchValue'
                            value={search.searchValue}
                            type='search'
                            disabled={false}
                            placeholder='Search'
                            // className={"custom-input"}
                            autoComplete="off"
                            endAdornment={search.searchValue ? <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { handleClearInput('searchValue') }} /> : ''}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            onChange={onSearchChange}
                        />

                    </div>
                    <div className={classes.userListContainer}>
                        <div style={{ height: '100vh', }}>
                            <Scrollbars style={{ height: '90%' }}>
                                <ul className={classes.userList}>
                                    {
                                        customerList.map((customer, index) => {
                                            return <li className={customer.accountNumber === selectedCustomer.accountNumber ? 'active' : ''} onClick={() => handleCustomerSelection(customer)}>
                                                <img src={customer.photoPath ? '.' + customer.photoPath : profilePlaceholder} alt="user" />
                                                <div >
                                                    <span >
                                                        <Typography className='userName'>{customer.firstName}</Typography>
                                                        <Typography className='messageTime'>{communicationFormatedDate(customer.messageDateTime)}</Typography>
                                                    </span>
                                                    <span >
                                                        <Typography className='messageText'>{customer.chatText}</Typography>
                                                        {customer.unreadCount > 0 && <Badge badgeContent={customer.unreadCount} color="#0686D8" />}
                                                        {/* <Typography className={classes.messageCount}></Typography> */}
                                                    </span>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </Scrollbars >
                        </div>
                    </div>



                    {/* <Scrollbars autoHeight autoHeightMax={window.max1550 ? "540px" : "600px"}>
              
                    </Scrollbars> */}
                </div>
                <div style={{ height: '100vh', width: '50%' }}>
                    <div className={classes.rightContainer}>
                        <Chat
                            scrollHeight={window.max1550 ? "540px" : "600px"}
                            showUser={true}
                            chatHeader={false}
                            isUpdate={isUpdate}
                            reloadCustomer={reloadCustomerList} />
                    </div>
                </div>


                <div className={classes.userPanel}>
                    <div style={{ height: '100vh' }}>
                        <Scrollbars style={{ height: '100%' }}>
                            <UserPanel showUser={true} isUpdate={isUpdate} handleSuccessClose={reloadCustomerList} ></UserPanel>
                        </Scrollbars>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Communication