import React,{useState} from "react";
import {Typography,Divider,Form,Input,Row,Button } from "antd";
import "./styles.css"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { InputBaseField } from "../../components/InputField/InputField";
import { Label,CustomBtn} from "../../components/UiElements/UiElements";

export default function ChangePassword(){
    const [state,setState]=useState({});
    const [loading,setLoading]=useState(false);
    const [form] = Form.useForm();
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <>
            <div className="change-password-main">
                <Typography className="change-password-title">Change Password</Typography>
                <Divider className="change-password-divider" />
                <Typography className="change-password-subtitle">Please provide your current password, enter new one  and confirm new password.</Typography>           
                    <div  className="change-password-custom-form" > 
                        <Label title="Current Password" size={24}/>
                        <InputBaseField
                            name="currentPassword" 
                            value={state.currentPassword}
                            onChange={handleChange}
                            placeholder="Current Password"
                            type="currentPassword"
                        />
                        <Label title="New Password" />
                        <InputBaseField
                            name="newPassword" 
                            value={state.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            type="password"
                        />
                        <Label title="Confirm Password" />
                        <InputBaseField
                            name="confirmPassword" 
                            value={state.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            type="password"
                        />              

                        <Row className="change-password-submit-btn">
                            <CustomBtn id="save" btnType="primary" htmlType="submit" shape="round" loading={loading} size="default" > Update </CustomBtn>
                            {/* <Button type="primary" htmlType="submit" loading={loading} className="login-form-button"> Update </Button> */}
                        </Row> 

                </div>
            </div>
        </>
    )
}