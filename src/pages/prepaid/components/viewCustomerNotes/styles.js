import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "750px"
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
        alignItems: 'baseline',
        padding: '15px 10px',
        backgroundColor: "#0049A3",
        justifyContent: 'space-between',
        cursor: 'move',
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '0 20px'
    },
    greyborder: {
        borderTop: '1px solid #e5e5e5',
        alignItems: 'baseline',
    },
    paddingLeftSix: {
        padding: '0px 10px',
    },
    viewNotesDate: {
        background: '#F0F0F0',
        borderRadius: '4px',
        padding: '5px 0px 5px 11px',
        alignItems: 'center', 
        marginTop: '6px',
        "& p": {
            margin: 0,
            fontSize: '16px',
        }
    },
    greyBar: {
        background: '#F0F0F0',
        borderRadius: '4px',
        padding: '5px',
    },
    smallHeading: {
        color: '#3C4549',
        fontSize: '16px',
        fontWeight: 700,
        margin: 0,
    },
    dateAction: {
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '0.01em',
        textTransform: 'capitalize',
        color: '#3C4549',
        textAlign: 'right',
    },
    adminText: {
        margin: '5px 0px !important',
        color: '#3C4549',
        fontSize: '16px',
    },
    container: {
        paddingRight: '25px'
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
    changeBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        backgroundColor: '#0049A3',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
}));