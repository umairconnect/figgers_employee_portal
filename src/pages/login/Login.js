import React, { useState } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Form, Input, Button, Row, Typography } from 'antd';

import {
    Grid,
} from "@material-ui/core";

import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useUserDispatch, loginUser, forgotPassword } from "../../context/UserContext";
//Components
import { CustomBtn } from '../../components/UiElements/UiElements';
import { makeStyles } from "@material-ui/styles";
import Logo from '../../assets/img/LogoBlue.svg';

//style
import './style.css';
function Login(props) {
    var classes = makeStyles();
    const [form] = Form.useForm();

    // global
    var userDispatch = useUserDispatch();
    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [isSuccess, setIsSuccess] = useState(false);
    var [returnMessage, setReturnMessage] = useState("");
    const [activeTabId, setActiveTabId] = useState(0);

    var [validateEmail, setValidateEmail] = useState(false);
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
    var [forgetPasswordValue, setForgetPasswordValue] = useState("");
    var [resetButtonDisalbed, setResetButtonDisalbed] = useState(false);

    function isEmailValid(email) {
        let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        if (re.test(String(email).toLowerCase())) {
            re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(String(email).toLowerCase())
        }
        else
        {
            return false;
        }
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setForgetPasswordValue(value);
        setIsSuccess(false);
    }
    const onBlurEmail = (event) => {
        let emailadd = event;

        if (emailadd && !/^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/i.test(emailadd)) {
            setValidateEmail(true);
        }
        else
            setValidateEmail(false);
    };
    const onTabChange = (value) => {

        setActiveTabId(value);
        setValidateEmail(false);
        setResetButtonDisalbed(false);
        setError(false);
        // setIsSuccess(false);
        setReturnMessage("");
        setForgetPasswordValue("");
    };

    const onTabChangeBack = (value) => {
        setActiveTabId(value);
        setValidateEmail(false);
        setResetButtonDisalbed(false);
        setError(false);
        // setIsSuccess(false);
        setReturnMessage("");
        setLoginValue("");
        setPasswordValue("");
    }

    return (
        <div className="login-main">
            <div className="login-form-area">
                <div className="login-left-panel">
                    <div className="login-form-custom">
                        <div className="login-logo">
                            <img alt="logo" src={Logo} />
                        </div>
                        {activeTabId === 0 &&
                            (<Form noValidate className="login-form" layout="vertical" onFinish={() => loginUser(
                                userDispatch,
                                loginValue,
                                passwordValue,
                                props.history,
                                setIsLoading,
                                setError,
                                setReturnMessage
                            )} form={form}
                                scrollToFirstError>
                                <React.Fragment>
                                    <>
                                        <Form.Item className="login-label" rules={[{ required: true }]}  >
                                            <Input
                                                className="login-input"
                                                value={loginValue}
                                                onChange={e => setLoginValue(e.target.value)}
                                                placeholder="Email address"
                                                type="email"
                                                onBlur={(e) => onBlurEmail(e.target.value)}
                                                autoComplete={"off"}
                                                maxLength={"100"}
                                            />
                                            {validateEmail ? (
                                                <Typography color="secondary" className="error-message"> Invalid email address </Typography>
                                            ) : ("")
                                            }
                                        </Form.Item>

                                        <Form.Item className="login-label" rules={[{ required: true }]}>
                                            <Input
                                                className="login-input"
                                                type="password"
                                                value={passwordValue}
                                                onChange={e => setPasswordValue(e.target.value)}
                                                placeholder="Password"
                                                autoComplete={"off"}
                                                maxLength={"50"}
                                            />
                                            {error ? (
                                                <Typography color="secondary" className="error-message"> {returnMessage} </Typography>
                                            ) : ("")
                                            }
                                        </Form.Item>


                                        <Row className="login-form-forgot-password">
                                            <Grid lg={12} md={12}>
                                                <Form.Item ><Link className="createAccountText" onClick={() => onTabChange(1)} style={{float: 'right', width: 'fit-content'}}> Forgot password? </Link></Form.Item>
                                            </Grid>

                                        </Row>


                                </>
                                <Row className="login-form-submit-btn">
                                    {isLoading ?
                                        <CustomBtn
                                            id="saveLoading"
                                            btnType="primary"
                                            htmlType="submit"
                                            shape="round"
                                            loading={isLoading}
                                           
                                            size="default" > Login</CustomBtn> :
                                        <CustomBtn
                                            id="save"
                                            btnType="primary"
                                            htmlType="submit"
                                            shape="round"
                                            isDisabled={passwordValue.length === 0 || loginValue.length === 0 ? true : false}
                                            size="default" > Login</CustomBtn>}
                                </Row>
                                
                                </React.Fragment>
                            </Form>)}
                        {activeTabId === 1 &&
                            (<Form
                            className="login-form"
                            noValidate
                                layout="vertical" onFinish={() => forgotPassword(
                                    forgetPasswordValue,
                                    props.history,
                                    setIsLoading,
                                    setError,
                                    setIsSuccess,
                                    setReturnMessage,
                                    setResetButtonDisalbed
                                )}
                                form={form}
                                scrollToFirstError>
                                <React.Fragment>
                                    <>
                                    <Typography className="forgot-title">Forgot your Password ?</Typography>
                                    <Typography>
                                    We will send you a password reset via email.
                                        </Typography>
                                        <Form.Item className="login-label" rules={[{ required: true }]}  >
                                            <Input
                                            className="login-input"
                                            value={forgetPasswordValue}
                                            onChange={handleChange}
                                                
                                                placeholder="Email address"
                                                type="email"
                                                onBlur={(e) => onBlurEmail(e.target.value)}
                                                autoComplete={"off"}
                                               maxLength={"100"}
                                            />
                                            {validateEmail ? (
                                                <Typography color="secondary" className="error-message"> Invalid email address </Typography>
                                            ) : ("")
                                            }
                                        </Form.Item>
                                        <Typography>
                                            If you do not have access to your email, please contact your system administrator to have your password reset.
                                        </Typography>

                                        <Row>
                                            {error ? (
                                                <Typography color="secondary" className="error-message"> Email Not Found </Typography>
                                            ) : ("")
                                            }
                                            {isSuccess ? (
                                                <Typography color="primary" className="error-message">
                                                    {returnMessage}
                                                </Typography>
                                            ) : ("")
                                            }
                                        </Row>
                                        <Row className="login-form-forgot-password">
                                            <Form.Item onClick={() => onTabChangeBack(0)}> <Link className="login-form-forgot-label" > Back to login </Link></Form.Item>
                                        </Row>


                                </>
                                <Row className="login-form-submit-btn">

                                    {isLoading ?
                                        <CustomBtn
                                            id="saveLoading"
                                            btnType="primary"
                                            htmlType="submit"
                                            shape="round"
                                            loading={isLoading}
                                            size="default"
                                        > Reset password </CustomBtn>:
                                        <CustomBtn
                                            id="save"
                                            btnType="primary"
                                            htmlType="submit"
                                            shape="round"
                                            isDisabled={!forgetPasswordValue || !isEmailValid(forgetPasswordValue) ? true : false}
                                            size="default"
                                        > Reset password </CustomBtn>
                                    }
                                </Row>
                                </React.Fragment>
                            </Form>)}

                        <Typography className="footerNotes">Please note this application may only be accessed by
                            authorized users. Each user can only view data associated with their specific account. By logging in,
                            you are accepting our Terms of Services. To find out how we protect your information, view our <Link className="login-form-get-registered">Privacy Policy</Link>.
                            <br />
                            <p className={"copyrightTxt"}>© 2023 Figgers Communication Inc.</p>
                        </Typography>
                    </div>
                    {/*
                    {activeTabId === 0 && (<Row className="login-form-get-register">
                        <Form.Item className="login-form-get-register-item"> <Typography className="login-form-not-user">Not a user yet?&nbsp;&nbsp;</Typography></Form.Item>
                        <Form.Item className="login-form-get-register-item"> <Link className="login-form-get-registered" to="/signup">Get Registered</Link></Form.Item>
                    </Row>)} */}
                   
                </div>


            </div>

        </div>
    )
}
export default withRouter(Login);
