import { Dialog, Grid, Icon, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import Scrollbars from "rc-scrollbars";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./styles";
import { PostDataAPI } from '../../../../Services/APIService';
import { formatDate, formateMdnNumber } from '../../../../components/Common/Extensions';
import DialogLoader from '../../../../components/Loader/DialogLoader';
import SearchGrid from '../../../../components/table/SearchGrid';
import { DraggableComponent } from '../../../../components/UiElements/UiElements';

function SearchResultDialog({ dialogOpenClose, handleClose, onRowClick, isPrepaid, SearchResultsList, searchTerm, ...props }) {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);

    //const SearchResultsList = [
    //    {
    //        CustomerName: "Ryan Braswell",
    //        Phone: "202-555-0162",
    //        Email: "ryanbraswell@gmail.com",
    //        Address: "700 8th Ave West Plametto, Fl 34221",
    //    }
    //]

    useEffect(() => {
        //console.log(props.mdnNumber)
    }, []);
    return (
        <>

            <Dialog
                classes={{ paper: classes.dialogPaper }}
                disableBackdropClick
                disableEscapeKeyDown
                open={dialogOpenClose}
                PaperComponent={DraggableComponent}
                maxWidth="lg"
                {...props} >
                <div className={classes.dialogContent}>

                    <div className={classes.box}>

                        <div className={classes.header} id="draggable-dialog-title">
                            <Typography className={classes.title}>Search Results For: '{searchTerm}'</Typography>
                            <Icon className={classes.closeIcon} onClick={handleClose} color="primary"><CloseIcon /></Icon>
                        </div>
                        {isLoading ? <DialogLoader></DialogLoader> : ''}
                        <div className={classes.content}>


                            <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={600}>
                                <Grid row>

                                    <SearchGrid
                                        columns="SearchResultsFor"
                                        list={SearchResultsList}
                                        noRecordMsg="No Result exist"
                                        Icon={true}
                                        onRowClick={onRowClick}
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

export default SearchResultDialog