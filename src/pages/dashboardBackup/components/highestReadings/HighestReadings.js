import React, { useState, useEffect }  from "react";
import { Line } from '@ant-design/charts';
import { PostDataAPI } from '../../../../Services/APIService';
import { GetUserInfo } from '../../../../Services/GetUserInfo';

// styles

import './style.css';


export default function TestReadingsAverage(props) {

    const [highestReadingData, setHighestReadingData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);
    const [userID] = useState(JSON.parse(GetUserInfo()).user.userID);


  var data = [
    {
      year: '05/15/2023',
      value: 250,
    },
    {
      year: '05/14/2023',
      value: 300,
    },
    {
      year: '05/13/2023',
      value: 300,
    },
    {
      year: '05/12/2023',
      value: 350,
    },
    {
      year: '05/11/2023',
      value: 400,
    },
    
  ];
  var config = {
    data: highestReadingData,
    xField: 'year',
    yField: 'Readings',
    height:198,
    color:'white',
   
  
    xAxis: {
      grid: {
        visible: false,
      },
      label: {
        style: {
          fill: '#EF5350',
          opacity: 0.1,
          height:0,
          width:0, 
        },
      },

      
      
    },
    yAxis: {
      grid: {
        visible: false,
      },
      label: {
        style: {
          fill: '#EF5350',
          opacity: 0.1, 
          height:0,
          width:0,
        },
      },

     
    },
    
    point: {
      size: 5,
      shape: 'Circle',
      style: {
        fill: 'white',
        stroke: 'white',
        lineWidth: 0.2,
      },
    },
    

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
        let t4 = parseInt(data.t4).toString();

        var params = {
            code: "gluco_highest_reading",
            parameters: [t1, userID, props.startDate, props.endDate, props.type, t4]
        };

        PostDataAPI("ddl/loadItems", params).then((result) => {
           
            if (result.success && result.data != null)
            {

                props.RecordCount(result.data.length);

                setHighestReadingData(
                    result.data.map((item, i) => {
                        return { Readings: parseInt(item.t1) , year: new Date(item.t2).toLocaleDateString() };
               }));

            }
        })
    }

  return (
    <div className="Recent10ReadingsAverageLineChart">
     <Line {...config} />
    </div>
  );
}

