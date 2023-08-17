import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    noRecord: {
        marginBottom: '5px',
        marginTop: '5px',
        textAlign: 'center',
        fontSize: '16px',
        "& img": {
          textAlign: 'center !important',
          justifyContent: 'center !important',
          display: 'flex !important',
          margin: '10px auto !important',
        }
      },
      noRecordText: {
         margin: '20px',
         color: 'rgba(0, 0, 0, 0.25)',
      }


}));