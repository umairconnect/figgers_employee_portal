import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "1130px",
    },
    box: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        // padding: "18px 10px 10px 20px",
        padding: '0px 0px 15px 0px'
    },
    header: {
        flex: "0 1 auto",
        display: "flex",
        padding: '15px 10px',
        alignItems: 'baseline',
        backgroundColor: "#0049A3",
        justifyContent: 'space-between',
        color: 'white',
        cursor: 'pointer',
        '& p': {
            textTransform: "initial"
        }
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px"
    },
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
    },
    container: {
        paddingRight: '25px'
    },
    footer: {
        flex: "0 1 40px",
        gap: '10px',
        padding: '10px 10%'
    },
    footerRight: {
        float: "right",
        marginRight: "-8px",
        display: 'flex',
        gap: '10px'
    },
    crossButton: {
        position: "relative",
        top: "-12px",
        right: "10px",
        cursor: "pointer",
        padding: "3px",
        zIndex: "2",
        display: "block",
        "& :hover": {
            backgroundColor: "#F4F4F4",
        }
    },
    stepList: {
        margin: 0,
        padding: 0,
        height: 'auto',
        listStyle: 'none',
        display: 'flex',
        justifyContent: "center",
        flexDirection: "row",
        marginTop: '25px',
        "& li": {
            display: 'flex',
            position: 'relative',
            height: '90px',
            marginRight: "-42px",
            // marginBottom: '5px',
            // width: '100%',
            // alignItems: 'center',
            // justifyContent: 'center',
            // padding: '10px',
            // backgroundColor: '#ffffff',
            // margin: '0px 8px',
            // borderRadius: '10px',
            // border: '5px solid #EBEBEB',
            // "& .MuiTypography-root": {
            //     color: '#3B497C',
            //     fontSize: "14px",
            //     fontWeight: 700,
            //     fontFamily: "Lato",
            //     position: 'absolute',
            //     top: '50%',
            //     left: '65%',
            //     transform: 'translate(-50%, -50%)',
            // }
            // clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
        },
        "& .Active": {
            // border: '5px solid  #3B497C'
            // boxShadow: '0px 0px 10px rgb(6 134 216 / 50%)',
            // background: '#EFF6FF',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
            // padding: '20px',
        },
        "& .arrowIcon": {
            marginRight: "-5px",
            clipPath: "",
        },
        "& .stepIcon": {
            zIndex: 1
        },
        step: {
            display: 'flex',
            position: 'relative',
            height: '90px',
            "& .MuiTypography-root": {
                color: '#3B497C',
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "Lato",
                position: 'absolute',
                top: '50%',
                left: '58%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
            }
        },
    },
    leftArrowImage: {
        clipPath: 'inset(0px 0px 0px 21px)',
    },
    step: {
        display: 'flex',
        position: 'relative',
        height: '90px',
        color: "#fff",
        "& .MuiTypography-root": {
            color: '#3B497C',
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "Lato",
            position: 'absolute',
            top: '50%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
        }
    },
    completedStep: {
        display: 'flex',
        position: 'relative',
        height: '90px',
        "& .MuiTypography-root": {
            color: '#fff',
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "Lato",
            position: 'absolute',
            top: '50%',
            left: '65%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
        }
    },
    searchLabel: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '29px',
        // display: 'flex',
        // alignItems: 'center',
        // textAlign: 'ce   nter',
        color: '#757575',
    },
    searchSubLabel: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '22px',
        // display: 'flex',
        // alignItems: 'center',
        textAlign: 'center',
        color: '#757575',
        margin: "15px 0"
    },
    baseInput: {
        // border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        // backgroundColor: "white",
        marginBottom: 20,
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
    customNextBtn: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: "#ffffff",
        background: '#0049A3',
        border: '1px solid #0686D8',
        borderRadius: '10px',
        textTransform: 'none',
        minWidth: '110px',
        margin: '10px',
        "& :hover": {
            color: '#000'
        }
    },
    mapImage: {
        width: '100%',
        height: '400px',
        marginTop: '15px'
    },
    speedoMeter: {
        // width: '250px',
        height: '230px !important',
        "& svg": {
            height: '230px !important'
        }
    },
    rightsText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        color: '#2D4D95',
        padding: "10px 0"
    },
    progressBar: {
        height: '40px',
        color: '#fff',
        display: "flex",
        width: '100%',
        position: 'relative',
        marginTop: '40px',
    },
    percentageArrowPosition: {
        position: 'absolute',
        top: '-70px',
        left: 0,
        "& span": {
            color: '#004990',
            fontWeight: 'bold',
            top: '5px',
            fontSize: '16px',
            position: 'relative',
        }
    },
    percentageArrow: {

        width: 0,
        height: 0,
        borderTop: '25px solid transparent',
        borderBottom: '25px solid transparent',
        borderRight: '25px solid #004990',
        transform: 'rotate(-90deg)',
    },
    child1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        backgroundColor: '#000',
        borderRadius: '10px 0px 0px 10px',
    },
    child2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        backgroundColor: '#AE1205'
    },
    child3: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        backgroundColor: '#EFC622'
    },
    child4: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        backgroundColor: '#648E00'
    },
    child5: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        backgroundColor: '#0F468F',
        borderRadius: '0px 10px 10px 0px',
    },
    containerSection: {
        padding: '10px 10%',
    }
}));