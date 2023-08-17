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
    timeOrders: {
        border: '1px solid #0686D8',
        background: 'linear-gradient(180deg, #D7D7D7 0%, #FFF 60.42%)',
        minHeight: '220px',
        display: 'flex',
        textAlign: 'center',
        borderRadius: '10px',
        marginRight: '10px',
        flexFlow: 'column',
        justifyContent: 'center',
        "& p": {
            color: '#0686D8',
            fontFamily: 'Lato',
            fontSize: '19px',
            textTransform: 'uppercase',
            fontWeight: 600,
            margin: '10px 0',
            marginBottom: '0 !important',
        },
        "& h4": {
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#848789',
        },
        "& h1": {
            color: '#0686D8',
            textAlign: 'center',
            fontFamily: 'Lato',
            fontSize: '60px',
            margin: 0,
            lineHeight: '50px',
        }
    },
    filterBtn: {
        border: '1px solid #41416e',
        padding: '5px 17px',
        fontWeight: 600,
        color: '#41416e',
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
        cursor:' pointer',
        "& img": {
            margin: '10px auto'
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
    recentTime: {
        fontSize: '20px !important',
        color: 'black !important',
        fontWeight: '700 !important',
    },
    CalendarDate: {
        "& h3": {
            justifyContent: 'center',
            display: 'flex',
            gap: '0px',
            alignItems: 'center',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#848789',
        },
        "& img": {
            margin: '0px 5px',
        },
        "& b": {
            color: 'black',
            margin: '0 6px',
        }
    },
    heading: {
        fontWeight: 700,
        fontSize: '20px',
        margin: '0px',
        marginTop: '7px',
        color: '#3C4549',
    },
    container: {
        padding: '6px 15px',
    },
    BigButton: {
        borderRadius: '15px',
        background: 'linear-gradient(180deg, rgba(0, 73, 163, 0.3) 0%, #0049A3 100%);',
        boxShadow: '0px 4px 12px rgba(0, 73, 163, 0.3);',
        position: 'relative',
        margin: '0px 10px',
        marginBottom: '20px',
        minHeight: '220px',
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

    chartPaper: {
        borderRadius: '15px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        minHeight: '440px',
    },
    inventorychartPaper: {
        borderRadius: '15px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        minHeight: '440px',
        "& .ant-pagination": {
            display: 'none',
        },
    },
    chartTop: {
        display: 'flex',
        alignItems: 'baseline',
        background: '#CEDDFF',
        borderRadius: '15px 15px 0px 0px',
        padding: '15px',
    },
    chartBottom: {
        padding: '0px 15px',
       
    },

    FilterArea: {
        marginLeft: 'auto',
        "& select": {
            border: '1px solid #4D80C9',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '14px',
            color: '#676F80',

        }
    },
    countData: {
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        marginTop: '23px',
        "& p": {
            fontSize: '16px',
            margin: 0,
            fontWeight: '700',
            color: 'rgba(0, 148, 255, 1)',
        },
        "& h2": {
            lineHeight: 1,
            margin: 0,
            fontSize: '60px',
            fontWeight: '700',
            color: 'rgba(0, 148, 255, 1)'
        }
    },
    graphBottom: {
        padding: '20px 15px 0px 15px',
    },

    reviewHeading: {
        fontSize: window.max1550 ? '19px' : '24px',
        lineHeight: '29px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#41416E',
        fontWeight: '700',
        margin: 0,
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
        minHeight: '250px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#EDEDED',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
        "& h2": {
            fontSize: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            lineHeight: 1,
        },
        "& h3": {
            fontSize: '18px',
            textAlign: 'center',
            margin: '10px 0',
        }
    },
    topLinks: {
        marginLeft: 'auto',
        fontWeight: '500',
        color: '#0049A3',
        fontSize: '14px',
        fontSize: window.max1550 ? '12px' : '14px',
        display: 'flex',
        alignItems: 'end',
        "& span": {
            margin: '0px 4px',

        }
    },
    dot1: {
        height: window.max1550 ? '12px' : '15px',
        width: window.max1550 ? '12px' : '15px',
        backgroundColor: '#0686D8',
        borderRadius: '50%',
        display: 'inline-block',
        margin: window.max1550 ? '0px 4px' : '0px 10px',
    },
    dot2: {
        height: window.max1550 ? '12px' : '15px',
        width: window.max1550 ? '12px' : '15px',
        backgroundColor: '#0049A3',
        borderRadius: '50%',
        display: 'inline-block',
        margin: window.max1550 ? '0px 4px' : '0px 10px',
    },
    packageUpdateDot: {
        height: window.max1550 ? '12px' : '15px',
        width: window.max1550 ? '12px' : '15px',
        backgroundColor: '#843C9F',
        borderRadius: '50%',
        display: 'inline-block',
        margin: window.max1550 ? '0px 4px' : '0px 10px',
    },
    servicesUsedDot: {
        height: window.max1550 ? '12px' : '15px',
        width: window.max1550 ? '12px' : '15px',
        backgroundColor: '#FE9800',
        borderRadius: '50%',
        display: 'inline-block',
        margin: window.max1550 ? '0px 4px' : '0px 10px',
    },
    statusBoxContainer: {
        display: 'flex',
        marginBottom: '10px',
        width: '100%',

        "& .viewStock": {
            background: '#EDEDED',
            border: '1px solid #EDEDED',
        },
        "& .viewStock h3": {
            color: '#DA0B0B !important',
        },
        "& .viewStock h2": {
            color: '#DA0B0B !important',
        },
        "& .viewStock:hover": {
            border: '1px solid #DA0B0B;',
        },
        "& .Mui-checked + span > .viewStock": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #DA0B0B',
        },

        "& .lowStock": {
            background: '#EDEDED',
            border: '1px solid #EDEDED',
        },
        "& .lowStock h3": {
            color: '#FE9800 !important',
        },
        "& .lowStock h3": {
            color: '#FE9800 !important',
        },
        "& .Mui-checked + span > .lowStock": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #FE9800',
        },
        "& .lowStock:hover": {
            border: '1px solid #FE9800',
        },

        "& .averageStoke": {
            background: '#EDEDED',
            border: '1px solid #EDEDED',
        },
        "& .averageStoke h2": {
            color: '#0686D8 !important',
        },
        "& .averageStoke h3": {
            color: '#0686D8 !important',
        },
        "& .Mui-checked + span > .averageStoke": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #0686D8',
        },
        "& .averageStoke:hover": {
            border: '1px solid #0686D8',
        },

        "& .Delivered": {
            background: '#EDEDED',
            border: '1px solid #EDEDED',
        },
        "& .Mui-checked + span > .Delivered": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #33776c',
        },
        "& .Delivered:hover": {
            border: '1px solid #33776c',
        },



        "& .MuiCheckbox-colorPrimary": {
            position: 'absolute',
        }
    },

    addNewDeal: {
        border: 'dashed',
        margin: '19px',
        minHeight: '145px',
        fontSize: '19px',
        color: '#0686D8',
        borderRadius: '15px',
        marginTop: '10px',
        marginBottom: '8px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 30px',
        marginTop: '23px',
        textAlign: 'center',
        maxWidth: '149px',
        margin: '19px',
        marginLeft: '32px',
        fontWeight: 600,
        cursor: 'pointer',
        "& svg": {
            width: '1.5em',
            height: '1.5em',
            marginBottom: '6px',
        },
        "&:hover": {
            border: '3px dashed #00558b',
        }
    },

    greyRactBox: {
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column',
        marginBottom: '8px',
        marginTop: '10px',
        minHeight: '170px',
        cursor: 'pointer',
        "&:hover": {
        },
        "&:hover > p": {
            color: '#0049a3',
        },
        "& h3": {
            fontSize: '36px',
            color: '#0049A3',
            margin: 0,
        },
        "& p": {
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#757575',
            margin: '6px 0 0 0',
        },
        "& p.Heighlited": {
            fontSize: '24px',
            lineHeight: '29px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#0049a3',
            margin: '20px 25px',
        },
        "& svg": {
            width: '45px',
            fill: '#0049a3',
            height: '45px',
        },
        "& img": {
            maxWidth: '124px',
        }
    },
}));