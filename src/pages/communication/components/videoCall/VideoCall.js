import React, { useState, useEffect } from 'react';
import { Input, Modal, Row, Typography, Col, Avatar, message } from "antd";
import moment from 'moment';
import { Button, Dialog, Icon, Select } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


//Custom Components
import { InputBaseField, SelectField } from "../../../../components/InputField/InputField";
import { Label, CustomBtn, DraggableComponent } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
// import { CommonAlerts } from "../../../../Common/CommonAlerts";
import { GetUserInfo } from '../../../../../src/Services/GetUserInfo';
import Profile from "../../../../assets/img/profilePlaceholder.jpg";
import EmailScheduleIcon from "../../../../assets/img/icons/call-email-icon.svg";
// import kaiserLogo from "../../../../images/kaiser-logo-white.png";
import { withSnackbar } from "../../../../components/Message/Alert";
import Scrollbars from 'rc-scrollbars';
import "./styles.css";
import useStyles from "./styles";

function VideoCall({ showHide, onClose, handleSuccessClose, customerData, videoMeetingId, meetingHeader, roomName, token, ...props }) {
    const { TextArea } = Input;
    const classes = useStyles();
    const { showMessage } = props;
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    let userID = JSON.parse(GetUserInfo()).user.userID;
    const newDate = new Date();
    const dateFormat = 'YYYY-MM-DD HH:mm:A';
    const customFormat = value => `${value.format(dateFormat)}`;

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({

        videoMeetingId: 0, customerId: customerData.customerId ,apptDate: moment(newDate).format('YYYY-MM-DDTHH:mm'),
        apptDuration: 30, appStatus: '', appLink: '', createDate: new Date().toISOString(), isDeleted: false,
        createdBy: parseInt(userID), updatedBy: 0


    });

    const [errorMessages, setErrorMessages] = useState({
        errorApptDate: false, errorApptDuration: false, errorApptInsurenceId: false
    });

    const [isUpdateGrid, setIsUpdateGrid] = useState("false");

    const [isReadOnly, setIsReadOnly] = useState(false);
    const [appointmentStaff, setAppointmentStaff] = useState([]);

    const durationOptions = [
        { label: '5 mins', value: 5 },
        { label: '10 mins', value: 10 },
        { label: '15 mins', value: 15 },
        { label: '20 mins', value: 20 },
        { label: '25 mins', value: 25 },
        { label: '30 mins', value: 30 },
        { label: '40 mins', value: 40 },
        { label: '50 mins', value: 50 },
        { label: '60 mins', value: 60 }
    ];


    useEffect(() => {
        console.log(customerData)
        console.log(JSON.parse(GetUserInfo()).user)
        cleanValuesFields();

        if (videoMeetingId > 0) {
            loadAppointmentMeetingData();
        }
        else {
            setState(prevState => ({
                ...prevState,
                customerId: customerData.customerId
            }))
        }

    }, [showHide]);

    function cleanValuesFields() {
       
        setState({
            videoMeetingId: 0, customerId: customerData.customerId, apptDate: moment(newDate).format('YYYY-MM-DDTHH:mm'),
            apptDuration: 30, appStatus: '', appLink: '', createDate: new Date().toISOString(), isDeleted: false,
            createdBy: parseInt(userID), updatedBy: 0
        });

        setErrorMessages({
            errorApptDate: false, errorApptDuration: false, errorApptInsurenceId: false
        });

    }

    const handleSelectChange = (name, value) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


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

    const loadAppointmentMeetingData = () => {

        PostDataAPI("videoMeeting/getVideoMeetingById", videoMeetingId).then((result) => {

            if (result.success && result.data != null) {

                setState(result.data);
            }
        })

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    function validateVideoMeeting(errorList) {

        if (state.apptDate === null || state.apptDate == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorApptDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorApptDate: false
            }));
        }

        if (state.apptDuration === null || state.apptDuration == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorApptDuration: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorApptDuration: false
            }));
        }

        if (videoMeetingId > 0) {
            if (new Date(state.apptDate) < new Date()) {
                message.error("appointment date should be greater to current date and time", 3);
                errorList.push(true);
            }

        }


    }

    function saveAppointmentMeeting() {
        let errorList = [];
        validateVideoMeeting(errorList);

        if (errorList.length < 1) {

            let method = "videoMeeting/addVideoMeeting";

            if (state.videoMeetingId > 0) {

                method = "videoMeeting/updateVideoMeeting";
                state.appStatus = "Scheduled";
            }

            state.customerId = customerData.accountNumber;
            setLoading(true);
            PostDataAPI(method, state, true, "").then((result) => {
                setLoading(false);
                if (result.success == true && result.data != null) {
                    setErrorMessages([]);
                    if (state.videoMeetingId < 1) {
                        handleSuccessClose("Appointment created successfully.");
                    } else {
                        handleSuccessClose("Appointment rescheduled successfully.");
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);

                }
            })
        }
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const UpdateGrid = () => {
        setIsUpdateGrid(isUpdateGrid ? false : true);
    }

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableEscapeKeyDown
            open={showHide}
            maxWidth="lg"
            PaperComponent={DraggableComponent}
            {...props} >
            <div className={classes.activeDialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>Schedule Video Meeting</Typography>
                        <Icon className={classes.closeIcon} onClick={onClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    <Scrollbars autoHeight autoHeightMax={570}>
                        <div className={classes.content}>
                            <Row>
                                <div className="v-call-user-header">
                                    <div className="v-call-user-box">
                                        <div className="v-call-user-avatar">
                                            <Avatar size={106} src={customerData?.photoPath ? "." + customerData?.photoPath : Profile} />
                                        </div>
                                        <div className="v-call-user-content">
                                            <span class="v-call-user-title">{customerData?.firstName}</span>
                                            <div class="v-call-user-area">
                                                <span class="v-call-user-dob">{customerData?.accountNumber}</span>
                                                <span class="v-call-user-dob">
                                                    <img src={EmailScheduleIcon} alt="email" />{customerData?.email}</span>
                                            </div>
                                            <div class="v-call-user-area">
                                                <span className='scheduled-date-time-text'>Scheduled Date/Time : </span>{' '}
                                                <span class="scheduled-date-time">{ ' ' + moment(state.apptDate).format("MM/DD/YYYY hh:mm A")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Row gutter={16} className="video-call-row">
                                <Col span={12}>
                                    <Label title="Date - Time" mandatory={true} />
                                    <InputBaseField
                                        type="datetime-local"
                                        name="apptDate"
                                        id="apptDate"
                                        value={state.apptDate}
                                        onChange={handleChange}
                                        disabledDate={disabledDate}
                                        allowClear={false}
                                        min={new Date().toISOString().split('T')[0] + "T00:00"}
                                    />
                                    {
                                        errorMessages.errorApptDate && !state.apptDate ? (
                                            <Typography color="secondary" className="error-message"> Please select appointment date </Typography>
                                        ) : ("")
                                    }
                                </Col>
                                <Col span={12}>
                                    <Label title="Duration" mandatory={true} />
                                    <SelectField name="apptDuration" options={durationOptions} value={state.apptDuration} onChange={handleSelectChange} />
                                   
                                    {
                                        errorMessages.errorApptDuration && !state.apptDuration ? (
                                            <Typography color="secondary" className="error-message"> Please select appointment duration </Typography>
                                        ) : ("")
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Typography className="footer-content">
                                    SMS and email containing the meeting link will be sent to the customer.
                                </Typography>
                            </Row>
                        </div>
                    </Scrollbars>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <Button className={classes.backBtn} onClick={onClose}>Close</Button>
                            {loading ? <Button className={classes.changeBtn} >SChedule meeting</Button> :
                                <Button className={classes.changeBtn} onClick={saveAppointmentMeeting}>Schedule meeting</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default withSnackbar(VideoCall)
