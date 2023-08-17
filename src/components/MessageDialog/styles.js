import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({

    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "550px"
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: window.isIpadView ? '' : "550px",
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
        justifyContent: 'space-between'
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '30px 20px 15px 20px',
        "& p": {
            fontSize: '16px',
            textAlign: 'center',
            fontWeight: 500,
            padding: '15px 20px 5px 20px !important',
          
        },
        "& h3": {
            color: '#FF0000',
            fontSize: '24px',
            textAlign: 'center',
            fontFamily: 'Lato',
            fontWeight: 400,
        },
        "& img": {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px auto',
            width: '70px',
        }
    },

    footer: {
        flex: "0 1 40px",
        gap: '10px',
        padding: '0 20px'
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
    footerButtons: {
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
        display: 'flex',
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

    deleteBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        backgroundColor: '#f50057',
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

    changeBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        minWidth: '120px',
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
    rechargeBtn: {
        color: 'white',
        bottom: '-13px',
        padding: '5px 15px',
        position: 'absolute',
        textTransform: 'capitalize',
        background: '#0049A3',
        fontSize: '15px',
        borderRadius: '5px',
        "& hover": {
            backgroundColor: '#116cdd !important',
        }
    },
   
}));