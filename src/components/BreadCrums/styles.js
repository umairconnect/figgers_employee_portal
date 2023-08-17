import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    customBreadcrumbs: {
        display: 'inline-block',

        "& svg": {
            margin: '0 0',
        },
        "& a": {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            color: '#3C4549',
        }
    },
    parantLink: {
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '17px',
        color: '#3C4549',
        fontFamily: 'Lato',
    },
    childLink: {
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '17px',
        color: '#3C4549',
        fontFamily: 'Lato',
    },
    changeBtn: {
        fontSize: '14px !important',
        lineHeight: '16px !important',
        fontWeight: 500,
        cursor: 'pointer !important',
        backgroundColor: '#0049A3 !important',
        borderRadius: '6px !important',
        marginRight: '5px !important',
        fontFamily: 'Lato',
        padding: '8px 16px !important',
        textTransform: 'capitalize !important',
        cursor: 'pointer !important',
        color: '#ffffff !important',
        float: 'right',
        marginLeft: 'auto !important',
        minWidth: '120px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12) !important',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        },
        "& .MuiSvgIcon-root": {
            fontSize: '15px',
        }
    },

}));