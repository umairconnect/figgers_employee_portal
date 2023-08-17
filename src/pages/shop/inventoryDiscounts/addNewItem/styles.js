import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: '1150px',
        maxWidth: '1100px',
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",

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
        justifyContent: 'space-between',
        cursor: 'pointer',
        '& p': {
            textTransform: "initial"
        }
    },
    marginCheckField: {
        marginTop: '30px',
        padding: '0 15px',
        "& .MuiFormControlLabel-label": {
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '24px',
            textAlign: 'center',
            letterSpacing: '0.01em',
            color: '#757575',
        }
    },
    marginCheckField: {
        marginTop: '30px',
        padding: '0 15px',
        "& .MuiFormControlLabel-label": {
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '24px',
            textAlign: 'center',
            letterSpacing: '0.01em',
            color: '#757575',
        }
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '10px 20px',
        "& .custom-label": {
            margin: '0 !important',
            marginTop: '10px !important',
        },
        "& h2": {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '24px',
            marginTop: '20px',
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
        paddingRight: '25px',
        "& .MuiTypography-root": {
            fontFamily: 'Lato !important',
        }
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
    varientLabel: {
        padding: '0 15px',
        "& .MuiFormControlLabel-label": {
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '24px',
            textAlign: 'center',
            letterSpacing: '0.01em',
            color: '#757575',
            fontFamily: 'Lato',
        }
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
    deleteBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        backgroundColor: '#F56C6C',
        borderRadius: '4px',
        marginRight: '5px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#F56C6C',
        }
    },
    secHeading: {
        color: '#4F4F4F',
        fontSize: '16px',
        lineHeight: '12px',
        padding: '25px 6px 13px',
        borderBottom: '1px solid #BBBEBF',
        width: '100%',
        marginBottom: '15px',
        display: 'flex',
        fontFamily: 'Lato',
        fontWeight: 600,
        alignItems: 'center',
        "& .MuiSvgIcon-root": {
            fontSize: '22px',
            marginLeft: '5px',
            color: '#0049a3',
        }
    },
    selectBaseInputColor: {
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
        "& .MuiSelect-select": {
            position: 'relative',
            top: '9px',
        },
        "& .MuiFormLabel-root": {
            transform: 'none',
            fontSize: '14px !important',
        },
        "& .MuiInput-formControl": {
            marginTop: 0,
        },
        "& .MuiListItem-root": {
            margin: 0,
            padding: '4px 10px',
            borderRadius: '19px',
        },
        "& .MuiInputLabel-root": {
            fontSize: '18px',
            color: 'black',
            padding: '11px',
        },

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
        "& .MuiFormLabel-root": {
            transform: 'none',
            fontSize: '14px !important',
        },
        "& .MuiInput-formControl": {
            marginTop: 0,
        },
        "& .MuiListItem-root": {
            margin: 0,
            padding: '4px 10px',
            borderRadius: '19px',
        },
        "& .MuiInputLabel-root": {
            fontSize: '18px',
            color: 'black',
            padding: '11px',
        },

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
    minusIcon: {
        position: 'relative',
        top: '10px',
    },
    dragFile: {
        margin: '35px 34px',
        textAlign: 'center',
        border: '2px dotted #cccccc',
        padding: '34px',
        borderRadius: '10px',
        minHeight: '210px',
        cursor: 'pointer',
        "& img": {
            margin: '10px 0',
        }
    },
    multipleFilesHead: {
        width: '100%',
        margin: '5px auto',
    },
    multipleFiles: {
        margin: '35px 34px',
        textAlign: 'center',
        border: '2px dotted #cccccc',
        padding: '4px',
        borderRadius: '10px',
        minHeight: '210px',
        cursor: 'pointer',
        display: 'flex',
        flexFlow: 'wrap',
        "& img": {
            height: '100px',
            width: '100%',
            borderRadius: '15px',
            float: 'left',
            padding: '3px',
            objectFit: 'contain',
        },
    },
    RemoveImage: {
        background: 'black',
        color: 'white',
        fontSize: '16px',
        display: 'flex',
        width: '24px',
        height: '24px',
        justifyContent: 'center',
        borderRadius: '50px',
        alignItems: 'center',
        position: 'absolute',
        right: '-6px',
        top: '-11px',   
        cursor: 'pointer',
        lineHeight: '1.3',
        
    },
    smallGrid: {
        margin: '13px 0px 13px 13px',
       // padding: '10px 10px 0px 10px',
        border: '1px solid #e8e8e8',
        
        "& table": {
            width: '100%',
        },
        "& table tr:nth-child(even)": {
            background:'#f9f9f9',
        },
        "& th": {
            paddingBottom: '10px',
            fontWeight: 700,
            textAlign: 'left',
            minWidth: '118px',
            padding: '10px',
            borderBottom: '1px solid #0049a3',
            color: '#3c4549',
        },
        "& input": {
            border: '1px solid #949494',
            borderRadius: '5px',
            padding: '0px 5px',
            textAlign: 'right',
            maxWidth: '100px',
        },
        "& table tbody tr td": {
            padding: '5px 10px',
            borderTop: '1px solid #e8e8e8',
        },
        "& img": {
            cursor: 'pointer',
        },
        "& table tbody tr td.nodata": {
            textAlign: 'center',
            padding:'10px 0 10px 0'

        },
    },
    addBtn: {
        background: 'transparent',
        color: '#3370b9',
        textTransform: 'capitalize',
        border: '1px solid #3370b9',
        fontWeight: 'bold',
        marginLeft: '10px',
    },
    varientGrid: {
        borderRadius: '5px',
        padding: '0px 10px',
        margin: '9px 0px 0px 13px',
        border: '1px solid #e8e8e8',
        "& h2": {
            marginTop: '7px'
        }
    },
    optionBar: {
     fontSize: '20px',
     "&::before": {
        content: 'testing',
        width: '40px',
        height: '30px'
     }
    },
    colorDot: {
        width: '14px',
        height: '14px',
        borderRadius: '50px',
        marginRight: '10px',
        border:'1px solid #b6adad',
        display: 'inline-block',
    },
    colorVarient: {
        background: 'aliceblue',
        padding: '5px 20px !important',
        borderRadius: '20px',
        position: 'relative',
        marginRight: '15px',
        "& span": {
            position: 'absolute',
            right: 0,
            background: '#2f74ca',
            width: '10px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '18px',
            width: '18px',
            borderRadius: '50%',
            color: 'white',
            top: '-3px',
            right: '-9px',
            cursor: 'pointer',
            "& svg": {
                padding: '5px',
            }
        }
    },
    colorBlock: {
        display: 'flex',
      
    }
}));