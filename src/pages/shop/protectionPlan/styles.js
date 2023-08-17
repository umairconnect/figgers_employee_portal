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
    recentOrders: {
        border: '1px solid #DADADA',
        minHeight: '220px',
        display: 'flex',
        background: '#FFFFFF',
        textAlign: 'center',
        borderRadius: '10px',
        marginRight: '10px',
        flexFlow: 'column',
        justifyContent: 'center',
        padding: '15px',
        "& img": {
            margin: '10px auto',
            maxWidth: '43px',
            height: '43px',
            objectFit: 'contain'
        },
        "& p": {
            margin: '5px',
            fontWeight: 700,
            fontSize: '16px',
        },
        "& h4": {
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#848789',
        },
        "& .pending": {
            fontWeight: 500,
            color: '#FE9800;'
        }
    },
    DateTime: {
        fontStyle: 'normal',
        fontWeight: '400 !important',
        fontSize: '14px !important',
        lineHeight: '16px',
        letterSpacing: '0.01em',
        color: '#848789',
        "& img": {
            margin: '0 2px',
            maxWidth: 'unset',
            height: 'unset',
            objectFit: 'unset',
            position: 'relative',
            top: '-2px',
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
        '& .custom-grid': {
            '& img': {
                maxWidth: '43px',
                height: '43px',
                objectFit: 'contain'
            }
        }
    },
    BigButton: {
        borderRadius: '15px',
        background: 'linear-gradient(180deg, rgba(0, 73, 163, 0.3) 0%, #0049A3 100%);',
        boxShadow: '0px 4px 12px rgba(0, 73, 163, 0.3);',
        position: 'relative',
        margin: '0px 10px',
        marginBottom: '20px',
        minHeight: '250px',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        color: 'white',
        "& h1": {
            fontSize: '80px',
            lineHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            margin: 0,
        },
        "& h3": {
            lineHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            margin: 0,
            fontSize: '32px',
        }
    },
    AddIcon: {
        "& svg": {
            color: 'white',
            fontSize: '115px',
            fontWeight: 900,
            marginRight: '0px',
        }
    },
    paper: {
        borderRadius: '15px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        margin: '0px 10px',
        marginBottom: '20px',
        minHeight: '250px',
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
    financialBox: {
        "& p": {
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: '22px',
            display: 'flex',
            alignItems: 'center',
            color: '#757575',
            margin: '10px 0',
        },
        "& h2": {
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            color: '#2D4D95',
            margin: '6px 0',

        },
        "& img": {
            margin: '16px 0',
        }
    },


    checkBoxBtn: {
        marginLeft: "0px",
        paddingRight: "5px",
        "& + .MuiFormControlLabel-label": {
            color: "#52575C",
            fontSize: "14px",
            width: '100%',
            textAlign: 'center',
            margin: '5px',
        },
        "& .MuiSvgIcon-root": {
            opacity: 0,
            display: 'none',
        }
    },
    checkBoxFormLabel: {
        margin: '0px 2px 5px 2px',
        width: '25%',
    },

    statusBoxes: {
        alignItems: 'inherit',
        width: '100%',
        borderRadius: '18px',
        padding: '6px 0px 0px 8px',
        margin: 'auto',
        display: 'flex',
        minHeight: '90px',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        padding: '0 20px',
        textAlign: 'left',
        "& img": {
            padding: '0px 8px 0px 0px',
            marginLeft: 'auto',
            maxWidth: '53px',
        },
        "& h3": {
            fontSize: '25px',
            margin: '5px 0',
            display: 'flex',
            fontWeight: 500,
            alignItems: 'center',
        },
        "& h1": {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '43px',
            display: 'flex',
            alignItems: 'center',
            color: '#FFFFFF',
            margin: '0 9px',
            justifyContent: 'right',
        }
    },
    statusBoxContainer: {
        display: 'flex',
        marginBottom: '10px',
        width: '100%',

        "& .active": {
            background: '#DCFCE7',
            border: '1px solid transparent',
        },
        "& .active h3": {
            color:  '#10B921',
         },
        "& .active:hover": {
            boxShadow: '0px 0px 3px 1px #00000021',
            backgroundImage: 'linear-gradient(180deg, #DCFCE7 0%, #acffc9 100%)',
            backgroundRepeat: 'no-repeat',
        },
        "& .Mui-checked + span > .active": {
            boxShadow: '0px 0px 3px 1px #00000021',
            backgroundImage: 'linear-gradient(180deg, #DCFCE7 0%, #acffc9 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .active::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '25px',
            height: '25px',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },

        "& .in_active": {
            background: '#fcdcdc',
            border: '1px solid transparent',
        },
        "& .in_active h3": {
           color:  '#FF0000',
        },
        "& .Mui-checked + span > .in_active": {
            boxShadow: '0px 0px 3px 1px #00000021',
            backgroundImage: 'linear-gradient(180deg, #fcdcdc 0%, #fcdcdc 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .in_active::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '25px',
            height: '25px',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        "& .in_active:hover": {
            boxShadow: '0px 0px 3px 1px #00000021',
            backgroundImage: 'linear-gradient(180deg, #fcdcdc 0%, #fcdcdc 100%);',
            backgroundRepeat: 'no-repeat',
        },

        
    },

    gridActions: {
        textAlign: 'right',

    }, changeBtn: {
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        backgroundColor: '#0049A3',
        borderRadius: '6px',
        marginRight: '5px',
        padding: '8px 16px',
        textTransform: 'capitalize',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
    inputSearchContainer: {
        position: 'relative'
    },

    gridHeader: {
        padding: '6px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
    },

}));