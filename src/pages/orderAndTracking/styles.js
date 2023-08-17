import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    customBreadcrumbs: {
        "& a": {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            color: '#5EA1BF',
        }
    },
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
      },

}));