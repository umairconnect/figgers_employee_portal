import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    appBarSpacer: {
        minHeight: '82px',
        background: 'white',
    },
    header: {
        background: '#CEDDFF',
        borderBottom: '1px solid #4D80C9',
        display: 'flex',
        alignItems: 'center',
        height: '49px',
        padding: '0px 0px 0 15px',
        "& h1": {
            padding: '0px 0px 0 15px',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '28.8px',
            color: '#2D4D95',
        }

    },
    smButton: {
        padding: '6px 16px !important',
        minWidth: 'fit-content !important',
    },
    rightHeader: {
        marginLeft: 'auto',
        marginRight: '10px',
        "& h2": {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '14px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#2D4D95',
        },
        "& .greyText": {
            color: '#838383',
            display: 'inline-block',
            margin: '0 15px',
        }
    },
    container: {
        width: "100%",
        display: 'flex',
        background:'#f6f6f6',

    },
    leftContainer: {
        marginTop: '15px',
        width: '25%',
        height: '100%',
        background: '#FFFFFF',
        borderRight: '1px solid #D9DCE0',
        transitionProperty: 'width',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'linear',
    },
    leftContainerToggle: {
        width: '57px',
        background: '#FFFFFF',
        borderRight: '1px solid #D9DCE0',
        transitionProperty: 'width',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'linear',

        "& .MuiInput-root": {
            display: 'none !important'
        }
    },
    leftHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        "& svg": {
            cursor: 'pointer',
            marginLeft: 0,
            marginRight: '10px',
            color: '#707991',
        },
        "& .MuiInputBase-root": {
            width: '100%',
            display: 'flex',
            // border: 'none',
            boxSizing: 'border-box',
            margin: '5px 0px 5px',
            minHeight: 35.63,
            padding: '0px 8px 0px 12px',
            height: 35.63,
            borderRadius: 22,
            background: '#F5F5F5',
            border: 0,
        },
        "& .MuiInput-underline::before": {
            border: 'none'
        },
        "& .MuiInput-underline::after": {
            border: 'none'
        },
        "& .MuiInputAdornment-positionStart": {
            marginRight: 0,
        },
    },
    userListContainer: {
        paddingRight: '10px',
    },
    userList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        "& .active": {
            backgroundColor: "#F5F5F5"
        },
        "& li": {
            display: 'flex',
            alignItems: 'center',
            padding: "8px 12px",
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: "#F5F5F5"
            },
            "& img": {
                width: "40px",
                height: '40px',
                borderRadius: '50%',
            },
            "& .MuiBadge-anchorOriginTopRightRectangle": {
                transform: 'none'
            },
            "& .MuiBadge-badge": {
                color: '#fff',
                position: 'relative',
                backgroundColor: '#0686D8'
            },
            "& div": {
                width: "100%",
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
            },
            "& span": {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            "& .userName": {
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '14px',
                color: '#011627',
            },
            "& .messageTime": {
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#707991',
            },
            "& .messageText": {
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#707991',
                whiteSpace: 'nowrap',
                width: '265px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        }
    },
    rightContainer: {
        width: '100%',
        background: '#F6F6F6',
        height: '100%'
    },
    userPanel: {
        background: 'white',
        marginTop: '15px',
        borderRadius: '15px',
        width: '25%',
        marginRight: '15px',
        right: 0,

    }
}));