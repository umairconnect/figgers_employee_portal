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
        marginLeft: '13px',
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
        border: '1px solid #0049A3',
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
    multiSteps: {
        "& .MuiStepConnector-line": {
            borderColor: '#4D80C9',
            position: 'relative',
            top: '-14px',
            borderTopWidth: '4px',
        },
        "& .MuiStepLabel-root": {
            display: 'flex',
            flexFlow: 'column',
            textAlign: 'center',
            justifyContent: 'center',
        },
        "& .MuiStepLabel-label": {
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '8px',
        },
        "& .MuiStepLabel-iconContainer": {
            border: '5px solid #DDDDDD',
            borderRadius: '50%',
            padding: '25px',
        },
        "& .MuiStep-completed": {
            "& .MuiStepLabel-iconContainer": {
                border: '5px solid transparent',
                background: '#9BC9FF',
                borderRadius: '50%',
                padding: '25px',
            }
        }
    },

    heading: {
        fontWeight: 700,
        fontSize: '20px',
        margin: '0px',
        color: '#3C4549',
    },
    formHeading: {
        fontWeight: 700,
        fontSize: '17px',
        margin: '0px',
        color: '#3C4549',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '15px',
        paddingBottom: '10px',
    },
    container: {
        padding: '15px 40px',
        background: 'white',
    },
    note: {
        minHeight: '240px !important',
        padding: '7px 10px',
        maxHeight: '240px !important',
        overflow: 'auto',
    },
    footerArea: {
        margin: '20px 0px',
    }
}));