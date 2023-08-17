import React, { useEffect, useState } from "react";
import { Input, DatePicker } from "antd";

import { Checkbox, FormControlLabel, TextField, Select, MenuItem } from "@material-ui/core";
import { SearchOutlined, Update } from "@material-ui/icons";
import ClearIcon from '@material-ui/icons/Clear';
import "./styles.css";

import useStyles from "./styles";

// const Option = { Select };
const { TextArea } = Input;

const { RangePicker } = DatePicker;


function InputBaseField({ id, placeholder, name, value, type, MaxLength, MinLength, IsDisabled, handleChangeDate, onClick, onChange, after, InputRef, InputProps, onKeyPress, restrictNegative, dateFormat, ...props }) {


    const onChangeEvent = (event) => {
        if (event.target.value.trim() === "" && event.target.value !== "") {
            return;
        }
        onChange(event);
    };


    const dateFormatList = ['MM-DD-YYYY', 'MM-DD-YYYY'];

    const onKeyDownEvent = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {type === "dateRange" ?
                <RangePicker
                    onChange={handleChangeDate}
                    id={id}
                    name={name}
                    value={value}
                    format={dateFormat}
                    className="custom-input"
                    format={dateFormatList}
                    onKeyDown={onKeyDownEvent}
                     />

                : type === "date" ?
                    <Input
                        id={id}
                        name={name}
                        value={value}
                        type={type}
                        addonAfter={after}
                        disabled={IsDisabled}
                        placeholder={placeholder}
                        onChange={onChangeEvent}
                        className="custom-input"
                        autoComplete="off"
                        maxLength={MaxLength}
                        format={dateFormat}
                        onKeyPress={onKeyPress}
                        onKeyDown={onKeyDownEvent}
                    />
                    :
                    <Input
                        id={id}
                        name={name}
                        value={value}
                        type={type}
                        addonAfter={after}
                        disabled={IsDisabled}
                        placeholder={placeholder}
                        onChange={onChangeEvent}
                        className="custom-input"
                        autoComplete="off"
                        maxLength={MaxLength}
                        format={dateFormat}
                        onKeyPress={onKeyPress}
                    />}

        </>
    )
}


function SelectField({ id, name, value, options, placeholder, className, defualtValue, onChange, IsDisabled, ...props }) {

    const classes = useStyles();

    const onChangeEvent = (value) => {
        onChange(name, value);
    };

    return (
        <>
            <Select
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                disabled={IsDisabled}
                className={className == false ? '' : classes.selectBaseInput}
                defaultValue={defualtValue}
                displayEmpty
            >

                <option value="">
                    {placeholder}
                </option>
                {
                    options.map(option => <option value={option.value}>{option.label}</option>)
                }
            </Select>
        </>
    )
}

function TextareaField({ id, name, rows, value, MaxLength, MinLength, placeholder, rowsMin, onChange, InputProps, Disabled, ...props }) {


    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>

            <TextArea id={id}
                rows={rows}
                placeholder={placeholder}
                maxLength={MaxLength}
                onChange={onChangeEvent}
                name={name}
                value={value}
                className="custom-input"
                disabled={Disabled}
                {...props}
            />

            {/* <TextareaAutosize
                id={id}
                className={classes.baseTextarea}
                rowsMin={rowsMin}
                placeholder={placeholder}
                onChange={onChangeEvent}
                name={name}
                value={value}
                maxLength={MaxLength}
                disabled={Disabled}
                inputProps={{ minlength: MinLength, autoComplete: "off", ...InputProps }}
                rows={5}
                {...props}

            /> */}

        </>
    );
}
function CheckboxField({ id, name, checked, label, labelPlacement, value, color, onChange, IsDisabled, ...props }) {


    const onChangeEvent = (event) => {
        if (onChange)
            onChange(event);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={IsDisabled}
                        color={color}
                        className="checkBoxBtn"
                        onChange={onChangeEvent}
                        name={name}
                        id={id}
                        checked={checked}
                        value={value}
                        {...props}

                    />
                }
                label={label}
                labelPlacement={labelPlacement}
            />

        </>
    );
}

function CollapsibleSearch({ placeholder, id, name, type, value, handleChange, onKeyPress, ...props }) {

    const [isSearch, setIsSearch] = useState(false);

    const showIsSearch = () => {
        setIsSearch(true);
    }

    const classes = useStyles();

    const hideIsSearch = () => {
        setIsSearch(false);
    }

    return (
        <div className={classes.customerSearch}>
            <TextField
                size="small"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                InputProps={{
                    endAdornment:
                        !isSearch ?
                            <SearchOutlined onClick={showIsSearch} /> :
                            <ClearIcon onClick={hideIsSearch} />

                }}
                variant="outlined"
                type={type}
                onChange={handleChange}
                onKeyPress={onKeyPress}
                className={isSearch ? classes.SearchFieldOpen : classes.SearchField}

            />
        </div>

    )
}

function SearchFormField({ placeholder, id, name, type, value, handleChange, onKeyPress, ...props }) {


    const classes = useStyles();


    return (
        <div className={classes.customerSearch}>
            <TextField
                size="small"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                InputProps={{
                    endAdornment:
                        <SearchOutlined />
                }}
                variant="outlined"
                type={type}
                onChange={handleChange}
                onKeyPress={onKeyPress}
                className={classes.SearchFieldOpen}

            />
        </div>

    )
}

export { InputBaseField, SelectField, CheckboxField, TextareaField, CollapsibleSearch, SearchFormField };