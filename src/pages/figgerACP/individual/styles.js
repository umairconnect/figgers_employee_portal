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
            fontSize: '21px',
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

        "& .All": {
            background: '#10B921',
            border: '1px solid transparent',
        },
        "& .All:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #10B921 0%, #0B6714 100%)',
            backgroundRepeat: 'no-repeat',
        },
        "& .Mui-checked + span > .All": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #10B921 0%, #0B6714 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .All::before": {
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

        "& .Pending": {
            background: '#FFB13A',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Pending": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FFB13A 0%, #794A02 100%);',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Pending::before": {
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
        "& .Pending:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #FFB13A 0%, #794A02 100%);',
            backgroundRepeat: 'no-repeat',
        },

        "& .AttentionReq": {
            background: '#E11584',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .AttentionReq": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #E11584 0%, #A92686 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .AttentionReq::before": {
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
        "& .AttentionReq:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #E11584 0%, #A92686 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .NVFailed": {
            background: '#F56C6C',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .NVFailed": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #F56C6C 0%, #950F0F 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .NVFailed::before": {
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

        "& .NVFailed:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #F56C6C 0%, #950F0F 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Eligible": {
            background: '#685E68',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Eligible": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #685E68 0%, #302330 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },

        "& .Mui-checked + span > .Eligible::before": {
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
        
        "& .Eligible:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #685E68 0%, #302330 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Switch": {
            background: '#73AF79',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Switch": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #73AF79 0%, #6F4200 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Switch::before": {
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
        "& .Switch:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #73AF79 0%, #6F4200 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .Enrolled": {
            background: '#843C9F',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .Enrolled": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #843C9F 0%, #470E5C 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        },
        "& .Mui-checked + span > .Enrolled::before": {
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
        "& .Enrolled:hover": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #843C9F 0%, #470E5C 100%)',
            backgroundRepeat: 'no-repeat',
        },

        "& .EnrolledError": {
            background: '#8F7878',
            border: '1px solid transparent',
        },
        "& .Mui-checked + span > .EnrolledError": {
            boxShadow: '0px 0px 5px 3px #00000021',
            backgroundImage: 'linear-gradient(180deg, #8F7878 0%, #583030 100%)',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        },
        "& .Mui-checked + span > .EnrolledError::before": {
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
        "& .EnrolledError:hover": {
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