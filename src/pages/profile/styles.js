import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({

    appBarSpacer: {
        minHeight: '64px',
        background: 'white',
    },
    header: {
        background: '#ECF2FF',
        display: 'flex',
        alignItems: 'center',
        padding: "0 15px",
        height: '58px',
        "& h2": {
            padding: '0px 15px',
            // fontSize: '22px',
            // fontWeight: 600,
            // lineHeight: '28.8px',
            // color: '#2D4D95',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 24,
            lineHeight: '29px',
            color: '#2D4D95',
        }
    },
    boxContainer: {
        padding: '10px 20px',

    },
    formContaner: {
        "& .MuiGrid-root": {
            padding: '0px 5px',
        },
        "& input": {
            marginRight: '5px',
        }
    },

    whiteBox: {
        border: '1px solid #e1e1e1',
        padding: '10px',
        borderRadius: '10px',
        margin: '7px',
        background: 'white',
        "& h3": {
            fontSize: '17px',
            borderBottom: '1px solid #dedede',
            padding: '10px',
            fontWeight: '600'
        }
    },
    informationSec: {
        display: 'flex',
        "& h4": {
            padding: '5px 0',
            fontSize: '29px',
            fontWeight: '400',
            margin: 0,
        }
    },

    ProfileDetails: {
        paddingLeft: '10px',
        "& h3": {
            border: 0,
            padding: '0px 0px',
        },
        "& p": {
            fontSize: '16px',
        }
    },

    footer: {
        flex: "0 1 40px",
        width: '100%',
        marginLeft: 'auto',
        paddingBottom: window.isIpadView ? '80px' : '',
        padding: '12px 5px',
    },
    footerRight: {
        float: "right",
        display: 'flex',
        "& Button": {
            
        }
    },

    profileImg: {
        minWidth: '130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '130px',
        minWidth: '130px',
        background: 'gainsboro',
        borderRadius: '15px',
        position: 'relative',
        alignSelf: 'center',
        "& img": {
            position: 'absolute',
            maxWidth: '130px',
            padding: '10px',
            borderRadius: '50%',
            margin: 'auto',
            left: 0,
            height: '130px',
        }
    },
    EditICon: {
        width: '40px',
        padding: '9px',
        zIndex: 4,
        right: 0,
        bottom: 0,
        background: 'rgba(25, 118, 210, 1)',
        borderRadius: '16px',
        cursor: 'pointer',
        height: 'unset !important',
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
    backBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        color: '#0049A3',
        borderRadius: '4px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        marginRight: '8px',
        border: '1px solid #0049A3',
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

}))