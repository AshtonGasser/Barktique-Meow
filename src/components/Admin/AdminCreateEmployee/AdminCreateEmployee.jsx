import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import AdminHeader from '../AdminHeader/AdminHeader';

// material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

// setup styles for material-ui
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 195,
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    }
})); // end useStyles


// AdminCreateEmployee function
function AdminCreateEmployee() {

    // variable for material-ui classes
    const classes = useStyles();

    // set dispatch variable
    const dispatch = useDispatch();
    const history = useHistory();

    // local state for inputs
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState('');
    const [accessLevel, setAccessLevel] = useState(0);

    // set variable for inputs to dispatch
    const saveEmployee = () => {
        const newEmployee = {
            username: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            password: password,
            accessLevel: accessLevel
        }

        // console log to see captured data
        console.log('New Employee is:', newEmployee);

        // dispatch newEmployee
        dispatch({ type: 'REGISTER', payload: {newEmployee} });

        // push admin to dashboard
        history.push('/admin');

    } // end saveEmployee

    const handleBackButton = () => {
        console.log('Clicked AdminDashboard button');
        history.push('/admin');
    }

    // function to handle dropdown selection and set Access Level
    const handleSelect = (event) => {

        event.preventDefault();

        // set local state to value (1 or 2) selected by user
        setAccessLevel(event.target.value);

    } // end handleSelect

    return (
        <>
            <div>
                <AdminHeader />
            </div>
            <div className="admin-dashboard-btn">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackButton}
                >
                    Admin Dashboard
                </Button>
            </div>
            <br />
            <div>
                <h2>Create Artist</h2>
            </div>

            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Email"
                        required
                        className={classes.textField}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="First Name"
                        required
                        className={classes.textField}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Last Name"
                        required
                        className={classes.textField}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Phone Number"
                        required
                        className={classes.textField}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Password"
                        required
                        type="password"
                        className={classes.textField}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Access Level</InputLabel>
                        <Select
                            value={accessLevel}
                            label="Access Level"
                            required
                            onChange={handleSelect}
                            className={classes.textField}
                        >
                            <MenuItem value="0">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Artist</MenuItem>
                            <MenuItem value={2}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        type="button"
                        className={classes.button}
                        onClick={saveEmployee}
                    >
                        Add Artist
                    </Button>
                </Grid>
            </Grid>
        </>
    )
} // end AdminCreateEmployee

// export AdminCreateEmployee
export default AdminCreateEmployee;