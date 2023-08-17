import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import SearchGrid from '../../../../components/table/SearchGrid';
import { withSnackbar } from "./../../../../components/Message/Alert";
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import { loadNameInitials } from '../../../../../src/components/Common/Extensions';


import { formatDate, formateMdnNumber, numberDisplay, getFormatedDate, orderTrackStatus } from '../../../../../src/components/Common/Extensions';

function StatusSummary({ dialogOpenClose, handleClose, trackNumberDetails, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;

    var user = sessionStorage.getItem('user_info');
    var userdata = JSON.parse(user).user;

    const [errorMessages, setErrorMessages] = useState({});
    const [state, setState] = useState({});
    const [loginUser] = useState(JSON.parse(GetUserInfo()).user);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [shipmentActivityDetails, setShipmentActivityDetails] = useState([])
    const statusDetails = [
        {
            date: "June 05",
            activity: [
                {
                    message: "Delivered to shipping company for shipment",
                    time: "10:30 PM",
                    type: 'internal'
                },
                {
                    message: "Delivered to shipping company for shipment",
                    time: "10:30 PM"
                }
            ]
        },
        {
            date: "June 12",
            activity: [
                {
                    message: "Delivered to shipping company for shipment",
                    time: "10:30 PM",
                },
                {
                    message: "Delivered to shipping company for shipment",
                    time: "10:30 PM"
                }
            ]
        }
    ]

    const isEmptyOrSpace = (_value) => {
        // Check if the value is empty or contains only whitespace
        const isEmptyOrSpaces = /^\s*$/.test(_value);
        return isEmptyOrSpaces;
    }
    //addOrderActivity
    const saveManualComments = () => {
        let errorList = [];
        if (!state.comment || isEmptyOrSpace(state.comment)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorComment: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorComment: false
            }));
        }
        if (errorList < 1) {
            setIsLoading(true);
            var obj = { type: 'Manual', activityDetails: state.comment, trackingId: trackNumberDetails.trackingId, orderId: trackNumberDetails.orderId ? parseInt(trackNumberDetails.orderId) : 0 };
            PostDataAPI("figgorder/addOrderActivity", obj).then((result) => {
                setIsLoading(false);
                if (result.success) {
                    loadShipmentActivities();
                    state.comment = '';
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    const FirstLetter = ({ word }) => {
        const firstLetter = word.charAt(0).toUpperCase();
        return <span>{firstLetter}</span>;
    };

    const loadShipmentActivities = () => {
        setIsLoading(true);
        var obj = { orderInquiryNumber: trackNumberDetails.trackingNumber, trackingId: trackNumberDetails.trackingId, orderId: trackNumberDetails.orderId ? parseInt(trackNumberDetails.orderId) : 0 };
        console.log(obj)
        PostDataAPI("telispire/loadShipmentTrackDetails", obj).then((result) => {
            setIsLoading(false);
            if (result.success) {
                console.log(result.data)
                setShipmentActivityDetails(result.data);
            } else {
            }
        })
    }
    useEffect(() => {
        loadShipmentActivities();
        debugger
    }, []);

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="md"
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Status Summary</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>
                                <Grid row xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>

                                    <div className={classes.ListContain}>

                                        <div className={classes.addfield}>

                                        </div>

                                        <div className={classes.recentActivityList}>

                                            <Grid row container lg={12} alignItems="normal">
                                                <Grid item row lg={2} className="textRight">
                                                    <div className={classes.userDetail}>
                                                        <FirstLetter word={userdata.firstName} />     <FirstLetter word={userdata.lastName} />
                                                    </div>

                                                </Grid>
                                                <Grid item row lg={9} className={classes.borderContent}>
                                                    <TextareaField
                                                        name="comment"
                                                        rows={3}
                                                        placeholder="Leave a Comment"
                                                        MaxLength="2000"
                                                        onChange={handleChange}
                                                        value={state.comment}
                                                    ></TextareaField>
                                                    <div className={classes.floatRight}>
                                                        <Button className={classes.changeBtn} onClick={saveManualComments}>Submit</Button>
                                                    </div>
                                                    {errorMessages.errorComment && (!state.comment || isEmptyOrSpace(state.comment)) ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter comment
                                                    </FormHelperText>) : ('')}
                                                    <p>Only you and staff can view this comment</p>
                                                </Grid>

                                            </Grid>
                                        </div>


                                        {shipmentActivityDetails.map((item, i) => {
                                            return (
                                                <>
                                                    <div className={classes.recentActivityList}>

                                                        <Grid row container lg={12} alignItems="center">
                                                            <Grid item row lg={2} className="textRight">  </Grid>
                                                            <Grid item row className={classes.borderContent}><h2>{getFormatedDate(item[0].createDate, 'MMM DD,YYYY')}</h2> </Grid>
                                                        </Grid>
                                                    </div>

                                                    {item.map((activityItem, i) => {
                                                        return (
                                                            <>
                                                                <div className={classes.recentActivityList}>
                                                                    <Grid row container lg={12} alignItems="center">
                                                                        <Grid item row lg={2} className="textRight"> <span className={activityItem.type == "internal" ? classes.smallRadiusCustomer : classes.smallRadius}></span> </Grid>
                                                                        <Grid item row lg={9} className={classes.borderContent}>
                                                                            <div className={classes.flexRow}> <div style={{
                                                                                fontSize: '16px',
                                                                                whiteSpace: 'break-spaces',
                                                                                width: '80%'
                                                                            }}>
                                                                                {activityItem.activityDetails} </div>
                                                                                <span className={classes.contentTime}>
                                                                                    {getFormatedDate(activityItem.createDate, 'hh:mm A')}
                                                                                </span>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>

                                                                </div>

                                                            </>
                                                        )

                                                    })}








                                                    {/* <div className={classes.recentActivityList}>
                                                        <Grid row container lg={12} alignItems="center">
                                                            <Grid item row lg={2} className="textRight"> <span className={classes.smallRadius}></span> </Grid>
                                                            <Grid item row lg={9} className={classes.borderContent}>
                                                                <div className={classes.flexRow}> {item.Stage1}
                                                                    <span className={classes.contentTime}>
                                                                        {item.Stage1time}
                                                                    </span>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div> */}
                                                </>
                                            )
                                        })}




                                    </div>



                                </Grid>

                            </div>
                        </Scrollbars>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default withSnackbar(StatusSummary);