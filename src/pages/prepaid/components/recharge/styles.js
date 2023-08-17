import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "600px"
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "600px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",

    },
    Notes: {
        "& p": {
            fontStyle: 'normal !important',
            fontWeight: '700 !important',
            fontSize: '14px !important',
            lineHeight: '17px !important',
            display: 'flex !important',
            alignItems: 'center !important',
            textAlign: 'center !important',
            letterSpacing: '0.01em !important',
            color: '#757575 !important',
        }
    },
    earlypayLogo: {
        fontWeight: 700,
        fontSize: '15px !important',
        lineHeight: '17px',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: '0.01em',
        color: '##0049A3 !important',
        marginLeft: '10px',
    },
    greyBorderbox: {
        width: '100%',
        border: '1px solid #dedede',
        margin: '10px auto',
        padding: '8px !important',
        maxWidth: '515px',
        borderRadius: '12px',
    },
    paymentInfor: {
        background: '#E8E8E8',
        padding: '12px',
        borderRadius: '13px',
        margin: 'auto',
        "& h3": {
            color: '#41416E',
            paddingLeft: '10px',
            "& span": {
                color: 'rgba(6, 134, 216, 1)'
            }
        },
     
    },
    formContainer: {
        border: '1px solid #D9D9D9',
        padding: '10px 10px 18px 15px',
        borderRadius: '10px',
    },
    paymentHeading: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '17px',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '0.01em',
        color: '#757575',  
        padding: '10px 0',
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        padding: '15px 10px',
        alignItems: 'baseline',
        backgroundColor: "#0049A3",
        justifyContent: 'space-between',
        cursor: 'move',
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '10px 20px',
        "& h1": {
            textAlign: 'center',
            letterSpacing: '0.01em',
            fontSize: '24px',
            color: '#757575',
        },
        "& p": {
            fontSize: '15px',
            lineHeight: '17px',
            display: 'flex',
            justifyContent: 'center',
            letterSpacing: '0.01em',
            color: 'rgba(117, 117, 117, 1)',
            textAlign: 'center',
        },
        "& .custom-label": {
            justifyContent: 'flex-start',
        }
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #F1F1F1',
        backgroundColor: "#DFEEFF",
        padding: '0 10px'
    },
    shippingLayout: {
        "& .custom-label": {
            // marginTop: '10px !important',
        }

    },
    marginTopTwenty: {
        marginTop: '25px',
    },
    cardHeaderTitle: {
        display: "flex",
        alignItems: "center"
    },
    container: {
        paddingRight: '25px'
    },
    footer: {
        flex: "0 1 40px",
        gap: '10px',
        padding: '0 20px',
        justifyContent: 'center',
        display: 'flex',
        margin: '25px 0',
        "& button": {
            minWidth: '138px',
        }
    },
    footerRight: {
        float: "right",
        marginRight: "-8px",
        display: 'flex',
        gap: '10px'
    },
    rechargeForm: {
  
    },
    crossButton: {
        position: "relative",
        top: "-12px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    profileContent: {
        paddingLeft: '5px',
        "& .userName": {
            fontWeight: 600,
            fontWize: '16px',
        },
        "& .userPhone": {
            color: 'grey',
            fontWize: '16px',
        }
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        "& img": {
            width: '50px',
            borderRadius: '50%',
        }
    },
    closeIcon: {
        cursor: 'pointer',
        color: 'white',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#FFFFFF',
        letterSpacing: '0.02em',
    },
    labelText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549',
        padding: "14px 0px 5px",
    },
    valueText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549',
        padding: "6px 0"
    },
    paddingUpdate: {
        display: 'inline-block',
        paddingTop: '20px',
    },
    backBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        color: '#0049A3',
        borderRadius: '4px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        border: '1px solid #0049A3',
    },
    changeBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        backgroundColor: '#0049A3',
        borderRadius: '4px',
        marginRight: '5px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
    secHeading: {
        color: '#4F4F4F',
        fontSize: '16px',
        lineHeight: '12px',
        padding: '12px 6px',
        borderBottom: '1px solid #BBBEBF',
        width: '100%',
        marginBottom: '15px',
    },
    selectBaseInput: {
        width: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        margin: '5px 0px 5px',
        backgroundColor: 'white',
        minHeight: '35.63px',
        padding: '0px 8px 0px 0px',
        height: '35.63px',
        opacity: '0.7',
        border: '0.5px solid #777D80',
        borderRadius: '4px',



        "& .MuiInputBase-input": {
            padding: "0px 24px 0px 12px",
            minHeight: "35.63px",
            fontSize: "14px",
            color: "#4A4A4A",
            '&:focus': {
                background: 'transparent',
                borderRadius: "4px",
                outline: 0,
            },
            "&:before": {
                borderBottom: 'none !important',
            },
        },
        "& .MuiInput-underline:before": {
            borderBottom: 'none'
        },

        "& .Mui-disabled": {
            backgroundColor: "#f3f3f3",
            color: "#4A4A4A"
        },
        "& input::-webkit-outer-spin-button": {
            appearance: "none",
            margin: 0
        },
        "& input::-webkit-inner-spin-button": {
            appearance: "none",
            margin: 0
        },
        "& input[type=number]": {
            appearance: "textfield"
        },
    },

    messageContainer: {
        border: '1px solid #E9E9E9',
        padding: '10px',
        borderRadius: '10px',
        minHeight: '238px',
    },

    messageArea: {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'nowrap',
        margin: '6px 0px',
        "& span": {
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '16px',
            marginLeft: '5px',
            color: '#878787',
        }
    },
    messageText: {
        background: '#E4E4E4',
        borderRadius: '12px',
        padding: '8px 21px',
        fontWeight: 400,
        fontSize: '15px',
        color: '#011627',
        width: 'fit-content',

    },

    messageSendField: {
        border: '1px solid #E9E9E9',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '5px',
        "& input": {
            padding: '10px',
            border: 0,
            outline: 0,
        }
    }
}));