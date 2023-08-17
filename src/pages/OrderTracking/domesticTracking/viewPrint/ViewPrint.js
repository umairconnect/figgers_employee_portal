import React, { useState, useEffect } from 'react'

import { Button, Dialog, Grid, Icon, Typography, Select, Switch } from '@material-ui/core'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles";
import { Label, DraggableComponent } from '../../../../components/UiElements/UiElements';
import { SelectField, InputBaseField, TextareaField } from '../../../../components/InputField/InputField';
import SearchGrid from '../../../../components/table/SearchGrid';
import viewPrint from '../../../../assets/img/common/viewPrint.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//import html2pdf from 'html2pdf.js';
import { GetUserInfo } from '../../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../../Services/APIService';

function ViewPrint({ dialogOpenClose, handleClose, trackNumberDetails, ...props }) {
    const classes = useStyles();
    const [state, setState] = useState({});
    const shippingDetails =[
        {
            SrNo: "123231",
            Product: "Figgers Sim card",
            Quantity: "1",
            Memo: "Shopify Custom Order 9007",
        }
    ]

    const handlePrintLabel = () => {
        const imageElement = document.getElementById('labelImgElement');
        const imgSrc = imageElement.src;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`<html>
                                        <head>
                                          <title>"${trackNumberDetails.trackingNumber}"</title>
                                        </head>
                                        <body>
                                          <img src="${imgSrc}" style="max-width: 100%;" onload="window.print();" />
                                        </body>
                                    </html>
        `);
        printWindow.document.close();

        //html2canvas(imageElement).then((canvas) => {
        //    const imgData = canvas.toDataURL('image/png',1.0);
        //    const pdf = new jsPDF();
        //    pdf.addImage(imgData, 'PNG', 10, 10);
        //    //pdf.autoPrint();
        //    pdf.save(trackNumberDetails.trackingNumber+"_download.pdf");
        //
        //    //const blob = pdf.output('blob');
        //    //const url = URL.createObjectURL(blob);
        //    //
        //    //const iframe = document.createElement('iframe');
        //    //iframe.src = url;
        //    //document.body.appendChild(iframe);
        //});

        //html2canvas(imageElement).then((canvas) => {
        //    const imgData = canvas.toDataURL('image/jpeg');
        //
        //    const pdf = new jsPDF();
        //    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        //
        //    pdf.autoPrint();
        //    window.open(pdf.output('bloburl'), '_blank');
        //});
    }


    useEffect(() => {
        if (trackNumberDetails) {
            console.log(trackNumberDetails.graphicImage);
            setState(trackNumberDetails)
        }
      
    }, []);
    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="md"
                {...props} >
                <div className={classes.activeDialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>View Print</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>

                        <Scrollbars autoHeight autoHeightMax={540}>
                            <div className={classes.content}>
                                <Grid row xl={12} md={12} sm={12} lg={12} className={classes.paddingLeftRight}>
                                    <img id = "labelImgElement" width="560px" src={'.'+trackNumberDetails.graphicImage} />
                                </Grid>

                            </div>
                        </Scrollbars>

                        <div className={classes.footer}>
                            <div className={classes.footerRight}>
                                <Button className={classes.backBtn} onClick={handleClose}>Close</Button>
                                <Button className={classes.backBtn} onClick={handlePrintLabel}>Print</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default ViewPrint;