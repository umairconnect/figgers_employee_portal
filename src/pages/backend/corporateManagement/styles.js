import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
    },
    header: {
        background: '#ECF2FF',
        display: 'flex',
        alignItems: 'center',
        padding: "0 15px",
        height: '58px',
        "& h1": {
            padding: '0px 15px',
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '28.8px',
            color: '#2D4D95',
        }
    },
    rightHeader: {
        height: "58px",
        gap: "20px",
        display: "flex",
        alignItems: "center",
        marginLeft: 'auto',
    },
    container: {
        padding: '6px 15px',
    },

    pageHeading: {
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#3C4549',
    },
    accountStatus: {
        background: '#D9F4DC',
        textAlign: 'center',
        padding: '5px 11px',
        width: 'fit-content',
        borderRadius: '7px',
        color: '#3FC64C',
    },
    changeBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
        cursor: 'pointer',
        backgroundColor: '#0049A3',
        borderRadius: '6px',
        marginRight: '5px',
        marginBottom: '5px',
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

}));