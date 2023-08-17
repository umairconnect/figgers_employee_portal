import React, { useState, useEffect } from "react";
import { Column } from '@ant-design/charts';
import { Empty } from 'antd';
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

// styles

import './style.css';


export default function Recent10Readings(props) {

    const [highestTenReadingData, setHighestTenReadingData] = useState([1]);
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
  
  // var data = [ 
  //   {
  //     Reading : 'Normal' , 
  //     Month : '1st June' , 
  //     Average: 100, 
  //     meal:1
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '1st June' , 
  //     Average: 240, 
  //     meal:2
  //   } ,
  //   {
  //     Reading : 'Low' , 
  //     Month : '1st June' , 
  //     Average: 70, 
  //     meal:3
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '1st June' , 
  //     Average: 270 , 
  //     meal:4
  //   } ,
  //   {
  //     Reading : 'Very High' , 
  //     Month : '1st June' , 
  //     Average: 400 , 
  //     meal:5
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '1st June' , 
  //     Average: 150 ,
  //     meal:6
  //   } ,
  //   {
  //     Reading : 'Normal' , 
  //     Month : '31 May' , 
  //     Average: 100, 
  //     meal:1,
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '31 May' , 
  //     Average: 240, 
  //     meal:2,
  //   } ,
  //   {
  //     Reading : 'Low' , 
  //     Month : '31 May' , 
  //     Average: 70, 
  //     meal:3,
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '31 May' , 
  //     Average: 270 , 
  //     meal:4
  //   } ,
  //   {
  //     Reading : 'Very High' , 
  //     Month : '31 May' , 
  //     Average: 400 , 
  //     meal:5
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '31 May' , 
  //     Average: 150 ,
  //     meal:6
  //   } ,
    
  //   {
  //     Reading : 'Normal' , 
  //     Month : '30 May' , 
  //     Average: 100, 
  //     meal:1,
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '30 May' , 
  //     Average: 240, 
  //     meal:2,
  //   } ,
  //   {
  //     Reading : 'Low' , 
  //     Month : '30 May' , 
  //     Average: 70, 
  //     meal:3,
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '30 May' , 
  //     Average: 270 , 
  //     meal:4
  //   } ,
  //   {
  //     Reading : 'Very High' , 
  //     Month : '30 May' , 
  //     Average: 400 , 
  //     meal:5
  //   } ,
  //   {
  //     Reading : 'High' , 
  //     Month : '30 May' , 
  //     Average: 150 ,
  //     meal:6
  //   } 
    

  //   ];

  var config = { 
      data: highestTenReadingData,
    isGroup : true , 
   
    legend  :true,
    xField : 'Month' , 
    yField : 'Average',
    groupField:'meal', 
    seriesField : 'Reading' ,
    maxColumnWidth:17,
   
    //colorField: 'Reading',
    // columnStyle : { 
    //   radius : [ 2 , 2 , 0 , 0 ] ,
    // } ,
    color: ({ Reading }) => {
      if(Reading === 'Low'){
        return '#1976D2';
      }
      else if(Reading === 'High'){
        return '#FFB22B';
      }
      else if(Reading === 'Very High'){
        return '#EF5350';
      }
      else if (Reading === 'Normal'){
        return '#1CADBF';
      }
    },
    label : { 
      content : ({ meal }) => {
        if(meal === 1){
        return 'Fasting';
      }
      else if (meal === 2){
        return 'After Breakfast';
      }
      else if (meal === 3){
        return 'Before Lunch';
      }
      else if (meal === 4){
        return 'After Lunch';
      }
      else if (meal === 5){
        return 'Before Dinner';
      }
      else if (meal === 6){
        return 'at Bed time';
      }
     
      } ,
      offset: -35 ,
      position : 'start' , 
      // layout : [ 
      //   { type : 'interval-adjust-position' } ,   
      //   { type : 'interval-hide-overlap' } ,   
      //   { type : 'adjust-color' } ,   
      // ] ,
      style: {
        fontSize: 12,
        fill: 'black',
        opacity: 1,
      },
      rotate: 300,
      label: { offset: -15 },
    }
    
    };

    useEffect(() => {


        var params = {
            code: "gluco_user_parameters",
            parameters: [userID]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                loadHighestReading(result.data[0]);

            }
        })

    }, [props.startDate, props.endDate, props.type]);

    function loadHighestReading(data) {

        var params = {
            code: "gluco_ten_reading",
            parameters: [data.t1, data.t2, data.t3, data.t4, data.t5, data.t6, userID, props.startDate, props.endDate, props.type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setHighestTenReadingData(
                result.data.map((item, i) =>
                {
                        return {
                            Reading: item.t4,
                            Month: item.t3,
                            Average: parseInt(item.t2),
                            meal: parseInt(item.t1)
                        };
                    })
                );

            }
        })
    }

  return (
    <div className="Recent10ReadingsAverageLineChart">
     
     {highestTenReadingData.length > 0?
      <Column  {...config} />:
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </div>
  );
}

