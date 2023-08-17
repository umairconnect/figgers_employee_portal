import { Space, Tag, Input } from 'antd';
import { formatDate, formatDateTime, formateMdnNumber, getFormatedDate } from '../../../src/components/Common/Extensions';
import { Tooltip } from 'antd';
import UserPlaceholder from "../../assets/img/userPlaceholder.svg";
import ImgPlaceholder from "../../assets/img/shop/ProductPlaceholder.svg";
import './style.css';

export const data = {

    PostpaidWireless: [
        {
            title: '',
            dataIndex: 'wirelessId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width120 textCenter",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Sr#',
            dataIndex: 'Sr',
            className: "width140",
            sorter: (a, b) => {
                a = a.Sr != null ? a.Sr.toString() : "";
                b = b.Sr != null ? b.Sr.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'PhoneNumber',
            className: "width80",
            sorter: (a, b) => {
                a = a.PhoneNumber != null ? a.PhoneNumber.toString() : "";
                b = b.PhoneNumber != null ? b.PhoneNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'ICC/SIM',
            dataIndex: 'sim',
            className: "width140",
            sorter: (a, b) => {
                a = a.sim != null ? a.sim.toString() : "";
                b = b.sim != null ? b.sim.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width120",
            sorter: (a, b) => {
                a = a.name != null ? a.name.toString() : "";
                b = b.name != null ? b.name.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Activated on",
            dataIndex: "activatedon",
            className: "width130",
            sorter: (a, b) => {
                a = a.activatedon != null ? a.activatedon.toString() : "";
                b = b.activatedon != null ? b.activatedon.toString() : "";
                return a.localeCompare(b);
            },
        },


        {
            title: 'Forwarded to',
            dataIndex: 'Forwardedto',
            className: "width150",
            sorter: (a, b) => {
                a = a.Forwardedto != null ? a.Forwardedto.toString() : "";
                b = b.Forwardedto != null ? b.Forwardedto.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'postpaidAction',
            fixed: "right",
            className: "width140 textCenter",
        },

    ],
    PrepaidWireless: [
        {
            title: '',
            dataIndex: 'wirelessId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Status',
            dataIndex: 'statusCol',
            className: "width130 textCenter",
            sorter: (a, b) => {
                a = a.statusCol != null ? a.statusCol.toString() : "";
                b = b.statusCol != null ? b.statusCol.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Phone #',
            dataIndex: 'mDN',
            className: "width130",
            sorter: (a, b) => {
                a = a.mDN != null ? a.mDN.toString() : "";
                b = b.mDN != null ? b.mDN.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formateMdnNumber(text);
            }
        },
        {
            title: 'ICC/SIM',
            dataIndex: 'iCC',
            className: "width140",
            sorter: (a, b) => {
                a = a.iCC != null ? a.iCC.toString() : "";
                b = b.iCC != null ? b.iCC.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'username',
            className: "width120",
            sorter: (a, b) => {
                a = a.username != null ? a.username.toString() : "";
                b = b.username != null ? b.username.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Plan Name',
            dataIndex: 'primaryPlanName',
            className: "width100",
            sorter: (a, b) => {
                a = a.primaryPlanName != null ? a.primaryPlanName.toString() : "";
                b = b.primaryPlanName != null ? b.primaryPlanName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Activated on",
            dataIndex: "activationDate",
            className: "width130",
            sorter: (a, b) => {
                a = a.activationDate != null ? a.activationDate.toString() : "";
                b = b.activationDate != null ? b.activationDate.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDate(text) + ' | ' + getFormatedDate(text,'hh:mm A');

            }
        },

        {
            //ESN>Equipment Serial Number
            title: 'Device',
            dataIndex: 'eSN',
            className: "width140",
            sorter: (a, b) => {
                a = a.eSN != null ? a.eSN.toString() : "";
                b = b.eSN != null ? b.eSN.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Forwarded to',
            dataIndex: 'Forwardedto',
            className: "width130",
            sorter: (a, b) => {
                a = a.Forwardedto != null ? a.Forwardedto.toString() : "";
                b = b.Forwardedto != null ? b.Forwardedto.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Notes',
            dataIndex: 'customNoteHTML',
            className: "width100",
            sorter: (a, b) => {
                a = a.customNoteHTML != null ? a.customNoteHTML.toString() : "";
                b = b.customNoteHTML != null ? b.customNoteHTML.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'prepaidAction',
            fixed: "right",
            className: "width140 textCenter",
        },

    ],
    PrepaidPackages: [
        {
            title: '',
            dataIndex: 'packageId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Phone #',
            dataIndex: 'phoneNumber',
            className: "width80",
            sorter: (a, b) => {
                a = a.phoneNumber != null ? a.phoneNumber.toString() : "";
                b = b.phoneNumber != null ? b.phoneNumber.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formateMdnNumber(text);
            }
        },
        {
            title: 'Name',
            dataIndex: 'packageName',
            className: "width100",
            sorter: (a, b) => {
                a = a.packageName != null ? a.packageName.toString() : "";
                b = b.packageName != null ? b.packageName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Category',
            dataIndex: 'category',
            className: "width80",
            sorter: (a, b) => {
                a = a.category != null ? a.category.toString() : "";
                b = b.category != null ? b.category.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Behavior',
            dataIndex: 'behavior',
            className: "width140",
            sorter: (a, b) => {
                a = a.behavior != null ? a.behavior.toString() : "";
                b = b.behavior != null ? b.behavior.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Usage Type',
            dataIndex: 'usageType',
            className: "width120",
            sorter: (a, b) => {
                a = a.usageType != null ? a.usageType.toString() : "";
                b = b.usageType != null ? b.usageType.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    PaymentHistory: [
        {
            title: '',
            dataIndex: 'id',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date',
            dataIndex: 'date',
            className: "width80",
            sorter: (a, b) => {
                a = a.date != null ? a.date.toString() : "";
                b = b.date != null ? b.date.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDate(text);
            }
        },
        {
            title: 'Amount',
            dataIndex: 'formattedAmount',
            className: "width80",
            sorter: (a, b) => {
                a = a.formattedAmount != null ? a.formattedAmount.toString() : "";
                b = b.formattedAmount != null ? b.formattedAmount.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return "$" + text;
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            className: "width80",
            sorter: (a, b) => {
                a = a.type != null ? a.type.toString() : "";
                b = b.type != null ? b.type.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width140",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    UserDetails: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date /Time',
            dataIndex: 'Sr#',
            className: "width140",
            sorter: (a, b) => {
                a = a.Sr != null ? a.Sr.toString() : "";
                b = b.Sr != null ? b.Sr.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Type',
            dataIndex: 'usageType',
            className: "width80",
            sorter: (a, b) => {
                a = a.usageType != null ? a.usageType.toString() : "";
                b = b.usageType != null ? b.usageType.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Destination Number',
            dataIndex: 'sim',
            className: "width140",
            sorter: (a, b) => {
                a = a.sim != null ? a.sim.toString() : "";
                b = b.sim != null ? b.sim.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Destination Operator',
            dataIndex: 'status',
            className: "width120",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Duration",
            dataIndex: "name",
            className: "width130",
            sorter: (a, b) => {
                a = a.name != null ? a.name.toString() : "";
                b = b.name != null ? b.name.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Amount ($) ',
            dataIndex: 'amount',
            className: "width120",
            sorter: (a, b) => {
                a = a.amount != null ? a.amount.toString() : "";
                b = b.amount != null ? b.amount.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Discount ($) ',
            dataIndex: 'discount',
            className: "width150",
            sorter: (a, b) => {
                a = a.discount != null ? a.discount.toString() : "";
                b = b.discount != null ? b.discount.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Net Amount ($)',
            dataIndex: 'netAmount',
            className: "width150",
            sorter: (a, b) => {
                a = a.netAmount != null ? a.netAmount.toString() : "";
                b = b.netAmount != null ? b.netAmount.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    SMSDetails: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date /Time',
            dataIndex: 'column3',
            className: "width140",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'From Number',
            dataIndex: 'column1',
            className: "width140",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'To Number',
            dataIndex: 'column2',
            className: "width140",
            sorter: (a, b) => {
                a = a.column2 != null ? a.column2.toString() : "";
                b = b.column2 != null ? b.column2.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: "Duration",
        //    dataIndex: "column4",
        //    className: "width130",
        //    sorter: (a, b) => {
        //        a = a.column4 != null ? a.column4.toString() : "";
        //        b = b.column4 != null ? b.column4.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Cost ($) ',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5.toString() : "";
                b = b.column5 != null ? b.column5.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Call Plan ',
        //    dataIndex: 'column6',
        //    className: "width120",
        //    sorter: (a, b) => {
        //        a = a.column6 != null ? a.column6.toString() : "";
        //        b = b.column6 != null ? b.column6.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},

    ],
    CallDetails: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date /Time',
            dataIndex: 'column3',
            className: "width140",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Type',
        //    dataIndex: 'column2',
        //    className: "width80",
        //    sorter: (a, b) => {
        //        a = a.column2 != null ? a.column2.toString() : "";
        //        b = b.column2 != null ? b.column2.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'From Number',
            dataIndex: 'column1',
            className: "width140",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'To Number',
            dataIndex: 'column2',
            className: "width120",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4.toString() : "";
                b = b.column4 != null ? b.column4.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Duration",
            dataIndex: "column4",
            className: "width130",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5.toString() : "";
                b = b.column5 != null ? b.column5.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Cost ($) ',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column6 != null ? a.column6.toString() : "";
                b = b.column6 != null ? b.column6.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Data Used ',
            dataIndex: 'column7',
            className: "width120",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7.toString() : "";
                b = b.column7 != null ? b.column7.toString() : "";
                return a.localeCompare(b);
            },
        },

        //{
        //    title: 'Discount ($) ',
        //    dataIndex: 'discount',
        //    className: "width150",
        //    sorter: (a, b) => {
        //        a = a.discount != null ? a.discount.toString() : "";
        //        b = b.discount != null ? b.discount.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        //{
        //    title: 'Net Amount ($)',
        //    dataIndex: 'netAmount',
        //    className: "width150",
        //    sorter: (a, b) => {
        //        a = a.netAmount != null ? a.netAmount.toString() : "";
        //        b = b.netAmount != null ? b.netAmount.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},

    ],

    DataDetails: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Date /Time',
            dataIndex: 'column3',
            className: "width140",
            sorter: (a, b) => {
                a = a.column3 != null ? a.column3.toString() : "";
                b = b.column3 != null ? b.column3.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Number',
            dataIndex: 'column1',
            className: "width80",
            sorter: (a, b) => {
                a = a.column1 != null ? a.column1.toString() : "";
                b = b.column1 != null ? b.column1.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Call To',
        //    dataIndex: 'column2',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.column2 != null ? a.column2.toString() : "";
        //        b = b.column2 != null ? b.column2.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: "Duration",
            dataIndex: "column4",
            className: "width130",
            sorter: (a, b) => {
                a = a.column4 != null ? a.column4.toString() : "";
                b = b.column4 != null ? b.column4.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Cost ($) ',
            dataIndex: 'column5',
            className: "width120",
            sorter: (a, b) => {
                a = a.column5 != null ? a.column5.toString() : "";
                b = b.column5 != null ? b.column5.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Call Plan ',
        //    dataIndex: 'column6',
        //    className: "width120",
        //    sorter: (a, b) => {
        //        a = a.column6 != null ? a.column6.toString() : "";
        //        b = b.column6 != null ? b.column6.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Data Used ',
            dataIndex: 'column7',
            className: "width120",
            sorter: (a, b) => {
                a = a.column7 != null ? a.column7.toString() : "";
                b = b.column7 != null ? b.column7.toString() : "";
                return a.localeCompare(b);
            },
        },

        //{
        //    title: 'Discount ($) ',
        //    dataIndex: 'discount',
        //    className: "width150",
        //    sorter: (a, b) => {
        //        a = a.discount != null ? a.discount.toString() : "";
        //        b = b.discount != null ? b.discount.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        //{
        //    title: 'Net Amount ($)',
        //    dataIndex: 'netAmount',
        //    className: "width150",
        //    sorter: (a, b) => {
        //        a = a.netAmount != null ? a.netAmount.toString() : "";
        //        b = b.netAmount != null ? b.netAmount.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},

    ],
    ActivityLog: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        //{
        //    title: 'Session ID',
        //    dataIndex: 'sessionId',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.sessionId != null ? a.sessionId.toString() : "";
        //        b = b.sessionId != null ? b.sessionId.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Date/Time',
            dataIndex: 'activityDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.activityDate != null ? a.activityDate.toString() : "";
                b = b.activityDate != null ? b.activityDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Account',
            dataIndex: 'accountNumber',
            className: "width120",
            sorter: (a, b) => {
                a = a.accountNumber != null ? a.accountNumber.toString() : "";
                b = b.accountNumber != null ? b.accountNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'MDN Number',
            dataIndex: 'mdnNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.mdnNumber != null ? a.mdnNumber.toString() : "";
                b = b.mdnNumber != null ? b.mdnNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'User',
            dataIndex: 'user',
            className: "width120",
            sorter: (a, b) => {
                a = a.user != null ? a.user.toString() : "";
                b = b.user != null ? b.user.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Activity",
            dataIndex: "details",
            className: "width180",
            sorter: (a, b) => {
                a = a.details != null ? a.details.toString() : "";
                b = b.details != null ? b.details.toString() : "";
                return a.localeCompare(b);
            },
        },


    ],
    AddNewSim: [
        {
            title: '',
            dataIndex: 'requestsId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Sr#',
            dataIndex: 'sr',
            className: "width140",
            sorter: (a, b) => {
                a = a.sr != null ? a.sr.toString() : "";
                b = b.sr != null ? b.sr.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            className: "width80",
            sorter: (a, b) => {
                a = a.orderNumber != null ? a.orderNumber.toString() : "";
                b = b.orderNumber != null ? b.orderNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Customer Information',
            dataIndex: 'customerInformation',
            className: "width140",
            sorter: (a, b) => {
                a = a.customerInformation != null ? a.customerInformation.toString() : "";
                b = b.customerInformation != null ? b.customerInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order Information',
            dataIndex: 'orderInformation',
            className: "width120",
            sorter: (a, b) => {
                a = a.orderInformation != null ? a.orderInformation.toString() : "";
                b = b.orderInformation != null ? b.orderInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Order Status",
            dataIndex: "orderStatus",
            className: "width130",
        },
        {
            title: 'Actions',
            dataIndex: 'requestAction',
            fixed: "right",
            className: "width140 textCenter",
        },
    ],
    customerNotes: [
        {
            title: 'Note',
            dataIndex: 'note',
            className: "maxWidth200",
            sorter: (a, b) => {
                a = a.note != null ? a.note.toString() : "";
                b = b.note != null ? b.note.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <div dangerouslySetInnerHTML={{ __html: text }} />
            }
        },
        {
            title: 'Added By',
            dataIndex: 'userName',
            className: "width150",
            sorter: (a, b) => {
                a = a.userName != null ? a.userName.toString() : "";
                b = b.userName != null ? b.userName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Note Date',
            dataIndex: 'noteDate',
            className: "width150",
            sorter: (a, b) => {
                a = a.noteDate != null ? a.noteDate.toString() : "";
                b = b.noteDate != null ? b.noteDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'customerNotesAction',
            fixed: "right",
            className: "width100 textCenter",
        },



    ],
    ViewLog: [
        {
            title: '',
            dataIndex: 'userId',
            className: "custom-grid-hide-col",
        },
        //{
        //    title: 'Session ID',
        //    dataIndex: 'sessionId',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.sessionId != null ? a.sessionId.toString() : "";
        //        b = b.sessionId != null ? b.sessionId.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Date/Time',
            dataIndex: 'activityDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.activityDate != null ? a.activityDate.toString() : "";
                b = b.activityDate != null ? b.activityDate.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Account',
            dataIndex: 'accountNumber',
            className: "width120",
            sorter: (a, b) => {
                a = a.accountNumber != null ? a.accountNumber.toString() : "";
                b = b.accountNumber != null ? b.accountNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'MDN Number',
            dataIndex: 'mdnNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.mdnNumber != null ? a.mdnNumber.toString() : "";
                b = b.mdnNumber != null ? b.mdnNumber.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formateMdnNumber(text);
            }
        },
        {
            title: 'User',
            dataIndex: 'user',
            className: "width120",
            sorter: (a, b) => {
                a = a.user != null ? a.user.toString() : "";
                b = b.user != null ? b.user.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            className: "width120",
            sorter: (a, b) => {
                a = a.type != null ? a.type.toString() : "";
                b = b.type != null ? b.type.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: "Activity",
            dataIndex: "details",
            className: "width130",
            sorter: (a, b) => {
                a = a.details != null ? a.details.toString() : "";
                b = b.details != null ? b.details.toString() : "";
                return a.localeCompare(b);
            },
        },


    ],
    CorporateManagement: [
        {
            title: 'Profile',
            dataIndex: 'UserProfile',
            className: "width140 textCenter",
        },
        {
            title: 'Account',
            dataIndex: 'Account',
            className: "width140",
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            className: "width140",
        },
        {
            title: 'Phone #',
            dataIndex: 'Phone',
            className: "width140",
        },
        {
            title: 'Email Address',
            dataIndex: 'EmailAddress',
            className: "width140",
        },
        {
            title: 'Cover',
            dataIndex: 'cover',
            className: "width140",
        },

        {
            title: 'Status',
            dataIndex: 'status',
            className: "width140",
        },
        {
            title: 'Actions',
            dataIndex: 'corporateUserAction',
            className: "width140 textCenter",
        },

    ],
    DomesticOrderTracking: [
        {
            title: 'Created By',
            dataIndex: 'createdByName',
            className: "width140",
            sorter: (a, b) => {
                a = a.createdByName != null ? a.createdByName.toString() : "";
                b = b.createdByName != null ? b.createdByName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Tracking Number',
            dataIndex: 'trackingNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.trackingNumber != null ? a.trackingNumber.toString() : "";
                b = b.trackingNumber != null ? b.trackingNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'attentionTo',
            className: "width140",
            sorter: (a, b) => {
                a = a.attentionTo != null ? a.attentionTo.toString() : "";
                b = b.attentionTo != null ? b.attentionTo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phone',
            className: "width140",
            sorter: (a, b) => {
                a = a.phone != null ? a.phone.toString() : "";
                b = b.phone != null ? b.phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'statusLabel',
            className: "width140",
            sorter: (a, b) => {
                a = a.statusLabel != null ? a.statusLabel.toString() : "";
                b = b.statusLabel != null ? b.statusLabel.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Scan',
            dataIndex: 'lastScanned',
            className: "width140",
            sorter: (a, b) => {
                a = a.lastScanned != null ? a.lastScanned.toString() : "";
                b = b.lastScanned != null ? b.lastScanned.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Actions',
            dataIndex: 'orderTrackingAction',
            className: "width140 textCenter",
        },

    ],

    ShopInventory: [
        {
            title: '',
            dataIndex: 'productId',
            className: "custom-grid-hide-col",
        },
        {
            title: 'Product #',
            dataIndex: 'productId',
            className: "width140 textCenter",
            sorter: (a, b) => a.productId - b.productId,
            //sorter: (a, b) => {
            //    a = a.productId != null ? a.productId.toString() : "";
            //    b = b.productId != null ? b.productId.toString() : "";
            //    return a.localeCompare(b);
            //},
        },
        {
            title: 'Product',
            dataIndex: 'name',
            className: "width140",
         
            render: (text, record) => (
                <div>
                    <img className={"inventoryProductImg"} src={record.filePath ? '.'+record.filePath : ImgPlaceholder} />
                    <Tooltip title={text}>{text}</Tooltip>
                </div>
            ),
            sorter: (a, b) => {
                a = a.name != null ? a.name.toString() : "";
                b = b.name != null ? b.name.toString() : "";
                return a.localeCompare(b);
            },

        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "maxWidth180",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            className: "width140 textCenter",
            // sorter: (a, b) => {
            //     a = a.quantity != null ? a.quantity.toString() : "";
            //     b = b.quantity != null ? b.quantity.toString() : "";
            //     return a.localeCompare(b);
            // },
            sorter: (a, b) => a.quantity - b.quantity, 

        },
        {
            title: 'Price',
            dataIndex: 'price',
            className: "width140 textCenter",
            sorter: (a, b) => a.price - b.price, 
            render: text => {
                return "$" + text
            }
        },
        {
            title: 'Actions',
            dataIndex: 'inventoryAction',
            className: "width140 textCenter",
        },
    ],
    shippingDetails: [
        {
            title: 'Sr#',
            dataIndex: 't4',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.t4 != null ? a.t4.toString() : "";
                b = b.t4 != null ? b.t4.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Product',
            dataIndex: 't5',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.t5 != null ? a.t5.toString() : "";
                b = b.t5 != null ? b.t5.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Quantity',
            dataIndex: 't2',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.t2 != null ? a.t2.toString() : "";
                b = b.t2 != null ? b.t2.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 't6',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.t6 != null ? a.t6.toString() : "";
                b = b.t6 != null ? b.t6.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Price',
            dataIndex: 't3',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.t3 != null ? a.t3.toString() : "";
                b = b.t3 != null ? b.t3.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    AllCustomerOrder: [
        {
            title: 'Order',
            dataIndex: 'orderId',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderId != null ? a.orderId.toString() : "";
                b = b.orderId != null ? b.orderId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Ordered Product',
            dataIndex: 'productNames',
            className: "width150",
            sorter: (a, b) => {
                a = a.productNames != null ? a.productNames.toString() : "";
                b = b.productNames != null ? b.productNames.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <div dangerouslySetInnerHTML={{ __html: text }} />
            }
        },

        {
            title: 'Shipment',
            dataIndex: 'trackingNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.Shipment != null ? a.Shipment.toString() : "";
                b = b.Shipment != null ? b.Shipment.toString() : "";
                return a.localeCompare(b);
            },
        },
      
       
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderDate != null ? a.orderDate.toString() : "";
                b = b.orderDate != null ? b.orderDate.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDateTime(text);

            }
        },

        {
            title: 'Address',
            dataIndex: 'orderAddress',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderAddress != null ? a.orderAddress.toString() : "";
                b = b.orderAddress != null ? b.orderAddress.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Status',
            dataIndex: 'orderStatus',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderStatus != null ? a.orderStatus.toString() : "";
                b = b.orderStatus != null ? b.orderStatus.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Amount',
            dataIndex: 'orderAmount',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderAmount != null ? a.orderAmount.toString() : "";
                b = b.orderAmount != null ? b.orderAmount.toString() : "";
                return a.localeCompare(b);
            },
        },


    ],
    orderList: [
        {
            title: 'Order #',
            dataIndex: 'orderId',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderId != null ? a.orderId.toString() : "";
                b = b.orderId != null ? b.orderId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Product Name',
            dataIndex: 'productNames',
            className: "width140",
            sorter: (a, b) => {
                a = a.productNames != null ? a.productNames.toString() : "";
                b = b.productNames != null ? b.productNames.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <div dangerouslySetInnerHTML={{ __html: text }} />
            }
        },



        //{
        //    title: 'Product Description',
        //    dataIndex: 'ProductDescription',
        //    className: "width140 textCenter",
        //    sorter: (a, b) => {
        //        a = a.ProductDescription != null ? a.ProductDescription.toString() : "";
        //        b = b.ProductDescription != null ? b.ProductDescription.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            className: "width140",
            sorter: (a, b) => {
                a = a.customerName != null ? a.customerName.toString() : "";
                b = b.customerName != null ? b.customerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'customerPhone',
            className: "width140",
            sorter: (a, b) => {
                a = a.customerPhone != null ? a.customerPhone.toString() : "";
                b = b.customerPhone != null ? b.customerPhone.toString() : "";
                return a.localeCompare(b);
            },
        },
        // {
        //     title: 'Color',
        //     dataIndex: 'color',
        //     className: "width140 textCenter",
        //     sorter: (a, b) => {
        //         a = a.coder != null ? a.coder.toString() : "";
        //         b = b.coder != null ? b.coder.toString() : "";
        //         return a.localeCompare(b);
        //     },
        // },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.orderStatus != null ? a.orderStatus.toString() : "";
                b = b.orderStatus != null ? b.orderStatus.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return  <Tag className="requestStatusTag">{text}</Tag>
            }
        },
        {
            title: 'Date / Time',
            dataIndex: 'createDate',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDate(text) + ' | ' + getFormatedDate(text,'hh:mm A');
            }
        },


    ],
    customerList: [
        {
            title: 'Customer #',
            dataIndex: 'customerId',
            className: "width80 textCenter",
            // sorter: (a, b) => {
            //     a = a.customerId != null ? a.customerId.toString() : "";
            //     b = b.customerId != null ? b.customerId.toString() : "";
            //     return a.localeCompare(b);
            // },
            sorter: (a, b) => a.customerId - b.customerId, 

        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            className: "width140",
            render: (customerName, record) => (
                <div>
                    <img src={record.profileImage ? '.'+record.profileImage : UserPlaceholder} alt="Image" />
                    <span>{customerName}</span>
                </div>
            ),
            sorter: (a, b) => {
                a = a.customerName != null ? a.customerName.toString() : "";
                b = b.customerName != null ? b.customerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phone',
            className: "width140",
            sorter: (a, b) => {
                a = a.phone != null ? a.phone.toString() : "";
                b = b.phone != null ? b.phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "width140",
            sorter: (a, b) => {
                a = a.email != null ? a.email.toString() : "";
                b = b.email != null ? b.email.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Order',
            dataIndex: 'products',
            className: "width130",
            sorter: (a, b) => {
                a = a.products != null ? a.products.toString() : "";
                b = b.products != null ? b.products.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'createDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDate(text) + ' ' + getFormatedDate(text,'hh:mm A');
            }
        },


    ],
    subscriberList: [
        {
            title: 'Subscriber #',
            dataIndex: 'accountNumber',
            className: "width150 textCenter",
            sorter: (a, b) => {
                a = a.accountNumber != null ? a.accountNumber.toString() : "";
                b = b.accountNumber != null ? b.accountNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'customerName',
            className: "width150",
            render: (customerName, record) => (
                <div>
                    <img src={record.photoPath ? '.'+record.photoPath : UserPlaceholder} />
                    <span>{customerName}</span>
                </div>
            ),
            sorter: (a, b) => {
                a = a.customerName != null ? a.customerName.toString() : "";
                b = b.customerName != null ? b.customerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phone',
            className: "width150",
            sorter: (a, b) => {
                a = a.phone != null ? a.phone.toString() : "";
                b = b.phone != null ? b.phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'ICC',
        //    dataIndex: 'icc',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.phone != null ? a.phone.toString() : "";
        //        b = b.phone != null ? b.phone.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
        {
            title: 'Email',
            dataIndex: 'email',
            className: "width150",
            sorter: (a, b) => {
                a = a.email != null ? a.email.toString() : "";
                b = b.email != null ? b.email.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            className: "width150",
            sorter: (a, b) => {
                a = a.dateCreated != null ? a.dateCreated.toString() : "";
                b = b.dateCreated != null ? b.dateCreated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Address',
            dataIndex: 'completeAddress',
            className: "maxWidth120",
            sorter: (a, b) => {
                a = a.completeAddress != null ? a.completeAddress.toString() : "";
                b = b.completeAddress != null ? b.completeAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width100",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
            render: (status, record) => (
                <div className='invitationStatus'>
                    <span className={status=== "Active" ? 'activeStatus': status === "In Active" ? 'disconnectStatus' : ''}>{status}</span>
                </div>
            ),
            
        },


    ],
    dealsDiscount: [
        {
            title: 'Deal #',
            dataIndex: 'dealId',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.dealId != null ? a.dealId.toString() : "";
                b = b.dealId != null ? b.dealId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Deal Name',
            dataIndex: 'title',
            className: "width140",
            sorter: (a, b) => {
                a = a.title != null ? a.title.toString() : "";
                b = b.title != null ? b.title.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            className: "width140",
            sorter: (a, b) => {
                a = a.productName != null ? a.productName.toString() : "";
                b = b.productName != null ? b.productName.toString() : "";
                return a.localeCompare(b);
            },
        },

        {
            title: 'Discount',
            dataIndex: 'discountFormated',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.discountFormated != null ? a.discountFormated.toString() : "";
                b = b.discountFormated != null ? b.discountFormated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width140",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'From Date',
            dataIndex: 'fromDateFormated',
            className: "width140",
            sorter: (a, b) => {
                a = a.fromDateFormated != null ? a.fromDateFormated.toString() : "";
                b = b.fromDateFormated != null ? b.fromDateFormated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'To Date',
            dataIndex: 'toDateFormated',
            className: "width140",
            sorter: (a, b) => {
                a = a.toDateFormated != null ? a.toDateFormated.toString() : "";
                b = b.toDateFormated != null ? b.toDateFormated.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'dealAction',
            fixed: "right",
            className: "width140 textCenter",
        },
    ],
    orderDetails: [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            className: "width140 detailProductName",
            sorter: (a, b) => {
                a = a.productName != null ? a.productName.toString() : "";
                b = b.productName != null ? b.productName.toString() : "";
                return a.localeCompare(b);
            },
            render: (text, record) => (
                <div>
                    <img src={record.filePath ? '.'+record.filePath : ImgPlaceholder} />
                    <Tooltip title={text}>{text}</Tooltip>
                </div>
            ),

          
        },
        {
            title: 'Product Description',
            dataIndex: 'productDescription',
            className: "width140 detailProductName",
            sorter: (a, b) => {
                a = a.productDescription != null ? a.productDescription.toString() : "";
                b = b.productDescription != null ? b.productDescription.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return <Tooltip title={text}>{text?text.length > 20 ? text.substring(0, 20) + '...' : text:''}</Tooltip>;
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.quantity != null ? a.quantity.toString() : "";
                b = b.quantity != null ? b.quantity.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return "$" + text
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.quantity != null ? a.quantity.toString() : "";
                b = b.quantity != null ? b.quantity.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    inventoryList: [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width140",
            sorter: (a, b) => {
                a = a.ListName != null ? a.ListName.toString() : "";
                b = b.ListName != null ? b.ListName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            className: "maxWidth20 textCenter",
            // sorter: (a, b) => {
            //     a = a.quantity != null ? a.quantity.toString() : "";
            //     b = b.quantity != null ? b.quantity.toString() : "";
            //     return a.localeCompare(b);
            // },
            sorter: (a, b) => a.quantity - b.quantity, 

        },
        // {
        //     title: 'Price',
        //     dataIndex: 'price',
        //     className: "width140 textCenter",
        //     sorter: (a, b) => a.price - b.price, 
        //     render: text => {
        //         return "$" + text
        //     }
        // },
    
       
    ],
    CorporateListing: [
        {
            title: 'Listing Name',
            dataIndex: 'ListName',
            className: "width140",
            sorter: (a, b) => {
                a = a.ListName != null ? a.ListName.toString() : "";
                b = b.ListName != null ? b.ListName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'ListingStatus',
            className: "width140",
            sorter: (a, b) => {
                a = a.ListingStatus != null ? a.ListingStatus.toString() : "";
                b = b.ListingStatus != null ? b.ListingStatus.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'corporateListingAction',
            className: "width140",
            sorter: (a, b) => {
                a = a.corporateListingAction != null ? a.corporateListingAction.toString() : "";
                b = b.corporateListingAction != null ? b.corporateListingAction.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    ShipmentListing: [
        {
            title: 'ID',
            dataIndex: 'id',
            className: "width140",
            sorter: (a, b) => {
                a = a.id != null ? a.id.toString() : "";
                b = b.id != null ? b.id.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'image',
            dataIndex: 'shipmentImg',
            className: "width140",
            sorter: (a, b) => {
                a = a.shipmentImg != null ? a.shipmentImg.toString() : "";
                b = b.shipmentImg != null ? b.shipmentImg.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width140",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            className: "width140",
            sorter: (a, b) => {
                a = a.date != null ? a.date.toString() : "";
                b = b.date != null ? b.date.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    SearchResultsFor: [
        {
            title: 'Customer',
            dataIndex: 'firstName',
            className: "width140",
            sorter: (a, b) => {
                a = a.firstName != null ? a.firstName.toString() : "";
                b = b.firstName != null ? b.firstName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Account #',
            dataIndex: 'accountNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.accountNumber != null ? a.accountNumber.toString() : "";
                b = b.accountNumber != null ? b.accountNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'accountPhoneNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.accountPhoneNumber != null ? a.accountPhoneNumber.toString() : "";
                b = b.accountPhoneNumber != null ? b.accountPhoneNumber.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formateMdnNumber(text);
            }
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress.toString() : "";
                b = b.emailAddress != null ? b.emailAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Address',
        //    dataIndex: 'Address',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.address != null ? a.address.toString() : "";
        //        b = b.address != null ? b.address.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},
      
    ],
    userPayments: [
        {
            title: 'Order #',
            dataIndex: 'orderId',
            className: "width140",
            sorter: (a, b) => {
                a = a.orderId != null ? a.orderId.toString() : "";
                b = b.orderId != null ? b.orderId.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            className: "width140",
            sorter: (a, b) => {
                a = a.customerName != null ? a.customerName.toString() : "";
                b = b.customerName != null ? b.customerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phone',
            className: "width140",
            sorter: (a, b) => {
                a = a.phone != null ? a.phone.toString() : "";
                b = b.phone != null ? b.phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Amount',
            dataIndex: 'orderAmount',
            className: "width140",
            sorter: (a, b) => {
                a = a.orderAmount != null ? a.orderAmount.toString() : "";
                b = b.orderAmount != null ? b.orderAmount.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Payment Type',
            dataIndex: 'cardType',
            className: "width140",
            sorter: (a, b) => {
                a = a.cardType != null ? a.cardType.toString() : "";
                b = b.cardType != null ? b.cardType.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Card Number',
            dataIndex: 'cardNumberFormated',
            className: "width140",
            sorter: (a, b) => {
                a = a.cardNumber != null ? a.cardNumber.toString() : "";
                b = b.cardNumber != null ? b.cardNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Billing Address',
            dataIndex: 'billingAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.billingAddress != null ? a.billingAddress.toString() : "";
                b = b.billingAddress != null ? b.billingAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
        //{
        //    title: 'Status',
        //    dataIndex: 'status',
        //    className: "width140",
        //    sorter: (a, b) => {
        //        a = a.status != null ? a.status.toString() : "";
        //        b = b.status != null ? b.status.toString() : "";
        //        return a.localeCompare(b);
        //    },
        //},

        {
            title: 'Date/Time',
            dataIndex: 'createDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],
    ACPIndividual: [
        {
            title: 'Application',
            dataIndex: 'Application',
            className: "width140",
            sorter: (a, b) => {
                a = a.Application != null ? a.Application.toString() : "";
                b = b.Application != null ? b.Application.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Application Information',
            dataIndex: 'ApplicationInformation',
            className: "width140",
            sorter: (a, b) => {
                a = a.ApplicationInformation != null ? a.ApplicationInformation.toString() : "";
                b = b.ApplicationInformation != null ? b.ApplicationInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Addresses',
            dataIndex: 'Addresses',
            className: "width140",
            sorter: (a, b) => {
                a = a.Addresses != null ? a.Addresses.toString() : "";
                b = b.Addresses != null ? b.Addresses.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Eligibility',
            dataIndex: 'Eligibility',
            className: "width140",
            sorter: (a, b) => {
                a = a.Eligibility != null ? a.Eligibility.toString() : "";
                b = b.Eligibility != null ? b.Eligibility.toString() : "";
                return a.localeCompare(b);
            },
        },
    ],

    ACPOrganization: [
        {
            title: 'Name',
            dataIndex: 'OrganizationName',
            className: "width140",
            sorter: (a, b) => {
                a = a.OrganizationName != null ? a.OrganizationName.toString() : "";
                b = b.OrganizationName != null ? b.OrganizationName.toString() : "";
                return a.localeCompare(b);
            },
        },
       
        {
            title: 'Phone #',
            dataIndex: 'Phone',
            className: "width140",
            sorter: (a, b) => {
                a = a.Phone != null ? a.Phone.toString() : "";
                b = b.Phone != null ? b.Phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email Address',
            dataIndex: 'EmailAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.EmailAddress != null ? a.EmailAddress.toString() : "";
                b = b.EmailAddress != null ? b.EmailAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Banner',
            dataIndex: 'Banner',
            className: "width140",
            sorter: (a, b) => {
                a = a.Banner != null ? a.Banner.toString() : "";
                b = b.Banner != null ? b.Banner.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Mobile Banner',
            dataIndex: 'mobileBanner',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.mobileBanner != null ? a.mobileBanner.toString() : "";
                b = b.mobileBanner != null ? b.mobileBanner.toString() : "";
                return a.localeCompare(b);
            },
        },
      

        {
            title: 'Status',
            dataIndex: 'status',
            className: "width140",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'organizationAction',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.organizationAction != null ? a.organizationAction.toString() : "";
                b = b.organizationAction != null ? b.organizationAction.toString() : "";
                return a.localeCompare(b);
            },
        },

    ],
    ReviewsData: [
        {
            title: 'Date Requested',
            dataIndex: 'createDate',
            className: "width140",
            sorter: (a, b) => {
                a = a.createDate != null ? a.createDate.toString() : "";
                b = b.createDate != null ? b.createDate.toString() : "";
                return a.localeCompare(b);
            },
            render: text => {
                return formatDateTime(text);

            }
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            className: "width140",
            sorter: (a, b) => {
                a = a.employeeName != null ? a.employeeName.toString() : "";
                b = b.employeeName != null ? b.employeeName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            className: "width140",
            sorter: (a, b) => {
                a = a.fullName != null ? a.fullName.toString() : "";
                b = b.fullName != null ? b.fullName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress.toString() : "";
                b = b.emailAddress != null ? b.emailAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
     /*   {
            title: 'Email Opened',
            dataIndex: 'EmailOpened',
            className: "width140",
            sorter: (a, b) => {
                a = a.EmailOpened != null ? a.EmailOpened.toString() : "";
                b = b.EmailOpened != null ? b.EmailOpened.toString() : "";
                return a.localeCompare(b);
            },
        },*/
        /*{
            title: 'Service',
            dataIndex: 'Service',
            className: "width140",
            sorter: (a, b) => {
                a = a.Service != null ? a.Service.toString() : "";
                b = b.Service != null ? b.Service.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Notification',
            dataIndex: 'Notification',
            className: "width140",
            sorter: (a, b) => {
                a = a.Notification != null ? a.Notification.toString() : "";
                b = b.Notification != null ? b.Notification.toString() : "";
                return a.localeCompare(b);
            },
        },*/
        {
            title: 'Status',
            dataIndex: 'reviewStatus',
            className: "width140",
            sorter: (a, b) => {
                a = a.reviewStatus != null ? a.reviewStatus.toString() : "";
                b = b.reviewStatus != null ? b.reviewStatus.toString() : "";
                return a.localeCompare(b);
            },
        },
       /* {
            title: 'Action',
            dataIndex: 'Action',
            className: "width140",
            sorter: (a, b) => {
                a = a.Action != null ? a.Action.toString() : "";
                b = b.Action != null ? b.Action.toString() : "";
                return a.localeCompare(b);
            },
        },
        */
        
    ],
    protectionPlanList: [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width140",
            sorter: (a, b) => {
                a = a.name != null ? a.name.toString() : "";
                b = b.name != null ? b.name.toString() : "";
                return a.localeCompare(b);
            },
            render: (text, record) => (
                <div>
                    <img className={"inventoryProductImg"} src={record.badgePath ? '.'+record.badgePath : ImgPlaceholder} />
                    <Tooltip title={text}>{text}</Tooltip>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width140",
            sorter: (a, b) => {
                a = a.description != null ? a.description.toString() : "";
                b = b.description != null ? b.description.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Price',
            dataIndex: 'priceFormated',
            className: "width140  textCenter",
            sorter: (a, b) => {
                a = a.priceFormated != null ? a.priceFormated.toString() : "";
                b = b.priceFormated != null ? b.priceFormated.toString() : "";
                return a.localeCompare(b);
            },
            //render: text => {
            //    return "$" + text
            //}
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: "width140 textCenter",
            sorter: (a, b) => {
                a = a.status != null ? a.status.toString() : "";
                b = b.status != null ? b.status.toString() : "";
                return a.localeCompare(b);
            },
            render: (status, record) => (
                <div className='invitationStatus'>
                    <span className={status === "Active" ? 'activeStatus' : status === "In Active" ? 'disconnectStatus' : ''}>{status}</span>
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'commonAction',
            className: "actionWidth"
        },
    ],
    damageRepair: [
        {
            title: 'Tracking',
            dataIndex: 'Tracking',
            className: "width140",
            sorter: (a, b) => {
                a = a.Tracking != null ? a.Tracking.toString() : "";
                b = b.Tracking != null ? b.Tracking.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Device Number',
            dataIndex: 'DeviceNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.DeviceNumber != null ? a.DeviceNumber.toString() : "";
                b = b.DeviceNumber != null ? b.DeviceNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            className: "width140",
            sorter: (a, b) => {
                a = a.CustomerName != null ? a.CustomerName.toString() : "";
                b = b.CustomerName != null ? b.CustomerName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'Phone',
            className: "width140",
            sorter: (a, b) => {
                a = a.Phone != null ? a.Phone.toString() : "";
                b = b.Phone != null ? b.Phone.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email ',
            dataIndex: 'Email ',
            className: "width140",
            sorter: (a, b) => {
                a = a.Email != null ? a.Email.toString() : "";
                b = b.Email != null ? b.Email.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'damangeRepairAction ',
            className: "width140",
        
        },
    ],
    businessInquiries: [
        {
            title: 'Sr.#',
            dataIndex: 'srNo',
            className: "width140",
            sorter: (a, b) => {
                a = a.srNo != null ? a.srNo.toString() : "";
                b = b.srNo != null ? b.srNo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Company Information',
            dataIndex: 'CompanyInformation',
            className: "width140",
            sorter: (a, b) => {
                a = a.CompanyInformation != null ? a.CompanyInformation.toString() : "";
                b = b.CompanyInformation != null ? b.CompanyInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Contact Information',
            dataIndex: 'ContactInformation',
            className: "width140",
            sorter: (a, b) => {
                a = a.ContactInformation != null ? a.ContactInformation.toString() : "";
                b = b.ContactInformation != null ? b.ContactInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Carrier Information',
            dataIndex: 'CarrierInformation',
            className: "width140",
            sorter: (a, b) => {
                a = a.CarrierInformation != null ? a.CarrierInformation.toString() : "";
                b = b.CarrierInformation != null ? b.CarrierInformation.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Date ',
            dataIndex: 'Date ',
            className: "width140",
            sorter: (a, b) => {
                a = a.Date != null ? a.Date.toString() : "";
                b = b.Date != null ? b.Date.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status ',
            dataIndex: 'Status ',
            className: "width140",
            sorter: (a, b) => {
                a = a.Email != null ? a.Email.toString() : "";
                b = b.Email != null ? b.Email.toString() : "";
                return a.localeCompare(b);
            },
        },

        
        {
            title: 'Actions',
            dataIndex: 'damangeRepairAction ',
            className: "width140",
        
        },
    ],
    addressBook: [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            className: "width140",
            sorter: (a, b) => {
                a = a.companyName != null ? a.companyName.toString() : "";
                b = b.companyName != null ? b.companyName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Attention To',
            dataIndex: 'attentionTo',
            className: "width140",
            sorter: (a, b) => {
                a = a.attentionTo != null ? a.attentionTo.toString() : "";
                b = b.attentionTo != null ? b.attentionTo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "width140",
            sorter: (a, b) => {
                a = a.email != null ? a.email.toString() : "";
                b = b.email != null ? b.email.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phoneNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.phoneNumber != null ? a.phoneNumber.toString() : "";
                b = b.phoneNumber != null ? b.phoneNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Address',
            dataIndex: 'completeAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.completeAddress != null ? a.completeAddress.toString() : "";
                b = b.completeAddress != null ? b.completeAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Actions',
            dataIndex: 'commonAction',
            className: "commonActionWidth",
        },
    ],
    addressBookInsertList: [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            className: "width140",
            sorter: (a, b) => {
                a = a.companyName != null ? a.companyName.toString() : "";
                b = b.companyName != null ? b.companyName.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Attention To',
            dataIndex: 'attentionTo',
            className: "width140",
            sorter: (a, b) => {
                a = a.attentionTo != null ? a.attentionTo.toString() : "";
                b = b.attentionTo != null ? b.attentionTo.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "width140",
            sorter: (a, b) => {
                a = a.email != null ? a.email.toString() : "";
                b = b.email != null ? b.email.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Phone #',
            dataIndex: 'phoneNumber',
            className: "width140",
            sorter: (a, b) => {
                a = a.phoneNumber != null ? a.phoneNumber.toString() : "";
                b = b.phoneNumber != null ? b.phoneNumber.toString() : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Address',
            dataIndex: 'completeAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.completeAddress != null ? a.completeAddress.toString() : "";
                b = b.completeAddress != null ? b.completeAddress.toString() : "";
                return a.localeCompare(b);
            },
        },
    ]
}