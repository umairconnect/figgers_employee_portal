import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
    },
    newSimContainer: {
        margin: "5px 15px 15px 15px",
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
    smButton: {
        padding: '6px 16px !important',
        minWidth: 'fit-content !important',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#384A6A',
        padding: '6px 0 6px 4px'
    },
    cardContainer: {
        gap: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginLeft: '15px',
        justifyContent: 'space-around',
        "& .MuiFormControlLabel-root": {
            width: '25%',
            "& .MuiTypography-root": {
                width: '100%'
            }
        },
        "& .MuiButtonBase-root": {
            display: 'none'
        },
        "& .Mui-checked + .MuiTypography-root": {
            "& .card": {
                // border: '1px solid #FF0000',
                boxShadow: '0px 0px 5px 3px #00000021',
                backgroundColor: "#fff",
                "& h5,h3": {
                    color: '#000'
                },
            }
        },
        "& .card": {
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'flex-end',
            // width: '25%',
            // minWidth: '300px',
            height: '170px',
            justifyContent: 'space-between',
            padding: '25px 10px 10px 10px',
            "& img": {
                width: '100px',
                height: '80px'
            }
        },
        "& .pendingCard": {
            background: 'rgba(254, 152, 0, 0.1)',
            border: '1px solid #FE9800',
            "& span": {
                display: 'flex',
                flexDirection: 'column',
                "& h5": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '30px',
                    lineHeight: '36px',
                    color: '#FE9800',
                    paddingBottom: '20px'
                },
                "& h3": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '60px',
                    lineHeight: '72px',
                    color: '#FE9800',
                },
            },
        },
        "& .shippedCard": {
            background: 'rgba(132, 60, 159, 0.1)',
            border: '1px solid #843C9F',
            "& span": {
                display: 'flex',
                flexDirection: 'column',
                "& h5": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '30px',
                    lineHeight: '36px',
                    color: '#843C9F',
                    paddingBottom: '20px'
                },
                "& h3": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '60px',
                    lineHeight: '72px',
                    color: '#843C9F',
                },
            },
        },
        "& .activatedCard": {
            background: 'rgba(16, 185, 33, 0.1)',
            border: '1px solid #10B921',
            "& span": {
                display: 'flex',
                flexDirection: 'column',
                "& h5": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '30px',
                    lineHeight: '36px',
                    color: '#10B921',
                    paddingBottom: '20px'
                },
                "& h3": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '60px',
                    lineHeight: '72px',
                    color: '#10B921',
                },
            },
        },
        "& .refundedCard": {
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid #FF0000',
            "& span": {
                display: 'flex',
                flexDirection: 'column',
                "& h5": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '30px',
                    lineHeight: '36px',
                    color: '#FF0000',
                    paddingBottom: '20px'
                },
                "& h3": {
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '60px',
                    lineHeight: '72px',
                    color: '#FF0000',
                },
            },
        },
    },
    // card: {
    //     borderRadius: '10px',
    //     display: 'flex',
    //     alignItems: 'flex-end',
    //     width: '25%',
    //     height: '170px',
    //     justifyContent: 'space-between',
    //     padding: '25px 10px 10px 10px',
    //     "& img": {
    //         width: '100px',
    //         height: '80px'
    //     }
    // },
    // pendingCard: {
    //     background: 'rgba(254, 152, 0, 0.1)',
    //     border: '1px solid #FE9800',
    //     "& span": {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         "& h5": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 500,
    //             fontSize: '30px',
    //             lineHeight: '36px',
    //             color: '#FE9800',
    //             paddingBottom: '20px'
    //         },
    //         "& h3": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 700,
    //             fontSize: '60px',
    //             lineHeight: '72px',
    //             color: '#FE9800',
    //         },
    //     },
    // },
    // smhippedCard: {
    //     background: 'rgba(132, 60, 159, 0.1)',
    //     border: '1px solid #843C9F',
    //     "& span": {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         "& h5": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 500,
    //             fontSize: '30px',
    //             lineHeight: '36px',
    //             color: '#843C9F',
    //             paddingBottom: '20px'
    //         },
    //         "& h3": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 700,
    //             fontSize: '60px',
    //             lineHeight: '72px',
    //             color: '#843C9F',
    //         },
    //     },
    // },
    // activatedCard: {
    //     background: 'rgba(16, 185, 33, 0.1)',
    //     border: '1px solid #10B921',
    //     "& span": {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         "& h5": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 500,
    //             fontSize: '30px',
    //             lineHeight: '36px',
    //             color: '#10B921',
    //             paddingBottom: '20px'
    //         },
    //         "& h3": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 700,
    //             fontSize: '60px',
    //             lineHeight: '72px',
    //             color: '#10B921',
    //         },
    //     },
    // },
    // refundedCard: {
    //     background: 'rgba(255, 0, 0, 0.1)',
    //     border: '1px solid #FF0000',
    //     "& span": {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         "& h5": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 500,
    //             fontSize: '30px',
    //             lineHeight: '36px',
    //             color: '#FF0000',
    //             paddingBottom: '20px'
    //         },
    //         "& h3": {
    //             fontFamily: 'Lato',
    //             fontStyle: 'normal',
    //             fontWeight: 700,
    //             fontSize: '60px',
    //             lineHeight: '72px',
    //             color: '#FF0000',
    //         },
    //     },
    // },
    gridSection: {
        margin: '25px 0',
        padding: '15px',
        background: '#FFFFFF',
        boxShadow: 'inset 0px -1px 0px #E8E9E9',
        borderRadius: '8px',
    },
    baseInput: {
        // border: "1px solid #DDDDDD",
        borderRadius: "4px",
        width: "100%",
        fontFamily: "Lato",
        // backgroundColor: "white",
        marginBottom: 4,
        "&::before": {
            width: '50px',
            "& label": {
                display: 'none'
            },
        },
        "&::after": {
            width: '100%',
            "& label": {
                display: 'inherit'
            },
        },
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
}));