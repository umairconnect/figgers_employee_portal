import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    card: {
        // height: "150px",
        // border: '2px solid #0049A3',
        // filter: 'dropShadow(0px 0px 10px #4D80C9)',
        // borderRadius: '10px',
        height: '152px',
        width: '286px',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        border: '1px solid #D9D9D9',
        padding: '10px 0',
        "& img": {
            marginBottom: '5px',
            borderRadius: '25px'
        }
    },
    activeCard: {
        border: '1px solid #4D80C9',
    },
    cardTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#0049A3',
    }
}));
