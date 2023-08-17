import React, { useState,Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row,Typography,Radio,Select,DatePicker} from 'antd';
import Logo from "../../images/logo.png";
import { CustomBtn } from '../../components/UiElements/UiElements';
//styles
import 'antd/dist/antd.css';
import './styles.css';
export default function Signup(){
    // const [form] = Form.useForm();
    const {Option}=Select;
    const countryList=useState([{value:"USA",label:"USA"},{value:"Pakistan",label:"Pakistan"}]);
    const options = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ];
      
    const [loading,setLoading]=useState(false);
    const [state,setState]=useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleOk = () => {


    }

    return (
            <div className="register-main">
                <div className="register-form-area">
                    <div className="register-left-panel">
                        <div className="register-form-custom">
                            <Fragment>
                                <div className="register-logo">
                                    <img alt="logo" src={Logo} />
                                </div>
                                <Form onFinish={handleOk} className="register-form" layout="vertical">

                                    <Form.Item className="register-label"  label="Name" name="name"   >
                                        <Input  className="register-input"  type="text" placeholder={`Name`} />
                                    </Form.Item>

                                    <Form.Item className="register-label" label="Email Address" name="emailAddress" >
                                        <Input  className="register-input" type="text" placeholder={`Email Address`} />
                                    </Form.Item>

                                    <Form.Item className="register-label"  label="Phone #" name="phone"   >
                                        <Input  className="register-input"  type="text" placeholder={`Phone #`} />
                                    </Form.Item>

                                    <Form.Item className="register-label" label="Address" name="address" >
                                        <Input  className="register-input" type="text" placeholder={`Address`} />
                                        <Input  className="register-input-address" type="text" placeholder={`Address Line 2`} />
                                    </Form.Item>

                                    <Row>                                
                                        
                                        <Form.Item className="register-left-form-item" label="City" name="city" >
                                            <Input  className="register-input" type="text" placeholder={`City`} />
                                        </Form.Item>

                                        <Form.Item className="register-right-form-item"  label="Post Code" name="postCode"   >
                                            <Input  className="register-input-right"  type="text" placeholder={`Post Code`} />
                                        </Form.Item>
                                        
                                    </Row>

                                    <Row>                                
                                        
                                        <Form.Item className="register-left-form-item" label="State" name="state" >
                                            <Input  className="register-input" type="text" placeholder={`State`} />
                                        </Form.Item>

                                        <Form.Item className="register-right-form-item-dropdown"  label="Country" name="country"   >
                                            <Select className="register-input-right-no-box" defaultValue="Pakistan" allowClear>
                                                <Option value="Pakistan">Pakistan</Option>
                                                <Option value="USA">USA</Option>
                                            </Select>
                                        </Form.Item>
                                        
                                    </Row>

                                    <Row>                                
                                        
                                        <Form.Item className="register-left-form-item" label="DOB" name="dob" >
                                            <DatePicker className="register-input" name="dob"  />
                                            {/* <Input  className="register-input" type="text" placeholder={`DOB`} /> */}
                                        </Form.Item>

                                        <Form.Item className="register-right-form-item"  label="Gender" name="gender"   >
                                            <Radio.Group className="register-input-right-no-box" options={options} onChange={handleChange} value={state.gender} />
                                            {/* <Input  className="register-input-right"  type="text" placeholder={`Gender`} /> */}
                                        </Form.Item>
                                        
                                    </Row>

                                    <Row>                                
                                        
                                        <Form.Item className="register-left-form-item" label="Weight" name="weight" >
                                            <Input  className="register-input" type="text" placeholder={`Weight`} />
                                            {/* <Select className="register-input-right-no-box" defaultValue="Lb" allowClear>
                                                <Option value="Lb">Lb</Option>
                                                <Option value="Kg">Kg</Option>
                                            </Select> */}
                                        </Form.Item>

                                        <Form.Item className="register-right-form-item"  label="Height " name="height "   >
                                            <Input  className="register-input-right"  type="text" placeholder={`Height `} />
                                            {/* <Select className="register-input-right-no-box" defaultValue="Ft" allowClear>
                                                <Option value="Ft">Ft</Option>
                                                <Option value="In">In</Option>
                                            </Select> */}
                                        </Form.Item>
                                        
                                    </Row>

                                    <Row className="register-form-submit-btn">         
                                        <CustomBtn id="save" btnType="primary" htmlType="submit" shape="round" loading={loading} size="default" > Submit </CustomBtn>                       
                                        {/* <Button type="primary" htmlType="submit" loading={loading}  > Submit </Button> */}
                                    </Row>
                                   
                                    <Row className="register-form-already-register">                
                                        <Form.Item className="register-form-already-register-item"> <Typography className="register-form-already-user">Already Registered?&nbsp;&nbsp;</Typography></Form.Item>                
                                        <Form.Item className="register-form-already-register-item"> <Link className="register-form-get-registered" to="/login">Login</Link></Form.Item>
                                    </Row>

                                </Form>
                            </Fragment>
                        </div>
                    </div>
                    <div className="register-right-panel">
                    </div>
                </div>
            </div>
    )
}