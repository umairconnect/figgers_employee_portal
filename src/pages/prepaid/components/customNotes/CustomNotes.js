import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import RichTextEditor from 'react-rte';
import useStyles from "./styles";
import { withSnackbar } from "./../../../../components/Message/Alert";
import { InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import { formateMdnNumber } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';

function CustomNotes({ accountNumber, dialogOpenClose, handleClose, handleSuccessClose, noteType, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isLoading, setIsLoading] = useState(false);

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);

    const regex = /(<([^>]+)>)/ig;
    const regexSpaces = /((&nbsp;))*/gmi;

    const MAX_EDITOR_LENGTH = 4000;

    const [state, setState] = useState({
        accountNumber: accountNumber,
        mdn: props.mdnNumber,
        userName: props.userName,
        note: '',
        noteLevel: noteType
    });

    const [errorMessages, setErrorMessages] = useState({
        errorCustomerNote: false,
        errorEditorMaxValue:false,
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function isEditorEmpty(_editorValue) {
        let editorDetail = _editorValue.toString('html').replace(regex, '');
        let isEmpty = false;
        if (editorDetail.trim() === ""
            || editorDetail.trim().length === 0
            || editorDetail == "<p><br></p>"
            || !!editorDetail.replace(regex, "") == ""
            || !!editorDetail.replace(regexSpaces, '') == ""
            || editorDetail == "<p></p>") {
            isEmpty = true;
        }
        return isEmpty;
    }

    const handleEditorChange = (editorValue) => {

        const editorDetail = editorValue.toString('html').replace(regex, '');

        if (editorDetail && editorDetail.length > (MAX_EDITOR_LENGTH)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }
        setEDITOR_CHAR_LENGTH(editorDetail.length);

        if (!isEditorEmpty(editorValue))
            errorMessages.errorCustomerNote = false;
        setEditorValue(editorValue);
    }

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' }
        ]
    };

    //function to add customer notes
    const addCustomerNotes = () => {
        let errorList = [];

        const editorDetail = editorValue.toString('html').replace(regex, '');
        if (isEditorEmpty(editorValue)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCustomerNote: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCustomerNote: false
            }));
        }

        if (editorDetail && editorDetail.length > MAX_EDITOR_LENGTH) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }
        if (errorList.length < 1) {
            if (state.mdn == '') {
                state.mdn = '-1';
            }
            state.note = editorValue.toString('html');
            setIsLoading(true)
            PostDataAPI("telispire/addCustomerNotes", state, true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    handleSuccessClose("Note saved successfully.");
                } else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }

    }

    useEffect(() => {
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
                        {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                        <Typography className={classes.title}>Add Notes - {noteType == 'LineLevel' ? formateMdnNumber(state.mdn) : accountNumber}</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                    </div>
                    {isLoading ? <DialogLoader></DialogLoader> : ''}
                    <div className={classes.content}>


                        <Grid container direction="column">

                            {/*{noteType == 'LineLevel' ? <>*/}
                            {/*    <Grid item lg={12}>*/}

                            {/*        <Typography className={classes.labelText}> Current  MDN / MSISDN:</Typography>*/}
                            {/*    </Grid>*/}

                            {/*    <Grid item lg={12}>*/}
                            {/*        <Typography className={classes.valueText}>{formateMdnNumber(state.mdn)}</Typography>*/}
                            {/*    </Grid>*/}
                            {/*</> :*/}
                            {/*    <>*/}
                            {/*        <Grid item lg={12}>*/}

                            {/*            <Typography className={classes.labelText}> Account Number:</Typography>*/}
                            {/*        </Grid>*/}

                            {/*        <Grid item lg={12}>*/}
                            {/*            <Typography className={classes.valueText}>{accountNumber}</Typography>*/}
                            {/*        </Grid>*/}
                            {/*    </>}*/}

                            <Grid item lg={12}>
                                <Typography className={classes.labelText}>Notes:</Typography>
                            </Grid>

                            <Scrollbars autoHeight autoHeightMin={180} autoHeightMax={600}>

                                <Grid item lg={12}>

                                    <RichTextEditor
                                        value={editorValue}
                                        onChange={handleEditorChange}
                                        className={classes.note}
                                        placeholder="Enter Notes"
                                    >
                                    </RichTextEditor>

                                    <div className={classes.DisplayBlock}> {EDITOR_CHAR_LENGTH + '/' + MAX_EDITOR_LENGTH} </div>

                                    {errorMessages.errorCustomerNote ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter notes
                                    </FormHelperText>) : ('')}

                                    {errorMessages.errorEditorMaxValue && EDITOR_CHAR_LENGTH > MAX_EDITOR_LENGTH ?
                                        (<FormHelperText style={{ color: "red" }} >Maximum {MAX_EDITOR_LENGTH} characters allowed</FormHelperText>)
                                        : ('')
                                    }

                                    {/* <TextareaField
                                        id="note"
                                        name="note"
                                        value={state.note}
                                        className={classes.note}
                                        onChange={handleChange}
                                        MaxLength="4000"
                                        placeholder="Enter Notes"
                                    ></TextareaField>
                                    {errorMessages.errorCustomerNote && state.note.trim() == '' ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter notes
                                    </FormHelperText>) : ('')} */}
                                </Grid>

                            </Scrollbars>
                        </Grid>

                    </div>
                    <div className={classes.footer}>

                        <div className={classes.footerRight}>

                            <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                            {isLoading ?
                                <Button className={classes.changeBtn}>Add Notes</Button>
                                :
                                <Button className={classes.changeBtn}
                                    onClick={addCustomerNotes}>Add Notes</Button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}
export default withSnackbar(CustomNotes);