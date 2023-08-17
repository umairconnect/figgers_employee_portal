import React, { useState, useEffect, useRef } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, MenuItem, FormHelperText, InputLabel, FormControl, Tooltip } from '@material-ui/core'

import { Table } from 'antd';

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { CheckboxField, InputBaseField, TextareaField, SelectField } from '../../../../components/InputField/InputField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DragFile from "../../../../assets/img/shop/dragFile.svg";
import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { withSnackbar } from "./../../../../components/Message/Alert";
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { handleNumberKeyPress, allowedAttachmentsImages, handleNumberWithDecimal } from '../../../../../src/components/Common/Extensions';
import Delete from './../../../../assets/img/icons/Delete.svg';
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import ProfilePlaceholder from "./../../../../assets/img/profilePlaceholder.jpg";

function AddNewItem({ dialogOpenClose, handleClose, handleSuccessClose, data, ...props }) {
    const classes = useStyles();
    const commonAttachments = allowedAttachmentsImages();
    const [state, setState] = useState(data && data.productId > 0 ? data :
        {
            isTrackQuantity: true, isVariantAvailable: false, isActive: true,
            variantType: '', lstAttachedFiles: [], lstProductVariants: [],
            lstSelectedPlans: [], lstProductVariantValues: [], productTypeCode: '', productCategoryCode: ''
        });

    const { showMessage } = props;
    const inputFile = useRef(null);
    const moreInputFile = useRef(null)

    const remoteItem = (index) => {
        const updatedItems = attachment.filter((_, i) => i !== index);
        setAttachment(updatedItems);
    }

    const onButtonClick = () => {
        inputFile.current.click();
    };
    const [attachment, setAttachment] = useState(state.lstAttachedFiles ? state.lstAttachedFiles : []);


    function uploadSingleFile(e) {
        //const fileArray = Array.from(e.target.files);

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

    const handleVariantChange = (e, i) => {
        const { name, value } = e.target;
        let lstVariants = state.lstProductVariantValues;
        lstVariants[i][name] = value;
        setState(prevState => ({
            ...prevState,
            lstProductVariantValues: lstVariants
        }))
    }
    const handleVariantQuantityChange = (e, i) => {
        const { name, value } = e.target;
        let lstVariants = state.lstProductVariantValues;
        var totalQuantity = 0;
        if (lstVariants && lstVariants.length > 0) {
            totalQuantity = lstVariants.filter((obj, index) => index != i).reduce((accumulator, obj) => {
                return accumulator + (obj.variantQuantity ? parseInt(obj.variantQuantity) : 0);
            }, 0);
        }

        totalQuantity += parseInt(value);
        if (totalQuantity > state.quantity) {
            showMessage("Error", "Total Variant quantity can not be greater than total product quantity of " + state.quantity, "error", 3000);
            return;
        }
        lstVariants[i][name] = value;
        setState(prevState => ({
            ...prevState,
            lstProductVariantValues: lstVariants
        }))
    }
    const deletedSelectedPlan = (i) => {
        showActionDialog("Are you sure you want to delete this plan from product?", "confirm", function () {
            var lstProduct = state.lstSelectedPlans;
            state.lstSelectedPlans[i].isDeleted = state.lstSelectedPlans[i].isDeleted = true;
            setState(prevState => ({
                ...prevState,
                lstSelectedPlans: lstProduct
            }));
        });
    }

    const onPlanChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const addSelectedPlanList = () => {
        if (!state.protectionPlanId) {
            return;
        }

        if (state.lstSelectedPlans.filter(i => i.protectionPlanId == state.protectionPlanId && !i.isDeleted).length > 0) {
            showMessage("Error", "Plan already added", "error", 3000);
            return;
        }
        //setLstSelectedPlans(prevState => ({
        //    ...prevState,
        //    planName: selectedPlan.protectionPlanType,
        //}));
        var item = ddlProtectionPlans.filter(o => o.protectionPlanId == state.protectionPlanId)[0];
        var lstData = state.lstSelectedPlans;
        lstData.push(item);
        setState(prevState => ({
            ...prevState,
            lstSelectedPlans: lstData
        }));
    }

    const [colorOptions, setColorOptions] = useState([]);

    const [lstVariantType, setLstVariantType] = useState([]);
    const [lstProtectionPlans, setLstProtectionPlans] = useState([]);
    const [ddlProtectionPlans, setDdlProtectionPlans] = useState([]);
    const lstStatus = [
        //{
        //    value: "",
        //    label: "Select Variant Type",
        //},
        {
            value: "true",
            label: "Active",
        },
        {
            value: "false",
            label: "InActive",
        },
    ]
    const [lstProductCategories, setLstProductCategories] = useState([]);
    const [lstProductTypes, setLstProductTypes] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

        if (state.cost || state.cost === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCost: false
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCost: true
            }));
            errorList.push(true);

        }

        if (state.price || state.price === 0) {
            
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrice: false
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorPrice: true
            }));
            errorList.push(true);
        }

        if (state.quantity || state.quantity === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorQuantity: false
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorQuantity: true
            }));
            errorList.push(true);
            
        }

        if (!state.productTypeCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProductTypeCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProductTypeCode: false
            }));
        }

        if (!state.productCategoryCode) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProductCategoryCode: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorProductCategoryCode: false
            }));
        }

    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'variantType') {
            setState(prevState => ({
                ...prevState,
                variantName: ''
            }))
        }

    }
    //const [attachment, setAttachment] = useState({ files: null, fileName: null });
    const addNewItem = () => {
        //resetErrors();
        let errorList = [];
        Validate(errorList);
        if (errorList.length < 1) {
            setIsLoading(true);
            state.cost = parseFloat(state.cost);
            state.price = parseFloat(state.price);
            state.quantity = parseInt(state.quantity);
            state.shippingWeight = state.shippingWeight ? parseInt(state.shippingWeight) : 0;


            const formData = new FormData();
            for (var key in state) {
                if (state[key] && key !== "attachment" && key !== "encUserID" && key !== "lstProductVariants" && key !== "lstSelectedPlans" && key !== "lstProductVariantValues")
                    formData.append(key, state[key]);
            }

            if (attachment != null && attachment.length > 0) {
                for (var i = 0; i < attachment.length; i++) {
                    if (attachment[i].imgFile) {
                        formData.append("attachments", attachment[i].imgFile);
                    } else if (!attachment[i].imgFile) {
                        formData.append("attachmentIds", attachment[i].productMediaId);
                    }
                }
            }
            if (state.isVariantAvailable && state.lstProductVariants != null && state.lstProductVariants.length > 0) {
                for (var i = 0; i < state.lstProductVariants.length; i++) {
                    //formData.append("lstProductVariants", state.lstProductVariants[i]);
                    formData.append(`lstProductVariants[${i}][productVariantId]`, state.lstProductVariants[i].productVariantId);
                    formData.append(`lstProductVariants[${i}][variantName]`, state.lstProductVariants[i].variantName);
                    formData.append(`lstProductVariants[${i}][variantType]`, state.lstProductVariants[i].variantType);
                    formData.append(`lstProductVariants[${i}][isActive]`, true);
                    formData.append(`lstProductVariants[${i}][isDeleted]`, state.lstProductVariants[i].isDeleted);
                    if (state.lstProductVariants[i].productVariantId > 0) {
                        formData.append(`lstProductVariants[${i}][createDate]`, state.lstProductVariants[i].createDate);
                    }
                }
                for (var i = 0; i < state.lstProductVariantValues.length; i++) {
                    formData.append(`lstProductVariantValues[${i}][productVariantValueId]`, state.lstProductVariantValues[i].productVariantValueId);
                    formData.append(`lstProductVariantValues[${i}][variantName]`, state.lstProductVariantValues[i].variantName);
                    formData.append(`lstProductVariantValues[${i}][variantPrice]`, state.lstProductVariantValues[i].variantPrice);
                    formData.append(`lstProductVariantValues[${i}][variantQuantity]`, state.lstProductVariantValues[i].variantQuantity);
                    formData.append(`lstProductVariantValues[${i}][isActive]`, true);
                    formData.append(`lstProductVariantValues[${i}][isDeleted]`, state.lstProductVariantValues[i].isDeleted);
                    if (state.lstProductVariantValues[i].productVariantValueId && state.lstProductVariantValues[i].productVariantValueId.length > 0) {
                        formData.append(`lstProductVariantValues[${i}][createDate]`, state.lstProductVariantValues[i].createDate);
                    }
                }
            }
            if (state.lstSelectedPlans != null && state.lstSelectedPlans.length > 0) {
                for (var i = 0; i < state.lstSelectedPlans.length; i++) {
                    formData.append(`lstSelectedPlans[${i}][productProtectionPlanId]`, state.lstSelectedPlans[i].productProtectionPlanId);
                    formData.append(`lstSelectedPlans[${i}][protectionPlanId]`, state.lstSelectedPlans[i].protectionPlanId);
                    formData.append(`lstSelectedPlans[${i}][isDeleted]`, state.lstSelectedPlans[i].isDeleted);
                    if (state.lstSelectedPlans[i].productProtectionPlanId > 0) {
                        formData.append(`lstSelectedPlans[${i}][createDate]`, state.lstSelectedPlans[i].createDate);
                    }
                }
            }



            var method = "product/add";
            if (state.productId > 0) {
                method = "product/update";
            }
            PostDataAPI(method, formData, true, "formData").then((result) => {
                if (result.success) {
                    if (result.data) {
                        if (state.productId > 0) {
                            handleSuccessClose("Product updated successfully");
                        } else {
                            handleSuccessClose("Product addedd successfully");
                        }

                        // showMessage("Success", "Line added successfully", "success", 3000);
                        //handleClose();
                    }
                    else {
                        showMessage("Error", "Error adding product, please contact administrator", "error", 3000);
                    }
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
                setIsLoading(false);

            })
        }
    }
    const handleVariantAdd = () => {
        let hasError = false;
        if (!state.variantType) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVariantType: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVariantType: false
            }));
        }
        if (!state.variantName) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVariantName: true
            }));
            hasError = true;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorVariantName: false
            }));
        }
        if (!hasError) {
            let lstVariants = state.lstProductVariants;
            if (lstVariants.filter(i => i.variantName.toLowerCase() === state.variantName.toLowerCase()
                && i.variantType === state.variantType && !i.isDeleted).length > 0) {
                showMessage("Error", "Variant already added", "error", 3000);
                return;
            }

            lstVariants.push({
                productVariantId: 0, variantName: state.variantName,
                variantType: state.variantType, variantPrice: state.price,
                variantQuantity: state.quantity, isDeleted: false
            });

            //Variant Values
            //let lstVariantsValues = state?.lstVariantsValues;
            //if (!lstVariants || lstVariants.length === 0 || lstVariants.every(a => a.variantType == state.variantType)) {

            //    lstVariantsValues.push({
            //        productVariantId: 0, variantName: state.variantName, variantTypeName: state.variantName,
            //        variantType: state.variantType, variantPrice: state.price,
            //        variantQuantity: state.quantity, isDeleted: false
            //    });
            //}
            //else {
            generateVariantValues(lstVariants);
            //}
            setState(prevState => ({
                ...prevState,
                lstProductVariants: lstVariants,
                //lstVariantsValues: lstVariantsValues,
                variantType: '',
                variantName: ''
            }));
        }
    }
    const generateVariantValues = (lstVariants) => {
        var lstVariantsValues = [];
        if (lstVariants && lstVariants.length > 0) {
            const uniqueTypes = [...new Set(lstVariants.filter(o => !o.isDeleted).map(obj => obj.variantType))];
            const combinations = [];
            var orderVariantList = [];
            for (const type of uniqueTypes) {
                orderVariantList.push(...lstVariants.filter(v => v.variantType === type && !v.isDeleted));
            }
            generateCombinations(orderVariantList, uniqueTypes, [], 0, combinations);
            //console.log(combinations);
            combinations.forEach(vName => {
                lstVariantsValues.push({
                    productVariantValueId: '', variantName: vName,
                    variantPrice: state.price, variantQuantity: 0, isDeleted: false
                });
            });
            setState(prevState => ({
                ...prevState,
                lstProductVariantValues: lstVariantsValues
            }));
        }

    }
    const generateCombinations = (data, types, currentCombination, depth, result) => {
        if (depth === types.length) {
            result.push(currentCombination.join('/'));
            return;
        }

        const currentType = types[depth];
        const uniqueValues = [...new Set(data.filter(obj => obj.variantType === currentType).map(obj => obj.variantName))];

        for (const value of uniqueValues) {
            generateCombinations(data, types, [...currentCombination, value], depth + 1, result);
        }
    }
    //generateCombinations with slash separator
    //function generateCombinations(data, types, currentCombination, depth, result) {
    //    if (depth === types.length) {
    //        result.push(currentCombination.join('/'));
    //        return;
    //    }

    //    const currentType = types[depth];
    //    const uniqueValues = [...new Set(data.filter(obj => obj.variantType === currentType).map(obj => obj.variantName))];

    //    for (const value of uniqueValues) {
    //        generateCombinations(data, types, [...currentCombination, value], depth + 1, result);
    //    }
    //}
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    });
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
    const deleteVariant = (item) => {
        showActionDialog("Are you sure you want to delete this variant?", "confirm", function () {
            let lstVariants = state.lstProductVariants.map(v => v.variantName === item.variantName && v.variantType === item.variantType ? { ...v, isDeleted: true } : v);
            setState(prevState => ({
                ...prevState,
                lstProductVariants: lstVariants
            }));
            generateVariantValues(lstVariants.filter(a => !a.isDeleted));
        });
    }
    const getVariantTypes = () => {
        var params = {
            code: "get_product_variant_type",
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.unshift({ text2: 'Please Select Variant Type', text1: 0 });
                setLstVariantType(result.data.map(t => { return { label: t.text2, value: t.text1 } }));
            }
        })
    }
    const getProtectionPlans = () => {

        PostDataAPI("product/getProtectionPlanList").then((result) => {
            if (result.success && result.data != null) {
                setLstProtectionPlans(result.data);
                setDdlProtectionPlans(result.data);
                //var lstData = result.data;
                //result.data.unshift({ text2: 'Please Select Protection Plan', text1: 0 });
            }
        })
    }
    const getProductTypes = () => {
        var params = {
            code: "get_product_types",
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.unshift({ text2: 'Please Select Product Type', text1: '' });
                setLstProductTypes(result.data.map(t => { return { label: t.text2, value: t.text1 } }));
                if (!data?.productId > 0) {
                    setState(prevState => ({
                        ...prevState,
                        productTypeCode: result.data[0].text1
                    }));
                }

            }
        })
    }
    const getProductCategories = () => {
        var params = {
            code: "get_product_categories",
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                result.data.unshift({ text2: 'Please Select Product Category', text1: '' });
                setLstProductCategories(result.data.map(t => { return { label: t.text2, value: t.text1 } }));
                if (!data?.productId > 0 || !state.productCategoryCode) {
                    setState(prevState => ({
                        ...prevState,
                        productCategoryCode: result.data[0].text1
                    }));
                }
            }
        })
    }
    const getProductColors = () => {
        var params = {
            code: "get_product_colors",
            parameters: ['']
        };
        PostDataAPI("ddl/loadItems", params).then((result) => {
            if (result.success && result.data != null) {
                //result.data.unshift({ text2: 'Please Select Product Category', text1: '' });
                setColorOptions(result.data.map(t => { return { label: t.text2, value: t.text2, color: t.text1 } }));
                //if (!data?.productId > 0 || !state.productCategoryCode) {
                //    setState(prevState => ({
                //        ...prevState,
                //        productCategoryCode: result.data[0].text1
                //    }));
                //}
            }
        })
    }
    useEffect(() => {
        getProductTypes();
        getProductCategories();
        getVariantTypes();
        getProtectionPlans();
        getProductColors();

    }, []);

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                maxWidth="lg"
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Add/Update Product</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        {isLoading ? <DialogLoader></DialogLoader> : ''}

                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>

                                <Grid container>
                                    <Grid item md={8} sm={8} lg={8}>
                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Product Details</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>
                                        <Grid row container>
                                            <Grid xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                                <Label title="Product Title" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="name"
                                                        name="name"
                                                        value={state.name}
                                                        type="text"
                                                        MaxLength={50}
                                                        placeholder='Product Title'
                                                        IsDisabled={false}
                                                        onChange={handleChange}
                                                    />
                                                    {errorMessages.errorName && !state.name ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter product name
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>

                                            <Grid xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                                <Label title="Description" size={12} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <TextareaField
                                                        id="description"
                                                        name="description"
                                                        value={state.description}
                                                        rows={6}
                                                        placeholder="Description"
                                                        MaxLength="1000"
                                                        onChange={handleChange}
                                                    ></TextareaField>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid row container>
                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Category" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="productCategoryCode"
                                                        value={state.productCategoryCode}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstProductCategories.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>
                                                    {errorMessages.errorProductCategoryCode && !state.productCategoryCode ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select product category
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Type" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="productTypeCode"
                                                        value={state.productTypeCode}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstProductTypes.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>
                                                    {errorMessages.errorProductTypeCode && !state.productTypeCode ? (<FormHelperText style={{ color: "red" }} >
                                                        Please select product type
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <Grid row container>
                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Status" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="isActive"
                                                        value={state.isActive}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstStatus.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>

                                                </Grid>

                                            </Grid>


                                        </Grid>

                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Pricing</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>



                                        <Grid row container>
                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Cost $" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="cost"
                                                        name="cost"
                                                        type="text"
                                                        value={state.cost}
                                                        placeholder="Cost"
                                                        MaxLength='5'
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => handleNumberWithDecimal(e)}
                                                    />
                                                    {errorMessages.errorCost && !state.cost ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter cost value
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Price $" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="price"
                                                        name="price"
                                                        value={state.price}
                                                        type="text"
                                                        placeholder="Price"
                                                        MaxLength='5'
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => handleNumberWithDecimal(e)}
                                                    />
                                                    {errorMessages.errorPrice && !state.price ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter price value
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid row container>
                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.marginCheckField}>
                                                <CheckboxField
                                                    color="primary"
                                                    name="chargeTax"
                                                    label="Charge Tax"
                                                    checked={state.chargeTax}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Status" size={12} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <Select
                                                        size="small"
                                                        native
                                                        name="isActive"
                                                        value={state.isActive}
                                                        onChange={handleSelectChange}
                                                        placeholder="Select"
                                                        label="Select"
                                                        className={classes.selectBaseInput}
                                                    >
                                                        {lstStatus.map(option =>
                                                            <option value={option.value}>{option.label}</option>
                                                        )
                                                        }
                                                    </Select>
                                                </Grid>

                                            </Grid>
                                        </Grid>


                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Inventory</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>

                                        <Grid row container>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Units" size={12} mandatory={true} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="quantity"
                                                        name="quantity"
                                                        value={state.quantity}
                                                        type="text"
                                                        placeholder="Units"
                                                        MaxLength='5'
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => handleNumberKeyPress(e)}
                                                    />
                                                    {errorMessages.errorQuantity && !state.quantity ? (<FormHelperText style={{ color: "red" }} >
                                                        Please enter units value
                                                    </FormHelperText>) : ('')}
                                                </Grid>

                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.marginCheckField}>
                                                <CheckboxField
                                                    color="primary"
                                                    name="isTrackQuantity"
                                                    checked={state.isTrackQuantity}
                                                    onChange={handleCheckboxChange}
                                                    label="Track Quantity"

                                                />
                                            </Grid>

                                        </Grid>



                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Shipping</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>

                                        <Grid row container>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                <Label title="Shipping Weight" size={12} />
                                                <Grid xl={12} md={12} sm={12} lg={12}>
                                                    <InputBaseField
                                                        id="shippingWeight"
                                                        name="shippingWeight"
                                                        value={state.shippingWeight}
                                                        type="text"
                                                        placeholder="Weight in grams"
                                                        MaxLength='10'
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => handleNumberKeyPress(e)}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>

                                            </Grid>

                                        </Grid>

                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Variants</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>

                                        <Grid row container>
                                            <Grid xl={12} md={12} sm={12} lg={12} className={classes.varientLabel}>
                                                <CheckboxField
                                                    color="primary"
                                                    name="isVariantAvailable"
                                                    checked={state.isVariantAvailable}
                                                    onChange={handleCheckboxChange}
                                                    label="Variants Available"
                                                />
                                            </Grid>
                                            {state?.isVariantAvailable ?
                                                <> <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                    <Label title="Variant type" size={12} />
                                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                                        <Select
                                                            size="small"
                                                            native
                                                            name="variantType"
                                                            value={state.variantType}
                                                            onChange={handleSelectChange}
                                                            placeholder="Select"
                                                            label="Select"
                                                            className={classes.selectBaseInput}
                                                        >
                                                            {lstVariantType.map(option =>
                                                                <option value={option.value}>{option.label}</option>
                                                            )
                                                            }
                                                        </Select>
                                                        {errorMessages.errorVariantType && !state.variantType ? (<FormHelperText style={{ color: "red" }} >
                                                            Please select variant type
                                                        </FormHelperText>) : ('')}
                                                    </Grid>
                                                </Grid>

                                                    <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                                        <Label title="Variant Name" size={12} />
                                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xl={10} md={10} sm={10} lg={10}>



                                                                    {state?.variantType?.toLowerCase() == 'color' ?
                                                                        <FormControl className={classes.selectBaseInputColor}>
                                                                            {/* <InputLabel id="demo-simple-select-labe">  Select Color</InputLabel> */}
                                                                            {state.variantName ? null : <InputLabel id="demo-simple-select-labe">  Select Color</InputLabel>}

                                                                            <Select

                                                                                name="variantName"
                                                                                value={state.variantName}
                                                                                onChange={handleChange}
                                                                                placeholder="Select Color"
                                                                            >

                                                                                {colorOptions.map(option =>
                                                                                    <MenuItem value={option.value} className={classes.optionsArea}> <span className={classes.colorDot} style={{ background: option.color }}></span>{option.label}</MenuItem>
                                                                                )
                                                                                }
                                                                            </Select>
                                                                        </FormControl>

                                                                        // <Select
                                                                        //     size="small"
                                                                        //     native
                                                                        //     name="variantType"
                                                                        //     value={state.variantType}
                                                                        //     onChange={handleSelectChange}
                                                                        //     placeholder="Select"
                                                                        //     label="Select"
                                                                        //     className={classes.selectBaseInput}
                                                                        // >
                                                                        //     {colorOptions.map(option =>
                                                                        //         <option value={option.value}>
                                                                        //             {option.label}</option>
                                                                        //     )
                                                                        //     }

                                                                        // </Select>
                                                                        :
                                                                        <InputBaseField
                                                                            id="variantName"
                                                                            name="variantName"
                                                                            value={state.variantName}
                                                                            type="text"
                                                                            placeholder="Variant Name"
                                                                            onChange={handleChange}
                                                                            MaxLength='100'
                                                                        />
                                                                    }
                                                                    {errorMessages.errorVariantName && !state.variantName ? (<FormHelperText style={{ color: "red" }} >
                                                                        Please enter variant name
                                                                    </FormHelperText>) : ('')}
                                                                </Grid>

                                                                <Grid item xl={2} md={2} sm={2} lg={2}>
                                                                    <Button className={classes.addBtn} onClick={handleVariantAdd}> Add</Button>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>

                                                    </Grid>
                                                    {lstVariantType.filter(vt => {
                                                        return state?.lstProductVariants.some(pv => { return vt.value == pv.variantType })
                                                    }).map(vt =>

                                                        <Grid xl={12} md={12} sm={12} lg={12} className={classes.varientGrid}>
                                                            <div className={classes.VarientBlock}>
                                                                <h2>{vt.label}</h2>
                                                                <div className={classes.colorBlock}>
                                                                    {state?.lstProductVariants && state?.lstProductVariants.length > 0 ?
                                                                        state?.lstProductVariants.filter(a => a.variantType == vt.value).map((vrnt, index) => {
                                                                            if (vrnt.isDeleted) {
                                                                                return ''
                                                                            }
                                                                            else {
                                                                                return (

                                                                                    <h3 className={classes.colorVarient}>{vrnt.variantName} <span onClick={() => { deleteVariant(vrnt) }}><CloseIcon /></span></h3>

                                                                                )
                                                                            }
                                                                        }) : ''}
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    )}



                                                    <Grid xl={12} md={12} sm={12} lg={12} className={classes.smallGrid}>

                                                        <table >
                                                            <thead>
                                                                <tr>

                                                                    <th>Name</th>
                                                                    <th style={{ textAlign: 'center' }}>Price</th>
                                                                    <th style={{ textAlign: 'center' }}>Available</th>
                                                                    {/*<th></th>*/}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {state?.lstProductVariantValues && state?.lstProductVariantValues.length > 0 ?
                                                                    state?.lstProductVariantValues.map((vrnt, index) => {
                                                                        if (vrnt.isDeleted) {
                                                                            return ''
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <tr>

                                                                                    <td>{vrnt.variantName}</td>
                                                                                    <td style={{ width: '150px', textAlign: 'center' }}>
                                                                                        <input
                                                                                            type="number"
                                                                                            name="variantPrice"
                                                                                            value={vrnt.variantPrice}
                                                                                            onChange={(e) => { handleVariantChange(e, index) }}
                                                                                        /></td>
                                                                                    <td style={{ width: '150px', textAlign: 'center' }}> <input
                                                                                        type="number"
                                                                                        name="variantQuantity"
                                                                                        value={vrnt.variantQuantity}
                                                                                        onChange={(e) => { handleVariantQuantityChange(e, index) }}
                                                                                    /> </td>
                                                                                    {/*<td style={{ textAlign: 'center', minWidth: '40px', width: '40px' }}><img src={Delete} alt="Delete" onClick={() => { deleteVariant(vrnt) }} /></td>*/}
                                                                                </tr>)
                                                                        }
                                                                    })
                                                                    : <tr>
                                                                        <td colSpan="5" className="nodata">No variants available</td>
                                                                    </tr>}

                                                            </tbody>
                                                        </table>

                                                    </Grid>
                                                </> : ''}
                                        </Grid>

                                        <Grid row className={classes.paddingLeftRight}>
                                            <h2>Protection Plans</h2>
                                            <hr style={{ opacity: '0.3' }}></hr>
                                        </Grid>


                                        <Grid xl={6} md={6} sm={6} lg={6} className={classes.paddingLeftRight}>
                                            <Label title="Protection Plans" size={12} />
                                            <Grid xl={12} md={12} sm={12} lg={12}>

                                                <Grid container alignItems="baseline">
                                                    <Grid item xl={10} md={10} sm={10} lg={10}>
                                                        <Select
                                                            size="small"
                                                            native
                                                            name="protectionPlanId"
                                                            value={state.protectionPlanId}
                                                            onChange={onPlanChange}
                                                            placeholder="Select"
                                                            label="Select"
                                                            className={classes.selectBaseInput}
                                                        >
                                                            <option value="">Please Select Protection Plan</option>
                                                            {ddlProtectionPlans.map(option =>
                                                                <option value={option.protectionPlanId}>{option.name} - ${option.price}</option>
                                                            )
                                                            }
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xl={2} md={2} sm={2} lg={2}>
                                                        <Button className={classes.addBtn} onClick={() => addSelectedPlanList()}> Add</Button>
                                                    </Grid>
                                                </Grid>


                                            </Grid>

                                        </Grid>

                                        <Grid row container>
                                            <Grid xl={12} md={12} sm={12} lg={12} className={classes.smallGrid}>
                                                <table >
                                                    <thead>
                                                        <tr>
                                                            <th>Selected Plan</th>
                                                            <th style={{ textAlign: 'center' }}>Price</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {state?.lstSelectedPlans && state?.lstSelectedPlans.length > 0 ?
                                                            state?.lstSelectedPlans.map((item, i) => {
                                                                if (item.isDeleted) {
                                                                    return ''
                                                                }
                                                                else {
                                                                    return (
                                                                        <tr>
                                                                            <td><img src={item.badgePath ? '.' + item.badgePath : ProfilePlaceholder} style={{ maxWidth: '30px' }} /> {item.name}</td>
                                                                            <td style={{ textAlign: 'center', width: '20px' }}> ${item.price} </td>

                                                                            <td style={{ textAlign: 'center', minWidth: '40px', width: '40px' }}><img onClick={() => deletedSelectedPlan(i)} src={Delete} alt="Delete" /></td>

                                                                        </tr>
                                                                    )
                                                                }
                                                            })

                                                            :
                                                            <tr>
                                                                <td colSpan="3" className="nodata">No plan available</td>
                                                            </tr>
                                                        }


                                                    </tbody>
                                                </table>
                                            </Grid>
                                        </Grid>


                                    </Grid>

                                    <Grid item md={4} sm={4} lg={4}>

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
                                                            <Grid items lg={item.length == 1 ? 12 : 6} md={item.length == 1 ? 12 : 6} sm={item.length == 1 ? 12 : 6}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <img
                                                                        key={index}
                                                                        src={item.imgFile ? URL.createObjectURL(item.imgFile) : '.' + item.filePath}
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

                                    </Grid>

                                </Grid>


                            </div>
                        </Scrollbars>
                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Cancel</Button>
                                <Button className={classes.changeBtn} onClick={addNewItem}>Save</Button>

                            </div>
                        </div>
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
export default withSnackbar(AddNewItem);