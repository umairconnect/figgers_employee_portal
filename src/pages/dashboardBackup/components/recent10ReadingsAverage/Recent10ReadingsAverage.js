import React, { useState, useEffect } from "react";
import { Line } from '@ant-design/charts';
import { Empty } from 'antd';
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

// styles

import './style.css';
// const data =[
//   {
//     meal: "Fasting",
//     value: 100,
   

//   },
//   {
//     meal: "After Breakfast",
//     value: 200,
    
//   },
//   {
//     meal: "Before Meal",
//     value: 40,
    
//   },
//   {
//     meal: "After Meal",
//     value: 400,
   
//   },
//   {
//     meal: "Random",
//     value: 60,
   
//   },
//   {
//     meal: "Dinner",
//     value: 200,
//   },
//   {
//     meal: "Bedtime",
//     value: 500,
   
//   },
// ];

export default function Recent10ReadingsAverage(props) {
 
    const [averageTenRecentReading, setAverageTenRecentReading] = useState([1]);
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);

  const config = {
    data: averageTenRecentReading,
    padding: 'auto',
    xField: 'meal',
    yField: 'value',
    height:335,
    width:783,
    label: {},
    point: {
      size: 0,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: 'white',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  
    annotations : [ 
      {
        type : 'regionFilter' , 
        start : [ 'min' , '0' ] ,  
        end : [ 'max' , '80' ] , 
        color:"#1976D2", 
        
      } ,
      {
        type : 'regionFilter' , 
        start : [ 'min' , '80' ] ,  
        end : [ 'max' , '200' ] , 
        color:"#1CADBF", 
        
      },
      {
        type : 'regionFilter' , 
        start : [ 'min' , '200' ] ,  
        end : [ 'max' , '300' ] , 
        color:"#FFB22B", 
        
      },
      {
        type : 'regionFilter' , 
        start : [ 'min' , '300' ] ,  
        end : [ 'max' , '500' ] , 
        color:"#EF5350", 
        
      }
    ] ,
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

        let t1 = parseInt(data.t1).toString();
        let t2 = parseInt(data.t2).toString();
        let t3 = parseInt(data.t3).toString();
        var params = {
            code: "gluco_TenAverage_recentReading",
            parameters: [t1, t2, t3, userID, props.startDate, props.endDate, props.type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {

                setAverageTenRecentReading(
                    result.data.map((item, i) => {
                        return {
                            meal: item.t1,
                            value: parseInt(item.t2)
                        };
                    })
                );

            }
        })
    }

  return (
    <div className="Recent10ReadingsAverageLineChart">
      {averageTenRecentReading.length > 0?
      <Line {...config} />:
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    
    </div>
  );
}

