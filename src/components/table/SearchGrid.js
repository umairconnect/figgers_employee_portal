import React, { useState, useEffect, useRef } from "react";

import { Button, Grid, InputBase, Popper, Grow, Paper, ClickAwayListener, Link, MenuList } from "@material-ui/core";

import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { data as gridCnfg } from './setupData';

import { SearchOutlined as SearchIcon } from '@material-ui/icons';

import Details from './../../assets/img/action/details.svg';
import MonthlyUsage from './../../assets/img/action/monthlyUsage.svg';
import Settings from './../../assets/img/action/settings.svg';
import ActionIcon from './../../assets/img/action/action.svg';
import ChangeName from './../../assets/img/action/changeName.svg';
import Reconnect from './../../assets/img/action/reconnect.svg';
import Disconnect from './../../assets/img/action/disconnect.svg';
import Suspend from './../../assets/img/action/suspend.svg';
import SimSwap from './../../assets/img/action/undo.svg';
import Usage from './../../assets/img/action/usage.svg';
import Forward from './../../assets/img/action/forward.svg';
import Delete from './../../assets/img/icons/Delete.svg';
import Pen from './../../assets/img/action/pen.svg';
import DeleteNoSpace from './../../assets/img/icons/DeleteNoSpace.svg';

import LoadingIcon from "./../../assets/img/icons/loaderIcon.gif";
import AddNotes from './../../assets/img/icons/addNotes.svg'
import ViewNotes from './../../assets/img/icons/eye.svg';

import LogOff from './../../assets/img/icons/LogOff.svg';
import PlayPause from './../../assets/img/icons/playPause.svg';
import NoRecord from "./../NoRecord/NoRecord";
import AddIcon from "./../../assets/img/buttonIcons/add.svg";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewActiveLog from './../../assets/img/icons/activeLog.svg'
import { formatDate, numberDisplay } from '../../../src/components/Common/Extensions';

import { Table, Empty, Dropdown, message, Menu, Typography, Tag } from 'antd';

import useStyles from "./styles";
import './style.css';
import 'antd/dist/antd.css';

export default function SearchGrid({ onChange, selectedView, Icon, columns, isSearchAble, onActionClick, onEditClick, onDeleteClick, onRowClick, isUpdate, list, onChangeSearchValue, isGridLoaded, ...props }) {
    const classes = useStyles();
    const regex = /(<([^>]+)>)/ig;
    const [values, setValues] = useState({});
    const [value, setValue] = useState('');

    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.filter !== undefined && props.filter != '') {
            handleSearchChange(props.filter);
        } else {
            loadGridData(list);
        }

    }, [isUpdate]);

    const items = [
        { key: 'lineDetails', label: 'Line Details', icon: Details },
        { key: 'reconnect', label: 'Reconnect', icon: Reconnect },
        { key: 'restore', label: 'Restore', icon: Reconnect },
        { key: 'usage', label: 'Usage', icon: Usage },
        { key: 'monthlyUsage', label: 'Monthly Usage', icon: MonthlyUsage },
        { key: 'changePhoneNumber', label: 'Change Phone Number', icon: Settings },
        { key: 'changeLineName', label: 'Change Line Name', icon: ChangeName },
        { key: 'forwardNumber', label: 'Forward Number', icon: Forward },
        { key: 'suspendNumber', label: 'Suspend Number', icon: Suspend },
        { key: 'customerNotes', label: 'Add Notes', icon: AddNotes },
        { key: 'viewCustomerNotes', label: 'View Notes', icon: ViewNotes },
        { key: 'viewActivityLog', label: 'View Log', icon: ViewActiveLog },
        { key: 'simSwipe', label: 'Swap SIM', icon: SimSwap },
        { key: 'imeiCheck', label: 'IMEI Check', icon: Details },
        { key: 'disconnect', label: 'Disconnect', icon: Disconnect },
    ];
    const corporateUserItems = [
        { key: 'setupUsers', label: 'Setup Users', icon: AddIcon },
        { key: 'monthToDateReport', label: 'Month To Date Report', icon: MonthlyUsage },
        { key: 'updateRecord', label: 'Update Record', icon: ChangeName },
        { key: 'killSwitch', label: 'Kill Switch', icon: LogOff },
        { key: 'playPause', label: 'Deactivate', icon: PlayPause },
    ];

    const orderTrackingAction = [
        { key: 'printLabel', label: 'Print Label', icon: AddIcon },
        { key: 'details', label: 'Details', icon: MonthlyUsage },
        { key: 'statusSummary', label: 'Summary', icon: ViewNotes },
        { key: 'updateRecord', label: 'Update Record', icon: ChangeName },
        { key: 'delete', label: 'Delete', icon: DeleteNoSpace },
    ];

    const dealActions = [
        { key: 'edit', label: 'Update', icon: ChangeName },
        { key: 'delete', label: 'Delete', icon: DeleteNoSpace },
    ];
    const onClick = (key, item) => {
        if (onActionClick) {
            onActionClick(key, item);
        }
        // message.info(`Click on item ${item.label}`);
    };
    const loadGridData = (_filteredRecord) => {
        if (_filteredRecord) {
            setRowsData(
                _filteredRecord.map((item, i) => {
                    item.customerInformation = <div className={classes.customerInformation}>
                        <span>
                            <Typography component="h5">Full Name: </Typography>
                            <Typography component="p">{item.fullName}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Phone #:</Typography>
                            <Typography component="p">{item.phone}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Email :</Typography>
                            <Typography component="p">{item.email}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Address :</Typography>
                            <Typography component="p">{item.address}</Typography>
                        </span>
                    </div>
                    item.orderInformation = <div className={classes.orderInformation}>
                        <span>
                            <Typography component="h5">Order Date: </Typography>
                            <Typography component="p">{item.orderDate}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Figgers Account:</Typography>
                            <Typography component="p">{item.figgersAccount}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Billing Cycle:</Typography>
                            <Typography component="p">{item.billingCycle}</Typography>
                        </span>
                        <span>
                            <Typography component="h5">Plan:</Typography>
                            <Typography component="p">{item.plan}</Typography>
                        </span>
                    </div>
                    item.requestAction = <Button className={classes.requestActionBtn}>Process</Button>

                    item.orderStatus = item.orderStatus

                    item.prepaidAction = <div className="textCenter">
                        <Dropdown overlay={<Menu>
                            {
                                items.map((menuItem, index) => {
                                    if (
                                        (item.status == 'Disconnected' && (menuItem.key != 'reconnect' && menuItem.key != 'lineDetails' && menuItem.key != 'customerNotes' && menuItem.key != 'viewCustomerNotes' && menuItem.key != 'viewActivityLog'))
                                        || (menuItem.key == 'restore' && item.status != 'Suspended')
                                        || (menuItem.key == 'disconnect' && item.status == 'Disconnected')
                                        || (menuItem.key == 'suspendNumber' && item.status == 'Suspended')
                                        || (menuItem.key == 'reconnect' && item.status != 'Disconnected')
                                    )
                                        return ''
                                    else
                                        return <Menu.Item
                                            onClick={() => onClick(menuItem.key, item)}
                                            key={menuItem.key}
                                            className={classes.DropdownItems}
                                        > <img src={menuItem.icon} /> {menuItem.label}
                                        </Menu.Item>
                                })
                            }
                        </Menu>} trigger={["click"]}
                            className={classes.actionDropDown}>
                            <Button className={classes.actionBtn} startIcon={<img src={ActionIcon} alt="action" />}>
                                Actions <ArrowDropDownIcon />
                            </Button>
                        </Dropdown>
                    </div>
                    item.corporateUserAction = <div className="textCenter">
                        <Dropdown overlay={<Menu>
                            {
                                corporateUserItems.map((menuItem, index) => {
                                    return <Menu.Item
                                        onClick={() => onClick(menuItem.key, item)}
                                        key={menuItem.key}
                                        className={classes.DropdownItems}
                                    > <img src={menuItem.icon} /> {menuItem.label}
                                    </Menu.Item>
                                })
                            }
                        </Menu>} trigger={["click"]}
                            className={classes.actionDropDown}>
                            <Button className={classes.actionBtn} startIcon={<img src={ActionIcon} alt="action" />}>
                                Actions <ArrowDropDownIcon />
                            </Button>
                        </Dropdown>
                    </div>
                    item.postpaidAction = <div className="textCenter">
                        <Dropdown overlay={<Menu>
                            {
                                items.map((menuItem, index) => {
                                    return <Menu.Item
                                        onClick={() => onClick(menuItem.key, item)}
                                        key={menuItem.key}
                                        className={classes.DropdownItems}
                                    > <img src={menuItem.icon} /> {menuItem.label}
                                    </Menu.Item>
                                })
                            }
                        </Menu>} trigger={["click"]}
                            className={classes.actionDropDown}>
                            <Button className={classes.actionBtn} startIcon={<img src={ActionIcon} alt="action" />}>
                                Actions <ArrowDropDownIcon />
                            </Button>
                        </Dropdown>
                    </div>

                    item.orderTrackingAction = <div className="textCenter">
                        <Dropdown overlay={<Menu>
                            {
                                orderTrackingAction.map((menuItem, index) => {
                                    if ((menuItem.key == 'delete' || menuItem.key == 'updateRecord') && (item.isDeleted || item.status == "MV")) {
                                        return '';
                                    } else if (menuItem.key == 'details' && !item.orderId) {
                                        return '';
                                    }
                                    else {
                                        return <Menu.Item
                                            onClick={() => onClick(menuItem.key, item)}
                                            key={menuItem.key}
                                            className={classes.DropdownItems}
                                        > <img src={menuItem.icon} /> {menuItem.label}
                                        </Menu.Item>
                                    }

                                })
                            }
                        </Menu>} trigger={["click"]}
                            className={classes.actionDropDown}>
                            <Button className={classes.actionBtn} startIcon={<img src={ActionIcon} alt="action" />}>
                                Actions <ArrowDropDownIcon />
                            </Button>
                        </Dropdown>
                    </div>

                    item.customerNotesAction = <>

                        <div className={classes.linkContainer} style={{ justifyContent: 'center' }}>
                            {onDeleteClick ?
                                <Tooltip title="Delete">
                                    <img src={Delete} onClick={() => { onDeleteClick(item) }} />
                                </Tooltip> :
                                ''}
                        </div>

                    </>
                    item.inventoryAction = <>

                        <div className={classes.linkContainer} style={{ justifyContent: 'center' }}>
                            {onDeleteClick ?
                                <Tooltip title="Delete">
                                    <img src={Delete} onClick={() => { onDeleteClick(item) }} />
                                </Tooltip> :
                                ''}

                            {onEditClick ?
                                <Tooltip title="Edit">
                                    <img src={Pen} onClick={() => { onEditClick(item) }} />
                                </Tooltip> :
                                ''}
                        </div>
                    </>
                    item.commonAction = <>
                        <div className={classes.commonAction}>

                            {onDeleteClick ?
                                <Tooltip title="Delete">
                                    <img src={Delete} onClick={() => { onDeleteClick(item) }} />
                                </Tooltip> :
                                ''}

                            {onEditClick ?
                                <Tooltip title="Edit">
                                    <img src={Pen} width="20px" onClick={() => { onEditClick(item) }} />
                                </Tooltip> :
                                ''}

                        </div>

                    </>
                    item.customNoteHTML = <>
                        <Tooltip title={<p dangerouslySetInnerHTML={{
                            __html: item.customNote,
                        }}></p>}>
                            <p className={classes.truncate} dangerouslySetInnerHTML={{
                                __html: item.customNote,
                            }}></p>
                        </Tooltip>
                    </>
                    item.noteHTML = <>
                        <Tooltip title={<p dangerouslySetInnerHTML={{
                            __html: item.note,
                        }}></p>}>
                            <p dangerouslySetInnerHTML={{
                                __html: item.note,
                            }}></p>
                        </Tooltip>
                    </>

                    item.dealAction = <>

                        <div className={classes.linkContainer} style={{ justifyContent: 'center' }}>
                            <Tooltip title="Delete">
                                <img src={Delete} onClick={() => { onActionClick('Delete', item) }} />
                            </Tooltip>

                            <Tooltip title="Edit">
                                <img src={Pen} onClick={() => { onActionClick('Edit', item) }} />
                            </Tooltip>
                        </div>
                    </>
                    item.damangeRepairAction =
                        <div className={classes.linkContainer} style={{ justifyContent: 'center' }}>
                            <Tooltip title="Reply">
                                <img src={Delete}  />
                            </Tooltip>
                        </div>
                        
                    item.statusCol = <div className="statuses"><span className={
                        item.status === "Active" ? 'activeStatus' :
                            item.status === "Inactive" ? 'inActiveStatus' :
                                item.status === "Suspended" ? 'SuspendedStatus' :
                                    item.status === "Disconnected" ? 'disconnectStatus' :
                                        item.status === "Hotlined" ? 'hotlineStatus' : ''


                    }> {item.status}</span >
                    </div>
                    { item.formattedAmount = columns == 'PaymentHistory' ? numberDisplay(item.amount, 2, 2, 0) : '' }
                    return { ...item }
                }
                ));
        }

    }

    const handleSearchChange = (currValue) => {


        const trimmedValue = currValue.trim()

        if (trimmedValue && trimmedValue != undefined && trimmedValue != null && trimmedValue != "") {

            if (onChangeSearchValue != undefined) {
                onChangeSearchValue(trimmedValue)
            }
            let filteredData = [];
            filteredData = [...list];
            filteredData = filteredData.filter(entry => {
                var hasValue = false;
                for (var prop in entry) {
                    if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                        hasValue = entry[prop]?.toString().toLowerCase().includes(trimmedValue.toLowerCase());
                        if (hasValue)
                            break;
                    }
                }
                return hasValue;
            }
            );
            if (isGridLoaded) {
                setRowsData(filteredData);
            } else {
                loadGridData(filteredData);
            }
        } else {
            const filteredData = [...list];
            if (isGridLoaded) {
                setRowsData(filteredData);
            } else {
                loadGridData(filteredData);
            }

        }

        isGridLoaded = true;
    }
    const handleClearInput = (name) => {
        setValue('');
        handleSearchChange('');
    };
    const handleSearch = (e) => {
        const currValue = e.target.value;
        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleSearchChange(currValue);
        }
    }

    return (
        <>
            {isSearchAble ?
                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: '5px 0px' }}>
                    <Grid container item direction="row" xs={3} sm={3} md={3} lg={3} xl={3} style={{ marginLeft: 'auto' }}>
                        <InputBase
                            id="search"
                            name="search"
                            value={value}
                            placeholder="Search"
                            className="grid-search-input"
                            startAdornment={<SearchIcon />}
                            endAdornment={value ? <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { handleClearInput('search') }} /> : ''}
                            onChange={handleSearch}
                        />

                    </Grid>
                </Grid>
                : ""}


            <div className="custom-grid">
                <Table
                    // loading={true}
                    onRow={onRowClick ?
                        (record, rowIndex) => {
                            return {
                                onClick: (e) => onRowClick(record),
                                Style: 'cursor: pointer'
                            };
                        }
                        : () => { }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={isLoading && LoadingIcon}
                                description={isLoading ? "Loading..." : <> <NoRecord Icon={Icon} message={props.noRecordMsg}></NoRecord> </>}
                                imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                            />
                        )
                    }}
                    checkStrictly={true}
                    rowClassName={(record, index) => "claimRow"}
                    scroll={true}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [10, 20, 30, 40] }}
                    dataSource={rowsData}
                    columns={gridCnfg[columns]}
                    size="small"
                // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                />
            </div>
        </>
    );
}