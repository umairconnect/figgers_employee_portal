import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "750px"
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "750px"
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        // padding: "18px 10px 10px 20px",
        padding: '0px 0px 15px 0px'
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        padding: '15px 10px',
        alignItems: 'baseline',
        backgroundColor: "#0049A3",
        justifyContent: 'space-between',
        cursor: 'move',
        '& p': {
            textTransform:"initial"
        }
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '10px 20px',
        "& .custom-label": {
            margin: '0 !important',
            marginTop: '15px !important',
        }
    },
 
    headform: {
        padding: '15px 10px',
        alignItems: 'center',
        "& h1": {
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#777D80',
        },
        "& h2": {
            color: '#777D80',
            fontSize: '16px',
            letterSpacing: '0.01em',
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
    accountInfor: {
        border: '1px solid #dbdbdb',
        borderRadius: '12px',
        padding: '2px 12px',
        "& .MuiTypography-root": {
            paddingTop: '10px',
        }
    },
    marginTopTwenty: {
        marginTop: '25px',
    },
    upsImage: {
        marginTop: "10px",
        maxWidth: '512px',
        "& img": {
            borderRadius: '12px',
            padding: 0,
            margin: 0,
            width: '100%',
        }
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
        padding: '15px 20px',
        background: '#F8F9FB',
    },
    footerRight: {
        float: "right",
        marginRight: "-8px",
        display: 'flex',
        gap: '10px'
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
    ListContain: {
        paddingTop: '10px',
    },

    recentActivityList: {
        marginTop: '0px',
        "& h2": {
            paddingTop: '15px',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#2D4D95',
            padding: 0,
            margin: 0,
        }
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
    },
    contentTime: {
        marginLeft: 'auto',
        fontWeight: 400,
        fontSize: '14px !important',
        lineHeight: '16px',
        textAlign: 'right',
        
        letterSpacing: '0.01em',
        color: '#000000 !important',
    },
    
    smallRadius: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
        position: 'relative;',
        left: '9px',
        borderRadius: '50px',
        background: '#4D80C9',
        top: '3px',
    },
    smallRadiusCustomer: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
        position: 'relative;',
        left: '9px',
        borderRadius: '50px',
        background: '#adcfff',
        top: '3px',
    },
    userDetail: {
        width: '49px',
        height: '49px',
        top: '2px',
        position: 'relative',
        left: '58px',
        background: '#D9D9D9',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#474646',
        margin: 'auto',
        
    },
    borderContent: {
        padding: '7px 5px 7px 40px',
        borderLeft: '1px solid #d5d5d5',
        color: 'black',
        maxWidth: '85%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: window.max1550 ? '15px' : window.max1750 ? '18px' : '18px',
        "& span": {
            fontSize: '12px',
            display: 'block',
        }
    },
    floatRight: {
        float: 'right',
    },
    Leftcol: {
        paddingRight: '10px',
    },
    paddingLeftRight: {
        padding: '0 15px',
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
    deleteBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        backgroundColor: '#F56C6C',
        borderRadius: '4px',
        marginRight: '5px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#F56C6C',
        }
    },
    secHeading: {
        color: '#4F4F4F',
        fontSize: '16px',
        lineHeight: '12px',
        padding: '25px 6px 13px',
        borderBottom: '1px solid #BBBEBF',
        width: '100%',
        marginBottom: '15px',
        fontFamily: 'Lato',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        "& .MuiSvgIcon-root": {
            fontSize: '22px',
            marginLeft: '5px',
            color: '#0049a3',
        }
    },
    selectBaseInput: {
        width: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        margin: '5px 0px 5px',
        backgroundColor: 'white',
        minHeight: '35.63px',
        padding: '0px 8px 0px 12px',
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
    minusIcon: {
        position: 'relative',
        top: '10px',
    }
}));