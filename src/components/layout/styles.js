import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 233;
const drawerWidthbar = 235;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: window.isMobileView ? `calc(100% - 47px )` : `calc(100% - 74px)`,
    background: 'white',
    color: 'black',
    boxShadow: '1px 1px 1px #80808017',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidthbar}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    background: '#0049A3',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: '47px !important',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    padding: '0px 15px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  rightContent: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    padding: '10px 20px',
    cursor: 'pointer',
  },
  logoSm: {
    padding: '10px 10px',
    cursor: 'pointer',
  },

  hasSubmenu: {
    borderTopLeftRadius: '18px',
    borderBottomLeftRadius: '18px',
    "& span": {
      color: 'white',
    },
    "& hover": {
      color: '#0049A3 !important',
      cursor: 'pointer',
      background: 'white',
      fontWeight: 500,
      textDecoration: 'none',
      borderTopLeftRadius: '18px',
      borderBottomLeftRadius: '18px',
    },
  },
  popperSub: {
    padding: '1px 0',
    "& a": {
      marginLeft: '0',
      width: '100% !important',
      padding: '10px 15px !important',
      borderTop: '1px solid #ececec',
      borderBottom: '1px solid #ececec',
      color: '#0049A3 !important',
      fontWeight: 500,
      borderRadius: '13px !important',
      display: 'flex',
      background: 'transparent !important',
      "& img": {
        filter: 'unset !important',
      },


    },
    "& .active": {
      color: '#0049A3 !important',
      background: '#DDEAF9 !important',
    },
    "& :hover": {
      color: '#0049A3 !important',
      background: '#DDEAF9 !important',
    }
  },
  communicationCount: {
    "& .MuiBadge-root": {
      position: 'relative',
      right: '8px',
    },
    "& .MuiBadge-badge": {
      background: 'red',
      color: 'white !important',
      borderRadius: '50px !important',
    }
  },
  nested: {
    "& a": {
      marginLeft: '20px',
      width: '85% !important',
      padding: '8px 0px 8px 10px !important',
      marginBottom: '2px',
      borderTop: '1px solid #ececec',
      borderBottom: '1px solid #ececec',
      color: '#0049A3 !important',
      fontWeight: 500,
      borderRadius: '13px !important',
      background: 'transparent !important',
      "& img": {
        filter: 'unset !important',
      },


    },
    "& .active": {
      color: '#0049A3 !important',
      background: '#DDEAF9 !important',
    },
    "& :hover": {
      color: '#0049A3 !important',
      background: '#DDEAF9 !important',
    }
  },
  openHasSubmenu: {
    background: '#F6F6F6',
    borderTopLeftRadius: '18px',
    borderBottomLeftRadius: '18px',
    "& img": {
      filter: 'brightness(0)',
    },
    "& .active img": {
      filter: 'unset !important',
    },
    "& hover": {
      background: '#F6F6F6',
      "& img": {
        filter: 'invert(1)',
        background: 'unset',
        borderTopLeftRadius: 'unset',
        borderBottomLeftRadius: 'unset',
      }
    },
    "& span": {
      color: '#0049A3 !important',
    }
  },

  subMenuHead: {
    display: 'flex',
    padding: '12px 10px',
    "& span": {
      fontWeight: 500,
    }
  },

  menuList: {
    padding: '7px 0 7px 5px',
    "& li": {
      padding: '0px 0px 0px 0px !important',
      display: 'block',
    },
    "& img": {
      width: '28px',
    },
    "& svg": {
      width: '28px',
    },
    "& a": {
      width: '100%',
      marginTop: '0px',
      padding: '12px 10px',
      display: 'flex',
      alignItems: 'center',
      color: 'white',
    },
    "& :hover": {
      background: 'white',
      color: '#0049A3 !important',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      borderTopLeftRadius: '18px',
      borderBottomLeftRadius: '18px',
      "& img": {
        filter: 'invert(1)',
        background: 'unset',
        borderTopLeftRadius: 'unset',
        borderBottomLeftRadius: 'unset',
      }
    },
    "& .active": {
      background: 'white',
      color: '#0049A3 !important',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      borderTopLeftRadius: '18px',
      borderBottomLeftRadius: '18px',
      "& img": {
        filter: 'invert(1)',
      },

    }
  },
  menuListActive: {

  },
 profileNavigationIco: {
    maxWidth: '20px',
    padding: '2px',
 },

  profileDropper: {
    margin: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    "& h4": {
      margin: 0,
      padding: '10px',
      color: '#0049A3',
      fontSize: '15px',
      lineHeight: '16px',
      fontFamily: 'Lato',
      textTransform: 'capitalize',
      '@media (max-width: 550px)': {
        display: 'none',
      },
    },
    "& :hover": {
      backgroundColor: 'none !important',
    },
    "& svg": {
      color: '#0049A3',
    }

  },


  MenuLabel: {
    margin: '0px 0px 0px 16px',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    "& svg": {
      marginLeft: 'auto',
    }
  },



}));