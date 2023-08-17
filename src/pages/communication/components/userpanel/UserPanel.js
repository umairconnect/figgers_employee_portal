import React, { useState, useEffect, useRef } from 'react'
import { Typography, Grid, Button } from '@material-ui/core';
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
import Image1 from '../../../../assets/img/image1.jpg';
import Image2 from '../../../../assets/img/image2.jpg';
import IconPDF from '../../../../assets/img/icon_pdf2.png';

import LocateIcon from '../../../../assets/img/action/locate.svg';
import NoRecord from '../../../../components/NoRecord/NoRecord';

import { ActionDialog } from "./../../../../components/ActionDialog/ActionDialog";
import VideoCallDialog from '../videoCall/VideoCall';
import VideoRoomDialog from '../videoCall/VideoRoom';
import { formatDate, formateMdnNumber, numberDisplay } from '../../../../../src/components/Common/Extensions';

import { withSnackbar } from "./../../../../components/Message/Alert";

import useStyles from "./styles";
function UserPanel({ scrollHeight, showUser, handleSuccessClose, phoneNumber, isUpdate, ...props }) {
    const [state, setState] = useState({});
    const chatFrom = 'Support';
    const scrollbarsRef = useRef(null);

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
    const [customerAttachementsList, setCustomerAttachementsList] = useState([]);
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
    const [roomName, setRoomName] = useState('');
    const [twilioToken, setTwilioToken] = useState('');


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
        let reqData = {
            roomName: 'HamadRoom',
            identity: '16841302'
        }
        PostDataAPI("fwchat/getTwilioVideoToken", reqData).then((result) => {
            if (result.success && result.data.length > 0) {
                setRoomName('HamadRoom');
                setTwilioToken(result.data);
                setShowVideoRoomDialog(true)
            }
            else {
                setCustomerAttachementsList([]);
            }
        })
    }

    const videoRoomClose = () => {
        setShowVideoRoomDialog(false)
    }
    const videoDialogClose = () => {
        setShowVideoCallDialog(false)
    }
    const videoDialogOpen = () => {
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

    const handleSuccessDialogClose = (message) => {
        showMessage("Success", message, "success", 3000);
        smsDialogClose();
        emailDialogClose();
        callDialogClose();
        videoDialogClose();
        handleSuccessClose();
    }

    const loadChatAttachments = () => {
        let reqData = {
            customerId: chatCustomerObj()?.accountNumber.toString(),
            userId: userID?.toString()
        }

        PostDataAPI("fwchat/getChatAttachments", reqData).then((result) => {
            if (result.success && result.data.length > 0) {
                console.log(result.data)
                setCustomerAttachementsList(result.data);
            }
            else {
                setCustomerAttachementsList([]);
            }
        })
    }

    const validateLink = (link) => {
        const fileExtension = link.substring(link.lastIndexOf('.') + 1);
        if (fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg') {
            return '.' + link;
        } else {
            return IconPDF;
        }
    }

    const openAttachment = (_link) => {
        window.open(_link, '_blank');
    }

    const startAVideoMeeting = () => {
        updateAppointmentStatus(1, "Started", 2);

        var params = {
            code: "customer_video_call_info",
            parameters: [userID.toString()]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data.length > 0) {

                var data = {

                    examRoomId: result.data[0].t1,
                    staffConfId: result.data[0].t2,
                    customerConfId: result.data[0].t3

                }

                PostDataAPI("videoMeeting/startVideoMeeting", data).then((result) => {

                    if (result.success && result.data != null) {
                        window.open(result.data, '_blank');
                    }
                })

            }

        })
    }

    function updateAppointmentStatus(videoMeetingId, Status, decision) {

        var data = {
            id: videoMeetingId,
            status: Status
        }

        if (decision === 1) {

            showActionDialog('Are you sure, you want to cancel this appointment?', "confirm", function () {


                PostDataAPI("videoMeeting/updateAppointmentStatus", data).then((result) => {

                    if (result.success && result.data != null) {
                        //  UpdateGrid();
                    }
                });

            })

        }
        else {
            PostDataAPI("videoMeeting/updateAppointmentStatus", data).then((result) => {

                if (result.success && result.data != null) {
                    //UpdateGrid();
                }
            });
        }

    }



    useEffect(() => {
        if (chatCustomerObj()?.accountNumber) {
            loadChatAttachments();
        }

        //if (customerData && customerData.accountNumber) {
        //    sessionStorage.removeItem("customerChatObj");
        //    sessionStorage.setItem('customerChatObj', JSON.stringify(customerData));
        //}
        //getChatHistory();
        //setTimeout(() => {
        //    scrollToBottom()
        //}, 100)

    }, [isUpdate]);

    return (
        <>

            <div className={classes.panelContainer}>

                <Grid row>
                    {showUser ?
                        <>
                            <div className={classes.profileData}>
                                <img onerror={profilePlaceholder} src={chatCustomerObj()?.photoPath ? '.' + chatCustomerObj()?.photoPath : profilePlaceholder} alt="user" />
                                <h3> {chatCustomerObj()?.firstName} </h3>
                                {
                                    chatCustomerObj()?.homeState ? <h4> <img src={LocateIcon} />{chatCustomerObj()?.homeState}, {chatCustomerObj()?.homeCountry} {chatCustomerObj()?.homeZip} </h4> : ''
                                }

                            </div>

                            <Grid row>
                                <div className={classes.actionIcon}>
                                    {/*<Tooltip placement="top" title='Start Meeting'>*/}
                                    {/*    <img src={VideoIcon} onClick={startAVideoMeeting} />*/}
                                    {/*</Tooltip>*/}
                                    <Tooltip placement="top" title='Share video meeting link'>
                                        <img src={VideoIcon} onClick={videoDialogOpen} />
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
                            </Grid>

                            <hr></hr>

                            <div className={classes.accountDetails}>

                                <div className='displayContent'> <img className={classes.userDIcons} src={ChatMdn} /> {chatCustomerObj()?.accountNumber} </div>

                                {chatCustomerObj()?.accountPhoneNumber ?
                                    <div className='displayContent'>
                                        <img className={classes.userDIconsEmail} src={ChatPhone} />
                                        <span className={classes.userDHeading}></span>  {formateMdnNumber(chatCustomerObj()?.accountPhoneNumber)}
                                    </div> : ''}

                                {chatCustomerObj()?.emailAddress ?
                                    <div className='displayContent'>
                                        <img className={classes.userDIconsEmail} src={ChatEmail} />
                                        <span className={classes.userDHeading}></span>  {chatCustomerObj()?.emailAddress}
                                    </div>
                                    : ''}

                                {chatCustomerObj()?.isPrepaid && chatCustomerObj()?.packageExpirationDate ?
                                    <div className='displayContent'>
                                        <span className={chatCustomerObj()?.packageExpirationDate && new Date(chatCustomerObj()?.packageExpirationDate) > new Date() ? classes.expiryDate : classes.expiryDatePast}> Expiration Date: {formatDate(chatCustomerObj()?.packageExpirationDate)}</span>
                                    </div>
                                    : chatCustomerObj()?.isPrepaid && new Date(chatCustomerObj()?.packageExpirationDate) < new Date() ? <div className='displayContent'> <span className={classes.expiryDatePast}>Account Status: Inactive</span> </div> : ''}




                            </div>
                            <hr></hr>

                            <div className={classes.attachment}>
                                <div className={classes.attachmentHead}>
                                    <h3> Attachements </h3>
                                    {/*<h4>View All</h4>*/}
                                </div>


                                {customerAttachementsList.length > 0 ?
                                    <> <div className={classes.chatAttachmentPanel}>


                                        {customerAttachementsList.map((item, index) => (
                                            <img src={validateLink(item.attachementFilePath)} onClick={() => { openAttachment('.'+item.attachementFilePath) }} />
                                        ))}
                                    </div>
                                    </>
                                    :
                                    <NoRecord Icon={true} message="No attachment exist"></NoRecord>

                                }

                            </div>
                        </> : ''
                    }
                </Grid>


            </div >

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
                        handleSuccessClose={handleSuccessDialogClose}
                        customerData={chatCustomerObj()}
                        phoneNumber={phoneNumber}
                    ></EmailDialog> : null
            }

            {
                callDialog && chatCustomerObj()?.accountNumber ?
                    <CallDialog dialogOpenClose={callDialogOpen} handleClose={callDialogClose}
                        handleSuccessClose={handleSuccessDialogClose}
                        customerData={chatCustomerObj()}>
                    </CallDialog> : ''
            }

            {
                smsDialog && chatCustomerObj()?.accountNumber ?
                    <SMSDialog dialogOpenClose={smsDialogOpen}
                        handleClose={smsDialogClose}
                        handleSuccessClose={handleSuccessDialogClose}
                        customerData={chatCustomerObj()} /> : null
            }
            {
                showVideoCallDialog && chatCustomerObj()?.accountNumber ? <VideoCallDialog
                    customerData={chatCustomerObj()}
                    showHide={showVideoCallDialog}
                    onClose={videoDialogClose}
                    handleSuccessClose={handleSuccessDialogClose}
                /> : null

            }
            {
                showVideoRoomDialog ? <VideoRoomDialog
                    showHide={showVideoRoomDialog}
                    onClose={videoRoomClose}
                    roomName={roomName}
                    token={twilioToken}
                /> : null
            }

        </>
    )
}

export default withSnackbar(UserPanel);