import React, { useState, useEffect } from 'react';
import { Input, Modal, Row, Typography, Col, Avatar, message } from "antd";
import moment from 'moment';
import { Button, Dialog, Icon, Select } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


//Custom Components
import { InputBaseField, SelectField } from "../../../../components/InputField/InputField";
import { Label, CustomBtn } from "../../../../components/UiElements/UiElements";
import { PostDataAPI } from '../../../../../src/Services/PostDataAPI';
// import { CommonAlerts } from "../../../../Common/CommonAlerts";
import { GetUserInfo } from '../../../../../src/Services/GetUserInfo';
import Profile from "../../../../assets/img/profilePlaceholder.jpg";
import EmailScheduleIcon from "../../../../assets/img/icons/call-email-icon.svg";
// import kaiserLogo from "../../../../images/kaiser-logo-white.png";
import { withSnackbar } from "../../../../components/Message/Alert";
import Scrollbars from 'rc-scrollbars';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
//styles
import "./styles.css";
import useStyles from "./styles";
import Video from "twilio-video";

function VideoRoom({ showHide, onClose, showMessage, roomName, token, ...props }) {
    const { TextArea } = Input;
    const classes = useStyles();
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    const connectToRoom = async () => {
        try {
            Video.connect(token,
                {
                    name: roomName
                }
            )
                .then((room) => {
                    setRoom(room);
                    room.on("participantConnected", participant => {
                        setParticipants(prevParticipants => [...prevParticipants, participant]);
                    });
                    room.on("participantDisconnected", participant => {
                        setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
                    });
                })
                .catch(error => {
                    console.log("Error connecting to Twilio Video:", error);
                });
        } catch (error) {
            console.error("Error connecting to Twilio Video:", error);
        }
    };

    useEffect(() => {
        connectToRoom();
        // Cleanup: disconnect from the room when component unmounts
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [token, roomName]);

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
                        <Typography className={classes.title}>Room</Typography>
                        <Icon className={classes.closeIcon} onClick={onClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    <Scrollbars autoHeight autoHeightMax={1000}>
                        <h2>Room: {roomName}</h2>
                        <div>
                            {participants.map(participant => (
                                <div key={participant.sid}>
                                    <p>{participant.identity}</p>
                                    <video  ref={participant.videoTracks.length > 0 ? participant.videoTracks[0].attach : null} autoPlay playsInline />
                                </div>
                            ))}
                        </div>
                    </Scrollbars>
                    <div className={classes.footer}>
                        <div className={classes.footerRight}>
                            <Button className={classes.backBtn} onClick={onClose}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
        // {/* </Modal> */}
    )
}

export default withSnackbar(VideoRoom)
