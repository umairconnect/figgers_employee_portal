import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    subContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        "& img": {
            width: "250px",
            height: '165px',
            margin: '12px 0'
        },
        "& a": {
            fontSize: '18px !important',
            margin: '0 !important'
        }
    },
    divider: {
        width: '90%',
        margin: '12px 0'
    },
    text: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '16px',
        color: '#3C4549',
        padding: '12px 0'
    },
    noteText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '16px',
        color: '#3C4549',
        padding: '24px 0'
    }
}))
