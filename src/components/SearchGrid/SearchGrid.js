import React, { useState,useEffect } from 'react';
import { Table,Row,Col,Button,Divider } from 'antd';
import { data as gridCnfg } from "./SetupData";
import {InputBaseField} from "../InputField/InputField"
import { PlusCircleOutlined,PlusCircleTwoTone} from '@ant-design/icons';

//styles
import "./styles.css";

function SearchGrid({code,apiUrl,selection,rowClick,searchPanelParams,tableTitle,isSearch,onAddNew,...props}) {

  const [loading,setLoading]=useState(false);
  const [value,setValue]=useState("");
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [rowsData,setRowsData]=useState([]);
  const [dataList]=useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,30,]);

      const data = [
        {
          id: 1,
          key:1,
          name: 'John Doe',
          relation: 'Child',
          email: 'johndoe@gmail.com',
          phone:'(555) 555-1234',
          verified:'Not verified',
          action:"1"
        },
        {
            id: 2,
            key:2,
            name: 'John Smith',
            relation: 'Brother',
            email: 'johnsmith@gmail.com',
            phone:'(555) 555-5678',
            verified:'verified'
        },
        {
            id: 3,
            key:3,
            name: 'Anna John',
            relation: 'Mother',
            email: 'annajohn@gmail.com',
            phone:'(555) 555-9101',
            verified:'Verified'
        },
      ];

      useEffect(() => {
        if(true){
          setRowsData(
            dataList.map((item,i)=>{
              return(
                {
                  id: i,
                  key:i,
                  name: 'John Doe '+i,
                  relation: 'Child '+i,
                  email: 'johndoe@gmail.com '+i,
                  phone:'(555) 555-1234 '+i,
                  verified:'Not verified '+i,
                }
              )
            })
          )
        }        
      }, [value])

      const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
      const onSearchChange=(e)=>{
        const currValue = e.target.value;        
        const filteredData = rowsData.filter(entry =>
          entry.name.includes(currValue)
        );
        setValue(currValue);
        setRowsData(filteredData);
      }
    return (
      <>       
        <div className="custom-grid">
        <Row className="grid-search-col">
          <Col span={7} className="grid-search-col">
            {isSearch ?<InputBaseField
              name="searhTerm"
              placeholder="Search"
              value={value}
              onChange={onSearchChange}
            />:""}
            <Button type="text" onClick={onAddNew} icon={<PlusCircleTwoTone />} className="grid-add-new-button">Add New</Button>
          </Col>
      </Row>
        { selection ?
            <Table rowSelection={{rowSelection}} dataSource={rowsData} columns={gridCnfg[searchPanelParams]} />
            :
            <Table size="small" dataSource={rowsData}  columns={gridCnfg[searchPanelParams]} />       
        }
        </div>
        </>
    )
}

export default SearchGrid
