import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { withSnackbar } from "../../../../components/Message/Alert";
import { InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import { formateMdnNumber, formatDateTime, } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import NoRecord from "./../../../../components/NoRecord/NoRecord";
import Delete from './../../../../assets/img/icons/Delete.svg';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import Tooltip from '@material-ui/core/Tooltip';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';


function ViewCustomerNotes({ dialogOpenClose, handleClose, handleSuccessClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        accountNumber: props.accountNumber,
        mdn: props.mdnNumber
    });
    const [rowData, setRowData] = useState([]);

    const [errorMessages, setErrorMessages] = useState({
        errorCustomerNote: false
    })

    //action dialog 
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

    //function to archive customer notes
    const deleteCustomNote = (item) => {

        showActionDialog("Are you sure you want to delete note?", "confirm", function () {
            var obj = {
                noteId: item.noteId,
                accountNumber: item.accountNumber,
                mDN: item.mdn,
                userName: props.userName
            };

            setIsLoading(true)
            PostDataAPI("telispire/deleteLineNote", obj, true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    LoadCustomerNotes();
                    showMessage("Success", "Note deleted successfully.", "success", 3000);
                    console.log(result.message);
                } else {
                    showMessage("Error", result.message, "error", 3000);
                    console.log(result.message);
                }
            })
        });
    }

    //function to load customer notes
    const LoadCustomerNotes = () => {
        var obj = {
            accountNumber: props.accountNumber,
            mDN: props.mdnNumber,
            noteLevel: 'LineLevel'
        };
        setIsLoading(true)
        PostDataAPI("telispire/loadCustomerNotes", obj, true).then((result) => {
            setIsLoading(false)
            if (result.success && result.data != null) {
                setRowData(result.data);
            } else {
                showMessage("Error", result.message, "error", 3000);
                console.log(result.message);
            }
        })

    }
    useEffect(() => {
        LoadCustomerNotes();
    }, []);

    return (
        <>
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
                            {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                            <Typography className={classes.title}>View Notes - {formateMdnNumber(props.mdnNumber)}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                            {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                                {isLoading ? <DialogLoader></DialogLoader> : ''}
                                <Grid container direction="column">
                                    {/*<Grid item lg={12}>*/}
                                    {/*    <Typography className={classes.labelText}> Current  MDN / MSISDN:</Typography>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item lg={12}>*/}
                                    {/*    <Typography className={classes.valueText}>{formateMdnNumber(props.mdnNumber)}</Typography>*/}
                                    {/*</Grid>*/}
                                    {rowData.length > 0 ?
                                        <>
                                            {rowData.map((item, i) => {
                                                return (<>
                                                    <div>
                                                        {/* <Grid container lg={12} className={classes.greyborder}>
                                                            <Grid item lg={6}>
                                                                <p className={classes.smallHeading}>Notes </p>
                                                            </Grid>
                                                            <Grid item lg={6}>
                                                                <div className={classes.dateAction}>
                                                                    Date: {formatDateTime(item.createDate)}
                                                                    <Tooltip title="Delete">
                                                                        <img src={Delete} onClick={() => { deleteCustomNote(item) }} />
                                                                    </Tooltip>

                                                                </div>
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid container lg={12} className={classes.viewNotesDate}>
                                                            <Grid item lg={12}>
                                                                <p dangerouslySetInnerHTML={{
                                                                    __html: item.note,
                                                                }}>

                                                                </p>

                                                            </Grid>

                                                        </Grid>

                                                        <Grid container lg={12} >
                                                            <Grid item lg={6} className={classes.paddingLeftSix}>
                                                                <p className={classes.adminText}>
                                                                    <b>Added By: </b> {item.userName}
                                                                </p>
                                                            </Grid>
                                                            <Grid item lg={6}>
                                                                <div className={classes.dateAction}>
                                                                    Date: {formatDateTime(item.createDate)}
                                                                    <Tooltip title="Delete">
                                                                        <img src={Delete} onClick={() => { deleteCustomNote(item) }} />
                                                                    </Tooltip>

                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </>)

                                            })}

                                        </>

                                        : <NoRecord Icon={true} message="No customer notes were found"></NoRecord>}

                                </Grid>
                            </Scrollbars>
                        </div>
                        {/*<div className={classes.footer}>*/}

                        {/*    <div className={classes.footerRight}>*/}

                        {/*        <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>*/}
                        {/*        <Button className={classes.changeBtn}>Save</Button>*/}


                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Dialog >

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
        </>
    )
}
export default withSnackbar(ViewCustomerNotes);