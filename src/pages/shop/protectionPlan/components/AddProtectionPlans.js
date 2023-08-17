import React, { useState, useEffect, useRef } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import DialogLoader from './../../../../components/Loader/DialogLoader';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import { handleNumberKeyPress, allowedAttachmentsImages, handleNumberWithDecimal } from '../../../../../src/components/Common/Extensions';
import moment from 'moment';
import profilePlaceholder from './../../../../assets/img/profilePlaceholder.jpg';
import EditPen from './../../../../assets/img/action/penWhite.svg';
import UserPlaceholder from "./../../../../assets/img/userPlaceholder.svg";



function AddProtectionPlans({ dialogOpenClose, handleClose, handleSuccessClose, data, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const commonAttachments = allowedAttachmentsImages();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(data);
    const [errorMessages, setErrorMessages] = useState({});

    const [bedgeImage, setBedgeImage] = useState({ file: null, fileToSend: null, fileName: "Choose Plan Icon" });

    const inputFile = useRef(null);

    const uploadFile = () => {

        inputFile.current.click();
    };

    function uploadSingleFile(e) {
        if (e.target.files == null || e.target.files.length <= 0)
            return
        const name = e.target.files[0].name;
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
        setBedgeImage({
            file: URL.createObjectURL(e.target.files[0]),
            fileToSend: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    const lstStatus = [
        {
            value: 'true',
            label: "Active",
        },
        {
            value: 'false',
            label: "InActive",
        },
    ]

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const Validate = (errorList) => {
        if (!state.name) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorName: false
            }));
        }

        if (!state.price) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrice: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrice: false
            }));
        }

        if (state.price && parseFloat(state.price) <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPrice: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorInvalidPrice: false
            }));
        }

        if (!state.description) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDescription: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDescription: false
            }));
        }

    }

    const addProtectionPlan = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.price = parseFloat(state.price);
            if (!state.isActive) {
                state.isActive = true;
            }
            const formData = new FormData();
            for (var key in state) {
                if (state[key] && key !== "badgeFile" && key !== "encUserID")
                    formData.append(key, state[key]);
            }

            if (bedgeImage.fileToSend != null) {
                formData.append("badgeFile", bedgeImage.fileToSend);
                formData.append("badgeName", bedgeImage.fileName);
            }


            var method = "product/addUpdateProtectionPlan";
            PostDataAPI(method, formData, true, "formData").then((result) => {
                setIsLoading(false);
                if (result.success) {
                    if (result.data) {
                        if (state.protectionPlanId > 0) {
                            handleSuccessClose("Plan updated successfully");
                        } else {
                            handleSuccessClose("Plan added successfully");
                        }
                    }
                    else {
                        showMessage("Error", "Error adding plan, please contact administrator", "error", 3000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        }
    }
    useEffect(() => {
    }, []);

    return (
        <>

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="md"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>{state.protectionPlanId > 0 ? 'Update Protection Plan' : 'Add Protection Plan'}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={540}>

                            <div className={classes.content}>
                                <Grid container>
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <div className={classes.whiteBox}>
                                            <div className={classes.informationSec}>

                                                <div className={classes.profileImg}>
                                                    {bedgeImage.file || state.badgePath ?
                                                        <>
                                                            <img src={bedgeImage.file ? bedgeImage.file : '.' + state.badgePath} className='profile-image' />
                                                        </>
                                                        : <div className="user-profile-page" style={{ backgroundImage: 'URL(' + UserPlaceholder + ')' }}></div>
                                                    }
                                                    <img className={classes.EditICon} src={EditPen} onClick={uploadFile} />
                                                    <form>
                                                        <div>
                                                            <input type="file" id="fileUploadField" ref={inputFile} className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                                        </div>
                                                    </form>
                                                </div>

                                                <div style={{ padding: '10px 15px' }}>
                                                    <h4>{bedgeImage.fileName} </h4>
                                                </div>

                                            </div>

                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>

                                    <Grid item xl={12} md={12} sm={12} lg={12}>
                                        <Label title="Name" size={12} mandatory={ true} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={state.name}
                                                placeholder='Name'
                                                MaxLength='50'
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorName && !state.name ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter name
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid container spacing={1}>

                                    <Grid item xl={12} md={6} sm={6} lg={6}>
                                        <Label title="Price" size={12} mandatory={true}/>
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <InputBaseField
                                                id="price"
                                                name="price"
                                                type="text"
                                                value={state.price}
                                                placeholder="Price"
                                                MaxLength='5'
                                                onChange={handleChange}
                                                onKeyPress={(e) => handleNumberWithDecimal(e)}
                                            />
                                            {errorMessages.errorPrice && !state.price ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter price
                                            </FormHelperText>) : ('')}
                                            {errorMessages.errorInvalidPrice && state.price && parseFloat(state.price) <=0 ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter price greater than 0
                                            </FormHelperText>) : ('')}
                                            
                                        </Grid>
                                    </Grid>

                                    <Grid item xl={12} md={6} sm={6} lg={6}>
                                        <Label title="Status" size={12} mandatory={true}/>
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <Select
                                                size="small"
                                                native
                                                name="isActive"
                                                value={state.isActive}
                                                onChange={handleSelectChange}
                                                placeholder="Select"
                                                label="Select"
                                                className={classes.selectBaseInput}>
                                                {lstStatus.map(option =>
                                                    <option value={option.value}>{option.label}</option>
                                                )
                                                }
                                            </Select>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <Label title="Description" size={12} mandatory={true}/>
                                        <Grid xl={12} md={12} sm={12} lg={12} className={classes.textArea}>
                                            <TextareaField
                                                id="description"
                                                name="description"
                                                placeholder='Description'
                                                MaxLength='50'
                                                value={state.description}
                                                onChange={handleChange}
                                            />
                                            {errorMessages.errorDescription && !state.description ? (<FormHelperText style={{ color: "red" }} >
                                                Please enter description
                                            </FormHelperText>) : ('')}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                <Button className={classes.changeBtn} onClick={addProtectionPlan}>{state.protectionPlanId > 0 ? 'Update Plan' : 'Add Plan'}</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default withSnackbar(AddProtectionPlans);