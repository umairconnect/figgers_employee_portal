import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    // dialogContent: {
    //     flex: "1",
    //     padding: "20px 10px 10px",
    //     backgroundColor: "#FFFFFF",
    //     // padding: "20px 10px 5px 10px",
    //     // minWidth: "750px",
    //     // width: '80%',
    //     // height: '80%'
    // },
    // box: {
    //     display: "flex",
    //     flexFlow: "column",
    //     height: "100%",
    //     padding: "18px 10px 10px 20px",
    // },
    // header: {
    //     // flex: "0 1 auto",
    //     // display: "flex",
    //     // justifyContent: 'space-between',
    //     flex: "0 1 auto",
    //     display: "flex",
    //     padding: '15px 10px',
    //     marginBottom: "10px",
    //     alignItems: 'baseline',
    //     backgroundColor: "#0049A3",
    //     justifyContent: 'space-between'
    // },
    // content: {
    //     flex: "1 1 auto",
    //     // maxHeight: "580px",
    //     minHeight: "200px",
    //     // overflow: "auto",
    //     marginBottom: "10px"
    // },
    // container: {
    //     paddingRight: '25px'
    // },
    // footer: {
    //     flex: "0 1 40px",
    //     gap: '10px'
    // },
    // footerRight: {
    //     float: "right",
    //     marginRight: "-8px",

    // },
    // crossButton: {
    //     position: "relative",
    //     top: "-12px",
    //     right: "10px",
    //     cursor: "pointer",
    //     padding: "3px",
    //     zIndex: "2",
    //     display: "block",
    //     "& :hover": {
    //         backgroundColor: "#F4F4F4",
    //     }
    // },
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        // minWidth: "1010px"
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
        justifyContent: 'space-between'
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
    label: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '11px',
        lineHeight: '12px',
        color: '#777D80',
    },
}));