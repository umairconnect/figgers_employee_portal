import moment from 'moment';
//import { GetUserRolesRights } from '../../Services/GetUserRolesRights';
//import { GetUserInfo } from '../../Services/GetUserInfo';
//import { UserRoleRights } from "../../context/StaticDropDowns";


//function getModulePermissionByRole(_role) {
//    let user_role_rights_list = JSON.parse(GetUserRolesRights());
//    let isEditable = false;
//    if (user_role_rights_list) {
//        let _isEditable = user_role_rights_list.filter(objRights => objRights.rightName == _role && objRights.permissionCode == UserRoleRights.Editable);
//        if (_isEditable != null && _isEditable.length > 0) {
//            isEditable = true;
//        }
//    }
//    return isEditable;
//}

function formatDate(strDate) {
    if (!strDate)
        return '';
    else
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear();
}

function formatDateByFormate(strDate,formate) {
    if (!strDate || strDate == '')
        return '';
    else
        return moment(strDate).format(formate);
}
function formatDateTime(strDate) {
    if (!strDate)
        return '';
    else {
        var time = moment(strDate).format('hh:mm A');
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear() + ' ' + (time ? time : '');
    }
}

function formatDateTime2(strDate) {
    if (!strDate)
        return '';
    else {
        var time = moment(strDate).format('hh:mm A');
        return String((new Date(strDate).getMonth() + 1)).padStart(2, '0') + '/' + String(new Date(strDate).getDate()).padStart(2, '0') + '/' + new Date(strDate).getFullYear() + (time ? ' | ' + time : '');
    }
}

function formatTime(strDate) {
    if (!strDate)
        return '';
    else
        return moment(strDate).format('hh:mm A');
}
function formatTimeFull(strDate) {
    if (!strDate)
        return '';
    else
        return moment(strDate).format('hh:mm');
}
function formatCurrency(x) {
    if (x)
        return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    else return '0.00';
}
function formatNumber(number) {
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;

    //var unitlist = ["", "K", "M", "G"];
    //
    //let sign = Math.sign(number);
    //let unit = 0;
    //
    //while (Math.abs(number) > 1000) {
    //    unit = unit + 1;
    //    number = Math.floor(Math.abs(number) / 100) / 10;
    //}
    //console.log(sign * Math.abs(number) + unitlist[unit]);
    //return sign * Math.abs(number) + unitlist[unit];
}
function validateEmail(email) {
    let re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    if (re.test(String(email).toLowerCase())) {
        re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(String(email).toLowerCase())
    } else { return false; }
}
function getAgeByDOBInYears(birthDate,seperator) {
    var result = '';
    if (birthDate.trim() != '' && birthDate != undefined) {

        var mdate = birthDate;
        var yearThen = parseInt(mdate.substring(0, 4), 10);
        var monthThen = parseInt(mdate.substring(5, 7), 10);
        var dayThen = parseInt(mdate.substring(8, 10), 10);

        var today = new Date();
        var birthday = new Date(yearThen, monthThen - 1, dayThen);
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();

        var year_age = Math.floor(differenceInMilisecond / 31536000000);

        if (isNaN(year_age))
            result = '';
        else if (year_age > 0)
            result = seperator+year_age + " yrs";

    }
    else {
        result = ''
    }
    return result;
}

function toDayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getAgeByDOB(birthDate) {
    var result = '';
    if (birthDate.trim() != '' && birthDate != undefined) {

        var mdate = birthDate;
        var yearThen = parseInt(mdate.substring(0, 4), 10);
        var monthThen = parseInt(mdate.substring(5, 7), 10);
        var dayThen = parseInt(mdate.substring(8, 10), 10);

        var today = new Date();
        var birthday = new Date(yearThen, monthThen - 1, dayThen);
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();

        var year_age = Math.floor(differenceInMilisecond / 31536000000);
        var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        var month_age = Math.floor(day_age / 30);
        day_age = day_age % 30;


        if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age))
            result = '';
        else if (year_age > 0)
            result = year_age + ' years, ' + month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (year_age === 0 && month_age > 0)
            result = month_age + (month_age > 1 ? ' months, ' : ' month, ') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (year_age > 0 && month_age === 0)
            result = year_age + (year_age > 1 ? ' years, ' : ' year,') + day_age + (day_age > 1 ? ' days' : ' day');
        else if (day_age === 0)
            result = '';
        else
            result = day_age + (day_age > 1 ? ' days' : ' day');
    }
    return result;
}


function getFormatedDate(_date, _formate) {
    if (!_date) {
        return '';
    }
    return moment(_date).format(_formate)
}

function getFormatedTemplateDetails(txtToAdd, patientDetails) {
    var array = [];
    if (patientDetails.address != null) {
        array.push(patientDetails.address);
    }
    if (patientDetails.city != null) {
        array.push(patientDetails.city);
    }
    if (patientDetails.state != null) {
        array.push(patientDetails.state);
    }
    if (patientDetails.countyCode != null) {
        array.push(patientDetails.countyCode);
    }
    if (patientDetails.country != null) {
        array.push(patientDetails.country);
    }
    var formatedValue = array.join(", ");
    return txtToAdd.
        replaceAll('[Patient Name]', patientDetails.name != null ? patientDetails.name : '').
        replaceAll('[Age]', patientDetails.birthDate != null ? getAgeByDOB(patientDetails.birthDate) : '').
        replaceAll('[Date of Birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Date of birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Phone]', patientDetails.cellPhone != null ? patientDetails.cellPhone : '').
        replaceAll('[Address]', formatedValue != null ? formatedValue : '').replaceAll('<p>', '').replaceAll('</p>', '').trim();
}

function getFormatedTemplateDetailChiefComplaint(txtToAdd, patientDetails) {
    var array = [];
    if (patientDetails.address != null) {
        array.push(patientDetails.address);
    }
    if (patientDetails.city != null) {
        array.push(patientDetails.city);
    }
    if (patientDetails.state != null) {
        array.push(patientDetails.state);
    }
    if (patientDetails.countyCode != null) {
        array.push(patientDetails.countyCode);
    }
    if (patientDetails.country != null) {
        array.push(patientDetails.country);
    }
    var formatedValue = array.join(", ");
    return txtToAdd.
        replaceAll('[Patient Name]', patientDetails.name != null ? patientDetails.name : '').
        replaceAll('[Age]', patientDetails.birthDate != null ? getAgeByDOB(patientDetails.birthDate) : '').
        replaceAll('[Date of Birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Date of birth]', patientDetails.birthDate != null ? getFormatedDate(patientDetails.birthDate, 'MM/DD/YYYY') : '').
        replaceAll('[Phone]', patientDetails.cellPhone != null ? patientDetails.cellPhone : '').
        replaceAll('[Address]', formatedValue != null ? formatedValue : '').trim();
}


function numberFormat(x) {
    return Number.parseFloat(x).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}


const validDate = (date) => {
    let minimumDate = new Date('1753-01-01');
    let maximumDate = new Date('9999-12-31');
    let actualDate = new Date(date);
    if (actualDate.valueOf() < minimumDate.valueOf() || actualDate.valueOf() > maximumDate.valueOf()) {
        return true
    } else {
        return false
    }
}
const todayDate = () => {
    return new Date().getFullYear() + '-' + String((new Date().getMonth() + 1)).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
}
const formateMdnNumber = (mdnNumber) => {
    if (!mdnNumber || mdnNumber == '') {
        return ''
    }
    var cleaned = ('' + mdnNumber).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    var number = mdnNumber;
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return number;
}

function formatSizeUnits(bytes, seperator = " ") {
    const sizes = ['KB', 'MB', 'GB', 'TB']
    if (bytes == 0 || bytes == undefined)
        return '---'
    else if (bytes < 1024) {
        return Math.round(bytes).toFixed(2) + ' Bytes';
    } else {
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes}${seperator}${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(2)}${seperator}${sizes[i]}`
    }
   
   
}

function getSizeUnit(bytes, seperator = " ") {
    const sizes = ['Bytes', 'KBs', 'MBs', 'GBs', 'TBs']
    if (bytes == 0 || bytes == undefined) return `${sizes[0]}`
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${sizes[i]}`

}

function convertMinToHours(minutes) {
    var hours = Math.floor(minutes / 60);
    var minutes = Math.floor(minutes % 60)
    return hours > 0 ? hours + " Hrs " + minutes + " mins " : minutes+ " mins"
}
function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input_str);
}
const handleNumberKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isNumber = /\d/.test(keyValue);
    const isSpecialChar = /[^a-zA-Z0-9]/.test(keyValue);
    if (!isNumber || isSpecialChar) {
        event.preventDefault();
    }
}


function allowedAttachments() {

    let arrMessages = [];

    arrMessages["jpg"] = "jpg";
    arrMessages["bmp"] = "bmp";
    arrMessages["png"] = "png";
    arrMessages["PNG"] = "PNG";
    arrMessages["tif"] = "tif";
    arrMessages["jpeg"] = "jpeg";
    arrMessages["JPEG"] = "JPEG";
    arrMessages["xls"] = "xls";
    arrMessages["xlsx"] = "xlsx";
    arrMessages["txt"] = "txt";
    arrMessages["pdf"] = "pdf";
    arrMessages["xps"] = "xps";
    arrMessages["gif"] = "gif";
    arrMessages["doc"] = "doc";
    arrMessages["ppa"] = "ppa";
    arrMessages["ppt"] = "ppt";
    arrMessages["rtf"] = "rtf";

    return arrMessages;

}

function allowedAttachmentsImages() {

    let arrMessages = [];

    arrMessages["jpg"] = "jpg";
    arrMessages["png"] = "png";
    arrMessages["PNG"] = "PNG";
    arrMessages["jpeg"] = "jpeg";
    arrMessages["JPEG"] = "JPEG";
    return arrMessages;

}

const handleNumberWithDecimal = (event) => {

    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isNumber = /\d/.test(keyValue);
    const isDecimalPoint = keyValue === '.';
    const isSpecialChar = /[^a-zA-Z0-9.]/.test(keyValue);

    const inputField = event.target;
    const existingValue = inputField.value;
    const cursorPosition = inputField.selectionStart;
    const newValue = existingValue.slice(0, cursorPosition) + keyValue + existingValue.slice(cursorPosition);

    const decimalCount = (newValue.match(/\./g) || []).length;

    if ((!isNumber && !isDecimalPoint) || isSpecialChar || decimalCount > 1) {
        event.preventDefault();
    }
}


function numberDisplay(number, _minimumFractionDigits,_maximumFractionDigits,_return) {
    if (!number) {
        return _return;
    }
    const formattedNumber = number.toLocaleString("en-US", {
        minimumFractionDigits: _minimumFractionDigits,
        maximumFractionDigits: _maximumFractionDigits,
    });

    return formattedNumber;
}

const orderTrackStatus = (type) => {
    var status = '';
    if (type == 'D') { status = 'Delivered' }
    else if (type == 'I') { status = 'In Transit' }
    else if (type == 'M') { status = 'Billing Information Received' }
    else if (type == 'MV') { status = 'Billing Information Voided' }
    else if (type == 'P') { status = 'Pickup' }
    else if (type == 'X') { status = 'Exception' }
    else if (type == 'RS') { status = 'Returned to Shipper' }
    else if (type == 'DO') { status = 'Delivered Origin CFS(Freight Only)' }
    else if (type == 'DD') { status = 'Delivered Destination CFS(Freight Only)' }
    else if (type == 'W') { status = 'Warehousing(Freight Only)' }
    else if (type == 'NA') { status = 'Not Available' }
    else if (type == 'O') { status = 'Out for Delivery' }
    else if (type == 'Deleted') { status = 'Deleted' }
    return  status;
};

// Get the current datetime
const currentDatetime = new Date();
// Calculate the start and end of the previous week
const startOfPreviousWeek = new Date(
    currentDatetime.getFullYear(),
    currentDatetime.getMonth(),
    currentDatetime.getDate() - 7
);
const endOfPreviousWeek = new Date(
    currentDatetime.getFullYear(),
    currentDatetime.getMonth(),
    currentDatetime.getDate() - 1
);

const communicationFormatedDate = (_date) => {
    var _formatedDate = '';
    if (getFormatedDate(_date, "DD-MM-yyyy") == getFormatedDate(new Date(), "DD-MM-yyyy")) {
        _formatedDate = formatTime(_date)
    } else if (new Date(_date) >= startOfPreviousWeek && new Date(_date) <= endOfPreviousWeek) {
        _formatedDate = getFormatedDate(_date, "ddd");
    }
    else {
        _formatedDate = getFormatedDate(_date, "DD-MMM-yyyy");
    }
    return _formatedDate;
};

const loadNameInitials = (name) => {
    const initials = name
        .split(' ')
        .map(word => word.charAt(0))
        .join('');
    return initials;
}

const validateDateOfBirth = (dateOfBirth) => {
    const inputDate = new Date(dateOfBirth);
    const currentDate = new Date();
    if (isNaN(inputDate.getTime())) {
        // Invalid date format
        return false;
    } else if (inputDate > currentDate) {
        // Date of birth is in the future
        return false;
    } else {
        return true;
    }
};
function wirelessStatus(_value) {
    if (_value == '1')
        return 'Inactive';
    else if (_value == '2')
        return 'Active';
    else if (_value == '3')
        return 'Suspended';
    else if (_value == '4')
        return 'Disconnected';
    else if (_value == '6')
        return 'Hotlined';
    else if (_value == '7')
        return 'Rejected';
    else if (_value == '8')
        return 'Port In Cancelled';
}

const isDigitsOnly = (keyValue) => {
    const isNumber = /\d/.test(keyValue);
    const isSpecialChar = /[^a-zA-Z0-9]/.test(keyValue);
    if (!isNumber || isSpecialChar) {
        return false;
    } else {
        return true;
    }
}

export {
    formatDate,
    formatTime,
    formatTimeFull,
    formatCurrency,
    formatNumber,
    numberFormat,
    validateEmail,
    toDayDate,
    getAgeByDOB,
    getFormatedTemplateDetails,
    getFormatedTemplateDetailChiefComplaint,
    formatDateTime,
    getFormatedDate,
    formatDateTime2,
    formatSizeUnits,
    getSizeUnit,
    convertMinToHours,
    //getModulePermissionByRole,
    validDate,
    formateMdnNumber,
    formatDateByFormate,
    todayDate,
    validatePhoneNumber,
    handleNumberKeyPress,
    handleNumberWithDecimal,
    numberDisplay,
    orderTrackStatus,
    communicationFormatedDate,
    loadNameInitials,
    allowedAttachments,
    allowedAttachmentsImages,
    validateDateOfBirth,
    getAgeByDOBInYears,
    wirelessStatus,
    isDigitsOnly
}