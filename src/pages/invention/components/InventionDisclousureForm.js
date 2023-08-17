import React, { useState, useRef } from 'react';
import { Button, Stepper, Step, StepLabel, StepIcon, Typography, Grid, makeStyles } from '@material-ui/core';
import Loader from '../../../components/Loader/Loader';
import TopSpacer from '../../../components/Common/spacer/TopSpacer';
import Breadcrums from '../../../components/BreadCrums/breadcrums';
import Description from '../../../assets/img/invention/description.svg';
import ProblemSolving from '../../../assets/img/invention/problemSolving.svg';
import TechnicalDetails from '../../../assets/img/invention/technicalDetails.svg';
import RequestStatus from "../../../assets/img/invention/RequestStatus.svg";
import SupportingDocument from '../../../assets/img/invention/supportingDocument.svg';
import Rating from '../../../assets/img/invention/reviews.svg';
import DragFile from "../../../assets/img/shop/dragFile.svg";
import { InputBaseField } from '../../../components/InputField/InputField';
import { Label } from '../../../components/UiElements/UiElements';
import { allowedAttachmentsImages } from '../../../components/Common/Extensions';
import RichTextEditor from 'react-rte';


import useStyles from "./styles";


const steps = [
    {
        title: 'Step 1',
        icon: <img src={Description} />,
        description: 'Problem Description',
    },
    {
        title: 'Step 2',
        icon: <img src={ProblemSolving} />,
        description: 'Solution',
    },
    {
        title: 'Step 3',
        icon: <img src={TechnicalDetails} />,
        description: 'Technical Details',
    },
    {
        title: 'Step 4',
        icon: <img src={SupportingDocument} />,
        description: 'Supporting Documents',
    },
    {
        title: 'Step 5',
        icon: <img src={Rating} />,
        description: 'Review',
    },
    {
        title: 'Step 6',
        icon: <img src={RequestStatus} />,
        description: 'Request Status',
    }
];

function InventionDisclousureForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({lstAttachedFiles: [], lstProductVariants: []});

    const [attachment, setAttachment] = useState(state.lstAttachedFiles ? state.lstAttachedFiles : []);

    const inputFile = useRef(null);
    const moreInputFile = useRef(null)

    const remoteItem = (index) => {
        const updatedItems = attachment.filter((_, i) => i !== index);
        setAttachment(updatedItems);
    }
    const commonAttachments = allowedAttachmentsImages();


    const onButtonClick = () => {
        inputFile.current.click();
    };
    function uploadSingleFile(e) {
        //const fileArray = Array.from(e.target.files);

        const newFiles = []
        for (let i = 0; i < e.target.files.length; i++) {
            const name = e.target.files[i].name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            switch (ext) {
                case commonAttachments[ext]:
                    break;
                default:
                   // showMessage("Error", "File format is not allowed,\n Only files with the following extensions are allowed: .png .jpg .jpeg", "error", 3000);
                    return;
            }
            newFiles.push({
                imgFile: e.target.files[i],
                fileName: e.target.files[i].name
            })
        }
        setAttachment(prevItems => [...prevItems, ...newFiles]);

    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", 'html'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const [errorMessages, setErrorMessages] = useState({
        errorEmailAddress: false, errorValidEmailAddress: false,
        errorSubject: false, errorBody: false,
        errorEditorMaxValue: false,
    });
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [EDITOR_CHAR_LENGTH, setEDITOR_CHAR_LENGTH] = useState(0);

    const regex = /(<([^>]+)>)/ig;
    const regexSpaces = /((&nbsp;))*/gmi;

    const MAX_EDITOR_LENGTH = 2000;

    const handleEditorChange = (editorValue) => {
        const editorDetail = editorValue.toString('html').replace(regex, '');

        if (editorDetail && editorDetail.length > (MAX_EDITOR_LENGTH)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: true
            }));
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorEditorMaxValue: false
            }));
        }

        setEditorValue(editorValue);
    }
    return (
        <>
            {isLoading ? <Loader></Loader> : ''}
            <TopSpacer></TopSpacer>

            <div className={classes.header}>

                <Grid container alignItems="baseline">
                    <Grid item lg={12}>
                        <Breadcrums parentLink={"Inventions"} isBack={true}></Breadcrums>
                    </Grid>
                </Grid>
            </div>

            <Grid container className={classes.container}>
                <h1 className={classes.heading}>
                    Inventions
                </h1>
            </Grid>


            <div className={classes.multiSteps}>
                <Stepper activeStep={activeStep}>
                    {steps.map((item) => (
                        <Step key={item.title}>
                            <StepLabel StepIconComponent={StepIcon} StepIconProps={{ icon: item.icon }}> {item.description} </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className={classes.container}>
                    {activeStep === steps.length ? (
                        <Grid row>
                            <Typography>All steps completed</Typography>
                        </Grid>
                    ) : activeStep === 0 ? (
                        <Grid row>
                            <h1 className={classes.formHeading}>
                                Problem Description
                            </h1>

                            <Grid row>
                                <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                    <Label title="Title" size={12} />
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <InputBaseField
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            placeholder='Title'
                                            MaxLength='50'
                                            value={state?.Title}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                    <Label title="Description" size={12} />
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <RichTextEditor
                                            value={editorValue}
                                            onChange={handleEditorChange}
                                            className={classes.note}
                                            placeholder="Enter Email Body"
                                        >
                                        </RichTextEditor>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    ) : activeStep === 1 ? (
                        <Grid row>
                            <h1 className={classes.formHeading}>
                                Solution
                            </h1>

                            <Grid row>
                                <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                    <Label title="Describe how your solution/invention is new and different from previous solutions, in one or two sentences only. What are the technical or functional differences between your solutions and other solution." size={12} />
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <RichTextEditor
                                            value={editorValue}
                                            onChange={handleEditorChange}
                                            className={classes.note}
                                            placeholder="Enter Email Body"
                                        >
                                        </RichTextEditor>
                                    </Grid>
                                </Grid>
                                <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                    <Label title="Describe previous solutions to the problem." size={12} />
                                    <Grid xl={12} md={12} sm={12} lg={12}>
                                        <RichTextEditor
                                            value={editorValue}
                                            onChange={handleEditorChange}
                                            className={classes.note}
                                            placeholder="Enter Email Body"
                                        >
                                        </RichTextEditor>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    )
                        : activeStep === 2 ? (
                            <Grid row>
                                <h1 className={classes.formHeading}>
                                    Technical Details
                                </h1>

                                <Grid row>
                                    <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                        <Label title="Describe your solution. Which technical features or functions of your solution provide value or advantages?" size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <RichTextEditor
                                                value={editorValue}
                                                onChange={handleEditorChange}
                                                className={classes.note}
                                                placeholder="Enter Email Body"
                                            >
                                            </RichTextEditor>
                                        </Grid>
                                    </Grid>
                                    <Grid xl={7} md={7} sm={7} lg={7} className={classes.paddingLeftRight}>
                                        <Label title="Describe parts and elements that make up your solution." size={12} />
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <RichTextEditor
                                                value={editorValue}
                                                onChange={handleEditorChange}
                                                className={classes.note}
                                                placeholder="Enter Email Body"
                                            >
                                            </RichTextEditor>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        )

                            : activeStep === 3 ? (
                                <Grid row>
                                    <h1 className={classes.formHeading}>
                                        Supporting Document
                                    </h1>

                                    <Grid row>
                                        <Grid xl={12} md={12} sm={12} lg={12}>
                                            <div className={attachment.length > 0 ? classes.multipleFiles : classes.dragFile}>

                                                {attachment && attachment.length > 0 ?
                                                    <>
                                                        {<h4 className={classes.multipleFilesHead} onClick={onButtonClick} >Add more images</h4>}
                                                        <form>
                                                            <div>
                                                                <input type="file" multiple="multiple" ref={moreInputFile} className={classes.inputFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                                            </div>
                                                        </form>

                                                        <Grid container>
                                                            {attachment.map((item, index) => (
                                                                <Grid items lg={item.length == 1 ? 12 : 6} md={item.length == 1 ? 12 : 6} sm={item.length == 1 ? 12 : 6}>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <img
                                                                            key={index}
                                                                            src={item.imgFile ? URL.createObjectURL(item.imgFile) : '.' + item.filePath}
                                                                            alt={`Preview ${index}`}
                                                                        />
                                                                        <span className={classes.RemoveImage} onClick={() => remoteItem(index)}>x</span>

                                                                    </div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </>
                                                    :
                                                    <>
                                                        <img className={classes.dragFileIcon} src={DragFile} onClick={onButtonClick} />
                                                        <h4 onClick={onButtonClick}>
                                                            <b style={{ color: 'rgba(77, 128, 201, 1)' }}> Browse Image </b></h4>
                                                    </>
                                                }

                                                <form>
                                                    <div>
                                                        <input type="file" multiple="multiple" ref={inputFile} className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" style={{ display: "none" }} />
                                                    </div>
                                                </form>

                                            </div>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            )
                                : (<></>)}
                    <div className={classes.footerArea}>
                        <Button className={classes.backBtn} disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button className={classes.changeBtn} onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventionDisclousureForm;