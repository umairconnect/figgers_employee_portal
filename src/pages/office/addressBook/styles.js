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

        "& .NewRequest": {
            background: '#323FD4',
            border: '1px solid transparent',
        },
        "& .NewRequest:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #323FD4 0%, #323FD4 100%)',
            backgroundRepeat: 'no-repeat',
        },
        "& .Mui-checked + span > .NewRequest": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #323FD4 0%, #323FD4 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .NewRequest::before": {
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

        "& .Accepted": {
            background: '#91CC04',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Accepted": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #91CC04 0%, #91CC04 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Accepted::before": {
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
        "& .Accepted:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #91CC04 0%, #91CC04 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .InProcessing": {
            background: '#FE9800',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .InProcessing": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FE9800 0%, #FE9800 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .InProcessing::before": {
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
        "& .InProcessing:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FE9800 0%, #FE9800 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .Dispatch": {
            background: '#C48958',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Dispatch": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #C48958 0%, #C48958 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .Dispatch::before": {
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

        "& .Dispatch:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #C48958 0%, #C48958 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Completed": {
            background: '#57DFBE',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Completed": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #57DFBE 0%, #57DFBE 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .Completed::before": {
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

        "& .Completed:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #57DFBE 0%, #57DFBE 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Rejected": {
            background: '#F15252',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Rejected": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #D6B482 0%, #6F4200 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Rejected::before": {
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
        "& .Rejected:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #F15252 0%, #F15252 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .MuiCheckbox-colorPrimary": {
            position: 'absolute',
        }
    },
    checkBoxFormLabel: {
        margin: '0px 2px 5px 2px',
        width: '16%',
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