import React, { useState, useEffect } from "react";
import { Line } from '@ant-design/charts';
import { Empty } from 'antd';
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

// styles

import './style.css';


export default function TestReadingsAverage(props) {

    
    const [testReadingAverageData, setTestReadingAverageData] = useState([1]);

    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);
  
    //const [type] = useState("all");
 
  var config = {
    data: testReadingAverageData,
    xField: 'year',
    yField: 'value',
    height:163,
    color:'#FFB22B',
   
  
    // xAxis: {
    //   grid: {
    //     visible: false,
    //   },
    //   label: {
    //     style: {
    //       fill: 'white',
    //       opacity: 0.1, 
    //     },
    //   },

      
      
    // },
    // yAxis: {
    //   grid: {
    //     visible: false,
    //   },
    //   label: {
    //     style: {
    //       fill: 'white',
    //       opacity: 0.1, 
    //     },
    //   },

     
    // },
    
    point: {
      size: 5,
      shape: 'Circle',
      style: {
        fill: '#FFB22B',
        stroke: '#FFB22B',
        lineWidth: 1,
      },
    },
    

  };

    useEffect(() => {
        loadHighestReading();
    }, [props.startDate, props.endDate, props.type]);

    function loadHighestReading() {

        var params = {
            code: "gluco_Test_readingAverage",
            parameters: [userID, props.startDate, props.endDate, props.type]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {

            if (result.success && result.data != null) {
                
                setTestReadingAverageData(
                    result.data.map((item, i) => {
                        return {
                            year: item.t2,
                            value: parseInt(item.t1)
                        };
                    })
                );

            }
        })
    }

  return (
    <div className="Recent10ReadingsAverageLineChart">
    
     {testReadingAverageData.length > 0?
      <Line {...config} />:
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </div>
  );
}

