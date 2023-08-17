import React, { useState, useEffect } from 'react'

import { Button, Collapse, Dialog, Grid, Icon, Typography } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { PostDataAPI } from '../../../../Services/APIService';
import SearchGrid from '../../../../components/table/SearchGrid';
import { formateMdnNumber, formatSizeUnits, getSizeUnit, convertMinToHours, formatDateByFormate } from '../../../../components/Common/Extensions';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import callicon from '../../../../assets/img/icons/callicon.svg';
import messageico from '../../../../assets/img/icons/messageico.svg';
import dataIco from '../../../../assets/img/icons/dataIcon.svg';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';

import Moment from 'moment';
import useStyles from "./styles";

function UsageDetailsDialog({ dialogOpenClose, handleClose, ...props }) {
    const classes = useStyles();
    const [isUpdate, setIsUpdate] = useState(false);
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [userName, setUserName] = useState(props.lineUserName);
    const [billingCycle, setBillingCycle] = useState(props.billingCycle);
    const [isLoading, setIsLoading] = useState(false);
    const [stateDate, setStateDate] = useState({
        fromDate: getPreviousDate(),
        toDate: new Date().toString()
    });
    function getPreviousDate() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1).toString();
    }
    const [state, setState] = useState({
        usageSummaryTextSMS: {},
        usageSummaryTextMMS: {},
        usageSummaryTextIntl: {},
        usageSummaryVoicePeak: {},
        usageSummaryVoiceOff_Peak: {},
        usageSummaryVoiceIntl: {},
        usageSummaryVoiceIntl_Roaming: {},
        usageSummaryData3G: {},
        usageSummaryData4G: {},
        usageSummaryData5G: {},
        usageSummaryDataRoaming: {},
        usageSummaryDataIntl_Roaming: {}

    });

    const getUsageDetail = (month) => {
        let fromDate = '';
        let toDate = '';
        var currentDate = new Date();
        var billingCycleDate = '';
        if (currentDate.getDate() <= billingCycle) {
            billingCycleDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, billingCycle);
        }
        else {
            billingCycleDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), billingCycle);
        }


        if (month == 'Current') {
            fromDate = billingCycleDate;
            toDate = new Date(billingCycleDate.getFullYear(), billingCycleDate.getMonth() + 1, billingCycleDate.getDate() - 1);
        } else {
            fromDate = new Date(billingCycleDate.getFullYear(), billingCycleDate.getMonth() - 1, billingCycleDate.getDate());
            toDate = new Date(billingCycleDate.getFullYear(), billingCycleDate.getMonth(), billingCycleDate.getDate() - 1);
        }
        setStateDate(prevState => ({
            ...prevState,
            ['fromDate']: fromDate.toString(),
            ['toDate']: toDate.toString()

        }))
        var obj = {
            MDN: mdnNumber,
            dateFrom: formatDateByFormate(stateDate.fromDate, "YYYY-MM-DD"),
            dateTo: formatDateByFormate(stateDate.toDate, "YYYY-MM-DD"),
            accountNumber: accountNumber
        };
        //var obj = {
        //    MDN: '8505452402',
        //    dateFrom: '2021-01-01',
        //    dateTo: '2024-12-31',
        //    accountNumber: accountNumber
        //};
        setIsLoading(true)
        PostDataAPI("telispire/loadLineUsageDetails", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                console.log(result.data);
                result.data.usageSummaryVoice.map((item) => {
                    setState(prevState => ({
                        ...prevState,
                        ['usageSummaryVoice' + item.usageType.replace(" ", "_")]: item
                    }))
                })
                result.data.usageSummaryText.map((item) => {
                    setState(prevState => ({
                        ...prevState,
                        ['usageSummaryText' + item.usageType.replace(" ", "_")]: item
                    }))
                })
                result.data.usageSummaryData.map((item) => {
                    setState(prevState => ({
                        ...prevState,
                        ['usageSummaryData' + item.usageType.replace(" ", "_")]: item
                    }))
                })
                setIsUpdate(true)
                setTimeout(() => {
                    setIsUpdate(false)
                }, 1000);
            } else {
            }
        })
    }

    function setPreviousMonthDates() {
        var currentDate = new Date(billingCycle);
        //var fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, billingCycle);
        //var toDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, billingCycle);
        var fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, currentDate.getDate());
        var toDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        setStateDate(prevState => ({
            ...prevState,
            ['fromDate']: fromDate.toString(),
            ['toDate']: toDate.toString()

        }))
    }

    function setCurrentMonthDates() {
        var currentDate = new Date(billingCycle);
        var fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        var toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        setStateDate(prevState => ({
            ...prevState,
            ['fromDate']: fromDate.toString(),
            ['toDate']: toDate.toString()
        }))
    }

    const [usageMonth, setUsageMonth] = React.useState('Current');

    const UsageMonthChange = (event, newMonth) => {
        setUsageMonth(newMonth);
        //if (newMonth == 'Last') {
        //    setPreviousMonthDates()
        //} else {
        //    setCurrentMonthDates()
        //}
        getUsageDetail(newMonth);
    };

    useEffect(() => {
        //setCurrentMonthDates();
        getUsageDetail(usageMonth);
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
                        <Typography className={classes.title}>Usage Details - {formateMdnNumber(props.mdnNumber)}</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                    </div>
                    <div className={classes.content}>
                        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                            {isLoading ? <DialogLoader></DialogLoader> : ''}
                            <div className={classes.container}>

                                <Grid container className={classes.toggleSwitch}>
                                    <ToggleButtonGroup size="small" value={usageMonth} exclusive onChange={UsageMonthChange}>
                                        <ToggleButton value="Current">
                                            Current Bill Cycle
                                        </ToggleButton>
                                        <ToggleButton value="Last">
                                            Last Bill Cycle
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </Grid>

                                <Grid container>
                                    <Grid row className={classes.blueBar}>
                                        <p> Account: {accountNumber}</p>
                                        {/* <p> Phone #: (914) 960-9238</p> */}
                                        <p> Date: {formatDateByFormate(new Date(), "dddd, MMMM DD, YYYY")}</p>
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.headingH5}>
                                    <Grid row>
                                        {/*<h5> Monday, March 02, 2023 - Sunday, March 09, 2023  </h5>*/}
                                        <h5> {formatDateByFormate(stateDate.fromDate, "dddd, MMMM DD, YYYY")} - {formatDateByFormate(stateDate.toDate, "dddd, MMMM DD, YYYY")}  </h5>
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    <Grid row container spacing={20} lg={11} style={{ margin: 'auto' }}>

                                        <Grid lg={4}>
                                            <div className={classes.contentBox}>
                                                <div className={classes.contentBoxIco}><img src={callicon} /></div>
                                                <h3>Calls </h3>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>Peak </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={6} className={classes.dBlock}>
                                                            <b> Calls</b>
                                                            <span>{state.usageSummaryVoiceOff_Peak.calls ? parseInt(state.usageSummaryVoiceOff_Peak.calls).toLocaleString() : '0'}</span>
                                                        </Grid>
                                                        <Grid lg={6} className={classes.dBlock}>
                                                            <b> Duration</b>
                                                            <span>{state.usageSummaryVoiceOff_Peak.minutes ? convertMinToHours(state.usageSummaryVoiceOff_Peak.minutes) : '0 mins'}</span>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>International </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={6} className={classes.dBlock}>
                                                            <b> Calls</b>
                                                            <span>{state.usageSummaryVoiceIntl.calls ? parseInt(state.usageSummaryVoiceIntl.calls).toLocaleString() : '0'}</span>
                                                        </Grid>
                                                        <Grid lg={6} className={classes.dBlock}>
                                                            <b> Duration</b>
                                                            <span>{state.usageSummaryVoiceIntl.minutes ? convertMinToHours(state.usageSummaryVoiceIntl.minutes) : '0 mins'}</span>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                            </div>
                                        </Grid>


                                        <Grid lg={4}>
                                            <div className={classes.contentBox}>
                                                <div className={classes.contentBoxIco}><img src={messageico} /></div>
                                                <h3>Messages </h3>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>SMS </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={4} className={classes.dBlock}>
                                                            <b> Count</b>
                                                            <span>{state.usageSummaryTextSMS.messages ? parseInt(state.usageSummaryTextSMS.messages).toLocaleString() : '0'}</span>
                                                        </Grid>

                                                    </Grid>
                                                </div>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>MMS </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={4} className={classes.dBlock}>
                                                            <b> Count</b>
                                                            <span>{state.usageSummaryTextMMS.messages ? parseInt(state.usageSummaryTextMMS.messages).toLocaleString() : '0'}</span>
                                                        </Grid>

                                                    </Grid>
                                                </div>

                                            </div>
                                        </Grid>

                                        <Grid lg={4}>
                                            <div className={classes.contentBox}>
                                                <div className={classes.contentBoxIco}><img src={dataIco} /></div>
                                                <h3>Data </h3>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>Mobile Data </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={4} className={classes.dBlock}>
                                                            <b> 3G</b>
                                                            <span>{formatSizeUnits(state.usageSummaryData3G.kilobytes)}</span>
                                                        </Grid>
                                                        <Grid lg={4} className={classes.dBlock}>
                                                            <b> 4G</b>
                                                            <span>{formatSizeUnits(state.usageSummaryData4G.kilobytes)}</span>
                                                        </Grid>
                                                        {/*<Grid lg={4} className={classes.dBlock}>*/}
                                                        {/*    <b> 5G</b>*/}
                                                        {/*    <span>{formatSizeUnits(state.usageSummaryData5G.Kilobytes)}</span>*/}
                                                        {/*</Grid>*/}

                                                    </Grid>
                                                </div>

                                                <div className={classes.skyBlueBar}>
                                                    <h4>Roaming </h4>
                                                </div>
                                                <div className={classes.skyBlueContent}>
                                                    <Grid row container justifyContent='center'>
                                                        <Grid lg={4} className={classes.dBlock}>
                                                            <b>{getSizeUnit(state.usageSummaryDataRoaming.kilobytes)}</b>
                                                            <span>{formatSizeUnits(state.usageSummaryDataRoaming.kilobytes)}</span>
                                                        </Grid>

                                                    </Grid>
                                                </div>

                                            </div>
                                        </Grid>
                                    </Grid>

                                </Grid>


                                {/* <Grid container>
                                    <Collapse in={callDetailsCardOpen} collapsedSize={65} className={classes.paperCollapse}>
                                        <div className={classes.paper} >
                                            <div className={classes.cardHeader}>
                                                <div className={classes.cardHeaderTitle}>
                                                    <Typography className={classes.cardTitle}>Call Details</Typography>
                                                </div>
                                                <div>
                                                    <Button
                                                        size="small"
                                                        className={classes.closeButton}
                                                        startIcon={callDetailsCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                        onClick={() => setCallDetailsCardOpen(!callDetailsCardOpen)}
                                                    >
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="UserDetails" list={state.usageSummaryVoice} isUpdate={ isUpdate} />
                                            </div>
                                        </div>
                                    </Collapse>
                                    <Collapse in={smsDetailsCardOpen} collapsedSize={65} className={classes.paperCollapse}>
                                        <div className={classes.paper} >
                                            <div className={classes.cardHeader}>
                                                <div className={classes.cardHeaderTitle}>
                                                    <Typography className={classes.cardTitle}>SMS Details</Typography>
                                                </div>
                                                <div>
                                                    <Button
                                                        size="small"
                                                        className={classes.closeButton}
                                                        startIcon={callDetailsCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                        onClick={() => setSmsDetailsCardOpen(!smsDetailsCardOpen)}
                                                    >
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="UserDetails" list={state.usageSummaryText} isUpdate={isUpdate}  />
                                            </div>
                                        </div>
                                    </Collapse>
                                    <Collapse in={dataDetailsCardOpen} collapsedSize={65} className={classes.paperCollapse}>
                                        <div className={classes.paper} >
                                            <div className={classes.cardHeader}>
                                                <div className={classes.cardHeaderTitle}>
                                                    <Typography className={classes.cardTitle}>Data Details</Typography>
                                                </div>
                                                <div>
                                                    <Button
                                                        size="small"
                                                        className={classes.closeButton}
                                                        startIcon={callDetailsCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                        onClick={() => setDataDetailsCardOpen(!dataDetailsCardOpen)}
                                                    >
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className={classes.tabContainer}>
                                                <SearchGrid columns="UserDetails" list={state.usageSummaryData} isUpdate={isUpdate} />
                                            </div>
                                        </div>
                                    </Collapse>
                                </Grid> */}
                            </div>
                        </Scrollbars>
                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>
                            <Button className={classes.changeBtn} onClick={handleClose}>Close</Button>
                            {/*<Button className={classes.backBtn} onClick={handleClose}>Save</Button>
                            <Button className={classes.changeBtn} onClick={handleClose}>Export</Button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default UsageDetailsDialog