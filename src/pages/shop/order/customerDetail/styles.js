import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(theme => ({
    dialogContent: {
        flex: "1",
        // padding: "20px 10px 10px",
        backgroundColor: "#FFFFFF",
        minWidth: "1050px"
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
        cursor: 'pointer',
    },
    content: {
        flex: "1 1 auto",
        // maxHeight: "580px",
        minHeight: "200px",
        // overflow: "auto",
        marginBottom: "10px",
        padding: '0 20px',
        "& h2": {
            fontSize: '17px',
            margin: 0,
            marginTop: '10px',
        },
        "& hr": {
            opacity: 0.3,
        },
        '& .custom-grid': {
            '& img': {
                maxWidth: '43px',
                height: '43px',
                objectFit: 'contain'
            }
        }
    },
    container: {
        paddingRight: '25px',
       
    },
    footer: {
        flex: "0 1 40px",
        gap: '10px',
        padding: '0 20px'
    },
    footerRight: {
        float: "right",
        marginRight: "-8px",

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
        letterSpacing: '0.02em',
    },
    labelText: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#3C4549',
        padding: "19px 0px 5px"
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
    active: {
        color: '#10B921'
    },
    inActive: {
        color: 'red'
    },
    accountCardContainer: {
        display: 'flex',
        padding: '13px 13px',
        border: '1px solid #eaeaea',
        borderRadius: '15px',
        marginTop: '10px',
    },
    profileImg: {
        minWidth: '160px',
        minHeight: '150px',
        borderRadius: '5px',
        marginRight: '15px',
        "& img": {
            maxWidth: '130px',
            borderRadius: '100px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    accountList: {
        margin: 0,
        padding: 0,
        // height: '73px',
        listStyle: 'none',
        "& li": {
            display: 'flex',
            padding: '4px 6px',
            '@media (max-width: 780px)': {
                flexFlow: 'wrap',
                borderBottom: '1px solid #ededed',
            },
        },
    },
    accountLabel: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#757575',
        minWidth: '142px',
        '@media (max-width: 780px)': {
            minWidth: '150px',
        },
    },
    accountValue: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '13px',
        lineHeight: '20px',
        color: '#3C4549',
        backgroundColor: "#fff !important",
        textTransform: 'inherit',
    },
    accountSubCardSection: {
        display: "flex",
        gap: '10px',
        flexFlow: 'wrap',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 'auto 6px',
    },
    accountHomeSection: {
        border: '1px solid #DFDFDF',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '220px',
        minHeight: '130px',
        '@media (max-width: 1000px)': {
            width: '100%',
            marginTop: '9px',
        },
    },
    accountHomeTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '16px',
        display: 'flex',
        alignItems: 'center',
    },
      accountHomeSubTitle: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#000000',
        textTransform: 'capitalize',
    },
}));