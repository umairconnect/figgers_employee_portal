import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    noteSection: {
        borderRadius: '8px',
        padding: '14px',
        backgroundColor: '#e8f4fb',
        "& .MuiTypography-root": {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '16px',
            color: '#0049A3',
        }
    }
}))
