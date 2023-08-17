import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
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
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
    },
    container: {
        padding: '6px 15px',
    },

}));