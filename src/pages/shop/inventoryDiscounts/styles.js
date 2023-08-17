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
        "& .custom-grid .productImg": {
            margin: '5px 5px',
            width: '40px', 
            height: '40px', 
        },
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
            fontSize: '100px',
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
            justifyContent: 'center',
        },
        "& h2": {
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            color: '#2D4D95',
            margin: '6px 0',
            justifyContent: 'center',
        },
        "& img": {
            margin: '16px 0',
            height: '38px',
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
      SmText: {
        margin: '8px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#757575',
      },
    statusBoxContainer: {
        display: 'flex',
        marginBottom: '10px',
        width: '100%',

        "& .viewStock": {
            background: '#EDEDED',
            border: '1px solid #d2d2d2',
        },
        "& .viewStock h3": {
            color:'#DA0B0B !important',
        },
        "& .viewStock h2": {
            color:'#DA0B0B !important',
        },
        "& .viewStock:hover": {
            border: '1px solid #DA0B0B;',
        },
        "& .Mui-checked + span > .viewStock": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #DA0B0B',
            position: 'relative',
        },
        "& .Mui-checked + span > .viewStock::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '28px',
            height: '28px',
            border: '1px solid #01da01',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },

        "& .lowStock": {
            background: '#EDEDED',
            border: '1px solid #d2d2d2',
        },
        "& .lowStock h3": {
            color:'#FE9800 !important',
        },
        "& .lowStock h2": {
            color:'#FE9800 !important',
        },
        "& .Mui-checked + span > .lowStock": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #FE9800',
            position: 'relative'
        },
        "& .Mui-checked + span > .lowStock::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '28px',
            height: '28px',
            border: '1px solid #01da01',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        "& .lowStock:hover": {
            border: '1px solid #FE9800',
        },

        "& .averageStoke": {
            background: '#EDEDED',
            border: '1px solid #d2d2d2',
        },
        "& .averageStoke h2": {
            color:'#0686D8 !important',
        },
        "& .averageStoke h3": {
            color:'#0686D8 !important',
        },
        "& .Mui-checked + span > .averageStoke": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #0686D8',
            position: 'relative',
        },
        "& .Mui-checked + span > .averageStoke::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '28px',
            height: '28px',
            border: '1px solid #01da01',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        "& .averageStoke:hover": {
            border: '1px solid #0686D8',
        },

        "& .goodStoke": {
            background: '#EDEDED',
            border: '1px solid #d2d2d2',
        },
        "& .goodStoke h2": {
            color: '#068B14 !important',
        },
        "& .goodStoke h3": {
            color:'#068B14 !important',
        },
        "& .Mui-checked + span > .goodStoke": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #33776c',
            position: 'relative',
        },
        "& .Mui-checked + span > .goodStoke::before": {
            content: "'✔'",
            fontSize: '19px',
            fontWeight: 'bolder',
            color: '#01da01',
            display: 'inline-block',
            width: '28px',
            height: '28px',
            border: '1px solid #01da01',
            position: 'absolute',
            background: 'white',
            right: 5,
            top: 5,
            borderRadius: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        
        "& .goodStoke:hover": {
            border: '1px solid #33776c',
        },
        "& .MuiCheckbox-colorPrimary": {
            position: 'absolute',
        }
    },

}));