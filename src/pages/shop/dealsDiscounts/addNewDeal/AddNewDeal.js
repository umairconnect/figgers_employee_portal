import React, { useState, useEffect, useRef } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { Label } from '../../../../components/UiElements/UiElements';
import { CheckboxField, InputBaseField, TextareaField, SelectField } from '../../../../components/InputField/InputField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DragFile from "../../../../assets/img/shop/dragFile.svg";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { TextField } from '@material-ui/core';
import { isBefore } from 'date-fns';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { withSnackbar } from "./../../../../components/Message/Alert";
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import { handleNumberKeyPress, allowedAttachmentsImages, handleNumberWithDecimal } from '../../../../../src/components/Common/Extensions';


function AddNewItem({ dialogOpenClose, handleClose, data, handleSuccessClose, ...props }) {
    const classes = useStyles();
    const commonAttachments = allowedAttachmentsImages();
    const [state, setState] = useState(data && data.dealId > 0 ? data : { lstAttachedFiles:[] });
    const { showMessage } = props;
    const currentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 16);
        return formattedDate;
    }
    const [images, setImages] = useState([]);

    const inputFile = useRef(null);
    const moreInputFile = useRef(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const [attachment, setAttachment] = useState(state.lstAttachedFiles ? state.lstAttachedFiles:[]);


    function uploadSingleFile(e) {

        const newFiles = []
        for (let i = 0; i < e.target.files.length; i++) {
            const name = e.target.files[i].name;
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
            newFiles.push({
                imgFile: e.target.files[i],
                fileName: e.target.files[i].name
            })
        }
        setAttachment(prevItems => [...prevItems, ...newFiles]);
    }


    const remoteItem = (index) => {
        const updatedItems = attachment.filter((_, i) => i !== index);
        setAttachment(updatedItems);
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const DiscountList = [

        {
            value: "10",
            label: "10",
        },
        {
            value: "20",
            label: "20",
        },
        {
            value: "30",
            label: "30",
        },
        {
            value: "40",
            label: "40",
        },
        {
            value: "50",
            label: "50",
        }
    ]
    const [productsList,setProductList] = useState([])
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const Validate = (errorList) => {
        if (!state.title) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTitle: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorTitle: false
            }));
        }
        if (!state.fromDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFromDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFromDate: false
            }));
        }
        if (!state.toDate) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorToDate: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorToDate: false
            }));
        }

        if (isBefore(new Date(state.toDate), new Date(state.fromDate))) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFromDateGreaterThanToDate: true
            }));
            errorList.push(true);
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFromDateGreaterThanToDate: false
            }));
        }

        if (!state.discount) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDiscount: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorDiscount: false
            }));
        }
        debugger;
        if (!state.flat) {
            if (!state.productId) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorProduct: true
                }));
                errorList.push(true);
            }
            else {
                setErrorMessages(prevState => ({
                    ...prevState,
                    errorProduct: false
                }));
            }
        }
        if (!attachment || attachment.length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttachment: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorAttachment: false
            }));
        }
        
    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const loadAllProducts = () => {
        var obj = { dealId: state.dealId }
        setIsLoading(true);
        PostDataAPI("product/loadAllProducts", obj, true).then((result) => {
            setIsLoading(false);
            if (result.success && result.data) {

                result.data.unshift({ name: 'Please Select Product', productId: 0 });
                setProductList(result.data.map(t => { return { label: t.name, value: t.productId } }));
                if (!data?.productId > 0) {
                    setState(prevState => ({
                        ...prevState,
                        productId: result.data[0].productId
                    }));
                }
            }
        })
    }

    const deleteDeal = () => {
        var obj = { dealId: state.dealId }
        setIsLoading(true);
        PostDataAPI("figgdeals/delete", obj, true).then((result) => {
            setIsLoading(false);
            if (result.success) {
                handleSuccessClose("Deal deleted successfully.");
            } else {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }
    const addNewItem = () => {
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            var method = "figgdeals/add";
            if (state.dealId > 0) {
                method = "figgdeals/update";
            }
            if (state.flat) {
                state.productId = 0;
            }
            const formData = new FormData();
            for (var key in state) {
                if (state[key] && key != "attachment" && key != "encUserID")
                    formData.append(key, state[key]);
            }

            if (attachment != null && attachment.length > 0) {
                for (var i = 0; i < attachment.length; i++) {
                    if (attachment[i].imgFile) {
                        formData.append("attachments", attachment[i].imgFile);
                    } else if (!attachment[i].imgFile) {
                        formData.append("attachmentIds", attachment[i].dealMediaId);
                    }
                }
            }

            PostDataAPI(method, formData, true, "formData").then((result) => {
                if (result.success) {
                    if (result.data) {
                        if (state.dealId > 0) {
                            handleSuccessClose("Deal updated successfully.");
                        } else {
                            handleSuccessClose("Deal added successfully.");
                        }
                       
                        // showMessage("Success", "Line added successfully", "success", 3000);
                        //handleClose();
                    }
                    else {
                        showMessage("Error", "Error adding deal, please contact administrator", "error", 3000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
                setIsLoading(false);

            })
        }
    }

    useEffect(() => {
        loadAllProducts();
        if (data != null && data.dealId > 0) {
            data.fromDate = data.fromDate.split('T')[0]
            data.toDate = data.toDate.split('T')[0]
            setState(data);
        }
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
                            <Typography className={classes.title}>{data && data.dealId > 0 ?'Update Deals & Discounts':'Add Deals & Discounts'}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>

                                <Grid container>
                                    <Grid item md={12} sm={12} lg={12}>

                                        <Grid row container>
                                            <Grid xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                                <Label title="Title" size={12} mandatory={ true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        MaxLength={50}
                                                        placeholder='Deal Title'
                                                        value={ state.title}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessages.errorTitle && !state.title ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter deal title
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="From Date" size={12} mandatory={true}  />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="fromDate"
                                                        name="fromDate"
                                                        type="date"
                                                        placeholder='From Date'
                                                        value={ state.fromDate}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessages.errorFromDate && !state.fromDate ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select from date
                                                    </FormHelperText>) : ('')}
                                                    {errorMessages.errorFromDateGreaterThanToDate && isBefore(new Date(state.toDate), new Date(state.fromDate)) ? (<FormHelperText style={{ color: "red" }} >
                                                        From date must be less than to date
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            <Grid container xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="To Date" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="toDate"
                                                        name="toDate"
                                                        type="date"
                                                        placeholder='To Date'
                                                        value={state.toDate}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessages.errorToDate && !state.toDate ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select to date
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>


                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.marginCheckField}>
                                                <CheckboxField
                                                    color="primary"
                                                    name="includingExisting"
                                                    checked={state.includingExisting}
                                                    onChange={handleCheckboxChange}
                                                    label="Include Existing"
                                                />
                                                <CheckboxField
                                                    color="primary"
                                                    name="pause"
                                                    label="Pause"
                                                    checked={state.pause}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Grid>

                                            <Grid container xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Add discounts" size={12} mandatory={true} />
                                                <Grid item xl={11} md={11} sm={11} lg={11}>

                                                    <SelectField
                                                        name="discount"
                                                        id="discount"
                                                        value={state.discount}
                                                        options={DiscountList}
                                                        onChange={handleSelectChange}
                                                        placeholder={"Select from defined %"}
                                                    />
                                                    {errorMessages.errorDiscount && !state.discount ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter discount
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                                <Grid item xl={1} md={1} sm={1} lg={1}>
                                                    <h3 className={classes.percentageClass}> % </h3>
                                                </Grid>
                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Select from available products" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    {/*<SelectField*/}
                                                    {/*    name="productId"*/}
                                                    {/*    id="productId"*/}
                                                    {/*    value={state.productId}*/}
                                                    {/*    options={productsList}*/}
                                                    {/*    IsDisabled={state.flat}*/}
                                                    {/*    onChange={handleSelectChange}*/}
                                                    {/*    placeholder={"Please Select Product"}*/}
                                                    {/*/>*/}

                                                    <Select
                                                        size="small"
                                                        native
                                                        name="productId"
                                                        value={state.productId}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        disabled={state.flat}
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {productsList.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>

                                                    {errorMessages.errorProduct && !state.productId && !state.flat ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select product
                                                    </FormHelperText>) : ('')}
                                                </Grid>
                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.marginCheckField}>

                                                <Grid xl={6} md={6} sm={6} lg={6}>
                                                    <CheckboxField
                                                        color="primary"
                                                        name="flat"
                                                        label="Flat"
                                                        checked={state.flat}
                                                        onChange={handleCheckboxChange}
                                                        IsDisabled={productsList.length > 1 ? false:true }
                                                    />
                                                </Grid>

                                            </Grid>

                                            

                                        </Grid>


                                    </Grid>

                                    <Grid item md={12} sm={12} lg={12}>


                                        <div className={attachment.length > 0 ? classes.multipleFiles : classes.dragFile}>

                                            {attachment && attachment.length > 0 ?
                                               
                                                <>
                                                    {<h4 className={classes.multipleFilesHead} onClick={onButtonClick} >Add more images</h4>}
                                                    <form>
                                                        <div>
                                                            <input type="file" multiple="multiple" ref={moreInputFile} className={classes.inputFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                                        </div>
                                                    </form>

                                                    <Grid container>
                                                        {attachment.map((item, index) => (
                                                            
                                                            <Grid items lg={attachment.length == 1 ? 12 : 6} md={attachment.length== 1 ? 12 : 6} sm={attachment.length == 1 ? 12 : 6}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <img
                                                                        key={index}
                                                                        src={item.imgFile ? URL.createObjectURL(item.imgFile) : '.'+item.filePath}
                                                                        alt={`Preview ${index}`}
                                                                    />
                                                                    <span className={classes.RemoveImage} onClick={() => remoteItem(index)}>x</span>

                                                                </div>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <img className={classes.dragFileIcon} src={DragFile} onClick={onButtonClick} />
                                                    <h4 onClick={onButtonClick}>
                                                        <b style={{ color: 'rgba(77, 128, 201, 1)' }}> Browse Image </b></h4>
                                                </>
                                            }

                                            <form>
                                                <div>
                                                    <input type="file" multiple="multiple" ref={inputFile} className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                                </div>
                                            </form>

                                        </div>

                                        {errorMessages.errorAttachment && (!attachment.files || attachment.files.length == 0) ? (<FormHelperText style={{ color: "red" }} >
                                            Please select atleast 1 media
                                        </FormHelperText>) : ('')}

                                    </Grid>

                                </Grid>


                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                {/*{data && data.dealId > 0 ? <Button className={classes.deleteBtn} onClick={deleteDeal}>Delete</Button>:''}*/}
                                <Button className={classes.changeBtn} onClick={addNewItem}>{data && data.dealId > 0 ? 'Update Deal' : 'Add Deal'}</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}
export default withSnackbar(AddNewItem);