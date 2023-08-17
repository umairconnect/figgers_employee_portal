import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "650px"
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "650px"
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
    content: {
        flex: "1 1 auto",
        padding: '30px 20px',
        "& .custom-label": {
            margin: '0 !important',
            marginTop: '15px !important',
        },
        "& h1": {
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#777D80',
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
        alignItems: 'center',
        "& h4": {
            padding: '5px 0',
            fontSize: '23px',
            fontWeight: '400',
            margin: 0,
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
        objectFit: 'cover',
        "& img": {
            position: 'absolute',
            maxWidth: '130px',
            width: '100%',
            borderRadius: '50%',
            margin: 'auto',
            left: 0,
            height: '130px',
            padding: '5px',
        }
    },

    selectBaseInput: {
        border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        backgroundColor: "white",
        marginBottom: 4,
        marginTop: 4,
        "& .MuiInputBase-input": {
          padding: "0px 24px 0px 12px",
          minHeight: "35.63px",
          fontSize: "14px",
          color: "#4A4A4A",
          '&:focus': {
            border: "1px solid #00b2e3",
            borderRadius: "4px",
            outline: 0,
          },
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
      
    textArea: {
        "& textarea": {
            minHeight: '80px',
        }
    },
    EditICon: {
        width: '34px !important',
        padding: '9px',
        zIndex: 4,
        right: '2px !important',
        bottom: '2px !important',
        left: 'unset !important',
        background: 'rgb(37 146 254)',
        borderRadius: '16px',
        cursor: 'pointer',
        height: 'unset !important',
        padding: '6px !important',
    },

 
}));