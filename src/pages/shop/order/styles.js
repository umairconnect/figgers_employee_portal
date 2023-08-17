import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    header: {
        background: '#CEDDFF',
        borderBottom: '1px solid #4D80C9',
        display: 'flex',
        alignItems: 'center',
        height: '49px',
        padding: '0px 0px 0 15px',
        "& h1": {
            padding: '0px 0px 0 15px',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '28.8px',
            color: '#2D4D95',
        }

    },
    heading: {
        fontWeight: 700,
        fontSize: '20px',
        margin: '0px',
        color: '#3C4549',
    },
    container: {
        padding: '6px 15px',
        "& .custom-grid img": {
            margin: '0px 5px', 
            width: '40px', 
            height: '40px', 
        },
        "& .custom-grid .placeholder": {
            margin: '0px 5px',
            border: '2px solid #0686d8',
            width: '40px', 
            height: '40px', 
            padding: '5px',
        },
    },
    ListContain: {
        paddingTop: '10px',
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
    },
    recentActivityList: {
        marginTop: '0px',
        "& h2": {
            lineHeight: '16px',
            paddingTop: '0px',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '0.01em',
            color: '#2D4D95',
            padding: 0,
            margin: 0,
        }
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

    addfield: {
        width: 'fit-content',
        display: 'flex',
        border: '1px solid #757575',
        margin: '10px auto',
        padding: '0px',
        minWidth: '90%',
        background: '#FFFFFF',
        borderRadius: '5px',
        "& img": {
       
        },
        "& textarea": {
            border: 0,
            padding: '8px',
        },
        "& textarea:focus-visible": {
            outline: 'none',
        }
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
    borderContent: {
        padding: window.max1550 ? '10px 5px 10px 30px' : '10px 5px 10px 30px',
        borderLeft: '1px solid #d5d5d5',
        color: 'rgba(0, 73, 163, 1)',
        maxWidth: '85%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: window.max1550 ? '15px' : window.max1750 ? '18px' : '18px',
        "& span": {
            fontSize: '12px',
            display: 'block',
            color: 'black',
        }
    },
    AddIcon: {
        "& svg": {
            color: '#d9d9d9',
            fontSize: '115px',
            fontWeight: 900,
            marginRight: '0px',
        }
    },
    reviewContent: {
        "& h2": {
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '22px',
            display: 'flex',
            alignItems: 'center',
            color: '#757575',
        },
        "& p": {
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '14px',
            display: 'flex',
            alignItems: 'center',
            color: '#757575',
        },
        "& h1": {
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '22px',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            textAlign: 'center',
            color: '#2D4D95',
        }
    },
    paper: {
        borderRadius: '15px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        margin: '0px 10px',
        marginBottom: '20px',
        minHeight: '320px',
    },
    paymentPaper: {
        borderRadius: '15px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        margin: '0px 10px',
        marginBottom: '20px',
    },
    paperTop: {
        display: 'flex',
        alignItems: 'baseline',
        background: '#CEDDFF',
        borderRadius: '15px 15px 0px 0px',
        padding: '15px',
    },
    paperHeading: {
        fontSize: window.max1550 ? '19px' : '24px',
        lineHeight: '29px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#41416E',
        fontWeight: '700',
        margin: 0,
    },
    linkClick: {
        cursor: 'pointer',
    },
    paperBottom: {
        padding: '15px 15px',
    },
    FilterArea: {
        marginLeft: 'auto',
        "& select": {
            border: '1px solid #4D80C9',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '14px',
            color: '#676F80',
        },
        "& .MuiInputBase-root": {
            margin: 0,
            height: 'auto',
            minHeight: 'auto',
        }
    },
    productDetails: {

        "& p": {
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            display: 'flex',
            alignItems: 'center',
            color: '#757575',
            margin: '10px 0',
        },
        "& span": {
            marginLeft: 'auto',
            lineHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            color: '#2D4D95',
            margin: 'auto',

        },

    },
    unfulfilLink: {
        fontSize: '14px',
        lineHeight: '17px',
        display: 'flex',
        alignItems: 'center',
        textalign: 'center',
        color: '#0078D4',
        margin: '0',
    },
    boxAction: {
        marginLeft: 'auto',
        marginTop: '25px',
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
        marginRight: '7px',
    },
    changeBtn: {
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        backgroundColor: '#0049A3',
        borderRadius: '6px',
        marginRight: '5px',
        padding: '6px 16px',
        textTransform: 'capitalize',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
    textRows: {
        display: 'flex',
        margin: '6px 0',
        "& h4": {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            color: '#000000',
        }
    },
    leftCol: {
        minWidth: '140px',
    },
    homeAddress: {
        "& h3": {
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '27px',
            display: 'flex',
            alignItems: 'center',
            color: '#000000',
        },
        "& h1": {
            fontWeight: 700,
            fontSize: '21px',
            display: 'flex',
            borderBottom: '1px solid #d1d1d1',
            alignItems: 'center',
            textAlign: 'center',
            color: '#757575',
            margin: '46px 0px 10px 0',
        },
        "& img": {
            width: '100%',
        }
    },
    customerInfo: {
        textAlign: 'center',
        cursor: 'pointer',
        "& p": {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            display: 'flex',
            alignItems: 'center',
            color: '#757575',
            margin: '10px 0',
            textAlign: 'center',
            justifyContent: 'center',
            margin: 0,
        },
        "& h2": {
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#0049A3',
            textAlign: 'center',
            justifyContent: 'center',
            margin: 0,
        },
        "& img": {
            margin: '11px 0',
            width: '120px',
            borderRadius: '100px',
        }
    }

}));