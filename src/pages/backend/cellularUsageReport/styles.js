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
    customerInformation: {
        "& p": {
            margin: '5px 0',
            color: '#545B5F',
            fontSize: '16px',
        }
    },
    
    whiteInfo: {
        background: '#FFFFFF',
        borderRadius: '15px',
        padding: '15px',
        marginBottom: '8px',
        "& p": {
            margin: 0,
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
    cardHeaderTitle: {
        display: "flex",
        alignItems: "center"
    },
    cardTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '24px',
        color: '#3C4549',
        marginRight: '10px',
        padding: '9px 0px',
    },
    customerBox: {
        border: '1px solid #DADADA',
        minHeight: '220px',
        display: 'flex',
        background: '#FFFFFF',
        textAlign: 'center',
        borderRadius: '10px',
        marginRight: '10px',
        flexFlow: 'column',
        justifyContent: 'center',
        "& img": {
            margin: '10px auto',
            borderRadius: '50px',
            width: '100px',
            height: '100px',
        },
        "& .placeholder": {
            margin: '10px auto',
            border: '3px solid #0686d8',
            borderRadius: '50px',
            width: '100px',
            height: '100px',
            padding: '8px',
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
            margin: '5px 5px',
            borderRadius: '50px',
            width: '40px',
            height: '40px',
        },
        "& .custom-grid .placeholder": {
            margin: '5px 5px',
            border: '2px solid #0686d8',
            borderRadius: '50px',
            width: '40px',
            height: '40px',
            padding: '5px',
        },
        "& hr": {
            height: '1px',
            width: '100%',
            opacity: '0.2',
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


    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    circularImage: {
        borderRadius: '100%',
        width: '120px', /* Adjust the width as per your requirements */
        height: '120px' /* Adjust the height as per your requirements */
    },
    gridHeader: {
        padding: '6px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
    },
    gridActions: {
        textAlign: 'right',

    }, changeBtn: {
        fontSize: '14px',
        position: 'relative',
        top: '4px',
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
 
    inputSearchContainer: {
        position: 'relative'
    }

}));