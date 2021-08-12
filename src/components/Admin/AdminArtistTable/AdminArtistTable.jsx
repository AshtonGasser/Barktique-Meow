import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// import material-ui
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// variable useStyles for class names
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '32.15%',
        flexShrink: 0,
    },
}));

// function for Artist table component
function AdminArtistTable() {
    // variable for material-ui classes
    const classes = useStyles();
    // set dispatch variable
    const dispatch = useDispatch();
    // Bring our history lesson in
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEES_FROM_SERVER' });
    }, []);

    // get artist info from store
    const artists = useSelector((store) => store.adminEmployeeInfoReducer);

    // function to handle artist delete
    const handleDelete = (artist) => {
        // console log to see delete btn fires
       

        Swal.fire({
            title: "Are you sure?",
            text: `Artist to be deleted ${artist.employee_first_name} ${artist.employee_last_name}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000000",
            cancelButtonColor: "#ef3e47",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: `${artist.employee_first_name} ${artist.employee_last_name}
                        has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#000000",
                }    
                ).then(() => {
                    // package data and send to saga
                    const data = {
                        cus_progress_status: 'Not Started',
                        cus_order_isStarted: false,
                        user_id_ref: null,
                        id: artist.id,
                        employee_full_name: null,
                    };
                    console.log(data);
                    // dispatch 'DELETE_EMPLOYEE_FROM_DATABASE'
                    dispatch({ type: 'DELETE_EMPLOYEE_FROM_DATABASE', payload: { data } });
                    dispatch({ type: 'FETCH_EMPLOYEES_FROM_SERVER' });
                });
            } else {
                return;
            }
        });
    };

    const handlePushToEditEmployee = (artist) => {
    
        history.push(`/editEmployee/${artist.id}`);
    };

    return (
        <>
            <div className="artist-table">
                {artists?.map((artist, i) => {
                    return (
                        <div key={i} className={classes.root}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>
                                        {artist.employee_first_name} {artist.employee_last_name}
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        <Button
                                            color="primary"
                                            onClick={() => handlePushToEditEmployee(artist)}
                                            variant="contained"
                                        >
                                            Edit Artist
                                        </Button>
                                    </Typography>
                                    <Typography
                                        className={classes.secondaryHeading}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(artist)}
                                        >
                                            Delete Artist
                                        </Button>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className={classes.secondaryHeading}>
                                        Email: {artist.username}
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        Phone: {artist.employee_phone_number}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    );
                })}
            </div>
        </>
    );
} // end AdminArtistTable

// export AdminArtistTable
export default AdminArtistTable;
