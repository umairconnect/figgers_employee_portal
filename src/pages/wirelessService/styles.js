import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    // dashboardpaper: {
    //     background: '#FFFFFF',
    //     boxShadow: '0px 0px 2px rgb(0 73 163 / 30%)',
    //     borderRadius: '15px',
    //     padding: '15px',
    // },
    // widthFiftyBox: {

    //     width: '50%',
    //     padding: '15px',
    //     background: '#FFFFFF',
    //     boxShadow: '0px 0px 2px rgb(0 73 163 / 30%)',
    //     borderRadius: '15px',
    // },
    // widthFifty: {
    //     width: '50%',
    // },
    // appBarSpacer: theme.mixins.toolbar,
    // header: {
    //     background: '#ECF2FF',
    //     display: 'flex',
    //     alignItems: 'center',
    //     "& h1": {
    //         padding: '0px 15px',
    //         fontSize: '22px',
    //         fontWeight: 600,
    //         lineHeight: '28.8px',
    //         color: '#2D4D95',
    //     }

    // },

    // rightHeader: {
    //     marginLeft: 'auto',
    //     "& h2": {
    //         fontFamily: 'Lato',
    //         fontStyle: 'normal',
    //         fontWeight: '700',
    //         fontSize: '15px',
    //         lineHeight: '14px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         textAlign: 'center',
    //         color: '#2D4D95',
    //     },
    //     "& .greyText": {
    //         color: '#838383',
    //         display: 'inline-block',
    //         margin: '0 15px',
    //     }
    // },
    // container: {
    //     padding: '15px',
    // },
    // bottomActions: {
    //     alignItems: 'baseline',
    //     "& h3": {
    //         fontFamily: 'Lato',
    //         fontStyle: 'normal',
    //         fontWeight: '700',
    //         fontSize: '31px',
    //         lineHeight: '43px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         textAlign: 'center',
    //         color: '#2D4D95',
    //         margin: '5px 0px 0px 0px',
    //     },
    //     "& p": {
    //         margin: '0',
    //         color: '#757575',
    //         fontSize: '14px',
    //         lineHeight: '20px',
    //         marginLeft: '4px',
    //     }
    // },
    // actionInfo: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     textAlign: 'right',
    //     justifyContent: 'right',
    //     color: '#00B412 !important',
    // },
    // actionInforGrey: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     textAlign: 'right',
    //     justifyContent: 'right',
    //     color: '#000000 !important',
    //     opacity: '0.5',
    //     fontSize: '14px',
    // },
    // reviewBox: {
    //     "& hr": {
    //         background: '#D9D9D9',
    //         height: '1px',
    //         border: 'none',
    //     }
    // },
    // reviewList: {
    //     borderTop: '1px solid #D9D9D9',
    //     marginTop: '5px',
    //     "& p": {
    //         fontSize: '17px',
    //         lineHeight: '22px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         color: '#757575',
    //         margin: '10px 0px 0px auto',
    //         fontWeight: 500,
    //     },
    //     "& span": {
    //         fontSize: '13px',
    //         color: '#757575',
    //         lineHeight: 2,
    //     }
    // },
    // counter: {
    //     fontWeight: 700,
    //     fontSize: '16px !important',
    //     marginLeft: 'auto',
    //     color: '#2D4D95 !important',
    // },
    // reviewHeading: {
    //     fontWeight: 600,
    //     fontSize: '21px',
    //     color: '#757575',
    //     padding: '6px 0px 0px 0px',
    //     margin: 0,
    // },
    // marginTopTen: {
    //     marginTop: '10px',
    // },
    // recentActivityList: {
    //     marginTop: '5px',
    // },
    // borderContent: {
    //     padding: '10px 5px 10px 30px',
    //     borderLeft: '1px solid #d5d5d5',
    //     "& span": {
    //         fontSize: '13px',
    //         display: 'block',
    //     }
    // },
    // smallRadius: {
    //     width: '16px',
    //     border: '1px solid #d9d9d9',
    //     height: '16px',
    //     display: 'inline-block',
    //     position: 'relative;',
    //     left: '9px',
    //     borderRadius: '50px',
    //     background: 'white',
    //     top: '3px',

    // }
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
      },
    header: {
        background: '#ECF2FF',
        display: 'flex',
        alignItems: 'center',
        padding: "0 15px",
        height: '58px',
        "& h1": {
            padding: '0px 15px',
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '28.8px',
            color: '#2D4D95',
        }
    },
    rightHeader: {
        height: "58px",
        gap: "20px",
        display: "flex",
        alignItems: "center",
        marginLeft: 'auto',
    },
    container: {
        padding: '15px',
    },
    checkBoxFormLabel: {
        width: '100%'
    },
    label: {
        transform: 'translate(10px, 10px)',
    },
    checkBoxBtn: {
        marginLeft: "0px",
        paddingRight: "5px",
        "& + .MuiFormControlLabel-label": {
            color: "#52575C",
            fontSize: "14px"
        },
        "& .MuiSvgIcon-root": {
            opacity:0,
            display: 'none',
        }
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
    customerListsm: {
        margin: 0,
        padding: 0,
        height: 'auto',
        listStyle: 'none',
        display: 'flex',
        flexFlow: 'wrap',
        marginLeft: '5px',
        "& li": {
            display: 'flex',
            marginBottom: '5px',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#ffffff',
            margin: '0px 8px',
            borderRadius: '10px',
        },
        "& .Active": {
            boxShadow: '0px 0px 10px rgb(6 134 216 / 50%)',
            background: '#EFF6FF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        }
    },
    statusBoxContainer: {
        display: 'flex',
        marginBottom: '10px',
        "& .Active": {
            background: '#DCFCE7',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#10B921',
            },
        },
        "& .Mui-checked + span > .Active": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #10B921',
        },

        "& .Inactive": {
            background: '#EEEEEE',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#9B9B9B',
            },
        },
        "& .Mui-checked + span > .Inactive": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #9B9B9B',
        },

        "& .Suspended": {
            background: '#E2F1FF',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#0686D8',
            },
        },
        "& .Mui-checked + span > .Suspended": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #0686D8',
        },

        "& .Disconnected": {
            background: '#FCDCDC',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#FF0000',
            },
        },
        "& .Mui-checked + span > .Disconnected": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #FF0000',
        },

        "& .Hotline": {
            background: '#FBEEBC',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#FE9800',
            },
        },
        "& .Mui-checked + span > .Hotline": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #FE9800',
        },

        "& .Hotline": {
            background: '#FBEEBC',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#FE9800',
            },
        },
        "& .Mui-checked + span > .Hotline": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #FE9800',
        },

        "& .Rejected": {
            background: '#FFEDED',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#F56C6C',
            },
        },
        "& .Mui-checked + span > .Rejected": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #F56C6C',
        },

        "& .Port-In-Cancel": {
            background: '#843c9f30',
            border: '1px solid transparent',
            "& h5, h2": {
                color: '#843C9F',
            },
        },
        "& .Mui-checked + span > .Port-In-Cancel": {
            boxShadow: '0px 0px 5px 3px #00000021',
            border: '1px solid #843C9F',
        },
       

        "& .MuiCheckbox-colorPrimary": {
            position: 'absolute',
        }
    },
    
    statusBoxContent: {
        "& h2": {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '36px',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            color: '#10B921',
        },
        "& h5": {
            fontFamily: 'Lato',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            color: '#10B921',
        }
    },
    customerList: {
        margin: 0,
        padding: 0,
        height: '73px',
        listStyle: 'none',
        display: 'flex',
        marginLeft: '5px',
        "& li": {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#ffffff',
            margin: '0px 8px',
            borderRadius: '10px',
        },
        "& .Active": {
            boxShadow: '0px 0px 10px rgb(6 134 216 / 50%)',
            background: '#EFF6FF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        }
    },
    customerInfo: {
        marginLeft: '10px',
    },
    customerName: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#848789',
    },
    customerNumber: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549'
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
    accountPaperCollapse: {
        width: "100%",
        // height: '350px',
        background: '#FFFFFF',
        boxShadow: 'inset 0px -1px 0px #E8E9E9',
        borderRadius: '8px',
        // transform: 'matrix(1, 0, 0, -1, 0, 0)',
    },
    accountPaper: {
        padding: '15px'
    },
    cardHeaderRight: {
        display: 'flex',
        alignItems: 'end',
    },
    cardSearch: {
        border: '1px solid grey',
        margin: '8px 3px',
        borderRadius: '5px',
        padding: '4px',
        width: '33px',
        height: '33px',
    },
    accountCardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #F1F1F1'
    },
    accountCardHeaderTitle: {
        display: "flex",
        alignItems: "center"
    },
    accountCardTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '24px',
        color: '#3C4549',
        marginRight: '10px',
        padding: '9px 0px',
    },
    accountCardMember: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#3C4549',
        margin: '0 10px'
    },
    accountCardOrganisationName: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'capitalize',
        color: '#848789',
    },
    closeButton: {
        width: "25px",
        minWidth: "25px",
        height: "25px",
        borderRadius: "5px",
        margin: 0,
        color: "#11284B",
        backgroundColor: "#F9F9F9",
        boxSizing: "border-box",
        fontSize: 15,
        fontFamily: "Lato",
        textTransform: "none",
        padding: "0 12px",
        marginLeft: 19,
        border: "1px solid #2D4D95",
        '&:hover': {
            backgroundColor: "#2D4D95",
            color: "white",
        },
        newAddBtnLink: {
            color: "white",
        },
        "& .MuiButton-startIcon": {
            marginRight: 0,
            "& .MuiSvgIcon-root": {
                width: 22,
                height: 22
            }
        }
    },
    flexBtn: {
        display: 'flex',
        alignItems: 'center',
    },
    accountCardContainer: {
        padding: '10px 0',
        display: 'flex',
        alignItems: 'flex-start',
    },
    accountSection: {

    },
    accountSubCardSection: {
        display: "flex",
        gap: '10px',
        flexFlow: 'wrap',
        justifyContent: 'center',
    },
    accountList: {
        margin: 0,
        padding: 0,
        // height: '73px',
        listStyle: 'none',
        "& li": {
            display: 'flex',
            padding: '4px 6px'
        },
    },
    accountLabel: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#757575',
        minWidth: '170px'
    },
    accountHomeSection: {
        border: '1px solid #DFDFDF',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: 'fit-content',
    },
    accountValue: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#3C4549',
        backgroundColor: "#fff !important",
        textTransform: 'inherit',
    },
    accountHomeTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '16px',
        color: '#000000',
    },
    accountHomeSubTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#000000',
         textTransform: 'capitalize',
    },
    accountHomeAddress: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#868686',
    },
    accountBillingSection: {
        border: '1px solid #DFDFDF',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '130px',
        gap: '8px',
        height: 'fit-content',
    },
    tabsSection: {
        background: '#FFFFFF',
        width: '100%',
        margin: '12px 0',
        display: 'flex',
        alignItems: "center",
        borderRadius: '8px 8px 0px 0px',
        paddingTop: '10px',
    },
    customerTabs: {
        "& button": {
            color: '#3C4549',
            opacity: 1,
            padding: '12px',
            borderRadius: '10px',
            margin: '5px 0px 5px 15px',
            opacity: 1,
            minHeight: 'auto',
            minWidth: 'auto',
            background: 'white',
            fontSize: '16px',
            fontFamily: 'Lato',
            textTransform: 'capitalize',
        },
        "& .activeBtn": {
            boxShadow: '0px 0px 10px rgb(6 134 216 / 50%)',
            background: '#EFF6FF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#0049A3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            height: '2px',
            backgroundColor: "#0049A3",
            color: "#11284B",
            display: 'none',
        },
        "& .MuiTab-root": {
            minWidth: "80px",
            minHeight: "32px"
        }
    },
    Htabs: {
        "& button": {
            textTransform: "capitalize",
            color: "#3C4549",
            fontFamily: "Lato",
            // width: "80px",
            // maxWidth: "50px",
            fontSize: "16px",
            opacity: "1",
            height: "36px"
        },
        "& button.Mui-selected": {
            fontWeight: 700,
            color: "#0049A3",
            borderRadius: " 0px 10px 0px 0px",
        },
        "& button.Mui-selected:first-child": {
            borderRadius: "10px 0px 0px 0px",
        },
        "& .MuiTabs-indicator": {
            height: '2px',
            backgroundColor: "#0049A3",
            color: "#11284B",
        },
        "& .MuiTab-root": {
            minWidth: "80px",
            minHeight: "32px"
        }
    },
    tabRoot: {
        maxWidth: "100%",
        // top: '35px',
        position: 'relative',
        // borderBottom: '1px solid #A3A3A3',
        // marginBottom: '15px',
        minHeight: '36px'
    },
    tabPan: {
        width: "100%"
    },
    tabContainer: {
        display: 'flex',
        flexDirection: "column"
    },
    customFormControl: {
        width: '100%'
    },
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
    recentHeading: {
        fontSize: '17px',
        padding: window.isMobileView && window.isIpadView ? `5px 6px 0px`: '10px 16px', 
        lineHeight: '20px',
        display: 'flex',
        margin: window.isMobileView? `0`: ``,
        alignItems: 'center',
        letterSpacing: '0.01em',
        textTransform: 'capitalize',
        color: '#384A6A',
        fontWeight: '700',
    }
}));