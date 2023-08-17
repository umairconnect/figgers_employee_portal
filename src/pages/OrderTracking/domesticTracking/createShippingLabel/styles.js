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
        cursor: 'move',
        justifyContent: 'space-between',
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
            display: 'flex',
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
    addNotification: {
        color: '#0049a3',
        display: 'inline-flex',
        padding: '0px 10px',
        alignItems: 'center',
        cursor: 'pointer',
        alignItems: 'center',
    },
    secHeading: {
        color: '#4F4F4F',
        fontSize: '16px',
        lineHeight: '12px',
        padding: '25px 6px 13px',
        borderBottom: '1px solid #BBBEBF',
        width: '100%',
        marginBottom: '15px',
        display: 'flex',
        fontFamily: 'Lato',
        fontWeight: 600,
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
    minusIcon: {
        position: 'relative',
        top: '10px',
    }
}));