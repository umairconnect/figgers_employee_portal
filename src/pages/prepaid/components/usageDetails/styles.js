import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "1010px"
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
        marginBottom: "10px",
        alignItems: 'baseline',
        backgroundColor: "#0049A3",
        justifyContent: 'space-between',
        cursor: 'move',
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '0 5px 0 15px',

    },
    container: {
        paddingRight: '15px'
    },
    footer: {
        flex: "0 1 40px",
        gap: '10px',
        padding: '0 20px'
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
    closeIcon: {
        cursor: 'pointer',
        color: 'white',
    },
    title: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#FFFFFF',
    },
    labelText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549',
        padding: "6px 0"
    },
    valueText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549',
        padding: "6px 0"
    },
    backBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        color: '#0049A3',
        borderRadius: '4px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        border: '1px solid #0049A3',
    },
    toggleSwitch: {
        justifyContent: 'center',
        "& .MuiToggleButton-root": {
            fontSize: '17px',
            padding: '2px 10px',
            textTransform: 'capitalize',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            color: '#0049A3',
            border: '1px solid #0049A3',
        },
        "& .MuiToggleButton-root.Mui-selected": {
            color: 'white',
            background: '#0049A3',

            padding: '2px 10px',
            fontWeight: 500,
            textTransform: 'capitalize',
            fontSize: '17px',
            fontFamily: 'Lato',
            fontStyle: 'normal',
        }
    },
    blueBar: {
        textAlign: 'center',
        width: '100%',
        background: 'rgba(158, 207, 239, 0.55)',
        margin: '10px',
        padding: '6px 0',
        color: '#0049A3',
        lineHeight: 'initial',
        "& p": {
            marginBottom: '4px',
            fontWeight: '400',
            fontSize: '16px',
        }
    },
    headingH5: {
        justifyContent: 'center',
        fontWeight: 400,
        fontSize: '19px',
        textAlign: 'center',
        lineHeight: '16px',
        letterSpacing: '0.01em',
        color: '#3C4549',
        "& h5": {
            fontWeight: '400',
            fontSize: '19px',
            textAlign: 'center',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#3C4549',
        }
    },
    skyBlueBar: {

      

        "& h4": {
            background: '#F0F0F0',
            fontSize: '20px',
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: '#0049A3',
            padding: '10px 0px',
            margin: 0,
            textAlign: 'center',
            justifyContent: 'center',
        }
    },
    skyBlueContent: {
       margin: '10px 0',
    },
    dBlock: {
        display: 'grid;',
        textAlign: 'center',
        margin: '5px 0',
        "& b": {
            fontSize: '18px',
            lineHeight: '20px',
            letterSpacing: '0.01em',
            color: '#3C4549',
            fontWeight: '500 !important',
        },
        "& span": {
            fontSize: '16px',
            color: '#3C4549',
        }
    },
    changeBtn: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 600,
        backgroundColor: '#0049A3',
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(58, 58, 68, 0.12)',
        '&:hover': {
            color: '#ffffff',
            background: '#00B4E5',
        }
    },
    contentBox: {
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(6, 134, 216, 0.5)',
        borderRadius: '15px',
        padding: '5px 10px',
        margin: '5px',
        "& h3": {
            fontSize: '24px',
            color: '#0049A3',
            margin: '10px 0px',
            textAlign: 'center',
            borderBottom: '1px solid #E3E3E3',
        }
    },
    contentBoxIco: {
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#D0EBFC',
        borderRadius: '100px',
        margin: 'auto',
        "& img": {
            width: '53px',
        }
    },
    paperCollapse: {
        width: "100%",
        // height: '350px',
        background: '#FFFFFF',
        boxShadow: 'inset 0px -1px 0px #E8E9E9',
        borderRadius: '8px',
        // transform: 'matrix(1, 0, 0, -1, 0, 0)',
    },
    paper: {
        // padding: '15px'
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
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #F1F1F1',
        backgroundColor: "#DFEEFF",
        padding: '0 10px'
    },
    cardHeaderTitle: {
        display: "flex",
        alignItems: "center"
    },
    cardTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '24px',
        color: '#3C4549',
        marginRight: '10px',
        padding: '9px 0px',
    },
    cardMember: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#3C4549',
        margin: '0 10px'
    },
    cardOrganisationName: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
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
}));