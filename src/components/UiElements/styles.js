import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  formTitle: {
    position: 'relative',
    width: "100%",
    color: "#25282B",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  baseLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 1,
    borderBottom: "1px solid #DDDDDD",
    zIndex: 1
  },
  baseTitle: {
    display: "inline-block",
    position: "relative",
    padding: "0 12px 0 0",
    backgroundColor: "white",
    zIndex: 2,

  },

  baseTitleGreyBg: {
    display: "inline-block",
    position: "relative",
    padding: "0 12px 0 0",
    backgroundColor: "#fafbfc",
    zIndex: 2,

  },

  resetBtn: {

    color: '#0049A3',
    padding: '6px 16px',
    minWidth: '90px',
    fontFamily: 'Lato',
    borderColor: '#0049A3',
    marginRight: '8px',
    textTransform: 'uppercase',
    border: '1px solid',
    fontWeight: 600,
    backgroundColor: '#dddddd00',

    "& img": {
      width: "16px",
      height: "16px"
    },
    '&:hover': {
      backgroundColor:  '#0049A3 !important',
      borderColor: '#0686D8 !important',
      color: 'white !important',
    },
    "&:disabled": {
      backgroundColor: '#DDDDDD',
      borderColor: '#F3F3F3',
      color: '#11284b',
    }
  },
  lightBlueBtn: {
    textTransform: 'none',
    backgroundColor: '#00B4E5',
    borderColor: '#00B4E5',
    color: '#ffffff',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px",
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#DDDDDD',
      borderColor: '#F3F3F3',
      color: '#11284b',
    }
  },
  updateBtn: {
    textTransform: 'none',
    backgroundColor: '#11284b',
    borderColor: '#11284b',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#11284b',
      borderColor: '#11284b',
      color: 'white',
    }
  },
  saveBtn: {
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
    backgroundColor: '#0049A3 !important',
    textTransform: 'none',
    borderColor: '#0686D8 !important',
    color: 'white !important',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px !important",
    fontFamily: "Lato !important",
    height: 'auto !important',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor:  '#085dc7 !important',
      borderColor: '#0686D8 !important',
      color: 'white !important',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    // '& .MuiButton-startIcon svg': {
    //   marginLeft: "-10px",
    // }

  },
  circularProgressBar: {
    marginLeft: 0,
    marginRight: '5px',
    color: "#FFFFFF"
  },
  mandatorColor: {
    display: "contents",
    color: "#ff0000",
    fontSize: 16,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: "10px"
  },
  downloadBtn: {
    backgroundColor: '#11284b !important',
    textTransform: 'none',
    borderColor: '#11284b !important',
    color: 'white !important',
    marginRight: 8,
    minWidth: 90,
    padding: "6px 16px !important",
    fontFamily: "Lato !important",
    height: 'auto !important',
    borderRadius: '5px',

    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    // '& .MuiButton-startIcon svg': {
    //   marginLeft: "-10px",
    // }

  },
  deleteBtn: {
    textTransform: 'none',
    backgroundColor: '#dd3232',
    borderColor: '#dd3232',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    '& .MuiButton-startIcon img': {
      width: 20,
      marginBottom: "-2px",
      marginLeft: "8px",
    }

  },

  printBtn: {
    textTransform: 'none',
    backgroundColor: '#11284B',
    borderColor: '#11284B',
    color: 'white',
    marginRight: 8,
    minWidth: 90,
    fontFamily: "Lato",
    '&:hover': {
      backgroundColor: '#596270',
      borderColor: '#11284B',
      color: 'white',
    },
    "&:disabled": {
      backgroundColor: '#596270',
      borderColor: '#11284b',
      color: 'white',
    },
    '& .MuiButton-startIcon img': {
      width: 18,
      marginBottom: "-2px",
      marginLeft: "8px",
      filter: "brightness(9)",
    }

  },

  errorMessageTextArea: {
    color: "red",
    margin: '0px 0',
    "& span": {
      whiteSpace: "nowrap"
    }
  }
  ,
  errorMessage: {
    color: "red",
    margin: '0px 0',
    "& span": {
      whiteSpace: "nowrap"
    }
  },

}));