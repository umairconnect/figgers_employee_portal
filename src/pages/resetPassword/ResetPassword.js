import React, { useState, Fragment, useEffect } from 'react'
import { Form, Input, Row, Typography } from 'antd';

import {
    Grid,
    CircularProgress,
    Button,
    Fade,
    InputBase,
    InputAdornment

} from "@material-ui/core";
import Logo from '../../assets/img/LogoBlue.svg';
import PasswordIcon from "../../images/icons/password-icon.png";
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './styles.css';
import { withRouter, Link, useHistory } from "react-router-dom";
import { CustomBtn } from '../../components/UiElements/UiElements';
import { withSnackbar } from "../../components/Message/Alert";
// context
import { useUserDispatch, resetPassword, validateToken } from "../../context/UserContext";

function ResetPassword(props) {
    const { showMessage } = props;
    let history = useHistory();

    let tokenValue = "";

    if (props.location.search != null) {
        tokenValue = props.location.search.split('=')[1];
    }
    // global
    var userDispatch = useUserDispatch();
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(false);
    var [isAuthToken, setIsAuthToken] = useState(false);
    var [token, setToken] = useState(tokenValue);
    var [newPasswordValue, setNewPasswordValue] = useState("");
    var [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    var [isSuccess, setIsSuccess] = useState(false);
    var [returnMessage, setReturnMessage] = useState("");

    // New -------------

    var [isPasswordPatternMatch, setIsPasswordPatternMatch] = useState(true);
    var [passwordMatch, setPasswordMatch] = useState(true);

    var [isValidToken, setIsValidToken] = useState(false);
    var [passwordPatternMessage, setPasswordPatternMessage] = useState("");


    const onBlurNewPassword = (event) => {

        //if (newPasswordValue && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(newPasswordValue)) {
        if (newPasswordValue && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.)(?=.*?[#?!@$%^&*-]).{8,}$/i.test(newPasswordValue)) {
            setIsPasswordPatternMatch(false);
            setPasswordPatternMessage("Password must contain at least 8 characters including upper/lower case and a special character.")
        }
        else
            setIsPasswordPatternMatch(true);

    };

    const onBlurConfPassword = (event) => {

        let confirmPass = event.target.value;

        if (newPasswordValue != confirmPass) {
            setPasswordMatch(false);
        }
        else
            setPasswordMatch(true);

    };

    const onChangeConfirmPassword = (event) => {

        let confirmPass = event.target.value;
        setConfirmPasswordValue(confirmPass);
        if (newPasswordValue != confirmPass) {
            setPasswordMatch(false);
        }
        else
            setPasswordMatch(true);
    };
    // New -------------

    const callValidate = () => {
        validateToken(token, setIsAuthToken, setError, setIsValidToken);

    }

    const goToLogin = () => {
        setTimeout(() => { history.push("/app/login") }, 2000)
    }

    const handleOk = () => {

    }
    const showSuccessMessage = () => {
        showMessage("Success", "Success! Your new password has been set.", "success", 3000);
    }

    if (isSuccess) {
        goToLogin();
    }
    if (!isAuthToken)
        callValidate();

    return (
        <>
            <div className="reset-password-main">
                <div className="reset-password-form-area">
                    <div className="reset-password-left-panel">
                        <div className="reset-password-form-custom">
                            <Fragment>
                                <div className="reset-password-logo">
                                    <img alt="logo" src={Logo} />
                                </div>
                                <Form onFinish={handleOk} className="reset-password-form" layout="vertical">
                                    {isValidToken ? <Form.Item className="reset-password-label" name="password" rules={[{ required: true }]} >
                                        <Input
                                            className="reset-password-input"
                                            type="password"
                                            value={newPasswordValue}
                                            onChange={e => setNewPasswordValue(e.target.value.trim())}
                                            onBlur={onBlurNewPassword}
                                            id="NewPassword"
                                            maxLength={100}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <img src={PasswordIcon} alt="icon" />
                                                </InputAdornment>
                                            }
                                            margin="none"
                                            placeholder="New Password"
                                            fullWidth
                                        />
                                    </Form.Item> : ''}

                                    {!isPasswordPatternMatch ? (
                                        <Fade in={!isPasswordPatternMatch}>
                                            <Typography color="secondary">
                                                {passwordPatternMessage}
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    {isValidToken ?
                                        <Form.Item className="reset-password-label" name="confirm password" rules={[{ required: true }]}>
                                            <Input
                                                id="confirmPassword"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <img src={PasswordIcon} alt="icon" />
                                                    </InputAdornment>
                                                }
                                                className="reset-password-input"
                                                type="password"
                                                placeholder={`Confirm Password`}
                                                value={confirmPasswordValue}
                                                onChange={onChangeConfirmPassword}
                                                maxLength={ 100}
                                                fullWidth
                                                required
                                                onBlur={onBlurConfPassword}
                                            />
                                        </Form.Item> : ''}


                                    {!passwordMatch && confirmPasswordValue != "" ? (
                                        <Fade in={!passwordMatch && confirmPasswordValue != ""}>
                                            <Typography className="errorPasswordNotMatch">
                                                Password does not match
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    {error || !isValidToken ? (
                                        <Fade in={error || !isValidToken}>
                                            <Typography color="red" className="expireText">
                                                Link has been expired
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    {isSuccess ? (
                                        <Fade in={isSuccess}>
                                            <Typography>
                                                {returnMessage}
                                            </Typography>
                                        </Fade>) : ("")
                                    }
                                    {isValidToken ?
                                        <Grid xs={12} sm={12} lg={12}>
                                            <p> Password must have at least 8 characters including one or more special characters i.e. @ # $ % etc </p>
                                        </Grid> : ""
                                    }
                                    <Grid container
                                        direction="row"
                                        justify="flex-end">
                                        <Link className="login-form-forgot-label" to="/login">Go to login</Link>

                                    </Grid>

                                    <Row className="reset-password-form-submit-btn">
                                        {isLoading ?
                                            (<CircularProgress size={26} />) :
                                            (
                                                isValidToken ?
                                                    <CustomBtn
                                                        disabled=
                                                        {
                                                            newPasswordValue.length === 0 || confirmPasswordValue.length === 0 || isPasswordPatternMatch == false || passwordMatch == false
                                                        }
                                                        id="save"
                                                        btnType="primary"
                                                        shape="round"
                                                        loading={isLoading}
                                                        size="default"
                                                        onClick={() =>
                                                            resetPassword(
                                                                userDispatch,
                                                                token,
                                                                newPasswordValue,
                                                                confirmPasswordValue,
                                                                props.history,
                                                                setIsLoading,
                                                                setError,
                                                                setIsSuccess,
                                                                setReturnMessage,
                                                                showSuccessMessage
                                                            )
                                                        }
                                                    > Reset password </CustomBtn>
                                                    :
                                                    null
                                            )
                                        }
                                    </Row>


                                </Form>
                            </Fragment>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default withRouter(withSnackbar(ResetPassword));