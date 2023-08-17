import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
  dashboardpaper: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(0, 73, 163, 0.3)',
    borderRadius: '15px',
    padding: '15px',
  },

  orderTrackingBox: {
    background: 'linear-gradient(180deg, #FFB13A 0%, #FFB13A 100%)',
    border: '1px solid transparent',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '5px 5px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '225px',
    cursor: 'pointer',
    "&:hover": {
      border: '1px solid #91641e',
    }
  },
  packageExpiringBox: {
    background: 'linear-gradient(180deg, #FF7784 0%, #FF7784 100%)',
    border: '1px solid transparent',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '5px 5px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '225px',
    cursor: 'pointer',
    "&:hover": {
      border: '1px solid #802f37',
    }
  },
  figgerACPReuqests: {
    background: 'linear-gradient(180deg, rgba(113, 126, 238, 0.72) 0%, rgba(113, 126, 238, 0.72) 100%)',
    border: '1px solid transparent',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '5px 5px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '225px',
    cursor: 'pointer',
    "&:hover": {
      border: '1px solid #3f4572',
    }
  },
  ConnectionRequests: {
    background: 'linear-gradient(180deg, #50D0BC 0%, #50D0BC 100%)',
    border: '1px solid transparent',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '5px 5px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '225px',
    cursor: 'pointer',
    "&:hover": {
      border: '1px solid #309283',
    }
  },

  topContent: {
    "& h3": {
      fontWeight: 500,
      fontSize: '30px',
      lineHeight: '36px',
      display: 'flex',
      padding: '10px',
      color: 'white',
    },
    "& img": {
      width: window.max1550 ? '77px' : '',
    }

  },
  communcationFilter: {
    marginLeft: '9px',
    "& select": {
      border: '1px solid #E3E3E3',
      padding: '6px',
      borderRadius: '5px',
      fontSize: '13px',
        color: '#676F80',
      minWidth : '75px',
      paddingRight: '0 !important',
    }
  },
  actionContent: {
    display: 'flex',
    gap: window.max1550 ? '12px' : window.max1750 ? '8px' : '23px',
    position: 'absolute',
    bottom: window.max1550 ? '5px' : '10px',
  },
  chartPaper: {
    borderRadius: '15px',
    background: '#FFFFFF',
    boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    minHeight: '440px',
  },
  widthFiftyBox: {
    width: '50%',
    padding: '15px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px rgb(0 73 163 / 30%)',
    borderRadius: '15px',
  },
  widthFifty: {
    width: '50%',
  },
  appBarSpacer: {
    minHeight: '82px',
    background: 'white',
  },
  header: {
    background: '#CEDDFF',
    borderBottom: '1px solid #4D80C9',
    display: 'flex',
    alignItems: 'center',
    height: '49px',
    padding: '0px 0px 0 15px',
    "& h1": {
      padding: '0px 0px 0 15px',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28.8px',
      color: '#2D4D95',
    }

  },
  headerSm: {

  },

  rightHeader: {
    marginLeft: 'auto',
    "& h2": {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '14px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#2D4D95',
    },
    "& .greyText": {
      color: '#838383',
      display: 'inline-block',
      margin: '0 15px',
    }
  },
  container: {
    padding: '15px',
    background: '#D9D9D9',
    height: '100%',
  },
  bottomActions: {
    alignItems: 'baseline',
    padding: '10px',
    "& h3": {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: window.max1550 ? '28px' : '36px',
      lineHeight: '43px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      margin: '5px 0px 0px 0px',
    },
    "& p": {
      margin: '0',
      color: 'black',
      fontSize: window.max1550 ? '12px' : window.max1750 ? '13px' : '14px',
      lineHeight: '20px',
      marginLeft: '4px',
      whiteSpace: 'nowrap',
    }
  },
  actionInfo: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    justifyContent: 'right',
    color: '#00B412 !important',
  },
  headerRightSide: {
    display: 'flex',
    alignItems: 'center',
    "& img": {
      width: "40px",
      height: '40px',
      borderRadius: '50%',
    },
    "& .userName": {

      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '20px',
      color: '#011627',
    },
    "& .usercontact": {
      textTransform: 'initial',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22px',
      color: '#707991',
    },
  },
  headerLeftSize: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionInforGrey: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    justifyContent: 'right',
    color: '#000000 !important',
    fontSize: '14px',
  },
  reviewBox: {
    "& hr": {
      background: '#D9D9D9',
      height: '1px',
      border: 'none',
    }
  },
  actionIcon: {
    "& img": {
      width: '27px',
      cursor: 'pointer',
      height: '27px',
      margin: '0px 13px',
    },
    "& button": {
      padding: 0,
    },
    "& .ant-dropdown-trigger": {
      width: '20px',
      height: '21px',
    },
    "& .MuiBadge-anchorOriginTopRightRectangle": {
      top: '4px',
      right: '15px',
    }

  },

  greyRactBox: {
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    marginBottom: '8px',
    marginTop: '10px',
    minHeight: '170px',
    cursor: 'pointer',
    border: '1px solid #FECCBE',
    "&:hover": {
      border: '1px solid #0049a3'
    },
    "&:hover > p": {
      color: '#0049a3',
    },
    "& h3": {
      fontSize: '36px',
      color: '#0049A3',
      margin: 0,
    },
    "& p": {
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#757575',
      margin: '6px 0 0 0',
    },
    "& p.Heighlited": {
      fontSize: '24px',
      lineHeight: '29px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#0049a3',
      margin: '20px 25px',
    },
    "& svg": {
      width: '45px',
      fill: '#0049a3',
      height: '45px',
    }
  },

  reviewList: {
    borderTop: '1px solid #D9D9D9',
    "& p": {
      fontSize: '17px',
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      margin: '10px 0px 0px auto',
      fontWeight: 500,
    },

    "& span": {
      fontSize: '13px',
      color: '#757575',
      lineHeight: 2,
    }
  },

  damageList: {
    borderTop: '1px solid #D9D9D9',
    cursor: 'pointer',
    "& p": {
      fontSize: '18px',
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      margin: '10px 0px 0px auto',
      fontWeight: 700,
    },

    "& span": {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '17px',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      margin: '8px 0',
    }
  },
  damageListBottom: {
    display: 'flex',
    alignItems: 'baseline',
    "& p": {
      fontSize: '12px',
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      color: '#4D80C9',
      margin: 0,
      fontWeight: 700,
    },
    "& span": {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '17px',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      margin: '8px 0',
      marginLeft: 'auto',
    }
  },

  communicationTop: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0px 11px 0px',
    "& img": {
      width: '31px',
      height: '31px',
      marginRight: '15px',
    },
    "& h3": {
      fontSize: '21px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#000000',
      fontWeight: 600,
      margin: '0',
    },
    "& h1": {
      fontWeight: 700,
      fontSize: '36px',
      lineHeight: '43px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#78D2FA',
      marginLeft: 'auto',
      margin: 0,
    }
  },

  communicationList: {
    borderTop: '1px solid #D9D9D9',
    display: 'flex',
    alignItems: 'end',
    "& p": {
      fontSize: '14px',
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      margin: '10px 0px 0px auto',
      fontWeight: 500,
    },

    "& span": {
      fontSize: '12px',
      color: '#000000',
      lineHeight: 2,
      fontWeight: 400,
      opacity: '0.5',
    }
  },
  FilterArea: {
    marginLeft: 'auto',
    "& select": {
      border: '1px solid #4D80C9',
      padding: '5px',
      borderRadius: '5px',
      fontSize: '14px',
      color: '#676F80',

    }
  },
  imgCounter: {
    marginLeft: 'auto',
  },
  counter: {
    fontWeight: 700,
    fontSize: '12px !important',
    marginLeft: 'auto',
    color: '#2D4D95 !important',
  },
  reviewHeading: {
    fontSize: window.max1550 ? '19px' : '24px',
    lineHeight: '29px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#41416E',
    fontWeight: '700',
    margin: 0,
  },
  marginTopTen: {
    marginTop: '10px',
  },
  recentActivityList: {
    marginTop: '0px',
  },
  ListContain: {
    borderTop: '1px solid #D9D9D9',
    paddingTop: '10px',
  },
  borderContent: {
    padding: window.max1550 ? '10px 5px 10px 15px' : '10px 5px 10px 30px',
    borderLeft: '1px solid #d5d5d5',
    color: 'rgba(0, 73, 163, 1)',
    maxWidth: '85%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: window.max1550 ? '14px' : window.max1750 ? '15px' : '18px',
    "& span": {
      fontSize: '12px',
      display: 'block',
      color: 'black',
    }
  },
  communicationBox: {
    minHeight: '348px',
    background: '#FFFFFF',
    border: '1px solid #0686D8',
    boxShadow: '0px 0px 4px rgba(0, 73, 163, 0.3)',
    borderRadius: '15px',
    margin: '5px',
    padding: '10px 20px',
    marginTop: '15px',
  },
  smallRadius: {
    width: '16px',
    border: '1px solid #d9d9d9',
    height: '16px',
    display: 'inline-block',
    position: 'relative;',
    left: '9px',
    borderRadius: '50px',
    background: '#10B921',
    top: '3px',

  },
  horizanBorder: {
    border: 'none',
    height: '1px',
    background: '#d9d9d9',
  },
  greyCurveBg: {
    width: '248px',
    height: '166px',
    position: 'absolute',
    transform: 'rotate(-44deg)',
    backgroundImage: 'linear-gradient(165deg, #FDFDFD, 20%, #DAD9D9)',
    right: window.max1550 ? '-130px' : '-93px',
    bottom: '-80px',
  },
  curveContent: {
    zIndex: 4,
    position: 'absolute',
    bottom: window.max1550 ? '7px' : '15px',
    right: '15px',
  },
  chartTop: {
    display: 'flex',
    alignItems: 'baseline',
    background: '#CEDDFF',
    borderRadius: '15px 15px 0px 0px',
    padding: '15px',
  },
  chartBottom: {
    padding: '0px 15px',
  },
  graphBottom: {
    padding: '20px 15px 0px 15px',
  },
  topLinks: {
    marginLeft: 'auto',
    fontWeight: '500',
    color: '#0049A3',
    fontSize: '14px',
    fontSize: window.max1550 ? '12px' : '14px',
    display: 'flex',
    alignItems: 'end',
    "& span": {
        margin: '0px 4px',
  
    }
  },
  dot1: {
    height: window.max1550 ? '12px' : '15px',
    width: window.max1550 ? '12px' : '15px',
    backgroundColor: '#0686D8',
    borderRadius: '50%',
    display: 'inline-block',
    margin: window.max1550 ? '0px 4px' : '0px 10px',
  },
  dot2: {
    height: window.max1550 ? '12px' : '15px',
    width: window.max1550 ? '12px' : '15px',
    backgroundColor: '#0049A3',
    borderRadius: '50%',
    display: 'inline-block',
    margin: window.max1550 ? '0px 4px' : '0px 10px',
  },
  packageUpdateDot: {
    height: window.max1550 ? '12px' : '15px',
    width: window.max1550 ? '12px' : '15px',
    backgroundColor: '#843C9F',
    borderRadius: '50%',
    display: 'inline-block',
    margin: window.max1550 ? '0px 4px' : '0px 10px',
  },
  servicesUsedDot: {
    height: window.max1550 ? '12px' : '15px',
    width: window.max1550 ? '12px' : '15px',
    backgroundColor: '#FE9800',
    borderRadius: '50%',
    display: 'inline-block',
    margin: window.max1550 ? '0px 4px' : '0px 10px',
  },

  customBreadcrumbs: {
    "& a": {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#5EA1BF',
    }
  },

}));