import {
    makeStyles
  } from "@material-ui/styles";
  
  export default makeStyles(theme => ({
selectBaseInput: {
    border: "1px solid #DDDDDD",
    borderRadius: "4px",
    width: "100%",
    fontFamily: "Lato",
    backgroundColor: "white",
    marginBottom: 4,
    "& .MuiInputBase-input": {
      padding: "0px 24px 0px 12px",
      minHeight: "35.63px",
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
    "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
    },
    "& input[type=number]": {
      appearance: "textfield"
    },
  },

  SearchField: {
    width: '50px',
    background: 'white',
    border: '1px solid #4D80C9',
    borderRadius: '5px',
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'linear',
},
SearchFieldOpen: {
    width: '100%',
    background: 'white',
    border: '1px solid #4D80C9',
    borderRadius: '5px',
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'linear',
},

customerSearch: {
  display: 'flex',
  alignItems: 'center',

  justifyContent: 'right',
  "& .MuiFormControl-root": {
      marginBottom: '0px',
      marginRight: '5px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
  },
  '& svg': {
      cursor: 'pointer',
  },
  "& .MuiInputBase-input::-webkit-input-placeholder": {
      fontSize: '14px',
  }
},
selectBaseInput: {
  width: '100%',
  display: 'flex',
  boxSizing: 'border-box',
  margin: '5px 0px 5px',
  backgroundColor: 'white',
  minHeight: '35.63px',
  padding: '0px 8px 0px 12px',
  height: '35.63px',
  opacity: '0.7',
  border: '0.5px solid #777D80',
  borderRadius: '4px',

  "& .MuiList-root option": {
      background: '#eeeeee',
      cursor: 'pointer',
      padding: '5px',
  },
  "& ul": {
      cursor: 'pointer',
  },
  "& .MuiInputBase-input": {

      fontSize: "14px",
      color: "#4A4A4A",
      '&:focus': {
          background: 'transparent',
          borderRadius: "4px",
          outline: 0,
      },
      "&:before": {
          borderBottom: 'none !important',
      },
  },
  "& .MuiInput-underline:before": {
      borderBottom: 'none'
  },

  "& .Mui-disabled": {
      backgroundColor: "#f3f3f3",
      color: "#4A4A4A"
  },
  "& input::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0
  },
  "& input::-webkit-inner-spin-button": {
      appearance: "none",
      margin: 0
  },
  "& input[type=number]": {
      appearance: "textfield"
  },
},
}));