import React from "react";

import {
    Grid, FormLabel, FormHelperText,
    CircularProgress, Typography, Link as Hyperlink, Paper, Button
} from '@material-ui/core';

import "./styles.css";

import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import ReplayIcon from '@material-ui/icons/Replay';
import AddIcon from "./../../assets/img/buttonIcons/add.svg";
import Draggable from 'react-draggable';
import useStyles from "./styles";

const { Text } = Typography;
function LinkS({ onClick, href, children, target, className, ...props }) {
    var classes = useStyles();


    return (
        <>
            <Hyperlink className={classes.hyperlink} href={href} target={target} onClick={onClick} {...props}>
                {children}
            </Hyperlink>
        </>
    );
}

function DraggableComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function Label({ size, title, mandatory, ...props }) {
    var classes = useStyles();
    return (
        <Grid sm={size} md={size} lg={size} xl={size}>
            <Typography className="custom-label">
                {title}

                {mandatory ?
                    <span className={classes.mandatorColor}>*</span>
                    : ""
                }:

            </Typography>
        </Grid>
    )
}
function CustomBtn({ id, btnType, htmlType, onClick, size, loading, shape, children, className, isDisabled, ...props }) {
    var classes = useStyles();
    return (
        <>
            {id == "save" ?
                <Button type={btnType} htmlType={htmlType} shape={shape} size={size} loading={loading} id={id} className={className ? "" + className + " custom-button" : "custom-button"} disabled={isDisabled} onClick={onClick} {...props}>
                    {children}   </Button>
                : id == "saveLoading" ?
                    <Button type={btnType} htmlType={htmlType} shape={shape} size={size} loading={loading} id={id} className={className ? "" + className + " custom-button" : "custom-button"} disabled={isDisabled} onClick={onClick} {...props}>
                        <CircularProgress className={classes.circularProgressBar} size={20} /> {children}   </Button>
                    : id === "back" ?
                        < Button type={btnType} htmlType={htmlType} shape={shape} size={size} loading={loading} id={id} className={className ? "" + className + " custom-btn back-btn" : "custom-btn back-btn"} disabled={isDisabled} onClick={onClick} {...props}>{children}</Button >
                        : id === "addButtonBorder" ?
                            < Button type={btnType} htmlType={htmlType} shape={shape} size={size} loading={loading} id={id} className={className ? "" + className + " custom-btn back-btn" : "custom-btn back-btn"} disabled={isDisabled} startIcon={<img src={AddIcon} />} onClick={onClick} {...props}>{children} </Button >

                            : id === "next" ?
                                < Button type={btnType} htmlType={htmlType} shape={shape} size={size} loading={loading} id={id} className="custom-btn next-btn" disabled={isDisabled} onClick={onClick} {...props}>{children}</Button >
                                : ''
            }
        </>
    )
}
function FormBtn({ id, btnType, onClick, size, children, disabled, ...props }) {
    var classes = useStyles();

    return (
        <>
            {id == "save" ?
                <Button id={id}
                    className={classes.saveBtn}
                    disabled={disabled}
                    onClick={onClick}
                    size={size}
                    startIcon={btnType === "back" ? <ArrowBackIosIcon /> : btnType === "search" ? <SearchIcon /> : btnType === "next" ? null : btnType === "logs" ? <DescriptionIcon /> : btnType === undefined ? <SaveIcon /> : null}
                    endIcon={btnType === "next" ? <ArrowForwardIosIcon /> : null}
                    {...props}>
                    {children}</Button>
                : ''
            }
            {id == "resetBtn" ?
                <Button
                    id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>{children}</Button>
                : ''
            }

            {id == "reset" ?
                <Button
                    id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size} {...props}>{children}</Button>
                : ''
            }
            {id == "close" ?
                <Button id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>{children}</Button>
                : ''
            }
            {id == "lightBlue" ?
                <Button id={id} className={classes.lightBlueBtn} disabled={disabled} onClick={onClick} size={size} {...props}>{children}</Button>
                : ''
            }
            {id == "update" ?
                <Button id={id} className={classes.updateBtn} disabled={disabled} onClick={onClick} size={size}

                    {...props}>{children}</Button>
                : ''
            }


            {id == "senderx" ?
                <Button id={id} className={classes.erxBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>{children}</Button>
                : ''
            }

            {id == "loadSenderx" ?
                <Button id={id} className={classes.erxBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }

            {id == "print" ?
                <Button id={id} className={classes.printBtn} disabled={disabled} onClick={onClick} size={size}

                    {...props}>{children}</Button> : ''}

            {id == "loadingPrint" ?
                <Button id={id} className={classes.printBtn} disabled={disabled} onClick={onClick} size={size}
                    {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button> : ''}

            {id == "noIcon" ?
                <Button id={id}
                    className={classes.saveBtn}
                    disabled={disabled}
                    onClick={onClick}
                    size={size}
                    {...props}>
                    {children}</Button>
                : ''
            }
            {id == "loadingSave" ?
                <Button id={id} className={classes.saveBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
            {id == "loadingDelete" ?
                <Button id={id} className={classes.deleteBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
        </>
    )
}


export { Label, CustomBtn, FormBtn, LinkS, DraggableComponent };