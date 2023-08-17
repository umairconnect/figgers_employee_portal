import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
  searchPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    },
    truncate: {
        maxWidth: '130px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: 0,
        "& p": {
          maxWidth: '130px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
    },
  searchPanelBox: {
    position: "relative",
    borderRadius: 5,
    height: 40,
    paddingLeft: theme.spacing(3.5),
    marginBottom: 10,
    width: 320,
    // backgroundColor: "#E8E8E8",
    border: "1px solid #DDDDDD",
    "&:hover": {
      cursor: "pointer",
      // backgroundColor: "#E8E8E8",
    },
  },
  commonAction: {
    "& img": {
      cursor: 'pointer',
    }
  },
  linkContainer: {
    display: 'flex',
    columnGap: '3px'
  },
  actionLinkDetails: {
    border: '2px solid #409EFF',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    "& img": {
      width: '14px',
    },
    "&:hover ": {
      border: '1px solid transparent',
      background: '#409EFF',
      "& img": {
        filter: 'brightness(9)',
      }
    }
  },
  DropdownItems: {
    "& span": {
      color: '#3C4549',
      display: 'inline-block',
    },
    "& img": {
        padding: '11px 8px 11px 0px',
        width: '27px',
    }
  },
  actionLinkUsage: {
    border: '2px solid #67C23A',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    "& img": {
      width: '14px',
    },
    "&:hover ": {
      border: '1px solid transparent',
      background: '#67C23A',
      "& img": {
        filter: 'brightness(9)',
      }
    }
  },
  actionLinkMonthlyUs: {
    border: '2px solid #909399',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    "& img": {
      width: '18px',
    },
    "&:hover ": {
      border: '1px solid transparent',
      background: '#909399',
      "& img": {
        filter: 'brightness(9)',
      }
    }
  },

  statuses: {
    "& span": {
      textAlign: 'center',
    }
  },

  activeStatus: {
    color: '#10B921',
    background: '#DCFCE7',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  inActiveStatus: {
    color: '#9B9B9B',
    background: '#EEEEEE',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  SuspendedStatus: {
    color: '#0686D8',
    background: '#E2F1FF',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  disconnectStatus: {
    color: '#FF0000',
    background: '#FCDCDC',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  hotlineStatus: {
    color: '#FE9800',
    background: '#FBEEBC',
    padding: '5px 10px',
    borderRadius: '10px',
  },

  actionLinkMonthlySettings: {
    border: '2px solid #E6A23C',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    "& img": {
      width: '18px',
    },
    "&:hover ": {
      border: '1px solid transparent',
      background: '#E6A23C',
      "& img": {
        filter: 'brightness(9)',
      }
    }
  },
  searchIcn: {
    width: 36,
    left: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  inputRoot: {
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    // marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "10.5px 12px",
      fontSize: "14px",
      color: "#4A4A4A",
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
    border: "none",
    color: "#000000",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  inputInput: {
    // height: 39,
    padding: 0,
    paddingLeft: 10,
    width: "100%"
    // fontSize: "12px"
  },
  SearchInput: {
    height: 39,
    fontSize: "12px"
  },
  SearchInputRoot: {
    color: "#000000",
    width: "100%",
  },
  margin: {
    margin: "5px 9px 0 9px",
    width: 300,
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      fontSize: 12
    },
  },
  footerButton: {
    paddingTop: 16,
    margin: "16px 9px 16px 9px",
    width: 300,
    alignItems: 'center',
    textAlign: 'center',
  },
  sClose: {
    color: "#000000",
    backgroundColor: "#A9A9A9",
    border: "1px solid #DDDDDD",
    width: 63,
    height: 30,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: "#808080",
      color: "white"
    },
  },
  sApply: {
    // backgroundColor: "#00b4e5",
    backgroundColor: "#1E90FF",
    color: "#000000",
    width: 63,
    height: 30,
    fontSize: 12,
    fontFamily: "Lato",
    '&:hover': {
      // color:"#484848",
      // backgroundColor: "#4682B4",
      color: "white",
      backgroundColor: "#11284B",
    },
  },
  PopoverRoot: {
    // boxShadow:"1px 1px 1px 1px" ,
    // pointerEvents: "none !important",
  },
  Popoverpaper: {
    border: "1px solid #DDDDDD",
    backgroundColor: "white",
    width: 320,
    marginTop: 42,
    marginLeft: 0,
  },
  searchSelect: {

  },
  input: {
    color: "black",
    fontSize: 12,
    border: "1px solid #DDDDDD",
    backgroundColor: "white",
    borderRadius: "4px",
    height: "42px",
    '&:hover': {
      backgroundColor: 'white',
    },
    '&$focused': {
      backgroundColor: "white",
    }
  },
  textLabel: {
    color: "#52575C",
    fontSize: 12,
    '& label.Mui-focused': {
      color: 'green',
    },
  },
  chippaper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: "9px 4px 0 4px",
  },
  lableInput: {
    margin: "0px 0px 5px 3px"
  },
  lableSelectField: {
    margin: "0px 0px -15px 3px",
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft: 3,
  },
  InputField: {
    width: '270px'
  },
  lableInput: {
    lineHeight: "20px",
    paddingRight: 15,
    fontFamily: "Lato",
    color: "#25282B",
    fontSize: 14,
    marginLeft: 3,
  },
  InputDateTime: {
    margin: "5px 5px 0 8px",
    width: 145,
    border: "1px solid #DDDDDD",
    background: "#FFFFFF",
    borderRadius: "3px"
  },
  baseDateInput: {
    border: "1px solid #DDDDDD",
    padding: "5px 5px",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "5px 5px",
      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
        border: "1px solid #00b2e3",
        borderRadius: "4px",
        outline: 0,
      },
    },

    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  startEncounterBtn: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    color: "#00B4E5",
    background: "#FFFFFF",
    border: "1px solid #00B4E5",
    boxSizing: "border-box",
    borderRadius: "8px",
    textDecoration: "none",
    padding: '0px',
    textTransform: "none",
    "& a": {
      textDecoration: "none !important",
      color: "#00B4E5 !important",
      padding: '5px 15px',
      lineHeight: '20px',
    }
  },
  startEncounterBtnDisable: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    color: "#00B4E5",
    background: "#FFFFFF",
    border: "1px solid #00B4E5",
    boxSizing: "border-box",
    borderRadius: "8px",
    textDecoration: "none",
    padding: '0px',
    textTransform: "none",
    padding: '5px 15px',
    lineHeight: '20px',
  },
  appointmentTime: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    textAlign: "left",
    textTransform: "uppercase"
  },
  custmBaseInput: {
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    background: "#FCFCFC",
    border: "1px solid #E1E1E1",
    boxSizing: "border-box",
    borderRadius: "4px",
    "& img": {
      width: "18px",
      height: "18px",
      float: "left",
      marginRight: "10px"

    },
    "& .MuiInputBase-input": {
      padding: "4.5px 12px",
      fontSize: "14px",
      color: "#0049A3",
      fontWeight: 700,
      '&:focus': {
        border: "1px solid #00b2e3",
        outline: 0,
      },
    },
    "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
    },
  },
  linkName: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#00b4e5",
  },
  nameInfoLabel: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#52575C",
  },
  activeLine: {
    height: "100%",
    display: 'block',
    position: "absolute",
    borderLeft: "4px solid #60b53e",
    width: 4,
    top: 0,
    left: 0,

  },
  deletedLine: {
    height: "100%",
    display: 'block',
    position: "absolute",
    borderLeft: "4px solid #ff2b2b",
    width: 4,
    top: 0,
    left: 0,
  },
  singIcon: {
    width: "22px",
    "& svg": {
      width: "18px",
      height: "18px"
    }
  },
  unSignedEncounterIcon: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    "& img": {
      width: "16px",
      height: "16px",
    }
  },
  actionBtn: {
    height: '35px',
    fontSize: '14px',
    color: '#0049A3',
    border: "1px solid #0049A3",
  },
  actionDropDown: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#0049A3',
    padding: '7px 8px 5px 16px',
    textTransform: 'capitalize',
    height: '32px',
  },
  customerInformation: {
    display: 'flex',
    flexDirection: 'column',
    "& span": {
      display: 'flex',
      "& h5": {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#3C4549',
        minWidth: "100px",
        marginBottom: "15px"
      },
      "& p": {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#3C4549',
        margin: 0
      }
    }
  },
  orderInformation: {
    display: 'flex',
    flexDirection: 'column',
    "& span": {
      display: 'flex',
      "& h5": {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#3C4549',
        minWidth: "120px",
        marginBottom: "15px"
      },
      "& p": {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#3C4549',
        margin: 0
      }
    }
  },
  requestActionBtn: {
    width: '110px',
    height: '33px',
    background: '#0049A3',
    borderRadius: '10px',
    textTransform: 'none',
    color: "#ffffff",
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    "&:hover": {
      backgroundColor: "#5c799c"
    }
  },
  requestStatusTag: {
    backgroundColor: '#ffeed6',
    borderRadius: '25px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FE9800',
    padding: '6px 12px',
  }
}));
