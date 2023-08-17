import { capitalize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({

    panelContainer: {
        background: '#fff',
        width: '100%',
        padding: '15px',
        borderRadius: '15px',
        "& hr": {
            opacity: 0.2,
        }
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
    accountDetails: {
            display: 'flex',
            flexFlow: 'column',
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '40px 0',
        "& .displayContent": {
            display: 'flex',
            justifyContent: 'center',
            margin: '5px 0',
            lineHeight: '18px',
            color: '#707991',
        }
    },
    actionIcon: {
        display: 'flex',
        justifyContent: 'center',
        "& img": {
            margin: '10px',
            cursor: 'pointer',
        }
   
    },
    profileData: {
        "& img": {
            borderRadius: '50%',
            width: window.max1550 ? '150px': '200px',
            display: 'flex',
            margin: '15px auto 38px auto',
    
        },
        "& h3": {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize:  window.max1550 ? '20px': '24px',
            lineHeight: '20px',
            textAlign: 'center',
            color: '#011627',
        },
        "& h4": {
            fontWeight: 600,
            fontSize: '22px',
            justifyContent: 'center',
            lineHeight: '20px',
            textAlign: 'center',
            color: '#848789',
            display: 'flex',
            alignItems: 'center',
            "& img": {
                width: '14px',
                margin: '1px 10px',
                padding: 0,
                borderRadius: 0,
            }
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
        "& p": {
            overflow:"auto",
        },
        "& .sender": {
            background: '#5FB0E5',
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
                color: '#011627',
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
   
    showMoreButton: {
        padding: '0 0',
        minWidth: 'auto',
    },
    messageInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: "relative",
        backgroundColor: 'white',
        margin: '5px 10px',
        borderRadius: '10px',
        flexDirection: 'row',
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
    },
    attachmentHead: {
        display: 'flex',
        "& h3": {
            fontSize: window.max1550 ? '16px': '20px',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#011627',
        },
        "& h4": {
            marginLeft: 'auto',
            fontSize:  window.max1550 ? '14px': '16px',
            lineHeight: '20px',
            textAlign: 'center',
            textTransform: 'capitalize',
            color: '#011627',
        }
    },
    chatAttachmentPanel: {
        display: 'flex',
        flexFlow: 'wrap',
        "& img": {
            border: '1px solid #F6F6F6',
            width: '31.8%',
            margin: '2px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '10px',
        }
    },
    expiryDatePast: {
        background: "#FFDDDD !important",
        border: "1px solid #d3d3d3",
        boxShadow: "2px 2px 3px 1px #d6d3d375",
        padding: '5px 13px',
        marginRight: '0px',
        marginBottom: '5px',
        textTransform: 'capitalize',
        borderRadius: '10px',
        color: '#FF0000 !important',
        fontWeight: '600',
    },

    expiryDate: {
        border: '1px solid #3C4549',
        borderRadius: '10px',
        textTransform: 'capitalize',
        marginBottom: '5px',
        padding: '4px 13px',
        marginRight: '8px',
        background: 'rgba(254, 152, 0, 0.3)',
        "& :hover": {
            background: 'rgba(254, 152, 0, 0.3) !important',
        }
    },
}))