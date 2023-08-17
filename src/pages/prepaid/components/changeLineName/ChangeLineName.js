import React, { useState, useEffect} from 'react'

import { Button, Dialog, Grid, Icon, Typography, FormHelperText } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from "./../../../../components/Message/Alert";
import useStyles from "./styles";
import { InputBaseField } from '../../../../components/InputField/InputField';
import { formateMdnNumber } from '../../../../components/Common/Extensions';
import { PostDataAPI } from '../../../../Services/APIService';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';

function ChangeLineName({ dialogOpenClose, handleClose,handleSuccessClose, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [state, setState] = useState({ lineName: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState(props.accountNumber);
    const [mdnNumber, setMdnNumber] = useState(props.mdnNumber);
    const [emailAddress, setEmailAddress] = useState(props.emailAddress);
    const [userName, setUserName] = useState(props.userName);
    const [errorMessages, setErrorMessages] = useState({
        errorLineName: false
    })
    //function to change the line name
    const changeLineNameByMDN = () => {
        let errorList = [];
        if (state.lineName === null
            || state.lineName === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLineName: true
            }));
            errorList.push(true);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLineName: false
            }));
        }
        if (errorList.length < 1) {
            var obj = {
                accountNumber: accountNumber,
                MDN: mdnNumber,
                userName: userName,
                emailAddress:emailAddress,
                wireLessUserName: state.lineName
            };
            setIsLoading(true)
            PostDataAPI("telispire/changeLineNameByMDN", obj,true).then((result) => {
                setIsLoading(false)
                if (result.success && result.data != null) {
                    handleSuccessClose("Line name changed successfully.");
                } else {
                    showMessage("Error", result.message, "error", 3000);
                    console.log(result.message);
                }
            })
        }
        
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(() => {
        console.log(props)
    }, []);


return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            disableEscapeKeyDown
            open={dialogOpenClose}
            PaperComponent={DraggableComponent}
            maxWidth="lg"
            {...props} >
            <div className={classes.dialogContent}>
                <div className={classes.box}>
                    <div className={classes.header} id="draggable-dialog-title">
                        {/* <FormGroupTitle>Figgers Coverage</FormGroupTitle> */}
                        <Typography className={classes.title}>Change Line Name</Typography>
                        <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} alt="close" /></span> */}
                </div>

                {isLoading ? <DialogLoader></DialogLoader> : ''}
                <div className={classes.content}>
                    <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                     
                        <Grid container direction="column">
                            <Grid item lg={12}>
                                <Typography className={classes.labelText}>Current Phone Number:</Typography>
                            </Grid>
                            <Grid item lg={12}>
                                <Typography className={classes.valueText}>{formateMdnNumber(props.mdnNumber)}</Typography>
                            </Grid>
                                <Grid item lg={12}>
                                    <Typography className={classes.labelText}>New Name</Typography>
                            </Grid>
                            <Grid item lg={12}>
                                <InputBaseField
                                    id="lineName"
                                    name="lineName"
                                    value={state.lineName}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder='Enter Line Name'
                                    IsDisabled={false}
                                    MaxLength="100"
                                    MinLength="1"
                                    />
                                    {errorMessages.errorLineName && state.lineName == '' ? (<FormHelperText style={{ color: "red" }} >
                                        Please enter line name
                                    </FormHelperText>) : ('')}
                                   
                                </Grid>
                            </Grid>
                        </Scrollbars>
                    </div>
                <div className={classes.footer}>
                    <div className={classes.footerRight}>
                        <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                        {isLoading ?
                            <Button className={classes.changeBtn}>Change</Button>
                            :
                            <Button className={classes.changeBtn}
                                onClick={changeLineNameByMDN}>Change</Button>
                        }
                        {/*{state.lineName.length == 0 ?*/}
                        {/*    <Button className={classes.disbledBtn}*/}
                        {/*        disabled={state.lineName.length == 0 ? true : false}>Change</Button>*/}
                        {/*    :*/}
                        {/*    <Button className={classes.changeBtn}*/}
                        {/*       onClick={changeLineNameByMDN}>Change</Button>}*/}

                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}
export default withSnackbar(ChangeLineName);