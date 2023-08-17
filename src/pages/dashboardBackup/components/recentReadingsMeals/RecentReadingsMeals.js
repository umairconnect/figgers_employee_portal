import React, { useState, useEffect } from "react";
import { Row, Col, Card, Radio } from "antd";
import { PostDataAPI } from '../../../../Services/APIService';
import Breakfast from '../../../../images/icons/Breakfast.png';
import BreakfastBlue from '../../../../images/icons/Breakfast-blue.png';
import LunchBlue from '../../../../images/icons/Lunch-blue.png';
import Lunch from '../../../../images/icons/Lunch.png';
import Dinner from '../../../../images/icons/Dinner.png';
import DinnerBlue from '../../../../images/icons/Dinner-blue.png';

// styles

import './styles.css';
import {
    CalendarOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

export default function RecentReadingsMeals(props) {

    const [recentReadingsData, setRecentReadingsData] = useState([]);
    const [beforeMeal, setBeforeMeal] = useState("");
    const [foodType, setFoodType] = useState("");
    const [lastReading, setLastReading] = useState('Breakfast');
    const [bMealTime, setBMealTime] = useState('BeforeMeal');
    const [lMealTime, setLMealTime] = useState('BeforeMeal');
    const [dMealTime, setDMealTime] = useState('BeforeMeal');

    useEffect(() =>
    {
        loadLastTenReading('Before', 'Breakfast');
    }, [props.startDate, props.endDate, props.type]);

    const lastReadingOnClick = (e) => {

        let lastReadingValue = e.target.value;
        setFoodType(lastReadingValue);
        setLastReading(lastReadingValue);
        loadLastTenReading(beforeMeal, lastReadingValue);
    }
    const breakfastMealOnClick = (e) => {

        let mealValue = e.target.value;
        if (mealValue == "BeforeMeal") {
            setBeforeMeal("Before");
        }
        else {
            setBeforeMeal("After");
        }
        setBMealTime(mealValue);
        loadLastTenReading(mealValue == "BeforeMeal" ? "Before" : "After", lastReading);

    }
    const lunchMealOnClick = (e) => {

        let mealValue = e.target.value;
        if (mealValue == "BeforeMeal") {
            setBeforeMeal("Before");
        }
        else {
            setBeforeMeal("After");
        }

        setLMealTime(mealValue);
        loadLastTenReading(mealValue == "BeforeMeal" ? "Before" : "After", lastReading);


    }
    const dinnerMealOnClick = (e) => {

        let mealValue = e.target.value;
        if (mealValue == "BeforeMeal") {
            setBeforeMeal("Before");
        }
        else {
            setBeforeMeal("After");
        }

        setDMealTime(mealValue);
        loadLastTenReading(mealValue == "BeforeMeal" ? "Before" : "After", lastReading);

    }

    function loadLastTenReading(before, foodTime) {
        
        setBeforeMeal(before);
    
        var params = {
            code: "gluco_LastFive_Meal",
            parameters: [props.type, before, foodTime, props.userID, props.startDate, props.endDate]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setRecentReadingsData(
                    result.data.map((item, i) => {
                        return {
                            t1: item.t1, t2: item.t2, t3: item.t3,
                            t4: parseInt(item.t4), t5: item.t5,
                            t6: item.t6
                        };
                    }));
            }
        })
    }

    return (
        <>
            <Card bordered={false} className="card last-10-readings">
                <span className="card-title">Recent Readings </span>
                <Radio.Group defaultValue="Breakfast" disabled={props.disabledMealTime} onChange={lastReadingOnClick} className="reading-time-table">
                    <Radio.Button value="Breakfast">
                        <img className="simple-img" src={Breakfast} alt="Breakfast" />
                        <img className="simple-blue" src={BreakfastBlue} alt="Breakfast" />
                        <span>Breakfast</span></Radio.Button>
                    <Radio.Button value="Lunch">
                        <img className="simple-img" src={Lunch} alt="Lunch" />
                        <img className="simple-blue" src={LunchBlue} alt="Lunch" />
                        <span>Lunch</span>
                    </Radio.Button>
                    <Radio.Button value="Dinner">
                        <img className="simple-img" src={Dinner} alt="Dinner" />
                        <img className="simple-blue" src={DinnerBlue} alt="Dinner" />
                        <span>Dinner</span>
                    </Radio.Button>
                </Radio.Group>

            {lastReading == "Breakfast" ? <>
                <div className="meal-box">
                        <Radio.Group defaultValue="BeforeMeal" disabled={props.disabledMealTime} onChange={breakfastMealOnClick} buttonStyle="solid">
                        <Radio.Button value="BeforeMeal">Before Meal</Radio.Button>
                        <Radio.Button value="AfterMeal">After Meal</Radio.Button>
                    </Radio.Group>
                </div>
                {bMealTime == "BeforeMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }

                </> : null}
                {bMealTime == "AfterMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }
                </> : null}
            </> : null}
            {lastReading == "Lunch" ? <>
                <div className="meal-box">
                        <Radio.Group defaultValue="BeforeMeal" disabled={props.disabledMealTime} onChange={lunchMealOnClick} buttonStyle="solid">
                        <Radio.Button value="BeforeMeal">Before Meal</Radio.Button>
                        <Radio.Button value="AfterMeal">After Meal</Radio.Button>
                    </Radio.Group>
                </div>
                {lMealTime == "BeforeMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }
                </> : null}
                {lMealTime == "AfterMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }
                </> : null}
            </> : null}
            {lastReading == "Dinner" ? <>
                <div className="meal-box">
                        <Radio.Group defaultValue="BeforeMeal" disabled={props.disabledMealTime} onChange={dinnerMealOnClick} buttonStyle="solid">
                        <Radio.Button value="BeforeMeal">Before Meal</Radio.Button>
                        <Radio.Button value="AfterMeal">After Meal</Radio.Button>
                    </Radio.Group>
                </div>
                {dMealTime == "BeforeMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }
                </> : null}
                {dMealTime == "AfterMeal" ? <>
                    {
                        recentReadingsData.map((item, i) => (

                            <> <Row className="meal-list">
                                <Col span={8}><CalendarOutlined />{item.t3}</Col>
                                <Col span={10}><ClockCircleOutlined />{item.t6}</Col>
                                <Col span={6}><span className="meal-rate high">{item.t4}<span>{item.t5}</span></span></Col>
                            </Row>
                            </>
                        ))
                    }
                </> : null}
                </> : null}
            </Card>
        </>
        )
}