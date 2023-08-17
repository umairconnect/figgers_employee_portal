import { capitalize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    chatContainer: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    chatHeader: {
        display: 'flex',
        background: '#fff',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 20px 6px 12px',
    },
    SmsIcon: {
        width: '30px',
    },
    headerRightSide: {
        display: 'flex',
        alignItems: 'center',
        "& img": {
            width: "40px",
            height: '40px',
            borderRadius: '50%',
        },
        "& .userName": {

            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            color: '#011627',
        },
        "& .usercontact": {
            textTransform: 'initial',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '22px',
            color: '#707991',
        },
    },
    headerLeftSize: {
        width: '252px',
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        background: '#F6F6F6',
        padding: '10px 9px',
        marginTop: '8px',
        borderRadius: '8px',

    },
    floatRight: {
        float: 'right',
    },
    floatLeft: {
        float: 'left',
    },
    sendar: {
        float: 'right',
        display: 'flex',
        alignItems: 'center',
    },
    receiver: {
        float: 'left',
        display: 'flex',
        alignItems: 'center',
    },
    actionIcon: {
        "& img": {
            margin: '10px',
            cursor: 'pointer',
        }
   
    },
    userDIcons: {
        width: '13px !important',
        margin: '0px 10px !important',
        padding: '0 !important',
        borderRadius: '0 !important',
        height: 'unset !important',
    },
    userDIconsEmail: {
        width: '22px !important',
        margin: '0px 10px !important',
        padding: '0 !important',
        borderRadius: '0 !important',
        height: 'unset !important',
    },
    userDHeading: {
        color: '#868DA1',
        fontWeight: 600,
        textTransform: 'initial',
    },
    FileArea: {
        display: 'flex',
        position: 'relative',
    },
    removeFile: {
        position: 'absolute',
        right: '0',
        top: '-4px',
        background: '#5fb0e5',
        width: '20px',
        textAlign: 'center',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        fontSize: '10px',
        fontWeight: 'bold',
        height: '20px',
    },
    attachmentLink: {
        padding: '10px',
        borderRadius: '10px',
        float: 'right',
        marginLeft: 'auto',
        marginRight: '12px',
        background: '#DEF2FF',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '240px',
    },
    messageList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        "& .receiver": {
            background: '#FFFFFF',
            borderRadius: 12,
            padding: '10px 15px',
            maxWidth: '790px',
        },
        "& .receiver p": {
            color: '#011627 !important',
        },
        "& p": {
            overflow:"auto",
        },
        "& .sender": {
            background: '#3D8BF8',
            borderRadius: 12,
            padding: '10px 15px',
            maxWidth: '790px',

            "& .messageTime": {
                color: '#ffffff !important',
            }
        },
        "& p": {
            overflow: "auto",
        },
        "& li": {
            display: 'flex',
            padding: "4px 6px",
            cursor: 'pointer',
            marginBottom: 10,
            "& .messageTime": {

                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#011627',
                textAlign: 'right'
            },
            "& .messageText": {
                margin: '0px 0px 5px 0px',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '20px',
                color: 'white',
            },
        }
    },
    SendIcon: {
        cursor: 'pointer',
    },
    chatActions: {
        display: 'flex',
        padding: '10px',
    },
    chatContainer: {
        background:'#F6F6F6',
        paddingBottom: '8px',
        position: 'relative',

    },
    showMoreButton: {
        padding: '0 0',
        minWidth: 'auto',
    },
    messageInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: '5px 10px',
        borderRadius: '10px',
        flexDirection: 'row',
        bottom: 5,
   

        "& textarea": {
            width: '100%',
            display: 'flex',
            outline: 'none !important',
            boxSizing: 'border-box',
            margin: '0px 5px 0px 15px',
            minHeight: 36,
            fontSize: '16px',
            padding: '5px 50px 0px 30px',
            // height: 35.63,
            opacity: 0.7,
            border: '0.5px solid transparent',
            borderRadius: 12,
            "& ::focus-visible": {
                outline: 0,
            }
        },
        "& .MuiInput-underline::before": {
            border: 'none'
        },
        "& .MuiInput-underline::after": {
            border: 'none'
        },
        "& .MuiSvgIcon-root": {
            color: '#8BABD8',
        }
    }
}))