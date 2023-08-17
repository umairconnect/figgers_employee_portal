import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    menuList: {
        padding: '7px 0 7px 5px',
        "& a": {
          marginTop: '1px',
          padding: '12px 10px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        },
        "& :hover": {
          background: 'white',
          color: 'black',
          textDecoration: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          borderTopLeftRadius: '18px',
          borderBottomLeftRadius: '18px',
          "& img": {
            filter: 'invert(1)',
          }
        }
      },
      menuListActive: {
        background: 'white',
        color: 'black !important',
        textDecoration: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        borderTopLeftRadius: '18px',
        borderBottomLeftRadius: '18px',
        "& img": {
          filter: 'invert(1)',
        }
      },

       MenuLabel: {
      margin: '0px 0px 0px 16px',
    },

  
}));