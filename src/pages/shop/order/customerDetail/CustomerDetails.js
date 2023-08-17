import { Dialog, Grid, Icon, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { formatDate, formatDateTime, formateMdnNumber } from '../../../../components/Common/Extensions';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import SearchGrid from '../../../../components/table/SearchGrid';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';
import { withSnackbar } from "./../../../../components/Message/Alert";
import CustomerInfoIcon from "./../../../../assets/img/shop/CustomerInfoIcon.svg";
import ImgPlaceholder from "./../../../../assets/img/shop/ProductPlaceholder.svg";


function CustomerDetails({ dialogOpenClose, handleClose, customerId, ...props }) {
    const classes = useStyles();
    const { showMessage } = props;
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);
    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({});
    const [orderList, setorderList] = useState([]);
    const AllCustomerOrder = [
        {
            orderId: "4624",
            orderedProduct: "Television 4k",
            Shipment: "425458634786",
            orderDate: "Tuesday July 05 2023",
            Address: "700 8th Ave West Plametto, Fl 34221",
            Status: "Active",
            Amount: "$ 400",
        }
    ]
    const loadCustomerData = () => {
        setIsLoading(true);
        PostDataAPI("figgorder/loadCustomerAndOrders", customerId).then((result) => {
            if (result.success && result.data) {
                setState(result.data);
                console.log(result.data.lstOrders);
                setorderList(result.data.lstOrders.map((item, i) => {
                  
                    item.productNames = item.lstOrderItem.map(product => ('<div><img src ="' + (product.filePath ? '.' + product.filePath : ImgPlaceholder)+'" ></img> ' + product.productName + '</div>')).join(' ');

                    item.customerPhone = formateMdnNumber(item.customerPhone);
                    item.orderAddress = item.address
                    item.orderDate = formatDateTime(item.createDate);
                    item.orderAmount = '$ ' + item.orderAmount;
                    return { ...item }
                })
                );
                handleDataGridUpdate();
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        if (customerId && customerId > 0)
            loadCustomerData();
    }, []);
    return (
        <>

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                maxWidth="lg"
                PaperComponent={DraggableComponent}
                {...props} >
                <div className={classes.dialogContent}>

                    <div className={classes.box}>

                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>{state.firstName + ' ' + state.lastName}</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <div className={classes.content}>


                            <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={580}>

                                <Grid row>
                                    <div className={classes.accountCardContainer} style={{ display: window.isMobileView || window.isIpadView ? 'block' : '' }}>
                                        <Grid container alignItems='center'>
                                            <Grid sm={2} lg={2} md={2}>
                                                <div className={classes.accountSection}>
                                                    <div className={classes.profileImg}>
                                                         <img src={state.profileImage?'.'+state.profileImage:CustomerInfoIcon} />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid sm={5} lg={5} md={5}>
                                                <div className={classes.accountSection}>
                                                    <ul className={classes.accountList}>
                                                        <li>
                                                               <Typography className={classes.accountLabel}>Last order:</Typography>
                                                               <Typography className={classes.accountValue}>
                                                                {orderList.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {formatDateTime(item.lstOrderItem[0].createDate)}
                                                                        </>
                                                                    )
                          
                                      })}
                                                                </Typography>
                                                            </li>
                                                        <li>
                                                            <Typography className={classes.accountLabel}>Email:</Typography>
                                                            <Typography className={classes.accountValue}>{state.email}</Typography>
                                                        </li>
                                                        <li>
                                                            <Typography className={classes.accountLabel}>Phone #:</Typography>
                                                            <Typography className={classes.accountValue}> {formateMdnNumber(state.phone)}</Typography>
                                                        </li>

                                                        {/* <li>
                                                            <Typography className={classes.accountLabel}>Ordered Product:</Typography>
                                                            <Typography className={classes.accountValue}>Wireless</Typography>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </Grid>

                                            <Grid sm={4} lg={4} md={4}>
                                                <div className={classes.accountSection}>

                                                    <div className={classes.accountSubCardSection}>
                                                        <div className={classes.accountHomeSection}>
                                                            <Typography className={classes.accountHomeTitle}>Home address

                                                            </Typography>
                                                            <Typography className={classes.accountHomeSubTitle}>
                                                                {state.address}
                                                            </Typography>

                                                            <Typography className={classes.accountHomeSubTitle}>
                                                                {state.city}
                                                            </Typography>

                                                            <Typography className={classes.accountHomeAddress}>
                                                                {state.state},{state.zip}
                                                            </Typography>


                                                        </div>


                                                    </div>
                                                </div>
                                            </Grid>

                                        </Grid>




                                    </div>
                                </Grid>

                                <Grid row>
                                    <h2>All Orders </h2>
                                    <hr></hr>
                                </Grid>
                                <Grid row>
                                    <SearchGrid
                                        columns="AllCustomerOrder"
                                        list={orderList}
                                        noRecordMsg="No Result exist"
                                        Icon={true}
                                        isUpdate={isDataGridUpdate}
                                    />
                                </Grid>


                            </Scrollbars>
                        </div>

                    </div>
                </div>
            </Dialog >
        </>

    )
}
export default withSnackbar(CustomerDetails);