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
            padding: '0px 15px',
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '28.8px',
            color: '#2D4D95',
        }
    },
    statusBoxes: {
        alignItems: 'inherit',
        width: '100%',
        borderRadius: '18px',
        padding: '6px 0px 0px 8px',
        margin: 'auto',
        "& img": {
            padding: '0px 8px 0px 0px',
            marginLeft: 'auto',
            maxWidth: '53px',
        },
        "& h3": {
            color: 'white',
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
    gridHeader: {
        padding: '6px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
    },
    gridActions: {
        textAlign: 'right',

    },

    changeBtn: {
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

    statusBoxContainer: {
        display: 'flex',
        marginBottom: '10px',
        width: '100%',

        "& .Confirmed": {
            background: '#77C5F8',
            border: '1px solid transparent',
        },
        "& .Confirmed:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #77C5F8 0%, #00375B 100%)',
            backgroundRepeat: 'no-repeat',
        },
        "& .Mui-checked + span > .Confirmed": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #77C5F8 0%, #00375B 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Confirmed::before": {
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

        "& .Shipped": {
            background: '#FFB13A',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Shipped": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FFB13A 0%, #794A02 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Shipped::before": {
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
        "& .Shipped:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FFB13A 0%, #794A02 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .InTransit": {
            background: '#7CB7D2',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .InTransit": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #7CB7D2 0%, #003A56 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .InTransit::before": {
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
        "& .InTransit:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #7CB7D2 0%, #003A56 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .Delivered": {
            background: '#7EDACB',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Delivered": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #7EDACB 0%, #006050 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .Delivered::before": {
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

        "& .Delivered:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #7EDACB 0%, #006050 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Returned": {
            background: '#9AA2E9',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Returned": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #9AA2E9 0%, #2E3681 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .Returned::before": {
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

        "& .Returned:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #9AA2E9 0%, #2E3681 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Claimed": {
            background: '#D6B482',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Claimed": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #D6B482 0%, #6F4200 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Claimed::before": {
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
        "& .Claimed:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #D6B482 0%, #6F4200 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Deleted": {
            background: '#FF7784',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Deleted": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FF7784 0%, #82030F 100%);',
            backgroundRepeat: 'no-repeat',
        },
        "& .Deleted:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FF7784 0%, #82030F 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .Void": {
            background: '#8F7878',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Void": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #8F7878 0%, #583030 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        },
        "& .Mui-checked + span > .Void::before": {
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
        "& .Void:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #8F7878 0%, #583030 100%)',
            backgroundRepeat: 'no-repeat',
        },



        "& .MuiCheckbox-colorPrimary": {
            position: 'absolute',
        }
    },
    checkBoxFormLabel: {
        margin: '0px 2px 5px 2px',
        width: '14%',
    },
    checkBoxBtn: {
        marginLeft: "0px",
        paddingRight: "5px",
        "& + .MuiFormControlLabel-label": {
            color: "#52575C",
            fontSize: "14px",
            width: '100%',
        },
        "& .MuiSvgIcon-root": {
            opacity: 0,
            display: 'none',
        }
    },
    statusBoxContent: {
        "& h2": {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '36px',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            color: 'white',
            justifyContent: 'right',
            marginRight: '9px',
        },
        "& h5": {
            fontFamily: 'Lato',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            color: '#10B921',
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
    },
}));