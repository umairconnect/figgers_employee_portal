import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        padding: "18px 10px 10px 20px",
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        padding: "10px 16px",
        backgroundColor: '#0049A3',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#FFFFFF',
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
    },
    container: {
        paddingRight: '25px'
    },
    footer: {
        flex: "0 1 40px",
        gap: '10px'
    },
    footerRight: {
        float: "right",
        marginRight: "-8px",

    },
    crossButton: {
        color: '#fff'
        // position: "relative",
        // top: "-12px",
        // right: "10px",
        // cursor: "pointer",
        // padding: "3px",
        // zIndex: "2",
        // display: "block",
        // "& :hover": {
        //     backgroundColor: "#F4F4F4",
        // }
    },
    baseInput: {
        // border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        // backgroundColor: "white",
        marginBottom: 4,
        "& .MuiInputBase-input": {
            padding: "0px 12px",
            minHeight: "35.63px",
            fontSize: "14px",
            color: "#4A4A4A",
            '&:focus': {
                // border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },
        "& .MuiOutlinedInput-adornedEnd": {
            paddingRight: '0px',
        },
        "& .MuiInputBase-root": {
            '&:hover': {
                // border: "1px solid #00b2e3",
                borderRadius: "4px",
                outline: 0,
            },
        },
        "& .MuiFormLabel-root": {
            fontSize: '16px',
            background: 'white',
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
            position: 'relative',
            top: '13px',
            background: 'transparent',
            width: 'fit-content',
        },
        "& .MuiFormLabel-root.Mui-focused": {
            background: 'white !important',
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            background: 'white !important',
        },
        "& .MuiInputLabel-shrink": {
            background: 'white !important',
        },
        "& .MuiInputBase-input:focus": {
            border: 'none',
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
        "& .MuiFormHelperText-root.Mui-error": {
            display: "none",
            "&:after": {
                border: 'none'
            }
        },
        "& .MuiInput-underline:before": {
            border: 'none'
        },
        "& .MuiInput-underline.Mui-error:after": {
            transform: 'none',
            border: "none",
        }
    },
}))