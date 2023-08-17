import React, { useState, useEffect, useRef } from 'react'
import { Typography, Input, Button } from '@material-ui/core';
import {
    Search as SearchIcon,
    Phone as PhoneIcon,
    MoreVert as MoreVertIcon,
    Send as SendIcon,
} from '@material-ui/icons'
import UserImage from '../../../../assets/img/profileImage.png';
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
import { Scrollbars } from 'rc-scrollbars';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { message, Tooltip, Row, Dropdown, Menu } from "antd";
import Avatar from 'antd/lib/avatar/avatar';
import Attachment from "../../../../assets/img/profileImage.png";
import profilePlaceholder from '../../../../assets/img/profilePlaceholder.jpg';
import EmailDialog from './../email/Email.js';
import CallDialog from './../call/Call.js';
import SMSDialog from './../sms/Sms.js';
import EnvelopeEmail from "../../../../assets/img/action/email-icon.svg";
import VideoIcon from "../../../../assets/img/action/video-icon.svg";
import CallIcon from "../../../../assets/img/action/call-icon.svg";
import Comment from "../../../../assets/img/action/comment-icon.svg";
import ChatIcon from "../../../../assets/img/status/commentBold.svg";
import SmsIconText from "../../../../assets/img/action/smsIcon.svg";
import EmailEnvalopStroke from "../../../../assets/img/status/emailEnvalopStroke.svg";
import ShowMoreIcon from "../../../../assets/img/action/dotShowMore.svg";
import SmsIcon from "../../../../assets/img/status/smsIcon.svg";
import AttachmentIcon from '@material-ui/icons/Attachment';
import PaperClip from '../../../../assets/img/status/paperclip-Bold.svg';

import ChatPhone from '../../../../assets/img/action/chatPhone.svg';
import ChatEmail from '../../../../assets/img/action/chatemail.svg';
import ChatMdn from '../../../../assets/img/action/chatmdn.svg';

import { ActionDialog } from "./../../../../components/ActionDialog/ActionDialog";
import VideoCallDialog from '../videoCall/VideoCall';
import VideoRoomDialog from '../videoCall/VideoRoom';
import { formatDate, formateMdnNumber, numberDisplay } from '../../../../../src/components/Common/Extensions';

import { withSnackbar } from "./../../../../components/Message/Alert";
import { allowedAttachments } from '../../../../common/allowedAttachments';

import useStyles from "./styles";
function Chat({ scrollHeight, showUser, isUpdate, customerData, reloadCustomer, phoneNumber, chatHeader, ...props }) {
    const [state, setState] = useState({});
    const chatFrom = 'Support';
    const scrollbarsRef = useRef(null);
    const commonAttachments = allowedAttachments();
    const scrollToBottom = () => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
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

    const { showMessage } = props;
    const [stateCall, setStateCall] = useState({ smsFromCode: 'Support', remarks: '' });
    //const [userID] = useState(1);
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
    const [customer, setCustomer] = useState({});
    const [loginUser] = useState(JSON.parse(GetUserInfo()).user);
    const [chatHistoryList, setChatHistoryList] = useState([]);
    const [errorChatText, setErrorChatText] = useState(false);
    const [loading, setLoading] = useState(false);
    var fileName = "";
    const inputFile = useRef(null);
    const [chatDocument, setChatDocument] = useState({ file: null, chatPhoto: null, chatPhotoName: null });
    const classes = useStyles();

    const [emailDialog, setEmailDialog] = useState(false);
    const [smsDialog, setSmsDialog] = useState(false)
    const [callDialog, setCallDialog] = useState(false)
    const [showVideoCallDialog, setShowVideoCallDialog] = useState(false);
    const [showVideoRoomDialog, setShowVideoRoomDialog] = useState(false);

    // const VideoMessage = () => {
    //     showMessage("Alert", "This feature is comming soon", "warning", 3000);
    // }


    const printChatLog = () => {
        showMessage("Alert", "This feature is comming soon", "warning", 3000);
    }

    const emailChatLog = () => {
        showMessage("Alert", "This feature is comming soon", "warning", 3000);
    }

    const emailDialogClose = () => {
        setEmailDialog(false)
    }
    const emailDialogOpen = () => {
        if (chatCustomerObj()?.accountNumber) {
            setEmailDialog(true)
        } else {
            message.error("Please select customer.", 2);
        }

    }

    const videoRoomOpen = () => {
        debugger;
        setShowVideoRoomDialog(true)
    }

    const videoRoomClose = () => {
        setShowVideoRoomDialog(false)
    }

    const videoDialogClose = () => {
        setShowVideoCallDialog(false)
    }
    const videoDialogOpen = () => {
        debugger
        if (chatCustomerObj()?.accountNumber) {
            setShowVideoCallDialog(true)
        } else {
            message.error("Please select customer.", 2);
        }

    }
    const removeFile = () => {
        setChatDocument({ file: null, chatPhoto: null, chatPhotoName: null });
    }
    const smsDialogOpen = () => {
        if (chatCustomerObj()?.accountNumber) {
            setSmsDialog(true)
        } else {
            message.error("Please select customer.", 2);
        }
    }
    const smsDialogClose = () => {
        setSmsDialog(false)
    }

    const callDialogOpen = () => {
        if (chatCustomerObj()?.accountNumber) {
            setCallDialog(true)
        } else {
            message.error("Please select customer.", 2);
        }
    }
    const callDialogClose = () => {
        setCallDialog(false)
    }

    const handleSuccessClose = (message) => {
        showMessage("Success", message, "success", 3000);
        smsDialogClose();
        emailDialogClose();
        callDialogClose();
        videoDialogClose();
        getChatHistory();
        if (reloadCustomer) {
            reloadCustomer();
        }
        setTimeout(() => {
            scrollToBottom()
        }, 100)

    }

    const onButtonClick = () => {
        inputFile.current.click();
    };
    const convertBytesToMegabytes = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(2);
    };
    function uploadSingleFile(e) {
        const file = e.target.files[0];
        if (file == null || file <= 0)
            return;
        const fileSize = convertBytesToMegabytes(file.size);
        if (fileSize > 10) {
            showMessage("Error", "File size must be less than 10 MB", "error", 3000);
            return;
        }
        const name = file.name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        switch (ext) {
            case commonAttachments[ext]:
                break;
            default:
                showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg", "error", 3000);
                return;
        }
        setChatDocument({
            file: URL.createObjectURL(file),
            chatPhoto: file,
            chatPhotoName: file.name
        })

    }

    const getFileName = (name) => {
        let filename = name.replace(/^.*[\\\/]/, '');

        return filename;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (value.length == 1) {
            setErrorChatText(false);
        }
    }

    const startCounter = () => {

        setTimeout(function () {
            getChatHistory();
        }, 1000);
    }

    const updateUnreadChat = (accountNumber) => {
        let reqData = {
            customerId: accountNumber,
            userId: userID
        }
        PostDataAPI("fwchat/getUpdatedUnreadChatHistory", reqData, true).then((result) => {

            if (result.success) {

            }

        })

    }

    function chatCustomerObj() {
        if (!sessionStorage.getItem('customerChatObj'))
            return null;
        var customer = null;
        try {
            customer = JSON.parse(sessionStorage.getItem('customerChatObj'));
        } catch (e) { }
        if (!customer || !customer.accountNumber)
            return null;
        else {
            return customer;
        }
    }

    const getChatHistory = () => {
        setCustomer(chatCustomerObj);
        if (chatCustomerObj() == null) {
            return;
        }
        updateUnreadChat(chatCustomerObj().accountNumber);
        let reqData = {
            customerId: chatCustomerObj().accountNumber.toString(),
            userId: userID?.toString()
        }
        PostDataAPI("fwchat/getChatHistory", reqData).then((result) => {
            if (result.success && result.data.length > 0) {
                startCounter();
                setChatHistoryList(
                    result.data.map((item, i) => {
                        let msgDate = "";
                        let msgTime = "";

                        if (item.messageDateTime != null && item.messageDateTime != "") {

                            let lastMsgTimeDateTime = item.messageDateTime.split('T');

                            msgDate = new Date(lastMsgTimeDateTime[0]).toDateString();

                            msgTime = new Date('1970-01-01T' + lastMsgTimeDateTime[1] + 'Z')
                                .toLocaleTimeString({},
                                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                                );

                            item.messageDateTime = msgDate + ' ' + msgTime;
                        }

                        return { ...item }
                    }));

            }
            else
                setChatHistoryList([]);


        })

    }

    function saveChat() {

        let success = true;

        if ((!state.chatText || state.chatText.trim() == "") && chatDocument.file === null) {
            setErrorChatText(true);
            success = false;
        }

        if (success == true) {
            let method = "fwchat/addChat";

            state.userId = userID;
            state.customerId = chatCustomerObj()?.accountNumber.toString();
            state.chatFromCode = chatFrom; // Patient OR Staff
            state.phoneNumber = phoneNumber;

            //-------------------- To Save File

            const formData = new FormData();

            for (var key in state) {
                if (state[key] && key != "fileName" && key != "formFile" && key != "encUserID")
                    formData.append(key, state[key]);
            }


            formData.append("ChatPhoto", chatDocument.chatPhoto);
            formData.append("ChatPhotoName", chatDocument.chatPhotoName);

            //--------------------
            setLoading(true);
            PostDataAPI(method, formData, true, '').then((result) => {
                setLoading(false);
                if (result.success == true) {
                    //  message.success("Record saved successfully.", 2);
                    getChatHistory();
                    setState(prevState => ({
                        ...prevState,
                        ['chatText']: ''
                    }))
                    setChatDocument({ file: null, chatPhoto: null, chatPhotoName: null });
                    if (reloadCustomer) {
                        reloadCustomer();
                    }
                    setTimeout(() => {
                        scrollToBottom()
                    }, 100)

                }
                else {
                    if (result.message = "SizeIncreased") {
                        message.warning("File size must be less than 10 MB", 3);
                    }
                    else
                        message.error(result.message, 2);
                }
            })
        } else {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (customerData && customerData.accountNumber) {
            sessionStorage.removeItem("customerChatObj");
            sessionStorage.setItem('customerChatObj', JSON.stringify(customerData));
        }
        getChatHistory();
        setTimeout(() => {
            scrollToBottom()
        }, 100)

    }, [isUpdate]);

    return (
        <>
            <div className={classes.chatContainer}>

                {chatHeader ?

                    <div className={classes.chatHeader}>
                        <div className={classes.headerRightSide}>
                            {showUser ?
                                <>
                                    <img src={chatCustomerObj()?.photoPath ? '.' + chatCustomerObj()?.photoPath : profilePlaceholder} alt="user" />
                                    <div>
                                        <span>
                                            <Typography className='userName'>{chatCustomerObj()?.firstName}</Typography>
                                            <Typography className='usercontact'>{chatCustomerObj()?.accountNumber}
                                                {chatCustomerObj()?.accountPhoneNumber ? <div className='displayContent'> |<img className={classes.userDIconsEmail} src={ChatPhone} /> <span className={classes.userDHeading}>:</span> </div> : ''}{formateMdnNumber(chatCustomerObj()?.accountPhoneNumber)}
                                                {chatCustomerObj()?.emailAddress ? <div className='displayContent'> | <img className={classes.userDIconsEmail} src={ChatEmail} /> <span className={classes.userDHeading}>:</span> </div> : ''}{chatCustomerObj()?.emailAddress}

                                                {chatCustomerObj()?.isPrepaid && chatCustomerObj()?.packageExpirationDate ?
                                                    <div className='displayContent'>
                                                        <span className={classes.userDHeading}> | Expiration Date:</span>  {formatDate(chatCustomerObj()?.packageExpirationDate)}
                                                    </div>
                                                    :
                                                    chatCustomerObj()?.isPrepaid && new Date(chatCustomerObj()?.packageExpirationDate) < new Date() ?
                                                        <div className='displayContent'> <span className={classes.userDHeading}> | Account Status: </span> Inactive</div>
                                                        : ''
                                                }


                                                {/* {chatCustomerObj()?.packageExpirationDate ? <div className='displayContent'> | <span className={classes.userDHeading}> Expiration Date:</span> </div> : ''}{formatDate(chatCustomerObj()?.packageExpirationDate)}*/}
                                            </Typography>
                                        </span>
                                    </div>
                                </> : ''
                            }

                        </div>
                        <div className={classes.headerLeftSize}>
                            <div className={classes.actionIcon}>

                                <Tooltip placement="top" title='Share video meeting link'>
                                    <img src={VideoIcon} onClick={()=>videoRoomOpen()} />
                                </Tooltip>
                                <Tooltip placement="top" title='Send email'>
                                    <img src={EnvelopeEmail} onClick={emailDialogOpen} />
                                </Tooltip>
                                <Tooltip placement="top" title='Log call'>
                                    <img src={CallIcon} onClick={callDialogOpen} />
                                </Tooltip>
                                <Tooltip placement="top" title='Send SMS'>
                                    <img src={SmsIconText} onClick={smsDialogOpen} className={classes.SmsIcon} />
                                </Tooltip>
                                <Tooltip placement="top" title='Show more'>
                                    <Dropdown overlay={<Menu>
                                        <Menu.Item
                                            className={classes.DropdownItems} onClick={printChatLog} >  Print Chat Log
                                        </Menu.Item>


                                        <Menu.Item
                                            className={classes.DropdownItems} onClick={emailChatLog}>  Email Chat Log
                                        </Menu.Item>

                                    </Menu>} trigger={["click"]}
                                        className={classes.actionDropDown}>
                                        <Button className={classes.showMoreButton}>
                                            <img src={ShowMoreIcon} />
                                        </Button>
                                    </Dropdown>
                                </Tooltip>

                            </div>
                        </div>
                    </div> : ''}

                <div>

                    <Scrollbars autoHeight autoHeightMin={scrollHeight} ref={scrollbarsRef}>
                        <div className={classes.listContainer}>


                            {
                                chatHistoryList?.map((item, index) => {
                                    if (item.chatFromCode == "Support") {
                                        return (
                                            <>
                                                <div>
                                                    <ul className={classes.messageList}>
                                                        <li className={classes.floatRight}>
                                                            <div className={classes.sendar}>

                                                                <img style={{ width: item.communicationType === "SMS" ? '30px' : '', margin: item.communicationType === "SMS" ? '0' : '' }} src={
                                                                    item.communicationType === "Chat" ? ChatIcon :
                                                                        item.communicationType === "Email" ? EnvelopeEmail :
                                                                            item.communicationType === "Call" ? CallIcon :
                                                                                item.communicationType === "SMS" ? SmsIconText : ''
                                                                } />

                                                                <div className={'sender'}>
                                                                    <Typography className='messageText' dangerouslySetInnerHTML={{
                                                                        __html: item.chatText,
                                                                    }}></Typography>
                                                                    {item.attachementFilePath ? <span className="attachment-span">
                                                                        <a target="_blank" style={{ display: "flex", color: '#00558d' }} href={"." + item.attachementFilePath}>
                                                                            <img src={PaperClip} />  <Typography className="attchment-message-text">{getFileName(item.attachementFilePath)}</Typography>
                                                                        </a>
                                                                        {/*<Avatar size="medium" className="chat-attachment" src={"." + item.attachementFilePath} />*/}
                                                                    </span> : ""}
                                                                    <Typography className='messageTime'>{item.messageDateTime}</Typography>
                                                                </div>
                                                            </div>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </>
                                        )

                                    }
                                    else if (item.chatFromCode == "Customer") {
                                        return (
                                            <>
                                                <div>
                                                    <ul className={classes.messageList}>
                                                        <li className={classes.floatLeft}>
                                                            <div className={classes.receiver}>

                                                                <img style={{ width: item.communicationType === "SMS" ? '30px' : '' }} src={
                                                                    item.communicationType === "Chat" ? ChatIcon :
                                                                        item.communicationType === "Email" ? EnvelopeEmail :
                                                                            item.communicationType === "Call" ? CallIcon :
                                                                                item.communicationType === "SMS" ? SmsIconText : ''
                                                                } />

                                                                <div className={'receiver'}>
                                                                    <Typography className='messageText' dangerouslySetInnerHTML={{
                                                                        __html: item.chatText,
                                                                    }}></Typography>
                                                                    {item.attachementFilePath ? <span className="attachment-span">

                                                                        <a target="_blank" style={{ display: "flex" }} href={"." + item.attachementFilePath}>
                                                                            <img src={PaperClip} /> <Typography className="attchment-message-text">{getFileName(item.attachementFilePath)}</Typography>
                                                                        </a>

                                                                    </span> : ""}
                                                                    <Typography className='messageTime'>{item.messageDateTime}</Typography>

                                                                </div>


                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </>
                                        )

                                    }
                                })

                            }



                        </div>
                        {/* <div>
                        {chatDocument.file != null ?
                            <Row justify="start" align="middle" style={{ display: 'flex' }}>
                                <Typography className={classes.attachmentLink}> <img src={PaperClip} />  {chatDocument.chatPhotoName}</Typography>
                            </Row> : ""
                        }
                    </div> */}

                    </Scrollbars>

                    {
                        errorChatText && !state.chatText ? (
                            <Typography color="secondary" className="error-message remarks">Please enter text </Typography>
                        ) : ("")
                    }

                    <div  className={classes.messageInputContainer} style={{width: chatHeader ? "97%" : "40%" , position: chatHeader ? '': 'fixed'}}>

                        {chatDocument.file != null ?
                            <Row justify="start" align="middle" className={classes.FileArea}>
                                <span className={classes.removeFile} onClick={removeFile}>X</span> <Typography className={classes.attachmentLink}> <img src={PaperClip} />  {chatDocument.chatPhotoName}</Typography>
                            </Row> : ""
                        }

                        <textarea
                            name="chatText"
                            id="chatText"
                            value={state.chatText}
                            onChange={handleChange}
                            placeholder="Type your message"
                            rows="1"
                            maxLength="4000"
                        />

                        <div className={classes.chatActions}>
                            <form>
                                <div>
                                    <input ref={inputFile} style={{ display: "none" }} type="file" id="fileUploadField" onChange={uploadSingleFile} accept=".png, .jpg, .jpeg, .xlsx, .pdf, .xml" />
                                </div>

                            </form>
                            <button
                                size="default"
                                gap={2}
                                className="chat-attachment-btn"
                                onClick={() => onButtonClick()}>
                                <AttachmentIcon />

                            </button>

                            <div className={classes.SendIcon}>
                                {loading ? <SendIcon /> : <SendIcon onClick={saveChat} />}
                            </div>


                        </div>

                    </div>
                </div>





            </div>
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
                emailDialog && chatCustomerObj()?.accountNumber ?
                    <EmailDialog dialogOpenClose={emailDialogOpen} handleClose={emailDialogClose}
                        handleSuccessClose={handleSuccessClose}
                        customerData={chatCustomerObj()}
                        phoneNumber={phoneNumber}
                    ></EmailDialog> : null
            }

            {
                callDialog && chatCustomerObj()?.accountNumber ?
                    <CallDialog dialogOpenClose={callDialogOpen} handleClose={callDialogClose}
                        handleSuccessClose={handleSuccessClose}
                        customerData={chatCustomerObj()}>
                    </CallDialog> : ''
            }

            {
                smsDialog && chatCustomerObj()?.accountNumber ?
                    <SMSDialog dialogOpenClose={smsDialogOpen}
                        handleClose={smsDialogClose}
                        handleSuccessClose={handleSuccessClose}
                        customerData={chatCustomerObj()} /> : null
            }
            {
                showVideoCallDialog && chatCustomerObj()?.accountNumber ? <VideoCallDialog
                    customerData={chatCustomerObj()}
                    showHide={showVideoCallDialog}
                    onClose={videoDialogClose}
                /> : null
            }

            {
                showVideoRoomDialog ? <VideoRoomDialog
                    showHide={showVideoRoomDialog}
                    onClose={videoRoomOpen}
                    roomName={'Room name'}
                    token={ 'token here'}
                /> : null
            }

        </>
    )
}

export default withSnackbar(Chat);