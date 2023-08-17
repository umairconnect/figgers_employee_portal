import React, { useState, useEffect } from 'react'

import { Button, Collapse, Dialog, Grid, Icon, Typography } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import SearchGrid from '../../../../components/table/SearchGrid';
import { PostDataAPI } from '../../../../Services/APIService';
import NoRecord from "./../../../../components/NoRecord/NoRecord";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { formatDateTime, formateMdnNumber } from '../../../../components/Common/Extensions';
import Moment from 'moment';
import useStyles from "./styles";

function ViewActivityLog({ dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [isLoading, setIsLoading] = useState(false);


    const [activityRow, setActivityRow] = useState([])
    const [isUpdate, setIsUpdate] = useState(false);
    const handleUpdate = () => {
        setIsUpdate(!isUpdate);
    }
    //function to load customer notes
    const LoadActivityLog = () => {
        var method = "telispire/loadActivityLogByMdnNumber";
        if (props.loadActivityLogType == "Customer") {
            var method = "telispire/loadActivityLogByCustomer";
        }
        const getParams = [props.loadActivityLogType == "Customer" ? props.accountNumber : props.mdnNumber];
        setIsLoading(true)
        PostDataAPI(method, getParams, true).then((result) => {
            setIsLoading(false)
            console.log(result.data);
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

    useEffect(() => {
        LoadActivityLog();
    }, []);

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogOpenClose}
            PaperComponent={DraggableComponent}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        <Typography className={classes.title}>View Log</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                            <Grid row className={classes.marginTopTwenty}>
                                <SearchGrid columns="ActivityLog"
                                    list={activityRow}
                                    isUpdate={isUpdate}
                                    noRecordMsg="No activity log exists" />
                            </Grid>

                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>
                            <Button className={classes.changeBtn} onClick={handleClose}>Close</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default ViewActivityLog;