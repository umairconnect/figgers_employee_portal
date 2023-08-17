
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    activeDialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "450px"
    },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "430"
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
        cursor: 'pointer',
        justifyContent: 'space-between',
        '& p': {
            textTransform: "initial"
        }
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '10px 20px'
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
    appBarSpacer: {
        minHeight: '64px',
        background: 'white',
    },

    container: {
        padding: '10px',
        paddingBottom: window.isIpadView ? '100px': '10px',
    },
    settingContainer: {
        padding: window.isMobileView ? '10px 10px' : '10px 20px',
        "& h3": {
            width: '100%',
            borderBottom: '1px solid #d6d6d6',
            padding: '10px 0px',
            fontSize: '18px',
        },
        "& p": {
            fontSize: '16px',
        }
    },
    greyBorderBox: {
        border: '1px solid #e3e3e3',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: '5px',
        flexFlow: 'column',
        minHeight: '270px',
        borderRadius: '19px',
        "& h3": {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '39px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#3C4549',
            margin: '18px 0px',
        },
        "& img": {
            marginTop: '20px'
        }
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
    table: {
        padding: '0px 20px',
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
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#FFFFFF',
        letterSpacing: '0.02em',
    },

    root: {
        width: 65,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(38px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `0px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#c3c3c3',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},

    settingOptions: {
        borderBottom: '1px solid #e8e8e8',
        padding: '12px 0px 5px 0px',
        marginLeft: '2%',
        marginRight: '2%',
    },
    remindMe: {
        minWidth: '60px',
        maxWidth: '250px',
        margin: '0px 15px',
    },

    footer: {
        flex: "0 1 40px",
        width: '100%',
        marginLeft: 'auto',
        paddingTop: '10px',
    },
    footerRight: {
        float: "right",

        display: 'flex',

    },


}))