import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    fixloader: {
        width: '100%',
        height: '100%',
        zIndex: 44444444444444,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'fixed',
        background: '#0049a326',
        "& img": {
            position: 'relative',
            right: '8%',
        }
    },
    fixloaderWhite: {
        width: '100%',
        height: '100%',
        zIndex: 44444444444444,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'fixed',
        background: 'white',
        marginLeft: '-15px',
        "& img": {
            position: 'relative',
            right: '8%',
        }
    },
    dialogloader: {
        position: 'absolute',
        width: '100%',
        background: '#0049a326',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        height: '100%',
        left: '0',
    }


}));