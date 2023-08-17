import React,{useState} from "react";
import { Typography,Divider,Row,Col,Form,Radio,TimePicker} from "antd";
import "./styles.css";
import {InputBaseField} from "../../components/InputField/InputField";
import {Label,CustomBtn} from "../../components/UiElements/UiElements";
import { ClockCircleTwoTone } from "@ant-design/icons";
import Header from "../../components/Header/Header"
export default function Settings(){
    const [state,setState]=useState({});
    const [loading,setLoading]=useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const  onTimeChange=(time, timeString)=>{
        console.log(time, timeString);
      }
    return(
        <>
            <Header title="Settings"/>
            <div className="settings-main">
                <Row>
                    <Typography className="settings-title">Target Range</Typography>
                    <Divider className="settings-divider" />
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="settings-custom-form">
                            <Row>
                                <Typography className="settings-subtitle">Before Meal</Typography>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Row className="div-margin-left">
                                        <Label title="Uppermost Limit"/>
                                        <InputBaseField
                                            name="beforeMealUppermostLimit" 
                                            value={state.beforeMealUppermostLimit}
                                            onChange={handleChange}
                                            placeholder="Uppermost Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>

                                <Col span={8}>
                                <Row className="div-margin-left">
                                        <Label title="Upper Limit"/>
                                        <InputBaseField
                                            name="beforeMealUpperLimit" 
                                            value={state.beforeMealUpperLimit}
                                            onChange={handleChange}
                                            placeholder="Upper Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>
                                
                                <Col span={8}>
                                    <Row className="div-margin-left">
                                        <Label title="Lower Limit"/>
                                        <InputBaseField
                                            name="beforeMealLowerLimit" 
                                            value={state.beforeMealLowerLimit}
                                            onChange={handleChange}
                                            placeholder="Lower Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>                                                                        
                            </Row>
                            <Row>
                                <Typography className="settings-subtitle">After Meal</Typography>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Row className="div-margin-left">
                                        <Label title="Uppermost Limit"/>
                                        <InputBaseField
                                            name="afterMealUppermostLimit" 
                                            value={state.afterMealUppermostLimit}
                                            onChange={handleChange}
                                            placeholder="Uppermost Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>

                                <Col span={8}>
                                <Row className="div-margin-left">
                                        <Label title="Upper Limit"/>
                                        <InputBaseField
                                            name="afterMealUpperLimit" 
                                            value={state.afterMealUpperLimit}
                                            onChange={handleChange}
                                            placeholder="Upper Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>
                                
                                <Col span={8}>
                                    <Row className="div-margin-left">
                                        <Label title="Lower Limit"/>
                                        <InputBaseField
                                            name="afterMealLowerLimit" 
                                            value={state.afterMealLowerLimit}
                                            onChange={handleChange}
                                            placeholder="Lower Limit"
                                            type="text"
                                        />
                                        <span className="unit">mg/dl</span>
                                    </Row>
                                </Col>                                                                    
                            </Row>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Typography className="settings-title">Meal Time</Typography>
                    <Divider className="settings-divider" />
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="settings-custom-form" layout="vertical">
                            <Row>
                                <Typography className="settings-meal-time-label">What is the time you have your brakfast?</Typography>
                                <Label title="Breakfast time"/>
                                <TimePicker use12Hours format="h:mm a"
                                name="breakfastTime" value={state.breakfastTime}  onChange={onTimeChange} 
                                />
                            </Row>
                            <Row>
                                <Typography className="settings-meal-time-data-area-subtitle">Below meal time automatically changed when you changed Breakfast time. </Typography>
                            </Row>
                            <Row className="settings-meal-time-data-area">
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text">Befor Brefast</Typography>
                                    <Typography className="settings-meal-time-data-text2">04:45 AM - 07:15 AM</Typography>
                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text">After Breakfast</Typography> 
                                    <Typography className="settings-meal-time-data-text2">07:15 AM - 09:45 AM</Typography>

                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text">Before Lunch</Typography>
                                    <Typography className="settings-meal-time-data-text2">09:45 AM - 12:15 PM</Typography>
                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text">After Lunch</Typography>            
                                    <Typography className="settings-meal-time-data-text2">12:15 PM - 02:45 PM</Typography>
                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text"> Before Dinner</Typography>
                                    <Typography className="settings-meal-time-data-text2">02:45 PM - 05:15 PM</Typography>
                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text">After Dinner</Typography>
                                    <Typography className="settings-meal-time-data-text2">05:15 PM - 07:45 PM</Typography>
                                </Row>
                                <Row className="settings-meal-time-data-row">
                                    <ClockCircleTwoTone className="settings-meal-time-data-icon"/>
                                    <Typography className="settings-meal-time-data-text"> Bed Time</Typography>            
                                    <Typography className="settings-meal-time-data-text2">07:45 PM - 04:45 AM</Typography>
                                </Row>

                            </Row>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Typography className="settings-title2">GB Units</Typography>
                    <Divider className="settings-divider" />
                </Row>
                <Row>
                    <div className="settings-meal-time">
                        <Radio.Group  defaultValue="mg-dl" onChange={handleChange} buttonStyle="solid">
                            <Radio.Button value="mg-dl">mg/dl</Radio.Button>
                            <Radio.Button value="mmol-l">mmol/l</Radio.Button>
                        </Radio.Group>
                    </div>
                </Row>
                <Row >                    
                    <Col span={12} >
                        <div className="settings-custom-form">
                            <Row className="settings-submit-btn">
                                <CustomBtn id="save" btnType="primary" shape="round" size="default" loading={loading} > Save </CustomBtn>
                            </Row>                            
                        </div>
                    </Col>                    
                </Row>
            </div>
        </>
    )
}
//size="default"