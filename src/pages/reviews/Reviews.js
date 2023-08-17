import React, { useState, useEffect } from 'react'
import {
    Button,
    Checkbox,
    FormControlLabel,
    InputBase,
    Grid
} from "@material-ui/core";
import useStyles from "./styles";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import SearchGrid from '../../components/table/SearchGrid'
import Breadcrums from '../../components/BreadCrums/breadcrums';
import TopSpacer from '../../components/Common/spacer/TopSpacer';

import Submitted from "../../assets/img/action/Submitted.svg";
import ReviewsButtonClicked from "../../assets/img/action/ReviewsButtonClicked.svg";
import EmailOpen from "../../assets/img/action/EmailOpen.svg";

import { PostDataAPI } from '../../Services/APIService';

import Loader from '../../components/Loader/Loader';
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import { withSnackbar } from "../../components/Message/Alert";
import ReviewRequest from './components/reviewRequest/ReviewRequest';
import ClearIcon from '@material-ui/icons/Clear';


function Reviews({ ...props }) {
    const classes = useStyles();
    const { showMessage } = props;


    //action dialog
    const [actiondialogState, setActionDialogState] = useState({
        showHide: false, type: "confirm", message: "",
    })

    const [reviewRequest, setReviewRequest] = useState(false);

    const openReviewRequest = () => {
        setReviewRequest(true)
    }

    const closeReviewRequest = () => {
        setReviewRequest(false)
    }

    const reviewSuccessClose = (message) => {
        showMessage("Success", message, "success", 3000);
        setReviewRequest(false);
        loadReviews();

    }


    const handleClearInput = (name) => {
        setValue('')
        loadReviews();
    };
    
    const showActionDialog = (message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogState(prevState => ({
            ...prevState,
            type: type,
            showHide: true,
            message: message,
            onClickOk: OnOkCallback,
            OnClickCancel: OnCancellCallback
        }));
    }


    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [state, setState] = useState({
        confirmed: '', shipped: '', inTransit: '', delivered: '', returned: '',
        claimed: '', voided: '', deleted: ''
    });
    const [isLoading, setIsLoading] = useState(false);



    const reviewsStatusBoxes = [
        {
            value: 'Submitted',
            reviewStatus: 'Submitted',
            numbers: '00',
            Icon: Submitted,

        },
        {
            value: 'Email Opened',
            reviewStatus: 'Opened',
            numbers: '00',
            Icon: ReviewsButtonClicked,

        },
        {
            value: 'Review Button Clicked',
            reviewStatus: 'Reviewed',
            numbers: '00',
            Icon: EmailOpen,

        },

    ]

    const [ReviewsData, setReviewsData] = useState([]);




    const [searchFilter, setValue] = useState('');
    const handleSearch = (e) => {
        const currValue = e.target.value;

        if (currValue.trim() === "" && currValue !== "") {
            return;
          }
      //    const trimedValue = currValue.trim()

        if (currValue.trim().length > 0 || currValue == '') {
            setValue(currValue);
            handleDataGridUpdate()
        }
    }
    const [isDataGridUpdate, setIsDataGridUpdate] = useState(false);

    const handleDataGridUpdate = () => {
        setIsDataGridUpdate(!isDataGridUpdate);
    }

    const [filteredReviewsData, setFilteredReviewsData] = useState();
    const [filteredStatus, setFilteredStatus] = useState([]);

    const handleStatusClick = (event, reviewStatus) => {
        var lstStatus = filteredStatus;
        if (event.target.checked) {
            lstStatus.push(reviewStatus);
        }
        else {
            lstStatus = lstStatus.filter(s => s != reviewStatus)
        }
        setFilteredStatus(lstStatus);
        if (lstStatus.length > 0) {
            setFilteredReviewsData(ReviewsData.filter(o => lstStatus.some(s => s == o.reviewStatus)));
        }
        else {
            setFilteredReviewsData(ReviewsData);
        }

        handleDataGridUpdate();
    }

    const loadReviews = (filter) => {
        setIsLoading(true);
        //var param = [filter ? filter : filters.salesFilter];
        PostDataAPI("figgreviewrequest/loadGrid").then((result) => {
            if (result.success && result.data) {
                setReviewsData(result.data);
                setFilteredReviewsData(result.data);
                handleDataGridUpdate();
            }
            else {
                showMessage("Error", result.message, "error", 3000);
            }
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Reviews"} currentLink={""} isBack={true}></Breadcrums>
                    </Grid>
                </Grid>
              
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Reviews Sent Email Status
                </h1>
            </Grid>

            <Grid container row className={classes.container}>

                <div className={classes.statusBoxContainer}>

                    {reviewsStatusBoxes.map((item, i) => (
                        <>
                            <FormControlLabel
                                className={classes.checkBoxFormLabel}
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                        className={classes.checkBoxBtn}
                                        onClick={(e) => { handleStatusClick(e, item.reviewStatus) }}
                                    />
                                }
                                label={<>
                                    <div className={item.reviewStatus == "Submitted" ? classes.statusBoxes + " " + "Submitted" :
                                        item.reviewStatus == "Opened" ? classes.statusBoxes + " " + "EmailOpened" :
                                            item.reviewStatus == "Reviewed" ? classes.statusBoxes + " " + "ReviewButton" : ''
                                    }>

                                        <div className={classes.statusBoxContent}>
                                            <span style={{
                                                fontSize: '35px',
                                                color: 'white'
                                            }} >
                                                {ReviewsData?.filter(t => t.reviewStatus == item.reviewStatus).length} </span>
                                            <h3>{item.value}

                                            </h3>
                                        </div>
                                        <img src={item.Icon} />

                                    </div>
                                </>}
                            />
                        </>
                    ))}

                </div>

            </Grid>

            <Grid row className={classes.gridHeader}>

                 <div className={classes.gridActions}>
                    <Button className={classes.changeBtn} onClick={openReviewRequest}>Ask for reviews</Button>
                </div>
                
                <div className={classes.gridActions} style={{ marginRight: '7px' }} >
                    <InputBase
                        id="search"
                        name="search"
                        value={searchFilter}
                        placeholder="Search"
                        className="grid-search-input"
                        startAdornment={<SearchIcon />}
                        onChange={handleSearch}
                        endAdornment={searchFilter ? <ClearIcon style={{ cursor: 'pointer' }} onClick={() => { handleClearInput('search') }} /> : ''}
                    />

                </div>

              



            </Grid>

            <Grid row className={classes.container} >
                <SearchGrid columns="ReviewsData"
                    list={filteredReviewsData}
                    noRecordMsg="No review exists"
                    Icon={true}
                    filter={searchFilter}
                    isUpdate={isDataGridUpdate}
                />
            </Grid>


            <ActionDialog
                type={actiondialogState.type}
                message={actiondialogState.message}
                actiondialogOpenClose={actiondialogState.showHide}
                onSubmit={actiondialogState.onClickOk}
                onCancel={() =>
                    setActionDialogState(prevState => ({
                        ...prevState, showHide: false
                    }))
                }
                onClose={() => setActionDialogState(prevState => ({
                    ...prevState, showHide: false
                }))

                }
            />

            {reviewRequest ?
                <ReviewRequest dialogOpenClose={openReviewRequest} handleClose={closeReviewRequest} handleSuccessClose={reviewSuccessClose}></ReviewRequest>
                : ''}

        </>
    )

}

export default withSnackbar(Reviews);